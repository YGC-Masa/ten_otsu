/* Shared navigation columns. Selection is UI-only; existing controls keep their handlers. */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;
  const selections = new Map();
  function element(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  ns.mountMenuColumns = function(root, options) {
    const groups = options.groups.filter(group => group.items.length);
    if (!groups.length) return;
    const state = selections.get(options.key) || { group:groups[0].id, items:{} };
    selections.set(options.key, state);
    const shell = element("div", "tenotsu-menu-columns");
    const columns = ["分類", "項目", "詳細・操作"].map(label => {
      const column = element("section", "tenotsu-menu-column");
      column.append(element("h2", "", label));
      const scroll = element("div", "tenotsu-menu-column-scroll");
      column.append(scroll); shell.append(column); return scroll;
    });
    const detailNodes = new Set(groups.flatMap(group => group.items.map(item => item.node)).filter(Boolean));
    detailNodes.forEach(node => columns[2].append(node));
    const categoryButtons = new Map();
    function selectItem(group, item) {
      state.group = group.id; state.items[group.id] = item.id;
      detailNodes.forEach(node => { node.hidden = node !== item.node; });
      columns[1].querySelectorAll("[data-menu-item]").forEach(button => {
        const selected = button.dataset.menuItem === item.id;
        button.classList.toggle("menu-selected", selected);
        button.setAttribute("aria-current", String(selected));
      });
      if (item.onSelect) item.onSelect();
      columns[2].scrollTop = 0;
    }
    function selectGroup(group) {
      state.group = group.id;
      categoryButtons.forEach((button, id) => { button.classList.toggle("menu-selected", id === group.id); button.setAttribute("aria-current", String(id === group.id)); });
      columns[1].replaceChildren();
      group.items.forEach(item => {
        const button = item.button || element("button", "", item.label);
        button.type = "button"; button.dataset.menuItem = item.id;
        // A button may appear in the all-places and type-specific views.
        button.onclick = () => selectItem(group, item);
        columns[1].append(button);
      });
      selectItem(group, group.items.find(item => item.id === state.items[group.id]) || group.items[0]);
    }
    groups.forEach(group => {
      const button = element("button", "", group.label); button.type = "button";
      button.dataset.menuGroup = group.id; button.addEventListener("click", () => selectGroup(group));
      categoryButtons.set(group.id, button); columns[0].append(button);
    });
    root.classList.add("tenotsu-menu-finder");
    root.replaceChildren(element("h1", "tenotsu-menu-heading", options.title), shell);
    if (options.footer) root.append(options.footer);
    selectGroup(groups.find(group => group.id === state.group) || groups[0]);
  };
})();
