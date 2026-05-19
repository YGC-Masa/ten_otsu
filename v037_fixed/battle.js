// battle.js - v037 deck battle prototype
// 店舗営業：30秒デッキ接客バトル試作

(function () {
  const staffBase = [
    {
      id: "aa",
      name: "緋奈",
      color: "#d3381c",
      attr: "映像",
      power: 34,
      speed: 2.4,
      skillName: "全力おすすめ！",
      skillDesc: "8秒間、全員の接客力+30%"
    },
    {
      id: "ab",
      name: "藍",
      color: "#0067C0",
      attr: "美容",
      power: 28,
      speed: 3.0,
      skillName: "やさしい案内",
      skillDesc: "全員の受付時間+3秒"
    },
    {
      id: "ac",
      name: "翠",
      color: "#02b308",
      attr: "PC",
      power: 42,
      speed: 3.5,
      skillName: "最適解プレゼン",
      skillDesc: "PC客を一括対応、6秒間相性倍率UP"
    },
    {
      id: "ad",
      name: "こがね",
      color: "#FFF450",
      attr: "スマホ",
      power: 25,
      speed: 1.7,
      skillName: "即決トーク",
      skillDesc: "6秒間、全員のCT短縮"
    },
    {
      id: "ae",
      name: "琥珀",
      color: "#F68B1F",
      attr: "オーディオ",
      power: 38,
      speed: 2.7,
      skillName: "フロアダッシュ",
      skillDesc: "ラッシュ中の接客力UP、コンボ保護"
    }
  ];

  const customerTypes = [
    { attr: "映像", icon: "📺", texts: ["大画面で見たい！", "映画向きは？"] },
    { attr: "美容", icon: "💨", texts: ["髪を早く乾かしたい", "ドライヤー相談！"] },
    { attr: "PC", icon: "💻", texts: ["PCが遅い！", "初期設定して！"] },
    { attr: "スマホ", icon: "📱", texts: ["スマホ周辺機器！", "充電器どれ？"] },
    { attr: "オーディオ", icon: "🎧", texts: ["いい音が欲しい！", "イヤホン相談！"] },
    { attr: "季節", icon: "❄️", texts: ["除湿したい！", "加湿器ある？"] },
    { attr: "生活", icon: "🧺", texts: ["掃除機ほしい", "洗濯機相談！"] }
  ];

  let root;
  let state;
  let timerId;
  let loopId;
  let selectedStaffId = null;
  let lastTimestamp = 0;

  function cloneStaff() {
    return staffBase.map((s) => ({ ...s, ct: 0, skill: 0 }));
  }

  function initialState() {
    return {
      running: false,
      timeLeft: 30,
      score: 0,
      served: 0,
      missed: 0,
      combo: 0,
      maxCombo: 0,
      nextCustomerId: 1,
      spawnTimer: 0,
      rush: false,
      buffPowerUntil: 0,
      buffMatchUntil: 0,
      buffSpeedUntil: 0,
      buffRushUntil: 0,
      comboShield: false,
      staff: cloneStaff(),
      customers: [],
      log: ["店舗営業プロトタイプを開始できます。"]
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

  function pushLog(message) {
    state.log.unshift(message);
    state.log = state.log.slice(0, 5);
  }

  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function createCustomer() {
    const type = randomChoice(customerTypes);
    const isRush = state.timeLeft <= 10;
    const isRare = Math.random() < (isRush ? 0.18 : 0.08);
    const gauge = Math.round((isRare ? 95 : 70) + Math.random() * 35 + (isRush ? 10 : 0));
    const patience = (isRare ? 8 : 6) + Math.random() * 3;
    return {
      id: state.nextCustomerId++,
      attr: type.attr,
      icon: type.icon,
      text: randomChoice(type.texts),
      gauge,
      maxGauge: gauge,
      patience,
      maxPatience: patience,
      rare: isRare
    };
  }

  function spawnCustomer(force = false) {
    if (!force && state.customers.length >= 3) return;
    if (state.customers.length >= 3) return;
    const customer = createCustomer();
    state.customers.push(customer);
  }

  function render() {
    if (!root) return;
    const selected = state.staff.find((s) => s.id === selectedStaffId);
    const statusText = state.running
      ? state.rush
        ? "ラッシュ中！"
        : "営業中"
      : "待機中";

    root.innerHTML = `
      <div class="battle-panel">
        <div class="battle-header">
          <div>
            <div class="battle-title">店舗営業：デッキ接客バトル試作</div>
            <div class="battle-subtitle">30秒で家電星人をどれだけ接客できるか</div>
          </div>
          <button class="battle-close" data-action="close">×</button>
        </div>

        <div class="battle-status ${state.rush ? "rush" : ""}">
          <span>状態：${statusText}</span>
          <span>残り：${Math.ceil(state.timeLeft)}秒</span>
          <span>成約：${state.served}</span>
          <span>離脱：${state.missed}</span>
          <span>コンボ：${state.combo}</span>
          <span>売上Pt：${state.score}</span>
        </div>

        <div class="battle-main">
          <div class="customer-area">
            ${state.customers.map(renderCustomer).join("") || `<div class="battle-empty">営業開始で家電星人が来店します</div>`}
          </div>

          <div class="staff-area">
            ${state.staff.map(renderStaff).join("")}
          </div>
        </div>

        <div class="battle-footer">
          <div class="battle-actions">
            <button data-action="start">${state.running ? "リスタート" : "営業開始"}</button>
            <button data-action="auto">おまかせ1手</button>
            <button data-action="finish">終了</button>
          </div>
          <div class="battle-help">
            ${selected ? `${selected.name}を選択中。家電星人をタップして接客。` : "店員カードをタップして選択してください。"}
          </div>
          <div class="battle-log">
            ${state.log.map((line) => `<div>${line}</div>`).join("")}
          </div>
        </div>
      </div>
    `;
  }

  function renderCustomer(c) {
    const gaugeRate = Math.max(0, Math.min(100, (c.gauge / c.maxGauge) * 100));
    const patienceRate = Math.max(0, Math.min(100, (c.patience / c.maxPatience) * 100));
    return `
      <button class="customer-card ${c.rare ? "rare" : ""}" data-customer-id="${c.id}">
        <div class="customer-top"><span class="customer-icon">${c.icon}</span><span>${c.attr}</span>${c.rare ? "<b>RARE</b>" : ""}</div>
        <div class="customer-text">${c.text}</div>
        <div class="mini-label">迷いゲージ</div>
        <div class="bar"><div style="width:${gaugeRate}%"></div></div>
        <div class="mini-label">受付時間</div>
        <div class="bar patience"><div style="width:${patienceRate}%"></div></div>
      </button>
    `;
  }

  function renderStaff(s) {
    const selected = s.id === selectedStaffId;
    const ctRate = Math.max(0, Math.min(100, (s.ct / s.speed) * 100));
    const skillReady = s.skill >= 100;
    const attrStyle = `--staff-color:${s.color};`;
    return `
      <div class="staff-card ${selected ? "selected" : ""} ${s.ct > 0 ? "cooldown" : ""}" style="${attrStyle}">
        <button class="staff-select" data-staff-id="${s.id}">
          <div class="staff-name">${s.name}</div>
          <div class="staff-attr">得意：${s.attr}</div>
          <div class="staff-stat">接客力 ${s.power} / CT ${s.speed.toFixed(1)}秒</div>
          <div class="mini-label">CT</div>
          <div class="bar ct"><div style="width:${ctRate}%"></div></div>
          <div class="mini-label">必殺 ${Math.floor(s.skill)}%</div>
          <div class="bar skill"><div style="width:${Math.min(100, s.skill)}%"></div></div>
        </button>
        <button class="skill-btn" data-skill-id="${s.id}" ${skillReady ? "" : "disabled"}>${s.skillName}</button>
        <div class="skill-desc">${s.skillDesc}</div>
      </div>
    `;
  }

  function startBattle() {
    stopLoops();
    state = initialState();
    state.running = true;
    selectedStaffId = null;
    spawnCustomer(true);
    spawnCustomer(true);
    pushLog("営業開始！30秒でできるだけ多く接客しよう。残り10秒からラッシュ。")
    lastTimestamp = performance.now();
    timerId = window.setInterval(tick, 100);
    render();
  }

  function stopLoops() {
    if (timerId) clearInterval(timerId);
    if (loopId) cancelAnimationFrame(loopId);
    timerId = null;
    loopId = null;
  }

  function tick() {
    if (!state.running) return;
    const now = performance.now();
    const dt = Math.min(0.2, (now - lastTimestamp) / 1000 || 0.1);
    lastTimestamp = now;
    state.timeLeft = Math.max(0, state.timeLeft - dt);
    state.rush = state.timeLeft <= 10;

    const elapsed = 30 - state.timeLeft;
    state.spawnTimer -= dt;
    const interval = state.rush ? 0.95 : elapsed > 10 ? 1.45 : 2.1;
    if (state.spawnTimer <= 0) {
      spawnCustomer();
      state.spawnTimer = interval;
    }

    state.staff.forEach((s) => {
      const speedBuff = now < state.buffSpeedUntil ? 2.0 : 1.0;
      s.ct = Math.max(0, s.ct - dt * speedBuff);
    });

    for (let i = state.customers.length - 1; i >= 0; i--) {
      const c = state.customers[i];
      c.patience -= dt;
      if (c.patience <= 0) {
        state.customers.splice(i, 1);
        state.missed++;
        if (state.comboShield) {
          state.comboShield = false;
          pushLog("琥珀のフォローでコンボを守った！");
        } else {
          state.combo = 0;
        }
        pushLog(`${c.attr}の家電星人が離脱…`);
      }
    }

    if (state.timeLeft <= 0) {
      finishBattle();
      return;
    }
    render();
  }

  function finishBattle() {
    state.running = false;
    stopLoops();
    selectedStaffId = null;
    pushLog(`営業終了！成約${state.served}件 / 売上Pt ${state.score} / 最大コンボ ${state.maxCombo}`);
    render();
  }

  function selectStaff(id) {
    const s = state.staff.find((x) => x.id === id);
    if (!s) return;
    selectedStaffId = id;
    pushLog(`${s.name}を選択。`);
    render();
  }

  function serveCustomer(customerId) {
    if (!state.running) return;
    const s = state.staff.find((x) => x.id === selectedStaffId);
    const c = state.customers.find((x) => x.id === customerId);
    if (!s || !c) return;
    if (s.ct > 0) {
      pushLog(`${s.name}は準備中です。`);
      render();
      return;
    }

    const now = performance.now();
    const isMatch = s.attr === c.attr;
    const globalPower = now < state.buffPowerUntil ? 1.3 : 1.0;
    const rushPower = state.rush && now < state.buffRushUntil ? 1.35 : 1.0;
    const matchRate = isMatch ? (now < state.buffMatchUntil ? 2.1 : 1.65) : 0.65;
    const damage = Math.round(s.power * globalPower * rushPower * matchRate);
    c.gauge -= damage;
    s.ct = s.speed;
    s.skill = Math.min(100, s.skill + (isMatch ? 22 : 12));

    pushLog(`${s.name}が${c.attr}対応：${damage}提案Pt ${isMatch ? "相性◎" : "相性△"}`);

    if (c.gauge <= 0) {
      completeCustomer(c, isMatch);
    }
    render();
  }

  function completeCustomer(c, isMatch) {
    const idx = state.customers.findIndex((x) => x.id === c.id);
    if (idx >= 0) state.customers.splice(idx, 1);
    state.served++;
    state.combo++;
    state.maxCombo = Math.max(state.maxCombo, state.combo);
    const comboBonus = Math.min(3, 1 + state.combo * 0.05);
    const rareBonus = c.rare ? 2 : 1;
    const matchBonus = isMatch ? 1.25 : 1;
    const point = Math.round(100 * comboBonus * rareBonus * matchBonus);
    state.score += point;
    pushLog(`レジ誘導成功！ +${point}Pt`);
    if (state.customers.length < 2) spawnCustomer();
  }

  function useSkill(id) {
    if (!state.running) return;
    const s = state.staff.find((x) => x.id === id);
    if (!s || s.skill < 100) return;
    s.skill = 0;
    const now = performance.now();

    if (s.id === "aa") {
      state.buffPowerUntil = now + 8000;
      pushLog("緋奈の全力おすすめ！8秒間、接客力アップ！");
    } else if (s.id === "ab") {
      state.customers.forEach((c) => {
        c.patience = Math.min(c.maxPatience + 3, c.patience + 3);
        c.maxPatience = Math.max(c.maxPatience, c.patience);
      });
      pushLog("藍のやさしい案内！受付時間を延長。 ");
    } else if (s.id === "ac") {
      const pcCustomers = state.customers.filter((c) => c.attr === "PC");
      pcCustomers.forEach((c) => completeCustomer(c, true));
      state.buffMatchUntil = now + 6000;
      pushLog("翠の最適解プレゼン！PC対応＋相性倍率アップ。 ");
    } else if (s.id === "ad") {
      state.staff.forEach((x) => { x.ct = Math.min(x.ct, 0.4); });
      state.buffSpeedUntil = now + 6000;
      pushLog("こがねの即決トーク！CT短縮。 ");
    } else if (s.id === "ae") {
      state.buffRushUntil = now + 8000;
      state.comboShield = true;
      pushLog("琥珀のフロアダッシュ！ラッシュ対応力アップ。 ");
    }
    render();
  }

  function autoOneMove() {
    if (!state.running) return;
    const available = state.staff.filter((s) => s.ct <= 0);
    if (!available.length || !state.customers.length) {
      pushLog("おまかせ：今は動ける店員か客がいません。")
      render();
      return;
    }
    let best = null;
    for (const s of available) {
      for (const c of state.customers) {
        const matchScore = s.attr === c.attr ? 100 : 0;
        const urgentScore = (1 - c.patience / c.maxPatience) * 40;
        const score = matchScore + urgentScore + s.power;
        if (!best || score > best.score) best = { s, c, score };
      }
    }
    selectedStaffId = best.s.id;
    serveCustomer(best.c.id);
  }

  function closeBattle() {
    stopLoops();
    if (root) root.classList.add("hidden");
  }

  function openBattle() {
    ensureRoot();
    if (!state) state = initialState();
    root.classList.remove("hidden");
    render();
  }

  document.addEventListener("click", (event) => {
    if (!root || root.classList.contains("hidden")) return;
    const target = event.target.closest("button");
    if (!target || !root.contains(target)) return;
    const action = target.dataset.action;
    const staffId = target.dataset.staffId;
    const skillId = target.dataset.skillId;
    const customerId = target.dataset.customerId;

    if (action === "close") closeBattle();
    else if (action === "start") startBattle();
    else if (action === "finish") finishBattle();
    else if (action === "auto") autoOneMove();
    else if (staffId) selectStaff(staffId);
    else if (skillId) useSkill(skillId);
    else if (customerId) serveCustomer(Number(customerId));
  });

  window.startDeckBattlePrototype = function () {
    openBattle();
  };
})();
