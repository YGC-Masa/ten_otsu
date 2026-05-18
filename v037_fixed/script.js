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
  isPlaying = true;
  textEl.innerHTML = "";
  let i = 0;
  typingInterval = setInterval(() => {
    textEl.innerHTML += text[i++];
    if (i >= text.length) {
      clearInterval(typingInterval);
      typingInterval = null;
      isPlaying = false;
      if (callback) callback();
    }
  }, speed);
}

function setCharacterStyle(name, scene = {}) {
  const style = characterStyles[name] || characterStyles[""];
  const fontSize = scene.fontSize || style.fontSize || defaultFontSize;
  currentSpeed = scene.speed || style.speed || defaultSpeed;
  nameEl.style.color = style.color || "#C0C0C0";
  document.documentElement.style.setProperty("--fontSize", fontSize);
}

function clearCharacters() {
  for (const pos in charSlots) {
    charSlots[pos].innerHTML = "";
    charSlots[pos].classList.remove("active");
  }
  lastActiveSide = null;
}

function updateCharacterDisplay() {
  const isPortrait = isMobilePortrait();
  for (const pos in charSlots) {
    const slot = charSlots[pos];
    const hasCharacter = slot.children.length > 0;
    if (isPortrait) {
      slot.classList.toggle("active", pos === lastActiveSide && hasCharacter);
    } else {
      slot.classList.toggle("active", hasCharacter);
    }
  }
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

  if (scene.showmenu) await loadMenu(scene.showmenu);
  if (scene.showlist) await loadList(scene.showlist);

  if (scene.auto && scene.choices === undefined && scene.text === undefined) {
    setTimeout(() => {
      if (!isPlaying) next();
    }, sceneWaitTime);
  }
}

function next() {
  safeFetchJson(config.scenarioPath + currentScenario + "?t=" + Date.now(), currentScenario)
    .then((data) => {
      currentIndex++;
      const scenes = normalizeScenes(data);
      if (currentIndex < scenes.length) {
        showScene(scenes[currentIndex]);
      } else {
        if (textAreaVisible) {
          nameEl.textContent = "";
          textEl.innerHTML = "（物語は つづく・・・）";
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

// === メニュー関連 ===
function handleMenuAction(item) {
  if (!item) return;
  if ((item.action === "jump" || !item.action) && item.jump) {
    loadScenario(item.jump);
  } else if (item.action === "menu" && item.menu) {
    loadMenu(item.menu);
  } else if (item.action === "list" && item.list) {
    loadList(item.list);
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
clickLayer.addEventListener("dblclick", () => {
  loadMenu("menu01.json");
});

let lastTouch = 0;
clickLayer.addEventListener("touchend", () => {
  const now = Date.now();
  if (now - lastTouch < 300) loadMenu("menu01.json");
  lastTouch = now;
});

clickLayer.addEventListener("click", () => {
  if (!menuPanel.classList.contains("hidden")) {
    menuPanel.classList.add("hidden");
    return;
  }
  if (!isPlaying && choicesEl.children.length === 0) {
    next();
  }
});
