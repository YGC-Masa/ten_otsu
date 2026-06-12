/* v039_179 story bg preload transition */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};

  async function preloadAndDecode(src, timeout = 2600) {
    if (!src) return { ok:false, src:null, img:null };
    return await new Promise((resolve) => {
      const img = new Image();
      let done = false;
      const finish = (ok) => {
        if (done) return;
        done = true;
        resolve({ ok: !!ok, src, img });
      };
      const timer = setTimeout(() => finish(false), timeout);
      img.onload = () => {
        const afterDecode = () => { clearTimeout(timer); finish(true); };
        if (typeof img.decode === "function") img.decode().then(afterDecode).catch(afterDecode);
        else afterDecode();
      };
      img.onerror = () => { clearTimeout(timer); finish(false); };
      img.src = src;
    });
  }

  ns.prepareStoryBackgroundTransition = async function prepareStoryBackgroundTransition(src) {
    if (!src) return null;
    if (ns.__storyBgPrepared && ns.__storyBgPrepared.src === src) return ns.__storyBgPrepared;
    const prepared = await preloadAndDecode(src);
    ns.__storyBgPrepared = prepared;
    return prepared;
  };

  const originalApplyStoryStep = ns.applyStoryStep;
  const originalSetStoryBackgroundDirect = ns.setStoryBackgroundDirect;

  ns.setStoryBackgroundDirect = async function setStoryBackgroundDirectPatched(bgPath, options = {}) {
    if (!bgPath) return bgPath;
    let prepared = (ns.__storyBgPrepared && ns.__storyBgPrepared.src === bgPath) ? ns.__storyBgPrepared : null;
    if (!prepared) prepared = await ns.prepareStoryBackgroundTransition(bgPath);

    const layers = ns.layers || (typeof ns.ensureLayers === "function" ? ns.ensureLayers() : null);
    if (!layers || !layers.bg || !layers.bgImg || !prepared || !prepared.ok) {
      if (typeof originalSetStoryBackgroundDirect === "function") return originalSetStoryBackgroundDirect.call(ns, bgPath, options);
      if (typeof ns.setBackgroundReady === "function") return ns.setBackgroundReady(bgPath);
      if (typeof ns.setBackground === "function") return ns.setBackground(bgPath);
      return bgPath;
    }

    if (typeof ns.disableUnifiedStoryBackgroundLayer === "function") ns.disableUnifiedStoryBackgroundLayer();
    if (typeof ns.hideEventCgSurface === "function") ns.hideEventCgSurface();
    if (typeof ns.suppressStoryFadeLayer === "function") ns.suppressStoryFadeLayer();

    layers.bg.hidden = false;
    layers.bg.style.setProperty("display", "block", "important");
    layers.bg.style.setProperty("visibility", "visible", "important");
    layers.bg.style.setProperty("opacity", "1", "important");
    layers.bg.style.setProperty("z-index", "100", "important");
    layers.bg.style.setProperty("background-image", `url("${bgPath}")`, "important");
    layers.bg.style.setProperty("background-size", "cover", "important");
    layers.bg.style.setProperty("background-position", "center", "important");
    layers.bg.style.setProperty("background-repeat", "no-repeat", "important");

    layers.bgImg.onerror = null;
    layers.bgImg.removeAttribute("hidden");
    layers.bgImg.style.setProperty("display", "block", "important");
    layers.bgImg.style.setProperty("visibility", "visible", "important");
    layers.bgImg.style.setProperty("opacity", "1", "important");
    layers.bgImg.style.setProperty("width", "100%", "important");
    layers.bgImg.style.setProperty("height", "100%", "important");
    layers.bgImg.style.setProperty("object-fit", "cover", "important");
    layers.bgImg.src = bgPath;

    ns.storyCurrentBackground = bgPath;
    if (ns.story) ns.story.lastBg = bgPath;
    ns.__storyBgPrepared = null;
    if (typeof ns.suppressStoryFadeLayer === "function") ns.suppressStoryFadeLayer();
    return bgPath;
  };

  if (typeof originalApplyStoryStep === "function") {
    ns.applyStoryStep = async function applyStoryStepPatched(step, options = {}) {
      try {
        const forceBg = !!(step && (step.forceBackgroundReplace || step.bgMode === "forceReplace"));
        const bgChanged = !!(step && step.bg && (forceBg || step.bg !== (ns.story && ns.story.lastBg) || step.bg !== ns.storyCurrentBackground));
        if (bgChanged) await ns.prepareStoryBackgroundTransition(step.bg);
      } catch (_) {}
      return originalApplyStoryStep.call(ns, step, options);
    };
  }
})();
