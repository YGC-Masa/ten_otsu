/* v039_20 sales */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;

  ns.salesModes = [
    {
      id: "normal_sales",
      label: "通常営業",
      tag: "周回向け",
      description: "ひだまりストアで通常営業を行います。将来的にはオートバトルや簡易接客に接続します。",
      message: "通常営業は、周回・育成向けの店舗営業として接続予定です。"
    },
    {
      id: "practice_service",
      label: "模擬接客",
      tag: "練習",
      description: "家電星人の要望に合わせて、店員カードや接客アクションを試す練習モードです。",
      message: "模擬接客は、接客バトルの操作練習として接続予定です。"
    },
    {
      id: "sales_battle",
      label: "販売勝負準備",
      tag: "高難度",
      description: "ビリビリ電機やイベントボスとの販売勝負に挑む前の準備画面です。",
      message: "販売勝負は、マニュアル判断が重要な高難度モードとして接続予定です。"
    }
  ];

  function salesCard(mode) {
    return `
      <button type="button" class="tenotsu-sales-card" data-sales-mode="${mode.id}">
        <span class="tenotsu-sales-card-title">${mode.label}</span>
        <span class="tenotsu-sales-card-tag">${mode.tag}</span>
        <span class="tenotsu-sales-card-desc">${mode.description}</span>
      </button>
    `;
  }

  ns.renderSalesPanel = function renderSalesPanel(selectedId = null) {
    const modes = ns.salesModes || [];
    const html = `
      <div class="tenotsu-sales-title">店舗営業</div>
      <div class="tenotsu-sales-subtitle">営業モードを選択します。バトル本体は後続バージョンで接続します。</div>
      <div class="tenotsu-sales-body">
        <div class="tenotsu-sales-list">
          ${modes.map(salesCard).join("")}
        </div>
        <div class="tenotsu-sales-detail" data-sales-detail>
          <div class="tenotsu-sales-detail-empty">営業モードを選択してください。</div>
        </div>
      </div>
      <button type="button" class="tenotsu-sales-back" data-sales-action="back-office">事務所に戻る</button>
    `;

    ns.showSalesPanel(html);
    const panel = ns.layers.sales;
    const detail = panel.querySelector("[data-sales-detail]");

    const selectMode = (modeId) => {
      const mode = modes.find((item) => item.id === modeId);
      const btn = panel.querySelector(`[data-sales-mode="${modeId}"]`);
      if (!mode || !btn) return;

      panel.querySelectorAll(".tenotsu-sales-card").forEach((card) => card.classList.remove("selected"));
      btn.classList.add("selected");

      detail.innerHTML = `
        <div class="tenotsu-sales-detail-title">${mode.label}</div>
        <div class="tenotsu-sales-detail-tag">${mode.tag}</div>
        <div class="tenotsu-sales-detail-desc">${mode.description}</div>
        <button type="button" class="tenotsu-sales-start" data-sales-start="${mode.id}">この営業を開始</button>
      `;

      ns.setText("店長", mode.message);

      const start = detail.querySelector("[data-sales-start]");
      if (start) start.addEventListener("click", () => ns.startSalesMode(mode));
    };

    panel.querySelectorAll("[data-sales-mode]").forEach((btn) => {
      btn.addEventListener("click", () => selectMode(btn.dataset.salesMode));
    });

    const back = panel.querySelector('[data-sales-action="back-office"]');
    if (back) {
      back.addEventListener("click", () => {
        ns.hideSalesPanel();
        ns.enterOffice({ speaker: "店長", message: "事務所に戻りました。" });
      });
    }

    if (selectedId) selectMode(selectedId);
  };

  ns.startSalesMode = function startSalesMode(mode) {
    if (!mode) return;
    ns.setText("店長", `${mode.label}は v039_21 以降でバトル/営業プレイヤーへ接続します。`);
    const detail = ns.layers.sales.querySelector("[data-sales-detail]");
    if (detail && !detail.querySelector(".tenotsu-sales-note")) {
      detail.innerHTML += `
        <div class="tenotsu-sales-note">
          <strong>次段階：</strong><br>
          ここから営業開始ダイアログ、接客バトル、リザルト画面へ接続します。
        </div>
      `;
    }
  };

  ns.enterSales = async function enterSales(options = {}) {
    if (!options.noTransition && typeof ns.transitionTo === "function") {
      return ns.transitionTo(() => ns.enterSales({ noTransition: true }));
    }

    ns.setMode("sales");
    ns.ensureLayers();

    if (typeof ns.setBackgroundReady === "function") {
      await ns.setBackgroundReady(ns.paths.officeBg);
    } else {
      ns.setBackground(ns.paths.officeBg);
    }

    if (typeof ns.hideSettingsPanel === "function") ns.hideSettingsPanel();
    if (typeof ns.hideShopPanel === "function") ns.hideShopPanel();
    if (typeof ns.hideMembersPanel === "function") ns.hideMembersPanel();
    if (typeof ns.hideTownPanel === "function") ns.hideTownPanel();
    if (typeof ns.hideStoryLayer === "function") ns.hideStoryLayer();
    if (typeof ns.clearCharacters === "function") ns.clearCharacters();

    ns.renderOfficeMenu();
    ns.renderSalesPanel(options.selectedMode || null);
    ns.setText("店長", "店舗営業へ入ります。営業モードを選びましょう。");
  };
})();
