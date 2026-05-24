/* v038_15 Surface Manager Takeover - verified boot candidate
   Single authority for non-ADV surfaces. Designed to survive broken/old boot flow.
*/
(function(){
  "use strict";

  const VERSION = "v038_15";
  const BG_OFFICE = "images/assets/bgev/bg_office_hidamari.png";
  const BG_SHOP = "images/assets/bgev/bg_exchange_item_counter.png";
  const SAKUYA_INTRO_SCENARIO = "shop_exchange_intro_sakuya.json";
  const SAKUYA_INTRO_KEY = "tenotsu_sakuya_exchange_intro_seen_v1";

  const OFFICE_CHARS = [
    ["星野 緋奈","a10501.webp","店長、今日も一緒にがんばりましょう！"],
    ["速水川 藍","b10501.webp","てんちょー、事務所でお待ちしていました。"],
    ["草壁 翠","c10201.webp","キミ、今日の予定は確認済みかな？"],
    ["小麦沢 こがね","d10501.webp","店長、今日もアゲてこー！"],
    ["春日原 琥珀","e10501.webp","旦那、困ったことがあったらオレに任せな！"],
    ["大道寺 真花","f10501.webp","店長、本日もよろしくお願いします。"],
    ["氷神 雪乃","g10501.webp","貴方様、無理はなさらないでくださいね。"],
    ["双沢 美空","h10501.webp","店長、今日も笑顔でいきましょう。"],
    ["双沢 夜空","i10501.webp","あんた、今日もちゃんと見てるから。"],
    ["芝桜 桃","j10501.webp","店長、ウチ参上！"],
    ["紫藤 彩愛","k10501.webp","貴方、こちらで確認くださいませ。"],
    ["餅月 里美","l10501.webp","てんちょ～、お茶でも飲んでいきます～？"],
    ["草壁 萌","m10501.webp","おにいちゃん、ここにいるよ。"]
  ];

  const SHOP_GREETINGS = [
    ["朔夜","いらっしゃいませ。価値あるものとの交換をご希望ですか？"],
    ["朔夜","ようこそ、交換カウンターへ。必要な品をお選びください。"],
    ["朔夜","ふふ……本日は、どの品と縁を結びましょうか。"],
    ["朔夜","交換品は一期一会。どうぞ、ゆっくりご覧ください。"],
    ["朔夜","店長様、お待ちしておりました。本日の交換品はこちらです。"]
  ];

  const MENU_ITEMS = ["店舗","メンバー","店舗営業","外回り","ショップ","設定"];

  const Z = Object.freeze({
    bg: 0,
    title: 20,
    storyChar: 120,
    cg: 180,
    click: 240,
    frontChar: 720,
    operation: 760,
    menu: 820,
    dialogue: 900,
    choice: 920,
    battle: 30000,
    fade: 50000,
    system: 70000,
    boot: 200000
  });

  window.TENOTSU_SURFACE_VERSION = VERSION;
  window.TENOTSU_LAYER_Z = Z;

  let currentMode = "";
  let busy = false;
  let installed = false;
  let lastActionAt = 0;

  function qs(sel){ return document.querySelector(sel); }
  function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }
  function setI(el, prop, val){ if (el) el.style.setProperty(prop, String(val), "important"); }
  function shuffle(a){
    const arr = a.slice();
    for(let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function now(){
    return (performance && performance.now) ? performance.now() : Date.now();
  }

  function throttle(){
    const n = now();
    if (n - lastActionAt < 120) return true;
    lastActionAt = n;
    return false;
  }

  function setMode(mode){
    currentMode = mode;
    window.tenotsuGameMode = mode;
    document.body.dataset.gameMode = mode;
    ["title","office","story","shop","battle","town","settings"].forEach(m => {
      document.body.classList.toggle("mode-" + m, mode === m);
    });
    document.body.classList.toggle("story-playing", mode === "story");
    updateInputSurfaces();
  }

  function setBackground(src){
    const bg = qs("#background");
    if (bg) {
      if (bg.getAttribute("src") !== src) bg.src = src;
      setI(bg, "display", "block");
      setI(bg, "visibility", "visible");
      setI(bg, "opacity", "1");
      setI(bg, "z-index", Z.bg);
    }
    const game = qs("#game-container");
    if (game) {
      setI(game, "background", "#000");
      setI(game, "background-image", "none");
    }
    document.body.style.removeProperty("background-image");
  }

  function ensureFrontLayer(){
    let layer = qs("#tenotsu-front-character-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.id = "tenotsu-front-character-layer";
      document.body.appendChild(layer);
    }
    return layer;
  }

  function ensureOperationSurface(){
    let surface = qs("#tenotsu-operation-surface");
    if (!surface) {
      surface = document.createElement("div");
      surface.id = "tenotsu-operation-surface";
      document.body.appendChild(surface);
    }
    return surface;
  }

  function ensureMainMenu(){
    let menu = qs("#tenotsu-main-menu");
    if (!menu) {
      menu = document.createElement("div");
      menu.id = "tenotsu-main-menu";
      document.body.appendChild(menu);
    }
    return menu;
  }

  function ensureFade(){
    let f = qs("#tenotsu-safe-fade");
    if (!f) {
      f = document.createElement("div");
      f.id = "tenotsu-safe-fade";
      document.body.appendChild(f);
    }
    return f;
  }

  function hideBootOverlay(){
    const boot = qs("#boot-flow");
    if (boot) {
      boot.classList.add("hidden", "is-out");
      boot.setAttribute("aria-hidden", "true");
      boot.style.setProperty("display", "none", "important");
      boot.style.setProperty("pointer-events", "none", "important");
    }
  }

  function satisfyLegacyGuard(){
    let list = qs("#list-panel");
    if (!list) {
      list = document.createElement("div");
      list.id = "list-panel";
      document.body.appendChild(list);
    }
    list.classList.remove("hidden");
    if (!list.innerHTML.trim()) list.innerHTML = "<span data-tenotsu-rescue='1'>surface takeover active</span>";
    list.style.setProperty("display", "none", "important");
    list.style.setProperty("pointer-events", "none", "important");

    qsa("#menu-panel,.menu-panel,.left-menu,#left-menu,#leftPanel,.exchange-menu,.exchange-panel,.shop-submenu,.sub-menu,#tenotsu-office-force-layer,#tenotsu-office-force-comment,#tenotsu-surface-office-layer,#tenotsu-surface-comment,#office-character-layer").forEach(el => {
      el.classList.add("hidden");
      el.style.setProperty("display", "none", "important");
      el.style.setProperty("pointer-events", "none", "important");
    });
  }

  function hideFrontLayer(){
    const layer = qs("#tenotsu-front-character-layer");
    if (layer) layer.style.display = "none";
  }

  function clearOperationSurface(){
    const s = qs("#tenotsu-operation-surface");
    if (s) {
      s.innerHTML = "";
      s.style.display = "none";
      s.style.pointerEvents = "none";
    }
  }

  function hideMainMenu(){
    const menu = qs("#tenotsu-main-menu");
    if (menu) menu.style.display = "none";
  }

  function showMainMenu(){
    const menu = ensureMainMenu();
    if (menu.dataset.built !== "1") {
      menu.innerHTML = "";
      const title = document.createElement("div");
      title.className = "tenotsu-main-menu-title";
      title.textContent = "メインメニュー";
      menu.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "tenotsu-main-menu-grid";
      MENU_ITEMS.forEach(label => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "tenotsu-main-menu-button";
        btn.dataset.surfaceAction = "main-menu";
        btn.dataset.menuLabel = label;
        btn.textContent = label;
        grid.appendChild(btn);
      });
      menu.appendChild(grid);
      menu.dataset.built = "1";
    }
    menu.style.display = "block";
    menu.style.pointerEvents = "auto";
  }

  function renderDialogueComment(name, text){
    const box = qs("#dialogue-box");
    const nameEl = qs("#name");
    const textEl = qs("#text");
    if (!box || !nameEl || !textEl) return;

    box.classList.remove("hidden");
    box.style.setProperty("display", "block", "important");
    box.style.setProperty("position", "fixed", "important");
    box.style.setProperty("left", "5%", "important");
    box.style.setProperty("right", "12%", "important");
    box.style.setProperty("top", "auto", "important");
    box.style.setProperty("bottom", "max(18px, env(safe-area-inset-bottom))", "important");
    box.style.setProperty("width", "auto", "important");
    box.style.setProperty("z-index", String(Z.dialogue), "important");
    box.style.setProperty("pointer-events", "none", "important");
    nameEl.textContent = name || "";
    textEl.innerHTML = text || "";
  }

  function hideDialogueIfNonStory(){
    if (currentMode === "story") return;
    const box = qs("#dialogue-box");
    if (box) box.classList.add("hidden");
  }

  function renderOfficeCharacters(forceNew){
    const layer = ensureFrontLayer();
    if (forceNew || layer.dataset.mode !== "office" || !layer.children.length) {
      const picks = shuffle(OFFICE_CHARS).slice(0, 3);
      layer.dataset.mode = "office";
      layer.innerHTML = "";
      picks.forEach((c, idx) => {
        const img = document.createElement("img");
        img.className = "tenotsu-front-stand tenotsu-front-stand-" + idx;
        img.alt = c[0];
        img.src = "images/assets/char/" + c[1];
        img.onerror = () => {
          img.onerror = null;
          img.src = "images/assets/char/a10501.webp";
        };
        layer.appendChild(img);
      });
      renderDialogueComment(picks[0][0], picks[0][2]);
    }
    layer.style.display = "block";
  }

  function renderShopCharacter(){
    const layer = ensureFrontLayer();
    if (layer.dataset.mode !== "shop" || !layer.querySelector(".tenotsu-front-sakuya")) {
      layer.dataset.mode = "shop";
      layer.innerHTML = "";
      const img = document.createElement("img");
      img.className = "tenotsu-front-stand tenotsu-front-sakuya";
      img.alt = "宵闇 朔夜";
      img.src = "images/assets/char/sakuya_02_hood.webp";
      img.onerror = () => {
        img.onerror = null;
        img.src = "images/assets/char/sakuya_01_hooddeep.webp";
      };
      layer.appendChild(img);
    }
    layer.style.display = "block";
  }

  function renderShopPanel(){
    const s = ensureOperationSurface();
    s.style.display = "block";
    s.style.pointerEvents = "auto";
    s.innerHTML = `
      <div id="tenotsu-shop-panel" role="dialog" aria-label="交換所メニュー">
        <div class="tenotsu-shop-title">アイテム交換所</div>
        <button type="button" class="tenotsu-shop-button" data-surface-action="exchange-items">交換品を見る</button>
        <button type="button" class="tenotsu-shop-button" data-surface-action="secret-word">秘密の言葉</button>
        <button type="button" class="tenotsu-shop-button" data-surface-action="shop-help">交換所の説明</button>
        <button type="button" class="tenotsu-shop-button" data-surface-action="back-office">事務所に戻る</button>
      </div>
    `;
  }

  function updateInputSurfaces(){
    const click = qs("#click-layer");
    const op = qs("#tenotsu-operation-surface");
    if (currentMode === "story") {
      if (click) {
        click.style.removeProperty("display");
        click.style.pointerEvents = "auto";
      }
      if (op) op.style.pointerEvents = "none";
    } else {
      if (click) {
        click.style.pointerEvents = "none";
        if (currentMode === "battle") click.style.display = "none";
        else click.style.removeProperty("display");
      }
      if (op) {
        const active = currentMode === "shop";
        op.style.pointerEvents = active ? "auto" : "none";
        op.style.display = active && op.children.length ? "block" : "none";
      }
    }
  }

  function normalizeStoryLayer(){
    qsa("#char-layer img,#char-layer .char-image").forEach(img => {
      setI(img, "position", "relative");
      setI(img, "left", "auto");
      setI(img, "top", "auto");
      setI(img, "right", "auto");
      setI(img, "bottom", "auto");
      setI(img, "display", "block");
      setI(img, "visibility", "visible");
      setI(img, "opacity", "1");
      setI(img, "z-index", Z.storyChar);
      setI(img, "pointer-events", "none");
    });
  }

  function normalizeLayers(){
    [
      ["#background", Z.bg],
      ["#random-images-layer,#random-text-layer", Z.title],
      ["#char-layer,#char-layer .char-slot,#char-layer .char-image", Z.storyChar],
      ["#ev-layer,#ev-layer .ev-image,#ev-layer .cg-image,.ev-image,.cg-image", Z.cg],
      ["#click-layer", Z.click],
      ["#tenotsu-front-character-layer,#tenotsu-front-character-layer img", Z.frontChar],
      ["#tenotsu-operation-surface", Z.operation],
      ["#tenotsu-main-menu", Z.menu],
      ["#dialogue-box", Z.dialogue],
      ["#choices,.choices-area", Z.choice],
      ["#battle-root", Z.battle],
      [".fade-overlay,#fade-overlay,.black-fade,#black-fade,.screen-fade,#tenotsu-safe-fade", Z.fade],
      ["#ios-pwa-notice,#rotate-warning", Z.system],
      [".boot-flow", Z.boot]
    ].forEach(([sel,z]) => qsa(sel).forEach(el => setI(el, "z-index", z)));

    normalizeStoryLayer();
    updateInputSurfaces();
  }

  function safeFade(callback){
    const f = ensureFade();
    f.style.display = "block";
    f.style.pointerEvents = "none";
    f.style.transition = "opacity 700ms linear";
    f.style.opacity = "0";
    requestAnimationFrame(() => { f.style.opacity = "1"; });
    setTimeout(() => {
      try { if (typeof callback === "function") callback(); }
      finally {
        f.style.transition = "opacity 450ms linear";
        f.style.opacity = "0";
        setTimeout(() => { f.style.display = "none"; }, 520);
      }
    }, 760);
  }

  function enterOffice(forceNew){
    if (busy) return;
    busy = true;
    try {
      setMode("office");
      hideBootOverlay();
      satisfyLegacyGuard();
      document.body.classList.remove("battle-screen");
      const battle = qs("#battle-root");
      if (battle) battle.classList.add("hidden");
      clearOperationSurface();
      setBackground(BG_OFFICE);
      renderOfficeCharacters(!!forceNew);
      showMainMenu();
      normalizeLayers();
    } finally {
      setTimeout(() => { busy = false; }, 50);
    }
  }

  function enterShop(){
    if (busy) return;
    busy = true;
    try {
      setMode("shop");
      hideBootOverlay();
      satisfyLegacyGuard();
      setBackground(BG_SHOP);
      renderShopCharacter();
      const g = SHOP_GREETINGS[Math.floor(Math.random() * SHOP_GREETINGS.length)];
      renderDialogueComment(g[0], g[1]);
      renderShopPanel();
      showMainMenu();
      normalizeLayers();
    } finally {
      setTimeout(() => { busy = false; }, 50);
    }
  }

  function openShop(){
    try {
      const seen = localStorage.getItem(SAKUYA_INTRO_KEY) === "1";
      if (!seen && typeof window.loadScenario === "function") {
        localStorage.setItem(SAKUYA_INTRO_KEY, "1");
        window.__TENOTSU_RETURN_TO_SHOP_AFTER_STORY__ = true;
        setMode("story");
        hideFrontLayer();
        hideMainMenu();
        clearOperationSurface();
        window.loadScenario(SAKUYA_INTRO_SCENARIO);
        return;
      }
    } catch (_) {}
    enterShop();
  }

  function enterBattle(){
    setMode("battle");
    document.body.classList.add("battle-screen");
    hideFrontLayer();
    hideMainMenu();
    clearOperationSurface();
    hideDialogueIfNonStory();
    const click = qs("#click-layer");
    if (click) {
      click.style.display = "none";
      click.style.pointerEvents = "none";
    }
    if (typeof window.startBattle === "function") window.startBattle();
    else if (typeof window.startDeckBattlePrototype === "function") window.startDeckBattlePrototype();
    normalizeLayers();
  }

  function handleMenu(label){
    switch(label){
      case "店舗":
        enterOffice(true);
        break;
      case "ショップ":
        openShop();
        break;
      case "店舗営業":
        enterBattle();
        break;
      case "外回り":
        setMode("town");
        hideFrontLayer();
        clearOperationSurface();
        hideDialogueIfNonStory();
        if (typeof window.loadScenario === "function") window.loadScenario("town_walk.json");
        break;
      case "設定":
        setMode("settings");
        hideFrontLayer();
        clearOperationSurface();
        hideDialogueIfNonStory();
        if (typeof window.tenotsuShowSettingsMenu === "function") window.tenotsuShowSettingsMenu();
        break;
      case "メンバー":
        enterOffice(false);
        if (typeof window.tenotsuShowMemberMenu === "function") window.tenotsuShowMemberMenu();
        break;
    }
  }

  function handleSurfaceAction(action, label){
    if (throttle()) return;
    switch(action){
      case "main-menu":
        handleMenu(label);
        break;
      case "exchange-items":
        renderDialogueComment("朔夜", "現在交換できる品を確認しています。実交換リストは次の実装で接続します。");
        break;
      case "secret-word":
        renderDialogueComment("朔夜", "秘密の言葉ですね。入力欄の実装までは、ここで合言葉イベントを受け付ける予定です。");
        break;
      case "shop-help":
        renderDialogueComment("朔夜", "交換には、イベントの証や素材が必要です。時期によって品揃えが変わります。");
        break;
      case "back-office":
        enterOffice(true);
        break;
    }
  }

  function installEvents(){
    if (installed) return;
    installed = true;

    document.addEventListener("click", ev => {
      const battleBtn = ev.target && ev.target.closest ? ev.target.closest("#battle-root button[data-action='close']") : null;
      if (battleBtn) {
        ev.preventDefault();
        ev.stopPropagation();
        if (typeof ev.stopImmediatePropagation === "function") ev.stopImmediatePropagation();
        const root = qs("#battle-root");
        if (root) root.classList.add("hidden");
        safeFade(() => enterOffice(true));
        return;
      }

      const actionEl = ev.target && ev.target.closest ? ev.target.closest("[data-surface-action]") : null;
      if (!actionEl) return;

      ev.preventDefault();
      ev.stopPropagation();
      if (typeof ev.stopImmediatePropagation === "function") ev.stopImmediatePropagation();

      const action = actionEl.dataset.surfaceAction || "";
      const label = (actionEl.dataset.menuLabel || actionEl.textContent || "").trim();
      handleSurfaceAction(action, label);
    }, true);
  }

  function patchApis(){
    window.tenotsuSetGameMode = function(mode){
      if (mode === "office") return enterOffice(false);
      if (mode === "shop") return enterShop();
      if (mode === "battle") return enterBattle();
      setMode(mode || "office");
      normalizeLayers();
    };
    window.tenotsuEnterOfficeMode = function(reason){
      return enterOffice(reason === true || reason === "force" || reason === "story-end" || reason === "battle-end");
    };
    window.tenotsuShowOfficeSixMenu = function(){ showMainMenu(); normalizeLayers(); };
    window.tenotsuSetOfficeBackground = function(){ setBackground(BG_OFFICE); };
    window.tenotsuRestoreOfficeBackground = function(){ setBackground(BG_OFFICE); };
    window.tenotsuShowExchangeShopBackground = function(){ enterShop(); };
    window.tenotsuSetExchangeBackground = function(){ enterShop(); };
    window.tenotsuOpenShopWithSakuya = function(){ openShop(); };
    window.tenotsuNormalizeLayerIndex = function(){ normalizeLayers(); };
    window.tenotsuBlackFadeOut = function(ms){
      const f = ensureFade();
      f.style.display = "block";
      f.style.pointerEvents = "none";
      f.style.transition = "opacity " + (ms || 700) + "ms linear";
      f.style.opacity = "1";
    };
    window.tenotsuBlackFadeIn = function(ms){
      const f = ensureFade();
      f.style.pointerEvents = "none";
      f.style.transition = "opacity " + (ms || 450) + "ms linear";
      f.style.opacity = "0";
      setTimeout(() => { f.style.display = "none"; }, (ms || 450) + 80);
    };

    window.tenotsuRunBootFlow = function(){ if ((document.body.dataset.gameMode || window.tenotsuGameMode) !== "office") enterOffice(true); };
    window.tenotsuForceShowMenuFallback = function(){ enterOffice(true); };
    window.tenotsuHideOfficeBackgroundDirect = function(){};
    window.tenotsuDisableOfficeBackground = function(){};
    window.tenotsuForceOfficeForeground = function(){};
    window.TENOTSU_OFFICE_DISABLE_BACKGROUND = false;
  }

  function patchStoryEnd(){
    const prev = window.tenotsuHandleStoryEndReturn;
    if (typeof prev !== "function" || prev.__surfaceTakeoverV03814) return;

    const wrapped = function(){
      const scenarioName = String(window.currentScenario || "");
      const toShop = window.__TENOTSU_RETURN_TO_SHOP_AFTER_STORY__ || scenarioName.includes(SAKUYA_INTRO_SCENARIO);
      window.__TENOTSU_RETURN_TO_SHOP_AFTER_STORY__ = false;
      window.__TENOTSU_STORY_ENDING__ = false;

      safeFade(() => {
        if (toShop) enterShop();
        else enterOffice(true);
      });
    };
    wrapped.__surfaceTakeoverV03814 = true;
    window.tenotsuHandleStoryEndReturn = wrapped;
  }

  function shouldEnterOfficeAfterBoot(){
    const mode = document.body.dataset.gameMode || window.tenotsuGameMode || "";
    if (["story","shop","battle","office"].includes(mode)) return false;
    const bg = qs("#background");
    const src = bg ? String(bg.getAttribute("src") || "") : "";
    if (!mode || mode === "title") return true;
    return src.includes("title") || src.endsWith("title.jpg");
  }

  function boot(){
    try { if (typeof window.tenotsuBootRescuePrepare === "function") window.tenotsuBootRescuePrepare(); } catch (_) {}
    patchApis();
    patchStoryEnd();
    installEvents();
    normalizeLayers();

    // Robust boot takeover: if the old boot flow stalls, office still appears.
    setTimeout(() => {
      patchApis();
      patchStoryEnd();
      try { if (typeof window.tenotsuBootRescuePrepare === "function") window.tenotsuBootRescuePrepare(); } catch (_) {}
      if (shouldEnterOfficeAfterBoot()) enterOffice(true);
      else normalizeLayers();
    }, 150);

    setTimeout(() => {
      try { if (typeof window.tenotsuBootRescuePrepare === "function") window.tenotsuBootRescuePrepare(); } catch (_) {}
      if (shouldEnterOfficeAfterBoot()) enterOffice(true);
      else normalizeLayers();
    }, 800);

    // Last safety. No observers, no recursive rebuild.
    setTimeout(() => {
      const mode = document.body.dataset.gameMode || window.tenotsuGameMode || "";
      if (!mode || mode === "title") enterOffice(true);
    }, 1800);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
