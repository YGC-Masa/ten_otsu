// menuList.js - v037 完全版

// -------------------------------
// パネル要素の参照
// -------------------------------
const menuPanel = document.getElementById("menu-panel");
const listPanel = document.getElementById("list-panel");

// -------------------------------
// メニューパネル制御
// -------------------------------
function showMenuPanel() {
  if (menuPanel) menuPanel.classList.remove("hidden");
}

function hideMenuPanel() {
  if (menuPanel) menuPanel.classList.add("hidden");
}

function menuPanelVisible() {
  return menuPanel && !menuPanel.classList.contains("hidden");
}

// -------------------------------
// リストパネル制御
// -------------------------------
function showListPanel() {
  if (listPanel) listPanel.classList.remove("hidden");
}

function hideListPanel() {
  if (listPanel) listPanel.classList.add("hidden");
}

function listPanelVisible() {
  return listPanel && !listPanel.classList.contains("hidden");
}

// -------------------------------
// JSONメニューリストを読み込む
// -------------------------------
function loadMenu(menuFile) {
  return fetch("./listmenu/" + menuFile + "?t=" + Date.now())
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
// リスト表示（修正版 v037）
// -------------------------------
function showList(data) {
  // data が配列でなければ items プロパティを参照
  let items = Array.isArray(data) ? data : data.items;

  if (!items || !Array.isArray(items)) {
    console.error("リストの構造が不正です:", data);
    return;
  }

  // listPanel をクリアして表示
  listPanel.innerHTML = "";
  listPanel.classList.remove("hidden");

  items.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.text || "未設定";
    btn.onclick = () => {
      clearCharacters();
      textEl.innerHTML = "";
      nameEl.textContent = "";
      evLayer.innerHTML = "";
      listPanel.classList.add("hidden");
      if (item.jump) loadScenario(item.jump);
      else if (item.url) location.href = item.url;
    };
    listPanel.appendChild(btn);
  });
}

// -------------------------------
// メニュー・リストを開く共通関数
// -------------------------------
function openMenu(menuFile) {
  if (menuPanelVisible()) {
    hideMenuPanel();
    return;
  }

  loadMenu(menuFile).then(data => {
    if (!data || data.length === 0) return;
    menuPanel.innerHTML = "";
    menuPanel.classList.remove("hidden");

    data.forEach(item => {
      const btn = document.createElement("button");
      btn.textContent = item.text || "未設定";
      btn.onclick = () => {
        hideMenuPanel();
        handleMenuAction(item.action);
      };
      menuPanel.appendChild(btn);
    });
  }).catch(err => console.error("メニュー読み込み失敗:", err));
}

// -------------------------------
// クリック / タッチでメニューを開く
// -------------------------------
const clickLayer = document.getElementById("click-layer");
let lastTouch = 0;

clickLayer.addEventListener("dblclick", () => openMenu("menu01.json"));
clickLayer.addEventListener("touchend", () => {
  const now = Date.now();
  if (now - lastTouch < 300) openMenu("menu01.json");
  lastTouch = now;
});
