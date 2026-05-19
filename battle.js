// battle.js - v037 integrated deck battle prototype
// 店舗営業：上=情報 / 中央=家電星人 / 下=メンバー5人
// 操作はメンバーのシングルタップで通常接客、ダブルタップで必殺接客。通常敵HP2、レアHP3。ターゲットは選択メンバーに最適な家電星人へ自動Fix。彩愛の必殺は盤面整理＋敵チェンジ短縮。店長HELP・必殺カットイン・タイムセール演出あり。

(function () {
  const BATTLE_VERSION = "v037_08";
  const BATTLE_SECONDS = 30;
  const MAX_ENEMIES = 3;
  const CHANGE_SECONDS = 2.0;
  const CHANGE_SECONDS_BUFFED = 1.0;
  const AUTO_ACTION_INTERVAL = 0.75;
  const AUTO_CT_MULTIPLIER = 2.0; // オート営業ペナルティ：自動操作時のみCT2倍
  const AUTO_SCORE_MULTIPLIER = 0.7; // オート営業ペナルティ：自動成約の売上Pt70%
  const HELP_STOCK_MAX = 3;
  const HELP_STOCK_STEP = 10;
  const CHANGE_MESSAGES = [
    "今回は別スタッフへ案内",
    "少々お待ちください",
    "別のお客様を先に対応"
  ];

  const staffMaster = [
    { id: "aa", name: "緋奈", cardImage: "./assets2/card/aa_hina_card_test.png", color: "#d3381c", attr: "映像", power: 1, ctMax: 2.4, skillName: "全力おすすめ！", skillType: "powerBuff", skillDesc: "8秒間、接客力アップ。成約を一気に伸ばします。" },
    { id: "ab", name: "藍", color: "#0067C0", attr: "ドライヤー", power: 1, ctMax: 3.0, skillName: "やさしい案内", skillType: "extendTime", skillDesc: "全敵の受付時間を延長し、営業残り時間も少し増やします。" },
    { id: "ac", name: "翠", color: "#02b308", attr: "PC", power: 1, ctMax: 3.5, skillName: "最適解プレゼン", skillType: "pcSweep", skillDesc: "PC属性をまとめて成約し、6秒間マッチ性能を上げます。" },
    { id: "ad", name: "こがね", color: "#FFF450", attr: "スマホ", power: 1, ctMax: 1.7, skillName: "即決トーク", skillType: "ctReduce", skillDesc: "全メンバーのCTを短縮し、6秒間テンポを上げます。" },
    { id: "ae", name: "琥珀", color: "#F68B1F", attr: "オーディオ", power: 1, ctMax: 2.7, skillName: "フロアダッシュ", skillType: "rushBuff", skillDesc: "8秒間ラッシュ対応力アップ。コンボを守りやすくします。" },
    { id: "af", name: "真花", color: "#C0C0C0", attr: "美容", power: 1, ctMax: 2.8, skillName: "お嬢様スマイル", skillType: "comboPlus", skillDesc: "成約時のコンボ補助。丁寧な接客で満足度を伸ばします。" },
    { id: "ag", name: "雪乃", color: "#6495ED", attr: "調理", power: 1, ctMax: 3.2, skillName: "静かな提案", skillType: "freezeTime", skillDesc: "敵の受付時間を一時停止し、店内を落ち着かせます。" },
    { id: "ah", name: "美空", color: "#fffef6", attr: "除湿", power: 1, ctMax: 2.6, skillName: "夏空接客", skillType: "rescue", skillDesc: "受付時間が短い敵を追加フォローする安定型スキル。" },
    { id: "ai", name: "夜空", color: "#00152d", attr: "加湿", power: 1, ctMax: 2.9, skillName: "冬空フォーカス", skillType: "rareKiller", skillDesc: "レア敵への追加ダメージで一点突破します。" },
    { id: "aj", name: "桃", color: "#F7ADC3", attr: "配信", power: 1, ctMax: 2.1, skillName: "店内配信", skillType: "buzz", skillDesc: "売上Ptとレア出現率を上げる代わりに混雑しやすくなります。" },
    { id: "ak", name: "彩愛", color: "#694D9F", attr: "生活", power: 1, ctMax: 3.0, skillName: "優雅な家事導線", skillType: "ayameRoute", skillDesc: "敵最大2体に1ダメージ。6秒間、敵チェンジを2秒から1秒に短縮。" },
    { id: "al", name: "里美", color: "#8d5025", attr: "事務", power: 1, ctMax: 3.1, skillName: "受付整理", skillType: "changeSupport", skillDesc: "受付を整理して、チェンジやCT管理を補助します。" },
    { id: "am", name: "萌", color: "#33CC99", attr: "季節", power: 1, ctMax: 2.9, skillName: "おにいちゃん助けて", skillType: "managerBoost", skillDesc: "店長ヘルプゲージが溜まりやすくなるサポートスキル。" }
  ];  const DEFAULT_STAFF_IDS = ["aa", "ab", "ac", "ad", "ae"];
  const DECK_STORAGE_KEY = "tenotsu_battle_deck_v1";
  let activeStaffIds = loadDeckIds();

  function loadDeckIds() {
    try {
      const saved = JSON.parse(localStorage.getItem(DECK_STORAGE_KEY) || "null");
      if (Array.isArray(saved) && saved.length === 5 && saved.every(id => staffMaster.some(s => s.id === id))) {
        return saved;
      }
    } catch (e) {}
    return [...DEFAULT_STAFF_IDS];
  }

  function saveDeckIds(ids) {
    activeStaffIds = [...ids];
    try { localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(activeStaffIds)); } catch (e) {}
  }

  function getStaffBase() {
    return activeStaffIds.map(id => staffMaster.find(s => s.id === id)).filter(Boolean);
  }


  const attrColors = {
    "映像": "#d3381c",
    "ドライヤー": "#0067C0",
    "PC": "#02b308",
    "スマホ": "#FFF450",
    "オーディオ": "#F68B1F",
    "美容": "#C0C0C0",
    "調理": "#6495ED",
    "除湿": "#fffef6",
    "加湿": "#00152d",
    "配信": "#F7ADC3",
    "生活": "#694D9F",
    "事務": "#8d5025",
    "季節": "#33CC99"
  };
  const enemyTypes = [
    { attr: "映像", icon: "📺", name: "テレビ星人", text: "大画面で見たい！", baseGauge: 2, basePatience: 6.8, score: 120 },
    { attr: "ドライヤー", icon: "💨", name: "ドライヤー星人", text: "髪を早く乾かしたい", baseGauge: 2, basePatience: 7.3, score: 125 },
    { attr: "PC", icon: "💻", name: "PC星人", text: "初期設定して！", baseGauge: 2, basePatience: 7.8, score: 150 },
    { attr: "スマホ", icon: "📱", name: "スマホ星人", text: "充電器どれ？", baseGauge: 2, basePatience: 5.2, score: 105 },
    { attr: "オーディオ", icon: "🎧", name: "オーディオ星人", text: "いい音が欲しい！", baseGauge: 2, basePatience: 6.7, score: 140 },
    { attr: "美容", icon: "✨", name: "美容家電星人", text: "美顔器を見たいです", baseGauge: 2, basePatience: 7.0, score: 130 },
    { attr: "調理", icon: "🍳", name: "調理器具星人", text: "おいしく作りたい", baseGauge: 2, basePatience: 7.2, score: 135 },
    { attr: "除湿", icon: "☀️", name: "除湿機星人", text: "ジメジメを何とかしたい", baseGauge: 2, basePatience: 6.1, score: 118 },
    { attr: "加湿", icon: "🌙", name: "加湿器星人", text: "乾燥がつらい", baseGauge: 2, basePatience: 6.3, score: 118 },
    { attr: "配信", icon: "🎮", name: "配信機材星人", text: "配信を始めたい！", baseGauge: 2, basePatience: 5.9, score: 145 },
    { attr: "生活", icon: "🧺", name: "生活家電星人", text: "掃除機ほしい", baseGauge: 2, basePatience: 6.4, score: 130 },
    { attr: "事務", icon: "🧾", name: "レジ伝票星人", text: "会計処理を楽にしたい", baseGauge: 2, basePatience: 7.1, score: 128 },
    { attr: "季節", icon: "🌿", name: "季節家電星人", text: "エアコン相談したい", baseGauge: 2, basePatience: 6.5, score: 122 }
  ];
  let root = null;
  let state = null;
  let timerId = null;
  let lastTick = 0;
  const DOUBLE_TAP_MS = 220;
  let staffTapTimer = null;
  let pendingStaffTapId = null;
  let pendingStaffTapAt = 0;
  const ENEMY_DOUBLE_TAP_MS = 260;
  let pendingEnemyTapId = null;
  let pendingEnemyTapAt = 0;
  let surfaceTimers = [];

  function makeState() {
  
  function getActiveEnemyAttributes() {
    const attrs = new Set();
    state.enemies.forEach(enemy => {
      if (!enemy || enemy.isChanging) return;
      if (enemy.attribute) attrs.add(enemy.attribute);
    });
    return attrs;
  }

  function hasMatchingEnemyForMember(member) {
    if (!member || !state.enemies || state.enemies.length === 0) return false;
    return state.enemies.some(enemy => {
      if (!enemy || enemy.isChanging) return false;
      return enemy.attribute === member.attribute;
    });
  }

  function countMatchingEnemiesForMember(member) {
    if (!member || !state.enemies) return 0;
    return state.enemies.filter(enemy => {
      if (!enemy || enemy.isChanging) return false;
      return enemy.attribute === member.attribute;
    }).length;
  }



  function getAttributeColor(attribute) {
    const colors = {
      video: "#d3381c",
      dryer: "#0067C0",
      pc: "#02b308",
      phone: "#FFF450",
      audio: "#F68B1F",
      beauty: "#C0C0C0",
      cooking: "#6495ED",
      dehumid: "#fffef6",
      humid: "#00152d",
      stream: "#F7ADC3",
      life: "#694D9F",
      office: "#8d5025",
      season: "#33CC99"
    };
    return colors[attribute] || "#ffffff";
  }


  return {
      running: false,
      finished: false,
      timeLeft: BATTLE_SECONDS,
      score: 0,
      served: 0,
      missed: 0,
      combo: 0,
      maxCombo: 0,
      nextEnemyId: 1,
      spawnTimer: 0,
      rush: false,
      targetPreviewId: null,
      autoMode: false,
      autoTimer: 0,
      autoResolving: false,
      helpStock: 0,
      helpEarnCounter: 0,
      nextHitId: 1,
      hitEffects: [],
      cutin: null,
      cutinUntil: 0,
      surface: null,
      countingDown: false,

      lastActionText: "営業開始を押してください。",
      buffPowerUntil: 0,
      buffMatchUntil: 0,
      buffSpeedUntil: 0,
      buffChangeUntil: 0,
      buffRushUntil: 0,
      comboShield: false,
      deckEdit: false,
      deckSelection: [...activeStaffIds],
      staff: getStaffBase().map(s => ({ ...s, ct: 0, skill: 0 })),
      enemies: []
    };
  }

  function ensureRoot() {
    root = document.getElementById("battle-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "battle-root";
      root.className = "battle-root hidden";
      document.body.appendChild(root);
    }
  }

  function openBattle() {
    ensureRoot();
    state = makeState();
    root.classList.remove("hidden");
    render();
  }

  function closeBattle() {
    clearPendingStaffTap();
    clearPendingEnemyTap();
    clearSurfaceTimers();
    stopLoop();
    if (root) root.classList.add("hidden");
  }

  function clearPendingStaffTap() {
    if (staffTapTimer) window.clearTimeout(staffTapTimer);
    staffTapTimer = null;
    pendingStaffTapId = null;
    pendingStaffTapAt = 0;
  }

  function clearPendingEnemyTap() {
    pendingEnemyTapId = null;
    pendingEnemyTapAt = 0;
  }

  function stopLoop() {
    if (timerId) window.clearInterval(timerId);
    timerId = null;
  }

  function clearSurfaceTimers() {
    surfaceTimers.forEach(id => window.clearTimeout(id));
    surfaceTimers = [];
  }

  function showSurface(title, subText = "", kind = "notice", duration = 1200) {
    if (!state) return;
    state.surface = { title, subText, kind };
    render();
    if (duration > 0) {
      const id = window.setTimeout(() => {
        if (state && state.surface && state.surface.title === title) {
          state.surface = null;
          render();
        }
      }, duration);
      surfaceTimers.push(id);
    }
  }

  function startBattle(autoMode = false) {
    clearPendingStaffTap();
    clearPendingEnemyTap();
    clearSurfaceTimers();
    stopLoop();
    state = makeState();
    state.countingDown = true;
    state.autoMode = !!autoMode;
    state.autoTimer = 0;
    state.lastActionText = autoMode
      ? "オート営業準備中。開店後、自動操作はCT2倍です。"
      : "開店準備中。メンバータップで接客、敵ダブルタップでチェンジできます。";
    render();
    runOpeningCountdown(autoMode);
  }

  function runOpeningCountdown(autoMode) {
    const steps = [
      { title: "3", sub: "開店準備中", ms: 650 },
      { title: "2", sub: "スタッフ配置確認", ms: 650 },
      { title: "1", sub: "レジ起動OK", ms: 650 },
      { title: "開店！", sub: autoMode ? "オート営業開始（HELP→必殺→通常）" : "店舗営業開始", ms: 720 }
    ];

    let delay = 0;
    steps.forEach((step, index) => {
      const id = window.setTimeout(() => {
        if (!state || !state.countingDown) return;
        state.surface = { title: step.title, subText: step.sub, kind: index === steps.length - 1 ? "open" : "count" };
        render();
      }, delay);
      surfaceTimers.push(id);
      delay += step.ms;
    });

    const startId = window.setTimeout(() => beginBattle(autoMode), delay);
    surfaceTimers.push(startId);
  }

  function beginBattle(autoMode = false) {
    if (!state) return;
    state.countingDown = false;
    state.surface = null;
    state.running = true;
    state.finished = false;
    state.autoMode = !!autoMode;
    state.autoTimer = 0;
    state.lastActionText = state.autoMode
      ? "オート営業開始！ 自動操作はCT2倍です。店長ヘルプを活用できます。"
      : "開店！ メンバータップで接客、敵ダブルタップでチェンジできます。";
    spawnEnemy(true);
    spawnEnemy(true);
    spawnEnemy(true);
    lastTick = performance.now();
    timerId = window.setInterval(tick, 100);
    render();
  }

  function finishBattle() {
    if (!state) return;
    state.running = false;
    state.finished = true;
    state.timeLeft = Math.max(0, state.timeLeft);
    state.lastActionText = `営業終了：成約${state.served}件 / 売上Pt ${state.score}`;
    stopLoop();
    showSurface("営業終了！", `成約${state.served}件 / 売上Pt ${state.score}`, "close", 1350);
  }

  function tick() {
    if (!state || !state.running) return;
    const now = performance.now();
    const dt = Math.min(0.24, Math.max(0.05, (now - lastTick) / 1000));
    lastTick = now;

    state.timeLeft = Math.max(0, state.timeLeft - dt);
    const wasRush = state.rush;
    state.rush = state.timeLeft <= 10;
    if (!wasRush && state.rush) {
      state.lastActionText = "タイムセール開始！来店ラッシュです。";
      showTimeSaleCutin();
    }

    state.spawnTimer -= dt;
    const elapsed = BATTLE_SECONDS - state.timeLeft;
    const spawnInterval = state.rush ? 0.85 : elapsed > 10 ? 1.25 : 1.8;
    if (state.spawnTimer <= 0) {
      spawnEnemy();
      state.spawnTimer = spawnInterval;
    }

    updateStaff(dt, now);
    updateEnemies(dt);
    updateHitEffects(now);
    maintainEnemies();
    runAutoBattle(dt);

    if (state.timeLeft <= 0) {
      finishBattle();
      return;
    }
    render();
  }

  function updateStaff(dt, now) {
    const speedBuff = now < state.buffSpeedUntil ? 2.1 : 1.0;
    state.staff.forEach(s => {
      s.ct = Math.max(0, s.ct - dt * speedBuff);
      if (state.running) s.skill = Math.min(100, s.skill + dt * 4.5);
    });
  }

  function updateEnemies(dt) {
    for (let i = state.enemies.length - 1; i >= 0; i--) {
      const e = state.enemies[i];

      if (e.defeating) {
        e.defeatLeft -= dt;
        if (e.defeatLeft <= 0) {
          completeEnemy(e, !!e.defeatMatch);
        }
        continue;
      }

      if (e.exchanging) {
        e.exchangeLeft -= dt;
        if (e.exchangeLeft <= 0) {
          state.enemies[i] = createEnemy();
        }
        continue;
      }

      e.patience -= dt;
      if (e.patience <= 0) {
        state.enemies.splice(i, 1);
        state.missed += 1;
        if (state.comboShield) {
          state.comboShield = false;
          state.lastActionText = "琥珀のフォローでコンボ維持！";
        } else {
          state.combo = 0;
          state.lastActionText = `${e.name}が離脱…`;
        }
      }
    }
  }

  function maintainEnemies() {
    while (state.running && state.enemies.length < MAX_ENEMIES) spawnEnemy(true);
  }

  function createEnemy() {
    const base = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    const rare = Math.random() < (state.rush ? 0.16 : 0.07);
    // HP仕様：通常敵HP2、レア敵HP3
    const gauge = rare ? 3 : 2;
    const patience = Math.max(3.2, base.basePatience + Math.random() * 1.6 + (rare ? 1.2 : 0) - (state.rush ? 1.0 : 0));

    return {
      id: state.nextEnemyId++,
      attr: base.attr,
      icon: base.icon,
      name: base.name,
      text: base.text,
      gauge,
      maxGauge: gauge,
      patience,
      maxPatience: patience,
      score: base.score + (rare ? 80 : 0),
      rare,
      exchanging: false,
      exchangeLeft: 0,
      exchangeMax: CHANGE_SECONDS,
      exchangeMessage: "",
      defeating: false,
      defeatLeft: 0,
      defeatMatch: false
    };
  }

  function spawnEnemy(force = false) {
    if (!state || state.enemies.length >= MAX_ENEMIES) return;
    if (!force && Math.random() < 0.25) return;
    state.enemies.push(createEnemy());
  }

  function handleStaffPointer(staffId, event) {
    if (!state || !state.running) return;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const now = performance.now();
    const isDoubleTap =
      staffTapTimer &&
      pendingStaffTapId === staffId &&
      now - pendingStaffTapAt <= DOUBLE_TAP_MS;

    if (isDoubleTap) {
      clearPendingStaffTap();
      onStaffDoubleTap(staffId);
      return;
    }

    if (staffTapTimer) {
      const oldStaffId = pendingStaffTapId;
      clearPendingStaffTap();
      onStaffSingleTap(oldStaffId);
    }

    pendingStaffTapId = staffId;
    pendingStaffTapAt = now;
    staffTapTimer = window.setTimeout(() => {
      const targetStaffId = pendingStaffTapId;
      clearPendingStaffTap();
      onStaffSingleTap(targetStaffId);
    }, DOUBLE_TAP_MS);
  }

  function onStaffSingleTap(staffId) {
    if (!state || !state.running) return;
    const s = state.staff.find(x => x.id === staffId);
    if (!s) return;

    if (s.ct > 0) {
      state.lastActionText = `${s.name}は準備中です。`;
      pulseStaff(staffId);
      render();
      return;
    }

    const target = findBestTarget(s);
    if (!target) {
      state.lastActionText = "対応できる家電星人がいません。";
      render();
      return;
    }

    state.targetPreviewId = target.id;
    resolveContact(s, target);
    s.ct = s.ctMax;
    s.skill = Math.min(100, s.skill + (s.attr === target.attr ? 28 : 16));
    render();
  }

  function onStaffDoubleTap(staffId) {
    if (!state || !state.running) return;
    const s = state.staff.find(x => x.id === staffId);
    if (!s) return;

    if (s.ct > 0) {
      state.lastActionText = `${s.name}は準備中です。必殺技もまだ使えません。`;
      pulseStaff(staffId);
      render();
      return;
    }

    if (s.skill < 100) {
      state.lastActionText = `${s.name}の必殺ゲージが足りません。ダブルタップは必殺技用です。`;
      render();
      return;
    }

    const target = findBestTarget(s, true);
    if (!target) {
      state.lastActionText = "必殺接客の対象がいません。";
      render();
      return;
    }

    state.targetPreviewId = target.id;
    resolveContact(s, target, true);
    useSkill(s);
    s.skill = 0;
    s.ct = s.ctMax * 0.65;
    render();
  }

  function findBestTarget(staff, isSpecial = false) {
    let best = null;
    let bestScore = -Infinity;

    for (const e of state.enemies) {
      if (e.exchanging || e.defeating) continue;
      const matchScore = staff.attr === e.attr ? 120 : 0;
      const urgentScore = (1 - e.patience / e.maxPatience) * 72;
      const finishScore = e.gauge <= getAttackDamage(staff, e, isSpecial) ? 48 : 0;
      const rareScore = e.rare ? 38 : 0;
      const highScore = e.score / 8;
      const rushDangerScore = state.rush && e.patience <= 2.5 ? 32 : 0;
      const score = matchScore + urgentScore + finishScore + rareScore + highScore + rushDangerScore;

      if (score > bestScore) {
        bestScore = score;
        best = e;
      }
    }
    return best;
  }

  function getAttackDamage(staff, enemy, isSpecial = false) {
    const isMatch = staff.attr === enemy.attr;
    if (isSpecial) return isMatch ? 3 : 2;
    return isMatch ? 2 : 1;
  }

  function resolveContact(staff, enemy, isSpecial = false) {
    const isMatch = staff.attr === enemy.attr;
    const damage = getAttackDamage(staff, enemy, isSpecial);

    enemy.gauge -= damage;
    addHitEffect(enemy, staff, damage, isSpecial, isMatch);
    state.lastActionText = `${staff.name} → ${enemy.name}：${damage}ダメージ ${isSpecial ? "必殺" : "通常"} ${isMatch ? "特攻◎" : "等倍"}`;

    if (enemy.gauge <= 0) {
      enemy.gauge = 0;
      enemy.defeating = true;
      enemy.defeatLeft = 0.32;
      enemy.defeatMatch = isMatch;
    }
  }

  function addHitEffect(enemy, staff, damage, isSpecial, isMatch, customText = null) {
    if (!state) return;
    state.hitEffects.push({
      id: state.nextHitId++,
      enemyId: enemy.id,
      color: staff.color || "#ffffff",
      text: `${customText || (isSpecial ? "必殺HIT!" : "HIT!")} ${damage}`,
      subText: isMatch ? "特攻" : "",
      createdAt: performance.now(),
      life: 620
    });
  }

  function updateHitEffects(now) {
    if (!state || !state.hitEffects) return;
    state.hitEffects = state.hitEffects.filter(effect => now - effect.createdAt < effect.life);
  }

  function completeEnemy(enemy, isMatch, options = {}) {
    const idx = state.enemies.findIndex(x => x.id === enemy.id);
    if (idx >= 0) state.enemies.splice(idx, 1);

    state.served += 1;
    addHelpProgress(1);
    state.combo += 1;
    state.maxCombo = Math.max(state.maxCombo, state.combo);

    const comboBonus = Math.min(3.0, 1 + state.combo * 0.05);
    const rareBonus = enemy.rare ? 2.0 : 1.0;
    const matchBonus = isMatch ? 1.25 : 1.0;
    let point = Math.round(enemy.score * comboBonus * rareBonus * matchBonus);
    if (state.autoResolving) point = Math.max(1, Math.floor(point * AUTO_SCORE_MULTIPLIER));
    state.score += point;
    state.lastActionText = `レジ誘導成功！ +${point}Pt`;
  }

  function showCutin(title, color = "#ffffff", subText = "", descText = "", image = "") {
    if (!state) return;
    state.cutin = { title, color, subText, descText, image, createdAt: performance.now(), life: descText || image ? 1650 : 1150 };
    state.cutinUntil = state.cutin.createdAt + state.cutin.life;
  }

  function showTimeSaleCutin() {
    showCutin("タイムセール開始！", "#ffdd33", "ラッシュタイム", "残り10秒。来店ラッシュで成約チャンスが増加します。");
  }

  function getCurrentChangeSeconds() {
    return performance.now() < state.buffChangeUntil ? CHANGE_SECONDS_BUFFED : CHANGE_SECONDS;
  }

  function applyFlatDamageToEnemy(enemy, damage, sourceStaff, label = "追加HIT!") {
    if (!enemy || enemy.exchanging || enemy.defeating || damage <= 0) return;
    enemy.gauge -= damage;
    addHitEffect(enemy, sourceStaff, damage, false, false, label);
    if (enemy.gauge <= 0) {
      enemy.gauge = 0;
      enemy.defeating = true;
      enemy.defeatLeft = 0.32;
      enemy.defeatMatch = false;
    }
  }

  function requestEnemyChange(enemyId) {
    if (!state || !state.running) return;
    const enemy = state.enemies.find(e => e.id === enemyId);
    if (!enemy || enemy.exchanging || enemy.defeating) return;

    const message = CHANGE_MESSAGES[Math.floor(Math.random() * CHANGE_MESSAGES.length)];
    enemy.exchanging = true;
    const changeSeconds = getCurrentChangeSeconds();
    enemy.exchangeLeft = changeSeconds;
    enemy.exchangeMax = changeSeconds;
    enemy.exchangeMessage = message;
    state.combo = 0;
    state.targetPreviewId = null;
    state.lastActionText = message;
    render();
  }

  function useSkill(staff) {
    const now = performance.now();
    showCutin(staff.skillName, staff.color, staff.name, staff.skillDesc || "", staff.skillCutin || "");
    if (staff.skillType === "powerBuff") {
      state.buffPowerUntil = now + 8000;
      state.lastActionText = "緋奈：全力おすすめ！ 接客力アップ！";
    } else if (staff.skillType === "extendTime") {
      state.enemies.forEach(e => {
        e.patience = Math.min(e.maxPatience + 3, e.patience + 3);
        e.maxPatience = Math.max(e.maxPatience, e.patience);
      });
      state.timeLeft = Math.min(BATTLE_SECONDS + 5, state.timeLeft + 2);
      state.lastActionText = "藍：やさしい案内！受付時間を延長。";
    } else if (staff.skillType === "pcSweep") {
      const targets = [...state.enemies.filter(e => e.attr === "PC")];
      targets.forEach(e => completeEnemy(e, true));
      state.buffMatchUntil = now + 6000;
      state.lastActionText = "翠：最適解プレゼン！PC対応＋相性倍率UP。";
    } else if (staff.skillType === "ctReduce") {
      state.staff.forEach(s => { s.ct = Math.min(s.ct, 0.35); });
      state.buffSpeedUntil = now + 6000;
      state.lastActionText = "こがね：即決トーク！CT短縮。";
    } else if (staff.skillType === "ayameRoute") {
      const extras = state.enemies
        .filter(e => !e.exchanging && !e.defeating)
        .sort((a, b) => a.gauge - b.gauge || a.patience - b.patience)
        .slice(0, 2);
      extras.forEach(e => applyFlatDamageToEnemy(e, 1, staff, "導線HIT!"));
      state.buffChangeUntil = now + 6000;
      state.lastActionText = "彩愛：優雅な家事導線！敵2体に1ダメージ、6秒間チェンジ1秒。";
    } else if (staff.skillType === "rushBuff") {
      state.buffRushUntil = now + 8000;
      state.comboShield = true;
      state.lastActionText = "琥珀：フロアダッシュ！ラッシュ対応力UP。";
    }
  }

  function autoOneMove(showMessage = true) {
    if (!state || !state.running) return false;

    // v037_08: オート優先順位 = 店長HELP → 必殺技 → 通常攻撃
    if (state.helpStock > 0) {
      useManagerHelp(true);
      return true;
    }

    let bestStaff = null;
    let bestEnemy = null;
    let useSpecial = false;
    let bestScore = -Infinity;

    for (const s of state.staff) {
      if (s.ct > 0) continue;

      const canSpecial = s.skill >= 100;
      const e = findBestTarget(s, canSpecial);
      if (!e) continue;

      const damage = getAttackDamage(s, e, canSpecial);
      const willDefeat = e.gauge <= damage;
      const score =
        (canSpecial ? 220 : 0) +
        (s.attr === e.attr ? 120 : 0) +
        (willDefeat ? 90 : 0) +
        (1 - e.patience / e.maxPatience) * 72 +
        damage * 24 +
        (e.rare ? 35 : 0);

      if (score > bestScore) {
        bestScore = score;
        bestStaff = s;
        bestEnemy = e;
        useSpecial = canSpecial;
      }
    }

    if (bestStaff && bestEnemy) {
      state.targetPreviewId = bestEnemy.id;
      state.autoResolving = true;
      resolveContact(bestStaff, bestEnemy, useSpecial);
      if (useSpecial) useSkill(bestStaff);
      state.autoResolving = false;

      // オートは便利な代わりにCTを重くする
      bestStaff.ct = bestStaff.ctMax * (useSpecial ? 1.15 : 1) * AUTO_CT_MULTIPLIER;
      bestStaff.skill = useSpecial ? 0 : Math.min(100, bestStaff.skill + 10);
      return true;
    }

    if (showMessage) {
      state.lastActionText = "オート：今は動けるメンバーがいません。";
      render();
    }
    return false;
  }

  function runAutoBattle(dt) {
    if (!state || !state.running || !state.autoMode) return;
    state.autoTimer -= dt;
    if (state.autoTimer > 0) return;

    const moved = autoOneMove(false);
    state.autoTimer = moved ? AUTO_ACTION_INTERVAL : 0.18;
  }

  function toggleAutoBattle() {
    if (!state || !state.running) return;
    state.autoMode = !state.autoMode;
    state.autoTimer = 0;
    state.lastActionText = state.autoMode ? "オート営業ON：店長HELP→必殺→通常の順で行動します。CT2倍・売上70%。" : "オート営業OFF";
    render();
  }

  function addHelpProgress(count) {
    if (!state) return;
    state.helpEarnCounter += count;
    while (state.helpEarnCounter >= HELP_STOCK_STEP && state.helpStock < HELP_STOCK_MAX) {
      state.helpEarnCounter -= HELP_STOCK_STEP;
      state.helpStock += 1;
      state.lastActionText = `店長ヘルプが1つ溜まりました！ 残り${state.helpStock}/${HELP_STOCK_MAX}`;
    }
    if (state.helpStock >= HELP_STOCK_MAX) {
      state.helpEarnCounter = Math.min(state.helpEarnCounter, HELP_STOCK_STEP - 1);
    }
  }

  function useManagerHelp(fromAuto = false) {
    if (!state || !state.running) return;
    if (state.helpStock <= 0) {
      state.lastActionText = "店長ヘルプのストックがありません。成約10件で1つ溜まります。";
      render();
      return;
    }

    state.helpStock -= 1;
    showCutin("店長HELP！", "#ffe06a", "店長出動", "全メンバーのCTをクリアし、画面上の敵を一掃成約してオールチェンジします。");
    state.staff.forEach(s => { s.ct = 0; });

    const targets = [...state.enemies.filter(e => !e.exchanging)];
    targets.forEach(e => completeEnemy(e, true, { help: true }));
    state.enemies = state.enemies.filter(e => e.exchanging);
    while (state.enemies.length < MAX_ENEMIES) spawnEnemy(true);

    state.targetPreviewId = null;
    state.lastActionText = `店長ヘルプ発動！ リキャストクリア＋${targets.length}体を一掃成約、オールチェンジ！`;
    if (!fromAuto) render();
  }

  function render() {
    if (!root || !state) return;
    const statusText = state.running ? (state.rush ? "ラッシュ中" : "営業中") : state.finished ? "終了" : "待機中";

    root.innerHTML = `
      <div class="battle-stage ${state.running ? "is-running" : ""} ${state.rush ? "is-rush" : ""}">
        <section class="battle-hud">
          <div class="battle-hud-title">店舗営業：デッキ接客バトル <span class="battle-version">${BATTLE_VERSION}</span></div>
          <div class="battle-hud-stats">
            <span>状態：<b>${statusText}</b></span>
            <span>残り：<b>${Math.ceil(state.timeLeft)}</b>秒</span>
            <span>成約：<b>${state.served}</b></span>
            <span>離脱：<b>${state.missed}</b></span>
            <span>コンボ：<b>${state.combo}</b></span>
            <span>売上Pt：<b>${state.score}</b></span>
          </div>
          ${renderHudActions()}
          <div class="battle-message">${escapeHtml(state.lastActionText)}</div>
        </section>

        ${renderCutinOverlay()}
        ${renderSurfaceOverlay()}

        <section class="battle-enemies">
          ${(state.enemies.length ? state.enemies.map(renderEnemy).join("") : renderEnemyDummies())}
        </section>

        ${renderHelpButtons("battle-help-large")}

        <section class="battle-members">
          ${state.staff.map(renderStaff).join("")}
        </section>

        ${state.running || state.countingDown ? "" : renderControlOverlay()}
      </div>
    `;
  }

  function renderHelpButtons(className) {
    const buttons = Array.from({ length: HELP_STOCK_MAX }, (_, i) => {
      const available = state.running && i < state.helpStock;
      return `<button class="battle-help-btn ${available ? "available" : "empty"}" data-action="help" ${available ? "" : "disabled"}>HELP!</button>`;
    }).join("");

    return `<div class="${className}" title="成約10件で1つ、最大3つまでストック">${buttons}</div>`;
  }

  function renderHudActions() {
    if (!state.running) return "";
    return `
      <div class="battle-hud-actions">
        <button class="battle-auto-toggle ${state.autoMode ? "on" : ""}" data-action="autoToggle">${state.autoMode ? "オートON" : "オートOFF"}</button>
      </div>
    `;
  }

  function renderSideHelpButtons() {
    return "";
  }

  function renderCutinOverlay() {
    if (!state.cutin) return "";
    const now = performance.now();
    if (now > state.cutinUntil) return "";
    const progress = Math.max(0, Math.min(1, (now - state.cutin.createdAt) / state.cutin.life));
    const opacity = progress < 0.8 ? 1 : Math.max(0, 1 - (progress - 0.8) / 0.2);
    return `
      <div class="battle-cutin ${state.cutin.image ? "with-image" : ""}" style="--cutin-color:${state.cutin.color}; opacity:${opacity};">
        <div class="battle-cutin-band">
          ${state.cutin.image ? `<div class="battle-cutin-image"><img src="${escapeHtml(state.cutin.image)}" alt=""></div>` : ""}
          <div class="battle-cutin-text">
            ${state.cutin.subText ? `<small>${escapeHtml(state.cutin.subText)}</small>` : ""}
            <b>${escapeHtml(state.cutin.title)}</b>
            ${state.cutin.descText ? `<p>${escapeHtml(state.cutin.descText)}</p>` : ""}
          </div>
        </div>
      </div>
    `;
  }

  function renderSurfaceOverlay() {
    if (!state || !state.surface) return "";
    const title = state.surface.title || "";
    const subText = state.surface.subText || "";
    const kind = state.surface.kind || "notice";
    return `
      <div class="battle-surface ${kind}">
        <div class="battle-surface-card">
          ${subText ? `<small>${escapeHtml(subText)}</small>` : ""}
          <b>${escapeHtml(title)}</b>
        </div>
      </div>
    `;
  }

  function renderControlOverlay() {
    if (state.deckEdit) return renderDeckEditorOverlay();

    const isResult = state.finished;
    return `
      <div class="battle-control-overlay">
        <div class="battle-control-box">
          ${isResult ? `
            <div class="battle-result-title">営業結果</div>
            <div class="battle-result-grid">
              <span>成約</span><b>${state.served}</b>
              <span>離脱</span><b>${state.missed}</b>
              <span>最大コンボ</span><b>${state.maxCombo}</b>
              <span>売上Pt</span><b>${state.score}</b>
            </div>
          ` : `
            <div class="battle-result-title">店舗営業プロトタイプ</div>
            <p class="battle-control-help">30秒で家電星人をどれだけ接客できるか。メンバーはシングルタップ通常、ダブルタップ必殺。オートは店長HELP→必殺→通常の順。CT2倍・売上70%。</p>
          `}
          <div class="battle-control-buttons battle-main-buttons">
            <button data-action="start">${isResult ? "もう一度営業" : "営業開始"}</button>
            <button data-action="auto">${isResult ? "オートプレイでもう一度" : "オートプレイ"}</button>
            <button data-action="deckEdit">デッキ編成</button>
            <button data-action="close">戻る</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderDeckEditorOverlay() {
    const selected = state.deckSelection || [];
    const canDecide = selected.length === 5;
    const row1 = ["aa", "ab", "ac", "ad", "ae"];
    const row2 = ["af", "ag", "ah", "ai", "aj"];
    const row3 = ["ak", "al", "am"];

    return `
      <div class="battle-control-overlay deck-edit-overlay">
        <div class="battle-deck-box">
          <div class="battle-result-title">デッキ編成</div>
          <p class="battle-control-help">出撃するメンバーを5人選択してください。選択中のキャラは白反転します。選択数：${selected.length}/5</p>
          <div class="deck-select-grid">
            <div class="deck-select-row deck-row-five">${row1.map(renderDeckSelectCard).join("")}</div>
            <div class="deck-select-row deck-row-five">${row2.map(renderDeckSelectCard).join("")}</div>
            <div class="deck-select-row deck-row-bottom">
              ${row3.map(renderDeckSelectCard).join("")}
              <div class="deck-decision-area">
                <button class="deck-decision-main" data-action="deckDecide" ${canDecide ? "" : "disabled"}>決定</button>
                <div class="deck-small-buttons">
                  <button data-action="deckReset">リセット</button>
                  <button data-action="deckCancel">キャンセル</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderDeckSelectCard(staffId) {
    const s = staffMaster.find(x => x.id === staffId);
    if (!s) return "";
    const selected = state.deckSelection && state.deckSelection.includes(staffId);
    const order = selected ? state.deckSelection.indexOf(staffId) + 1 : "";
    return `
      <button class="deck-select-card ${selected ? "selected" : ""}" style="--member-color:${s.color};" data-action="deckToggle" data-deck-id="${s.id}">
        <span class="deck-select-order">${order}</span>
        <b>${escapeHtml(s.name)}</b>
        <small>${escapeHtml(s.attr)}</small>
        <em>${escapeHtml(s.skillName)}</em>
      </button>
    `;
  }


  function renderEnemyDummies() {
    return Array.from({ length: 3 }, (_, i) => `
      <article class="battle-enemy-card battle-enemy-dummy" aria-hidden="true">
        <div class="enemy-head"><span class="enemy-icon">◇</span><span class="enemy-name">開店準備中</span></div>
        <div class="enemy-attr">家電星人 待機枠 ${i + 1}</div>
        <div class="enemy-label">HP</div>
        <div class="battle-bar"><i style="width:0%"></i></div>
        <div class="enemy-label">受付時間</div>
        <div class="battle-bar patience"><i style="width:0%"></i></div>
      </article>
    `).join("");
  }

  function renderEnemy(e) {
    const gaugeRate = Math.max(0, Math.min(100, (e.gauge / e.maxGauge) * 100));
    const patienceRate = Math.max(0, Math.min(100, (e.patience / e.maxPatience) * 100));
    const exchangeMax = e.exchangeMax || CHANGE_SECONDS;
    const exchangeRate = e.exchanging ? Math.max(0, Math.min(100, (1 - e.exchangeLeft / exchangeMax) * 100)) : 0;
    const target = e.id === state.targetPreviewId;
    const enemyColor = attrColors[e.attr] || "#ff841f";

    if (e.exchanging) {
      return `
        <article class="battle-enemy-card exchanging" data-enemy-id="${e.id}" style="--enemy-color:${enemyColor};">
          <div class="enemy-head"><span class="enemy-icon">↔</span><span class="enemy-name">ご案内中...</span></div>
          <div class="enemy-exchange-message">${escapeHtml(e.exchangeMessage)}</div>
          <div class="enemy-label">交換中 ${Math.max(0, e.exchangeLeft).toFixed(1)}秒</div>
          <div class="battle-bar exchange"><i style="width:${exchangeRate}%"></i></div>
          ${renderHitEffects(e.id)}
        </article>
      `;
    }

    return `
      <article class="battle-enemy-card ${e.rare ? "rare" : ""} ${target ? "target" : ""} ${e.defeating ? "defeating" : ""}" data-enemy-id="${e.id}" style="--enemy-color:${enemyColor};">
        <div class="enemy-head"><span class="enemy-icon">${e.icon}</span><span class="enemy-name">${escapeHtml(e.name)}</span>${e.rare ? "<b>RARE</b>" : ""}</div>
        <div class="enemy-attr">${escapeHtml(e.attr)} / ${escapeHtml(e.text)}</div>
        <div class="enemy-label">HP</div>
        <div class="battle-bar"><i style="width:${gaugeRate}%"></i></div>
        <div class="enemy-label">受付時間 ${Math.max(0, e.patience).toFixed(1)}秒　ダブルタップでチェンジ</div>
        <div class="battle-bar patience"><i style="width:${patienceRate}%"></i></div>
        ${e.defeating ? `<div class="enemy-contract-label">成約!</div>` : ""}
        ${renderHitEffects(e.id)}
      </article>
    `;
  }

  function renderHitEffects(enemyId) {
    if (!state || !state.hitEffects) return "";
    const now = performance.now();
    const effects = state.hitEffects.filter(effect => effect.enemyId === enemyId);
    if (!effects.length) return "";

    return `<div class="enemy-hit-layer">${effects.map(effect => {
      const progress = Math.max(0, Math.min(1, (now - effect.createdAt) / effect.life));
      const opacity = Math.max(0, 1 - progress);
      const y = -22 * progress;
      const scale = 1 + progress * 0.18;
      return `<div class="enemy-hit-pop" style="--hit-color:${effect.color}; opacity:${opacity}; transform:translate(-50%, calc(-50% + ${y}px)) scale(${scale});">
        <span>${escapeHtml(effect.text)}</span>${effect.subText ? `<small>${escapeHtml(effect.subText)}</small>` : ""}
      </div>`;
    }).join("")}</div>`;
  }

  function renderStaff(s) {
    const ctReady = s.ct <= 0;
    const ctRate = Math.max(0, Math.min(100, 100 - (s.ct / s.ctMax) * 100));
    const skillReady = s.skill >= 100;
    const hasCardImage = !!s.cardImage;
    return `
      <button class="battle-member-card ${ctReady ? "ready" : "cooldown"} ${skillReady ? "skill-ready" : ""} ${hasCardImage ? "has-card-art" : ""}" style="--member-color:${s.color};" data-staff-id="${s.id}">
        ${hasCardImage ? `<div class="member-card-art"><img src="${escapeHtml(s.cardImage)}" alt=""></div>` : ""}
        <div class="member-card-info">
          <div class="member-name">${escapeHtml(s.name)}</div>
          <div class="member-attr">${escapeHtml(s.attr)}</div>
          <div class="member-power">通常1 / 特攻2</div>
          <div class="member-label">CT</div>
          <div class="battle-bar member-ct"><i style="width:${ctRate}%"></i></div>
          <div class="member-label">必殺 ${Math.floor(s.skill)}%</div>
          <div class="battle-bar member-skill"><i style="width:${Math.min(100, s.skill)}%"></i></div>
          <div class="member-skill-name">${skillReady ? `必殺OK：${escapeHtml(s.skillName)}` : escapeHtml(s.skillName)}</div>
        </div>
      </button>
    `;
  }

  function pulseStaff(staffId) {
    state.targetPreviewId = null;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function handleEnemyPointerUp(enemyId, event) {
    if (!state || !state.running) return;

    const now = performance.now();
    const isDoubleTap =
      pendingEnemyTapId === enemyId &&
      now - pendingEnemyTapAt <= ENEMY_DOUBLE_TAP_MS;

    if (isDoubleTap) {
      clearPendingEnemyTap();
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      requestEnemyChange(enemyId);
      return;
    }

    pendingEnemyTapId = enemyId;
    pendingEnemyTapAt = now;
  }

  function openDeckEditor() {
    if (!state || state.running) return;
    state.deckEdit = true;
    state.deckSelection = [...activeStaffIds];
    render();
  }

  function toggleDeckStaff(staffId) {
    if (!state || !state.deckEdit) return;
    const selected = state.deckSelection || [];
    if (selected.includes(staffId)) {
      state.deckSelection = selected.filter(id => id !== staffId);
    } else if (selected.length < 5) {
      state.deckSelection = [...selected, staffId];
    } else {
      state.lastActionText = "デッキは5人までです。入れ替える場合は先に誰かを外してください。";
    }
    render();
  }

  function decideDeckSelection() {
    if (!state || !state.deckEdit) return;
    if (!state.deckSelection || state.deckSelection.length !== 5) {
      state.lastActionText = "メンバーを5人選ぶと決定できます。";
      render();
      return;
    }
    saveDeckIds(state.deckSelection);
    state.staff = getStaffBase().map(s => ({ ...s, ct: 0, skill: 0 }));
    state.deckEdit = false;
    state.lastActionText = `デッキを更新しました：${state.staff.map(s => s.name).join(" / ")}`;
    render();
  }

  function resetDeckSelection() {
    if (!state || !state.deckEdit) return;
    state.deckSelection = [...DEFAULT_STAFF_IDS];
    render();
  }

  function cancelDeckEditor() {
    if (!state || !state.deckEdit) return;
    state.deckEdit = false;
    state.deckSelection = [...activeStaffIds];
    render();
  }

  document.addEventListener("click", (event) => {
    if (!root || root.classList.contains("hidden")) return;
    const button = event.target.closest("button");
    if (!button || !root.contains(button)) return;

    const action = button.dataset.action;
    const staffId = button.dataset.staffId;

    if (action === "start") startBattle(false);
    else if (action === "close") closeBattle();
    else if (action === "auto") startBattle(true);
    else if (action === "deckEdit") openDeckEditor();
    else if (action === "deckToggle") toggleDeckStaff(button.dataset.deckId);
    else if (action === "deckDecide") decideDeckSelection();
    else if (action === "deckReset") resetDeckSelection();
    else if (action === "deckCancel") cancelDeckEditor();
    else if (action === "autoToggle") toggleAutoBattle();
    else if (action === "help") useManagerHelp();
  });

  document.addEventListener("pointerdown", (event) => {
    if (!root || root.classList.contains("hidden")) return;

    const staffButton = event.target.closest("button[data-staff-id]");
    if (!staffButton || !root.contains(staffButton)) return;
    handleStaffPointer(staffButton.dataset.staffId, event);
  }, { passive: false });

  document.addEventListener("pointerup", (event) => {
    if (!root || root.classList.contains("hidden")) return;

    const enemyCard = event.target.closest("[data-enemy-id]");
    if (enemyCard && root.contains(enemyCard)) {
      handleEnemyPointerUp(Number(enemyCard.dataset.enemyId), event);
      return;
    }
  }, { passive: false });

  window.BattleProto = { openBattle, closeBattle, startBattle, autoOneMove, toggleAutoBattle, useManagerHelp };
  window.startDeckBattlePrototype = openBattle;
})();
