/* v039_12 story player UI */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;

  ns.story = {
    active: false,
    data: null,
    index: -1,
    returnInfo: null,
    isEnding: false
  };

  ns.resetStoryRuntime = function resetStoryRuntime() {
    ns.story.active = false;
    ns.story.data = null;
    ns.story.index = -1;
    ns.story.returnInfo = null;
    ns.story.isEnding = false;
    document.body.classList.remove("tenotsu-story-active", "tenotsu-story-final-line");

    const layers = ns.layers || ns.ensureLayers();
    if (layers.story) {
      layers.story.classList.remove("ending");
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

  ns.storyProgressText = function storyProgressText() {
    const steps = (ns.story.data && ns.story.data.steps) ? ns.story.data.steps : [];
    const current = Math.min(Math.max(ns.story.index + 1, 1), Math.max(steps.length, 1));
    return current + " / " + steps.length;
  };

  ns.startStory = async function startStory(scenarioPath, returnInfo = {}) {
    try {
      ns.setMode("story");
      ns.ensureLayers();
      ns.resetStoryRuntime();
      ns.setMode("story");
      if (typeof ns.hideSettingsPanel === "function") ns.hideSettingsPanel();
      if (typeof ns.hideShopPanel === "function") ns.hideShopPanel();
      if (typeof ns.hideMembersPanel === "function") ns.hideMembersPanel();
      if (typeof ns.hideTownPanel === "function") ns.hideTownPanel();
      if (typeof ns.clearCharacters === "function") ns.clearCharacters();

      const data = await ns.loadStoryScenario(scenarioPath);
      ns.story.active = true;
      ns.story.data = data;
      ns.story.index = -1;
      ns.story.returnInfo = data.return || returnInfo || {};
      ns.story.isEnding = false;

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
      layer.classList.remove("ending");
      layer.style.removeProperty("pointer-events");
      const nextButton = layer.querySelector('[data-story-action="next"]');
      const endButton = layer.querySelector('[data-story-action="end"]');
      if (nextButton) nextButton.onclick = () => ns.nextStoryStep();
      if (endButton) endButton.onclick = () => ns.beginStoryEnd();

      document.body.classList.add("tenotsu-story-active");
      ns.nextStoryStep();
    } catch (err) {
      console.error(err);
      ns.setText("システム", "シナリオを読み込めませんでした: " + err.message);
      if (typeof ns.enterTown === "function") ns.enterTown();
    }
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

  ns.nextStoryStep = function nextStoryStep() {
    if (!ns.story.active || !ns.story.data || ns.story.isEnding) return;
    const steps = ns.story.data.steps || [];
    ns.story.index += 1;

    if (ns.story.index >= steps.length) {
      ns.beginStoryEnd();
      return;
    }

    const step = steps[ns.story.index];
    if (step.bg) ns.setBackground(step.bg);
    ns.setText(step.speaker || "", step.text || "");
    ns.updateStoryUi();

    const isFinalContinue = (step.speaker === "システム" && String(step.text || "").includes("物語は続く"));
    document.body.classList.toggle("tenotsu-story-final-line", isFinalContinue);
  };

  ns.beginStoryEnd = function beginStoryEnd() {
    if (!ns.story.active || ns.story.isEnding) return;
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
    document.body.classList.remove("tenotsu-story-active", "tenotsu-story-final-line");
    if (typeof ns.hideStoryLayer === "function") ns.hideStoryLayer();

    if (ret.mode === "town" && typeof ns.enterTown === "function") {
      ns.enterTown();
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
