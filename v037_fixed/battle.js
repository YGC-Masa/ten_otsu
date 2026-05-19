// battle.js - v037 integrated deck battle prototype
// 店舗営業：上=情報 / 中央=家電星人 / 下=メンバー5人
// 操作はメンバーのシングルタップで通常接客、ダブルタップで必殺接客。通常敵HP2、レアHP3。ターゲットは選択メンバーに最適な家電星人へ自動Fix。

(function () {
  const BATTLE_SECONDS = 30;
  const MAX_ENEMIES = 3;
  const MAX_CHANGES = 3;
  const CHANGE_SECONDS = 1.0;
  const CHANGE_MESSAGES = [
    "今回は別スタッフへ案内",
    "少々お待ちください",
    "別のお客様を先に対応"
  ];

  const staffBase = [
    { id: "aa", name: "緋奈", color: "#d3381c", attr: "映像", power: 1, ctMax: 2.4, skillName: "全力おすすめ！", skillType: "powerBuff" },
    { id: "ab", name: "藍", color: "#0067C0", attr: "美容", power: 1, ctMax: 3.0, skillName: "やさしい案内", skillType: "extendTime" },
    { id: "ac", name: "翠", color: "#02b308", attr: "PC", power: 1, ctMax: 3.5, skillName: "最適解プレゼン", skillType: "pcSweep" },
    { id: "ad", name: "こがね", color: "#FFF450", attr: "スマホ", power: 1, ctMax: 1.7, skillName: "即決トーク", skillType: "ctReduce" },
    { id: "ae", name: "琥珀", color: "#F68B1F", attr: "オーディオ", power: 1, ctMax: 2.7, skillName: "フロアダッシュ", skillType: "rushBuff" }
  ];


  const attrColors = {
    "映像": "#e53935",
    "美容": "#1e88e5",
    "PC": "#43a047",
    "スマホ": "#fdd835",
    "オーディオ": "#fb8c00",
    "季節": "#64b5f6",
    "生活": "#ab47bc"
  };

  const enemyTypes = [
    { attr: "映像", icon: "📺", name: "テレビ星人", text: "大画面で見たい！", baseGauge: 78, basePatience: 6.8, score: 120 },
    { attr: "美容", icon: "💨", name: "美容家電星人", text: "髪を早く乾かしたい", baseGauge: 72, basePatience: 7.3, score: 125 },
    { attr: "PC", icon: "💻", name: "PC星人", text: "初期設定して！", baseGauge: 92, basePatience: 7.8, score: 150 },
    { attr: "スマホ", icon: "📱", name: "スマホ星人", text: "充電器どれ？", baseGauge: 62, basePatience: 5.2, score: 105 },
    { attr: "オーディオ", icon: "🎧", name: "オーディオ星人", text: "いい音が欲しい！", baseGauge: 86, basePatience: 6.7, score: 140 },
    { attr: "季節", icon: "❄️", name: "季節家電星人", text: "加湿器ある？", baseGauge: 76, basePatience: 6.2, score: 115 },
    { attr: "生活", icon: "🧺", name: "生活家電星人", text: "掃除機ほしい", baseGauge: 82, basePatience: 6.4, score: 130 }
  ];

  let root = null;
  let state = null;
  let timerId = null;
  let lastTick = 0;
  const DOUBLE_TAP_MS = 300;
  let staffTapTimer = null;
  let pendingStaffTapId = null;
  let pendingStaffTapAt = 0;

  function makeState() {
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
      changesLeft: MAX_CHANGES,
      changePointer: null,
      lastActionText: "営業開始を押してください。",
      buffPowerUntil: 0,
      buffMatchUntil: 0,
      buffSpeedUntil: 0,
      buffRushUntil: 0,
      comboShield: false,
      staff: staffBase.map(s => ({ ...s, ct: 0, skill: 0 })),
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
    stopLoop();
    if (root) root.classList.add("hidden");
  }

  function clearPendingStaffTap() {
    if (staffTapTimer) window.clearTimeout(staffTapTimer);
    staffTapTimer = null;
    pendingStaffTapId = null;
    pendingStaffTapAt = 0;
  }

  function stopLoop() {
    if (timerId) window.clearInterval(timerId);
    timerId = null;
  }

  function startBattle() {
    clearPendingStaffTap();
    stopLoop();
    state = makeState();
    state.running = true;
    state.finished = false;
    state.lastActionText = "営業開始！ メンバータップで接客、敵フリックでチェンジできます。";
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
    render();
  }

  function tick() {
    if (!state || !state.running) return;
    const now = performance.now();
    const dt = Math.min(0.24, Math.max(0.05, (now - lastTick) / 1000));
    lastTick = now;

    state.timeLeft = Math.max(0, state.timeLeft - dt);
    state.rush = state.timeLeft <= 10;

    state.spawnTimer -= dt;
    const elapsed = BATTLE_SECONDS - state.timeLeft;
    const spawnInterval = state.rush ? 0.85 : elapsed > 10 ? 1.25 : 1.8;
    if (state.spawnTimer <= 0) {
      spawnEnemy();
      state.spawnTimer = spawnInterval;
    }

    updateStaff(dt, now);
    updateEnemies(dt);
    maintainEnemies();

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
      exchangeMessage: ""
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
    s.skill = 0;
    s.ct = s.ctMax * 0.65;
    render();
  }

  function findBestTarget(staff, isSpecial = false) {
    let best = null;
    let bestScore = -Infinity;

    for (const e of state.enemies) {
      if (e.exchanging) continue;
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
    state.lastActionText = `${staff.name} → ${enemy.name}：${damage}ダメージ ${isSpecial ? "必殺" : "通常"} ${isMatch ? "特攻◎" : "等倍"}`;

    if (enemy.gauge <= 0) completeEnemy(enemy, isMatch);
  }

  function completeEnemy(enemy, isMatch) {
    const idx = state.enemies.findIndex(x => x.id === enemy.id);
    if (idx >= 0) state.enemies.splice(idx, 1);

    state.served += 1;
    state.combo += 1;
    state.maxCombo = Math.max(state.maxCombo, state.combo);

    const comboBonus = Math.min(3.0, 1 + state.combo * 0.05);
    const rareBonus = enemy.rare ? 2.0 : 1.0;
    const matchBonus = isMatch ? 1.25 : 1.0;
    const point = Math.round(enemy.score * comboBonus * rareBonus * matchBonus);
    state.score += point;
    state.lastActionText = `レジ誘導成功！ +${point}Pt`;
  }

  function requestEnemyChange(enemyId) {
    if (!state || !state.running) return;
    const enemy = state.enemies.find(e => e.id === enemyId);
    if (!enemy || enemy.exchanging) return;

    if (state.changesLeft <= 0) {
      state.lastActionText = "チェンジ回数が残っていません。";
      render();
      return;
    }

    if (enemy.rare) {
      state.lastActionText = "RARE家電星人はチェンジできません。";
      render();
      return;
    }

    const message = CHANGE_MESSAGES[Math.floor(Math.random() * CHANGE_MESSAGES.length)];
    enemy.exchanging = true;
    enemy.exchangeLeft = CHANGE_SECONDS;
    enemy.exchangeMessage = message;
    state.changesLeft -= 1;
    state.combo = 0;
    state.targetPreviewId = null;
    state.lastActionText = message;
    render();
  }

  function useSkill(staff) {
    const now = performance.now();
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
    } else if (staff.skillType === "rushBuff") {
      state.buffRushUntil = now + 8000;
      state.comboShield = true;
      state.lastActionText = "琥珀：フロアダッシュ！ラッシュ対応力UP。";
    }
  }

  function autoOneMove() {
    if (!state || !state.running) return;
    let bestStaff = null;
    let bestEnemy = null;
    let bestScore = -Infinity;

    for (const s of state.staff) {
      if (s.ct > 0) continue;
      const e = findBestTarget(s);
      if (!e) continue;
      const score = (s.attr === e.attr ? 120 : 0) + (1 - e.patience / e.maxPatience) * 72 + getAttackDamage(s, e, false) * 20;
      if (score > bestScore) {
        bestScore = score;
        bestStaff = s;
        bestEnemy = e;
      }
    }

    if (bestStaff && bestEnemy) {
      state.targetPreviewId = bestEnemy.id;
      resolveContact(bestStaff, bestEnemy);
      bestStaff.ct = bestStaff.ctMax;
      bestStaff.skill = Math.min(100, bestStaff.skill + 18);
    } else {
      state.lastActionText = "おまかせ：今は動けるメンバーがいません。";
    }
    render();
  }

  function render() {
    if (!root || !state) return;
    const statusText = state.running ? (state.rush ? "ラッシュ中" : "営業中") : state.finished ? "終了" : "待機中";

    root.innerHTML = `
      <div class="battle-stage ${state.running ? "is-running" : ""} ${state.rush ? "is-rush" : ""}">
        <section class="battle-hud">
          <div class="battle-hud-title">店舗営業：デッキ接客バトル</div>
          <div class="battle-hud-stats">
            <span>状態：<b>${statusText}</b></span>
            <span>残り：<b>${Math.ceil(state.timeLeft)}</b>秒</span>
            <span>成約：<b>${state.served}</b></span>
            <span>離脱：<b>${state.missed}</b></span>
            <span>コンボ：<b>${state.combo}</b></span>
            <span>売上Pt：<b>${state.score}</b></span>
            <span>チェンジ：<b>${state.changesLeft}</b>/${MAX_CHANGES}</span>
          </div>
          <div class="battle-message">${escapeHtml(state.lastActionText)}</div>
        </section>

        <section class="battle-enemies">
          ${state.enemies.map(renderEnemy).join("") || `<div class="battle-empty">営業開始で家電星人が来店します</div>`}
        </section>

        <section class="battle-members">
          ${state.staff.map(renderStaff).join("")}
        </section>

        ${state.running ? "" : renderControlOverlay()}
      </div>
    `;
  }

  function renderControlOverlay() {
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
            <p class="battle-control-help">30秒で家電星人をどれだけ接客できるか。敵HPは通常2・レア3。メンバーはシングルタップ通常、ダブルタップ必殺。不要な敵は左右フリックで1秒かけてチェンジできます。</p>
          `}
          <div class="battle-control-buttons">
            <button data-action="start">${isResult ? "もう一度営業" : "営業開始"}</button>
            <button data-action="auto" ${state.enemies.length ? "" : "disabled"}>おまかせ1手</button>
            <button data-action="close">戻る</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderEnemy(e) {
    const gaugeRate = Math.max(0, Math.min(100, (e.gauge / e.maxGauge) * 100));
    const patienceRate = Math.max(0, Math.min(100, (e.patience / e.maxPatience) * 100));
    const exchangeRate = e.exchanging ? Math.max(0, Math.min(100, (1 - e.exchangeLeft / CHANGE_SECONDS) * 100)) : 0;
    const target = e.id === state.targetPreviewId;
    const enemyColor = attrColors[e.attr] || "#ff841f";

    if (e.exchanging) {
      return `
        <article class="battle-enemy-card exchanging" data-enemy-id="${e.id}" style="--enemy-color:${enemyColor};">
          <div class="enemy-head"><span class="enemy-icon">↔</span><span class="enemy-name">ご案内中...</span></div>
          <div class="enemy-exchange-message">${escapeHtml(e.exchangeMessage)}</div>
          <div class="enemy-label">交換中 ${Math.max(0, e.exchangeLeft).toFixed(1)}秒</div>
          <div class="battle-bar exchange"><i style="width:${exchangeRate}%"></i></div>
        </article>
      `;
    }

    return `
      <article class="battle-enemy-card ${e.rare ? "rare" : ""} ${target ? "target" : ""}" data-enemy-id="${e.id}" style="--enemy-color:${enemyColor};">
        <div class="enemy-head"><span class="enemy-icon">${e.icon}</span><span class="enemy-name">${escapeHtml(e.name)}</span>${e.rare ? "<b>RARE</b>" : ""}</div>
        <div class="enemy-attr">${escapeHtml(e.attr)} / ${escapeHtml(e.text)}</div>
        <div class="enemy-label">HP</div>
        <div class="battle-bar"><i style="width:${gaugeRate}%"></i></div>
        <div class="enemy-label">受付時間 ${Math.max(0, e.patience).toFixed(1)}秒　↔フリックでチェンジ</div>
        <div class="battle-bar patience"><i style="width:${patienceRate}%"></i></div>
      </article>
    `;
  }

  function renderStaff(s) {
    const ctReady = s.ct <= 0;
    const ctRate = Math.max(0, Math.min(100, 100 - (s.ct / s.ctMax) * 100));
    const skillReady = s.skill >= 100;
    return `
      <button class="battle-member-card ${ctReady ? "ready" : "cooldown"} ${skillReady ? "skill-ready" : ""}" style="--member-color:${s.color};" data-staff-id="${s.id}">
        <div class="member-name">${escapeHtml(s.name)}</div>
        <div class="member-attr">${escapeHtml(s.attr)}</div>
        <div class="member-power">通常1 / 特攻2</div>
        <div class="member-label">CT</div>
        <div class="battle-bar member-ct"><i style="width:${ctRate}%"></i></div>
        <div class="member-label">必殺 ${Math.floor(s.skill)}%</div>
        <div class="battle-bar member-skill"><i style="width:${Math.min(100, s.skill)}%"></i></div>
        <div class="member-skill-name">${skillReady ? "ダブルタップ：必殺2/特攻3" : escapeHtml(s.skillName)}</div>
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

  function handleEnemyPointerDown(enemyId, event) {
    if (!state || !state.running) return;
    state.changePointer = {
      enemyId,
      x: event.clientX,
      y: event.clientY,
      time: performance.now()
    };
  }

  function handleEnemyPointerUp(enemyId, event) {
    if (!state || !state.running || !state.changePointer) return;
    if (state.changePointer.enemyId !== enemyId) return;

    const dx = event.clientX - state.changePointer.x;
    const dy = event.clientY - state.changePointer.y;
    state.changePointer = null;

    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      event.preventDefault();
      event.stopPropagation();
      requestEnemyChange(enemyId);
    }
  }

  document.addEventListener("click", (event) => {
    if (!root || root.classList.contains("hidden")) return;
    const button = event.target.closest("button");
    if (!button || !root.contains(button)) return;

    const action = button.dataset.action;
    const staffId = button.dataset.staffId;

    if (action === "start") startBattle();
    else if (action === "close") closeBattle();
    else if (action === "auto") autoOneMove();
  });

  document.addEventListener("pointerdown", (event) => {
    if (!root || root.classList.contains("hidden")) return;
    const enemyCard = event.target.closest("[data-enemy-id]");
    if (!enemyCard || !root.contains(enemyCard)) return;
    handleEnemyPointerDown(Number(enemyCard.dataset.enemyId), event);
  });

  document.addEventListener("pointerup", (event) => {
    if (!root || root.classList.contains("hidden")) return;

    const enemyCard = event.target.closest("[data-enemy-id]");
    if (enemyCard && root.contains(enemyCard)) {
      handleEnemyPointerUp(Number(enemyCard.dataset.enemyId), event);
      return;
    }

    const staffButton = event.target.closest("button[data-staff-id]");
    if (!staffButton || !root.contains(staffButton)) return;
    handleStaffPointer(staffButton.dataset.staffId, event);
  });

  window.BattleProto = { openBattle, closeBattle, startBattle, autoOneMove };
  window.startDeckBattlePrototype = openBattle;
})();
