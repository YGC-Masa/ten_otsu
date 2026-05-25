/* v039_16 story player UI + CG load gate */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;

  ns.story = {
    active: false,
    data: null,
    index: -1,
    returnInfo: null,
    isEnding: false,
    isLoadingStep: false
  };

  ns.resetStoryRuntime = function resetStoryRuntime() {
    ns.story.active = false;
    ns.story.data = null;
    ns.story.index = -1;
    ns.story.returnInfo = null;
    ns.story.isEnding = false;
    ns.story.isLoadingStep = false;
    document.body.classList.remove("tenotsu-story-active", "tenotsu-story-final-line", "tenotsu-story-loading");

    const layers = ns.layers || ns.ensureLayers();
    if (layers.story) {
      layers.story.classList.remove("ending", "loading");
      layers.story.style.removeProperty("pointer-events");
      layers.story.hidden = true;
      layers.story.innerHTML = "";
    }

    if (layers.fade) {
      layers.fade.style.transition = "";
      layers.fade.style.opacity = "0";
      layers.fade.style.display = "none";
      layers.fade.style.pointerEvents = "none";
    }
  };

  ns.loadStoryScenario = async function loadStoryScenario(path) {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error("scenario fetch failed: " + path + " / " + res.status);
    return await res.json();
  };

  ns.prepareStoryFirstBackground = async function prepareStoryFirstBackground(data) {
    const first = data && data.steps && data.steps[0] ? data.steps[0] : null;
    if (first && first.bg) {
      if (typeof ns.setBackgroundReady === "function") {
        await ns.setBackgroundReady(first.bg);
      } else {
        ns.setBackground(first.bg);
      }
    }
  };

  ns.fadeOutForStoryStart = function fadeOutForStoryStart() {
    const layers = ns.layers || ns.ensureLayers();
    layers.fade.style.display = "block";
    layers.fade.style.pointerEvents = "auto";
    layers.fade.style.transition = "opacity 520ms ease";
    layers.fade.style.opacity = "0";
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        layers.fade.style.opacity = "1";
        setTimeout(resolve, 560);
      });
    });
  };

  ns.fadeInForStoryStart = function fadeInForStoryStart() {
    const layers = ns.layers || ns.ensureLayers();
    layers.fade.style.display = "block";
    layers.fade.style.pointerEvents = "auto";
    layers.fade.style.transition = "opacity 520ms ease";
    layers.fade.style.opacity = "1";
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        layers.fade.style.opacity = "0";
        setTimeout(() => {
          layers.fade.style.display = "none";
          layers.fade.style.pointerEvents = "none";
          layers.fade.style.transition = "";
          resolve();
        }, 560);
      });
    });
  };

  ns.setStoryLoading = function setStoryLoading(isLoading) {
    ns.story.isLoadingStep = !!isLoading;
    document.body.classList.toggle("tenotsu-story-loading", !!isLoading);
    const layer = ns.layers && ns.layers.story;
    if (layer) layer.classList.toggle("loading", !!isLoading);
    const hint = layer ? layer.querySelector(".tenotsu-story-hint") : null;
    if (hint) hint.textContent = isLoading ? "CG読み込み中…" : "クリック / タップで進む";
    const click = layer ? layer.querySelector("[data-story-action='next']") : null;
    if (click) click.disabled = !!isLoading;
  };

  ns.startStory = async function startStory(scenarioPath, returnInfo = {}) {
    try {
      ns.ensureLayers();

      await ns.fadeOutForStoryStart();

      ns.setMode("story");
      ns.resetStoryRuntime();
      ns.setMode("story");

      if (typeof ns.hideSettingsPanel === "function") ns.hideSettingsPanel();
      if (typeof ns.hideShopPanel === "function") ns.hideShopPanel();
      if (typeof ns.hideMembersPanel === "function") ns.hideMembersPanel();
      if (typeof ns.hideTownPanel === "function") ns.hideTownPanel();
      if (typeof ns.clearCharacters === "function") ns.clearCharacters();

      const data = await ns.loadStoryScenario(scenarioPath);
      await ns.prepareStoryFirstBackground(data);

      ns.story.active = true;
      ns.story.data = data;
      ns.story.index = -1;
      ns.story.returnInfo = data.return || returnInfo || {};
      ns.story.isEnding = false;
      ns.story.isLoadingStep = false;

      ns.showStoryLayer(`
        <button type="button" class="tenotsu-story-click" data-story-action="next" aria-label="次へ"></button>
        <div class="tenotsu-story-ui">
          <div class="tenotsu-story-title">${data.title || "Story"}</div>
          <div class="tenotsu-story-progress" data-story-progress>0 / ${(data.steps || []).length}</div>
          <button type="button" class="tenotsu-story-skip" data-story-action="end">終了</button>
        </div>
        <div class="tenotsu-story-hint">クリック / タップで進む</div>
      `);

      const layer = ns.layers.story;
      layer.classList.remove("ending", "loading");
      layer.style.removeProperty("pointer-events");
      const nextButton = layer.querySelector('[data-story-action="next"]');
      const endButton = layer.querySelector('[data-story-action="end"]');
      if (nextButton) nextButton.onclick = () => ns.nextStoryStep();
      if (endButton) endButton.onclick = () => ns.beginStoryEnd();

      document.body.classList.add("tenotsu-story-active");
      await ns.nextStoryStep({ initial: true });

      await ns.fadeInForStoryStart();
    } catch (err) {
      console.error(err);
      ns.setText("システム", "シナリオを読み込めませんでした: " + err.message);
      const layers = ns.layers || ns.ensureLayers();
      if (layers.fade) {
        layers.fade.style.opacity = "0";
        layers.fade.style.display = "none";
        layers.fade.style.pointerEvents = "none";
        layers.fade.style.transition = "";
      }
      if (typeof ns.enterTown === "function") ns.enterTown();
    }
  };

  ns.storyProgressText = function storyProgressText() {
    const steps = (ns.story.data && ns.story.data.steps) ? ns.story.data.steps : [];
    const current = Math.min(Math.max(ns.story.index + 1, 1), Math.max(steps.length, 1));
    return current + " / " + steps.length;
  };

  ns.updateStoryUi = function updateStoryUi() {
    const layer = ns.layers && ns.layers.story;
    if (!layer) return;
    const progress = layer.querySelector("[data-story-progress]");
    if (progress) progress.textContent = ns.storyProgressText();
    const steps = (ns.story.data && ns.story.data.steps) ? ns.story.data.steps : [];
    layer.dataset.storyIndex = String(ns.story.index);
    layer.dataset.storyTotal = String(steps.length);
  };

  ns.applyStoryStep = async function applyStoryStep(step) {
    if (!step) return;
    if (step.bg) {
      ns.setStoryLoading(true);
      try {
        if (typeof ns.setBackgroundReady === "function") {
          await ns.setBackgroundReady(step.bg);
        } else {
          ns.setBackground(step.bg);
        }
      } finally {
        ns.setStoryLoading(false);
      }
    }
    ns.setText(step.speaker || "", step.text || "");
  };

  ns.nextStoryStep = async function nextStoryStep(options = {}) {
    if (!ns.story.active || !ns.story.data || ns.story.isEnding || ns.story.isLoadingStep) return;
    const steps = ns.story.data.steps || [];
    const nextIndex = ns.story.index + 1;

    if (nextIndex >= steps.length) {
      ns.beginStoryEnd();
      return;
    }

    ns.story.index = nextIndex;
    const step = steps[ns.story.index];

    await ns.applyStoryStep(step);
    ns.updateStoryUi();

    const isFinalContinue = (step.speaker === "システム" && String(step.text || "").includes("物語は続く"));
    document.body.classList.toggle("tenotsu-story-final-line", isFinalContinue);
  };

  ns.beginStoryEnd = function beginStoryEnd() {
    if (!ns.story.active || ns.story.isEnding || ns.story.isLoadingStep) return;
    ns.story.isEnding = true;

    const layer = ns.layers && ns.layers.story;
    if (layer) layer.classList.add("ending");

    ns.fadeToBlackThenReturn();
  };

  ns.fadeToBlackThenReturn = function fadeToBlackThenReturn() {
    const layers = ns.layers || ns.ensureLayers();
    layers.fade.style.display = "block";
    layers.fade.style.pointerEvents = "auto";
    layers.fade.style.transition = "opacity 900ms ease";
    requestAnimationFrame(() => {
      layers.fade.style.opacity = "1";
    });

    setTimeout(() => {
      ns.endStory();
      layers.fade.style.transition = "opacity 650ms ease";
      requestAnimationFrame(() => {
        layers.fade.style.opacity = "0";
      });
      setTimeout(() => {
        layers.fade.style.display = "none";
        layers.fade.style.pointerEvents = "none";
        layers.fade.style.transition = "";
        layers.fade.style.opacity = "0";
        if (ns.layers && ns.layers.story) {
          ns.layers.story.classList.remove("ending");
          ns.layers.story.style.removeProperty("pointer-events");
        }
      }, 700);
    }, 950);
  };

  ns.endStory = function endStory() {
    const ret = ns.story.returnInfo || {};
    ns.story.active = false;
    ns.story.data = null;
    ns.story.index = -1;
    ns.story.returnInfo = null;
    ns.story.isEnding = false;
    ns.story.isLoadingStep = false;
    document.body.classList.remove("tenotsu-story-active", "tenotsu-story-final-line", "tenotsu-story-loading");
    if (typeof ns.hideStoryLayer === "function") ns.hideStoryLayer();

    if (ret.mode === "town" && typeof ns.enterTown === "function") {
      ns.enterTown({ noTransition: true });
      if (ret.season && typeof ns.renderSeasonEvents === "function") {
        ns.renderSeasonEvents(ret.season);
        ns.setText("店長", "外回りに戻りました。");
      }
      return;
    }

    if (typeof ns.enterOffice === "function") {
      ns.enterOffice({ speaker: "店長", message: "事務所に戻りました。" });
    }
  };
})();
