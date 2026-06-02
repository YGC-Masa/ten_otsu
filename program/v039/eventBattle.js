/* v039_88 eventBattle.js
 * イベントバトルを「汚れた家電星人の清掃バトル」へ再設計。
 * 家電星人はメンテナンス不足で悪の心が芽生える。ひだまりメンバーが清掃して正義の心を取り戻し、余剰ノイズはダークエレメントとして排出される。
 */
(function () {
  "use strict";

  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};
  const VERSION = "v039_88_event_cleaning_battle";
  const ROOT_ID = "event-battle-root";
  const STORAGE_KEY = "tenotsu_event_run_battle_v1";
  const ENCOUNTER_ST_COST = 20;
  const EVENT_BP_COST = 1;
  const MEMBER_RECAST_MS = 30 * 60 * 1000;
  const ENCOUNTER_ESCAPE_MS = 12 * 60 * 60 * 1000;
  const DECK_STORAGE_KEY = "tenotsu_battle_deck_v1";

  const DEFAULT_STAFF_IDS = ["aa", "ab", "ac", "ad", "ae"];
  const STAFF_BASE = [
    { id: "aa", name: "緋奈", attr: "映像", color: "#d3381c" },
    { id: "ab", name: "藍", attr: "ドライヤー", color: "#0067c0" },
    { id: "ac", name: "翠", attr: "PC", color: "#02b308" },
    { id: "ad", name: "こがね", attr: "スマホ", color: "#fff450" },
    { id: "ae", name: "琥珀", attr: "オーディオ", color: "#f68b1f" },
    { id: "af", name: "真花", attr: "美容", color: "#c0c0c0" },
    { id: "ag", name: "雪乃", attr: "オーブン", color: "#6495ed" },
    { id: "ah", name: "美空", attr: "除湿", color: "#fffef6" },
    { id: "ai", name: "夜空", attr: "加湿", color: "#214a9d" },
    { id: "aj", name: "桃", attr: "配信", color: "#f7adc3" },
    { id: "ak", name: "彩愛", attr: "生活", color: "#694d9f" },
    { id: "al", name: "里美", attr: "レジ", color: "#8d5025" },
    { id: "am", name: "萌", attr: "リラックス", color: "#33cc99" }
  ];

  const DIRTY_ALIEN_POOL = [
    { id: "tv_popcorn", name: "テレビポップコーン星人", shortName: "テレビポップコーン", attr: "映像", color: "#ff6a4a", baseHp: 70 },
    { id: "choco_dryer", name: "チョコドライヤ星人", shortName: "チョコドライヤ", attr: "ドライヤー", color: "#5cb8ff", baseHp: 64 },
    { id: "pc_pizza", name: "パソコンピザ星人", shortName: "パソコンピザ", attr: "PC", color: "#56e07f", baseHp: 82 },
    { id: "phone_candy", name: "スマホキャンディ星人", shortName: "スマホキャンディ", attr: "スマホ", color: "#ffe45a", baseHp: 58 },
    { id: "audio_gummy", name: "イヤホングミ星人", shortName: "イヤホングミ", attr: "オーディオ", color: "#ffb24a", baseHp: 70 },
    { id: "beauty_macaron", name: "ビューティマカロン星人", shortName: "ビューティマカロン", attr: "美容", color: "#ff9ed1", baseHp: 68 },
    { id: "pudding_oven", name: "プリンオーブン星人", shortName: "プリンオーブン", attr: "オーブン", color: "#ff9b55", baseHp: 84 },
    { id: "shavedice_aircon", name: "カキゴーリエアコン星人", shortName: "カキゴーリエアコン", attr: "除湿", color: "#8ad9ff", baseHp: 66 },
    { id: "jelly_humidifier", name: "ゼリーカシツ星人", shortName: "ゼリーカシツ", attr: "加湿", color: "#9bbcff", baseHp: 66 },
    { id: "game_potato", name: "ゲームポテト星人", shortName: "ゲームポテト", attr: "配信", color: "#ffb3d0", baseHp: 70 },
    { id: "donut_washer", name: "ドーナツセンタク星人", shortName: "ドーナツセンタク", attr: "生活", color: "#b49cff", baseHp: 78 },
    { id: "mochi_register", name: "モチモチレジスター星人", shortName: "モチモチレジスター", attr: "レジ", color: "#d9b38c", baseHp: 72 },
    { id: "marshmallow_massage", name: "マシュマロマッサージ星人", shortName: "マシュマロマッサージ", attr: "リラックス", color: "#9ef0d0", baseHp: 64 }
  ];

  const BUFF_ITEMS = [
    { id: "hikaru_cleanser", name: "ひかるの洗浄剤", cost: 500, desc: "次のイベント清掃中、メンバーの清掃ダメージ +18%。", effect: "damageRate", value: 0.18 },
    { id: "haris_cloth", name: "陽里のクリーナークロス", cost: 350, desc: "次のイベント清掃中、行動後リキャストを10分短縮。", effect: "recastCut", value: 10 * 60 * 1000 },
    { id: "genichiro_contact", name: "玄一郎の接点復活剤", cost: 800, desc: "次のイベント清掃中、属性一致時の特攻倍率 +25%。", effect: "matchBoost", value: 0.25 }
  ];

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
  let clockTimer = null;

  function nowMs() { return Date.now(); }
  function nowIso() { return new Date().toISOString(); }
  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>\"]/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch] || ch;
    });
  }
  function clamp(value, min, max) { return Math.max(min, Math.min(max, Number(value) || 0)); }
  function formatClock(ms) {
    const total = Math.max(0, Math.ceil((Number(ms) || 0) / 1000));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  function shortRemaining(until) {
    const left = (Number(until) || 0) - nowMs();
    if (left <= 0) return "READY";
    const min = Math.ceil(left / 60000);
    return `${min}分`;
  }
  function shuffle(source) {
    const arr = source.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
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

  function defaultProgress() {
    return {
      version: "v039_88",
      darkElements: 0,
      totalDarkElements: 0,
      totalEncounters: 0,
      totalCleaned: 0,
      totalEscaped: 0,
      totalBattles: 0,
      maxThreatLevel: 1,
      claimedLadder: {},
      lastResult: null,
      history: [],
      activeEncounter: null,
      memberCooldowns: {},
      memberAffinity: {},
      buffInventory: {},
      activeBuffs: {}
    };
  }
  function normalizeProgress(data) {
    const base = defaultProgress();
    if (!data || typeof data !== "object") data = base;
    data.version = "v039_88";
    ["darkElements", "totalDarkElements", "totalEncounters", "totalCleaned", "totalEscaped", "totalBattles", "maxThreatLevel"].forEach((key) => {
      data[key] = Math.max(key === "maxThreatLevel" ? 1 : 0, Math.floor(Number(data[key] == null ? base[key] : data[key]) || 0));
    });
    data.totalDarkElements = Math.max(data.darkElements, data.totalDarkElements);
    data.claimedLadder = data.claimedLadder && typeof data.claimedLadder === "object" ? data.claimedLadder : {};
    data.memberCooldowns = data.memberCooldowns && typeof data.memberCooldowns === "object" ? data.memberCooldowns : {};
    data.memberAffinity = data.memberAffinity && typeof data.memberAffinity === "object" ? data.memberAffinity : {};
    data.buffInventory = data.buffInventory && typeof data.buffInventory === "object" ? data.buffInventory : {};
    data.activeBuffs = data.activeBuffs && typeof data.activeBuffs === "object" ? data.activeBuffs : {};
    data.history = Array.isArray(data.history) ? data.history.slice(-40) : [];
    data.activeEncounter = data.activeEncounter && typeof data.activeEncounter === "object" ? data.activeEncounter : null;
    return data;
  }
  function loadProgress() {
    let data = null;
    try { data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch (_) { data = null; }
    return expireActiveIfNeeded(normalizeProgress(data));
  }
  function saveProgress(data) {
    data.version = "v039_88";
    data.updatedAt = nowIso();
    data.history = Array.isArray(data.history) ? data.history.slice(-40) : [];
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_) {}
    return data;
  }
  function expireActiveIfNeeded(data) {
    if (!data || !data.activeEncounter || data.activeEncounter.finished) return data;
    const expiresAt = Date.parse(data.activeEncounter.expiresAt || "");
    if (Number.isFinite(expiresAt) && expiresAt > 0 && nowMs() > expiresAt) {
      data.totalEscaped += 1;
      data.lastResult = {
        type: "escaped",
        success: false,
        cleaned: countCleaned(data.activeEncounter),
        darkElements: 0,
        at: nowIso()
      };
      data.history.push({ type: "escaped", cleaned: data.lastResult.cleaned, at: nowIso() });
      data.activeEncounter = null;
      data.activeBuffs = {};
      saveProgress(data);
    }
    return data;
  }

  function getEconomy() {
    if (window.TenotsuEconomy && typeof window.TenotsuEconomy.load === "function") {
      const data = window.TenotsuEconomy.load() || {};
      data.availableSales = Math.max(0, Math.floor(Number(data.availableSales) || 0));
      return data;
    }
    try { return JSON.parse(localStorage.getItem("tenotsu_economy_v1") || "{}"); } catch (_) { return { availableSales: 0 }; }
  }
  function saveEconomy(data) {
    if (window.TenotsuEconomy && typeof window.TenotsuEconomy.save === "function") return window.TenotsuEconomy.save(data);
    try { localStorage.setItem("tenotsu_economy_v1", JSON.stringify(data)); } catch (_) {}
    return data;
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
      return window.TenotsuEventBattlePoint.consume(EVENT_BP_COST, "ブラック家電星人清掃");
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

  function loadDeckIds() {
    try {
      const saved = JSON.parse(localStorage.getItem(DECK_STORAGE_KEY) || "null");
      if (Array.isArray(saved) && saved.length === 5 && saved.every((id) => STAFF_BASE.some((s) => s.id === id))) return saved;
    } catch (_) {}
    return DEFAULT_STAFF_IDS.slice();
  }
  function getDeckStaff() {
    const ids = loadDeckIds();
    const list = ids.map((id) => STAFF_BASE.find((s) => s.id === id)).filter(Boolean);
    return (list.length === 5 ? list : DEFAULT_STAFF_IDS.map((id) => STAFF_BASE.find((s) => s.id === id))).filter(Boolean);
  }
  function getLevel(charId) {
    try {
      const st = window.TenotsuGrowth && window.TenotsuGrowth.getCharacterState ? window.TenotsuGrowth.getCharacterState(charId) : null;
      return Math.max(1, Math.floor(Number(st && st.level) || 1));
    } catch (_) { return 1; }
  }
  function getStats(charId) {
    try {
      const stats = window.TenotsuGrowth && window.TenotsuGrowth.getComputedStats ? window.TenotsuGrowth.getComputedStats(charId) : null;
      if (stats) return stats;
    } catch (_) {}
    return { proposal: 12, speed: 12, stamina: 12, care: 12, honesty: 12, luck: 12 };
  }

  function calcThreatLevel(progress) {
    return Math.max(1, Math.floor((Number(progress.totalCleaned) || 0) / 6) + 1);
  }
  function makeEnemy(template, threatLevel, index) {
    const dirt = 1 + Math.random() * 0.15;
    const maxHp = Math.round((template.baseHp + threatLevel * 14 + Math.max(0, threatLevel - 3) * 6) * dirt);
    return {
      slotId: `${template.id}_${Date.now()}_${index}_${Math.floor(Math.random() * 9999)}`,
      alienId: template.id,
      name: template.name,
      shortName: template.shortName,
      attr: template.attr,
      color: template.color,
      maxHp,
      hp: maxHp,
      cleaned: false,
      darkElements: 0
    };
  }
  function createEncounter(progress) {
    const threatLevel = calcThreatLevel(progress);
    const chosen = shuffle(DIRTY_ALIEN_POOL).slice(0, 6);
    return {
      id: `event_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
      version: "v039_88",
      threatLevel,
      createdAt: nowIso(),
      expiresAt: new Date(nowMs() + ENCOUNTER_ESCAPE_MS).toISOString(),
      paid: false,
      finished: false,
      enemies: chosen.map((item, index) => makeEnemy(item, threatLevel, index)),
      gainedDarkElements: 0,
      combo: 0,
      maxCombo: 0,
      lastAction: "メンテナンス不足で汚れた家電星人を発見しました。"
    };
  }
  function countCleaned(encounter) {
    return encounter && Array.isArray(encounter.enemies) ? encounter.enemies.filter((e) => e.cleaned || e.hp <= 0).length : 0;
  }
  function getSelectedEnemy() {
    if (!state || !state.progress.activeEncounter) return null;
    const enemies = state.progress.activeEncounter.enemies || [];
    return enemies.find((e) => e.slotId === state.selectedEnemyId && !e.cleaned && e.hp > 0) || enemies.find((e) => !e.cleaned && e.hp > 0) || null;
  }
  function calcActiveBuffs(progress) {
    const active = progress.activeBuffs || {};
    return BUFF_ITEMS.reduce((acc, item) => {
      const count = Math.max(0, Math.floor(Number(active[item.id]) || 0));
      if (count <= 0) return acc;
      if (item.effect === "damageRate") acc.damageRate += item.value * count;
      if (item.effect === "recastCut") acc.recastCut += item.value * count;
      if (item.effect === "matchBoost") acc.matchBoost += item.value * count;
      return acc;
    }, { damageRate: 0, recastCut: 0, matchBoost: 0 });
  }
  function calcDamage(member, enemy) {
    const stats = getStats(member.id);
    const level = getLevel(member.id);
    const affinity = Math.max(0, Math.floor(Number(state.progress.memberAffinity[member.id]) || 0));
    const buff = calcActiveBuffs(state.progress);
    const base = 28 + level * 3.2 + Number(stats.proposal || 0) * 1.45 + Number(stats.stamina || 0) * 0.68 + Number(stats.care || 0) * 0.58 + Number(stats.honesty || 0) * 0.42;
    const match = member.attr === enemy.attr;
    const matchRate = match ? (1.65 + buff.matchBoost) : 1;
    const affinityRate = 1 + Math.min(0.35, affinity / 280);
    const damageRate = 1 + buff.damageRate;
    const value = Math.round(base * matchRate * affinityRate * damageRate);
    return { value: Math.max(1, value), match, level, affinity, stats };
  }
  function calcDarkReward(enemy, damageInfo) {
    const threat = state && state.progress && state.progress.activeEncounter ? state.progress.activeEncounter.threatLevel : 1;
    return Math.max(1, Math.floor(4 + threat * 1.35 + (damageInfo && damageInfo.match ? 2 : 0) + Math.random() * 3));
  }
  function getMemberReadyAt(memberId) {
    return Date.parse((state.progress.memberCooldowns || {})[memberId] || "") || 0;
  }
  function isMemberReady(memberId) { return getMemberReadyAt(memberId) <= nowMs(); }

  function isEventRequest(options) {
    options = options || {};
    const mode = options.mode || {};
    return options.battleType === "eventBoss" || mode.battleType === "eventBoss" || mode.id === "event_sales" || ns.state.currentBattleType === "eventBoss";
  }

  function makeState(options) {
    const progress = loadProgress();
    const active = progress.activeEncounter;
    let phase = "ready";
    if (active && active.paid && !active.finished) phase = "combat";
    else if (active && !active.finished) phase = "encounter";
    return {
      options: options || {},
      mode: options && options.mode ? options.mode : {},
      phase,
      runProgress: 0,
      progress,
      selectedEnemyId: active && active.enemies && active.enemies[0] ? active.enemies.find((e) => !e.cleaned && e.hp > 0)?.slotId : null,
      notice: "STでエンカウントし、専用イベントBPで清掃バトルを行います。",
      result: progress.lastResult || null
    };
  }

  function stageClass() { return state ? `event-phase-${state.phase}` : ""; }
  function bossTitle() {
    if (!state) return "ブラック家電星人イベント";
    if (state.phase === "run") return "探索中……";
    if (state.phase === "combat") return `清掃バトル Lv.${state.progress.activeEncounter ? state.progress.activeEncounter.threatLevel : calcThreatLevel(state.progress)}`;
    if (state.phase === "encounter") return `汚れた家電星人群 Lv.${state.progress.activeEncounter ? state.progress.activeEncounter.threatLevel : calcThreatLevel(state.progress)}`;
    if (state.phase === "result") return state.result && state.result.success ? "清掃完了" : "イベント結果";
    return "ブラック家電星人イベント";
  }

  function renderHud() {
    const progress = state.progress;
    const ep = getEventBpState();
    const st = getStaminaState();
    return `
      <div class="event-battle-hud">
        <div class="event-battle-title">イベント営業 / 清掃バトル</div>
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
    const active = state.progress.activeEncounter;
    const level = active ? active.threatLevel : calcThreatLevel(state.progress);
    const cleaned = active ? countCleaned(active) : 0;
    const escapeLeft = active ? Math.max(0, Date.parse(active.expiresAt || "") - nowMs()) : ENCOUNTER_ESCAPE_MS;
    return `
      <div class="event-battle-boss-area">
        <div class="event-battle-boss-card">
          <div class="event-battle-boss-crystal">◆</div>
          <div class="event-battle-boss-copy">
            <div class="event-battle-boss-name">${escapeHtml(bossTitle())}</div>
            <div class="event-battle-boss-desc">家電星人はメンテナンス不足で汚れが溜まると、悪の心が芽生えます。清掃すると正義の心を取り戻し、余計なエネルギーはダークエレメントとして排出されます。</div>
          </div>
        </div>
        <div class="event-battle-gauges event-cleaning-gauges">
          <div class="event-gauge"><span>THREAT</span><i><b style="width:${Math.min(100, level * 8)}%"></b></i><em>Lv.${level}</em></div>
          <div class="event-gauge power"><span>CLEANED</span><i><b style="width:${cleaned / 6 * 100}%"></b></i><em>${cleaned}/6</em></div>
          <div class="event-gauge chance"><span>ESCAPE</span><i><b style="width:${Math.max(2, Math.min(100, escapeLeft / ENCOUNTER_ESCAPE_MS * 100))}%"></b></i><em>${active ? formatClock(escapeLeft) : "12:00:00"}</em></div>
        </div>
        <div class="event-battle-message">${escapeHtml(state.notice || (active && active.lastAction) || "")}</div>
      </div>
    `;
  }

  function renderBuffShop() {
    const progress = state.progress;
    const economy = getEconomy();
    const available = Math.max(0, Math.floor(Number(economy.availableSales) || 0));
    return `
      <div class="event-buff-panel">
        <div class="event-buff-head"><b>つくも準備品</b><span>売上金 ${available.toLocaleString()}円</span></div>
        <div class="event-buff-grid">
          ${BUFF_ITEMS.map((item) => {
            const inv = Math.max(0, Math.floor(Number((progress.buffInventory || {})[item.id]) || 0));
            const active = Math.max(0, Math.floor(Number((progress.activeBuffs || {})[item.id]) || 0));
            const canBuy = available >= item.cost;
            const canUse = inv > 0;
            return `<div class="event-buff-card">
              <b>${escapeHtml(item.name)}</b>
              <small>${escapeHtml(item.desc)}</small>
              <span>所持 ${inv} / 使用中 ${active}</span>
              <div class="event-buff-actions">
                <button type="button" data-event-buy="${escapeHtml(item.id)}" ${canBuy ? "" : "disabled"}>${item.cost}円で買う</button>
                <button type="button" data-event-use="${escapeHtml(item.id)}" ${canUse ? "" : "disabled"}>使う</button>
              </div>
            </div>`;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderReady() {
    return `
      <div class="event-run-panel">
        <div class="event-run-card">
          <b>ブラック家電星人の反応を探す</b>
          <p>イベント営業開始時にSTを消費済みです。汚れた家電星人の群れを見つけ、イベントBPで清掃バトルに入ります。</p>
          <div class="event-route-line"><span></span><span></span><span></span><span></span></div>
          <button type="button" data-event-action="run">探索開始</button>
        </div>
        ${renderBuffShop()}
      </div>
    `;
  }
  function renderRun() {
    return `
      <div class="event-run-panel">
        <div class="event-run-card">
          <b>探索中</b>
          <p>汚れが濃い家電星人反応を追跡しています。</p>
          <div class="event-run-progress"><i style="width:${Math.round(state.runProgress)}%"></i></div>
          <small>${Math.round(state.runProgress)}%</small>
        </div>
      </div>
    `;
  }
  function renderEncounter() {
    const ep = getEventBpState();
    const active = state.progress.activeEncounter;
    return `
      <div class="event-run-panel event-encounter-panel">
        <div class="event-run-card">
          <b>エンカウント！</b>
          <p>汚れた家電星人が6体集まっています。逃げ出すまで12時間。イベントBPを1消費して清掃バトルを開始します。</p>
          <div class="event-encounter-info">
            <span>イベントBP ${ep.current}/${ep.max}</span>
            <span>THREAT Lv.${active ? active.threatLevel : calcThreatLevel(state.progress)}</span>
            <span>逃走まで ${active ? formatClock(Date.parse(active.expiresAt || "") - nowMs()) : "12:00:00"}</span>
          </div>
          <div class="event-action-row">
            <button type="button" data-event-action="startCombat">イベントBP1で清掃開始</button>
            <button type="button" data-event-action="retreat" class="event-sub-button">撤退</button>
          </div>
        </div>
        ${renderBuffShop()}
      </div>
    `;
  }
  function enemyCard(enemy) {
    const ratio = enemy.maxHp > 0 ? clamp(enemy.hp / enemy.maxHp, 0, 1) : 0;
    const selected = state.selectedEnemyId === enemy.slotId;
    return `<button type="button" class="event-clean-enemy ${selected ? "selected" : ""} ${enemy.cleaned ? "cleaned" : ""}" data-event-enemy="${escapeHtml(enemy.slotId)}" style="--enemy-color:${escapeHtml(enemy.color)};">
      <span class="event-clean-enemy-crystal">◆</span>
      <b>${escapeHtml(enemy.shortName)}</b>
      <small>${escapeHtml(enemy.attr)} / ${enemy.cleaned ? "正義復帰" : "悪の心"}</small>
      <i><em style="width:${ratio * 100}%"></em></i>
      <strong>${enemy.cleaned ? "CLEAN" : `${Math.max(0, enemy.hp)} / ${enemy.maxHp}`}</strong>
    </button>`;
  }
  function memberCard(member) {
    const enemy = getSelectedEnemy();
    const readyAt = getMemberReadyAt(member.id);
    const ready = readyAt <= nowMs();
    const dmg = enemy ? calcDamage(member, enemy) : null;
    const affinity = Math.max(0, Math.floor(Number(state.progress.memberAffinity[member.id]) || 0));
    return `<button type="button" class="event-clean-member ${ready ? "ready" : "cooldown"} ${dmg && dmg.match ? "match" : ""}" data-event-member="${escapeHtml(member.id)}" style="--member-color:${escapeHtml(member.color)};" ${ready ? "" : "disabled"}>
      <span>${escapeHtml(member.name)}</span>
      <b>${escapeHtml(member.attr)}</b>
      <small>${ready ? (dmg ? `清掃力 ${dmg.value}${dmg.match ? " / 特攻" : ""}` : "READY") : `リキャスト ${shortRemaining(readyAt)}`}</small>
      <em>Lv.${getLevel(member.id)} / 親愛 ${affinity}</em>
    </button>`;
  }
  function renderCombat() {
    const active = state.progress.activeEncounter;
    const enemies = active && Array.isArray(active.enemies) ? active.enemies : [];
    const staff = getDeckStaff();
    return `
      <div class="event-cleaning-battle">
        <div class="event-clean-enemy-grid">${enemies.map(enemyCard).join("")}</div>
        <div class="event-clean-status-row">
          <span>メンバーリキャスト：30分</span>
          <span>属性一致で特攻</span>
          <span>逃走まで ${formatClock(Date.parse(active.expiresAt || "") - nowMs())}</span>
        </div>
        <div class="event-clean-member-row">${staff.map(memberCard).join("")}</div>
        ${renderBuffShop()}
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
    const r = state.result || state.progress.lastResult || {};
    return `
      <div class="event-result-panel">
        <div class="event-result-card">
          <div class="event-result-title">${r.success ? "清掃完了！" : r.type === "escaped" ? "逃走されました" : "イベント結果"}</div>
          <div class="event-result-grid">
            <div><span>CLEANED</span><b>${r.cleaned || 0}/6</b></div>
            <div><span>DARK ELEMENT</span><b>+${r.darkElements || 0}</b></div>
            <div><span>所持</span><b>${state.progress.darkElements}</b></div>
            <div><span>累計</span><b>${state.progress.totalDarkElements}</b></div>
          </div>
          <div class="event-result-lore">
            <b>世界観補足</b>
            <p>メンテナンス不足で汚れた家電星人には悪の心が芽生えます。清掃バトルで正義の心を取り戻すと、余計なエネルギーはクリスタル型のダークエレメントとして排出されます。</p>
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
    if (state.phase === "combat") return renderCombat();
    if (state.phase === "result") return renderResult();
    return renderReady();
  }
  function render() {
    ensureRoot();
    if (!state) return;
    state.progress = expireActiveIfNeeded(state.progress);
    if (!state.progress.activeEncounter && state.phase === "combat") state.phase = "result";
    root.className = `event-battle-root ${stageClass()}`;
    root.dataset.phase = state.phase;
    root.innerHTML = `<div class="event-battle-stage">${renderHud()}${renderBossArea()}${renderBody()}</div>`;
    bind();
  }

  function startClock() {
    clearInterval(clockTimer);
    clockTimer = setInterval(() => {
      if (!state || state.phase !== "combat") return;
      render();
    }, 30000);
  }
  function stopClock() { clearInterval(clockTimer); clockTimer = null; }

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
    const progress = loadProgress();
    progress.activeEncounter = createEncounter(progress);
    progress.totalEncounters += 1;
    progress.maxThreatLevel = Math.max(progress.maxThreatLevel || 1, progress.activeEncounter.threatLevel);
    progress.history.push({ type: "encounter", level: progress.activeEncounter.threatLevel, expiresAt: progress.activeEncounter.expiresAt, at: nowIso() });
    saveProgress(progress);
    state.progress = progress;
    state.phase = "run";
    state.runProgress = 0;
    state.notice = "汚れた家電星人の反応を追跡中です。";
    render();
    clearInterval(runTimer);
    runTimer = setInterval(() => {
      if (!state || state.phase !== "run") { clearInterval(runTimer); return; }
      state.runProgress += 10 + Math.random() * 10;
      if (state.runProgress >= 100) {
        clearInterval(runTimer);
        state.phase = "encounter";
        state.runProgress = 100;
        state.notice = "汚れた家電星人の群れを発見しました。イベントBPで清掃できます。";
      }
      render();
    }, 160);
  }
  function startCombat() {
    if (!state || !state.progress.activeEncounter) return;
    const enc = state.progress.activeEncounter;
    if (!enc.paid) {
      const consumed = consumeEventBp();
      if (!consumed.ok) {
        state.notice = `イベントBPが足りません。現在 ${consumed.state.current}/${consumed.state.max}、必要 ${consumed.cost} です。30分に1回復します。`;
        render();
        return;
      }
      enc.paid = true;
      enc.startedAt = nowIso();
      state.progress.totalBattles += 1;
      state.progress.history.push({ type: "startCombat", level: enc.threatLevel, at: nowIso() });
      saveProgress(state.progress);
    }
    state.selectedEnemyId = getSelectedEnemy() ? getSelectedEnemy().slotId : null;
    state.phase = "combat";
    state.notice = "上の汚れた家電星人を選び、下のひだまりメンバーで清掃します。";
    startClock();
    render();
  }
  function buyBuff(id) {
    const item = BUFF_ITEMS.find((x) => x.id === id);
    if (!item || !state) return;
    const economy = getEconomy();
    economy.availableSales = Math.max(0, Math.floor(Number(economy.availableSales) || 0));
    if (economy.availableSales < item.cost) {
      state.notice = `${item.name}を買う売上金が足りません。`;
      render();
      return;
    }
    economy.availableSales -= item.cost;
    economy.history = Array.isArray(economy.history) ? economy.history : [];
    economy.history.unshift({ type: "buyEventBuff", item: item.name, cost: item.cost, at: nowIso() });
    economy.history = economy.history.slice(0, 30);
    saveEconomy(economy);
    const progress = loadProgress();
    progress.buffInventory[item.id] = Math.max(0, Math.floor(Number(progress.buffInventory[item.id]) || 0)) + 1;
    progress.history.push({ type: "buyBuff", item: item.name, cost: item.cost, at: nowIso() });
    saveProgress(progress);
    state.progress = progress;
    state.notice = `${item.name}を購入しました。`;
    render();
  }
  function useBuff(id) {
    const item = BUFF_ITEMS.find((x) => x.id === id);
    if (!item || !state) return;
    const progress = loadProgress();
    const inv = Math.max(0, Math.floor(Number(progress.buffInventory[id]) || 0));
    if (inv <= 0) return;
    progress.buffInventory[id] = inv - 1;
    progress.activeBuffs[id] = Math.max(0, Math.floor(Number(progress.activeBuffs[id]) || 0)) + 1;
    progress.history.push({ type: "useBuff", item: item.name, at: nowIso() });
    saveProgress(progress);
    state.progress = progress;
    state.notice = `${item.name}を使用しました。次の清掃に効果があります。`;
    render();
  }
  function selectEnemy(slotId) {
    if (!state || !state.progress.activeEncounter) return;
    const enemy = state.progress.activeEncounter.enemies.find((e) => e.slotId === slotId);
    if (!enemy || enemy.cleaned || enemy.hp <= 0) return;
    state.selectedEnemyId = slotId;
    state.notice = `${enemy.shortName}を清掃対象にしました。`;
    render();
  }
  function memberAttack(memberId) {
    if (!state || state.phase !== "combat") return;
    const enc = state.progress.activeEncounter;
    if (!enc) return;
    if (Date.parse(enc.expiresAt || "") <= nowMs()) {
      state.progress = expireActiveIfNeeded(state.progress);
      state.phase = "result";
      render();
      return;
    }
    const member = STAFF_BASE.find((s) => s.id === memberId);
    const enemy = getSelectedEnemy();
    if (!member || !enemy) return;
    if (!isMemberReady(memberId)) {
      state.notice = `${member.name}はリキャスト中です。あと${shortRemaining(getMemberReadyAt(memberId))}。`;
      render();
      return;
    }
    const info = calcDamage(member, enemy);
    enemy.hp = Math.max(0, Math.floor(enemy.hp - info.value));
    let gained = 0;
    if (enemy.hp <= 0 && !enemy.cleaned) {
      enemy.cleaned = true;
      enemy.hp = 0;
      gained = calcDarkReward(enemy, info);
      enemy.darkElements = gained;
      enc.gainedDarkElements += gained;
      enc.combo += 1;
      enc.maxCombo = Math.max(enc.maxCombo || 0, enc.combo || 0);
      state.progress.darkElements += gained;
      state.progress.totalDarkElements += gained;
      state.progress.totalCleaned += 1;
      state.progress.memberAffinity[member.id] = Math.max(0, Math.floor(Number(state.progress.memberAffinity[member.id]) || 0)) + 1;
      enc.lastAction = `${member.name}が${enemy.shortName}を清掃。正義の心を取り戻しました。ダークエレメント +${gained}`;
    } else {
      enc.combo = 0;
      enc.lastAction = `${member.name}が${enemy.shortName}を清掃。${info.value}ダメージ。`;
    }
    const buffs = calcActiveBuffs(state.progress);
    const recast = Math.max(5 * 60 * 1000, MEMBER_RECAST_MS - buffs.recastCut);
    state.progress.memberCooldowns[member.id] = new Date(nowMs() + recast).toISOString();
    state.notice = enc.lastAction + (info.match ? " 属性特攻！" : "");
    const next = getSelectedEnemy();
    if (next) state.selectedEnemyId = next.slotId;
    const cleaned = countCleaned(enc);
    if (cleaned >= 6) {
      finishEncounter(true);
      return;
    }
    saveProgress(state.progress);
    render();
  }
  function finishEncounter(success) {
    if (!state || !state.progress.activeEncounter) return;
    const enc = state.progress.activeEncounter;
    const cleaned = countCleaned(enc);
    const gained = Math.max(0, Math.floor(Number(enc.gainedDarkElements) || 0));
    const result = { type: "cleaning", success: !!success, cleaned, darkElements: gained, maxCombo: enc.maxCombo || 0, level: enc.threatLevel, at: nowIso() };
    state.progress.lastResult = result;
    state.progress.history.push({ type: "finishEventCleaning", success: !!success, cleaned, darkElements: gained, at: nowIso() });
    state.progress.activeEncounter = null;
    state.progress.activeBuffs = {};
    saveProgress(state.progress);
    state.result = result;
    state.phase = "result";
    state.notice = success ? "全員の清掃が完了しました。" : "イベントバトルを終了しました。";
    stopClock();
    render();
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
        else if (action === "startCombat") startCombat();
        else if (action === "retreat") {
          state.result = { success: false, cleaned: state.progress.activeEncounter ? countCleaned(state.progress.activeEncounter) : 0, darkElements: 0 };
          state.progress.activeEncounter = null;
          state.progress.activeBuffs = {};
          saveProgress(state.progress);
          state.phase = "result";
          state.notice = "撤退しました。";
          render();
        }
        else if (action === "rerun") {
          state = makeState({ mode: state.mode, battleType: "eventBoss" });
          startRun(false);
        }
        else if (action === "close") closeEventBattle();
      });
    });
    root.querySelectorAll("[data-event-enemy]").forEach((btn) => btn.addEventListener("click", () => selectEnemy(btn.dataset.eventEnemy)));
    root.querySelectorAll("[data-event-member]").forEach((btn) => btn.addEventListener("click", () => memberAttack(btn.dataset.eventMember)));
    root.querySelectorAll("[data-event-claim]").forEach((btn) => btn.addEventListener("click", () => claimLadder(btn.dataset.eventClaim)));
    root.querySelectorAll("[data-event-buy]").forEach((btn) => btn.addEventListener("click", () => buyBuff(btn.dataset.eventBuy)));
    root.querySelectorAll("[data-event-use]").forEach((btn) => btn.addEventListener("click", () => useBuff(btn.dataset.eventUse)));
  }

  function openEventBattle(options) {
    ensureRoot();
    clearInterval(runTimer);
    stopClock();
    state = makeState(options || {});
    document.body.classList.add("event-battle-screen");
    if (ns.setMode) ns.setMode("eventBattle");
    root.classList.remove("hidden");
    if (state.phase === "combat") startClock();
    render();
    return true;
  }
  function closeEventBattle() {
    clearInterval(runTimer);
    stopClock();
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
    if (!window.BattleProto || window.BattleProto.__eventBattlePatchedV88) return false;
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
    window.BattleProto.__eventBattlePatchedV88 = true;
    window.TenotsuEventBattle = api;
    return true;
  }

  const api = {
    VERSION,
    open: openEventBattle,
    close: closeEventBattle,
    getState: () => state,
    getProgress: loadProgress,
    ladderRewards: LADDER_REWARDS.slice(),
    buffItems: BUFF_ITEMS.slice()
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
