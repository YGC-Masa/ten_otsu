/* v039_81 eventBattle.js
 * イベント営業用のブラック家電星人ボス通常モード。
 * v039_81ではフィルインノーツの本実装は行わず、通常モードでシールドを削る入口を実装する。
 */
(function () {
  "use strict";

  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};
  const VERSION = "v039_81_event_battle_normal_mode";
  const ROOT_ID = "event-battle-root";
  const BATTLE_SECONDS = 45;
  const SHIELD_MAX = 120;
  const BOSS_HP_MAX = 100;
  const BOSS_CHARGE_MAX = 100;
  const RESULT_STORAGE_KEY = "tenotsu_event_battle_rewards_v1";

  const FUTURE_FILL_PATTERNS = [
    {
      id: "basic_fill_01",
      label: "ドン、タン、ドン、タン、タカ、トン、ジャーン",
      lanes: ["KICK", "SNARE", "KICK", "SNARE", "HIGH_TOM", "LOW_TOM", "LOW_TOM", "CRASH"]
    },
    {
      id: "basic_fill_02",
      label: "ドン、ドン、タン、タカ、トン、ジャーン",
      lanes: ["KICK", "KICK", "SNARE", "HIGH_TOM", "LOW_TOM", "LOW_TOM", "CRASH"]
    },
    {
      id: "rush_fill_01",
      label: "ドン、タン、タカ、ドン、タン、トン、ジャーン",
      lanes: ["KICK", "SNARE", "HIGH_TOM", "LOW_TOM", "KICK", "SNARE", "LOW_TOM", "CRASH"]
    },
    {
      id: "shield_break_fill_01",
      label: "タン、ドン、タカ、トン、ドン、ジャーン",
      lanes: ["SNARE", "KICK", "HIGH_TOM", "LOW_TOM", "KICK", "CRASH"]
    }
  ];

  let root = null;
  let state = null;
  let timerId = null;
  let originalOpenBattle = null;
  let originalCloseBattle = null;
  let pointer = null;

  function nowMs() { return Date.now(); }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>\"]/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch] || ch;
    });
  }

  function ensureRoot() {
    root = document.getElementById(ROOT_ID);
    if (!root) {
      root = document.createElement("div");
      root.id = ROOT_ID;
      root.className = "event-battle-root hidden";
      document.body.appendChild(root);
    }
  }

  function isEventRequest(options) {
    options = options || {};
    const mode = options.mode || {};
    return options.battleType === "eventBoss" || mode.battleType === "eventBoss" || mode.id === "event_sales" || ns.state.currentBattleType === "eventBoss";
  }

  function pickFutureFillPattern() {
    return FUTURE_FILL_PATTERNS[Math.floor(Math.random() * FUTURE_FILL_PATTERNS.length)];
  }

  function makeState(options) {
    const mode = options && options.mode ? options.mode : {};
    return {
      mode,
      phase: "ready",
      startedAt: 0,
      endsAt: 0,
      left: BATTLE_SECONDS,
      shield: SHIELD_MAX,
      shieldMax: SHIELD_MAX,
      bossHp: BOSS_HP_MAX,
      bossCharge: 0,
      combo: 0,
      maxCombo: 0,
      just: 0,
      good: 0,
      miss: 0,
      score: 0,
      inputText: "開始すると、タップ・フリック・ホールドでノイズシールドを削ります。",
      notice: "フィルインノーツは将来、複数パターンからランダム選択します。",
      flickDir: randomDir(),
      holdStartedAt: 0,
      selectedFutureFill: null,
      resultSaved: false
    };
  }

  function randomDir() {
    const list = ["left", "right", "up", "down"];
    return list[Math.floor(Math.random() * list.length)];
  }

  function dirLabel(dir) {
    return ({ left: "左", right: "右", up: "上", down: "下" })[dir] || "任意";
  }

  function openEventBattle(options) {
    if (ns && typeof ns.setMode === "function") ns.setMode("eventBattle");
    ensureRoot();
    state = makeState(options || {});
    pointer = null;
    document.body.classList.add("event-battle-screen", "battle-screen");
    root.classList.remove("hidden");
    render();
    if (ns && typeof ns.setText === "function") ns.setText("店長", "イベント営業を開始します。ブラック家電星人のノイズシールドを削りましょう。");
  }

  function closeEventBattle() {
    stopLoop();
    if (root) root.classList.add("hidden");
    document.body.classList.remove("event-battle-screen", "battle-screen");
    pointer = null;
    state = null;
    try {
      document.dispatchEvent(new CustomEvent("tenotsu:battle:closed", { detail: { source: "EventBattle", version: VERSION } }));
    } catch (_) {}
  }

  function startBattle() {
    if (!state) return;
    state.phase = "normal";
    state.startedAt = nowMs();
    state.endsAt = state.startedAt + BATTLE_SECONDS * 1000;
    state.inputText = "通常モード開始。タップ・フリック・ホールドでシールドを削ってください。";
    state.notice = `フリック指示：${dirLabel(state.flickDir)}へ流す`;
    stopLoop();
    timerId = window.setInterval(tick, 100);
    render();
  }

  function stopLoop() {
    if (timerId) window.clearInterval(timerId);
    timerId = null;
  }

  function tick() {
    if (!state || state.phase !== "normal") return;
    const left = Math.max(0, Math.ceil((state.endsAt - nowMs()) / 1000));
    state.left = left;
    state.bossCharge = Math.min(BOSS_CHARGE_MAX, state.bossCharge + 1.2);
    if (state.bossCharge >= BOSS_CHARGE_MAX) {
      state.bossCharge = 0;
      state.shield = Math.min(state.shieldMax, state.shield + 5);
      state.combo = 0;
      state.notice = "ブラック家電星人がノイズを再充填しました。シールドが少し戻ります。";
    }
    if (left <= 0) finishBattle(false, "時間切れ。今回はノイズシールドを崩しきれませんでした。");
    else render();
  }

  function addScore(base, rating) {
    const comboBonus = Math.min(1.6, 1 + state.combo * 0.03);
    const ratingBonus = rating === "JUST" ? 1.35 : rating === "GOOD" ? 1.0 : 0.25;
    state.score += Math.round(base * comboBonus * ratingBonus);
  }

  function damageShield(amount, rating, text) {
    if (!state || state.phase !== "normal") return;
    if (rating === "MISS") {
      state.combo = 0;
      state.miss += 1;
      state.notice = text || "MISS。ノイズが乱れました。";
      addScore(10, rating);
      render();
      return;
    }
    state.shield = Math.max(0, state.shield - amount);
    state.combo += 1;
    state.maxCombo = Math.max(state.maxCombo, state.combo);
    if (rating === "JUST") state.just += 1;
    else state.good += 1;
    state.notice = text || `${rating}！ シールド -${amount}`;
    addScore(amount * 12, rating);
    state.bossCharge = Math.max(0, state.bossCharge - (rating === "JUST" ? 12 : 7));
    if (state.shield <= 0) finishBattle(true, "ノイズシールド破壊！ ラッシュモード突入予定です。");
    else render();
  }

  function handleTap() {
    damageShield(8, "GOOD", "TAP。シールドを少し削りました。連続入力でコンボが伸びます。");
  }

  function handleFlick(actualDir) {
    if (actualDir === state.flickDir) {
      state.flickDir = randomDir();
      damageShield(20, "JUST", `JUST FLICK！ ${dirLabel(actualDir)}へノイズを流しました。`);
    } else {
      damageShield(5, "MISS", `方向違い。次は${dirLabel(state.flickDir)}へ流してください。`);
    }
  }

  function handleHold(duration) {
    if (duration >= 620 && duration <= 1080) {
      damageShield(28, "JUST", "JUST HOLD！ 調律がきれいに入りました。大きく削ります。");
    } else if (duration >= 360 && duration <= 1500) {
      damageShield(16, "GOOD", "HOLD成功。ノイズを受け止めました。");
    } else {
      damageShield(4, "MISS", "HOLD失敗。押す長さが合いませんでした。");
    }
  }

  function finishBattle(win, message) {
    if (!state || state.phase === "result") return;
    stopLoop();
    state.phase = "result";
    state.selectedFutureFill = pickFutureFillPattern();
    state.inputText = message;
    state.bossHp = win ? 0 : Math.max(35, state.bossHp);
    if (win) state.score += 1000;
    saveResult(win);
    render();
  }

  function saveResult(win) {
    if (!state || state.resultSaved) return;
    state.resultSaved = true;
    const reward = {
      clear: !!win,
      medal: win ? 3 + Math.floor(state.just / 2) : 1,
      tuningMaterial: win ? 2 + Math.floor(state.maxCombo / 5) : 0,
      score: state.score,
      updatedAt: Date.now()
    };
    try {
      const old = JSON.parse(localStorage.getItem(RESULT_STORAGE_KEY) || "{}");
      const next = {
        medal: (old.medal || 0) + reward.medal,
        tuningMaterial: (old.tuningMaterial || 0) + reward.tuningMaterial,
        highScore: Math.max(old.highScore || 0, reward.score || 0),
        last: reward
      };
      localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(next));
    } catch (_) {}
  }

  function pointerDirection(dx, dy) {
    if (Math.abs(dx) > Math.abs(dy)) return dx < 0 ? "left" : "right";
    return dy < 0 ? "up" : "down";
  }

  function onPointerDown(event) {
    if (!state || state.phase !== "normal") return;
    const target = event.target && event.target.closest ? event.target.closest("[data-event-input]") : null;
    if (!target) return;
    event.preventDefault();
    pointer = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      target: target.dataset.eventInput,
      startedAt: nowMs()
    };
    if (target.dataset.eventInput === "hold") {
      state.notice = "HOLD中……光るタイミングで離してください。";
      render();
    }
  }

  function onPointerUp(event) {
    if (!state || state.phase !== "normal" || !pointer) return;
    event.preventDefault();
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const duration = nowMs() - pointer.startedAt;
    const input = pointer.target;
    pointer = null;
    if (input === "hold") return handleHold(duration);
    if (dist >= 36) return handleFlick(pointerDirection(dx, dy));
    return handleTap();
  }

  function pct(value, max) {
    if (!max) return 0;
    return Math.max(0, Math.min(100, Math.round(value / max * 100)));
  }

  function render() {
    if (!root || !state) return;
    root.innerHTML = `
      <section class="event-battle-stage event-phase-${escapeHtml(state.phase)}">
        <header class="event-battle-hud">
          <div class="event-battle-title">イベントバトル：ブラック家電星人</div>
          <div class="event-battle-stats">
            <span>TIME <b>${state.left || BATTLE_SECONDS}</b></span>
            <span>SCORE <b>${state.score}</b></span>
            <span>COMBO <b>${state.combo}</b></span>
            <span>JUST <b>${state.just}</b></span>
          </div>
        </header>
        <div class="event-battle-boss-area">
          <div class="event-battle-boss-card">
            <div class="event-battle-boss-orb">黒</div>
            <div class="event-battle-boss-info">
              <div class="event-battle-boss-name">ブラック家電星人</div>
              <div class="event-battle-boss-desc">家電星人に意地悪する黒いノイズの集合体。まずはシールドを削ります。</div>
            </div>
          </div>
          <div class="event-battle-gauges">
            <div class="event-gauge"><span>HP</span><i><b style="width:${pct(state.bossHp, BOSS_HP_MAX)}%"></b></i><em>${state.bossHp}/${BOSS_HP_MAX}</em></div>
            <div class="event-gauge shield"><span>SHIELD</span><i><b style="width:${pct(state.shield, state.shieldMax)}%"></b></i><em>${state.shield}/${state.shieldMax}</em></div>
            <div class="event-gauge charge"><span>NOISE</span><i><b style="width:${pct(state.bossCharge, BOSS_CHARGE_MAX)}%"></b></i><em>${Math.round(state.bossCharge)}%</em></div>
          </div>
          <div class="event-battle-message">${escapeHtml(state.inputText)}</div>
          <div class="event-battle-notice">${escapeHtml(state.notice)}</div>
        </div>
        ${state.phase === "ready" ? renderReady() : state.phase === "result" ? renderResult() : renderNormalControls()}
      </section>
    `;
    bindButtons();
  }

  function renderReady() {
    return `
      <div class="event-battle-ready">
        <div class="event-ready-card">
          <b>通常モード</b>
          <p>タップ・フリック・ホールドでノイズシールドを削ります。シールド0でラッシュモード予定へ進みます。</p>
          <button type="button" data-event-action="start">イベントバトル開始</button>
          <button type="button" data-event-action="close">戻る</button>
        </div>
      </div>
    `;
  }

  function renderNormalControls() {
    return `
      <div class="event-normal-panel">
        <div class="event-normal-guide">
          <span>タップ：基本削り</span>
          <span>フリック：${dirLabel(state.flickDir)}へ流す</span>
          <span>ホールド：長押し調律</span>
        </div>
        <div class="event-normal-inputs">
          <button type="button" data-event-input="tap"><b>TAP</b><small>基本同期</small></button>
          <button type="button" data-event-input="flick"><b>FLICK</b><small>${dirLabel(state.flickDir)}へ流す</small></button>
          <button type="button" data-event-input="hold"><b>HOLD</b><small>調律</small></button>
        </div>
        <div class="event-future-note">フィルインノーツ：将来的に複数パターンを増やし、その中からランダム選択します。</div>
      </div>
    `;
  }

  function renderResult() {
    const fill = state.selectedFutureFill || pickFutureFillPattern();
    const clear = state.shield <= 0;
    return `
      <div class="event-result-panel">
        <div class="event-result-card">
          <div class="event-result-title">${clear ? "シールド破壊成功！" : "イベント調律失敗"}</div>
          <div class="event-result-grid">
            <div><span>SCORE</span><b>${state.score}</b></div>
            <div><span>最大COMBO</span><b>${state.maxCombo}</b></div>
            <div><span>JUST</span><b>${state.just}</b></div>
            <div><span>GOOD</span><b>${state.good}</b></div>
          </div>
          <div class="event-result-fill">
            <small>ラッシュモード予定フィル</small>
            <b>${escapeHtml(fill.label)}</b>
            <p>将来的には登録パターンを増やし、この候補からランダムにノーツ列を選びます。</p>
          </div>
          <div class="event-result-actions">
            <button type="button" data-event-action="restart">もう一度</button>
            <button type="button" data-event-action="close">店舗営業へ戻る</button>
          </div>
        </div>
      </div>
    `;
  }

  function bindButtons() {
    root.querySelectorAll("[data-event-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.eventAction;
        if (action === "start") startBattle();
        else if (action === "restart") openEventBattle({ mode: state && state.mode ? state.mode : {}, battleType: "eventBoss" });
        else if (action === "close") closeEventBattle();
      });
    });
    root.querySelectorAll("[data-event-input]").forEach((btn) => {
      btn.addEventListener("pointerdown", onPointerDown, { passive: false });
      btn.addEventListener("pointerup", onPointerUp, { passive: false });
      btn.addEventListener("pointercancel", () => { pointer = null; });
    });
  }

  function installPatch() {
    if (!window.BattleProto || window.BattleProto.__eventBattlePatchedV81) return false;
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
    window.BattleProto.__eventBattlePatchedV81 = true;
    window.TenotsuEventBattle = api;
    return true;
  }

  const api = {
    VERSION,
    open: openEventBattle,
    close: closeEventBattle,
    start: startBattle,
    getState: () => state,
    futureFillPatterns: FUTURE_FILL_PATTERNS.slice()
  };

  window.TenotsuEventBattle = api;
  if (!installPatch()) {
    const id = window.setInterval(() => {
      if (installPatch()) window.clearInterval(id);
    }, 120);
    window.setTimeout(() => window.clearInterval(id), 5000);
  }
})();
