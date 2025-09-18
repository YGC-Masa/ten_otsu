// menuList.js - v037 完全版

// -------------------------------
// パネル要素の参照
// -------------------------------
const menuPanelElement = document.getElementById("menu-panel");
const listPanelElement = document.getElementById("list-panel");

// -------------------------------
// 共通ユーティリティ
// -------------------------------
function isVisible(el) {
  return el && !el.classList.contains("hidden");
}
function showElement(el) {
  if (el) el.classList.remove("hidden");
}
function hideElement(el) {
  if (el) el.classList.add("hidden");
}

// -------------------------------
// メニュー制御
// -------------------------------
function showMenuPanel() { showElement(menuPanelElement); }
function hideMenuPanel() { hideElement(menuPanelElement); }
function menuPanelVisible() { return isVisible(menuPanelElement); }

// -------------------------------
// リスト制御
// -------------------------------
function showListPanel() { showElement(listPanelElement); }
function hideListPanel() { hideElement(listPanelElement); }
function listPanelVisible() { return isVisible(listPanelElement); }

// -------------------------------
// JSONメニューリストを読み込む
// -------------------------------
function loadMenu(menuPath) {
  return fetch(menuPath)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (!menuPanelElement) return;
      menuPanelElement.innerHTML = "";
      data.forEach(item => {
        const btn = document.createElement("button");
        btn.textContent = item.label || item.text || "未設定";
        btn.onclick = () => handleMenuAction(item.action);
        menuPanelElement.appendChild(btn);
      });
    })
    .catch(err => {
      console.error("メニューの読み込みに失敗しました:", err);
    });
}

// -------------------------------
// JSONリストを読み込む
// -------------------------------
function loadList(listPath) {
  return fetch(listPath)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (!listPanelElement) return;
      listPanelElement.innerHTML = "";
      data.forEach(item => {
        const btn = document.createElement("button");
        btn.textContent = item.label || item.text || "未設定";
        btn.onclick = () => handleListAction(item.action, item.value);
        listPanelElement.appendChild(btn);
      });
    })
    .catch(err => {
      console.error("リストの読み込みに失敗しました:", err);
    });
}

// -------------------------------
// メニュー項目クリック時の処理
// -------------------------------
function handleMenuAction(action) {
  switch (action) {
    case "start":
      if (typeof startGame === "function") startGame();
      else console.warn("startGame() が未定義です");
      break;

    case "load":
      if (typeof showLoadPanel === "function") showLoadPanel();
      else console.warn("showLoadPanel() が未定義です");
      break;

    case "config":
      if (typeof showConfigPanel === "function") showConfigPanel();
      else console.warn("showConfigPanel() が未定義です");
      break;

    case "title":
      location.reload();
      break;

    default:
      console.warn("未対応のメニューアクション:", action);
  }
}

// -------------------------------
// リスト項目クリック時の処理
// -------------------------------
function handleListAction(action, value) {
  switch (action) {
    case "scenario":
      if (typeof loadScenario === "function") {
        loadScenario(value);
        hideListPanel();
        hideMenuPanel();
      } else {
        console.warn("loadScenario() が未定義です");
      }
      break;

    default:
      console.warn("未対応のリストアクション:", action, value);
  }
}
