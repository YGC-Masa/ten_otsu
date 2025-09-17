// script.js - V037

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
let menuVisible = false;
let listVisible = false;

// ==============================
// 🎨 Transition Effects
// ==============================

let overlay = document.createElement("div");
overlay.id = "transition-overlay";
overlay.style.position = "absolute";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.pointerEvents = "none";
overlay.style.opacity = "0";
overlay.style.zIndex = "9999";
document.body.appendChild(overlay);

window.effects = {
  fadein: (el, duration = 1000) =>
    new Promise(resolve => {
      el.style.opacity = 0;
      el.style.transition = `opacity ${duration}ms ease`;
      void el.offsetWidth;
      el.style.opacity = 1;
      setTimeout(resolve, duration);
    }),

  fadeout: (el, duration = 1000) =>
    new Promise(resolve => {
      el.style.opacity = 1;
      el.style.transition = `opacity ${duration}ms ease`;
      void el.offsetWidth;
      el.style.opacity = 0;
      setTimeout(resolve, duration);
    }),

  slideLeft: (el, duration = 1000) =>
    new Promise(resolve => {
      el.style.transform = "translateX(-100%)";
      el.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
      el.style.opacity = 0;
      void el.offsetWidth;
      el.style.transform = "translateX(0)";
      el.style.opacity = 1;
      setTimeout(resolve, duration);
    }),

  slideRight: (el, duration = 1000) =>
    new Promise(resolve => {
      el.style.transform = "translateX(100%)";
      el.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
      el.style.opacity = 0;
      void el.offsetWidth;
      el.style.transform = "translateX(0)";
      el.style.opacity = 1;
      setTimeout(resolve, duration);
    }),

  slideUp: (el, duration = 1000) =>
    new Promise(resolve => {
      el.style.transform = "translateY(-100%)";
      el.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
      el.style.opacity = 0;
      void el.offsetWidth;
      el.style.transform = "translateY(0)";
      el.style.opacity = 1;
      setTimeout(resolve, duration);
    }),

  slideDown: (el, duration = 1000) =>
    new Promise(resolve => {
      el.style.transform = "translateY(100%)";
      el.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
      el.style.opacity = 0;
      void el.offsetWidth;
      el.style.transform = "translateY(0)";
      el.style.opacity = 1;
      setTimeout(resolve, duration);
    }),

  wipeLeft: (el, duration = 1000) =>
    new Promise(resolve => {
      el.style.transition = `clip-path ${duration}ms ease, opacity ${duration}ms ease`;
      el.style.clipPath = "inset(0 100% 0 0)";
      el.style.opacity = 1;
      void el.offsetWidth;
      el.style.clipPath = "inset(0 0 0 0)";
      el.style.maskImage =
        "linear-gradient(to right, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)";
      setTimeout(() => {
        el.style.clipPath = "";
        el.style.maskImage = "";
        resolve();
      }, duration);
    }),

  wipeRight: (el, duration = 1000) =>
    new Promise(resolve => {
      el.style.transition = `clip-path ${duration}ms ease, opacity ${duration}ms ease`;
      el.style.clipPath = "inset(0 0 0 100%)";
      el.style.opacity = 1;
      void el.offsetWidth;
      el.style.clipPath = "inset(0 0 0 0)";
      el.style.maskImage =
        "linear-gradient(to left, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)";
      setTimeout(() => {
        el.style.clipPath = "";
        el.style.maskImage = "";
        resolve();
      }, duration);
    }),

  wipeUp: (el, duration = 1000) =>
    new Promise(resolve => {
      el.style.transition = `clip-path ${duration}ms ease, opacity ${duration}ms ease`;
      el.style.clipPath = "inset(100% 0 0 0)";
      el.style.opacity = 1;
      void el.offsetWidth;
      el.style.clipPath = "inset(0 0 0 0)";
      el.style.maskImage =
        "linear-gradient(to bottom, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)";
      setTimeout(() => {
        el.style.clipPath = "";
        el.style.maskImage = "";
        resolve();
      }, duration);
    }),

  wipeDown: (el, duration = 1000) =>
    new Promise(resolve => {
      el.style.transition = `clip-path ${duration}ms ease, opacity ${duration}ms ease`;
      el.style.clipPath = "inset(0 0 100% 0)";
      el.style.opacity = 1;
      void el.offsetWidth;
      el.style.clipPath = "inset(0 0 0 0)";
      el.style.maskImage =
        "linear-gradient(to top, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)";
      setTimeout(() => {
        el.style.clipPath = "";
        el.style.maskImage = "";
        resolve();
      }, duration);
    }),

  whiteIn: (el, duration = 1000) =>
    new Promise(resolve => {
      overlay.style.background = "#fff";
      overlay.style.transition = `opacity ${duration}ms ease`;
      overlay.style.opacity = "1";
      void overlay.offsetWidth;
      overlay.style.opacity = "0";
      setTimeout(resolve, duration);
    }),

  whiteOut: (el, duration = 1000) =>
    new Promise(resolve => {
      overlay.style.background = "#fff";
      overlay.style.transition = `opacity ${duration}ms ease`;
      overlay.style.opacity = "0";
      void overlay.offsetWidth;
      overlay.style.opacity = "1";
      setTimeout(resolve, duration);
    }),

  blackIn: (el, duration = 1000) =>
    new Promise(resolve => {
      overlay.style.background = "#000";
      overlay.style.transition = `opacity ${duration}ms ease`;
      overlay.style.opacity = "1";
      void overlay.offsetWidth;
      overlay.style.opacity = "0";
      setTimeout(resolve, duration);
    }),

  blackOut: (el, duration = 1000) =>
    new Promise(resolve => {
      overlay.style.background = "#000";
      overlay.style.transition = `opacity ${duration}ms ease`;
      overlay.style.opacity = "0";
      void overlay.offsetWidth;
      overlay.style.opacity = "1";
      setTimeout(resolve, duration);
    })
};

