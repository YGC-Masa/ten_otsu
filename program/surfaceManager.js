/* v038_11 Surface Manager
   Adds an explicit operation surface and fixes shop interactions.
   Important:
   - #click-layer is for ADV/story only.
   - #tenotsu-operation-surface is for office/shop/menu UI.
   - Do not globally stop propagation for all menu clicks.
*/
(function(){
  "use strict";

  const VERSION = "v038_11";
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
    ["大道寺 真花","f10201.webp","店長、本日もよろしくお願いします。"],
    ["氷神 雪乃","g10201.webp","貴方様、無理はなさらないでくださいね。"],
    ["双沢 美空","h10501.webp","店長、今日も笑顔でいきましょう。"],
    ["双沢 夜空","i10201.webp","あんた、今日もちゃんと見てるから。"],
    ["芝桜 桃","j10501.webp","店長、ウチ参上！"],
    ["紫藤 彩愛","k10201.webp","貴方、こちらで確認くださいませ。"],
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
    dialogue: 420,
    choice: 440,
    officeChar: 520,
    operation: 760,
    menu: 800,
    comment: 900,
    battle: 30000,
    fade: 50000,
    system: 70000,
    boot: 200000
  });

  window.TENOTSU_SURFACE_VERSION = VERSION;
  window.__TENOTSU_SURFACE_EVENT_LOCK__ = false;
  window.TENOTSU_LAYER_Z = Z;

  let isRendering = false;
  let installed = false;

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

  function setMode(mode){
    window.tenotsuGameMode = mode;
    document.body.dataset.gameMode = mode;
    ["title","office","story","shop","battle","town","settings"].forEach(m => {
      document.body.classList.toggle("mode-" + m, mode === m);
    });
    document.body.classList.toggle("story-playing", mode === "story");
    updateInputSurfaces(mode);
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

  function ensureOfficeLayer(){
    let layer = qs("#tenotsu-surface-office-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.id = "tenotsu-surface-office-layer";
      document.body.appendChild(layer);
    }
    return layer;
  }

  function ensureComment(){
    let box = qs("#tenotsu-surface-comment");
    if (!box) {
      box = document.createElement("div");
      box.id = "tenotsu-surface-comment";
      document.body.appendChild(box);
    }
    return box;
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

  function ensureShopCharacterLayer(){
    let layer = qs("#tenotsu-shop-character-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.id = "tenotsu-shop-character-layer";
      const img = document.createElement("img");
      img.className = "tenotsu-shop-sakuya";
      img.alt = "宵闇 朔夜";
      img.src = "images/assets/char/sakuya_02_hood.webp";
      img.onerror = () => {
        img.onerror = null;
        img.src = "images/assets/char/sakuya_01_hooddeep.webp";
      };
      layer.appendChild(img);
      document.body.appendChild(layer);
    }
    return layer;
  }

  function hideShopCharacterLayer(){
    const layer = qs("#tenotsu-shop-character-layer");
    if (layer) layer.style.display = "none";
  }

  function renderShopCharacter(){
    const layer = ensureShopCharacterLayer();
    layer.style.display = "block";
  }

  function cleanupLegacyShopPanels(){
    // Hide old left/shop submenus that predate the surface manager.
    qsa("#menu-panel,.menu-panel,.left-menu,#left-menu,#leftPanel,.exchange-menu,.exchange-panel,.shop-submenu,.sub-menu").forEach(el => {
      if (el.id === "list-panel" || el.closest("#list-panel")) return;
      el.classList.add("hidden");
      el.style.setProperty("display", "none", "important");
      el.style.setProperty("pointer-events", "none", "important");
    });

    // Top dialogue-box is ADV-only. Shop/office use surface comment instead.
    const dialogue = qs("#dialogue-box");
    if (dialogue) {
      dialogue.classList.add("hidden");
      dialogue.style.setProperty("display", "none", "important");
      dialogue.style.setProperty("pointer-events", "none", "important");
    }
  }

  function clearOperationSurface(){
    const surface = qs("#tenotsu-operation-surface");
    if (surface) {
      surface.innerHTML = "";
      surface.style.display = "none";
      surface.style.pointerEvents = "none";
    }
  }

  function updateInputSurfaces(mode){
    const click = qs("#click-layer");
    const op = qs("#tenotsu-operation-surface");

    if (mode === "story") {
      if (click) {
        click.style.removeProperty("display");
        click.style.pointerEvents = "auto";
      }
      if (op) op.style.pointerEvents = "none";
      return;
    }

    if (click) {
      click.style.pointerEvents = "none";
      if (mode === "battle") click.style.display = "none";
      else click.style.removeProperty("display");
    }

    if (op) {
      const activeUiMode = (mode === "office" || mode === "shop" || mode === "settings" || mode === "town");
      op.style.pointerEvents = activeUiMode ? "auto" : "none";
      op.style.display = activeUiMode ? (op.children.length ? "block" : "none") : "none";
    }
  }

  function renderComment(name, text){
    const box = ensureComment();
    box.style.display = "block";
    const next = "<span class='comment-speaker'>" + name + "</span><span class='comment-text'>" + text + "</span>";
    if (box.innerHTML !== next) box.innerHTML = next;
  }

  function hideOfficeLayer(){
    const layer = qs("#tenotsu-surface-office-layer");
    if (layer) layer.style.display = "none";
  }

  function hideComment(){
    const box = qs("#tenotsu-surface-comment");
    if (box) box.style.display = "none";
  }

  function removeOldDiagnosticLayers(){
    ["#tenotsu-office-force-layer","#tenotsu-office-force-comment","#tenotsu-office-character-overlay","#office-character-layer"].forEach(sel => {
      qsa(sel).forEach(el => el.remove());
    });
  }

  function renderOfficeCharacters(forceNew = false){
    const layer = ensureOfficeLayer();
    const current = layer.dataset.pickKey || "";
    if (forceNew || !current || !layer.children.length) {
      const picks = shuffle(OFFICE_CHARS).slice(0, 3);
      const key = picks.map(p => p[1]).join("|");
      layer.dataset.pickKey = key;
      layer.innerHTML = "";
      picks.forEach((c, idx) => {
        const img = document.createElement("img");
        img.className = "tenotsu-surface-office-stand tenotsu-surface-office-stand-" + idx;
        img.alt = c[0];
        img.src = "images/assets/char/" + c[1];
        img.onerror = () => {
          img.onerror = null;
          img.src = "images/assets/char/a10501.webp";
        };
        layer.appendChild(img);
      });
      renderComment(picks[0][0], picks[0][2]);
    }
    layer.style.display = "block";
  }

  function menuAlreadyBuilt(panel){
    if (!panel) return false;
    const buttons = Array.from(panel.querySelectorAll(".tenotsu-six-main-button")).map(b => (b.textContent || "").trim());
    return MENU_ITEMS.every(label => buttons.includes(label));
  }

  function buildSixMenu(){
    const panel = qs("#list-panel");
    if (!panel) return;

    panel.classList.remove("hidden");
    panel.classList.add("show","open","visible","active","tenotsu-six-main-menu");

    if (menuAlreadyBuilt(panel)) {
      setI(panel, "display", "block");
      setI(panel, "visibility", "visible");
      setI(panel, "opacity", "1");
      return;
    }

    panel.innerHTML = "";

    const title = document.createElement("div");
    title.className = "tenotsu-six-main-title";
    title.textContent = "メインメニュー";
    panel.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "tenotsu-six-main-grid";

    MENU_ITEMS.forEach(label => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tenotsu-six-main-button";
      btn.textContent = label;
      btn.dataset.menuLabel = label;
      btn.dataset.surfaceAction = "main-menu";
      grid.appendChild(btn);
    });

    panel.appendChild(grid);
  }

  function renderShopOperationSurface(){
    const surface = ensureOperationSurface();
    surface.style.display = "block";
    surface.innerHTML = `
      <div class="tenotsu-shop-panel" role="dialog" aria-label="交換所メニュー">
        <div class="tenotsu-shop-title">アイテム交換所</div>
        <button type="button" class="tenotsu-shop-button" data-surface-action="exchange-items">交換品を見る</button>
        <button type="button" class="tenotsu-shop-button" data-surface-action="secret-word">秘密の言葉</button>
        <button type="button" class="tenotsu-shop-button" data-surface-action="shop-help">交換所の説明</button>
        <button type="button" class="tenotsu-shop-button" data-surface-action="back-office">事務所に戻る</button>
      </div>
    `;
  }

  function showShopNotice(text){
    renderComment("朔夜", text);
  }

  function handleSurfaceAction(action, label){
    switch(action){
      case "main-menu":
        handleMainMenu(label);
        break;
      case "exchange-items":
        showShopNotice("現在交換できる品を確認しています。実交換リストは次の実装で接続します。");
        break;
      case "secret-word":
        showShopNotice("秘密の言葉ですね。入力欄の実装までは、ここで合言葉イベントを受け付ける予定です。");
        break;
      case "shop-help":
        showShopNotice("交換には、イベントの証や素材が必要です。時期によって品揃えが変わります。");
        break;
      case "back-office":
        enterOffice(true);
        break;
    }
  }

  function handleMainMenu(label){
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
        hideOfficeLayer();
        hideShopCharacterLayer();
        hideComment();
        clearOperationSurface();
        if (typeof window.loadScenario === "function") window.loadScenario("town_walk.json");
        break;
      case "設定":
        setMode("settings");
        hideOfficeLayer();
        hideShopCharacterLayer();
        hideComment();
        clearOperationSurface();
        if (typeof window.tenotsuShowSettingsMenu === "function") window.tenotsuShowSettingsMenu();
        break;
      case "メンバー":
        enterOffice(false);
        if (typeof window.tenotsuShowMemberMenu === "function") window.tenotsuShowMemberMenu();
        break;
      default:
        enterOffice(false);
    }
  }

  function enterOffice(forceNewCharacters = false){
    if (isRendering) return;
    isRendering = true;
    try {
      setMode("office");
      document.body.classList.remove("battle-screen");
      const battleRoot = qs("#battle-root");
      if (battleRoot) battleRoot.classList.add("hidden");
      removeOldDiagnosticLayers();
      hideShopCharacterLayer();
      clearOperationSurface();
      cleanupLegacyShopPanels();
      setBackground(BG_OFFICE);
      if (typeof window.tenotsuSetStoryPlayingFlag === "function") {
        try { window.tenotsuSetStoryPlayingFlag(false); } catch (_) {}
      }
      const dialogue = qs("#dialogue-box");
      if (dialogue) dialogue.classList.add("hidden");
      renderOfficeCharacters(forceNewCharacters);
      buildSixMenu();
      normalizeLayers();
    } finally {
      isRendering = false;
    }
  }

  function showShopGreeting(){
    const g = SHOP_GREETINGS[Math.floor(Math.random() * SHOP_GREETINGS.length)];
    renderComment(g[0], g[1]);
  }

  function enterShop(){
    if (isRendering) return;
    const now = performance.now ? performance.now() : Date.now();
    if (window.__TENOTSU_LAST_ENTER_SHOP__ && now - window.__TENOTSU_LAST_ENTER_SHOP__ < 250) return;
    window.__TENOTSU_LAST_ENTER_SHOP__ = now;

    isRendering = true;
    try {
      setMode("shop");
      setBackground(BG_SHOP);
      hideOfficeLayer();
      renderShopCharacter();
      showShopGreeting();
      cleanupLegacyShopPanels();
      renderShopOperationSurface();
      updateInputSurfaces("shop");

      // 右6大メニューは残す。ショップ中でも「店舗」で戻れる。
      buildSixMenu();
      normalizeLayers();
    } finally {
      isRendering = false;
    }
  }

  function openShop(){
    const now = performance.now ? performance.now() : Date.now();
    if (window.__TENOTSU_OPEN_SHOP_LOCK__ && now - window.__TENOTSU_OPEN_SHOP_LOCK__ < 350) return;
    window.__TENOTSU_OPEN_SHOP_LOCK__ = now;

    try {
      const seen = localStorage.getItem(SAKUYA_INTRO_KEY) === "1";
      if (!seen && typeof window.loadScenario === "function") {
        localStorage.setItem(SAKUYA_INTRO_KEY, "1");
        window.__TENOTSU_RETURN_TO_SHOP_AFTER_STORY__ = true;
        setMode("story");
        hideOfficeLayer();
        hideShopCharacterLayer();
        hideComment();
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
    hideOfficeLayer();
    hideShopCharacterLayer();
    hideComment();
    clearOperationSurface();
    const click = qs("#click-layer");
    if (click) {
      click.style.display = "none";
      click.style.pointerEvents = "none";
    }
    if (typeof window.startBattle === "function") window.startBattle();
    normalizeLayers();
  }

  function normalizeStoryCharacters(){
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

  function normalizeDialogue(){
    const box = qs("#dialogue-box");
    if (!box) return;
    setI(box, "position", "fixed");
    setI(box, "left", "5%");
    setI(box, "right", "12%");
    setI(box, "top", "auto");
    setI(box, "bottom", "max(18px, env(safe-area-inset-bottom))");
    setI(box, "width", "auto");
    setI(box, "z-index", Z.dialogue);

    const mode = document.body.dataset.gameMode || window.tenotsuGameMode || "";
    if (mode === "shop" || mode === "office") {
      box.classList.add("hidden");
      box.style.setProperty("display", "none", "important");
      box.style.setProperty("pointer-events", "none", "important");
    } else {
      box.style.removeProperty("display");
      box.style.removeProperty("pointer-events");
    }
  }

  function normalizeLayers(){
    [
      ["#background", Z.bg],
      ["#random-images-layer,#random-text-layer", Z.title],
      ["#char-layer,#char-layer .char-slot,#char-layer .char-image", Z.storyChar],
      ["#ev-layer,#ev-layer .ev-image,#ev-layer .cg-image,.ev-image,.cg-image", Z.cg],
      ["#click-layer", Z.click],
      ["#dialogue-box", Z.dialogue],
      ["#choices,.choices-area", Z.choice],
      ["#tenotsu-surface-office-layer", Z.officeChar],
      ["#tenotsu-shop-character-layer,#tenotsu-shop-character-layer img", Z.officeChar],
      ["#tenotsu-operation-surface", Z.operation],
      ["#list-panel,#menu-panel,.right-menu,.right-panel,.menu-panel,.list-panel,.tenotsu-six-main-menu", Z.menu],
      ["#tenotsu-surface-comment,#office-comment-box,.office-comment-box,.title-comment-box", Z.comment],
      ["#battle-root", Z.battle],
      [".fade-overlay,#fade-overlay,.black-fade,#black-fade,.screen-fade", Z.fade],
      ["#ios-pwa-notice,#rotate-warning", Z.system],
      [".boot-flow", Z.boot]
    ].forEach(([sel,z]) => qsa(sel).forEach(el => setI(el, "z-index", z)));

    normalizeStoryCharacters();
    normalizeDialogue();
    updateInputSurfaces(document.body.dataset.gameMode || window.tenotsuGameMode || "");
  }

  function installButtonDelegates(){
    if (installed) return;
    installed = true;

    document.addEventListener("click", ev => {
      // Never touch battle-root buttons here; battle.js owns them.
      if (ev.target && ev.target.closest && ev.target.closest("#battle-root")) return;

      const actionEl = ev.target && ev.target.closest ? ev.target.closest("[data-surface-action], .tenotsu-six-main-button, #list-panel button, #list-panel .menu-item, #list-panel li, #list-panel a") : null;
      if (!actionEl) return;

      const label = (actionEl.dataset.menuLabel || actionEl.textContent || "").trim();
      const action = actionEl.dataset.surfaceAction || ((actionEl.classList.contains("tenotsu-six-main-button") || MENU_ITEMS.includes(label)) ? "main-menu" : "");
      if (!action) return;
      ev.preventDefault();
      ev.stopPropagation();
      if (typeof ev.stopImmediatePropagation === "function") ev.stopImmediatePropagation();

      if (window.__TENOTSU_SURFACE_EVENT_LOCK__) return;
      window.__TENOTSU_SURFACE_EVENT_LOCK__ = true;
      try {
        handleSurfaceAction(action, label);
      } finally {
        setTimeout(() => { window.__TENOTSU_SURFACE_EVENT_LOCK__ = false; }, 120);
      }
    }, true);
  }

  function patchExistingAPIs(){
    window.tenotsuSetGameMode = function(mode){
      if (mode === "office") return enterOffice(false);
      if (mode === "shop") return enterShop();
      if (mode === "battle") return enterBattle();
      setMode(mode || "office");
      normalizeLayers();
    };
    window.tenotsuEnterOfficeMode = function(reason){
      return enterOffice(reason === "story-end" || reason === "force" || reason === true);
    };
    window.tenotsuShowOfficeSixMenu = function(){ buildSixMenu(); normalizeLayers(); };
    window.tenotsuSetOfficeBackground = function(){ setBackground(BG_OFFICE); };
    window.tenotsuRestoreOfficeBackground = function(){ setBackground(BG_OFFICE); };
    window.tenotsuShowExchangeShopBackground = function(){ return enterShop(); };
    window.tenotsuSetExchangeBackground = function(){ return enterShop(); };
    window.tenotsuOpenShopWithSakuya = function(){ return openShop(); };
    window.tenotsuNormalizeLayerIndex = function(){ normalizeLayers(); };
    window.tenotsuHideOfficeBackgroundDirect = function(){};
    window.tenotsuDisableOfficeBackground = function(){};
    window.tenotsuForceOfficeForeground = function(){};
    window.TENOTSU_OFFICE_DISABLE_BACKGROUND = false;
  }

  function patchStoryEndShopReturn(){
    const previous = window.tenotsuHandleStoryEndReturn;
    if (typeof previous !== "function" || previous.__surfaceV03809) return;

    const wrapped = function(){
      const scenarioName = String(window.currentScenario || "");
      const shouldReturnShop = window.__TENOTSU_RETURN_TO_SHOP_AFTER_STORY__ || scenarioName.includes(SAKUYA_INTRO_SCENARIO);
      if (!shouldReturnShop) return previous.apply(this, arguments);

      window.__TENOTSU_RETURN_TO_SHOP_AFTER_STORY__ = false;
      window.__TENOTSU_STORY_ENDING__ = true;

      const nameBox = qs("#name");
      const textBox = qs("#text");
      const dialogueBox = qs("#dialogue-box");
      const clickLayer = qs("#click-layer");

      if (nameBox) nameBox.textContent = "";
      if (textBox) textBox.innerHTML = "（交換所が利用可能になりました）";
      if (dialogueBox) dialogueBox.classList.remove("hidden");
      if (clickLayer) clickLayer.style.pointerEvents = "none";

      if (typeof window.tenotsuBlackFadeOut === "function") {
        setTimeout(() => window.tenotsuBlackFadeOut(1000), 650);
      }
      setTimeout(() => {
        window.__TENOTSU_STORY_ENDING__ = false;
        enterShop();
      }, 1780);
      if (typeof window.tenotsuBlackFadeIn === "function") {
        setTimeout(() => window.tenotsuBlackFadeIn(850), 1980);
      }
      setTimeout(() => {
        if (clickLayer) clickLayer.style.pointerEvents = "auto";
      }, 2100);
    };
    wrapped.__surfaceV03809 = true;
    window.tenotsuHandleStoryEndReturn = wrapped;
  }

  function detectOfficeCandidate(){
    const mode = document.body.dataset.gameMode || window.tenotsuGameMode || "";
    if (mode === "office") return true;
    if (["title","story","shop","battle"].includes(mode)) return false;
    const panel = qs("#list-panel");
    const text = panel ? panel.textContent || "" : "";
    return text.includes("店舗") && text.includes("メンバー") && text.includes("ショップ");
  }


  function patchBattleCloseReturn(){
    // Battle.js uses button[data-action="close"]. Make it deterministic and prevent old handlers from double-firing.
    document.addEventListener("click", ev => {
      if (!ev.target || !ev.target.closest) return;
      const btn = ev.target.closest("#battle-root button[data-action='close']");
      if (!btn) return;
      ev.preventDefault();
      ev.stopPropagation();
      if (typeof ev.stopImmediatePropagation === "function") ev.stopImmediatePropagation();

      const root = qs("#battle-root");
      if (root) root.classList.add("hidden");
      document.body.classList.remove("battle-screen");
      setTimeout(() => enterOffice(true), 0);
    }, true);
  }

  function boot(){
    patchExistingAPIs();
    patchStoryEndShopReturn();
    installButtonDelegates();
    patchBattleCloseReturn();
    normalizeLayers();

    if (detectOfficeCandidate()) enterOffice(false);

    setTimeout(() => {
      patchExistingAPIs();
      normalizeLayers();
      if (detectOfficeCandidate()) enterOffice(false);
    }, 250);

    setTimeout(() => {
      normalizeLayers();
      if (detectOfficeCandidate()) enterOffice(false);
    }, 1000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
