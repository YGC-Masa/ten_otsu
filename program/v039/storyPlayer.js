/* v039_34 story player quality */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;

  ns.suppressStoryFadeLayer = function suppressStoryFadeLayer() {
    const mode = ns.mode || (document.body && document.body.dataset && document.body.dataset.v039Mode);
    if (!(mode === "story" || (document.body && document.body.classList && document.body.classList.contains("tenotsu-story-active")))) return;
    const layers = ns.layers || {};
    const fade = layers.fade || document.querySelector(".tenotsu-fade-layer");
    if (!fade) return;
    fade.style.setProperty("transition", "none", "important");
    fade.style.setProperty("animation", "none", "important");
    fade.style.setProperty("opacity", "0", "important");
    fade.style.setProperty("display", "none", "important");
    fade.style.setProperty("visibility", "hidden", "important");
    fade.style.setProperty("pointer-events", "none", "important");
  };

  ns.storyDebugDelay = function storyDebugDelay(ms) {
    return Promise.resolve();
  };

  ns.findStoryBackgroundImage = function findStoryBackgroundImage() {
    return document.querySelector(".tenotsu-bg-layer img")
      || document.querySelector(".tenotsu-background-layer img")
      || document.querySelector("[data-bg-layer] img")
      || document.querySelector(".background img");
  };

  ns.directSetStoryBackgroundImage = function directSetStoryBackgroundImage(bgPath) {
    const img = ns.findStoryBackgroundImage();
    if (img) {
      img.src = bgPath;
      img.style.visibility = "visible";
      img.style.opacity = "1";
      img.style.transition = "none";
      return true;
    }
    return false;
  };

  ns.storySpriteMap = {
    hina: "images/assets/char/a10501.webp",
    ai: "images/assets/char/b10501.webp"
  };

  ns.getStoryForcedCharacters = function getStoryForcedCharacters(step) {
    const speaker = String((step && step.speaker) || "");
    const title = String((ns.story && ns.story.data && ns.story.data.title) || "");
    const list = [];
    if ((speaker.includes("緋奈") || title.includes("弁当")) && ns.storySpriteMap.hina) {
      list.push({ side: "left", src: ns.storySpriteMap.hina, zIndex: 1000, left: "7%", opacity: 1 });
    }
    if ((speaker.includes("藍") || title.includes("読書") || title.includes("しおり") || title.includes("パン")) && ns.storySpriteMap.ai) {
      list.push({ side: "center", src: ns.storySpriteMap.ai, zIndex: 2000, left: "27%", opacity: 1 });
    }
    return list;
  };

  ns.setStoryBackgroundNoFlash = async function setStoryBackgroundNoFlash(bgPath) {
    if (!bgPath) return;
    if (ns.storyCurrentBackground === bgPath) return;
    if (ns.suppressStoryFadeLayer) ns.suppressStoryFadeLayer();

    await new Promise((resolve) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve;
      img.src = bgPath;
    });

    if (ns.suppressStoryFadeLayer) ns.suppressStoryFadeLayer();

    const directOk = typeof ns.directSetStoryBackgroundImage === "function" && ns.directSetStoryBackgroundImage(bgPath);
    if (!directOk) {
      if (typeof ns.setBackground === "function") {
        ns.setBackground(bgPath);
      } else if (typeof ns.setBackgroundReady === "function") {
        await ns.setBackgroundReady(bgPath);
      }
    }

    ns.storyCurrentBackground = bgPath;
    if (ns.suppressStoryFadeLayer) ns.suppressStoryFadeLayer();
  };

  ns.storyCurrentBackground = "";
  ns.storyCurrentSpriteKey = "";

  ns.story = { active:false, data:null, index:-1, returnInfo:null, isEnding:false, isLoadingStep:false, lastBg:null };

  ns.resetStoryRuntime = function resetStoryRuntime() {
    ns.story.active = false; ns.story.data = null; ns.story.index = -1; ns.story.returnInfo = null;
    ns.story.isEnding = false; ns.story.isLoadingStep = false; ns.story.lastBg = null;
    document.body.classList.remove("tenotsu-story-active","tenotsu-story-final-line","tenotsu-story-loading");
    const layers = ns.layers || ns.ensureLayers();
    if (layers.story) { layers.story.classList.remove("ending","loading"); layers.story.style.removeProperty("pointer-events"); layers.story.hidden = true; layers.story.innerHTML = ""; }
    if (layers.fade) { layers.fade.style.transition = ""; layers.fade.style.opacity = "0"; layers.fade.style.display = "none"; layers.fade.style.pointerEvents = "none"; }
  };

  ns.loadStoryScenario = async function loadStoryScenario(path) {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error("scenario fetch failed: " + path + " / " + res.status);
    return await res.json();
  };

  ns.prepareStoryFirstBackground = async function prepareStoryFirstBackground(data) {
    const first = data && data.steps && data.steps[0] ? data.steps[0] : null;
    if (first && first.bg) {
      await ns.setStoryBackgroundNoFlash(first.bg);
      ns.story.lastBg = first.bg;
    }
  };

  ns.fadeOutForStoryStart = function fadeOutForStoryStart() {
    const layers = ns.layers || ns.ensureLayers();
    layers.fade.style.display = "block"; layers.fade.style.pointerEvents = "auto"; layers.fade.style.transition = "opacity 520ms ease"; layers.fade.style.opacity = "0";
    return new Promise((resolve) => requestAnimationFrame(() => { layers.fade.style.opacity = "1"; setTimeout(resolve, 560); }));
  };

  ns.fadeInForStoryStart = function fadeInForStoryStart() {
    const layers = ns.layers || ns.ensureLayers();
    layers.fade.style.display = "block"; layers.fade.style.pointerEvents = "auto"; layers.fade.style.transition = "opacity 520ms ease"; layers.fade.style.opacity = "1";
    return new Promise((resolve) => requestAnimationFrame(() => {
      layers.fade.style.opacity = "0";
      setTimeout(() => { layers.fade.style.display = "none"; layers.fade.style.pointerEvents = "none"; layers.fade.style.transition = ""; resolve(); }, 560);
    }));
  };

  ns.fadeForStoryBgChange = async function fadeForStoryBgChange(apply) {
    ns.suppressStoryFadeLayer();
    if (typeof apply === "function") await apply();
    ns.suppressStoryFadeLayer();
  };

  ns.setStoryLoading = function setStoryLoading(isLoading) {
    ns.story.isLoadingStep = !!isLoading;
    document.body.classList.toggle("tenotsu-story-loading", !!isLoading);
    const layer = ns.layers && ns.layers.story;
    if (layer) layer.classList.toggle("loading", !!isLoading);
    const click = layer ? layer.querySelector("[data-story-action='next']") : null;
    if (click) click.disabled = !!isLoading;
  };

  ns.startStory = async function startStory(scenarioPath, returnInfo = {}) {
    try {
      ns.ensureLayers();
      await ns.fadeOutForStoryStart();
      ns.setMode("story"); ns.resetStoryRuntime(); ns.setMode("story");
      if (typeof ns.hideSettingsPanel === "function") ns.hideSettingsPanel();
      if (typeof ns.hideShopPanel === "function") ns.hideShopPanel();
      if (typeof ns.hideMembersPanel === "function") ns.hideMembersPanel();
      if (typeof ns.hideTownPanel === "function") ns.hideTownPanel();
      if (typeof ns.clearCharacters === "function") ns.clearCharacters();
      const data = await ns.loadStoryScenario(scenarioPath);
      await ns.prepareStoryFirstBackground(data);
      ns.story.active = true; ns.story.data = data; ns.story.index = -1;
      ns.story.returnInfo = Object.assign({}, data.return || {}, returnInfo || {});
      ns.story.isEnding = false; ns.story.isLoadingStep = false;
      ns.showStoryLayer(`
        <button type="button" class="tenotsu-story-click" data-story-action="next" aria-label="次へ"></button>
        <div class="tenotsu-story-ui">
          <div class="tenotsu-story-title">${data.title || "Story"}</div>
          <div class="tenotsu-story-progress" data-story-progress>0 / ${(data.steps || []).length}</div>
          <button type="button" class="tenotsu-story-skip" data-story-action="end">終了</button>
        </div>
        <div class="tenotsu-story-hint">クリック / タップで進む</div>
        <div class="tenotsu-click-wait" aria-hidden="true"></div>
      `);
      const layer = ns.layers.story;
      layer.classList.remove("ending","loading"); layer.style.removeProperty("pointer-events");
      const nextButton = layer.querySelector('[data-story-action="next"]');
      const endButton = layer.querySelector('[data-story-action="end"]');
      if (nextButton) nextButton.onclick = () => { ns.suppressStoryFadeLayer(); ns.nextStoryStep(); };
      if (endButton) endButton.onclick = () => ns.beginStoryEnd();
      document.body.classList.add("tenotsu-story-active");
      await ns.nextStoryStep({ initial:true });
      await ns.fadeInForStoryStart();
      ns.suppressStoryFadeLayer();
    } catch (err) {
      console.error(err);
      ns.setText("システム", "シナリオを読み込めませんでした: " + err.message);
      const layers = ns.layers || ns.ensureLayers();
      if (layers.fade) { layers.fade.style.opacity = "0"; layers.fade.style.display = "none"; layers.fade.style.pointerEvents = "none"; layers.fade.style.transition = ""; }
      if (typeof ns.enterTown === "function") ns.enterTown();
    }
  };

  ns.storyProgressText = function storyProgressText() {
    const steps = (ns.story.data && ns.story.data.steps) ? ns.story.data.steps : [];
    const current = Math.min(Math.max(ns.story.index + 1, 1), Math.max(steps.length, 1));
    return current + " / " + steps.length;
  };

  ns.updateStoryUi = function updateStoryUi() {
    const layer = ns.layers && ns.layers.story; if (!layer) return;
    const progress = layer.querySelector("[data-story-progress]"); if (progress) progress.textContent = ns.storyProgressText();
    const steps = (ns.story.data && ns.story.data.steps) ? ns.story.data.steps : [];
    layer.dataset.storyIndex = String(ns.story.index); layer.dataset.storyTotal = String(steps.length);
  };

  ns.applyStorySpritesV2 = function applyStorySpritesV2(step) {
    if (!step) return false;
    const sprites = Array.isArray(step.storySprites) ? step.storySprites : [];
    if (!sprites.length || typeof ns.showStoryCharacters !== "function") return false;
    const key = JSON.stringify(sprites.map((s) => [s.id, s.src, s.side, s.left, s.zIndex, s.opacity]));
    if (ns.storyCurrentSpriteKey === key) return true;
    ns.storyCurrentSpriteKey = key;
    ns.showStoryCharacters(sprites);
    return true;
  };

  ns.applyStoryCharacter = function applyStoryCharacter(step) {
    if (!step) return;
    if (ns.applyStorySpritesV2(step)) return;
    const scenarioChars = Array.isArray(step.characters) ? step.characters : [];
    if (scenarioChars.length && typeof ns.showStoryCharacters === "function") {
      const key = JSON.stringify(scenarioChars.map((s) => [s.id, s.src, s.side, s.left, s.zIndex, s.opacity]));
      if (ns.storyCurrentSpriteKey !== key) {
        ns.storyCurrentSpriteKey = key;
        ns.showStoryCharacters(scenarioChars);
      }
    }
  };

  ns.applyStoryStep = async function applyStoryStep(step, options = {}) {
    if (!step) return;
    const bgChanged = !!(step.bg && step.bg !== ns.story.lastBg);
    if (step.bg && step.bg !== ns.storyCurrentBackground) {
      ns.setStoryLoading(true);
      try {
        const applyBg = async () => {
          if (typeof ns.setStoryBackgroundReady === "function") await ns.setStoryBackgroundReady(step.bg);
          else if (typeof ns.setBackgroundReady === "function") await ns.setBackgroundReady(step.bg);
          else ns.setBackground(step.bg);
          ns.story.lastBg = step.bg;
        };
        if (bgChanged && !options.initial) await ns.fadeForStoryBgChange(applyBg);
        else await applyBg();
      } finally { ns.setStoryLoading(false); }
    }
    ns.applyStoryCharacter(step);
    ns.setText(step.speaker || "", step.text || "");
    ns.suppressStoryFadeLayer();
  };

  ns.nextStoryStep = async function nextStoryStep(options = {}) {
    ns.suppressStoryFadeLayer();
    if (!ns.story.active || !ns.story.data || ns.story.isEnding || ns.story.isLoadingStep) return;
    const steps = ns.story.data.steps || [];
    const nextIndex = ns.story.index + 1;
    if (nextIndex >= steps.length) { ns.beginStoryEnd(); return; }
    ns.story.index = nextIndex;
    await ns.applyStoryStep(steps[ns.story.index], options);
    ns.updateStoryUi();
    document.body.classList.remove("tenotsu-story-final-line");
    ns.suppressStoryFadeLayer();
  };

  ns.beginStoryEnd = function beginStoryEnd() {
    if (!ns.story.active || ns.story.isEnding || ns.story.isLoadingStep) return;
    ns.story.isEnding = true;
    const layer = ns.layers && ns.layers.story; if (layer) layer.classList.add("ending");
    ns.fadeToBlackThenReturn();
  };

  ns.fadeToBlackThenReturn = function fadeToBlackThenReturn() {
    const layers = ns.layers || ns.ensureLayers();
    layers.fade.style.display = "block"; layers.fade.style.pointerEvents = "auto"; layers.fade.style.transition = "opacity 900ms ease";
    requestAnimationFrame(() => { layers.fade.style.opacity = "1"; });
    setTimeout(() => {
      ns.endStory();
      layers.fade.style.transition = "opacity 650ms ease";
      requestAnimationFrame(() => { layers.fade.style.opacity = "0"; });
      setTimeout(() => {
        layers.fade.style.display = "none"; layers.fade.style.pointerEvents = "none"; layers.fade.style.transition = ""; layers.fade.style.opacity = "0";
        if (ns.layers && ns.layers.story) { ns.layers.story.classList.remove("ending"); ns.layers.story.style.removeProperty("pointer-events"); }
      }, 700);
    }, 950);
  };

  ns.endStory = function endStory() {
    const ret = ns.story.returnInfo || {};
    if (ret.eventId && typeof ns.markEventRead === "function") ns.markEventRead(ret.eventId);
    ns.story.active = false; ns.story.data = null; ns.story.index = -1; ns.story.returnInfo = null;
    ns.story.isEnding = false; ns.story.isLoadingStep = false; ns.story.lastBg = null;
    document.body.classList.remove("tenotsu-story-active","tenotsu-story-final-line","tenotsu-story-loading");
    if (typeof ns.hideStoryLayer === "function") ns.hideStoryLayer();
    if (typeof ns.hideStoryCharacters === "function") ns.hideStoryCharacters();
    if (ret.mode === "town" && typeof ns.enterTown === "function") {
      ns.enterTown({ noTransition:true });
      if (ret.season && typeof ns.renderSeasonEvents === "function") {
        ns.renderSeasonEvents(ret.season, { selectedEventId:ret.eventId });
        ns.setText("店長", "外回りに戻りました。");
      }
      return;
    }
    if (typeof ns.enterOffice === "function") ns.enterOffice({ speaker:"店長", message:"事務所に戻りました。" });
  };
})();