async function applyEffect(el, effectName, duration = 1000) {
  if (window.effects && effectName && window.effects[effectName]) {
    return await window.effects[effectName](el, duration);
  }
}

// ==============================
// 🎮 シーン制御
// ==============================

async function showScene(scene) {
  const bgEl = document.getElementById("background");
  const cgEl = document.getElementById("cg");
  const evEl = document.getElementById("event");
  const leftChar = document.getElementById("char-left");
  const rightChar = document.getElementById("char-right");

  // 背景
  if (scene.bg) {
    await applyEffect(bgEl, scene.bgEffect || "fadeout", scene.bgDuration || 1000);
    bgEl.style.backgroundImage = `url(${scene.bg})`;
    await applyEffect(bgEl, scene.bgEffect || "fadein", scene.bgDuration || 1000);
  }

  // CG
  if (scene.cg) {
    if (scene.cg === "NULL") {
      cgEl.style.display = "none";
    } else {
      cgEl.style.display = "block";
      await applyEffect(cgEl, scene.cgEffect || "fadein", scene.cgDuration || 1000);
      cgEl.src = scene.cg;
    }
  }

  // EV
  if (scene.showev) {
    if (scene.showev === "NULL") {
      evEl.style.display = "none";
    } else {
      evEl.style.display = "block";
      await applyEffect(evEl, scene.evEffect || "fadein", scene.evDuration || 1000);
      evEl.src = scene.showev;
    }
  }

  // キャラクター
  if (scene.characters) {
    scene.characters.forEach(async char => {
      let target =
        char.side === "left" ? leftChar : char.side === "right" ? rightChar : null;
      if (target) {
        if (char.src === "NULL") {
          target.style.display = "none";
        } else {
          target.style.display = "block";
          await applyEffect(
            target,
            char.charEffect || "fadein",
            char.charDuration || 1000
          );
          target.src = char.src;
        }
      }
    });
  }

  // 名前とテキスト
  if (scene.name !== undefined) {
    document.getElementById("name").textContent = scene.name;
  }
  if (scene.text !== undefined) {
    typeText(scene.text, scene.name);
  }
}

// ==============================
// 💬 テキスト描画（既存機能）
// ==============================

function typeText(text, name) {
  clearInterval(typingInterval);
  const textbox = document.getElementById("text");
  textbox.textContent = "";
  let i = 0;
  typingInterval = setInterval(() => {
    textbox.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(typingInterval);
      if (isAutoMode) {
        setTimeout(nextScene, autoWaitTime);
      }
    }
  }, currentSpeed);
}

// ==============================
// ▶️ シナリオ進行
// ==============================

async function nextScene() {
  const response = await fetch(`./scenarios/${currentScenario}`);
  const data = await response.json();
  if (currentIndex < data.length) {
    const scene = data[currentIndex];
    currentIndex++;
    await showScene(scene);
  }
}
