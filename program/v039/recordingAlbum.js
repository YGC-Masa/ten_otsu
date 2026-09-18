/* v039_298 dedicated video-recording recollection album */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};
  if (ns.__recordingAlbumV039298) return;
  ns.__recordingAlbumV039298 = true;

  function requested(){
    try { return new URLSearchParams(location.search).get("recording") === "1"; }
    catch (_) { return false; }
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
    if (!ns.recordingAlbumActive) return;
    document.body.classList.add("tenotsu-recording-album");
    const panel = ns.layers && ns.layers.town;
    if (!panel) return;

    const title = panel.querySelector(".tenotsu-story-menu-title");
    const subtitle = panel.querySelector(".tenotsu-story-menu-subtitle");
    const note = panel.querySelector(".tenotsu-story-menu-debug");
    if (title) title.textContent = "動画録画用アルバム";
    if (subtitle) subtitle.textContent = "回想アルバムと同じシナリオを、録画用の戻り先で再生します。";
    if (note) note.textContent = "シナリオ終了後は、この録画用トップへ戻ります。";

    const oldBack = panel.querySelector('[data-story-menu-action="office"]');
    if (oldBack) {
      const back = oldBack.cloneNode(true);
      back.textContent = "通常画面へ戻る";
      back.dataset.storyMenuAction = "recording-exit";
      oldBack.replaceWith(back);
      back.addEventListener("click", () => location.assign(normalUrl()));
    }

    try {
      const url = new URL(location.href);
      url.searchParams.set("recording", "1");
      url.searchParams.set("tab", tab || "other");
      history.replaceState(null, "", url.toString());
    } catch (_) {}
  }

  const renderStoryMenu = ns.renderStoryMenu;
  if (typeof renderStoryMenu === "function") {
    ns.renderStoryMenu = function renderRecordingAwareStoryMenu(tab){
      const activeTab = tab || "other";
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
    if (typeof ns.enterStoryMenu === "function") {
      await ns.enterStoryMenu({ noTransition: options.noTransition !== false, tab });
      decorate(tab);
    }
  };

  function requestedTab(){
    try { return new URLSearchParams(location.search).get("tab") || ""; }
    catch (_) { return ""; }
  }

  ns.isRecordingAlbumRequested = requested;
  ns.decorateRecordingAlbum = decorate;
})();
