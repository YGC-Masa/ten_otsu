// menuList.js - v037 完全版（fetch パスを listmenu に統一）

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
// JSON メニューリストを読み込む
// -------------------------------
function loadMenu(menuFile) {
  return fetch(config.menuPath + menuFile + "?t=" + Date.now())
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .catch(err => {
      console.error("メニュー読み込み失敗:", err);
      return [];
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
// JSON リストを読み込む
// -------------------------------
function loadList(listFile) {
  return fetch(config.listPath + listFile + "?t=" + Date.now())
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .catch(err => {
      console.error("リスト読み込み失敗:", err);
      return [];
    });
}

// -------------------------------
// リスト表示
// -------------------------------
function showList(items) {
  if (!listPanelElement) return;
  listPanelElement.innerHTML = "";

  items.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.text || "無題";
    btn.onclick = () => {
      if (item.jump) loadScenario(item.jump);
      else if (item.url) location.href = item.url;
      hideListPanel();
    };
    listPanelElement.appendChild(btn);
  });

  showListPanel();
}

// -------------------------------
// メニュー開閉（script.js から呼ぶ）
// -------------------------------
function openMenu(menuFile = "menu01.json") {
  if (menuPanelVisible()) {
    hideMenuPanel();
  } else {
    loadMenu(menuFile).then(items => {
      if (!menuPanelElement) return;
      menuPanelElement.innerHTML = "";
      items.forEach(item => {
        const btn = document.createElement("button");
        btn.textContent = item.text || "無題";
        btn.onclick = () => handleMenuAction(item.action);
        menuPanelElement.appendChild(btn);
      });
      showMenuPanel();
    });
  }
}
