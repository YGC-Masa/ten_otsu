/* v039_25 sales */
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


  ns.deckBattleCustomers = [
    { id: "tv_popcorn", name: "テレビポップコーン星人", need: "映像", weak: "tv" },
    { id: "dryer_choco", name: "チョコドライヤ星人", need: "美容・ドライヤー", weak: "dryer" },
    { id: "pc_pizza", name: "パソコンピザ星人", need: "PC相談", weak: "pc" },
    { id: "phone_candy", name: "スマホキャンディ星人", need: "スマホ相談", weak: "phone" },
    { id: "audio_gummy", name: "イヤホングミ星人", need: "オーディオ", weak: "audio" }
  ];

  ns.deckBattleStaff = [
    { id: "hina", name: "緋奈", attr: "tv", power: 120, skill: "明るい映像案内" },
    { id: "ai", name: "藍", attr: "dryer", power: 115, skill: "丁寧なドライヤー案内" },
    { id: "midori", name: "翠", attr: "pc", power: 130, skill: "的確なPC提案" },
    { id: "kogane", name: "こがね", attr: "phone", power: 125, skill: "スマホ接客トーク" },
    { id: "kohaku", name: "琥珀", attr: "audio", power: 118, skill: "イヤホン聞き比べ" }
  ];

  ns.pickDeckBattleCustomers = function pickDeckBattleCustomers(count = 3) {
    const list = (ns.deckBattleCustomers || []).slice();
    const out = [];
    while (list.length && out.length < count) {
      const index = Math.floor(Math.random() * list.length);
      out.push(Object.assign({}, list.splice(index, 1)[0]));
    }
    return out;
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
    ns.setText("店長", `${mode.label}を開始しますか？ 画面中央の確認ダイアログから営業開始できます。`);
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

    ns.state.currentBattle = {
      modeId: mode.id, label: mode.label, score: 0, served: 0, combo: 0, maxCombo: 0,
      selectedCustomer: null, startedAt: Date.now(),
      customers: ns.pickDeckBattleCustomers(3),
      staff: (ns.deckBattleStaff || []).slice(0, 5)
    };

    ns.renderDeckBattle(mode);
    ns.setText("店長", "デッキ接客バトル試作です。家電星人を選び、相性の良い店員カードで接客しましょう。");
  };

  ns.renderDeckBattle = function renderDeckBattle(mode) {
    const battle = ns.state.currentBattle;
    const customers = battle.customers || [];
    const staff = battle.staff || [];

    const customerCards = customers.map((enemy, index) => `
      <button type="button" class="tenotsu-deck-enemy ${battle.selectedCustomer === index ? "selected" : ""}" data-enemy-index="${index}">
        <span class="enemy-name">${enemy.name}</span>
        <span class="enemy-need">要望：${enemy.need}</span>
      </button>`).join("");

    const staffCards = staff.map((card) => `
      <button type="button" class="tenotsu-deck-staff" data-staff-id="${card.id}">
        <span class="staff-name">${card.name}</span>
        <span class="staff-skill">${card.skill}</span>
        <span class="staff-power">営業力 ${card.power}</span>
      </button>`).join("");

    ns.showBattlePanel(`
      <div class="tenotsu-battle-title">${mode.label}</div>
      <div class="tenotsu-battle-subtitle">デッキ接客バトル試作</div>
      <div class="tenotsu-deck-status">
        <div>スコア <strong>${battle.score}</strong></div>
        <div>接客数 <strong>${battle.served}</strong></div>
        <div>コンボ <strong>${battle.combo}</strong></div>
      </div>
      <div class="tenotsu-deck-battle-field">
        <div class="tenotsu-deck-enemy-row">${customerCards}</div>
        <div class="tenotsu-deck-help">①家電星人を選択 → ②店員カードで接客</div>
        <div class="tenotsu-deck-staff-row">${staffCards}</div>
      </div>
      <div class="tenotsu-battle-actions">
        <button type="button" class="tenotsu-battle-button" data-battle-action="change">選択星人をチェンジ</button>
        <button type="button" class="tenotsu-battle-button danger" data-battle-action="end">営業終了</button>
      </div>`);

    const panel = ns.layers.battle;
    panel.querySelectorAll("[data-enemy-index]").forEach((btn) => {
      btn.addEventListener("click", () => {
        battle.selectedCustomer = Number(btn.dataset.enemyIndex);
        ns.renderDeckBattle(mode);
        const enemy = battle.customers[battle.selectedCustomer];
        ns.setText("店長", `${enemy.name}を接客対象にしました。相性の良い店員を選びましょう。`);
      });
    });
    panel.querySelectorAll("[data-staff-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = battle.staff.find((item) => item.id === btn.dataset.staffId);
        ns.resolveDeckService(mode, card);
      });
    });
    panel.querySelector('[data-battle-action="change"]').addEventListener("click", () => ns.changeDeckCustomer(mode));
    panel.querySelector('[data-battle-action="end"]').addEventListener("click", () => ns.showSalesResult(mode));
  };

  ns.resolveDeckService = function resolveDeckService(mode, card) {
    const battle = ns.state.currentBattle;
    if (!battle || !card) return;
    if (battle.selectedCustomer === null || battle.selectedCustomer === undefined) {
      ns.setText("店長", "先に接客する家電星人を選んでください。");
      return;
    }
    const enemy = battle.customers[battle.selectedCustomer];
    const matched = card.attr === enemy.weak;
    const comboBonus = Math.min(battle.combo * 10, 80);
    const gain = matched ? card.power + 80 + comboBonus : Math.floor(card.power * 0.45);
    battle.score += gain;
    battle.served += 1;
    battle.combo = matched ? battle.combo + 1 : 0;
    battle.maxCombo = Math.max(battle.maxCombo || 0, battle.combo);

    const pool = ns.deckBattleCustomers || [];
    battle.customers.splice(battle.selectedCustomer, 1, Object.assign({}, pool[Math.floor(Math.random() * pool.length)]));
    battle.selectedCustomer = null;
    ns.renderDeckBattle(mode);
    ns.setText("店長", matched ? `${card.name}の${card.skill}が刺さりました！ +${gain}点` : `${card.name}で接客しましたが相性はいまひとつ。 +${gain}点`);
  };

  ns.changeDeckCustomer = function changeDeckCustomer(mode) {
    const battle = ns.state.currentBattle;
    if (!battle) return;
    if (battle.selectedCustomer === null || battle.selectedCustomer === undefined) {
      ns.setText("店長", "チェンジする家電星人を先に選んでください。");
      return;
    }
    const pool = ns.deckBattleCustomers || [];
    battle.customers.splice(battle.selectedCustomer, 1, Object.assign({}, pool[Math.floor(Math.random() * pool.length)]));
    battle.score = Math.max(0, battle.score - 30);
    battle.combo = 0;
    battle.selectedCustomer = null;
    ns.renderDeckBattle(mode);
    ns.setText("店長", "家電星人をチェンジしました。ペナルティ -30点、コンボリセットです。");
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
        <div><span>最大コンボ</span><strong>${battle.maxCombo || 0}</strong></div>
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
