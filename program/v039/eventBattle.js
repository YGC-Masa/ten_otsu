/* v039_87 eventBattle.js
 * イベントバトルをリズムゲームからラン＆バトル方式へ変更。
 * STでエンカウント、専用イベントBPでブラック家電星人を追い返し、ダークエレメントを獲得する。
 */
(function () {
  "use strict";

  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};
  const VERSION = "v039_87_event_run_battle";
  const ROOT_ID = "event-battle-root";
  const STORAGE_KEY = "tenotsu_event_run_battle_v1";
  const ENCOUNTER_ST_COST = 20;
  const EVENT_BP_COST = 1;

  const LADDER_REWARDS = [
    { id: "ladder_010", point: 10, label: "ダークエレメント 10", reward: "イベントメダル x1" },
    { id: "ladder_030", point: 30, label: "ダークエレメント 30", reward: "チューニング素材 x2" },
    { id: "ladder_060", point: 60, label: "ダークエレメント 60", reward: "家電星人金貨 x10" },
    { id: "ladder_100", point: 100, label: "ダークエレメント 100", reward: "ブラックチップ x1" },
    { id: "ladder_160", point: 160, label: "ダークエレメント 160", reward: "イベントメダル x3" },
    { id: "ladder_240", point: 240, label: "ダークエレメント 240", reward: "朔夜の研究メモ x1" },
    { id: "ladder_360", point: 360, label: "ダークエレメント 360", reward: "限定チューニング素材 x3" },
    { id: "ladder_500", point: 500, label: "ダークエレメント 500", reward: "称号：夜間回収協力者" }
  ];

  let root = null;
  let state = null;
  let originalOpenBattle = null;
  let originalCloseBattle = null;
  let runTimer = null;

  function nowIso() { return new Date().toISOString(); }
  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>\"]/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch] || ch;
    });
  }
  function clamp(value, min, max) { return Math.max(min, Math.min(max, Number(value) || 0)); }

  function ensureRoot() {
    root = document.getElementById(ROOT_ID);
    if (!root) {
      root = document.createElement("div");
      root.id = ROOT_ID;
      root.className = "event-battle-root hidden";
      document.body.appendChild(root);
    }
  }

  function loadProgress() {
    let data = null;
    try { data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch (_) { data = null; }
    if (!data || typeof data !== "object") {
      data = {
        version: "v039_87",
        darkElements: 0,
        totalDarkElements: 0,
        totalEncounters: 0,
        totalRepelled: 0,
        totalFailed: 0,
        maxThreatLevel: 1,
        claimedLadder: {},
        lastResult: null,
        history: []
      };
    }
    data.version = "v039_87";
    data.darkElements = Math.max(0, Math.floor(Number(data.darkElements) || 0));
    data.totalDarkElements = Math.max(data.darkElements, Math.floor(Number(data.totalDarkElements) || 0));
    data.totalEncounters = Math.max(0, Math.floor(Number(data.totalEncounters) || 0));
    data.totalRepelled = Math.max(0, Math.floor(Number(data.totalRepelled) || 0));
    data.totalFailed = Math.max(0, Math.floor(Number(data.totalFailed) || 0));
    data.maxThreatLevel = Math.max(1, Math.floor(Number(data.maxThreatLevel) || 1));
    data.claimedLadder = data.claimedLadder && typeof data.claimedLadder === "object" ? data.claimedLadder : {};
    data.history = Array.isArray(data.history) ? data.history.slice(-30) : [];
    return data;
  }
  function saveProgress(data) {
    data.version = "v039_87";
    data.updatedAt = nowIso();
    data.history = Array.isArray(data.history) ? data.history.slice(-30) : [];
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_) {}
    return data;
  }

  function isEventRequest(options) {
    options = options || {};
    const mode = options.mode || {};
    return options.battleType === "eventBoss" || mode.battleType === "eventBoss" || mode.id === "event_sales" || ns.state.currentBattleType === "eventBoss";
  }

  function getEventBpState() {
    return window.TenotsuEventBattlePoint && typeof window.TenotsuEventBattlePoint.getState === "function"
      ? window.TenotsuEventBattlePoint.getState()
      : { current: 999, max: 999 };
  }
  function getEventBpNextLabel() {
    return window.TenotsuEventBattlePoint && typeof window.TenotsuEventBattlePoint.getNextRecoveryInfo === "function"
      ? window.TenotsuEventBattlePoint.getNextRecoveryInfo().label
      : "30分に1回復";
  }
  function consumeEventBp() {
    if (window.TenotsuEventBattlePoint && typeof window.TenotsuEventBattlePoint.consume === "function") {
      return window.TenotsuEventBattlePoint.consume(EVENT_BP_COST, "ブラック家電星人戦");
    }
    return { ok: true, cost: EVENT_BP_COST, state: getEventBpState() };
  }
  function consumeStaminaForEncore() {
    if (window.TenotsuStamina && typeof window.TenotsuStamina.consume === "function") {
      return window.TenotsuStamina.consume(ENCOUNTER_ST_COST, "イベント再探索");
    }
    return { ok: true, cost: ENCOUNTER_ST_COST, state: { current: 999, max: 999 } };
  }
  function getStaminaState() {
    return window.TenotsuStamina && typeof window.TenotsuStamina.getState === "function"
      ? window.TenotsuStamina.getState()
      : { current: 999, max: 999 };
  }

  function calcThreatLevel(progress) {
    return Math.max(1, Math.floor((progress.totalRepelled || 0) + (progress.totalFailed || 0) * 0.5) + 1);
  }
  function calcWinRate(threatLevel) {
    if (threatLevel <= 3) return 1;
    return clamp(0.97 - (threatLevel - 3) * 0.045, 0.38, 0.97);
  }
  function calcEnemyPower(threatLevel) {
    return Math.round(90 + threatLevel * 18 + Math.pow(Math.max(0, threatLevel - 5), 1.35) * 7);
  }
  function calcReward(threatLevel, success) {
    const base = success ? 8 + threatLevel * 2 : Math.max(1, Math.floor(threatLevel * 0.8));
    const variance = success ? Math.floor(Math.random() * 4) : 0;
    return Math.max(1, base + variance);
  }

  function makeState(options) {
    const progress = loadProgress();
    return {
      options: options || {},
      mode: options && options.mode ? options.mode : {},
      phase: "ready",
      runProgress: 0,
      runPaid: true,
      progress,
      threatLevel: calcThreatLevel(progress),
      enemyPower: calcEnemyPower(calcThreatLevel(progress)),
      winRate: calcWinRate(calcThreatLevel(progress)),
      darkRewardPreview: calcReward(calcThreatLevel(progress), true),
      notice: "STでエンカウントし、専用イベントBPでブラック家電星人を追い返します。",
      result: null
    };
  }

  function stageClass() {
    if (!state) return "";
    return `event-phase-${state.phase}`;
  }
  function bossTitle() {
    if (!state) return "ブラック家電星人";
    if (state.phase === "run") return "探索中……";
    if (state.phase === "encounter") return `ブラック家電星人 Lv.${state.threatLevel}`;
    if (state.phase === "fight") return "戦闘中";
    if (state.phase === "result") return state.result && state.result.success ? "追い返し成功" : "撤退";
    return "ブラック家電星人イベント";
  }

  function renderHud() {
    const progress = state.progress;
    const ep = getEventBpState();
    const st = getStaminaState();
    return `
      <div class="event-battle-hud">
        <div class="event-battle-title">イベント営業 / ラン＆バトル</div>
        <div class="event-battle-stats">
          <span>ST <b>${st.current}/${st.max}</b></span>
          <span>イベントBP <b>${ep.current}/${ep.max}</b></span>
          <span>${escapeHtml(getEventBpNextLabel())}</span>
          <span>ダークエレメント <b>${progress.darkElements}</b></span>
          <span>累計 <b>${progress.totalDarkElements}</b></span>
        </div>
      </div>
    `;
  }

  function renderBossArea() {
    const level = state.threatLevel;
    const power = state.enemyPower;
    const rate = Math.round(state.winRate * 100);
    return `
      <div class="event-battle-boss-area">
        <div class="event-battle-boss-card">
          <div class="event-battle-boss-crystal">◆</div>
          <div class="event-battle-boss-copy">
            <div class="event-battle-boss-name">${escapeHtml(bossTitle())}</div>
            <div class="event-battle-boss-desc">黒いノイズをまとった家電星人。戦うほど強くなります。朔夜は結晶化したダークエレメントを何かに使っているようです。</div>
          </div>
        </div>
        <div class="event-battle-gauges">
          <div class="event-gauge"><span>THREAT</span><i><b style="width:${Math.min(100, level * 8)}%"></b></i><em>Lv.${level}</em></div>
          <div class="event-gauge power"><span>POWER</span><i><b style="width:${Math.min(100, power / 4)}%"></b></i><em>${power}</em></div>
          <div class="event-gauge chance"><span>RATE</span><i><b style="width:${rate}%"></b></i><em>${rate}%</em></div>
        </div>
        <div class="event-battle-message">${escapeHtml(state.notice || "")}</div>
      </div>
    `;
  }

  function renderReady() {
    return `
      <div class="event-run-panel">
        <div class="event-run-card">
          <b>ブラック家電星人を探す</b>
          <p>イベント営業開始時にSTを消費済みです。走って探索し、遭遇後にイベントBPで戦います。</p>
          <div class="event-route-line"><span></span><span></span><span></span><span></span></div>
          <button type="button" data-event-action="run">探索開始</button>
        </div>
      </div>
    `;
  }
  function renderRun() {
    return `
      <div class="event-run-panel">
        <div class="event-run-card">
          <b>探索中</b>
          <p>家電星人の反応を追跡しています。</p>
          <div class="event-run-progress"><i style="width:${Math.round(state.runProgress)}%"></i></div>
          <small>${Math.round(state.runProgress)}%</small>
        </div>
      </div>
    `;
  }
  function renderEncounter() {
    const ep = getEventBpState();
    return `
      <div class="event-run-panel event-encounter-panel">
        <div class="event-run-card">
          <b>エンカウント！</b>
          <p>ブラック家電星人 Lv.${state.threatLevel} が現れました。イベントBPを1消費して追い返します。</p>
          <div class="event-encounter-info">
            <span>イベントBP ${ep.current}/${ep.max}</span>
            <span>勝率目安 ${Math.round(state.winRate * 100)}%</span>
            <span>予想ダークエレメント +${state.darkRewardPreview}</span>
          </div>
          <div class="event-action-row">
            <button type="button" data-event-action="fight">イベントBP1で戦う</button>
            <button type="button" data-event-action="retreat" class="event-sub-button">撤退</button>
          </div>
        </div>
      </div>
    `;
  }
  function renderFight() {
    return `
      <div class="event-run-panel">
        <div class="event-run-card">
          <b>戦闘中</b>
          <p>ブラック家電星人を追い返しています……</p>
          <div class="event-run-progress event-fight-progress"><i style="width:72%"></i></div>
        </div>
      </div>
    `;
  }
  function ladderRows() {
    const total = state.progress.totalDarkElements;
    return LADDER_REWARDS.map((item) => {
      const claimed = !!state.progress.claimedLadder[item.id];
      const reached = total >= item.point;
      return `<div class="event-ladder-row ${reached ? "is-reached" : ""} ${claimed ? "is-claimed" : ""}">
        <div><b>${escapeHtml(item.label)}</b><small>${escapeHtml(item.reward)}</small></div>
        <button type="button" data-event-claim="${escapeHtml(item.id)}" ${(!reached || claimed) ? "disabled" : ""}>${claimed ? "受取済" : reached ? "受け取る" : "未達成"}</button>
      </div>`;
    }).join("");
  }
  function renderResult() {
    const r = state.result || {};
    return `
      <div class="event-result-panel">
        <div class="event-result-card">
          <div class="event-result-title">${r.success ? "追い返し成功！" : "いったん撤退"}</div>
          <div class="event-result-grid">
            <div><span>THREAT</span><b>Lv.${state.threatLevel}</b></div>
            <div><span>DARK ELEMENT</span><b>+${r.darkElements || 0}</b></div>
            <div><span>累計</span><b>${state.progress.totalDarkElements}</b></div>
            <div><span>勝率</span><b>${Math.round((r.winRate || state.winRate) * 100)}%</b></div>
          </div>
          <div class="event-result-lore">
            <b>ダークエレメント</b>
            <p>黒いノイズが結晶化したクリスタル型のイベントポイントです。朔夜が夜間交換カウンターで回収し、何かの調律に使っています。</p>
          </div>
          <div class="event-ladder-panel">
            <b>戦利品交換ラダー</b>
            ${ladderRows()}
          </div>
          <div class="event-result-actions">
            <button type="button" data-event-action="rerun">ST20で再探索</button>
            <button type="button" data-event-action="close" class="event-sub-button">店舗営業へ戻る</button>
          </div>
        </div>
      </div>
    `;
  }
  function renderBody() {
    if (!state) return "";
    if (state.phase === "ready") return renderReady();
    if (state.phase === "run") return renderRun();
    if (state.phase === "encounter") return renderEncounter();
    if (state.phase === "fight") return renderFight();
    if (state.phase === "result") return renderResult();
    return renderReady();
  }
  function render() {
    ensureRoot();
    if (!state) return;
    root.className = `event-battle-root ${stageClass()}`;
    root.dataset.phase = state.phase;
    root.innerHTML = `<div class="event-battle-stage">${renderHud()}${renderBossArea()}${renderBody()}</div>`;
    bind();
  }

  function startRun(skipStamina) {
    if (!state) return;
    if (!skipStamina) {
      const paid = consumeStaminaForEncore();
      if (!paid.ok) {
        state.notice = `スタミナが足りません。現在 ${paid.state.current}/${paid.state.max}、必要 ${paid.cost} です。`;
        render();
        return;
      }
    }
    state.phase = "run";
    state.runProgress = 0;
    state.notice = "走ってブラック家電星人の反応を追跡中です。";
    render();
    clearInterval(runTimer);
    runTimer = setInterval(() => {
      if (!state || state.phase !== "run") { clearInterval(runTimer); return; }
      state.runProgress += 8 + Math.random() * 8;
      if (state.runProgress >= 100) {
        clearInterval(runTimer);
        const progress = loadProgress();
        progress.totalEncounters += 1;
        progress.maxThreatLevel = Math.max(progress.maxThreatLevel || 1, state.threatLevel);
        progress.history.push({ type: "encounter", level: state.threatLevel, at: nowIso() });
        saveProgress(progress);
        state.progress = progress;
        state.phase = "encounter";
        state.runProgress = 100;
        state.notice = "ブラック家電星人を発見しました。イベントBPで戦えます。";
      }
      render();
    }, 180);
  }

  function resolveFight() {
    if (!state || state.phase !== "encounter") return;
    const consumed = consumeEventBp();
    if (!consumed.ok) {
      state.notice = `イベントBPが足りません。現在 ${consumed.state.current}/${consumed.state.max}、必要 ${consumed.cost} です。30分に1回復します。`;
      render();
      return;
    }
    state.phase = "fight";
    state.notice = "ブラック家電星人と交戦中です。";
    render();
    setTimeout(() => {
      if (!state) return;
      const success = Math.random() <= state.winRate;
      const gained = calcReward(state.threatLevel, success);
      const progress = loadProgress();
      progress.darkElements += gained;
      progress.totalDarkElements += gained;
      if (success) progress.totalRepelled += 1;
      else progress.totalFailed += 1;
      progress.maxThreatLevel = Math.max(progress.maxThreatLevel || 1, state.threatLevel);
      progress.lastResult = { success, darkElements: gained, level: state.threatLevel, winRate: state.winRate, at: nowIso() };
      progress.history.push({ type: "fight", success, darkElements: gained, level: state.threatLevel, at: nowIso() });
      saveProgress(progress);
      state.progress = progress;
      state.result = progress.lastResult;
      state.notice = success ? "追い返し成功。ダークエレメントを回収しました。" : "撤退しましたが、欠片を少し回収できました。";
      state.phase = "result";
      render();
    }, 760);
  }

  function claimLadder(id) {
    const item = LADDER_REWARDS.find((x) => x.id === id);
    if (!item || !state) return;
    const progress = loadProgress();
    if (progress.totalDarkElements < item.point || progress.claimedLadder[item.id]) return;
    progress.claimedLadder[item.id] = { at: nowIso(), reward: item.reward };
    progress.history.push({ type: "claim", id: item.id, reward: item.reward, at: nowIso() });
    saveProgress(progress);
    state.progress = progress;
    state.notice = `${item.reward} を受け取りました。`;
    render();
  }

  function bind() {
    if (!root) return;
    root.querySelectorAll("[data-event-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.eventAction;
        if (action === "run") startRun(true);
        else if (action === "fight") resolveFight();
        else if (action === "retreat") {
          state.result = { success: false, darkElements: 0, winRate: state.winRate };
          state.phase = "result";
          state.notice = "撤退しました。";
          render();
        }
        else if (action === "rerun") {
          state = makeState({ mode: state.mode, battleType: "eventBoss" });
          openEventBattle({ mode: state.mode, battleType: "eventBoss", skipInitialRender: true });
          startRun(false);
        }
        else if (action === "close") closeEventBattle();
      });
    });
    root.querySelectorAll("[data-event-claim]").forEach((btn) => {
      btn.addEventListener("click", () => claimLadder(btn.dataset.eventClaim));
    });
  }

  function openEventBattle(options) {
    ensureRoot();
    clearInterval(runTimer);
    state = makeState(options || {});
    document.body.classList.add("event-battle-screen");
    if (ns.setMode) ns.setMode("eventBattle");
    root.classList.remove("hidden");
    render();
    return true;
  }
  function closeEventBattle() {
    clearInterval(runTimer);
    if (root) {
      root.classList.add("hidden");
      root.innerHTML = "";
    }
    state = null;
    document.body.classList.remove("event-battle-screen");
    try { document.dispatchEvent(new CustomEvent("tenotsu:battle:closed", { detail: { type: "eventBattle" } })); } catch (_) {}
    if (ns.setMode) ns.setMode("sales");
    return true;
  }

  function installPatch() {
    if (!window.BattleProto || window.BattleProto.__eventBattlePatchedV87) return false;
    originalOpenBattle = window.BattleProto.openBattle;
    originalCloseBattle = window.BattleProto.closeBattle;
    window.BattleProto.openBattle = function (options) {
      if (isEventRequest(options || {})) return openEventBattle(options || {});
      return originalOpenBattle.apply(this, arguments);
    };
    window.BattleProto.closeBattle = function () {
      if (state) return closeEventBattle();
      return originalCloseBattle.apply(this, arguments);
    };
    window.BattleProto.__eventBattlePatchedV87 = true;
    window.TenotsuEventBattle = api;
    return true;
  }

  const api = {
    VERSION,
    open: openEventBattle,
    close: closeEventBattle,
    getState: () => state,
    getProgress: loadProgress,
    ladderRewards: LADDER_REWARDS.slice()
  };
  window.TenotsuEventBattle = api;

  window.addEventListener("load", () => {
    ensureRoot();
    if (!installPatch()) {
      let tries = 0;
      const id = setInterval(() => {
        tries += 1;
        if (installPatch() || tries > 20) clearInterval(id);
      }, 100);
    }
  });
})();
