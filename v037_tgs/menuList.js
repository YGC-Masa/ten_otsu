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
