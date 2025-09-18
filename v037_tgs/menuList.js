// menuList.js - v037 完全版

// -------------------------------
// パネル要素の参照
// -------------------------------
const menuPanelElement = document.getElementById("menu-panel");
const listPanelElement = document.getElementById("list-panel");

// -------------------------------
// メニューパネル制御
// -------------------------------
function showMenuPanel() {
  if (menuPanelElement) menuPanelElement.classList.remove("hidden");
}

function hideMenuPanel() {
  if (menuPanelElement) menuPanelElement.classList.add("hidden");
}

function menuPanelVisible() {
  return menuPanelElement && !menuPanelElement.classList.contains("hidden");
}

// -------------------------------
// リストパネル制御
// -------------------------------
function showListPanel() {
  if (listPanelElement) listPanelElement.classList.remove("hidden");
}

function hideListPanel() {
  if (listPanelElement) listPanelElement.classList.add("hidden");
}

function listPanelVisible() {
  return listPanelElement && !listPanelElement.classList.contains("hidden");
}

// -------------------------------
// JSONメニューリストを読み込む
// -------------------------------
function loadMenu(menuPath) {
  return fetch(menuPath)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .catch(err => {
      console.error("メニューの読み込みに失敗しました:", err);
      return [];
    });
}

// -------------------------------
// メニュー項目クリック時の処理
// -------------------------------
function handleMenuAction(action) {
  switch (action) {
    case "start":
      if (typeof startGame === "function") {
        startGame();
      } else {
        console.warn("startGame() が未定義です");
      }
      break;

    case "load":
      if (typeof showLoadPanel === "function") {
        showLoadPanel();
      } else {
        console.warn("showLoadPanel() が未定義です");
      }
      break;

    case "config":
      if (typeof showConfigPanel === "function") {
        showConfigPanel();
      } else {
        console.warn("showConfigPanel() が未定義です");
      }
      break;

    case "title":
      location.reload();
      break;

    default:
      console.warn("未対応のメニューアクション:", action);
  }
}

// JSONを読み込んでメニュー描画＆表示
function openMenu(menuPath) {
  loadMenu(menuPath).then(data => {
    menuPanelElement.innerHTML = "";
    data.forEach(item => {
      const btn = document.createElement("div");
      btn.className = "menu-item";
      btn.textContent = item.label;
      btn.onclick = () => handleMenuAction(item.action);
      menuPanelElement.appendChild(btn);
    });
    showMenuPanel();
  });
}
window.openMenu = openMenu;

// JSONを読み込んでリスト描画＆表示
function showList(data) {
  listPanelElement.innerHTML = "";
  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.textContent = item.label;
    div.onclick = () => {
      if (item.jump) loadScenario(item.jump);
      if (item.url) location.href = item.url;
    };
    listPanelElement.appendChild(div);
  });
  showListPanel();
}
window.showList = showList;




// -------------------------------
// グローバル公開
// -------------------------------
window.showMenuPanel = showMenuPanel;
window.hideMenuPanel = hideMenuPanel;
window.menuPanelVisible = menuPanelVisible;

window.showListPanel = showListPanel;
window.hideListPanel = hideListPanel;
window.listPanelVisible = listPanelVisible;

window.loadMenu = loadMenu;
window.handleMenuAction = handleMenuAction;
