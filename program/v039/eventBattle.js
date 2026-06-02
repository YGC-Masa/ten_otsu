/* v039_85 eventBattle.js
 * イベントバトル：ブラック家電星人通常モード + ラッシュフィルイン。
 * v039_85では通常モードとラッシュの表示領域を画面全域ベースへ広げ、画面端SAFEZONEを追加する。
 */
(function () {
  "use strict";

  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};
  const VERSION = "v039_85_event_battle_fullscreen_safezone";
  const ROOT_ID = "event-battle-root";
  const BATTLE_SECONDS = 45;
  const SHIELD_MAX = 120;
  const BOSS_HP_MAX = 100;
  const BOSS_CHARGE_MAX = 100;
  const RESULT_STORAGE_KEY = "tenotsu_event_battle_rewards_v1";

  const RUSH_BPM = 92;
  const RUSH_BEAT_MS = Math.round(60000 / RUSH_BPM);
  const RUSH_LEAD_MS = 1700;
  const RUSH_FALL_MS = 2600;
  const RUSH_END_MARGIN_MS = 1250;
  const RUSH_COUNTDOWN_MS = 3200;
  const TAP_TARGET_MIN = 2;
  const TAP_TARGET_MAX = 3;
  const TAP_TARGET_LIFETIME_MS = 2350;
  const TAP_TARGET_HIT_DELAY_MIN_MS = 860;
  const TAP_TARGET_HIT_DELAY_MAX_MS = 1260;
  const TAP_JUST_MS = 130;
  const TAP_GOOD_MS = 310;
  const FLICK_LIFETIME_MS = 2600;
  const HOLD_READY_MS = 780;
  const HOLD_MAX_MS = 2200;
  const RUSH_JUST_MS = 105;
  const RUSH_GOOD_MS = 230;
  const RUSH_LANE_ORDER = ["KICK", "SNARE", "HIGH_TOM", "LOW_TOM", "CRASH"];

  const RUSH_LANES = {
    KICK: { label: "ドン", role: "KICK" },
    SNARE: { label: "タン", role: "SNARE" },
    HIGH_TOM: { label: "タ", role: "HIGH TOM" },
    LOW_TOM: { label: "トン", role: "LOW TOM" },
    CRASH: { label: "ジャーン", role: "CRASH" },
    HAT_GHOST: { label: "ツ", role: "HI-HAT/GHOST", ghost: true }
  };

  const RUSH_INTRO_PATTERNS = [
    {
      id: "intro_01_don_tan_don_tan",
      no: 1,
      label: "①ドンタンドンタン",
      text: "ドン、タン、ドン、タン",
      difficulty: 1.0,
      notes: [
        { lane: "KICK", label: "ドン", beat: 0.0 },
        { lane: "SNARE", label: "タン", beat: 1.0 },
        { lane: "KICK", label: "ドン", beat: 2.0 },
        { lane: "SNARE", label: "タン", beat: 3.0 }
      ]
    },
    {
      id: "intro_02_don_tan_dodo_tan",
      no: 2,
      label: "②ドンタンドドタン",
      text: "ドン、タン、ド、ド、タン",
      difficulty: 1.1,
      notes: [
        { lane: "KICK", label: "ドン", beat: 0.0 },
        { lane: "SNARE", label: "タン", beat: 1.0 },
        { lane: "LOW_TOM", label: "ド", beat: 2.0 },
        { lane: "KICK", label: "ド", beat: 2.5 },
        { lane: "SNARE", label: "タン", beat: 3.0 }
      ]
    },
    {
      id: "intro_03_don_ta_dodon_tan",
      no: 3,
      label: "③ドンタドドンタン",
      text: "ドン、タ、ドドン、タン",
      difficulty: 1.15,
      notes: [
        { lane: "KICK", label: "ドン", beat: 0.0 },
        { lane: "HIGH_TOM", label: "タ", beat: 1.0 },
        { lane: "LOW_TOM", label: "ド", beat: 2.0 },
        { lane: "KICK", label: "ドン", beat: 2.5 },
        { lane: "SNARE", label: "タン", beat: 3.0 }
      ]
    },
    {
      id: "intro_04_don_ta_dodon_tado",
      no: 4,
      label: "④ドンタドドンタド",
      text: "ドン、タ、ドドン、タド",
      difficulty: 1.2,
      notes: [
        { lane: "KICK", label: "ドン", beat: 0.0 },
        { lane: "HIGH_TOM", label: "タ", beat: 1.0 },
        { lane: "LOW_TOM", label: "ド", beat: 2.0 },
        { lane: "KICK", label: "ドン", beat: 2.5 },
        { lane: "HIGH_TOM", label: "タ", beat: 3.0 },
        { lane: "LOW_TOM", label: "ド", beat: 3.5 }
      ]
    },
    {
      id: "intro_05_don_ta_do_tsutsu_tatsu",
      no: 5,
      label: "⑤ドンタドツツタツ",
      text: "ドン、タ、ド、ツツ、タツ",
      difficulty: 1.25,
      notes: [
        { lane: "KICK", label: "ドン", beat: 0.0 },
        { lane: "HIGH_TOM", label: "タ", beat: 1.0 },
        { lane: "LOW_TOM", label: "ド", beat: 2.0 },
        { lane: "HAT_GHOST", label: "ツ", beat: 2.5, ghost: true },
        { lane: "HAT_GHOST", label: "ツ", beat: 2.75, ghost: true },
        { lane: "HIGH_TOM", label: "タ", beat: 3.0 },
        { lane: "HAT_GHOST", label: "ツ", beat: 3.5, ghost: true }
      ]
    },
    {
      id: "intro_06_don_tan_tsu_do_tan",
      no: 6,
      label: "⑥ドンタンツドタン",
      text: "ドン、タン、ツ、ド、タン",
      difficulty: 1.15,
      notes: [
        { lane: "KICK", label: "ドン", beat: 0.0 },
        { lane: "SNARE", label: "タン", beat: 1.0 },
        { lane: "HAT_GHOST", label: "ツ", beat: 1.5, ghost: true },
        { lane: "LOW_TOM", label: "ド", beat: 2.0 },
        { lane: "SNARE", label: "タン", beat: 3.0 }
      ]
    },
    {
      id: "intro_07_don_ta_don_do_tan",
      no: 7,
      label: "⑦ドンタドンドタン",
      text: "ドン、タ、ドン、ド、タン",
      difficulty: 1.2,
      notes: [
        { lane: "KICK", label: "ドン", beat: 0.0 },
        { lane: "HIGH_TOM", label: "タ", beat: 1.0 },
        { lane: "KICK", label: "ドン", beat: 2.0 },
        { lane: "LOW_TOM", label: "ド", beat: 2.5 },
        { lane: "SNARE", label: "タン", beat: 3.0 }
      ]
    }
  ];

  const RUSH_FILL_PATTERNS = [
    {
      id: "fill_01_don_tan_don_tan_taka_ton_crash",
      no: 1,
      label: "①ドン、タン、ドン、タン、タカ、トン、ジャーン",
      text: "ドン、タン、ドン、タン、タカ、トン、ジャーン",
      difficulty: 1.0,
      notes: [
        { lane: "KICK", label: "ドン", beat: 0.0 },
        { lane: "SNARE", label: "タン", beat: 1.0 },
        { lane: "KICK", label: "ドン", beat: 2.0 },
        { lane: "SNARE", label: "タン", beat: 3.0 },
        { lane: "HIGH_TOM", label: "タ", beat: 4.0 },
        { lane: "LOW_TOM", label: "カ", beat: 4.5 },
        { lane: "LOW_TOM", label: "トン", beat: 5.5 },
        { lane: "CRASH", label: "ジャーン", beat: 7.0 }
      ]
    },
    {
      id: "fill_02_don_don_tan_taka_ton_crash",
      no: 2,
      label: "②ドン、ドン、タン、タカ、トン、ジャーン",
      text: "ドン、ドン、タン、タカ、トン、ジャーン",
      difficulty: 1.1,
      notes: [
        { lane: "KICK", label: "ドン", beat: 0.0 },
        { lane: "KICK", label: "ドン", beat: 1.0 },
        { lane: "SNARE", label: "タン", beat: 2.0 },
        { lane: "HIGH_TOM", label: "タ", beat: 3.0 },
        { lane: "LOW_TOM", label: "カ", beat: 3.5 },
        { lane: "LOW_TOM", label: "トン", beat: 4.5 },
        { lane: "CRASH", label: "ジャーン", beat: 6.0 }
      ]
    },
    {
      id: "fill_03_don_tan_taka_don_tan_ton_crash",
      no: 3,
      label: "③ドン、タン、タカ、ドン、タン、トン、ジャーン",
      text: "ドン、タン、タカ、ドン、タン、トン、ジャーン",
      difficulty: 1.2,
      notes: [
        { lane: "KICK", label: "ドン", beat: 0.0 },
        { lane: "SNARE", label: "タン", beat: 1.0 },
        { lane: "HIGH_TOM", label: "タ", beat: 2.0 },
        { lane: "LOW_TOM", label: "カ", beat: 2.5 },
        { lane: "KICK", label: "ドン", beat: 3.5 },
        { lane: "SNARE", label: "タン", beat: 4.5 },
        { lane: "LOW_TOM", label: "トン", beat: 5.5 },
        { lane: "CRASH", label: "ジャーン", beat: 7.0 }
      ]
    },
    {
      id: "fill_04_tan_don_taka_ton_don_crash",
      no: 4,
      label: "④タン、ドン、タカ、トン、ドン、ジャーン",
      text: "タン、ドン、タカ、トン、ドン、ジャーン",
      difficulty: 1.15,
      notes: [
        { lane: "SNARE", label: "タン", beat: 0.0 },
        { lane: "KICK", label: "ドン", beat: 1.0 },
        { lane: "HIGH_TOM", label: "タ", beat: 2.0 },
        { lane: "LOW_TOM", label: "カ", beat: 2.5 },
        { lane: "LOW_TOM", label: "トン", beat: 3.5 },
        { lane: "KICK", label: "ドン", beat: 4.5 },
        { lane: "CRASH", label: "ジャーン", beat: 6.0 }
      ]
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
    return String(value == null ? "" : value).replace(/[&<>"]/g, function (ch) {
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

  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function cloneNoteWithOffset(note, offset) {
    return {
      lane: note.lane,
      label: note.label,
      beat: Math.round((note.beat + offset) * 100) / 100,
      ghost: !!(note.ghost || note.lane === "HAT_GHOST")
    };
  }

  function patternEndBeat(pattern) {
    const notes = pattern && pattern.notes ? pattern.notes : [];
    if (!notes.length) return 0;
    return Math.max.apply(null, notes.map((note) => Number(note.beat) || 0));
  }

  function composeRushPattern(intro, fill) {
    intro = intro || pickRandom(RUSH_INTRO_PATTERNS);
    fill = fill || pickRandom(RUSH_FILL_PATTERNS);
    const gap = 1.0;
    const fillOffset = patternEndBeat(intro) + gap;
    const notes = intro.notes.map((note) => cloneNoteWithOffset(note, 0)).concat(fill.notes.map((note) => cloneNoteWithOffset(note, fillOffset)));
    const playableNotes = notes.filter((note) => !note.ghost);
    const ghostNotes = notes.filter((note) => note.ghost);
    return {
      id: `${intro.id}__${fill.id}`,
      introId: intro.id,
      fillId: fill.id,
      introLabel: intro.label,
      fillLabel: fill.label,
      introText: intro.text,
      fillText: fill.text,
      label: `${intro.label} → ${fill.label}`,
      text: `${intro.text} / ${fill.text}`,
      notes,
      playableCount: playableNotes.length,
      ghostCount: ghostNotes.length,
      scoreMultiplier: Math.round(((intro.difficulty || 1) * (fill.difficulty || 1)) * 100) / 100
    };
  }

  function pickRushPattern() {
    return composeRushPattern();
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
      rushJust: 0,
      rushGood: 0,
      rushMiss: 0,
      rushCombo: 0,
      rushMaxCombo: 0,
      score: 0,
      inputText: "開始すると、サークルTAP・矢印FLICK・両手HOLDでノイズシールドを削ります。",
      notice: "シールド0でラッシュ演出後、5レーンのフィルインに入ります。",
      judgeText: "",
      flickDir: randomDir(),
      holdStartedAt: 0,
      normalSeq: 0,
      tapTargets: [],
      flickChallenge: null,
      holdChallenge: null,
      holdPointers: {},
      holdRelease: {},
      selectedRushPattern: null,
      rushIntro: null,
      rush: null,
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

  function dirSymbol(dir) {
    return ({ left: "←", right: "→", up: "↑", down: "↓" })[dir] || "↔";
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function nextNormalId(prefix) {
    state.normalSeq = (state.normalSeq || 0) + 1;
    return `${prefix}_${state.normalSeq}`;
  }

  function makeTapTarget() {
    const bornAt = nowMs();
    const hitDelay = Math.round(rand(TAP_TARGET_HIT_DELAY_MIN_MS, TAP_TARGET_HIT_DELAY_MAX_MS));
    return {
      id: nextNormalId("tap"),
      x: Math.round(rand(9, 91)),
      y: Math.round(rand(12, 84)),
      bornAt,
      hitAt: bornAt + hitDelay,
      expiresAt: bornAt + TAP_TARGET_LIFETIME_MS,
      hit: false
    };
  }

  function ensureTapTargets() {
    if (!state || state.phase !== "normal") return;
    const live = state.tapTargets.filter((target) => !target.hit && nowMs() < target.expiresAt);
    const want = TAP_TARGET_MIN + (Math.random() < 0.36 ? 1 : 0);
    while (live.length < Math.min(TAP_TARGET_MAX, want)) live.push(makeTapTarget());
    state.tapTargets = live;
  }

  function ensureFlickChallenge(force) {
    if (!state || state.phase !== "normal") return;
    const t = nowMs();
    if (state.flickChallenge && !state.flickChallenge.done && t < state.flickChallenge.expiresAt) return;
    if (!force && Math.random() > 0.28) return;
    const dir = randomDir();
    state.flickDir = dir;
    state.flickChallenge = {
      id: nextNormalId("flick"),
      dir,
      x: Math.round(rand(12, 88)),
      y: Math.round(rand(16, 80)),
      bornAt: t,
      expiresAt: t + FLICK_LIFETIME_MS,
      done: false
    };
  }

  function ensureHoldChallenge(force) {
    if (!state || state.phase !== "normal") return;
    const t = nowMs();
    if (state.holdChallenge && !state.holdChallenge.done && t < state.holdChallenge.expiresAt) return;
    if (!force && Math.random() > 0.18) return;
    state.holdChallenge = {
      id: nextNormalId("hold"),
      bornAt: t,
      expiresAt: t + HOLD_MAX_MS + 1200,
      readyAt: 0,
      charged: false,
      done: false,
      resultAt: 0
    };
    state.holdPointers = {};
    state.holdRelease = {};
  }

  function ensureNormalChallenges() {
    ensureTapTargets();
    ensureFlickChallenge(false);
    ensureHoldChallenge(false);
  }

  function expireNormalChallenges() {
    if (!state || state.phase !== "normal") return;
    const t = nowMs();
    const before = state.tapTargets.length;
    state.tapTargets = state.tapTargets.filter((target) => {
      if (target.hit) return false;
      if (t > target.expiresAt) {
        state.combo = 0;
        state.miss += 1;
        state.judgeText = "MISS";
        state.notice = "TAPサークルを逃しました。";
        addScore(8, "MISS");
        return false;
      }
      return true;
    });
    if (state.flickChallenge && !state.flickChallenge.done && t > state.flickChallenge.expiresAt) {
      state.flickChallenge.done = true;
      state.combo = 0;
      state.miss += 1;
      state.judgeText = "MISS";
      state.notice = `FLICK矢印を逃しました。次は${dirLabel(randomDir())}へ。`;
      addScore(8, "MISS");
      state.flickChallenge = null;
    }
    if (state.holdChallenge && !state.holdChallenge.done && t > state.holdChallenge.expiresAt) {
      state.holdChallenge.done = true;
      state.holdPointers = {};
      state.holdRelease = {};
      damageShield(4, "MISS", "HOLD失敗。左右ホールドから外側フリックへつなげてください。", { noRender: true });
      state.holdChallenge = null;
    }
    if (before !== state.tapTargets.length) ensureTapTargets();
  }

  function tapTargetRingScale(target) {
    const t = nowMs();
    const span = Math.max(1, target.hitAt - target.bornAt);
    const p = Math.max(0, Math.min(1, (t - target.bornAt) / span));
    return Math.round((2.75 - p * 1.75) * 1000) / 1000;
  }

  function tapTargetTiming(target) {
    const delta = Math.abs(nowMs() - target.hitAt);
    if (delta <= TAP_JUST_MS) return "JUST";
    if (delta <= TAP_GOOD_MS) return "GOOD";
    return "MISS";
  }

  function holdIsCharged() {
    if (!state || !state.holdChallenge) return false;
    return !!state.holdChallenge.charged;
  }

  function laneInfo(lane) {
    return RUSH_LANES[lane] || { label: lane, role: lane };
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
    state.inputText = "通常モード開始。青サークルTAP、緑矢印FLICK、ピンク両手HOLDでシールドを削ります。";
    state.notice = "青サークルは大きな水色リングが重なった瞬間に押すとJUST。";
    state.tapTargets = [];
    state.flickChallenge = null;
    state.holdChallenge = null;
    ensureTapTargets();
    ensureFlickChallenge(true);
    ensureHoldChallenge(false);
    stopLoop();
    timerId = window.setInterval(tick, 60);
    render();
  }

  function stopLoop() {
    if (timerId) window.clearInterval(timerId);
    timerId = null;
  }

  function tick() {
    if (!state) return;
    if (state.phase === "normal") return tickNormal();
    if (state.phase === "rushIntro") return tickRushIntro();
    if (state.phase === "rush") return tickRush();
  }

  function tickNormal() {
    const left = Math.max(0, Math.ceil((state.endsAt - nowMs()) / 1000));
    state.left = left;
    expireNormalChallenges();
    ensureNormalChallenges();
    updateHoldCharge();
    state.bossCharge = Math.min(BOSS_CHARGE_MAX, state.bossCharge + 0.9);
    if (state.bossCharge >= BOSS_CHARGE_MAX) {
      state.bossCharge = 0;
      state.shield = Math.min(state.shieldMax, state.shield + 5);
      state.combo = 0;
      state.notice = "ブラック家電星人がノイズを再充填しました。シールドが少し戻ります。";
    }
    if (left <= 0) finishBattle(false, "時間切れ。今回はノイズシールドを崩しきれませんでした。");
    else render();
  }

  function tickRushIntro() {
    if (!state || !state.rushIntro) return;
    const t = nowMs();
    const leftMs = Math.max(0, state.rushIntro.endsAt - t);
    const count = Math.ceil(leftMs / 1000);
    state.judgeText = count > 0 ? String(count) : "GO";
    state.notice = "これよりラッシュモード。ハイハットの裏リズムに乗って、5レーンのフィルインを叩きます。";
    if (t >= state.rushIntro.endsAt) return beginRushMode();
    render();
  }

  function tickRush() {
    if (!state.rush) return;
    const t = nowMs();
    let changed = false;
    state.rush.notes.forEach((note) => {
      if (note.ghost || note.hit || note.missed) return;
      if (t > note.targetAt + RUSH_GOOD_MS) {
        note.missed = true;
        state.rushMiss += 1;
        state.rushCombo = 0;
        state.miss += 1;
        state.judgeText = "MISS";
        changed = true;
      }
    });
    const playable = state.rush.notes.filter((note) => !note.ghost);
    const resolved = playable.every((note) => note.hit || note.missed);
    const allNotesClearedScreen = state.rush.notes.every((note) => note.hit || note.missed || t > note.targetAt + RUSH_END_MARGIN_MS);
    if (resolved && allNotesClearedScreen && t >= state.rush.endsAt) return finishRush();
    if (t >= state.rush.forceEndsAt) return finishRush();
    render();
  }

  function addScore(base, rating) {
    const comboBonus = Math.min(1.6, 1 + state.combo * 0.03);
    const ratingBonus = rating === "JUST" ? 1.35 : rating === "GOOD" ? 1.0 : 0.25;
    state.score += Math.round(base * comboBonus * ratingBonus);
  }

  function addRushScore(base, rating) {
    const comboBonus = Math.min(1.9, 1 + state.rushCombo * 0.045);
    const ratingBonus = rating === "JUST" ? 1.5 : rating === "GOOD" ? 1.0 : 0;
    const patternBonus = state.selectedRushPattern ? state.selectedRushPattern.scoreMultiplier || 1 : 1;
    state.score += Math.round(base * comboBonus * ratingBonus * patternBonus);
  }

  function damageShield(amount, rating, text, options) {
    if (!state || state.phase !== "normal") return;
    options = options || {};
    if (rating === "MISS") {
      state.combo = 0;
      state.miss += 1;
      state.notice = text || "MISS。ノイズが乱れました。";
      state.judgeText = "MISS";
      addScore(10, rating);
      if (!options.noRender) render();
      return;
    }
    state.shield = Math.max(0, state.shield - amount);
    state.combo += 1;
    state.maxCombo = Math.max(state.maxCombo, state.combo);
    if (rating === "JUST") state.just += 1;
    else state.good += 1;
    state.judgeText = rating;
    state.notice = text || `${rating}！ シールド -${amount}`;
    addScore(amount * 12, rating);
    state.bossCharge = Math.max(0, state.bossCharge - (rating === "JUST" ? 12 : 7));
    if (state.shield <= 0) startRushMode();
    else if (!options.noRender) render();
  }

  function handleTap(targetId) {
    if (!state || state.phase !== "normal") return;
    const target = state.tapTargets.find((item) => item.id === targetId && !item.hit);
    if (!target) {
      damageShield(3, "MISS", "TAP空振り。青い小サークルを狙ってください。");
      return;
    }
    target.hit = true;
    const rating = tapTargetTiming(target);
    if (rating === "JUST") damageShield(15, "JUST", "JUST TAP！ 水色リングと青サークルが重なりました。", { noRender: true });
    else if (rating === "GOOD") damageShield(9, "GOOD", "GOOD TAP。少しズレましたが同期できました。", { noRender: true });
    else damageShield(3, "MISS", "TAPタイミング外。リングが重なる瞬間を狙ってください。", { noRender: true });
    state.tapTargets = state.tapTargets.filter((item) => item.id !== targetId);
    ensureTapTargets();
    render();
  }

  function handleFlick(actualDir) {
    if (!state || state.phase !== "normal") return;
    const challenge = state.flickChallenge;
    if (!challenge || challenge.done) {
      damageShield(4, "MISS", "FLICK対象がありません。緑の矢印が出たら方向へ流してください。", { noRender: true });
      render();
      return;
    }
    challenge.done = true;
    const expected = challenge.dir;
    state.flickChallenge = null;
    if (actualDir === expected) {
      damageShield(23, "JUST", `JUST FLICK！ ${dirLabel(actualDir)}へノイズを流しました。`, { noRender: true });
      ensureFlickChallenge(true);
    } else {
      damageShield(5, "MISS", `方向違い。${dirLabel(expected)}へ流す矢印でした。`, { noRender: true });
      ensureFlickChallenge(true);
    }
    render();
  }

  function handleHoldResult(rating, message) {
    if (!state || state.phase !== "normal") return;
    if (state.holdChallenge) state.holdChallenge.done = true;
    state.holdPointers = {};
    state.holdRelease = {};
    state.holdChallenge = null;
    if (rating === "JUST") damageShield(34, "JUST", message || "JUST HOLD！ 左右同時放電が成功しました。", { noRender: true });
    else if (rating === "GOOD") damageShield(20, "GOOD", message || "HOLD成功。ビリビリ放電でシールドを削りました。", { noRender: true });
    else damageShield(5, "MISS", message || "HOLD失敗。左右を押してから外側へフリックしてください。", { noRender: true });
    ensureHoldChallenge(false);
    render();
  }

  function updateHoldCharge() {
    const hc = state && state.holdChallenge;
    if (!hc || hc.done) return;
    const left = state.holdPointers.left;
    const right = state.holdPointers.right;
    if (left && right) {
      if (!hc.readyAt) hc.readyAt = nowMs() + HOLD_READY_MS;
      if (!hc.charged && nowMs() >= hc.readyAt) {
        hc.charged = true;
        state.notice = "HOLD充電完了！ 左右を同時に外側へフリック。";
        state.judgeText = "READY";
      }
    } else {
      hc.readyAt = 0;
      hc.charged = false;
    }
  }

  function registerHoldPointer(side, event) {
    if (!state || state.phase !== "normal") return;
    ensureHoldChallenge(true);
    if (!state.holdChallenge || state.holdChallenge.done) return;
    state.holdPointers[side] = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startedAt: nowMs()
    };
    state.notice = "左右HOLD中……両方押すとビリビリエフェクトがつながります。";
    render();
  }

  function releaseHoldPointer(event) {
    if (!state || state.phase !== "normal" || !state.holdChallenge) return;
    const side = Object.keys(state.holdPointers).find((key) => state.holdPointers[key].pointerId === event.pointerId);
    if (!side) return;
    const info = state.holdPointers[side];
    const dx = event.clientX - info.x;
    const duration = nowMs() - info.startedAt;
    delete state.holdPointers[side];
    const outward = side === "left" ? dx < -28 : dx > 28;
    state.holdRelease[side] = { outward, duration, at: nowMs() };
    const l = state.holdRelease.left;
    const r = state.holdRelease.right;
    if (l && r && Math.abs(l.at - r.at) <= 620) {
      if (state.holdChallenge.charged && l.outward && r.outward) return handleHoldResult("JUST", "JUST HOLD！ 左右同時外側フリックでノイズを放電しました。");
      if (l.outward || r.outward) return handleHoldResult("GOOD", "HOLD放電。片側が少し遅れましたが成功です。");
      return handleHoldResult("MISS", "HOLD失敗。完了後は左右外側へフリックしてください。");
    }
    if (duration < HOLD_READY_MS) handleHoldResult("MISS", "HOLDが短すぎました。左右を少し維持してください。");
  }

  function startRushMode() {
    if (!state || state.phase !== "normal") return;
    state.phase = "rushIntro";
    state.shield = 0;
    state.bossCharge = 0;
    state.combo = 0;
    state.rushCombo = 0;
    state.selectedRushPattern = pickRushPattern();
    const t = nowMs();
    state.rushIntro = {
      startedAt: t,
      endsAt: t + RUSH_COUNTDOWN_MS
    };
    state.inputText = "これよりラッシュモード！ 3カウント後、5レーンのドラムフィルインへ入ります。";
    state.notice = `予定：${state.selectedRushPattern.introLabel} → ${state.selectedRushPattern.fillLabel}`;
    state.judgeText = "3";
    stopLoop();
    timerId = window.setInterval(tick, 33);
    render();
  }

  function beginRushMode() {
    if (!state || state.phase !== "rushIntro") return;
    state.phase = "rush";
    const startAt = nowMs();
    const notes = state.selectedRushPattern.notes.map((note, index) => {
      const targetAt = startAt + RUSH_LEAD_MS + Math.round((note.beat || 0) * RUSH_BEAT_MS);
      return Object.assign({ index, targetAt, hit: false, missed: false, rating: "" }, note);
    });
    const lastTarget = notes.reduce((max, note) => Math.max(max, note.targetAt), startAt + RUSH_LEAD_MS);
    state.rush = {
      startAt,
      bpm: RUSH_BPM,
      beatMs: RUSH_BEAT_MS,
      notes,
      endsAt: lastTarget + RUSH_GOOD_MS + RUSH_END_MARGIN_MS,
      forceEndsAt: lastTarget + RUSH_FALL_MS + RUSH_END_MARGIN_MS + 1500
    };
    state.inputText = "RUSH MODE！ 5レーンのドラムフィルインで撃破スコアを伸ばしてください。";
    state.notice = `選択パターン：${state.selectedRushPattern.introLabel} → ${state.selectedRushPattern.fillLabel}`;
    state.judgeText = "GO";
    render();
  }

  function handleRushLane(lane) {
    if (!state || state.phase !== "rush" || !state.rush) return;
    const t = nowMs();
    const candidates = state.rush.notes
      .filter((note) => !note.ghost && !note.hit && !note.missed && note.lane === lane)
      .map((note) => Object.assign({ delta: Math.abs(t - note.targetAt) }, note))
      .sort((a, b) => a.delta - b.delta);
    const target = candidates[0];
    if (!target || target.delta > RUSH_GOOD_MS) {
      state.rushMiss += 1;
      state.miss += 1;
      state.rushCombo = 0;
      state.judgeText = "MISS";
      state.notice = `${laneInfo(lane).label} 空振り。判定ライン付近で叩いてください。`;
      render();
      return;
    }
    const original = state.rush.notes[target.index];
    const rating = target.delta <= RUSH_JUST_MS ? "JUST" : "GOOD";
    original.hit = true;
    original.rating = rating;
    state.judgeText = rating;
    if (rating === "JUST") {
      state.rushJust += 1;
      state.just += 1;
      state.rushCombo += 1;
      addRushScore(130, rating);
    } else {
      state.rushGood += 1;
      state.good += 1;
      state.rushCombo += 1;
      addRushScore(85, rating);
    }
    state.rushMaxCombo = Math.max(state.rushMaxCombo, state.rushCombo);
    state.maxCombo = Math.max(state.maxCombo, state.rushCombo);
    state.notice = `${rating}！ ${original.label} / ${laneInfo(lane).role}`;
    render();
  }

  function finishRush() {
    if (!state || state.phase !== "rush") return;
    const totalPlayable = state.rush ? state.rush.notes.filter((note) => !note.ghost).length : 0;
    const hitCount = state.rushJust + state.rushGood;
    const fullCombo = totalPlayable > 0 && hitCount === totalPlayable && state.rushMiss === 0;
    const allJust = totalPlayable > 0 && state.rushJust === totalPlayable;
    state.score += 1000;
    if (fullCombo) state.score += 650;
    if (allJust) state.score += 900;
    state.bossHp = 0;
    state.inputText = fullCombo ? "フルコンボ撃破！ ブラック家電星人のノイズをきれいに調律しました。" : "ラッシュ撃破！ ブラック家電星人を追い払いました。";
    state.notice = allJust ? "ALL JUST！ 限定素材の抽選が有利になります。" : fullCombo ? "FULL COMBO！ イベントメダルにボーナス。" : "撃破は成功。コンボとJUSTで報酬が伸びます。";
    finishBattle(true, state.inputText);
  }

  function finishBattle(win, message) {
    if (!state || state.phase === "result") return;
    stopLoop();
    if (!state.selectedRushPattern) state.selectedRushPattern = pickRushPattern();
    state.phase = "result";
    state.inputText = message;
    state.bossHp = win ? 0 : Math.max(35, state.bossHp);
    saveResult(win);
    render();
  }

  function saveResult(win) {
    if (!state || state.resultSaved) return;
    state.resultSaved = true;
    const rushTotal = state.rush ? state.rush.notes.filter((note) => !note.ghost).length : 0;
    const fullCombo = rushTotal > 0 && (state.rushJust + state.rushGood) === rushTotal && state.rushMiss === 0;
    const allJust = rushTotal > 0 && state.rushJust === rushTotal;
    const reward = {
      clear: !!win,
      medal: win ? 3 + Math.floor(state.just / 2) + (fullCombo ? 1 : 0) : 1,
      tuningMaterial: win ? 2 + Math.floor(state.maxCombo / 5) + (allJust ? 1 : 0) : 0,
      score: state.score,
      rush: { total: rushTotal, just: state.rushJust, good: state.rushGood, miss: state.rushMiss, fullCombo, allJust },
      rushPattern: state.selectedRushPattern ? {
        id: state.selectedRushPattern.id,
        intro: state.selectedRushPattern.introLabel,
        fill: state.selectedRushPattern.fillLabel,
        multiplier: state.selectedRushPattern.scoreMultiplier
      } : null,
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
    const tapTarget = event.target && event.target.closest ? event.target.closest("[data-tap-target]") : null;
    if (tapTarget) {
      event.preventDefault();
      return handleTap(tapTarget.dataset.tapTarget);
    }
    const holdSide = event.target && event.target.closest ? event.target.closest("[data-hold-side]") : null;
    if (holdSide) {
      event.preventDefault();
      return registerHoldPointer(holdSide.dataset.holdSide, event);
    }
    const field = event.target && event.target.closest ? event.target.closest(".event-normal-action-field") : null;
    if (!field) return;
    event.preventDefault();
    pointer = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      target: "flick",
      startedAt: nowMs()
    };
  }

  function onPointerUp(event) {
    if (!state || state.phase !== "normal") return;
    if (state.holdPointers && Object.keys(state.holdPointers).some((key) => state.holdPointers[key].pointerId === event.pointerId)) {
      event.preventDefault();
      return releaseHoldPointer(event);
    }
    if (!pointer || pointer.id !== event.pointerId) return;
    event.preventDefault();
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    pointer = null;
    if (dist >= 34) return handleFlick(pointerDirection(dx, dy));
  }

  function pct(value, max) {
    if (!max) return 0;
    return Math.max(0, Math.min(100, Math.round(value / max * 100)));
  }

  function render() {
    if (!root || !state) return;
    root.dataset.phase = state.phase;
    root.innerHTML = `
      <section class="event-battle-stage event-phase-${escapeHtml(state.phase)}">
        <header class="event-battle-hud">
          <div class="event-battle-title">イベントバトル：ブラック家電星人</div>
          <div class="event-battle-stats">
            <span>TIME <b>${state.left || BATTLE_SECONDS}</b></span>
            <span>SCORE <b>${state.score}</b></span>
            <span>COMBO <b>${state.phase === "rush" ? state.rushCombo : state.combo}</b></span>
            <span>JUST <b>${state.just}</b></span>
          </div>
        </header>
        <div class="event-battle-boss-area">
          <div class="event-battle-boss-card">
            <div class="event-battle-boss-orb">黒</div>
            <div class="event-battle-boss-info">
              <div class="event-battle-boss-name">ブラック家電星人</div>
              <div class="event-battle-boss-desc">家電星人に意地悪する黒いノイズの集合体。シールドを割るとラッシュで撃破します。</div>
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
        ${state.phase === "ready" ? renderReady() : state.phase === "result" ? renderResult() : state.phase === "rushIntro" ? renderRushIntro() : state.phase === "rush" ? renderRushControls() : renderNormalControls()}
      </section>
    `;
    bindButtons();
  }

  function renderReady() {
    return `
      <div class="event-battle-ready">
        <div class="event-ready-card">
          <b>通常モード</b>
          <p>タップ・フリック・ホールドでノイズシールドを削ります。シールド0で5レーンのラッシュモードへ進みます。</p>
          <button type="button" data-event-action="start">イベントバトル開始</button>
          <button type="button" data-event-action="close">戻る</button>
        </div>
      </div>
    `;
  }

  function renderNormalControls() {
    const flick = state.flickChallenge || { dir: state.flickDir, x: 50, y: 50 };
    const hold = state.holdChallenge;
    const holdCharged = holdIsCharged();
    const targetHtml = (state.tapTargets || []).map((target) => {
      const scale = tapTargetRingScale(target);
      const timing = tapTargetTiming(target).toLowerCase();
      return `
        <button type="button" class="event-tap-target timing-${escapeHtml(timing)}" data-tap-target="${escapeHtml(target.id)}" style="left:${target.x}%; top:${target.y}%; --ring-scale:${scale};">
          <i></i><b></b><span>TAP</span>
        </button>
      `;
    }).join("");
    const flickHtml = state.flickChallenge && !state.flickChallenge.done ? `
      <div class="event-flick-arrow event-flick-${escapeHtml(flick.dir)}" style="left:${flick.x}%; top:${flick.y}%;">
        <b>${escapeHtml(dirSymbol(flick.dir))}</b><span>${escapeHtml(dirLabel(flick.dir))}へフリック</span>
      </div>
    ` : "";
    const holdHtml = hold && !hold.done ? `
      <div class="event-hold-pair ${holdCharged ? "is-charged" : ""}">
        <button type="button" class="event-hold-zone event-hold-left" data-hold-side="left"><b>←</b><span>HOLD</span></button>
        <div class="event-hold-bolt"><i></i><span>${holdCharged ? "外側へフリック！" : "左右を同時HOLD"}</span></div>
        <button type="button" class="event-hold-zone event-hold-right" data-hold-side="right"><b>→</b><span>HOLD</span></button>
      </div>
    ` : "";
    return `
      <div class="event-normal-panel">
        <div class="event-normal-guide">
          <span>青：SAFEZONE内：リングが重なったらTAP</span>
          <span>緑：矢印方向へFLICK</span>
          <span>桃：左右HOLD後に外側FLICK</span>
        </div>
        <div class="event-normal-action-field">
          ${targetHtml}
          ${flickHtml}
          ${holdHtml}
          <div class="event-field-caption">SAFEZONE内の画面全域でTAP / FLICK / HOLD</div>
        </div>
        <div class="event-future-note">シールド0で「これよりラッシュモード」演出と3カウント後に5レーンへ移行します。</div>
      </div>
    `;
  }

  function renderRushIntro() {
    const rush = state.selectedRushPattern || pickRushPattern();
    const count = state.rushIntro ? Math.max(0, Math.ceil((state.rushIntro.endsAt - nowMs()) / 1000)) : 3;
    const label = count > 0 ? String(count) : "GO";
    return `
      <div class="event-rush-intro-panel">
        <div class="event-rush-intro-card">
          <b>これよりラッシュモード</b>
          <strong>${escapeHtml(label)}</strong>
          <span>${escapeHtml(rush.introLabel)} → ${escapeHtml(rush.fillLabel)}</span>
          <p>ハイハットの裏リズムに合わせて、KICK / SNARE / HIGH TOM / LOW TOM / CRASH を叩いてください。</p>
        </div>
      </div>
    `;
  }

  function noteTopPercent(note) {
    if (!state || !state.rush) return -12;
    const t = nowMs();
    const start = note.targetAt - RUSH_FALL_MS;
    const progress = (t - start) / RUSH_FALL_MS;
    return Math.round((-14 + progress * 92) * 10) / 10;
  }

  function renderRushLane(lane) {
    const info = laneInfo(lane);
    const notes = state.rush ? state.rush.notes.filter((note) => note.lane === lane || (lane === "HIGH_TOM" && note.lane === "HAT_GHOST")) : [];
    const noteHtml = notes.map((note) => {
      if (note.hit || note.missed) return "";
      const top = noteTopPercent(note);
      if (top < -24 || top > 106) return "";
      const cls = note.ghost ? "ghost" : "playable";
      return `<i class="event-note ${cls} event-note-${escapeHtml(note.lane.toLowerCase())}" style="top:${top}%">${escapeHtml(note.label)}</i>`;
    }).join("");
    return `
      <div class="event-rush-lane event-rush-lane-${escapeHtml(lane.toLowerCase())}">
        <div class="event-rush-lane-track">${noteHtml}<em></em></div>
        <button type="button" data-rush-lane="${escapeHtml(lane)}"><b>${escapeHtml(info.label)}</b><small>${escapeHtml(info.role)}</small></button>
      </div>
    `;
  }

  function renderRushControls() {
    const rush = state.selectedRushPattern || pickRushPattern();
    const total = state.rush ? state.rush.notes.filter((note) => !note.ghost).length : rush.playableCount;
    const done = state.rushJust + state.rushGood + state.rushMiss;
    return `
      <div class="event-rush-panel">
        <div class="event-rush-top">
          <div>
            <b>RUSH MODE</b>
            <span>${escapeHtml(rush.introLabel)} → ${escapeHtml(rush.fillLabel)}</span>
          </div>
          <div class="event-rush-judge event-judge-${escapeHtml(String(state.judgeText || '').toLowerCase())}">${escapeHtml(state.judgeText || "")}</div>
          <div class="event-rush-count">${done} / ${total}</div>
        </div>
        <div class="event-rush-lanes">
          ${RUSH_LANE_ORDER.map(renderRushLane).join("")}
        </div>
        <div class="event-rush-hihat">♪ チッ　チッ　チッ　チッ <span>ハイハットは裏リズム / ツはゴースト</span></div>
      </div>
    `;
  }

  function renderResult() {
    const rush = state.selectedRushPattern || pickRushPattern();
    const clear = state.bossHp <= 0 || state.shield <= 0;
    const rushTotal = state.rush ? state.rush.notes.filter((note) => !note.ghost).length : 0;
    const fullCombo = rushTotal > 0 && (state.rushJust + state.rushGood) === rushTotal && state.rushMiss === 0;
    const allJust = rushTotal > 0 && state.rushJust === rushTotal;
    return `
      <div class="event-result-panel">
        <div class="event-result-card">
          <div class="event-result-title">${clear ? "イベントバトル撃破成功！" : "イベント調律失敗"}</div>
          <div class="event-result-grid">
            <div><span>SCORE</span><b>${state.score}</b></div>
            <div><span>最大COMBO</span><b>${Math.max(state.maxCombo, state.rushMaxCombo)}</b></div>
            <div><span>JUST</span><b>${state.just}</b></div>
            <div><span>GOOD</span><b>${state.good}</b></div>
          </div>
          <div class="event-result-grid event-result-rush-grid">
            <div><span>RUSH JUST</span><b>${state.rushJust}</b></div>
            <div><span>RUSH GOOD</span><b>${state.rushGood}</b></div>
            <div><span>RUSH MISS</span><b>${state.rushMiss}</b></div>
            <div><span>BONUS</span><b>${allJust ? "ALL JUST" : fullCombo ? "FULL COMBO" : "CLEAR"}</b></div>
          </div>
          <div class="event-result-fill event-rush-pattern-card">
            <small>ラッシュパターン</small>
            <b>${escapeHtml(rush.text)}</b>
            <div class="event-rush-pattern-pair">
              <span>前半 ${escapeHtml(rush.introLabel)}</span>
              <span>後半 ${escapeHtml(rush.fillLabel)}</span>
            </div>
            <div class="event-rush-pattern-meta">
              <span>入力ノーツ ${rush.playableCount}</span>
              <span>ゴースト ${rush.ghostCount}</span>
              <span>倍率 x${rush.scoreMultiplier}</span>
            </div>
            <p>5レーン：KICK / SNARE / HIGH TOM / LOW TOM / CRASH。ツはハイハット/ゴーストとして裏リズムを示します。</p>
          </div>
          <div class="event-result-reward-note">
            <b>報酬メモ</b>
            <p>撃破はシールド破壊後のラッシュで確定。JUST・COMBO・FULL COMBOでイベントメダルとチューニング素材の補正が伸びます。</p>
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
    const field = root.querySelector(".event-normal-action-field");
    if (field) {
      field.addEventListener("pointerdown", onPointerDown, { passive: false });
      field.addEventListener("pointerup", onPointerUp, { passive: false });
      field.addEventListener("pointercancel", (event) => {
        if (state && state.holdPointers) {
          Object.keys(state.holdPointers).forEach((key) => {
            if (state.holdPointers[key].pointerId === event.pointerId) delete state.holdPointers[key];
          });
        }
        if (pointer && pointer.id === event.pointerId) pointer = null;
      });
    }
    root.querySelectorAll("[data-rush-lane]").forEach((btn) => {
      btn.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        handleRushLane(btn.dataset.rushLane);
      }, { passive: false });
    });
  }

  function installPatch() {
    if (!window.BattleProto || window.BattleProto.__eventBattlePatchedV85) return false;
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
    window.BattleProto.__eventBattlePatchedV85 = true;
    window.TenotsuEventBattle = api;
    return true;
  }

  const api = {
    VERSION,
    open: openEventBattle,
    close: closeEventBattle,
    start: startBattle,
    getState: () => state,
    rushLanes: Object.assign({}, RUSH_LANES),
    introPatterns: RUSH_INTRO_PATTERNS.slice(),
    fillPatterns: RUSH_FILL_PATTERNS.slice(),
    composeRushPattern,
    pickRushPattern,
    laneOrder: RUSH_LANE_ORDER.slice(),
    rushConfig: { bpm: RUSH_BPM, justMs: RUSH_JUST_MS, goodMs: RUSH_GOOD_MS }
  };

  window.TenotsuEventBattle = api;
  if (!installPatch()) {
    const id = window.setInterval(() => {
      if (installPatch()) window.clearInterval(id);
    }, 120);
    window.setTimeout(() => window.clearInterval(id), 5000);
  }
})();
