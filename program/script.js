
/* v037_85 engine guard: 起動停止対策 */
window.TENOTSU_ENGINE_VERSION = "v037_87";
window.__TENOTSU_ENGINE_ERRORS__ = window.__TENOTSU_ENGINE_ERRORS__ || [];

window.addEventListener("error", (event) => {
  try {
    window.__TENOTSU_ENGINE_ERRORS__.push({
      type: "error",
      message: event.message || "",
      source: event.filename || "",
      line: event.lineno || 0,
      col: event.colno || 0
    });
    console.error("[TENOTSU ENGINE ERROR]", event.message, event.error || "");
  } catch (_) {}
});

window.addEventListener("unhandledrejection", (event) => {
  try {
    window.__TENOTSU_ENGINE_ERRORS__.push({
      type: "promise",
      message: String(event.reason && event.reason.message ? event.reason.message : event.reason)
    });
    console.error("[TENOTSU ENGINE PROMISE]", event.reason);
  } catch (_) {}
});

function tenotsuSafeEl(id) {
  return document.getElementById(id);
}

function tenotsuForceShowMenuFallback(reason = "") {
  try {
    const menuPanel = tenotsuSafeEl("menu-panel");
    const listPanel = tenotsuSafeEl("list-panel");
    const dialogueBox = tenotsuSafeEl("dialogue-box");
    const textEl = tenotsuSafeEl("text");
    const nameEl = tenotsuSafeEl("name");
    const clickLayer = tenotsuSafeEl("click-layer");

    if (clickLayer) clickLayer.style.pointerEvents = "auto";
    if (dialogueBox) dialogueBox.classList.remove("hidden");
    if (nameEl) nameEl.textContent = "ひだまりストア";
    if (textEl) textEl.innerHTML = "起動しました。メニューから操作してください。" + (reason ? `<br><small>${reason}</small>` : "");

    if (listPanel) listPanel.classList.add("hidden");
    if (menuPanel) {
      menuPanel.classList.remove("hidden");
      if (!menuPanel.innerHTML.trim()) {
        menuPanel.innerHTML = `
          <button class="menu-item" data-engine-action="battle">店舗営業</button>
          <button class="menu-item" data-engine-action="mainmenu">メインメニュー</button>
          <button class="menu-item" data-engine-action="cacheclear">キャッシュ削除</button>
        `;
      }
    }
  } catch (err) {
    console.error("[TENOTSU FALLBACK FAILED]", err);
  }
}

document.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-engine-action]");
  if (!btn) return;
  const action = btn.dataset.engineAction;
  if (action === "battle") {
    if (window.BattleProto && typeof window.BattleProto.openBattle === "function") {
      window.BattleProto.openBattle();
    } else if (typeof window.startDeckBattlePrototype === "function") {
      window.startDeckBattlePrototype();
    } else {
      alert("バトルエンジンが読み込まれていません");
    }
  } else if (action === "mainmenu") {
    if (typeof window.loadMenu === "function") window.loadMenu("mainmenu.json");
    else tenotsuForceShowMenuFallback("loadMenu未初期化");
  } else if (action === "store") {
    if (typeof window.loadList === "function") window.loadList("home.json");
    else tenotsuForceShowMenuFallback("店舗メニューは準備中です");
  } else if (action === "members") {
    if (typeof window.loadList === "function") window.loadList("members.json");
    else tenotsuForceShowMenuFallback("メンバーメニューは準備中です");
  } else if (action === "town") {
    tenotsuShowOuterMenu();
  } else if (action === "shop") {
    if (typeof window.loadList === "function") window.loadList("shop.json");
    else tenotsuForceShowMenuFallback("ショップは準備中です");
  } else if (action === "settings") {
    if (typeof window.loadMenu === "function") window.loadMenu("menu01.json");
    else tenotsuForceShowMenuFallback("設定は準備中です");
  } else if (action === "cacheclear") {
    if (typeof window.clearAppCacheAndReload === "function") window.clearAppCacheAndReload();
    else location.reload();
  }
});

window.addEventListener("load", () => {
  window.setTimeout(() => {
    const menuPanel = tenotsuSafeEl("menu-panel");
    const listPanel = tenotsuSafeEl("list-panel");
    const battleRoot = tenotsuSafeEl("battle-root");
    const hasVisibleMenu = menuPanel && !menuPanel.classList.contains("hidden") && menuPanel.innerHTML.trim();
    const hasVisibleList = listPanel && !listPanel.classList.contains("hidden") && listPanel.innerHTML.trim();
    const hasVisibleBattle = battleRoot && !battleRoot.classList.contains("hidden");
    if (!hasVisibleMenu && !hasVisibleList && !hasVisibleBattle) {
      tenotsuForceShowMenuFallback("起動演出後の画面復帰フォールバック");
    }
  }, 2600);
});
/* /v037_85 engine guard */

// script.js - v037 修正版（wait/effectTime/Menu/List安定化）

let currentScenario = "000start.json";
let currentIndex = 0;
let bgm = null;
let lastActiveSide = null;
let isMuted = true;
let typingInterval = null;
let isAutoMode = false;
let autoWaitTime = 2000;
let isPlaying = false;
  if (typeof tenotsuScheduleAutoPlay === 'function') tenotsuScheduleAutoPlay();
let currentSpeed = 40;
let defaultSpeed = 40;
let defaultFontSize = "1em";
let textAreaVisible = true;

const bgEl = document.getElementById("background");
const nameEl = document.getElementById("name");
const textEl = document.getElementById("text");
const choicesEl = document.getElementById("choices");
const menuPanel = document.getElementById("menu-panel");
const listPanel = document.getElementById("list-panel");
const evLayer = document.getElementById("ev-layer");
const clickLayer = document.getElementById("click-layer");
const dialogueBox = document.getElementById("dialogue-box");

const charSlots = {
  left: document.getElementById("char-left"),
  center: document.getElementById("char-center"),
  right: document.getElementById("char-right")
};

function isMobilePortrait() {
  return window.innerWidth <= 768 && window.innerHeight > window.innerWidth;
}

function setTextWithSpeed(text, speed, callback) {
  if (typingInterval) clearInterval(typingInterval);
  tenotsuStopAutoPlayTimer && tenotsuStopAutoPlayTimer();
  isPlaying = true;
  textEl.innerHTML = "";
  const sourceText = String(text ?? "");
  let i = 0;

  if (sourceText.length === 0) {
    isPlaying = false;
    if (callback) callback();
    if (typeof tenotsuScheduleAutoPlay === "function") tenotsuScheduleAutoPlay();
    return;
  }

  typingInterval = setInterval(() => {
    textEl.innerHTML += sourceText[i++];
    if (i >= sourceText.length) {
      clearInterval(typingInterval);
      typingInterval = null;
      isPlaying = false;
      if (callback) callback();
      if (typeof tenotsuScheduleAutoPlay === "function") tenotsuScheduleAutoPlay();
    }
  }, speed);
}

function setCharacterStyle(name, scene = {}) {
  const style = (window.TENOTSU_CHARACTER_STYLE_MAP && window.TENOTSU_CHARACTER_STYLE_MAP[name]) || null;
  if (nameEl) {
    nameEl.style.color = style ? style.color : "";
    nameEl.style.fontWeight = style ? (style.fontWeight || "700") : "";
    nameEl.style.textShadow = style ? (style.textShadow || "") : "";
  }
  if (textEl) {
    textEl.style.color = style ? style.color : "";
    textEl.style.fontWeight = style ? (style.fontWeight || "600") : "";
    textEl.style.textShadow = style ? (style.textShadow || "") : "";
    textEl.style.fontSize = scene.fontSize || defaultFontSize || "1em";
  }
  if (style && typeof style.speed === "number") currentSpeed = style.speed;
  else currentSpeed = scene.speed || defaultSpeed || 40;
  if (scene.color) {
    if (nameEl) nameEl.style.color = scene.color;
    if (textEl) textEl.style.color = scene.color;
  }
  if (scene.speed) currentSpeed = scene.speed;
}

function clearCharacters() {
  for (const pos in charSlots) {
    charSlots[pos].innerHTML = "";
    charSlots[pos].classList.remove("active");
  }
  lastActiveSide = null;
}

function updateCharacterDisplay() {
  // v037_85:
  // 同じslotに同一人物(a1/b1...)の別表情を出す場合はフェードなし。
  // 新規人物/別人物のみフェード。
  window.__TENOTSU_CHAR_SLOT_STATE__ = window.__TENOTSU_CHAR_SLOT_STATE__ || {};
  Object.entries(charSlots).forEach(([side, slot]) => {
    if (!slot) return;
    const img = slot.querySelector("img");
    if (!img) {
      window.__TENOTSU_CHAR_SLOT_STATE__[side] = null;
      return;
    }
    const srcAttr = img.getAttribute("src") || "";
    const file = srcAttr.split("/").pop() || "";
    const charKey = file.slice(0, 2);
    const prev = window.__TENOTSU_CHAR_SLOT_STATE__[side];

    img.classList.remove("char-fade-in", "char-same-expression-swap");

    if (prev && prev.charKey === charKey && prev.file !== file) {
      img.classList.add("char-same-expression-swap");
      img.style.transition = "none";
      img.style.animation = "none";
      img.style.opacity = "1";
      requestAnimationFrame(() => {
        img.style.transition = "";
        img.style.animation = "";
        img.classList.remove("char-same-expression-swap");
      });
    } else if (!prev || prev.charKey !== charKey) {
      img.classList.add("char-fade-in");
    }

    window.__TENOTSU_CHAR_SLOT_STATE__[side] = { file, charKey };
  });
}

async function applyEffect(el, effectName, duration = 1000) {
  if (!effectName) return;
  if (window.effects && window.effects[effectName]) {
    return await window.effects[effectName](el, duration);
  }
  if (window.effects?.fadein) {
    return await window.effects.fadein(el, duration);
  }
}

function getSceneWait(scene) {
  return Number.isFinite(Number(scene?.wait)) ? Number(scene.wait) : autoWaitTime;
}

function getEffectTime(scene) {
  return Number.isFinite(Number(scene?.effectTime)) ? Number(scene.effectTime) : 1000;
}

function normalizeItems(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

function normalizeScenes(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.scenes)) return data.scenes;
  return [];
}

