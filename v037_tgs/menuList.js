// menuList.js - v037 用

const menuPanelElement = document.getElementById("menu-panel");
const listPanelElement = document.getElementById("list-panel");

// --- メニューパネル ---
function showMenuPanel() {
  if (menuPanelElement) menuPanelElement.classList.remove("hidden");
}

function hideMenuPanel() {
  if (menuPanelElement) menuPanelElement.classList.add("hidden");
}

function menuPanelVisible() {
  return menuPanelElement && !menuPanelElement.classList.contains("hidden");
}

// --- リストパネル ---
function showListPanel() {
  if (listPanelElement) listPanelElement.classList.remove("hidden");
}

function hideListPanel() {
  if (listPanelElement) listPanelElement.classList.add("hidden");
}

function listPanelVisible() {
  return listPanelElement && !listPanelElement.classList.contains("hidden");
}

// --- リスト読み込み ---
function loadList(filename) {
  const path = (window.config?.listPath || "./") + filename + "?t=" + Date.now();
  return fetch(path)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      showList(data); // 読み込み後に表示
      return data;
    })
    .catch(err => {
      console.error("リストの読み込みに失敗しました:", err);
      return [];
    });
}

// --- リスト表示 ---
function showList(listData) {
  if (!listPanelElement) return;
  listPanelElement.innerHTML = "";
  listPanelElement.classList.remove("hidden");

  listData.items?.slice(0, 7).forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.text;
    btn.onclick = () => {
      hideListPanel();
      handleMenuAction(item);
    };
    listPanelElement.appendChild(btn);
  });
}
