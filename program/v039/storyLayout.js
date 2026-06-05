/* v039_108 story layout: logical split + event CG above characters */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};

  ns.normalizeStoryCharacterListV039100 = function normalizeStoryCharacterListV039100(characters) {
    const raw = Array.isArray(characters) ? characters.filter((ch) => ch && ch.src && !String(ch.src).endsWith("/NULL")) : [];
    const byId = new Map();
    raw.forEach((ch, index) => {
      const key = String(ch.id || ch.src || index);
      byId.set(key, Object.assign({}, ch));
    });
    let list = Array.from(byId.values());
    if (list.length > 5) list = list.slice(list.length - 5);
    const n = Math.max(1, list.length);
    return list.map((ch, index) => {
      const left = ch.left || (((index + 1) * 100) / (n + 1)).toFixed(3).replace(/\.000$/, "") + "%";
      const side = ch.side || (n === 1 ? "center" : index === 0 ? "left" : index === n - 1 ? "right" : "center");
      return Object.assign({}, ch, { side, left });
    });
  };

  ns.ensureEventCgSurface = function ensureEventCgSurface() {
    const layers = ns.layers || (typeof ns.ensureLayers === "function" ? ns.ensureLayers() : {});
    const app = (layers && layers.app) || document.getElementById("tenotsu-app") || document.body;
    let surface = document.getElementById("tenotsu-event-cg-surface");
    if (!surface) {
      surface = document.createElement("div");
      surface.id = "tenotsu-event-cg-surface";
      surface.className = "tenotsu-event-cg-layer";
      const img = document.createElement("img");
      img.className = "tenotsu-event-cg-image";
      img.alt = "";
      surface.appendChild(img);
      app.appendChild(surface);
    }
    surface.style.setProperty("position", "fixed", "important");
    surface.style.setProperty("inset", "0", "important");
    surface.style.setProperty("z-index", "260", "important");
    surface.style.setProperty("pointer-events", "none", "important");
    surface.style.setProperty("display", "block", "important");
    surface.style.setProperty("visibility", "visible", "important");
    surface.style.setProperty("opacity", "1", "important");
    return surface;
  };

  ns.showEventCgSurface = function showEventCgSurface(src, options = {}) {
    if (!src) return;
    const surface = ns.ensureEventCgSurface();
    const img = surface.querySelector("img") || document.createElement("img");
    if (!img.parentNode) surface.appendChild(img);
    img.className = "tenotsu-event-cg-image";
    img.src = src;
    img.alt = "";
    img.style.setProperty("width", "100%", "important");
    img.style.setProperty("height", "100%", "important");
    img.style.setProperty("object-fit", options.fit || "cover", "important");
    img.style.setProperty("object-position", options.align || options.position || "center center", "important");
    img.style.setProperty("display", "block", "important");
    img.style.setProperty("visibility", "visible", "important");
    img.style.setProperty("opacity", "1", "important");
    surface.hidden = false;
    surface.removeAttribute("hidden");
    document.body.classList.add("tenotsu-event-cg-active");
  };

  ns.hideEventCgSurface = function hideEventCgSurface() {
    document.body.classList.remove("tenotsu-event-cg-active");
    const surface = document.getElementById("tenotsu-event-cg-surface");
    if (surface) {
      surface.hidden = true;
      surface.style.setProperty("display", "none", "important");
      surface.style.setProperty("visibility", "hidden", "important");
      surface.style.setProperty("opacity", "0", "important");
      const img = surface.querySelector("img");
      if (img) img.removeAttribute("src");
    }
  };
})();
