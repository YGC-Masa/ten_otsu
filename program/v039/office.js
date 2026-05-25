/* v039_11 office */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;

  ns.renderOfficeCharacters = function renderOfficeCharacters() {
    const layers = ns.layers || ns.ensureLayers();
    layers.officeChars.innerHTML = "";

    const count = Math.random() < 0.55 ? 3 : 2;
    const picks = ns.shuffle(ns.officeMembers).slice(0, count);
    ns.state.officeSelection = picks;
    ns.state.frontCharacter = picks[0] || null;

    picks.forEach((member, index) => {
      const img = document.createElement("img");
      img.className = "tenotsu-office-stand tenotsu-office-stand-" + index;
      img.alt = member[0];
      img.draggable = false;
      img.src = ns.paths.charBase + member[1];
      img.onerror = () => {
        img.onerror = null;
        img.src = ns.paths.charBase + "a10501.webp";
      };
      layers.officeChars.appendChild(img);
    });

    if (picks[0]) ns.setText(picks[0][0], picks[0][2]);
  };

  ns.renderOfficeMenu = function renderOfficeMenu() {
    const layers = ns.layers || ns.ensureLayers();
    const items = [
      ["店舗", "office"],
      ["メンバー", "members"],
      ["店舗営業", "sales"],
      ["外回り", "town"],
      ["ショップ", "shop"],
      ["設定", "settings"]
    ];

    layers.menu.innerHTML = "";

    const version = document.createElement("div");
    version.className = "tenotsu-menu-version";
    const versionMain = document.createElement("span");
    versionMain.className = "tenotsu-menu-version-main";
    versionMain.textContent = ns.VERSION || "v039_11";
    const versionSub = document.createElement("span");
    versionSub.className = "tenotsu-menu-version-sub";
    versionSub.textContent = "new core / office";
    version.appendChild(versionMain);
    version.appendChild(versionSub);
    layers.menu.appendChild(version);

    const title = document.createElement("div");
    title.className = "tenotsu-office-menu-title";
    title.textContent = "メインメニュー";
    layers.menu.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "tenotsu-office-menu-grid";
    layers.menu.appendChild(grid);

    items.forEach(([label, action]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tenotsu-office-menu-button";
      btn.dataset.action = action;
      btn.textContent = label;
      btn.addEventListener("click", () => ns.handleOfficeMenu(action));
      grid.appendChild(btn);
    });
  };

  ns.enterOffice = function enterOffice(options = {}) {
    ns.setMode("office");
    ns.ensureLayers();
    ns.setBackground(ns.paths.officeBg);
    if (typeof ns.hideSettingsPanel === "function") ns.hideSettingsPanel();
    if (typeof ns.hideShopPanel === "function") ns.hideShopPanel();
    if (typeof ns.hideMembersPanel === "function") ns.hideMembersPanel();
    if (typeof ns.hideTownPanel === "function") ns.hideTownPanel();
    ns.renderOfficeMenu();
    ns.renderOfficeCharacters();
    if (options.message) ns.setText(options.speaker || "店長", options.message);
  };

  ns.clearCacheAndReload = async function clearCacheAndReload() {
    const results = [];
    try {
      if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((reg) => reg.unregister()));
        results.push("Service Worker解除: " + regs.length + "件");
      } else {
        results.push("Service Workerなし");
      }
    } catch (err) {
      results.push("Service Worker解除エラー: " + err.message);
    }

    try {
      if (window.caches && caches.keys) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
        results.push("Cache Storage削除: " + keys.length + "件");
      } else {
        results.push("Cache Storageなし");
      }
    } catch (err) {
      results.push("Cache Storage削除エラー: " + err.message);
    }

    try {
      localStorage.setItem("tenotsu-last-cache-clear", String(Date.now()));
      sessionStorage.setItem("tenotsu-cache-cleared-at", String(Date.now()));
    } catch (_) {}

    return results;
  };

  ns.renderSettings = function renderSettings() {
    ns.setMode("settings");
    if (typeof ns.hideMembersPanel === "function") ns.hideMembersPanel();
    const html = `
      <div class="tenotsu-settings-title">設定</div>
      <div class="tenotsu-settings-body">
        <div>現在のバージョン: <strong>${ns.VERSION || "v039_11"}</strong></div>
        <div>表示やキャッシュの調整を行います。</div>
      </div>
      <div class="tenotsu-settings-actions">
        <button type="button" class="tenotsu-settings-button danger" data-settings-action="clear-cache">キャッシュクリアして再読み込み</button>
        <button type="button" class="tenotsu-settings-button" data-settings-action="close-settings">事務所に戻る</button>
      </div>
      <div class="tenotsu-settings-result" data-settings-result></div>
    `;
    ns.showSettingsPanel(html);
    ns.setText("設定", "設定画面を開きました。");

    const panel = ns.layers.settings;
    const result = panel.querySelector("[data-settings-result]");
    const clearButton = panel.querySelector('[data-settings-action="clear-cache"]');
    const closeButton = panel.querySelector('[data-settings-action="close-settings"]');

    if (clearButton) {
      clearButton.addEventListener("click", async () => {
        clearButton.disabled = true;
        if (result) result.textContent = "キャッシュを削除しています……";
        const lines = await ns.clearCacheAndReload();
        if (result) result.textContent = lines.join(" / ") + " / 再読み込みします";
        ns.setText("設定", "キャッシュクリアを実行しました。再読み込みします。");
        setTimeout(() => {
          const url = new URL(location.href);
          url.searchParams.set("cachebust", Date.now().toString());
          location.replace(url.toString());
        }, 900);
      });
    }

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        ns.hideSettingsPanel();
        ns.enterOffice({ speaker: "店長", message: "事務所に戻りました。" });
      });
    }
  };

  ns.handleOfficeMenu = function handleOfficeMenu(action) {
    if (action !== "settings" && typeof ns.hideSettingsPanel === "function") ns.hideSettingsPanel();
    if (action !== "members" && typeof ns.hideMembersPanel === "function") ns.hideMembersPanel();
    if (action !== "town" && typeof ns.hideTownPanel === "function") ns.hideTownPanel();

    switch(action) {
      case "office":
        ns.enterOffice({ speaker: "店長", message: "事務所を確認します。" });
        break;
      case "members":
        if (typeof ns.enterMembers === "function") ns.enterMembers();
        else ns.setText("店長", "メンバー機能を読み込めませんでした。members.js の読み込みを確認してください。");
        break;
      case "sales":
        ns.setText("店長", "店舗営業は v039_11 以降でバトル接続予定です。");
        break;
      case "town":
        if (typeof ns.enterTown === "function") ns.enterTown();
        else ns.setText("店長", "外回り機能を読み込めませんでした。");
        break;
      case "shop":
        if (typeof ns.enterShop === "function") {
          ns.enterShop();
        } else {
          ns.setText("店長", "ショップ機能を読み込めませんでした。shop.js の読み込みを確認してください。");
        }
        break;
      case "settings":
        ns.renderSettings();
        break;
      default:
        ns.setText("店長", "未接続のメニューです。");
    }
  };
})();
