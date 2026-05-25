/* v039_07 layers */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;

  function el(tag, attrs = {}, parent = null) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === "className") node.className = value;
      else if (key === "text") node.textContent = value;
      else if (key === "hidden") node.hidden = true;
      else node.setAttribute(key, value);
    });
    if (parent) parent.appendChild(node);
    return node;
  }

  ns.ensureRoot = function ensureRoot() {
    let game = document.getElementById("game-container");
    if (!game) game = el("main", { id: "game-container" }, document.body);

    let app = document.getElementById("tenotsu-app");
    if (!app) app = el("div", { id: "tenotsu-app" }, game);

    return app;
  };

  ns.ensureLayers = function ensureLayers() {
    const app = ns.ensureRoot();

    if (ns.layers && ns.layers.app === app && ns.layers.shopMenu && ns.layers.shopInfo && ns.layers.settings) {
      return ns.layers;
    }

    app.innerHTML = "";

    const layers = {};
    layers.app = app;
    layers.bg = el("div", { className: "tenotsu-bg-layer", "data-layer": "background" }, app);
    layers.bgImg = el("img", { alt: "", draggable: "false" }, layers.bg);
    layers.officeChars = el("div", { className: "tenotsu-office-character-layer", "data-layer": "office-characters" }, app);
    layers.ui = el("div", { className: "tenotsu-ui-layer", "data-layer": "ui" }, app);
    layers.menu = el("nav", { className: "tenotsu-office-menu", "aria-label": "事務所メニュー" }, app);
    layers.shopMenu = el("nav", { className: "tenotsu-shop-menu", "aria-label": "ショップメニュー", hidden: "hidden" }, app);
    layers.shopInfo = el("aside", { className: "tenotsu-shop-info-panel", "aria-label": "ショップ情報", hidden: "hidden" }, app);
    layers.settings = el("aside", { className: "tenotsu-settings-panel", "aria-label": "設定", hidden: "hidden" }, app);
    layers.members = el("section", { className: "tenotsu-members-panel", "aria-label": "メンバー", hidden: "hidden" }, app);
    layers.text = el("section", { className: "tenotsu-text-layer", "aria-live": "polite" }, app);
    layers.speaker = el("div", { className: "tenotsu-speaker" }, layers.text);
    layers.message = el("div", { className: "tenotsu-message" }, layers.text);
    layers.fade = el("div", { className: "tenotsu-fade-layer", "data-layer": "fade" }, app);
    layers.version = el("div", { className: "tenotsu-version-badge", text: ns.VERSION || "v039_07" }, app);

    ns.layers = layers;
    return layers;
  };

  ns.setBackground = function setBackground(src) {
    const layers = ns.layers || ns.ensureLayers();
    const requested = src || ns.paths.officeBg;
    const fallback = ns.paths.fallbackBg || ns.paths.officeBg;
    const pixel = ns.paths.transparentPixel;

    layers.bg.style.backgroundImage = "url('" + requested + "')";
    layers.bgImg.onerror = () => {
      if (layers.bgImg.dataset.fallbackTried !== "1" && fallback && fallback !== requested) {
        layers.bgImg.dataset.fallbackTried = "1";
        layers.bg.style.backgroundImage = "url('" + fallback + "')";
        layers.bgImg.src = fallback;
        return;
      }
      layers.bgImg.onerror = null;
      layers.bg.style.backgroundImage = "none";
      layers.bgImg.src = pixel;
    };
    layers.bgImg.dataset.fallbackTried = "0";
    layers.bgImg.src = requested;
  };

  ns.setText = function setText(speaker, message) {
    const layers = ns.layers || ns.ensureLayers();
    layers.speaker.textContent = speaker || "";
    layers.message.textContent = message || "";
  };

  ns.showSettingsPanel = function showSettingsPanel(html) {
    const layers = ns.layers || ns.ensureLayers();
    layers.settings.hidden = false;
    layers.settings.innerHTML = html || "";
  };

  ns.hideSettingsPanel = function hideSettingsPanel() {
    const layers = ns.layers || ns.ensureLayers();
    layers.settings.hidden = true;
    layers.settings.innerHTML = "";
  };

  ns.showShopPanel = function showShopPanel(menuHtml, infoHtml) {
    const layers = ns.ensureLayers();
    layers.shopMenu.hidden = false;
    layers.shopInfo.hidden = false;
    layers.shopMenu.innerHTML = menuHtml || "";
    layers.shopInfo.innerHTML = infoHtml || "";
  };

  ns.hideShopPanel = function hideShopPanel() {
    const layers = ns.ensureLayers();
    layers.shopMenu.hidden = true;
    layers.shopMenu.innerHTML = "";
    layers.shopInfo.hidden = true;
    layers.shopInfo.innerHTML = "";
  };

  ns.clearCharacters = function clearCharacters() {
    const layers = ns.ensureLayers();
    layers.officeChars.innerHTML = "";
  };

  ns.showMembersPanel = function showMembersPanel(html) {
    const layers = ns.ensureLayers();
    layers.members.hidden = false;
    layers.members.innerHTML = html || "";
  };

  ns.hideMembersPanel = function hideMembersPanel() {
    const layers = ns.ensureLayers();
    if (!layers.members) return;
    layers.members.hidden = true;
    layers.members.innerHTML = "";
  };
})();
