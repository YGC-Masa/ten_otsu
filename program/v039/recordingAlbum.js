/* v039_300 recording mode integrated into recollection album */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};
  if (ns.__recordingAlbumV039300) return;
  ns.__recordingAlbumV039300 = true;

  function query(){
    try { return new URLSearchParams(location.search); }
    catch (_) { return null; }
  }

  function requested(){
    const params = query();
    return !!(params && params.get("recording") === "1");
  }

  function requestedTab(){
    const params = query();
    return params ? (params.get("tab") || "") : "";
  }

  function setUrl(recording, tab){
    try {
      const url = new URL(location.href);
      if (recording) {
        url.searchParams.set("recording", "1");
        url.searchParams.set("tab", tab || "other");
      } else {
        url.searchParams.delete("recording");
        url.searchParams.delete("tab");
      }
      history.replaceState(null, "", url.toString());
    } catch (_) {}
  }

  function normalUrl(){
    try {
      const url = new URL(location.href);
      url.searchParams.delete("recording");
      url.searchParams.delete("tab");
      return url.toString();
    } catch (_) {
      return "index.html";
    }
  }

  function decorate(tab){
    const panel = ns.layers && ns.layers.town;
    if (!panel) return;

    if (!ns.recordingAlbumActive) {
      document.body.classList.remove("tenotsu-recording-album");
      return;
    }

    document.body.classList.add("tenotsu-recording-album");
    const title = panel.querySelector(".tenotsu-story-menu-title");
    const subtitle = panel.querySelector(".tenotsu-story-menu-subtitle");
    const note = panel.querySelector(".tenotsu-story-menu-debug");
    if (title) title.textContent = "動画録画用アルバム";
    if (subtitle) subtitle.textContent = "回想アルバムと同じシナリオを、録画用の戻り先で再生します。";
    if (note) note.textContent = "シナリオ終了後は、この録画用トップへ戻ります。";

    const oldBack = panel.querySelector('[data-story-menu-action="office"]');
    if (oldBack) {
      const back = oldBack.cloneNode(true);
      back.textContent = "事務所に戻る";
      back.dataset.storyMenuAction = "recording-exit";
      oldBack.replaceWith(back);
      back.addEventListener("click", () => location.assign(normalUrl()));
    }
    setUrl(true, tab);
  }

  const renderStoryMenu = ns.renderStoryMenu;
  if (typeof renderStoryMenu === "function") {
    ns.renderStoryMenu = function renderRecordingAwareStoryMenu(tab){
      const activeTab = tab || "other";
      // Recollection browsing is always normal, including legacy recording URLs/state.
      ns.recordingAlbumActive = false;
      document.body.classList.remove("tenotsu-recording-album");
      setUrl(false, activeTab);
      const result = renderStoryMenu.call(this, activeTab);
      decorate(activeTab);
      return result;
    };
  }

  const startStory = ns.startStory;
  if (typeof startStory === "function") {
    ns.startStory = function startRecordingAwareStory(scenarioPath, returnInfo){
      const info = Object.assign({}, returnInfo || {});
      if (ns.recordingAlbumActive && info.mode === "storyMenu") {
        info.mode = "recordingAlbum";
        info.recordingAlbum = true;
      }
      return startStory.call(this, scenarioPath, info);
    };
  }

  ns.enterRecordingAlbum = async function enterRecordingAlbum(options = {}){
    ns.recordingAlbumActive = true;
    document.body.classList.add("tenotsu-recording-album");
    const tab = options.tab || options.storyMenuTab || requestedTab() || "other";
    setUrl(true, tab);
    if (typeof ns.enterStoryMenu === "function") {
      await ns.enterStoryMenu({ noTransition:options.noTransition !== false, tab });
    }
  };

  ns.leaveRecordingAlbum = async function leaveRecordingAlbum(options = {}){
    const tab = options.tab || "other";
    ns.recordingAlbumActive = false;
    document.body.classList.remove("tenotsu-recording-album");
    setUrl(false, tab);
    if (typeof ns.enterStoryMenu === "function") {
      await ns.enterStoryMenu({ noTransition:true, tab });
    }
  };

  ns.recordingAlbumActive = false;
  ns.isRecordingAlbumRequested = requested;
  ns.decorateRecordingAlbum = decorate;
})();
