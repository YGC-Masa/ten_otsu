// menuList.js - v037 完全版（config パス利用版）

const menuPanelElement = document.getElementById("menu-panel");
const listPanelElement = document.getElementById("list-panel");

// -------------------------------
// メニューパネル制御
// -------------------------------
function showMenuPanel() {
  menuPanelElement?.classList.remove("hidden");
}

function hideMenuPanel() {
  menuPanelElement?.classList.add("hidden");
}

function menuPanelVisible() {
  return menuPanelElement && !menuPanelElement.classList.contains("hidden");
}

// -------------------------------
// リストパネル制御
// -------------------------------
function showListPanel() {
  listPanelElement?.classList.remove("hidden");
}

function hideListPanel() {
  listPanelElement?.classList.add("hidden");
}

function listPanelVisible() {
  return listPanelElement && !listPanelElement.classList.contains("hidden");
}

// -------------------------------
// JSONメニューリストを読み込む
// -------------------------------
async function loadMenu(menuFile) {
  try {
    const res = await fetch(config.menuPath + menuFile + "?t=" + Date.now());
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("メニューの読み込みに失敗しました:", err);
    return [];
  }
}

// -------------------------------
// JSONリストを読み込む
// -------------------------------
async function loadList(listFile) {
  try {
    const res = await fetch(config.listPath + listFile + "?t=" + Date.now());
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("リストの読み込みに失敗しました:", err);
    return [];
  }
}

// -------------------------------
// リスト表示
// -------------------------------
function showList(data) {
  if (!listPanelElement) return;
  listPanelElement.innerHTML = "";
  if (!Array.isArray(data)) return;

  data.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.text || "未設定";
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
// メニュー表示のユーティリティ
// -------------------------------
function openMenu(menuFile) {
  loadMenu(menuFile).then(menuItems => {
    if (!menuPanelElement) return;
    menuPanelElement.innerHTML = "";
    menuItems.forEach(item => {
      const btn = document.createElement("button");
      btn.textContent = item.text || "未設定";
      btn.onclick = () => {
        handleMenuAction(item.action);
        hideMenuPanel();
      };
      menuPanelElement.appendChild(btn);
    });
    showMenuPanel();
  });
}
