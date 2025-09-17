// effect.js - v37 時間指定対応版　20250918
window.effects = {
  // パーサー: "effect:1500" → {name:"effect", duration:1500}
  parse(effectStr) {
    if (!effectStr) return null;
    const [name, dur] = effectStr.split(":");
    return { name: name.toLowerCase(), duration: dur ? parseInt(dur, 10) : 1000 };
  },

  // 汎用フェードイン/アウト
  fadein: (el, duration = 1000) => {
    el.style.opacity = 0;
    el.style.transition = `opacity ${duration}ms ease`;
    requestAnimationFrame(() => (el.style.opacity = 1));
  },
  fadeout: (el, duration = 1000) => {
    el.style.opacity = 1;
    el.style.transition = `opacity ${duration}ms ease`;
    requestAnimationFrame(() => (el.style.opacity = 0));
  },

  // 白黒イン（オーバーレイ）
  overlayIn: (color = "#000", duration = 1000) => {
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: color,
      zIndex: 99,
      opacity: "1",
      transition: `opacity ${duration}ms ease`,
      pointerEvents: "none"
    });
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      overlay.style.opacity = "0";
      overlay.addEventListener("transitionend", () => overlay.remove(), { once: true });
    });
  },
  whitein: (el, d) => window.effects.overlayIn("#fff", d),
  blackin: (el, d) => window.effects.overlayIn("#000", d),

  // スライド系
  slideleft: (el, duration = 1000) => {
    el.style.transform = "translateX(100%)";
    el.style.transition = `transform ${duration}ms ease`;
    requestAnimationFrame(() => (el.style.transform = "translateX(0)"));
  },
  slideright: (el, duration = 1000) => {
    el.style.transform = "translateX(-100%)";
    el.style.transition = `transform ${duration}ms ease`;
    requestAnimationFrame(() => (el.style.transform = "translateX(0)"));
  },
  slideup: (el, duration = 1000) => {
    el.style.transform = "translateY(100%)";
    el.style.transition = `transform ${duration}ms ease`;
    requestAnimationFrame(() => (el.style.transform = "translateY(0)"));
  },
  slidedown: (el, duration = 1000) => {
    el.style.transform = "translateY(-100%)";
    el.style.transition = `transform ${duration}ms ease`;
    requestAnimationFrame(() => (el.style.transform = "translateY(0)"));
  },

  // ワイプ系（clip-path 使用）
  wipeleft: (el, duration = 1000) => {
    el.style.clipPath = "inset(0 0 0 100%)";
    el.style.transition = `clip-path ${duration}ms ease`;
    requestAnimationFrame(() => (el.style.clipPath = "inset(0 0 0 0)"));
  },
  wiperight: (el, duration = 1000) => {
    el.style.clipPath = "inset(0 100% 0 0)";
    el.style.transition = `clip-path ${duration}ms ease`;
    requestAnimationFrame(() => (el.style.clipPath = "inset(0 0 0 0)"));
  },
  wipeup: (el, duration = 1000) => {
    el.style.clipPath = "inset(100% 0 0 0)";
    el.style.transition = `clip-path ${duration}ms ease`;
    requestAnimationFrame(() => (el.style.clipPath = "inset(0 0 0 0)"));
  },
  wipedown: (el, duration = 1000) => {
    el.style.clipPath = "inset(0 0 100% 0)";
    el.style.transition = `clip-path ${duration}ms ease`;
    requestAnimationFrame(() => (el.style.clipPath = "inset(0 0 0 0)"));
  },

  // クロスフェード
  crossfade: (el, duration = 1000) => {
    el.style.opacity = 0;
    el.style.transition = `opacity ${duration}ms ease`;
    requestAnimationFrame(() => (el.style.opacity = 1));
  },
};
