/* v039_296 story completion notice suppression and end-flow guard */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};
  if (ns.__storyEndFlowFixV039296) return;
  ns.__storyEndFlowFixV039296 = true;

  const COMPLETION_STORAGE_KEY = "tenotsu-story-completion-seen-v1";
  const MEMORY_REGISTERED_PATTERN = /思い出に登録しました/;

  function loadCompletionState(){
    try {
      const value = JSON.parse(localStorage.getItem(COMPLETION_STORAGE_KEY) || "{}");
      return value && typeof value === "object" ? value : {};
    } catch (_) {
      return {};
    }
  }

  function completionId(){
    const story = ns.story || {};
    const data = story.data || {};
    const ret = story.returnInfo || {};
    return String(ret.storyId || ret.eventId || data.id || story.scenarioPath || "");
  }

  function hasCompletedBefore(data, ret){
    const id = String((ret && (ret.storyId || ret.eventId)) || (data && data.id) || "");
    try {
      if (ret && ret.storyId && typeof ns.isStoryCleared === "function" && ns.isStoryCleared(ret.storyId)) return true;
      if (ret && ret.eventId && typeof ns.isEventRead === "function" && ns.isEventRead(ret.eventId)) return true;
      if (id && typeof ns.isStoryCleared === "function" && ns.isStoryCleared(id)) return true;
      if (id && typeof ns.isEventRead === "function" && ns.isEventRead(id)) return true;
    } catch (_) {}
    return !!(id && loadCompletionState()[id]);
  }

  function rememberCompletion(){
    const id = completionId();
    if (!id) return;
    try {
      const state = loadCompletionState();
      state[id] = { completedAt: Date.now() };
      localStorage.setItem(COMPLETION_STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  function currentStep(){
    const story = ns.story || {};
    const data = story.data || {};
    const steps = Array.isArray(data.steps) ? data.steps : [];
    return steps[Number.isFinite(story.index) ? story.index : -1] || null;
  }

  function isMemoryRegisteredStep(step){
    return !!(step && MEMORY_REGISTERED_PATTERN.test(String(step.text || "")));
  }

  function isTerminalAutoSpacer(step, index, steps){
    if (!step || !step.auto || String(step.text || "").trim() || String(step.speaker || "").trim()) return false;
    return steps.slice(index + 1).every((item) =>
      !String((item && item.text) || "").trim() &&
      !String((item && item.speaker) || "").trim()
    );
  }

  function debugTools(){
    return ns.storyDebugToolsV039293 ||
      ns.storyDebugToolsV039283 ||
      ns.storyDebugToolsV039282 ||
      ns.storyDebugToolsV039281 ||
      ns.storyDebugToolsV039280 ||
      null;
  }

  function stopAutoplay(){
    const dbg = debugTools();
    try { if (dbg && typeof dbg.stopAutoplay === "function") dbg.stopAutoplay(); } catch (_) {}
  }

  function keepStoryUiHidden(){
    const dbg = debugTools();
    try { if (dbg && typeof dbg.setStoryUiVisible === "function") dbg.setStoryUiVisible(false); } catch (_) {}
    document.body.classList.add("tenotsu-story-ui-hidden", "tenotsu-story-ending-blackfade");
    const layer = ns.layers && ns.layers.story;
    if (layer) {
      layer.classList.add("ending");
      layer.style.setProperty("pointer-events", "none");
    }
  }

  function beginBlackStoryEnd(){
    const story = ns.story || {};
    if (!story.active || story.isEnding || story.isLoadingStep) return;
    story.isEnding = true;
    story.awaitingMemoryRegistrationAcknowledge = false;
    rememberCompletion();
    stopAutoplay();
    keepStoryUiHidden();

    const fix = ns.storyEndOfficeBootFixV039287;
    if (fix && typeof fix.endStoryToOfficeBoot === "function") {
      Promise.resolve(fix.endStoryToOfficeBoot()).catch((err) => console.error(err));
      return;
    }
    if (typeof ns.fadeToBlackThenReturn === "function") ns.fadeToBlackThenReturn();
  }

  function install(){
    if (ns.__storyEndFlowFixV039296Installed) return;
    ns.__storyEndFlowFixV039296Installed = true;

    const startStory = ns.startStory;
    if (typeof startStory === "function") {
      ns.startStory = async function storyStartWithUnreadSnapshot(scenarioPath, returnInfo){
        const result = await startStory.apply(this, arguments);
        const story = ns.story || {};
        if (story.active && story.data) {
          story.scenarioPath = scenarioPath;
          story.wasUnreadAtStart = !hasCompletedBefore(story.data, story.returnInfo || returnInfo || {});
          story.awaitingMemoryRegistrationAcknowledge = false;
        }
        return result;
      };
    }

    const nextStoryStep = ns.nextStoryStep;
    if (typeof nextStoryStep === "function") {
      ns.nextStoryStep = async function nextStoryStepWithoutMemoryNotice(){
        const story = ns.story || {};
        const data = story.data || {};
        const steps = Array.isArray(data.steps) ? data.steps : [];
        const nextIndex = (Number.isFinite(story.index) ? story.index : -1) + 1;

        // 「思い出に登録しました」は描画せず、そのまま終了フェードへ移る。
        if (isMemoryRegisteredStep(steps[nextIndex])) {
          beginBlackStoryEnd();
          return;
        }

        return nextStoryStep.apply(this, arguments);
      };
    }

    ns.beginStoryEnd = beginBlackStoryEnd;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once:true });
  } else {
    install();
  }

  ns.storyEndFlowFixV039296 = {
    install,
    beginBlackStoryEnd,
    isMemoryRegisteredStep,
    isTerminalAutoSpacer
  };
})();
