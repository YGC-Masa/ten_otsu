/* v039_27 shop */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;

  ns.renderShopMenu = function renderShopMenu() {
    const menuHtml = `
      <div class="tenotsu-menu-version">
        <span class="tenotsu-menu-version-main">${ns.VERSION || "v039_27"}</span>
        <span class="tenotsu-menu-version-sub">shop / exchange</span>
      </div>
      <div class="tenotsu-shop-menu-title">ショップメニュー</div>
      <div class="tenotsu-shop-menu-grid">
        <button type="button" class="tenotsu-shop-menu-button" data-shop-action="exchange-items">交換品を見る</button>
        <button type="button" class="tenotsu-shop-menu-button" data-shop-action="secret-word">秘密の言葉</button>
        <button type="button" class="tenotsu-shop-menu-button" data-shop-action="shop-help">交換所の説明</button>
        <button type="button" class="tenotsu-shop-menu-button back" data-shop-action="back-office">事務所に戻る</button>
      </div>
    `;

    const infoHtml = `
      <div class="tenotsu-shop-info-title">アイテム交換所</div>
      <div class="tenotsu-shop-info-body">
        <p>イベント交換・スタンプ交換・特別な合言葉交換をここへ接続予定です。</p>
        <p>v039_27では、まず事務所とショップ間の安定した画面遷移を確認します。</p>
      </div>
    `;

    ns.showShopPanel(menuHtml, infoHtml);

    const panel = ns.layers.shopMenu;
    panel.querySelectorAll("[data-shop-action]").forEach((btn) => {
      btn.addEventListener("click", () => ns.handleShopMenu(btn.dataset.shopAction));
    });
  };

  ns.enterShop = async function enterShop(options = {}) {
    if (!options.noTransition && typeof ns.transitionTo === "function") {
      return ns.transitionTo(() => ns.enterShop({ noTransition: true }));
    }
    ns.setMode("shop");
    ns.ensureLayers();
    if (typeof ns.hideSettingsPanel === "function") ns.hideSettingsPanel();
    if (typeof ns.hideMembersPanel === "function") ns.hideMembersPanel();
    if (typeof ns.hideSalesPanel === "function") ns.hideSalesPanel();
    if (typeof ns.hideTownPanel === "function") ns.hideTownPanel();
    if (typeof ns.hideSalesPanel === "function") ns.hideSalesPanel();
    if (typeof ns.clearCharacters === "function") ns.clearCharacters();
    if (typeof ns.setBackgroundReady === "function") {
      await ns.setBackgroundReady(ns.paths.shopBg);
    } else {
      ns.setBackground(ns.paths.shopBg);
    }
    ns.renderShopMenu();
    ns.setText("朔夜", "いらっしゃいませ。交換カウンターへようこそ。");
  };

  ns.handleShopMenu = function handleShopMenu(action) {
    switch(action) {
      case "exchange-items":
        ns.setText("朔夜", "交換品リストは次の段階でデータ接続します。まずは表示の安定化を確認しましょう。");
        break;
      case "secret-word":
        ns.setText("朔夜", "秘密の言葉ですね。合言葉入力UIは後続バージョンで接続します。");
        break;
      case "shop-help":
        ns.setText("朔夜", "交換所ではイベント素材やスタンプを、特別な品と交換できる予定です。");
        break;
      case "back-office":
        if (typeof ns.hideShopPanel === "function") ns.hideShopPanel();
    if (typeof ns.hideTownPanel === "function") ns.hideTownPanel();
    if (typeof ns.hideSalesPanel === "function") ns.hideSalesPanel();
        ns.enterOffice({ speaker: "店長", message: "事務所に戻りました。" });
        break;
      default:
        ns.setText("朔夜", "未接続のショップ項目です。");
    }
  };
})();
