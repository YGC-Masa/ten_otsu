/* v039_286 story end office boot slower black-release fix */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};
  if (ns.__storyEndOfficeBootFixV039286) return;
  ns.__storyEndOfficeBootFixV039286 = true;

  let ending = false;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function getLayers(){
    try { return ns.layers || (typeof ns.ensureLayers === "function" ? ns.ensureLayers() : {}); }
    catch (_) { return {}; }
  }

  function getFade(){
    const layers = getLayers();
    return layers.fade || document.querySelector(".tenotsu-fade-layer");
  }

  function elevateFade(){
    const fade = getFade();
    if (!fade) return null;
    fade.style.setProperty("z-index", "2147483647", "important");
    fade.style.setProperty("background", "#000", "important");
    return fade;
  }

  function forceBlackNow(){
    const fade = elevateFade();
    if (!fade) return;
    fade.style.display = "block";
    fade.style.visibility = "visible";
    fade.style.pointerEvents = "auto";
    fade.style.transition = "none";
    fade.style.animation = "none";
    fade.style.opacity = "1";
  }

  async function releaseBlackAlways(duration){
    const fade = elevateFade();
    const d = typeof duration === "number" ? duration : 1600;
    try {
      if (d > 0 && typeof ns.releaseBlack === "function") {
        await ns.releaseBlack(d);
      } else if (fade) {
        fade.style.display = "block";
        fade.style.visibility = "visible";
        fade.style.pointerEvents = "auto";
        fade.style.transition = d > 0 ? `opacity ${d}ms ease` : "none";
        fade.style.opacity = "1";
        requestAnimationFrame(() => { fade.style.opacity = "0"; });
        await delay(d + 80);
      }
    } finally {
      if (fade) {
        fade.style.display = "none";
        fade.style.visibility = "hidden";
        fade.style.pointerEvents = "none";
        fade.style.transition = "";
        fade.style.animation = "";
        fade.style.opacity = "0";
      }
      try {
        if (ns.transitionState) ns.transitionState.running = false;
      } catch (_) {}
      document.body.classList.remove("v039-transitioning", "tenotsu-story-ending-blackfade", "tenotsu-story-start-hold-black");
    }
  }

  function hideResidualStorySurfaces(){
    const selectors = [
      "#tenotsu-unified-story-bg-layer", "#tenotsu-event-cg-surface",
      ".tenotsu-event-cg-layer", ".tenotsu-cg-layer", ".event-cg-layer", ".memory-cg-layer",
      "[data-event-cg]", "[data-cg-layer]",
      "#tenotsu-story-body-sprite-layer", ".tenotsu-story-standing", ".tenotsu-story-body-standing"
    ];
    document.querySelectorAll(selectors.join(",")).forEach((el) => {
      el.hidden = true;
      el.style.setProperty("display", "none", "important");
      el.style.setProperty("visibility", "hidden", "important");
      el.style.setProperty("opacity", "0", "important");
      el.style.setProperty("pointer-events", "none", "important");
    });
    try { if (typeof ns.hideEventCgSurface === "function") ns.hideEventCgSurface({ noRestore:true }); } catch (_) {}
    try { if (typeof ns.disableUnifiedStoryBackgroundLayer === "function") ns.disableUnifiedStoryBackgroundLayer(); } catch (_) {}
    try { if (typeof ns.hideStoryCharacters === "function") ns.hideStoryCharacters(); } catch (_) {}
  }

  function closeStoryStateForOfficeBoot(){
    try {
      const storyData = ns.story && ns.story.data ? ns.story.data : null;
      const ret = ns.story && ns.story.returnInfo ? ns.story.returnInfo : {};
      if (ret && ret.eventId && typeof ns.markEventRead === "function") ns.markEventRead(ret.eventId);
      if (ret && ret.storyId && typeof ns.markStoryCleared === "function") ns.markStoryCleared(ret.storyId);
      if (typeof ns.applyStoryUnlockFlagsV03997 === "function") ns.applyStoryUnlockFlagsV03997(storyData, ret || {});
    } catch (_) {}

    try {
      if (ns.story) {
        ns.story.active = false;
        ns.story.data = null;
        ns.story.index = -1;
        ns.story.returnInfo = null;
        ns.story.isEnding = false;
        ns.story.isLoadingStep = false;
        ns.story.lastBg = null;
      }
    } catch (_) {}

    document.body.classList.remove(
      "tenotsu-story-active", "tenotsu-story-final-line", "tenotsu-story-loading",
      "tenotsu-story-bg-blackfade", "tenotsu-story-ending-blackfade", "tenotsu-story-start-hold-black",
      "tenotsu-story-ui-hidden"
    );

    const layers = getLayers();
    if (layers.story) {
      layers.story.classList.remove("ending", "loading");
      layers.story.style.removeProperty("pointer-events");
      layers.story.hidden = true;
      layers.story.innerHTML = "";
    }
    hideResidualStorySurfaces();
  }

  async function bootOfficeLikeStart(){
    closeStoryStateForOfficeBoot();
    try {
      if (typeof ns.enterOffice === "function") {
        await ns.enterOffice({ noTransition:true, speaker:"ひだまりストア", message:"事務所モードを起動しました。" });
      } else {
        if (typeof ns.setMode === "function") ns.setMode("office");
        if (typeof ns.setText === "function") ns.setText("ひだまりストア", "事務所モードを起動しました。");
      }
    } catch (_) {
      try {
        if (typeof ns.setMode === "function") ns.setMode("office");
        if (typeof ns.setText === "function") ns.setText("ひだまりストア", "事務所モードを起動しました。");
      } catch (__) {}
    }
    hideResidualStorySurfaces();
  }

  async function endStoryToOfficeBoot(){
    if (ending) return;
    ending = true;
    try {
      try {
        const dbg = ns.storyDebugToolsV039283 || ns.storyDebugToolsV039282 || ns.storyDebugToolsV039281 || ns.storyDebugToolsV039280;
        if (dbg && typeof dbg.stopAutoplay === "function") dbg.stopAutoplay();
      } catch (_) {}
      document.body.classList.add("tenotsu-story-ending-blackfade");
      forceBlackNow();
      await delay(3000);
      await bootOfficeLikeStart();
      await releaseBlackAlways(1600);
    } finally {
      ending = false;
      await releaseBlackAlways(0);
    }
  }

  ns.fadeToBlackThenReturn = endStoryToOfficeBoot;
  ns.beginStoryEnd = function beginStoryEndV039286(){
    endStoryToOfficeBoot();
  };

  ns.storyEndOfficeBootFixV039286 = {
    endStoryToOfficeBoot,
    bootOfficeLikeStart,
    releaseBlackAlways
  };
})();
