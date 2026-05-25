/* v039_10 story player minimum */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;

  ns.story = {
    active: false,
    data: null,
    index: -1,
    returnInfo: null
  };

  ns.loadStoryScenario = async function loadStoryScenario(path) {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error("scenario fetch failed: " + path + " / " + res.status);
    return await res.json();
  };

  ns.startStory = async function startStory(scenarioPath, returnInfo = {}) {
    try {
      ns.setMode("story");
      ns.ensureLayers();
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

      ns.showStoryLayer(`
        <button type="button" class="tenotsu-story-click" data-story-action="next" aria-label="次へ"></button>
        <button type="button" class="tenotsu-story-skip" data-story-action="end">終了</button>
      `);

      const layer = ns.layers.story;
      layer.querySelector('[data-story-action="next"]').addEventListener("click", () => ns.nextStoryStep());
      layer.querySelector('[data-story-action="end"]').addEventListener("click", () => ns.endStory());

      ns.nextStoryStep();
    } catch (err) {
      console.error(err);
      ns.setText("システム", "シナリオを読み込めませんでした: " + err.message);
      if (typeof ns.enterTown === "function") ns.enterTown();
    }
  };

  ns.nextStoryStep = function nextStoryStep() {
    if (!ns.story.active || !ns.story.data) return;
    const steps = ns.story.data.steps || [];
    ns.story.index += 1;

    if (ns.story.index >= steps.length) {
      ns.endStory();
      return;
    }

    const step = steps[ns.story.index];
    if (step.bg) ns.setBackground(step.bg);
    ns.setText(step.speaker || "", step.text || "");

    const layer = ns.layers.story;
    if (layer) {
      layer.dataset.storyIndex = String(ns.story.index);
      layer.dataset.storyTotal = String(steps.length);
    }
  };

  ns.endStory = function endStory() {
    const ret = ns.story.returnInfo || {};
    ns.story.active = false;
    ns.story.data = null;
    ns.story.index = -1;
    ns.story.returnInfo = null;
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
