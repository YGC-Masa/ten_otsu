/* v039_21 sales */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;

  ns.salesModes = [
    {
      id: "normal_sales",
      label: "通常営業",
      tag: "周回向け",
      description: "ひだまりストアで通常営業を行います。将来的にはオートバトルや簡易接客に接続します。",
      message: "通常営業は、周回・育成向けの店舗営業として接続予定です。",
      duration: 30,
      target: "来店した家電星人をできるだけ多く接客する"
    },
    {
      id: "practice_service",
      label: "模擬接客",
      tag: "練習",
      description: "家電星人の要望に合わせて、店員カードや接客アクションを試す練習モードです。",
      message: "模擬接客は、接客バトルの操作練習として接続予定です。",
      duration: 20,
      target: "操作確認と接客練習を行う"
    },
    {
      id: "sales_battle",
      label: "販売勝負準備",
      tag: "高難度",
      description: "ビリビリ電機やイベントボスとの販売勝負に挑む前の準備画面です。",
      message: "販売勝負は、マニュアル判断が重要な高難度モードとして接続予定です。",
      duration: 45,
      target: "販売勝負で高評価を狙う"
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
    ns.openSalesStartDialog(mode);
  };

  ns.openSalesStartDialog = function openSalesStartDialog(mode) {
    const detail = ns.layers.sales.querySelector("[data-sales-detail]");
    if (!detail) return;
    detail.innerHTML = `
      <div class="tenotsu-sales-dialog">
        <div class="tenotsu-sales-detail-title">${mode.label}</div>
        <div class="tenotsu-sales-detail-tag">${mode.tag}</div>
        <div class="tenotsu-sales-detail-desc">${mode.description}</div>
        <div class="tenotsu-sales-dialog-spec">
          <div><strong>目標：</strong>${mode.target || "営業を成功させる"}</div>
          <div><strong>制限時間：</strong>${mode.duration || 30}秒</div>
          <div><strong>現在：</strong>仮バトル接続テスト</div>
        </div>
        <div class="tenotsu-sales-dialog-actions">
          <button type="button" class="tenotsu-sales-start" data-sales-dialog="start">営業開始</button>
          <button type="button" class="tenotsu-sales-cancel" data-sales-dialog="cancel">戻る</button>
        </div>
      </div>`;
    ns.setText("店長", `${mode.label}を開始しますか？`);
    detail.querySelector('[data-sales-dialog="start"]').addEventListener("click", () => ns.enterBattleMock(mode));
    detail.querySelector('[data-sales-dialog="cancel"]').addEventListener("click", () => ns.renderSalesPanel(mode.id));
  };

  ns.enterBattleMock = async function enterBattleMock(mode) {
    if (typeof ns.transitionTo === "function") return ns.transitionTo(() => ns.enterBattleMockDirect(mode));
    return ns.enterBattleMockDirect(mode);
  };

  ns.enterBattleMockDirect = async function enterBattleMockDirect(mode) {
    ns.setMode("battle");
    ns.ensureLayers();
    if (typeof ns.setBackgroundReady === "function") await ns.setBackgroundReady(ns.paths.officeBg);
    else ns.setBackground(ns.paths.officeBg);

    if (typeof ns.hideSalesPanel === "function") ns.hideSalesPanel();
    if (typeof ns.hideSettingsPanel === "function") ns.hideSettingsPanel();
    if (typeof ns.hideShopPanel === "function") ns.hideShopPanel();
    if (typeof ns.hideMembersPanel === "function") ns.hideMembersPanel();
    if (typeof ns.hideTownPanel === "function") ns.hideTownPanel();
    if (typeof ns.clearCharacters === "function") ns.clearCharacters();

    const seconds = mode.duration || 30;
    ns.showBattlePanel(`
      <div class="tenotsu-battle-title">${mode.label}</div>
      <div class="tenotsu-battle-subtitle">仮バトル画面</div>
      <div class="tenotsu-battle-stage">
        <div class="tenotsu-battle-customer">家電星人</div>
        <div class="tenotsu-battle-request">「おすすめの商品を教えてほしいです」</div>
        <div class="tenotsu-battle-timer" data-battle-timer>${seconds}</div>
      </div>
      <div class="tenotsu-battle-actions">
        <button type="button" class="tenotsu-battle-button" data-battle-action="good">接客成功</button>
        <button type="button" class="tenotsu-battle-button" data-battle-action="normal">ふつうに接客</button>
        <button type="button" class="tenotsu-battle-button danger" data-battle-action="end">営業終了</button>
      </div>`);
    ns.state.currentBattle = { modeId: mode.id, label: mode.label, score: 0, served: 0, startedAt: Date.now() };
    ns.setText("店長", "営業を開始しました。仮バトル画面です。");
    const panel = ns.layers.battle;
    panel.querySelector('[data-battle-action="good"]').addEventListener("click", () => {
      ns.state.currentBattle.score += 120; ns.state.currentBattle.served += 1;
      ns.setText("店長", `接客成功！ スコア ${ns.state.currentBattle.score}`);
    });
    panel.querySelector('[data-battle-action="normal"]').addEventListener("click", () => {
      ns.state.currentBattle.score += 60; ns.state.currentBattle.served += 1;
      ns.setText("店長", `接客しました。スコア ${ns.state.currentBattle.score}`);
    });
    panel.querySelector('[data-battle-action="end"]').addEventListener("click", () => ns.showSalesResult(mode));
  };

  ns.showSalesResult = async function showSalesResult(mode) {
    if (typeof ns.transitionTo === "function") return ns.transitionTo(() => ns.showSalesResultDirect(mode));
    return ns.showSalesResultDirect(mode);
  };

  ns.showSalesResultDirect = async function showSalesResultDirect(mode) {
    ns.setMode("result");
    const battle = ns.state.currentBattle || { score: 0, served: 0, label: mode.label };
    const elapsed = Math.max(1, Math.round((Date.now() - (battle.startedAt || Date.now())) / 1000));
    const rank = battle.score >= 360 ? "A" : battle.score >= 180 ? "B" : "C";
    if (typeof ns.hideBattlePanel === "function") ns.hideBattlePanel();
    ns.showResultPanel(`
      <div class="tenotsu-result-title">営業リザルト</div>
      <div class="tenotsu-result-mode">${battle.label || mode.label}</div>
      <div class="tenotsu-result-grid">
        <div><span>スコア</span><strong>${battle.score}</strong></div>
        <div><span>接客数</span><strong>${battle.served}</strong></div>
        <div><span>経過</span><strong>${elapsed}秒</strong></div>
        <div><span>評価</span><strong>${rank}</strong></div>
      </div>
      <div class="tenotsu-result-actions">
        <button type="button" class="tenotsu-result-button" data-result-action="retry">もう一度</button>
        <button type="button" class="tenotsu-result-button" data-result-action="sales">店舗営業へ戻る</button>
        <button type="button" class="tenotsu-result-button" data-result-action="office">事務所へ戻る</button>
      </div>`);
    ns.setText("店長", `営業終了です。評価は${rank}でした。`);
    const panel = ns.layers.result;
    panel.querySelector('[data-result-action="retry"]').addEventListener("click", () => { ns.hideResultPanel(); ns.enterBattleMock(mode); });
    panel.querySelector('[data-result-action="sales"]').addEventListener("click", () => { ns.hideResultPanel(); ns.enterSales({ selectedMode: mode.id }); });
    panel.querySelector('[data-result-action="office"]').addEventListener("click", () => { ns.hideResultPanel(); ns.enterOffice({ speaker: "店長", message: "事務所に戻りました。" }); });
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
    if (typeof ns.hideBattlePanel === "function") ns.hideBattlePanel();
    if (typeof ns.hideResultPanel === "function") ns.hideResultPanel();
    if (typeof ns.clearCharacters === "function") ns.clearCharacters();

    ns.renderOfficeMenu();
    ns.renderSalesPanel(options.selectedMode || null);
    ns.setText("店長", "店舗営業へ入ります。営業モードを選びましょう。");
  };
})();