async function safeFetchJson(url, label = "JSON") {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${label}読み込み失敗: ${res.status} ${url}`);
  return await res.json();
}

function updateTextAreaVisibility(show) {
  textAreaVisible = show;
  dialogueBox.classList.toggle("hidden", !show);
}

async function showScene(scene) {
  if (!scene) return;
  if (typingInterval) clearInterval(typingInterval);

  const sceneWaitTime = getSceneWait(scene);
  const effectTime = getEffectTime(scene);
  const sceneEffect = scene.effect || scene.bgEffect;

  textEl.innerHTML = "";
  nameEl.textContent = "";
  evLayer.innerHTML = "";
  choicesEl.innerHTML = "";

  if (scene.textareashow !== undefined) {
    updateTextAreaVisibility(scene.textareashow);
  }

  // ランダム画像表示のon/off
  if (scene.randomimageson === false && typeof randomImagesOff === "function") {
    randomImagesOff();
  } else if (scene.randomimageson === true && typeof randomImagesOn === "function") {
    randomImagesOn();
  }

  // ランダムテキスト表示のon/off
  if (scene.randomtexts !== undefined) {
    if (scene.randomtexts) {
      if (typeof randomTextsOn === "function") randomTextsOn();
    } else {
      if (typeof randomTextsOff === "function") randomTextsOff();
    }
  }

  // 背景なしでも白/黒フラッシュ等を使えるようにする
  if (!scene.bg && scene.effect) {
    await applyEffect(bgEl, scene.effect, effectTime);
  }

  if (scene.bg) {
    if (sceneEffect) await applyEffect(bgEl, sceneEffect, effectTime);
    await new Promise((resolve) => {
      bgEl.onload = resolve;
      bgEl.onerror = resolve;
      bgEl.src = config.bgPath + scene.bg;
    });
    if (scene.bgEffect) await applyEffect(bgEl, scene.bgEffect, effectTime);
  }

  if (scene.showev) {
    const evImg = document.createElement("img");
    evImg.src = config.evPath + scene.showev;
    evImg.classList.add("ev-image");
    evImg.onload = () => applyEffect(evImg, scene.evEffect || "fadein", effectTime);
    evLayer.appendChild(evImg);
  }

  if (scene.showcg) {
    const cgImg = document.createElement("img");
    cgImg.src = config.cgPath + scene.showcg;
    cgImg.classList.add("cg-image");
    cgImg.onload = () => applyEffect(cgImg, scene.cgEffect || "fadein", effectTime);
    evLayer.appendChild(cgImg);
  }

  if (scene.bgm !== undefined) {
    if (bgm) {
      bgm.pause();
      bgm = null;
    }
    if (scene.bgm) {
      bgm = new Audio(config.bgmPath + scene.bgm);
      bgm.loop = true;
      bgm.muted = isMuted;
      bgm.play().catch(() => {});
    }
  }

  if (scene.characters) {
    lastActiveSide = scene.characters[scene.characters.length - 1]?.side || null;
    for (const pos of ["left", "center", "right"]) {
      const slot = charSlots[pos];
      const charData = scene.characters.find((c) => c.side === pos);
      if (charData && charData.src && charData.src !== "NULL") {
        const img = document.createElement("img");
        img.src = config.charPath + charData.src;
        img.classList.add("char-image");
        slot.innerHTML = "";
        slot.appendChild(img);
        await applyEffect(img, charData.effect || "fadein", effectTime);
      } else if (charData && charData.src === "NULL") {
        slot.innerHTML = "";
      }
    }
  }

  updateCharacterDisplay();

  if (scene.name !== undefined && scene.text !== undefined) {
    nameEl.textContent = scene.name;
    setCharacterStyle(scene.name, scene);
    setTextWithSpeed(scene.text, currentSpeed, () => {
      if (isAutoMode && choicesEl.children.length === 0) {
        setTimeout(() => {
          if (!isPlaying) next();
        }, sceneWaitTime);
      }
    });
  }

  if (scene.voice) {
    const voice = new Audio(config.voicePath + scene.voice);
    voice.muted = isMuted;
    voice.play().catch(() => {});
  }

  if (scene.se) {
    const se = new Audio(config.sePath + scene.se);
    se.muted = isMuted;
    se.play().catch(() => {});
  }

  if (scene.choices) {
    scene.choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.onclick = () => {
        clearCharacters();
        textEl.innerHTML = "";
        nameEl.textContent = "";
        evLayer.innerHTML = "";
        handleMenuAction(choice);
      };
      choicesEl.appendChild(btn);
    });
  }

  if (scene.showmenu) {
    const isInitialScenario = currentScenario === "000start.json" || currentScenario === "start000.json";
    if (!(window.__TENOTSU_MAIN_MENU_LOCK__ && isInitialScenario)) await loadMenu(scene.showmenu);
  }
  if (scene.showlist) {
    const isInitialScenario = currentScenario === "000start.json" || currentScenario === "start000.json";
    if (!(window.__TENOTSU_MAIN_MENU_LOCK__ && isInitialScenario && scene.showlist !== "office6.json")) await loadList(scene.showlist);
  }

  /* v037_85: characters-only scene auto schedule */
  if (scene.name === undefined && scene.text === undefined && !scene.choices && isAutoMode) {
    tenotsuScheduleAutoPlay();
  }

  if (scene.auto && scene.choices === undefined && scene.text === undefined) {
    setTimeout(() => {
      if (!isPlaying) next();
    }, sceneWaitTime);
  }
}

function next() {
  if (typeof tenotsuStopAutoPlayTimer === 'function') tenotsuStopAutoPlayTimer();
  safeFetchJson(config.scenarioPath + currentScenario + "?t=" + Date.now(), currentScenario)
    .then((data) => {
      currentIndex++;
      const scenes = normalizeScenes(data);
      if (currentIndex < scenes.length) {
        showScene(scenes[currentIndex]);
      } else {
        if (textAreaVisible) {
          tenotsuHandleStoryEndReturn();
        }
        isAutoMode = false;
      }
    })
    .catch((err) => showError(err.message));
}

function loadScenario(filename) {
  // ランダム表示類はリセット
  if (typeof randomImagesOff === "function") randomImagesOff();
  if (typeof randomTextsOff === "function") randomTextsOff();

  currentScenario = filename;
  currentIndex = 0;
  clearCharacters();
  textEl.innerHTML = "";
  nameEl.textContent = "";
  evLayer.innerHTML = "";
  listPanel.classList.add("hidden");
  menuPanel.classList.add("hidden");
  if (typingInterval) clearInterval(typingInterval);
  updateTextAreaVisibility(true);

  safeFetchJson(config.scenarioPath + filename + "?t=" + Date.now(), filename)
    .then((data) => {
      const scenes = normalizeScenes(data);
      if (scenes.length === 0) throw new Error(`シナリオが空です: ${filename}`);
      showScene(scenes[0]);
    })
    .catch((err) => showError(err.message));
}

function showError(message) {
  console.error(message);
  updateTextAreaVisibility(true);
  nameEl.textContent = "System";
  textEl.innerHTML = `読み込みエラー：${message}`;
}

function setVhVariable() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

window.addEventListener("resize", () => {
  setVhVariable();
  updateCharacterDisplay();
});

window.addEventListener("load", () => {
  setVhVariable();
  loadScenario(currentScenario);
});



// === キャッシュクリア ===
async function clearAppCacheAndReload() {
  const ok = window.confirm(
    "アプリキャッシュをクリアして再読み込みします。\n" +
    "画面が古いまま表示される時に使ってください。\n\n" +
    "※ セーブ用localStorageは消しません。"
  );
  if (!ok) return;

  try {
    if (typeof showError === "function") {
      showError("キャッシュをクリア中です……");
    }

    if (window.caches) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }

    if (navigator.serviceWorker) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((reg) => reg.unregister()));
    }

    const url = new URL(window.location.href);
    url.searchParams.set("reload", Date.now().toString());
    window.location.replace(url.toString());
  } catch (err) {
    console.error(err);
    alert("キャッシュクリアに失敗しました。Safariの履歴/サイトデータ削除、またはホーム画面追加のやり直しを試してください。");
  }
}

window.clearAppCacheAndReload = clearAppCacheAndReload;

// === メニュー関連 ===
function handleMenuAction(item) {
  if (!item) return;
  /* v037_85 town precheck */
  if ((item.action === "jump" && item.jump === "town_placeholder.json") || (item.action === "outer")) {
    tenotsuShowOuterMenu();
    return;
  }
  /* v037_85 scenario return precheck */
  if (item.action === "jump" && item.jump) {
    tenotsuPushReturnMenu("list", "office6.json");
  }
  /* v037_85 handleMenuAction precheck */
  if (item.action === "list" && item.list === "home.json") {
    tenotsuShowStoreStatus();
    return;
  }
  if (item.action === "list" && item.list === "members.json") {
    tenotsuShowMemberMenu();
    return;
  }
  if (item.action === "list" && item.list === "shop.json") {
    tenotsuShowShopMenu();
    return;
  }
  if (item.action === "auto") {
    tenotsuSetAutoMode(!isAutoMode);
    return;
  }
  if (item.action === "skip") {
    while (isPlaying === false && currentIndex < 9999) {
      next();
      break;
    }
    return;
  }
  if (item.action === "cacheclear") {
    if (typeof window.clearAppCacheAndReload === "function") window.clearAppCacheAndReload();
    return;
  }
  /* v037_85 custom action precheck */
  if (item.action === "custom") {
    if (item.custom === "memory-album") tenotsuShowMemoryAlbum();
    else if (item.custom === "expression-master") tenotsuShowExpressionMasterMenu();
    else if (item.custom === "expression-character") tenotsuShowExpressionCharacter(item.characterId || "aa");
    else if (item.custom === "memory-list") tenotsuShowMemoryCharacterList();
    else if (item.custom === "member-list") tenotsuShowMemberListMenu();
    else if (item.custom === "story-table") tenotsuShowStoryManagementTable();
    else if (item.custom === "title-return-archive") tenotsuShowTitleReturnMenuArchive();
    else if (item.custom === "secret-word") tenotsuShowSecretWordMenu();
    else if (item.custom === "memory-character") tenotsuShowMemoryCharacterStories(item.characterId || "manager");
    return;
  }
  if ((item.action === "jump" || !item.action) && item.jump) {
    loadScenario(item.jump);
  } else if (item.action === "menu" && item.menu) {
    loadMenu(item.menu);
  } else if (item.action === "list" && item.list) {
    loadList(item.list);
  } else if (item.action === "battle") {
    try {
      if (window.BattleProto && typeof window.BattleProto.openBattle === "function") {
        window.BattleProto.openBattle();
      } else if (typeof window.startDeckBattlePrototype === "function") {
        window.startDeckBattlePrototype();
      } else {
        showError("バトルプロトタイプが読み込まれていません");
      }
    } catch (err) {
      console.error("[TENOTSU BATTLE OPEN FAILED]", err);
      showError("バトル画面の起動に失敗しました: " + (err && err.message ? err.message : err));
    }
  } else if (item.action === "cacheclear") {
    clearAppCacheAndReload();
  } else if (item.action === "url" && item.url) {
    location.href = item.url;
  }
}

async function loadMenu(filename = "menu01.json") {
  try {
    const data = await safeFetchJson(config.menuPath + filename + "?t=" + Date.now(), filename);
    showMenu(data);
  } catch (err) {
    showError(err.message);
  }
}

function showMenu(menuData) {
  menuPanel.innerHTML = "";
  menuPanel.classList.add("left-system-panel");
  menuPanel.classList.remove("hidden");

  const audioBtn = document.createElement("button");
  audioBtn.textContent = isMuted ? "音声ONへ" : "音声OFFへ";
  audioBtn.onclick = () => {
    isMuted = !isMuted;
    if (bgm) bgm.muted = isMuted;
    document.querySelectorAll("audio").forEach(a => a.muted = isMuted);
    menuPanel.classList.add("hidden");
  };
  menuPanel.appendChild(audioBtn);

  const autoBtn = document.createElement("button");
  autoBtn.textContent = isAutoMode ? "オートモードOFF" : "オートモードON";
  autoBtn.onclick = () => {
    isAutoMode = !isAutoMode;
    if (isAutoMode) {
      textEl.innerHTML = "(AutoMode On)";
      setTimeout(() => {
        textEl.innerHTML = "";
        setTimeout(() => {
          if (!isPlaying && choicesEl.children.length === 0) next();
        }, autoWaitTime);
      }, 1000);
    } else {
      textEl.innerHTML = "(AutoMode Off)";
      setTimeout(() => { textEl.innerHTML = ""; }, 1000);
    }
    menuPanel.classList.add("hidden");
  };
  menuPanel.appendChild(autoBtn);

  const fullscreenBtn = document.createElement("button");
  fullscreenBtn.textContent = document.fullscreenElement ? "全画面OFF" : "全画面ON";
  fullscreenBtn.onclick = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    menuPanel.classList.add("hidden");
  };
  menuPanel.appendChild(fullscreenBtn);

  normalizeItems(menuData).forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.text;
    btn.onclick = () => {
      menuPanel.classList.add("hidden");
      handleMenuAction(item);
    };
    menuPanel.appendChild(btn);
  });
}

// === リスト関連 ===
async function loadList(filename = "list01.json") {
  try {
    const data = await safeFetchJson(config.listPath + filename + "?t=" + Date.now(), filename);
    showList(data);
  } catch (err) {
    showError(err.message);
  }
}

function showList(listData) {
  listPanel.innerHTML = "";
  listPanel.classList.add("right-main-panel");
  listPanel.classList.remove("hidden");

  normalizeItems(listData).slice(0, 7).forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.text;
    btn.onclick = () => {
      listPanel.classList.add("hidden");
      handleMenuAction(item);
    };
    listPanel.appendChild(btn);
  });
}

// === 操作レイヤー：クリック・タッチ対応 ===
clickLayer.addEventListener("dblclick", (event) => {
  // v037_85: 左メニューはダブルクリックではなく長押しで出す。
  event.preventDefault();
});

let lastTouch = 0;
clickLayer.addEventListener("touchend", () => {
  // v037_85: ダブルタップメニューは廃止。長押しメニューへ統一。
  lastTouch = Date.now();
});

clickLayer.addEventListener("click", () => {
  /* v037_85: 右メニュー非表示時タップ再表示 */
  if (!menuPanel.classList.contains("hidden")) {
    menuPanel.classList.add("hidden");
    return;
  }
  const battleRoot = document.getElementById("battle-root");
  const battleVisible = battleRoot && !battleRoot.classList.contains("hidden");
  if (!battleVisible && listPanel.classList.contains("hidden") && choicesEl.children.length === 0 && !isPlaying) {
    tenotsuEnsureOfficeSixMenuVisible();
    return;
  }
  if (!isPlaying && choicesEl.children.length === 0) {
    next();
  }
});

/* v037_85 expose engine functions */
try { if (typeof loadMenu === "function") window.loadMenu = loadMenu; } catch (_) {}
try { if (typeof loadList === "function") window.loadList = loadList; } catch (_) {}
try { if (typeof loadScenario === "function") window.loadScenario = loadScenario; } catch (_) {}
try { if (typeof clearAppCacheAndReload === "function") window.clearAppCacheAndReload = clearAppCacheAndReload; } catch (_) {}


/* v037_85 boot flow: 起動フラッシュ → 初期化 → タイトル表示 → 事務所6大メニュー */
window.TENOTSU_BOOT_FLOW_VERSION = "v037_85";
window.__TENOTSU_BOOT_DONE__ = false;

function tenotsuSetOfficeText(title, text) {
  try {
    const nameBox = document.getElementById("name");
    const textBox = document.getElementById("text");
    const dialogueBox = document.getElementById("dialogue-box");
    if (dialogueBox) dialogueBox.classList.remove("hidden");
    if (nameBox) nameBox.textContent = title || "";
    if (textBox) textBox.innerHTML = text || "";
  } catch (err) {
    console.error("[TENOTSU OFFICE TEXT FAILED]", err);
  }
}

function tenotsuShowOfficeSixMenu() {
  try {
    if (typeof window.loadList === "function") {
      const menuPanel = document.getElementById("menu-panel");
      if (menuPanel) menuPanel.classList.add("hidden");
      window.loadList("office6.json");
      tenotsuLockMainMenu();
      tenotsuSetOfficeText("ひだまりストア事務所", "上段：ステータス管理 / 中段：ゲームパート / 下段：その他");
      return;
    }

    const menuPanel = document.getElementById("menu-panel");
    if (menuPanel) {
      menuPanel.classList.remove("hidden");
      menuPanel.innerHTML = `
        <button class="menu-item office-menu-main office-status" data-engine-action="store">⓪ 店舗</button>
        <button class="menu-item office-menu-main office-status" data-engine-action="members">② メンバー</button>
        <button class="menu-item office-menu-main office-game" data-engine-action="battle">① 店舗営業</button>
        <button class="menu-item office-menu-main office-game" data-engine-action="town">③ 外回り</button>
        <button class="menu-item office-menu-main office-other" data-engine-action="shop">④ ショップ</button>
        <button class="menu-item office-menu-main office-other" data-engine-action="settings">⑤ 設定</button>
      `;
    }
    tenotsuSetOfficeText("ひだまりストア事務所", "上段：ステータス管理 / 中段：ゲームパート / 下段：その他");
  } catch (err) {
    console.error("[TENOTSU OFFICE MENU FAILED]", err);
    if (typeof tenotsuForceShowMenuFallback === "function") tenotsuForceShowMenuFallback("事務所6大メニュー表示失敗");
  }
}

function tenotsuRunBootFlow() {
  if (window.__TENOTSU_BOOT_DONE__) return;
  window.__TENOTSU_BOOT_DONE__ = true;

  const boot = document.getElementById("boot-flow");
  const bootLogo = boot ? boot.querySelector(".boot-logo") : null;
  const bootSub = boot ? boot.querySelector(".boot-sub") : null;

  function finishBoot() {
    try {
      if (boot) {
        boot.classList.add("is-out");
        window.setTimeout(() => {
          boot.classList.add("hidden");
          boot.setAttribute("aria-hidden", "true");
        }, 420);
      }
      tenotsuShowOfficeSixMenu();
    } catch (err) {
      console.error("[TENOTSU BOOT FINISH FAILED]", err);
      if (typeof tenotsuForceShowMenuFallback === "function") tenotsuForceShowMenuFallback("起動フロー終了失敗");
    }
  }

  try {
    if (boot) {
      boot.classList.remove("hidden", "is-out");
      boot.setAttribute("aria-hidden", "false");
    }
    if (bootLogo) bootLogo.textContent = "店長お疲れ様です";
    if (bootSub) bootSub.textContent = "初期化中…";

    window.setTimeout(() => { if (bootSub) bootSub.textContent = "ひだまりストアへ接続中…"; }, 520);
    window.setTimeout(() => {
      if (bootLogo) bootLogo.textContent = "ひだまりストア";
      if (bootSub) bootSub.textContent = "事務所6大メニューを準備しています";
    }, 1150);
    window.setTimeout(finishBoot, 1800);
  } catch (err) {
    console.error("[TENOTSU BOOT FAILED]", err);
    finishBoot();
  }
}

window.addEventListener("load", () => {
  window.setTimeout(tenotsuRunBootFlow, 80);
});

try {
  window.tenotsuRunBootFlow = tenotsuRunBootFlow;
  window.tenotsuShowOfficeSixMenu = tenotsuShowOfficeSixMenu;
} catch (_) {}
/* /v037_85 boot flow */


/* v037_85 economy/status/album helpers */
const TENOTSU_ECONOMY_KEY = "tenotsu_economy_v1";
const TENOTSU_ALBUM_KEY = "tenotsu_album_v1";
const TENOTSU_STORE_KEY = "tenotsu_store_v1";

function tenotsuLoadJsonStorage(key, fallback = {}) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch (_) { return fallback; }
}

function tenotsuSaveJsonStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch (_) {}
}

function tenotsuGetEconomy() {
  const e = tenotsuLoadJsonStorage(TENOTSU_ECONOMY_KEY, {});
  e.totalSales = Math.max(0, Math.floor(Number(e.totalSales) || 0));
  e.availableSales = Math.max(0, Math.floor(Number(e.availableSales) || 0));
  e.battleCount = Math.max(0, Math.floor(Number(e.battleCount) || 0));
  e.lastSales = Math.max(0, Math.floor(Number(e.lastSales) || 0));
  e.history = Array.isArray(e.history) ? e.history : [];
  return e;
}

function tenotsuGetStore() {
  const s = tenotsuLoadJsonStorage(TENOTSU_STORE_KEY, {});
  s.storeRank = Math.max(1, Math.floor(Number(s.storeRank) || Number(s.storeLevel) || 1));
  s.storeLevel = s.storeRank;
  s.townLevel = Math.max(1, Math.floor(Number(s.townLevel) || 1));
  s.managerRank = Math.max(1, Math.floor(Number(s.managerRank) || 1));
  s.facilityLevel = Math.max(1, Math.floor(Number(s.facilityLevel) || 1));
  s.expenseUsed = Math.max(0, Math.floor(Number(s.expenseUsed) || 0));
  s.exchangeUsed = Math.max(0, Math.floor(Number(s.exchangeUsed) || 0));
  s.equipment = Array.isArray(s.equipment) ? s.equipment : [];
  s.equipped = s.equipped && typeof s.equipped === "object" ? s.equipped : {};
  s.unlockedEpisodes = Array.isArray(s.unlockedEpisodes) ? s.unlockedEpisodes : [];
  s.unlockedLandmarks = Array.isArray(s.unlockedLandmarks) ? s.unlockedLandmarks : [];
  return s;
}

function tenotsuGetAlbum() {
  const a = tenotsuLoadJsonStorage(TENOTSU_ALBUM_KEY, {});
  a.memories = Array.isArray(a.memories) ? a.memories : [];
  a.scenarios = Array.isArray(a.scenarios) ? a.scenarios : [];
  a.images = Array.isArray(a.images) ? a.images : [];
  return a;
}

function tenotsuSpendSales(amount, purpose) {
  const price = Math.max(0, Math.floor(Number(amount) || 0));
  const e = tenotsuGetEconomy();
  if (e.availableSales < price) return false;
  e.availableSales -= price;
  e.history.unshift({ type: "spend", source: purpose || "支出", amount: -price, at: new Date().toISOString() });
  e.history = e.history.slice(0, 30);
  tenotsuSaveJsonStorage(TENOTSU_ECONOMY_KEY, e);
  return true;
}

function tenotsuUnlockMemory(id, title, text) {
  const a = tenotsuGetAlbum();
  if (!a.memories.some(m => m.id === id)) {
    a.memories.unshift({ id, title, text, at: new Date().toISOString() });
    tenotsuSaveJsonStorage(TENOTSU_ALBUM_KEY, a);
  }
}

function tenotsuShowDynamicPanel(title, html) {
  const menuPanel = document.getElementById("menu-panel");
  const listPanel = document.getElementById("list-panel");
  const nameBox = document.getElementById("name");
  const textBox = document.getElementById("text");
  if (listPanel) listPanel.classList.add("hidden");
  if (menuPanel) {
    menuPanel.classList.remove("hidden");
    menuPanel.innerHTML = html;
  }
  if (nameBox) nameBox.textContent = title || "";
  if (textBox) textBox.innerHTML = "メニューを選択してください。";
}

function tenotsuShowStoreStatus() {
  const e = tenotsuGetEconomy();
  const s = tenotsuUnlockRankRewards(tenotsuGetStore());
  const mxp = tenotsuGetManagerExpData();
  const storeCost = tenotsuRankCost("store", s.storeRank);
  const townCost = tenotsuRankCost("town", s.townLevel);
  const managerCost = tenotsuRankCost("manager", s.managerRank);
  const facilityCost = tenotsuRankCost("facility", s.facilityLevel);
  const equipped = s.equipped.manager ? (s.equipment.find(eq => eq.id === s.equipped.manager)?.name || s.equipped.manager) : "なし";
  tenotsuShowDynamicPanel("店舗・店長ステータス", `
    <div class="status-card">
      <h3>店長・店舗ステータス</h3>
      <p>累計売上：<b>${e.totalSales.toLocaleString()}円</b></p>
      <p>店長Lv：<b>${mxp.level}</b> / ${TENOTSU_MANAGER_MAX_LEVEL}　EXP：${mxp.level >= TENOTSU_MANAGER_MAX_LEVEL ? "MAX" : `${mxp.currentLevelExp.toLocaleString()} / ${mxp.nextLevelExp.toLocaleString()}`}</p>
      <p>Lv60まで残り：${mxp.remainingToMax.toLocaleString()}EXP</p>
      <p>使用可能売上：<b>${e.availableSales.toLocaleString()}円</b></p>
      <p>直近売上：${e.lastSales.toLocaleString()}円 / 営業回数：${e.battleCount.toLocaleString()}回</p>
      <hr>
      <p>店舗ランク：<b>${s.storeRank}</b> / 街レベル：<b>${s.townLevel}</b></p>
      <p>店長ランク：<b>${s.managerRank}</b> / 設備Lv：<b>${s.facilityLevel}</b></p>
      <p>店長装備：<b>${equipped}</b></p>
      <p>開放エピソード：${s.unlockedEpisodes.length} / 開放ランドマーク：${s.unlockedLandmarks.length}</p>
      <button class="menu-item" data-engine-action="claim-login-exp">ログインEXP受取 +100</button>
      <button class="menu-item" data-engine-action="claim-daily-exp">デイリーEXP受取 +250</button>
      <button class="menu-item" data-engine-action="claim-outer-exp">外回りEXPテスト +60</button>
      <button class="menu-item" data-engine-action="rank-store">店舗ランクUP ${storeCost.toLocaleString()}円</button>
      <button class="menu-item" data-engine-action="rank-town">街レベルUP ${townCost.toLocaleString()}円</button>
      <button class="menu-item" data-engine-action="rank-manager">店長ランクUP ${managerCost.toLocaleString()}円</button>
      <button class="menu-item" data-engine-action="facility-up">設備増強 ${facilityCost.toLocaleString()}円</button>
      <button class="menu-item" data-engine-action="equipment-menu">装備確認</button>
      <button class="menu-item" data-engine-action="event-exchange">イベントアイテム交換</button>
      <button class="menu-item" data-engine-action="expense-use">外回り経費に使う</button>
      <button class="menu-item" data-engine-action="office6">戻る</button>
    </div>
  `);
}

function tenotsuShowAlbum() {
  const a = tenotsuGetAlbum();
  const memories = a.memories.length
    ? a.memories.map(m => `<li><b>${m.title}</b><br><small>${m.text || ""}</small></li>`).join("")
    : "<li>まだ思い出はありません。店舗営業やシナリオ進行で追加されます。</li>";
  tenotsuShowDynamicPanel("思い出アルバム", `
    <div class="status-card">
      <h3>思い出アルバム</h3>
      <p>シナリオ、画像、外回りGOOD、店長ランク解放エピソード、店舗ランク解放ランドマークがここに蓄積されます。USBメモリで改装、SDカードで復習チャレンジができます。</p>
      <p>店長ランクでエピソード開放、店舗ランクでランドマーク開放。</p>
      <ul class="album-list">${memories}</ul>
      <button class="menu-item" data-engine-action="members">メンバーへ戻る</button>
      <button class="menu-item" data-engine-action="office6">事務所へ戻る</button>
    </div>
  `);
}

function tenotsuShowMemberMenu() {
  tenotsuShowDynamicPanel("メンバー", `
    <button class="menu-item" data-engine-action="member-list">メンバー一覧</button>
    <button class="menu-item" data-engine-action="memory-album">思い出アルバム</button>
    <button class="menu-item" data-engine-action="story-table">ストーリー管理表</button>
    <button class="menu-item" data-engine-action="title-return-archive">タイトル後メニュー</button>
    <button class="menu-item" data-engine-action="office6">戻る</button>
  `);
}


function tenotsuShowEquipmentMenu() {
  const s = tenotsuGetStore();
  const list = s.equipment.length
    ? s.equipment.map(eq => `<button class="menu-item" data-engine-action="equip-item" data-equip-id="${eq.id}">${eq.name}<br><small>${eq.source} / ${eq.effectText || ""}</small></button>`).join("")
    : `<p>装備品はまだありません。キャラからのプレゼントやイベント交換で入手できます。</p>`;
  tenotsuShowDynamicPanel("店長装備", `
    <div class="status-card">
      <h3>店長装備</h3>
      <p>キャラからのプレゼント、イベント交換品などを装備できます。</p>
      ${list}
      <button class="menu-item" data-engine-action="event-gift-test">テスト：プレゼント装備を受け取る</button>
      <button class="menu-item" data-engine-action="store">戻る</button>
    </div>
  `);
}

function tenotsuShowShopMenu() {
  const e = tenotsuGetEconomy();
  tenotsuShowDynamicPanel("ショップ", `
    <div class="status-card">
      <p>使用可能売上：<b>${e.availableSales.toLocaleString()}円</b></p>
      <button class="menu-item" data-engine-action="secret-word">秘密の言葉</button>
      <button class="menu-item" data-engine-action="event-exchange">イベントアイテム交換</button>
      <button class="menu-item" data-engine-action="facility-up">店舗設備増強アイテム</button>
      <button class="menu-item" data-engine-action="office6">戻る</button>
    </div>
  `);
}


/* v037_85 rank/equipment/unlock helpers */
function tenotsuRankCost(type, currentRank) {
  const rank = Math.max(1, Math.floor(Number(currentRank) || 1));
  if (type === "store") return rank * 10000;
  if (type === "town") return rank * 8000;
  if (type === "manager") return rank * 7000;
  if (type === "facility") return rank * 5000;
  return rank * 5000;
}

function tenotsuGrantEquipment(id, name, source, effectText) {
  const store = tenotsuGetStore();
  if (!store.equipment.some(eq => eq.id === id)) {
    store.equipment.push({ id, name, source, effectText, at: new Date().toISOString() });
    tenotsuSaveJsonStorage(TENOTSU_STORE_KEY, store);
    tenotsuUnlockMemory("equipment_" + id, "装備品入手：" + name, source + "で装備品を入手しました。");
  }
  return store;
}

function tenotsuUnlockRankRewards(store) {
  const s = store || tenotsuGetStore();

  const episodeRules = [
    { rank: 2, id: "manager_rank_2_episode", title: "店長ランク2エピソード", text: "店長としての一歩を踏み出した記録。" },
    { rank: 3, id: "manager_rank_3_episode", title: "店長ランク3エピソード", text: "スタッフから頼られる場面が増えてきた。" },
    { rank: 5, id: "manager_rank_5_episode", title: "店長ランク5エピソード", text: "ひだまりストアの中心として認められた。" }
  ];

  episodeRules.forEach(rule => {
    if (s.managerRank >= rule.rank && !s.unlockedEpisodes.includes(rule.id)) {
      s.unlockedEpisodes.push(rule.id);
      tenotsuUnlockMemory(rule.id, rule.title, rule.text);
    }
  });

  const landmarkRules = [
    { rank: 2, id: "landmark_techlab_tsukumo", title: "ランドマーク開放：テックラボつくも", text: "街にテックラボつくもが開放されました。" },
    { rank: 3, id: "landmark_biribiri_denki", title: "ランドマーク開放：ビリビリ電機", text: "ライバル店ビリビリ電機が街に現れました。" },
    { rank: 4, id: "landmark_mall_event", title: "ランドマーク開放：イベント広場", text: "イベント広場に行けるようになりました。" }
  ];

  landmarkRules.forEach(rule => {
    if (s.storeRank >= rule.rank && !s.unlockedLandmarks.includes(rule.id)) {
      s.unlockedLandmarks.push(rule.id);
      tenotsuUnlockMemory(rule.id, rule.title, rule.text);
    }
  });

  tenotsuSaveJsonStorage(TENOTSU_STORE_KEY, s);
  return s;
}

function tenotsuEquipItem(id) {
  const store = tenotsuGetStore();
  const item = store.equipment.find(eq => eq.id === id);
  if (!item) return false;
  store.equipped.manager = id;
  tenotsuSaveJsonStorage(TENOTSU_STORE_KEY, store);
  tenotsuUnlockMemory("equip_" + id, "装備変更：" + item.name, "店長装備に設定しました。");
  return true;
}

function tenotsuRankUp(type) {
  const store = tenotsuGetStore();
  const keyMap = { store: "storeRank", town: "townLevel", manager: "managerRank", facility: "facilityLevel" };
  const key = keyMap[type];
  if (!key) return false;
  const cost = tenotsuRankCost(type, store[key]);
  const labelMap = { store: "店舗ランクアップ", town: "街レベルアップ", manager: "店長ランクアップ", facility: "設備増強" };
  if (!tenotsuSpendSales(cost, labelMap[type])) return false;
  store[key] += 1;
  if (type === "store") store.storeLevel = store.storeRank;
  tenotsuSaveJsonStorage(TENOTSU_STORE_KEY, store);
  tenotsuUnlockMemory(type + "_rank_" + store[key], labelMap[type], labelMap[type] + "しました。現在Lv/RANK：" + store[key]);
  tenotsuUnlockRankRewards(store);
  return true;
}
/* /v037_85 rank/equipment/unlock helpers */

window.TenotsuData = {
  economy: tenotsuGetEconomy,
  store: tenotsuGetStore,
  album: tenotsuGetAlbum,
  spendSales: tenotsuSpendSales,
  unlockMemory: tenotsuUnlockMemory,
  showStoreStatus: tenotsuShowStoreStatus,
  showAlbum: tenotsuShowAlbum,
  showMemberMenu: tenotsuShowMemberMenu,
  showShopMenu: tenotsuShowShopMenu,
  showEquipmentMenu: tenotsuShowEquipmentMenu,
  rankUp: tenotsuRankUp,
  grantEquipment: tenotsuGrantEquipment,
  equipItem: tenotsuEquipItem,
  managerExp: tenotsuGetManagerExpData,
  addManagerExp: tenotsuAddManagerExp,
  claimLoginExp: tenotsuClaimLoginExp,
  claimDailyExp: tenotsuClaimDailyExp,
  outerMenu: tenotsuShowOuterMenu,
  startOuterAdv: tenotsuStartOuterAdv,
  items: tenotsuGetItems,
  affection: tenotsuGetAffection,
  storyMaster: tenotsuGetStoryMaster,
  expressionFile: tenotsuExpressionFile,
  expressionPath: tenotsuExpressionPath,
  memoriesByCharacter: tenotsuGetStoriesByCharacter
};
/* /v037_85 economy/status/album helpers */


/* v037_85 economy action listener */
document.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-engine-action]");
  if (!btn) return;
  const action = btn.dataset.engineAction;
  if (!["office6","member-list","album","memory-list","memory-character","memory-play","story-table","title-return-archive","expression-master","expression-character","memory-album","event-cg-view","album-story-play","center-surface-close","facility-up","event-exchange","expense-use","store","members","shop","auto","skip","cacheclear","secret-word","secret-word-submit","secret-word-hint","rank-store","rank-town","rank-manager","equipment-menu","equip-item","event-gift-test","claim-login-exp","claim-daily-exp","claim-outer-exp","outer-menu","outer-start","outer-glasses","outer-item-test","adv-answer","stamina-test-recover","album-remodel","review-challenge","settings"].includes(action)) return;

  event.preventDefault();
  event.stopPropagation();

  if (action === "outer-menu") {
    tenotsuShowOuterMenu();
  } else if (action === "outer-start") {
    tenotsuStartOuterAdv();
  } else if (action === "outer-glasses") {
    tenotsuUseHikaruGlasses();
  } else if (action === "outer-item-test") {
    tenotsuGrantOuterTestItems();
  } else if (action === "adv-answer") {
    tenotsuResolveAdvAnswer(btn.dataset.result);
  } else if (action === "stamina-test-recover") {
    tenotsuRecoverStamina(5);
    tenotsuShowOuterMenu();
  } else if (action === "album-remodel") {
    tenotsuAlbumRemodel();
  } else if (action === "review-challenge") {
    tenotsuReviewChallenge();
  } else if (action === "office6") {
    if (typeof window.loadList === "function") window.loadList("office6.json");
    else if (typeof tenotsuShowOfficeSixMenu === "function") tenotsuShowOfficeSixMenu();
  } else if (action === "store") {
    tenotsuShowStoreStatus();
  } else if (action === "members") {
    tenotsuShowMemberMenu();
  } else if (action === "shop") {
    tenotsuShowShopMenu();
  } else if (action === "member-list") {
    tenotsuShowMemberListMenu();
  } else if (action === "title-return-archive") {
    tenotsuShowTitleReturnMenuArchive();
  } else if (action === "expression-master") {
    tenotsuShowExpressionMasterMenu();
  } else if (action === "expression-character") {
    tenotsuShowExpressionCharacter(btn.dataset.characterId || "aa");
  } else if (action === "album" || action === "memory-list" || action === "memory-album") {
    tenotsuShowMemoryAlbum();
  } else if (action === "event-cg-view") {
    tenotsuShowEventCgViewer(btn.dataset.cgPath || "", btn.dataset.cgTitle || "イベントCG", btn.dataset.cgScenario || "", btn.dataset.characterId || "manager");
  } else if (action === "album-story-play") {
    const scenario = btn.dataset.scenario;
    const characterId = btn.dataset.characterId || "manager";
    tenotsuPushReturnMenu("memory-album", characterId);
    tenotsuCloseCenterSurface();
    if (scenario && typeof window.loadScenario === "function") window.loadScenario(scenario);
  } else if (action === "center-surface-close") {
    tenotsuCloseCenterSurface();
  } else if (action === "memory-character") {
    tenotsuShowMemoryCharacterStories(btn.dataset.characterId || "manager");
  } else if (action === "memory-play") {
    const scenario = btn.dataset.scenario;
    const characterId = btn.dataset.characterId || window.__TENOTSU_LAST_MEMORY_CHARACTER__ || "manager";
    tenotsuPushReturnMenu("memory-character", characterId);
    if (scenario && typeof window.loadScenario === "function") window.loadScenario(scenario);
  } else if (action === "story-table") {
    tenotsuShowStoryManagementTable();
  } else if (action === "settings") {
    if (typeof window.loadMenu === "function") window.loadMenu("menu01.json");
  } else if (action === "claim-login-exp") {
    tenotsuClaimLoginExp();
    tenotsuShowStoreStatus();
  } else if (action === "claim-daily-exp") {
    tenotsuClaimDailyExp();
    tenotsuShowStoreStatus();
  } else if (action === "claim-outer-exp") {
    tenotsuClaimOuterExp();
    tenotsuShowStoreStatus();
  } else if (action === "secret-word") {
    tenotsuShowSecretWordMenu();
  } else if (action === "secret-word-submit") {
    tenotsuSubmitSecretWord();
  } else if (action === "secret-word-hint") {
    tenotsuShowSecretWordHint();
  } else if (action === "rank-store") {
    tenotsuRankUp("store");
    tenotsuShowStoreStatus();
  } else if (action === "rank-town") {
    tenotsuRankUp("town");
    tenotsuShowStoreStatus();
  } else if (action === "rank-manager") {
    tenotsuRankUp("manager");
    tenotsuShowStoreStatus();
  } else if (action === "facility-up") {
    tenotsuRankUp("facility");
    tenotsuShowStoreStatus();
  } else if (action === "equipment-menu") {
    tenotsuShowEquipmentMenu();
  } else if (action === "equip-item") {
    tenotsuEquipItem(btn.dataset.equipId);
    tenotsuShowEquipmentMenu();
  } else if (action === "event-gift-test") {
    tenotsuGrantEquipment("gift_hina_badge", "緋奈の応援バッジ", "キャラからのプレゼント", "営業開始時の気分が上がる");
    tenotsuShowEquipmentMenu();
  } else if (action === "event-exchange") {
    if (tenotsuSpendSales(1200, "イベントアイテム交換")) {
      const store = tenotsuGetStore();
      store.exchangeUsed += 1200;
      tenotsuSaveJsonStorage(TENOTSU_STORE_KEY, store);
      tenotsuGrantEquipment("event_manager_clip", "イベント交換クリップ", "イベントアイテム交換", "店長ランク経験に関係する予定");
      tenotsuUnlockMemory("event_exchange_001", "イベント交換の記録", "売上を使ってイベントアイテムを交換しました。");
    }
    tenotsuShowShopMenu();
  } else if (action === "expense-use") {
    if (tenotsuSpendSales(800, "外回り経費")) {
      const store = tenotsuGetStore();
      store.expenseUsed += 800;
      tenotsuSaveJsonStorage(TENOTSU_STORE_KEY, store);
      tenotsuUnlockMemory("expense_001", "外回りの準備", "外回り経費を使いました。");
    }
    tenotsuShowStoreStatus();
  }
}, true);
/* /v037_85 economy action listener */


/* v037_85 manager level/EXP helpers */
const TENOTSU_MANAGER_EXP_KEY = "tenotsu_manager_exp_v1";
const TENOTSU_MANAGER_MAX_LEVEL = 60;

function tenotsuManagerNeedExp(level) {
  const lv = Math.max(1, Math.floor(Number(level) || 1));
  if (lv >= TENOTSU_MANAGER_MAX_LEVEL) return 0;
  return Math.floor(140 + 22 * Math.pow(lv - 1, 1.45));
}

function tenotsuManagerTotalExpForLevel(level) {
  const target = Math.max(1, Math.min(TENOTSU_MANAGER_MAX_LEVEL, Math.floor(Number(level) || 1)));
  let total = 0;
  for (let lv = 1; lv < target; lv++) total += tenotsuManagerNeedExp(lv);
  return total;
}

function tenotsuManagerTotalExpToMax() {
  return tenotsuManagerTotalExpForLevel(TENOTSU_MANAGER_MAX_LEVEL);
}

function tenotsuGetManagerExpData() {
  const data = tenotsuLoadJsonStorage(TENOTSU_MANAGER_EXP_KEY, {});
  data.totalExp = Math.max(0, Math.floor(Number(data.totalExp) || 0));
  data.history = Array.isArray(data.history) ? data.history : [];
  let level = 1;
  let used = 0;
  for (let lv = 1; lv < TENOTSU_MANAGER_MAX_LEVEL; lv++) {
    const need = tenotsuManagerNeedExp(lv);
    if (used + need > data.totalExp) break;
    used += need;
    level = lv + 1;
  }
  data.level = level;
  data.currentLevelExp = Math.max(0, data.totalExp - used);
  data.nextLevelExp = level >= TENOTSU_MANAGER_MAX_LEVEL ? 0 : tenotsuManagerNeedExp(level);
  data.remainingToMax = Math.max(0, tenotsuManagerTotalExpToMax() - data.totalExp);
  return data;
}

function tenotsuAddManagerExp(amount, source = "EXP") {
  const value = Math.max(0, Math.floor(Number(amount) || 0));
  const data = tenotsuGetManagerExpData();
  const beforeLevel = data.level;
  data.totalExp = Math.min(tenotsuManagerTotalExpToMax(), data.totalExp + value);
  const next = tenotsuGetManagerExpDataFromValue(data.totalExp);
  data.level = next.level;
  data.currentLevelExp = next.currentLevelExp;
  data.nextLevelExp = next.nextLevelExp;
  data.remainingToMax = next.remainingToMax;
  data.updatedAt = new Date().toISOString();
  data.history.unshift({ source, exp: value, at: data.updatedAt });
  data.history = data.history.slice(0, 30);
  tenotsuSaveJsonStorage(TENOTSU_MANAGER_EXP_KEY, data);
  if (data.level > beforeLevel) {
    tenotsuUnlockMemory("manager_level_" + data.level, "店長Lv" + data.level + "到達", "店長レベルが" + data.level + "になりました。");
  }
  return data;
}

function tenotsuGetManagerExpDataFromValue(totalExp) {
  const data = { totalExp: Math.max(0, Math.floor(Number(totalExp) || 0)), history: [] };
  let level = 1;
  let used = 0;
  for (let lv = 1; lv < TENOTSU_MANAGER_MAX_LEVEL; lv++) {
    const need = tenotsuManagerNeedExp(lv);
    if (used + need > data.totalExp) break;
    used += need;
    level = lv + 1;
  }
  data.level = level;
  data.currentLevelExp = Math.max(0, data.totalExp - used);
  data.nextLevelExp = level >= TENOTSU_MANAGER_MAX_LEVEL ? 0 : tenotsuManagerNeedExp(level);
  data.remainingToMax = Math.max(0, tenotsuManagerTotalExpToMax() - data.totalExp);
  return data;
}

function tenotsuTodayKey() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function tenotsuClaimLoginExp() {
  const data = tenotsuGetManagerExpData();
  const today = tenotsuTodayKey();
  if (data.lastLoginExpDate === today) return false;
  const updated = tenotsuAddManagerExp(100, "ログインボーナス");
  updated.lastLoginExpDate = today;
  tenotsuSaveJsonStorage(TENOTSU_MANAGER_EXP_KEY, updated);
  tenotsuUnlockMemory("login_exp_" + today, "ログインボーナス", "店長EXPを100獲得しました。");
  return true;
}

function tenotsuClaimDailyExp() {
  const data = tenotsuGetManagerExpData();
  const today = tenotsuTodayKey();
  if (data.lastDailyExpDate === today) return false;
  const updated = tenotsuAddManagerExp(250, "デイリー業務");
  updated.lastDailyExpDate = today;
  tenotsuSaveJsonStorage(TENOTSU_MANAGER_EXP_KEY, updated);
  tenotsuUnlockMemory("daily_exp_" + today, "デイリー業務完了", "店長EXPを250獲得しました。");
  return true;
}

function tenotsuClaimOuterExp() {
  tenotsuAddManagerExp(60, "外回り");
  tenotsuUnlockMemory("outer_exp_first", "外回りの記録", "外回りで経験を積みました。");
  return true;
}
/* /v037_85 manager level/EXP helpers */


/* v037_85 outer ADV / encounter / affection / item helpers */
const TENOTSU_STAMINA_KEY = "tenotsu_stamina_v1";
const TENOTSU_AFFECTION_KEY = "tenotsu_affection_v1";
const TENOTSU_ITEM_KEY = "tenotsu_items_v1";
const TENOTSU_ADV_LOG_KEY = "tenotsu_adv_log_v1";
const TENOTSU_OUTER_STAMINA_COST = 1;
const TENOTSU_OUTER_BASE_ENCOUNTER = 0.50;

const TENOTSU_ADV_CHARACTERS = [
  { id: "aa", name: "緋奈", good: "一緒にカレーでも食べに行く？", fine: "少し休憩する？", bad: "暗算の練習をしよう", topic: "商店街のカレー屋の前で、緋奈が立ち止まっている。" },
  { id: "ab", name: "藍", good: "新しいパン屋、一緒に見に行く？", fine: "少し休憩する？", bad: "パソコン売り場の応援頼める？", topic: "パン屋の紙袋を抱えた藍と目が合った。" },
  { id: "ac", name: "翠", good: "その分析、もう少し聞かせて", fine: "一緒に確認しよう", bad: "気合いで何とかなるだろ", topic: "翠がタブレット片手に通行量を調べている。" },
  { id: "ad", name: "こがね", good: "新作スマホケース、似合いそう", fine: "買い物中？", bad: "今日は地味だね", topic: "こがねがショーウィンドウを楽しそうに眺めている。" },
  { id: "ae", name: "琥珀", good: "そのイヤホン、音を聴かせて", fine: "元気そうだな", bad: "お化け屋敷に行こう", topic: "琥珀がスポーツショップの前で足を止めている。" },
  { id: "af", name: "真花", good: "無理しなくて大丈夫だよ", fine: "買い物かな？", bad: "男の店員さんに聞いてみよう", topic: "真花が少し困った顔で案内板を見ている。" },
  { id: "ag", name: "雪乃", good: "静かな和菓子屋に寄ってみる？", fine: "散歩中？", bad: "人混みのイベントへ行こう", topic: "雪乃が涼しげな表情で空を見上げている。" },
  { id: "ah", name: "美空", good: "夏物売場の意見を聞かせて", fine: "外回り中？", bad: "英語で案内してみて", topic: "美空が爽やかに商店街を歩いている。" },
  { id: "ai", name: "夜空", good: "加湿器の話、聞かせて", fine: "調子はどう？", bad: "お世辞でも言ってよ", topic: "夜空が静かに冬物家電のポスターを見ている。" },
  { id: "aj", name: "桃", good: "その動画企画、面白そう", fine: "撮影中？", bad: "家事の配信にしよう", topic: "桃がアクションカメラを構えている。" },
  { id: "ak", name: "彩愛", good: "その所作、すごく綺麗ですね", fine: "買い物ですか？", bad: "泳ぎに行きましょう", topic: "彩愛が商店街の掃除当番を手伝っている。" },
  { id: "al", name: "里美", good: "美味しいお菓子、探しに行く？", fine: "お疲れさま", bad: "狭い倉庫の整理を頼む", topic: "里美がお菓子屋の前で幸せそうにしている。" },
  { id: "am", name: "萌", good: "リラックスできる場所に寄ろう", fine: "大丈夫？", bad: "人の多い駅前へ行こう", topic: "萌が森林ウォーキングのパンフレットを見ている。" }
];

function tenotsuGetStamina() {
  const s = tenotsuLoadJsonStorage(TENOTSU_STAMINA_KEY, {});
  s.max = Math.max(5, Math.floor(Number(s.max) || 10));
  s.current = Math.max(0, Math.min(s.max, Math.floor(Number(s.current ?? s.max) || s.max)));
  s.updatedAt = s.updatedAt || new Date().toISOString();
  return s;
}

function tenotsuSaveStamina(stamina) {
  tenotsuSaveJsonStorage(TENOTSU_STAMINA_KEY, stamina);
}

function tenotsuUseStamina(amount) {
  const cost = Math.max(1, Math.floor(Number(amount) || 1));
  const s = tenotsuGetStamina();
  if (s.current < cost) return false;
  s.current -= cost;
  s.updatedAt = new Date().toISOString();
  tenotsuSaveStamina(s);
  return true;
}

function tenotsuRecoverStamina(amount) {
  const s = tenotsuGetStamina();
  s.current = Math.min(s.max, s.current + Math.max(1, Math.floor(Number(amount) || 1)));
  s.updatedAt = new Date().toISOString();
  tenotsuSaveStamina(s);
  return s;
}

function tenotsuGetItems() {
  const data = tenotsuLoadJsonStorage(TENOTSU_ITEM_KEY, {});
  data.items = data.items && typeof data.items === "object" ? data.items : {};
  return data;
}

function tenotsuAddItem(id, count = 1) {
  const data = tenotsuGetItems();
  data.items[id] = Math.max(0, Math.floor(Number(data.items[id]) || 0)) + Math.max(1, Math.floor(Number(count) || 1));
  tenotsuSaveJsonStorage(TENOTSU_ITEM_KEY, data);
  return data;
}

function tenotsuUseItem(id, count = 1) {
  const data = tenotsuGetItems();
  const need = Math.max(1, Math.floor(Number(count) || 1));
  const have = Math.max(0, Math.floor(Number(data.items[id]) || 0));
  if (have < need) return false;
  data.items[id] = have - need;
  tenotsuSaveJsonStorage(TENOTSU_ITEM_KEY, data);
  return true;
}

function tenotsuGetAffection() {
  const data = tenotsuLoadJsonStorage(TENOTSU_AFFECTION_KEY, {});
  data.characters = data.characters && typeof data.characters === "object" ? data.characters : {};
  return data;
}

function tenotsuAddAffection(charId, amount) {
  const data = tenotsuGetAffection();
  const current = Math.max(0, Number(data.characters[charId]) || 0);
  data.characters[charId] = Math.round((current + Number(amount || 0)) * 10) / 10;
  tenotsuSaveJsonStorage(TENOTSU_AFFECTION_KEY, data);
  return data.characters[charId];
}

function tenotsuLogAdv(entry) {
  const data = tenotsuLoadJsonStorage(TENOTSU_ADV_LOG_KEY, {});
  data.history = Array.isArray(data.history) ? data.history : [];
  data.history.unshift({ ...entry, at: new Date().toISOString() });
  data.history = data.history.slice(0, 50);
  tenotsuSaveJsonStorage(TENOTSU_ADV_LOG_KEY, data);
}

function tenotsuRandomChoice(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function tenotsuShowOuterMenu() {
  const stamina = tenotsuGetStamina();
  const items = tenotsuGetItems().items;
  tenotsuShowDynamicPanel("外回り", `
    <div class="status-card adv-card">
      <h3>外回り</h3>
      <p>スタミナ：<b>${stamina.current} / ${stamina.max}</b>　消費：${TENOTSU_OUTER_STAMINA_COST}</p>
      <p>通常遭遇率：${Math.round(TENOTSU_OUTER_BASE_ENCOUNTER * 100)}%</p>
      <p>神社のお守り：${items.encounter_charm || 0} / ひかるの眼鏡：${items.hikaru_glasses || 0}</p>
      <p>USBメモリ：${items.album_usb || 0} / SDカード：${items.review_sd || 0}</p>
      <button class="menu-item" data-engine-action="outer-start">外回りへ行く</button>
      <button class="menu-item" data-engine-action="outer-glasses">ひかるの眼鏡で気配を見る</button>
      <button class="menu-item" data-engine-action="outer-item-test">テスト：外回りアイテムを受け取る</button>
      <button class="menu-item" data-engine-action="album-remodel">アルバム改装 USBメモリ消費</button>
      <button class="menu-item" data-engine-action="review-challenge">復習チャレンジ SDカード消費</button>
      <button class="menu-item" data-engine-action="office6">戻る</button>
    </div>
  `);
}

function tenotsuStartOuterAdv() {
  if (!tenotsuUseStamina(TENOTSU_OUTER_STAMINA_COST)) {
    tenotsuShowDynamicPanel("外回り", `
      <div class="status-card adv-card">
        <h3>スタミナ不足</h3>
        <p>外回りに行くにはスタミナが足りません。</p>
        <button class="menu-item" data-engine-action="stamina-test-recover">テスト：スタミナ回復</button>
        <button class="menu-item" data-engine-action="outer-menu">戻る</button>
      </div>
    `);
    return;
  }

  let chance = TENOTSU_OUTER_BASE_ENCOUNTER;
  let charmUsed = false;
  if (tenotsuUseItem("encounter_charm", 1)) {
    chance += 0.25;
    charmUsed = true;
  }

  const encounter = Math.random() < chance;
  tenotsuAddManagerExp(encounter ? 60 : 20, encounter ? "外回り遭遇" : "外回り");
  if (!encounter) {
    const lines = [
      "……今日は誰にも会わなかったな。まあ、こういう日もあるか。",
      "外回りというより、ただの散歩になってしまった……。",
      "商店街の空気は悪くない。収穫はなかったけど、気分転換にはなったな。",
      "次は誰かに会えるといいんだけどな。"
    ];
    const line = tenotsuRandomChoice(lines);
    tenotsuLogAdv({ type: "outer_none", text: line, charmUsed });
    tenotsuShowDynamicPanel("外回り", `
      <div class="status-card adv-card">
        <h3>遭遇なし</h3>
        <p>店長「${line}」</p>
        <p>店長EXP +20${charmUsed ? " / 神社のお守りを使用" : ""}</p>
        <button class="menu-item" data-engine-action="office6">事務所へ戻る</button>
      </div>
    `);
    return;
  }

  const chara = tenotsuRandomChoice(TENOTSU_ADV_CHARACTERS);
  window.__TENOTSU_CURRENT_ADV__ = chara;
  tenotsuLogAdv({ type: "outer_encounter", charId: chara.id, charName: chara.name, charmUsed });
  tenotsuShowAdvEncounter(chara, charmUsed);
}

function tenotsuShowAdvEncounter(chara, charmUsed = false) {
  tenotsuShowDynamicPanel("外回りコミュ", `
    <div class="status-card adv-card">
      <h3>${chara.name}と遭遇</h3>
      <p>${chara.topic}</p>
      <p>どう声をかける？${charmUsed ? "<br><small>神社のお守りのご利益で出会えた気がする。</small>" : ""}</p>
      <button class="menu-item" data-engine-action="adv-answer" data-result="GOOD">${chara.good}</button>
      <button class="menu-item" data-engine-action="adv-answer" data-result="FINE">${chara.fine}</button>
      <button class="menu-item" data-engine-action="adv-answer" data-result="BAD">${chara.bad}</button>
    </div>
  `);
}

function tenotsuResolveAdvAnswer(result) {
  const chara = window.__TENOTSU_CURRENT_ADV__;
  if (!chara) {
    tenotsuShowOuterMenu();
    return;
  }

  let affection = 0;
  let albumText = "";
  if (result === "GOOD") {
    affection = 1;
    const total = tenotsuAddAffection(chara.id, 1);
    albumText = `${chara.name}との外回りコミュでGOOD。好感度が${total}になりました。`;
    tenotsuUnlockMemory(`outer_good_${chara.id}_${Date.now()}`, `${chara.name}との外回り`, albumText);
  } else if (result === "FINE") {
    affection = 0.5;
    tenotsuAddAffection(chara.id, 0.5);
    albumText = `${chara.name}との外回りコミュでFINE。`;
  } else {
    albumText = `${chara.name}との外回りコミュでBAD。`;
  }

  tenotsuLogAdv({ type: "outer_result", charId: chara.id, charName: chara.name, result, affection });
  const msg = result === "GOOD"
    ? "会話が弾んだ。思い出アルバムにも記録された。"
    : result === "FINE"
      ? "悪くない会話だった。少し距離が縮まった気がする。"
      : "今日はうまく話が噛み合わなかった。";

  window.__TENOTSU_CURRENT_ADV__ = null;

  tenotsuShowDynamicPanel("外回り結果", `
    <div class="status-card adv-card">
      <h3>${result}</h3>
      <p>${msg}</p>
      <p>好感度：${affection > 0 ? "+" + affection : "変化なし"}</p>
      <button class="menu-item" data-engine-action="office6">事務所へ戻る</button>
    </div>
  `);
}

function tenotsuUseHikaruGlasses() {
  if (!tenotsuUseItem("hikaru_glasses", 1)) {
    tenotsuShowDynamicPanel("ひかるの眼鏡", `
      <div class="status-card adv-card">
        <h3>ひかるの眼鏡</h3>
        <p>手元にありません。キャラがいるかどうかを確認できる便利アイテムです。</p>
        <button class="menu-item" data-engine-action="outer-menu">戻る</button>
      </div>
    `);
    return;
  }
  const likely = Math.random() < 0.65;
  tenotsuShowDynamicPanel("ひかるの眼鏡", `
    <div class="status-card adv-card">
      <h3>ひかるの眼鏡</h3>
      <p>${likely ? "今日は誰かがいそうです。" : "今はあまり気配がありません。"}</p>
      <p><small>次の外回り判断に使えます。</small></p>
      <button class="menu-item" data-engine-action="outer-menu">戻る</button>
    </div>
  `);
}

function tenotsuAlbumRemodel() {
  if (!tenotsuUseItem("album_usb", 1)) {
    tenotsuShowDynamicPanel("アルバム改装", `
      <div class="status-card adv-card">
        <h3>USBメモリ不足</h3>
        <p>アルバム改装にはUSBメモリが必要です。</p>
        <button class="menu-item" data-engine-action="outer-menu">戻る</button>
      </div>
    `);
    return;
  }
  tenotsuUnlockMemory("album_remodel_001", "アルバム改装", "USBメモリを使って、思い出アルバムを整理しました。");
  tenotsuShowAlbum();
}

function tenotsuReviewChallenge() {
  if (!tenotsuUseItem("review_sd", 1)) {
    tenotsuShowDynamicPanel("復習チャレンジ", `
      <div class="status-card adv-card">
        <h3>SDカード不足</h3>
        <p>復習チャレンジにはSDカードが必要です。</p>
        <button class="menu-item" data-engine-action="outer-menu">戻る</button>
      </div>
    `);
    return;
  }
  tenotsuAddManagerExp(120, "復習チャレンジ");
  tenotsuUnlockMemory("review_challenge_001", "復習チャレンジ", "SDカードを使って、過去の思い出を復習しました。");
  tenotsuShowAlbum();
}

function tenotsuGrantOuterTestItems() {
  tenotsuAddItem("encounter_charm", 3);
  tenotsuAddItem("hikaru_glasses", 2);
  tenotsuAddItem("album_usb", 2);
  tenotsuAddItem("review_sd", 2);
  tenotsuUnlockMemory("outer_items_test", "外回り道具セット", "神社のお守り、ひかるの眼鏡、USBメモリ、SDカードを受け取りました。");
  tenotsuShowOuterMenu();
}
/* /v037_85 outer ADV / encounter / affection / item helpers */


/* v037_85: 左メニューをダブルクリックからクリックプレス/タップホールドへ変更 */
(function setupTenotsuLongPressMenu() {
  if (window.__TENOTSU_LONG_PRESS_MENU_READY__) return;
  window.__TENOTSU_LONG_PRESS_MENU_READY__ = true;

  const HOLD_MS = 620;
  let holdTimer = null;
  let holdStart = null;
  let moved = false;

  function isBattleArea(target) {
    return !!(target && target.closest && target.closest("#battle-root"));
  }

  function clearHold() {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
    holdStart = null;
    moved = false;
  }

  function openHoldMenu() {
    if (window.__TENOTSU_UI_POINTER_ACTIVE__) { clearHold(); return; }
    clearHold();
    if (typeof window.tenotsuOpenLeftOfficeMenu === "function") {
      window.tenotsuOpenLeftOfficeMenu();
    } else if (typeof window.loadList === "function") {
      window.loadList("office6.json");
    }
  }

  document.addEventListener("dblclick", (event) => {
    // v037_85以降、左メニューはダブルクリックでは出さない。
    // 通常の会話進行ダブルクリックやバトル側処理を潰しすぎないため、バトル内は無視。
    if (!isBattleArea(event.target)) {
      event.stopPropagation();
      event.preventDefault();
    }
  }, true);

  document.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    if (isBattleArea(event.target)) return;
    if (event.target.closest && event.target.closest("button, a, input, select, textarea, [data-engine-action], .menu-item, .list-item, #menu-panel, #list-panel, .status-card, .memory-card, .memory-table-wrap, .story-management-surface, .center-surface-window, .secret-word-card")) return;

    holdStart = { x: event.clientX, y: event.clientY, t: Date.now() };
    moved = false;
    holdTimer = setTimeout(openHoldMenu, HOLD_MS);
  }, true);

  document.addEventListener("pointermove", (event) => {
    if (!holdStart) return;
    const dx = Math.abs(event.clientX - holdStart.x);
    const dy = Math.abs(event.clientY - holdStart.y);
    if (dx > 16 || dy > 16) {
      moved = true;
      clearHold();
    }
  }, true);

  document.addEventListener("pointerup", clearHold, true);
  document.addEventListener("pointercancel", clearHold, true);
})();
/* /v037_85 */

/* v037_85: 思い出アルバム / イベントCG鑑賞 */
async function tenotsuLoadEventCgAlbumData() {
  if (window.__TENOTSU_EVENT_CG_ALBUM__) return window.__TENOTSU_EVENT_CG_ALBUM__;
  const data = await safeFetchJson("scenario/data/event_cg_album.json?t=" + Date.now(), "event_cg_album.json");
  window.__TENOTSU_EVENT_CG_ALBUM__ = data;
  return data;
}

async function tenotsuShowMemoryAlbum() {
  const data = await tenotsuLoadEventCgAlbumData();
  const items = Array.isArray(data.items) ? data.items : [];
  const cards = items.map(item => {
    const isUnlocked = item.isUnlocked !== false;
    const thumb = isUnlocked ? (item.thumbnailColor || item.path) : (item.thumbnailMono || item.thumbnailColor || item.path);
    const mono = item.thumbnailMono || "";
    const scenarioButton = item.scenario ? `<button class="mini-action" data-engine-action="album-story-play" data-scenario="${item.scenario}" data-character-id="${item.characterId || "manager"}">シナリオ再生</button>` : "";
    return `
      <div class="album-card ${isUnlocked ? "unlocked" : "locked"}">
        <button class="album-thumb" data-engine-action="event-cg-view" data-cg-path="${item.path}" data-cg-title="${item.title}" data-cg-scenario="${item.scenario || ""}" data-character-id="${item.characterId || "manager"}">
          <img src="${thumb}" alt="${item.title}" loading="lazy">
          <span>${item.title}</span>
        </button>
        <div class="album-card-meta">
          <span>${item.characterName || item.type || "CG"}</span>
          ${mono ? `<span class="album-mono-note">モノクロサムネ登録済</span>` : ""}
        </div>
        <div class="album-card-actions">
          <button class="mini-action" data-engine-action="event-cg-view" data-cg-path="${item.path}" data-cg-title="${item.title}" data-cg-scenario="${item.scenario || ""}" data-character-id="${item.characterId || "manager"}">CG鑑賞</button>
          ${scenarioButton}
        </div>
      </div>
    `;
  }).join("");

  tenotsuShowCenterSurface("思い出アルバム", `
    <div class="status-card memory-card memory-album-surface">
      <h3>思い出アルバム</h3>
      <p class="surface-note">イベントCG鑑賞モードです。カラー/モノクロサムネとシナリオ再生を管理します。</p>
      <div class="album-grid">
        ${cards || "<p>表示できるイベントCGがまだありません。</p>"}
      </div>
      <button class="menu-item" data-engine-action="members">メンバーへ戻る</button>
    </div>
  `);
}

function tenotsuShowEventCgViewer(path, title, scenario = "", characterId = "manager") {
  const playButton = scenario ? `<button class="menu-item" data-engine-action="album-story-play" data-scenario="${scenario}" data-character-id="${characterId || "manager"}">この思い出を再生</button>` : "";
  tenotsuShowCenterSurface(title || "イベントCG", `
    <div class="status-card memory-card event-cg-viewer">
      <img src="${path}" alt="${title || "イベントCG"}">
      <div class="event-cg-caption">${title || ""}</div>
      ${playButton}
      <button class="menu-item" data-engine-action="memory-album">思い出アルバムへ戻る</button>
    </div>
  `);
}
/* /v037_85 */



/* v037_85: 左メニュー内容 / 思い出ストーリー管理 */
const TENOTSU_STORY_MASTER = [
  {
    "characterId": "manager",
    "characterName": "店長",
    "storyId": "tutorial_001",
    "title": "チュートリアル",
    "type": "tutorial",
    "unlock": "初期",
    "album": true,
    "scenario": "000start.json"
  },
  {
    "characterId": "manager",
    "characterName": "店長",
    "storyId": "prologue_001",
    "title": "プロローグ",
    "type": "prologue",
    "unlock": "初期",
    "album": true,
    "scenario": "gamestart.json"
  },
  {
    "characterId": "aa",
    "characterName": "緋奈",
    "storyId": "aa_intro_001",
    "title": "緋奈の自己紹介",
    "type": "intro",
    "unlock": "初期",
    "album": true,
    "scenario": "intro_hina.json"
  },
  {
    "characterId": "aa",
    "characterName": "緋奈",
    "storyId": "aa_memory_spring_bento_001",
    "title": "春の公園でのお弁当タイム",
    "type": "memory",
    "unlock": "思い出アルバム解放",
    "album": true,
    "scenario": "memory_hina_spring_bento.json",
    "cg": "images/assets/cg/aa_memory_spring_bento_cg.png",
    "thumbnailColor": "images/assets/thumb/aa_memory_spring_bento_thumb_color.png",
    "thumbnailMono": "images/assets/thumb/aa_memory_spring_bento_thumb_mono.png"
  },
  {
    "characterId": "aa",
    "characterName": "緋奈",
    "storyId": "aa_outer_001",
    "title": "外回り：緋奈",
    "type": "outer",
    "unlock": "GOODで思い出追加",
    "album": false,
    "scenario": ""
  },
  {
    "characterId": "ab",
    "characterName": "藍",
    "storyId": "ab_intro_001",
    "title": "藍の自己紹介",
    "type": "intro",
    "unlock": "初期",
    "album": true,
    "scenario": "intro_ai.json"
  },
  {
    "characterId": "ab",
    "characterName": "藍",
    "storyId": "ab_memory_spring_book_bread_001",
    "title": "桜木陰のしおり",
    "type": "memory",
    "unlock": "思い出アルバム解放",
    "album": true,
    "scenario": "memory_ai_spring_book_bread.json",
    "cg": "images/assets/cg/ab_memory_spring_book_bread_close_cg.png",
    "thumbnailColor": "images/assets/thumb/ab_memory_spring_book_bread_close_thumb_color.png",
    "thumbnailMono": "images/assets/thumb/ab_memory_spring_book_bread_close_thumb_mono.png"
  },
  {
    "characterId": "ab",
    "characterName": "藍",
    "storyId": "ab_outer_001",
    "title": "外回り：藍",
    "type": "outer",
    "unlock": "GOODで思い出追加",
    "album": false,
    "scenario": ""
  },
  {
    "characterId": "ac",
    "characterName": "翠",
    "storyId": "ac_intro_001",
    "title": "翠の自己紹介",
    "type": "intro",
    "unlock": "初期",
    "album": true,
    "scenario": "intro_midori.json"
  },
  {
    "characterId": "ac",
    "characterName": "翠",
    "storyId": "ac_outer_001",
    "title": "外回り：翠",
    "type": "outer",
    "unlock": "GOODで思い出追加",
    "album": false,
    "scenario": ""
  },
  {
    "characterId": "ad",
    "characterName": "こがね",
    "storyId": "ad_intro_001",
    "title": "こがねの自己紹介",
    "type": "intro",
    "unlock": "初期",
    "album": true,
    "scenario": "intro_kogane.json"
  },
  {
    "characterId": "ad",
    "characterName": "こがね",
    "storyId": "ad_outer_001",
    "title": "外回り：こがね",
    "type": "outer",
    "unlock": "GOODで思い出追加",
    "album": false,
    "scenario": ""
  },
  {
    "characterId": "ae",
    "characterName": "琥珀",
    "storyId": "ae_intro_001",
    "title": "琥珀の自己紹介",
    "type": "intro",
    "unlock": "初期",
    "album": true,
    "scenario": "intro_kohaku.json"
  },
  {
    "characterId": "ae",
    "characterName": "琥珀",
    "storyId": "ae_outer_001",
    "title": "外回り：琥珀",
    "type": "outer",
    "unlock": "GOODで思い出追加",
    "album": false,
    "scenario": ""
  },
  {
    "characterId": "af",
    "characterName": "真花",
    "storyId": "af_intro_001",
    "title": "真花の自己紹介",
    "type": "intro",
    "unlock": "初期",
    "album": true,
    "scenario": "intro_manaka.json"
  },
  {
    "characterId": "af",
    "characterName": "真花",
    "storyId": "af_outer_001",
    "title": "外回り：真花",
    "type": "outer",
    "unlock": "GOODで思い出追加",
    "album": false,
    "scenario": ""
  },
  {
    "characterId": "ag",
    "characterName": "雪乃",
    "storyId": "ag_intro_001",
    "title": "雪乃の自己紹介",
    "type": "intro",
    "unlock": "初期",
    "album": true,
    "scenario": "intro_yukino.json"
  },
  {
    "characterId": "ag",
    "characterName": "雪乃",
    "storyId": "ag_outer_001",
    "title": "外回り：雪乃",
    "type": "outer",
    "unlock": "GOODで思い出追加",
    "album": false,
    "scenario": ""
  },
  {
    "characterId": "ah",
    "characterName": "美空",
    "storyId": "ah_intro_001",
    "title": "美空の自己紹介",
    "type": "intro",
    "unlock": "初期",
    "album": true,
    "scenario": "intro_misora.json"
  },
  {
    "characterId": "ah",
    "characterName": "美空",
    "storyId": "ah_outer_001",
    "title": "外回り：美空",
    "type": "outer",
    "unlock": "GOODで思い出追加",
    "album": false,
    "scenario": ""
  },
  {
    "characterId": "ai",
    "characterName": "夜空",
    "storyId": "ai_intro_001",
    "title": "夜空の自己紹介",
    "type": "intro",
    "unlock": "初期",
    "album": true,
    "scenario": "intro_yozora.json"
  },
  {
    "characterId": "ai",
    "characterName": "夜空",
    "storyId": "ai_outer_001",
    "title": "外回り：夜空",
    "type": "outer",
    "unlock": "GOODで思い出追加",
    "album": false,
    "scenario": ""
  },
  {
    "characterId": "aj",
    "characterName": "桃",
    "storyId": "aj_intro_001",
    "title": "桃の自己紹介",
    "type": "intro",
    "unlock": "初期",
    "album": true,
    "scenario": "intro_momo.json"
  },
  {
    "characterId": "aj",
    "characterName": "桃",
    "storyId": "aj_outer_001",
    "title": "外回り：桃",
    "type": "outer",
    "unlock": "GOODで思い出追加",
    "album": false,
    "scenario": ""
  },
  {
    "characterId": "ak",
    "characterName": "彩愛",
    "storyId": "ak_intro_001",
    "title": "彩愛の自己紹介",
    "type": "intro",
    "unlock": "初期",
    "album": true,
    "scenario": "intro_ayame.json"
  },
  {
    "characterId": "ak",
    "characterName": "彩愛",
    "storyId": "ak_outer_001",
    "title": "外回り：彩愛",
    "type": "outer",
    "unlock": "GOODで思い出追加",
    "album": false,
    "scenario": ""
  },
  {
    "characterId": "al",
    "characterName": "里美",
    "storyId": "al_intro_001",
    "title": "里美の自己紹介",
    "type": "intro",
    "unlock": "初期",
    "album": true,
    "scenario": "intro_satomi.json"
  },
  {
    "characterId": "al",
    "characterName": "里美",
    "storyId": "al_outer_001",
    "title": "外回り：里美",
    "type": "outer",
    "unlock": "GOODで思い出追加",
    "album": false,
    "scenario": ""
  },
  {
    "characterId": "am",
    "characterName": "萌",
    "storyId": "am_intro_001",
    "title": "萌の自己紹介",
    "type": "intro",
    "unlock": "初期",
    "album": true,
    "scenario": "intro_moe.json"
  },
  {
    "characterId": "am",
    "characterName": "萌",
    "storyId": "am_outer_001",
    "title": "外回り：萌",
    "type": "outer",
    "unlock": "GOODで思い出追加",
    "album": false,
    "scenario": ""
  }
];

function tenotsuGetStoryMaster() {
  return TENOTSU_STORY_MASTER.slice();
}

function tenotsuGetStoriesByCharacter() {
  const grouped = {};
  TENOTSU_STORY_MASTER.forEach(story => {
    if (!grouped[story.characterId]) grouped[story.characterId] = { characterId: story.characterId, characterName: story.characterName, stories: [] };
    grouped[story.characterId].stories.push(story);
  });
  return grouped;
}

function tenotsuOpenLeftOfficeMenu() {
  // v037_85: 左は旧システムメニュー(menu01)専用。
  const listPanel = document.getElementById("list-panel");
  if (listPanel) listPanel.classList.add("hidden");
  if (typeof window.loadMenu === "function") {
    window.loadMenu("menu01.json");
    return;
  }
  const html = `
    <div class="left-office-menu left-system-menu">
      <div class="left-office-menu-title">システムメニュー</div>
      <div class="left-office-grid">
        <button class="menu-item" data-engine-action="office6">メインメニュー</button>
        <button class="menu-item" data-engine-action="cacheclear">キャッシュ削除</button>
      </div>
    </div>
  `;
  tenotsuShowDynamicPanel("左メニュー", html);
}

function tenotsuShowMemoryCharacterList() {
  const grouped = tenotsuGetStoriesByCharacter();
  const order = ["manager","aa","ab","ac","ad","ae","af","ag","ah","ai","aj","ak","al","am"];
  const buttons = order
    .filter(id => grouped[id])
    .map(id => {
      const g = grouped[id];
      return `<button class="menu-item" data-engine-action="memory-character" data-character-id="${g.characterId}">${g.characterName}の思い出 <small>${g.stories.length}件</small></button>`;
    })
    .join("");

  tenotsuShowDynamicPanel("思い出", `
    <div class="status-card memory-card">
      <h3>思い出アルバム</h3>
      <p>先頭は店長の思い出です。チュートリアルやプロローグをここに整理します。</p>
      ${buttons}
      <button class="menu-item" data-engine-action="members">戻る</button>
    </div>
  `);
}

function tenotsuShowMemoryCharacterStories(characterId) {
  window.__TENOTSU_LAST_MEMORY_CHARACTER__ = characterId || "manager";
  const grouped = tenotsuGetStoriesByCharacter();
  const group = grouped[characterId] || grouped.manager;
  const affection = tenotsuGetAffection ? tenotsuGetAffection().characters || {} : {};
  const album = tenotsuGetAlbum ? tenotsuGetAlbum() : { memories: [] };

  const rows = group.stories.map(story => {
    const albumHit = story.album || album.memories.some(m => (m.id || "").includes(story.characterId) || (m.title || "").includes(story.characterName));
    const fav = story.characterId === "manager" ? "-" : (affection[story.characterId] ?? 0);
    const playButton = story.scenario
      ? `<button class="mini-action" data-engine-action="memory-play" data-scenario="${story.scenario}" data-character-id="${story.characterId}">再生</button>`
      : `<button class="mini-action" disabled>未実装</button>`;
    return `
      <tr>
        <td>${story.title}</td>
        <td>${story.type}</td>
        <td>${story.unlock}</td>
        <td>${fav}</td>
        <td>${albumHit ? "登録済" : "未登録"}</td>
        <td>${playButton}</td>
      </tr>
    `;
  }).join("");

  tenotsuShowDynamicPanel(`${group.characterName}の思い出`, `
    <div class="status-card memory-card">
      <h3>${group.characterName}の思い出</h3>
      <div class="memory-table-wrap">
        <table class="memory-table">
          <thead>
            <tr>
              <th>ストーリー</th>
              <th>種別</th>
              <th>開放条件</th>
              <th>好感度</th>
              <th>アルバム</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <button class="menu-item" data-engine-action="title-return-archive">タイトル後メニュー</button>
      <button class="menu-item" data-engine-action="title-return-archive">タイトル後メニュー</button>
      <button class="menu-item" data-engine-action="memory-list">思い出アルバムへ</button>
      <button class="menu-item" data-engine-action="members">メンバーへ戻る</button>
    </div>
  `);
}

function tenotsuShowStoryManagementTable() {
  const rows = TENOTSU_STORY_MASTER.map(story => `
    <tr>
      <td>${story.characterName}</td>
      <td>${story.storyId}</td>
      <td>${story.title}</td>
      <td>${story.type}</td>
      <td>${story.unlock}</td>
      <td>${story.scenario || "-"}</td>
    </tr>
  `).join("");

  tenotsuShowCenterSurface("ストーリー管理表", `
    <div class="status-card memory-card story-management-surface center-between-side-menus">
      <h3>メンバーごとの思い出表</h3>
      <p class="surface-note">左メニューと右メニューの間に表示しています。表内はスクロールできます。</p>
      <div class="memory-table-wrap">
        <table class="memory-table">
          <thead>
            <tr>
              <th>対象</th>
              <th>ID</th>
              <th>タイトル</th>
              <th>種別</th>
              <th>開放条件</th>
              <th>シナリオ</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <button class="menu-item" data-engine-action="memory-album">思い出アルバムへ</button>
      <button class="menu-item" data-engine-action="members">メンバーへ戻る</button>
    </div>
  `);
}
/* /v037_85 */


/* v037_85: 「タイトルに戻る」後メニューをメンバー配下へ移設 */
function tenotsuShowTitleReturnMenuArchive() {
  tenotsuShowDynamicPanel("タイトルメニュー保管", `
    <div class="status-card memory-card">
      <h3>タイトルに戻る後メニュー</h3>
      <p>以前「タイトルに戻る」後に表示していたメニューです。今後は、6大メニュー ＞ メンバー ＞ メンバー一覧/ストーリー管理表 から確認できます。</p>
      <button class="menu-item" data-engine-action="office6">6大メニューへ戻る</button>
      <button class="menu-item" data-engine-action="memory-album">思い出アルバム</button>
      <button class="menu-item" data-engine-action="story-table">ストーリー管理表</button>
      <button class="menu-item" data-engine-action="member-list">メンバー一覧</button>
      <button class="menu-item" data-engine-action="battle">店舗営業プロトタイプ</button>
      <button class="menu-item" data-engine-action="outer-menu">外回り</button>
      <button class="menu-item" data-engine-action="shop">ショップ</button>
      <button class="menu-item" data-engine-action="settings">設定</button>
    </div>
  `);
}

function tenotsuShowMemberListMenu() {
  const order = [
    ["manager", "店長"],
    ["aa", "星野 緋奈"],
    ["ab", "速水川 藍"],
    ["ac", "草壁 翠"],
    ["ad", "小麦沢 こがね"],
    ["ae", "春日原 琥珀"],
    ["af", "大道寺 真花"],
    ["ag", "氷神 雪乃"],
    ["ah", "双沢 美空"],
    ["ai", "双沢 夜空"],
    ["aj", "芝桜 桃"],
    ["ak", "紫藤 彩愛"],
    ["al", "餅月 里美"],
    ["am", "草壁 萌"]
  ];

  const buttons = order.map(([id, name]) => `
    <button class="menu-item" data-engine-action="memory-character" data-character-id="${id}">${name}</button>
  `).join("");

  tenotsuShowDynamicPanel("メンバー一覧", `
    <div class="status-card memory-card">
      <h3>メンバー一覧</h3>
      <p>キャラクターごとの思い出/ストーリー管理へ移動します。先頭は店長です。</p>
      ${buttons}
      <button class="menu-item" data-engine-action="title-return-archive">タイトル後メニュー</button>
      <button class="menu-item" data-engine-action="story-table">ストーリー管理表</button>
      <button class="menu-item" data-engine-action="members">戻る</button>
    </div>
  `);
}
/* /v037_85 */


/* v037_85: ストーリー終了後に元メニューへフェード復帰 */
window.__TENOTSU_RETURN_MENU_STACK__ = window.__TENOTSU_RETURN_MENU_STACK__ || [];
window.__TENOTSU_STORY_ENDING__ = false;

function tenotsuPushReturnMenu(kind, value) {
  window.__TENOTSU_RETURN_MENU_STACK__ = window.__TENOTSU_RETURN_MENU_STACK__ || [];
  const last = window.__TENOTSU_RETURN_MENU_STACK__[window.__TENOTSU_RETURN_MENU_STACK__.length - 1];
  if (last && last.kind === kind && last.value === value) return;
  window.__TENOTSU_RETURN_MENU_STACK__.push({ kind, value });
  window.__TENOTSU_RETURN_MENU_STACK__ = window.__TENOTSU_RETURN_MENU_STACK__.slice(-10);
}

function tenotsuReturnToPreviousMenu() {
  const stack = window.__TENOTSU_RETURN_MENU_STACK__ || [];
  const target = stack.pop() || { kind: "list", value: "office6.json" };
  window.__TENOTSU_RETURN_MENU_STACK__ = stack;

  if (target.kind === "memory-character") {
    tenotsuShowMemoryCharacterStories(target.value || "manager");
  } else if (target.kind === "members") {
    tenotsuShowMemberMenu();
  } else if (target.kind === "memory-list") {
    tenotsuShowMemoryCharacterList();
  } else if (target.kind === "memory-album") {
    tenotsuShowMemoryAlbum();
  } else if (target.kind === "story-table") {
    tenotsuShowStoryManagementTable();
  } else if (target.kind === "left-menu") {
    tenotsuOpenLeftOfficeMenu();
  } else if (target.kind === "list" && typeof window.loadList === "function") {
    window.loadList(target.value || "office6.json");
  } else if (target.kind === "menu" && typeof window.loadMenu === "function") {
    window.loadMenu(target.value || "menu01.json");
  } else {
    if (typeof window.loadList === "function") window.loadList("office6.json");
  }
}

function tenotsuHandleStoryEndReturn() {
  if (window.__TENOTSU_STORY_ENDING__) return;
  window.__TENOTSU_STORY_ENDING__ = true;

  try {
    if (typeof randomImagesOff === "function") randomImagesOff();
    if (typeof randomTextsOff === "function") randomTextsOff();
  } catch (_) {}

  const dialogueBox = document.getElementById("dialogue-box");
  const textBox = document.getElementById("text");
  const nameBox = document.getElementById("name");
  const clickLayer = document.getElementById("click-layer");

  if (nameBox) nameBox.textContent = "";
  if (textBox) textBox.innerHTML = "（物語は つづく・・・）";
  if (dialogueBox) {
    dialogueBox.classList.remove("hidden");
    dialogueBox.classList.remove("story-end-fadeout");
  }
  if (clickLayer) clickLayer.style.pointerEvents = "none";

  window.setTimeout(() => {
    if (dialogueBox) dialogueBox.classList.add("story-end-fadeout");
  }, 700);

  window.setTimeout(() => {
    if (dialogueBox) {
      dialogueBox.classList.remove("story-end-fadeout");
      dialogueBox.classList.add("hidden");
    }
    if (clickLayer) clickLayer.style.pointerEvents = "auto";
    window.__TENOTSU_STORY_ENDING__ = false;
    tenotsuReturnToPreviousMenu();
  }, 1350);
}
/* /v037_85 */


/* v037_85: タイトルタイル表示後も右メニューを6大メニュー固定 */
window.__TENOTSU_MAIN_MENU_LOCK__ = window.__TENOTSU_MAIN_MENU_LOCK__ || false;

function tenotsuLockMainMenu() {
  window.__TENOTSU_MAIN_MENU_LOCK__ = true;
}

function tenotsuUnlockMainMenu() {
  window.__TENOTSU_MAIN_MENU_LOCK__ = false;
}

function tenotsuEnsureOfficeSixMenuVisible() {
  const listPanel = document.getElementById("list-panel");
  const menuPanel = document.getElementById("menu-panel");
  const battleRoot = document.getElementById("battle-root");
  if (battleRoot && !battleRoot.classList.contains("hidden")) return;
  if (typeof window.loadList === "function") {
    const menuPanel = document.getElementById("menu-panel");
    if (menuPanel) menuPanel.classList.add("hidden");
    window.loadList("office6.json");
    tenotsuLockMainMenu();
  }
}
/* /v037_85 */


/* v037_85 randomImagesOn office6 reassert wrapper */
window.addEventListener("load", () => {
  window.setTimeout(() => {
    if (typeof window.randomImagesOn === "function" && !window.__TENOTSU_RANDOM_WRAPPED__) {
      const originalRandomImagesOn = window.randomImagesOn;
      window.randomImagesOn = function wrappedRandomImagesOn(...args) {
        const result = originalRandomImagesOn.apply(this, args);
        window.setTimeout(() => {
          if (window.__TENOTSU_MAIN_MENU_LOCK__) tenotsuEnsureOfficeSixMenuVisible();
        }, 120);
        return result;
      };
      window.__TENOTSU_RANDOM_WRAPPED__ = true;
    }
  }, 0);
});
/* /v037_85 */


/* v037_85: ショップ 秘密の言葉 */
const TENOTSU_SECRET_WORD_KEY = "tenotsu_secret_words_v1";

const TENOTSU_SECRET_WORDS = {
  "てんおつ": {
    id: "tenotsu_start",
    title: "店長お疲れ様です",
    message: "秘密の言葉を確認しました。店長EXP +300、売上 +3000円。",
    exp: 300,
    sales: 3000,
    items: { encounter_charm: 2, album_usb: 1 }
  },
  "ひだまり": {
    id: "hidamari_bonus",
    title: "ひだまりボーナス",
    message: "ひだまりストアからの支給品です。売上 +5000円。",
    exp: 100,
    sales: 5000,
    items: { review_sd: 1 }
  },
  "おつかれさま": {
    id: "otsukaresama",
    title: "お疲れ様ボーナス",
    message: "日々の頑張りが認められました。店長EXP +500。",
    exp: 500,
    sales: 1000,
    items: { hikaru_glasses: 1 }
  },
  "つくも": {
    id: "tsukumo_support",
    title: "テックラボつくも支援",
    message: "テックラボつくもから便利道具が届きました。",
    exp: 150,
    sales: 2000,
    items: { album_usb: 2, review_sd: 1 }
  }
};

function tenotsuNormalizeSecretWord(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[ 　]/g, "")
    .replace(/[！!？?。.,、]/g, "");
}

function tenotsuGetSecretWordData() {
  const data = tenotsuLoadJsonStorage(TENOTSU_SECRET_WORD_KEY, {});
  data.used = Array.isArray(data.used) ? data.used : [];
  data.history = Array.isArray(data.history) ? data.history : [];
  return data;
}

function tenotsuSaveSecretWordData(data) {
  tenotsuSaveJsonStorage(TENOTSU_SECRET_WORD_KEY, data);
}

function tenotsuGrantSecretReward(def) {
  if (!def) return false;
  if (def.exp) tenotsuAddManagerExp(def.exp, "秘密の言葉");
  if (def.sales && typeof TenotsuEconomy !== "undefined" && TenotsuEconomy.addSales) {
    TenotsuEconomy.addSales(def.sales, "秘密の言葉");
  } else if (def.sales) {
    const e = tenotsuGetEconomy();
    e.totalSales += def.sales;
    e.availableSales += def.sales;
    e.history.unshift({ type: "sales", source: "秘密の言葉", amount: def.sales, at: new Date().toISOString() });
    e.history = e.history.slice(0, 30);
    tenotsuSaveJsonStorage(TENOTSU_ECONOMY_KEY, e);
  }
  if (def.items) {
    Object.entries(def.items).forEach(([id, count]) => tenotsuAddItem(id, count));
  }
  tenotsuUnlockMemory("secret_word_" + def.id, "秘密の言葉：" + def.title, def.message);
  return true;
}

function tenotsuShowSecretWordMenu(message = "") {
  const data = tenotsuGetSecretWordData();
  tenotsuShowDynamicPanel("秘密の言葉", `
    <div class="status-card secret-word-card">
      <h3>秘密の言葉</h3>
      <p>特定キーワードを入力すると、アイテムやボーナスがもらえます。</p>
      ${message ? `<p class="secret-word-message">${message}</p>` : ""}
      <input id="secret-word-input" class="secret-word-input" type="text" autocomplete="off" placeholder="秘密の言葉を入力">
      <button class="menu-item" data-engine-action="secret-word-submit">確認する</button>
      <button class="menu-item" data-engine-action="secret-word-hint">ヒントを見る</button>
      <button class="menu-item" data-engine-action="shop">ショップへ戻る</button>
      <p class="secret-word-used">使用済み：${data.used.length}件</p>
    </div>
  `);
  window.setTimeout(() => {
    const input = document.getElementById("secret-word-input");
    if (input) input.focus();
  }, 50);
}

function tenotsuSubmitSecretWord() {
  const input = document.getElementById("secret-word-input");
  const raw = input ? input.value : "";
  const key = tenotsuNormalizeSecretWord(raw);
  const def = TENOTSU_SECRET_WORDS[key];
  const data = tenotsuGetSecretWordData();

  if (!key) {
    tenotsuShowSecretWordMenu("言葉が入力されていません。");
    return;
  }
  if (!def) {
    tenotsuShowSecretWordMenu("その言葉では何も起きませんでした。");
    return;
  }
  if (data.used.includes(def.id)) {
    tenotsuShowSecretWordMenu("この秘密の言葉はすでに使用済みです。");
    return;
  }

  tenotsuGrantSecretReward(def);
  data.used.push(def.id);
  data.history.unshift({ id: def.id, word: key, at: new Date().toISOString() });
  data.history = data.history.slice(0, 30);
  tenotsuSaveSecretWordData(data);
  tenotsuShowSecretWordMenu(def.message);
}

function tenotsuShowSecretWordHint() {
  tenotsuShowSecretWordMenu("ヒント：店長へのあいさつ、店の名前、協力店の名前など。");
}
/* /v037_85 */


/* v037_85: キャラクター表情マスター */
const TENOTSU_EXPRESSION_MASTER_PATH = "scenario/data/character_expressions.json";
window.__TENOTSU_EXPRESSION_MASTER__ = window.__TENOTSU_EXPRESSION_MASTER__ || null;

async function tenotsuLoadExpressionMaster() {
  if (window.__TENOTSU_EXPRESSION_MASTER__) return window.__TENOTSU_EXPRESSION_MASTER__;
  const data = await safeFetchJson(TENOTSU_EXPRESSION_MASTER_PATH + "?t=" + Date.now(), "character_expressions.json");
  window.__TENOTSU_EXPRESSION_MASTER__ = data;
  return data;
}

function tenotsuExpressionFile(characterId, expressionNo = "01", variantNo = "01") {
  const master = window.__TENOTSU_EXPRESSION_MASTER__;
  if (!master || !master.assets || !master.assets[characterId]) return "";
  const exp = master.assets[characterId].expressions[String(expressionNo).padStart(2, "0")];
  return exp ? exp.engineSrc : "";
}

function tenotsuExpressionPath(characterId, expressionNo = "01", variantNo = "01") {
  const file = tenotsuExpressionFile(characterId, expressionNo, variantNo);
  return file ? (config.charPath + file) : "";
}

async function tenotsuShowExpressionCharacter(characterId) {
  const master = await tenotsuLoadExpressionMaster();
  const char = master.assets[characterId];
  if (!char) {
    tenotsuShowDynamicPanel("表情マスター", `<div class="status-card"><p>表情データがありません。</p><button class="menu-item" data-engine-action="members">戻る</button></div>`);
    return;
  }

  const rows = Object.entries(char.expressions).map(([no, exp]) => `
    <tr>
      <td>${no}</td>
      <td>${exp.label}</td>
      <td><code>${exp.file}</code></td>
      <td>${exp.exists ? "配置済" : "未配置"}</td>
    </tr>
  `).join("");

  tenotsuShowDynamicPanel(`${char.fullName} 表情一覧`, `
    <div class="status-card memory-card">
      <h3>${char.fullName} 表情一覧</h3>
      <p>命名規則：${char.base}+表情番号+01.webp</p>
      <div class="memory-table-wrap">
        <table class="memory-table">
          <thead><tr><th>No</th><th>表情</th><th>ファイル</th><th>状態</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <button class="menu-item" data-engine-action="expression-master">表情マスターへ</button>
      <button class="menu-item" data-engine-action="members">メンバーへ戻る</button>
    </div>
  `);
}

async function tenotsuShowExpressionMasterMenu() {
  const master = await tenotsuLoadExpressionMaster();
  const buttons = Object.entries(master.assets).map(([id, char]) => `
    <button class="menu-item" data-engine-action="expression-character" data-character-id="${id}">${char.fullName}</button>
  `).join("");
  tenotsuShowDynamicPanel("表情マスター", `
    <div class="status-card memory-card">
      <h3>表情マスター</h3>
      <p>01澄まし / 02微笑み / 03怒り / 04悲しみ / 05笑顔 / 06驚き / 07照れ / 08期待 / 09得意げ / 10軽い嫌悪 / 11心配不安 / 12動揺</p>
      ${buttons}
      <button class="menu-item" data-engine-action="members">戻る</button>
    </div>
  `);
}
/* /v037_85 */


/* v037_85: オートプレイ実行補強 */
window.__TENOTSU_AUTO_TIMER__ = null;
window.__TENOTSU_AUTO_DELAY_MS__ = 1450;

function tenotsuStopAutoPlayTimer() {
  if (window.__TENOTSU_AUTO_TIMER__) {
    clearTimeout(window.__TENOTSU_AUTO_TIMER__);
    window.__TENOTSU_AUTO_TIMER__ = null;
  }
}

function tenotsuScheduleAutoPlay() {
  tenotsuStopAutoPlayTimer();
  if (!isAutoMode) return;
  if (choicesEl && choicesEl.children && choicesEl.children.length > 0) return;
  const battleRoot = document.getElementById("battle-root");
  if (battleRoot && !battleRoot.classList.contains("hidden")) return;

  // 人物登場・画像ロード中でも、文章が終わっていれば進行できるようにする。
  const delay = Number(window.__TENOTSU_AUTO_DELAY_MS__ || autoWaitTime || 1450);
  window.__TENOTSU_AUTO_TIMER__ = setTimeout(() => {
    window.__TENOTSU_AUTO_TIMER__ = null;
    if (!isAutoMode) return;
    if (choicesEl && choicesEl.children && choicesEl.children.length > 0) return;
    const battleRoot2 = document.getElementById("battle-root");
    if (battleRoot2 && !battleRoot2.classList.contains("hidden")) return;

    // タイピング中だけ待つ。人物画像のロード状態では止めない。
    if (isPlaying) {
      tenotsuScheduleAutoPlay();
      return;
    }
    next();
  }, delay);
}

function tenotsuSetAutoMode(value) {
  isAutoMode = !!value;
  const btns = document.querySelectorAll('[data-engine-action="auto"], [data-action="auto"]');
  btns.forEach(btn => {
    btn.classList.toggle("active", isAutoMode);
    btn.textContent = isAutoMode ? "オートプレイ：ON" : "オートプレイ";
  });
  if (isAutoMode) tenotsuScheduleAutoPlay();
  else tenotsuStopAutoPlayTimer();
}
/* /v037_85 */

/* v037_85: UI操作中HOLD抑制 */
document.addEventListener("pointerdown", (event) => {
  if (event.target.closest && event.target.closest("#menu-panel, #list-panel, .status-card, .memory-card, .memory-table-wrap, .story-management-surface, .center-surface-window")) {
    window.__TENOTSU_UI_POINTER_ACTIVE__ = true;
  }
}, true);
document.addEventListener("pointerup", () => { window.__TENOTSU_UI_POINTER_ACTIVE__ = false; }, true);
document.addEventListener("pointercancel", () => { window.__TENOTSU_UI_POINTER_ACTIVE__ = false; }, true);


/* v037_85: 中央サーフェス表示 */
function tenotsuCloseCenterSurface() {
  const old = document.getElementById("center-surface-panel");
  if (old) old.remove();
}

function tenotsuShowCenterSurface(title, html) {
  tenotsuCloseCenterSurface();
  const panel = document.createElement("div");
  panel.id = "center-surface-panel";
  panel.className = "center-surface-panel";
  panel.innerHTML = `
    <div class="center-surface-header">
      <strong>${title || ""}</strong>
      <button class="center-surface-close" data-engine-action="center-surface-close">×</button>
    </div>
    <div class="center-surface-body">${html}</div>
  `;
  document.body.appendChild(panel);
  return panel;
}
/* /v037_85 */
