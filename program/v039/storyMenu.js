/* v039_109 recollection menu only. Main/key progression lives in member profiles. */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};

  function esc(value){ return String(value == null ? "" : value).replace(/[&<>\"]/g, (ch) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch])); }
  function allStories(){ return (Array.isArray(window.TENOTSU_STORY_INDEX) ? window.TENOTSU_STORY_INDEX : []).slice().sort((a,b)=>(a.order||0)-(b.order||0)); }
  function storyTypeLabel(type){ return ({ normal:"通常", key:"キー", main:"メイン" })[type] || type || "story"; }
  function characterLine(story){ return (story.characterNames || story.characters || []).join(" / ") || "-"; }

  ns.hideStoryMenuPanel = function hideStoryMenuPanel(){
    if (typeof ns.hideTownPanel === "function") ns.hideTownPanel();
  };

  ns.getStoriesForTab = function getStoriesForTab(tab){
    const list = allStories();
    return list.filter((s) => typeof ns.canShowInRecollection === "function" ? ns.canShowInRecollection(s) : true);
  };

  ns.renderStoryMenu = function renderStoryMenu(tab = "recollection"){
    const stories = ns.getStoriesForTab("recollection");
    const debugNote = window.TENOTSU_DEBUG_ALL_STORIES ? "開発用：未読・未解放も表示中" : "読了済みのみ表示";
    const body = stories.length ? stories.map((story) => {
      const unlocked = typeof ns.isStoryUnlocked === "function" ? ns.isStoryUnlocked(story) : true;
      const cleared = typeof ns.isStoryCleared === "function" ? ns.isStoryCleared(story.id) : false;
      const read = typeof ns.isStoryRead === "function" ? ns.isStoryRead(story.id) : false;
      const state = cleared ? "読了" : (read ? "既読" : "未読");
      const disabled = !unlocked || !story.scenario;
      return `
        <button type="button" class="tenotsu-story-menu-card ${cleared?"cleared":""} ${disabled?"locked":""}" data-story-id="${esc(story.id)}" ${disabled?"disabled":""}>
          <span class="tenotsu-story-menu-card-head">
            <b>${esc(story.title)}</b>
            <i>${esc(story.version || "")}</i>
          </span>
          <span class="tenotsu-story-menu-card-meta">${esc(storyTypeLabel(story.type))} / ${esc(story.category || "-")} / ${esc(characterLine(story))}</span>
          <span class="tenotsu-story-menu-card-summary">${esc(story.summary || "")}</span>
          <span class="tenotsu-story-menu-card-state">${unlocked ? state : "未解放"}</span>
        </button>
      `;
    }).join("") : `<div class="tenotsu-story-menu-empty">回想に表示できるストーリーはまだありません。</div>`;

    const html = `
      <div class="tenotsu-story-menu-title">回想</div>
      <div class="tenotsu-story-menu-subtitle">読了済みストーリーを再生します。通常ストーリーは外回り、キー/メインはメンバー個別プロフィールから進行します。</div>
      <div class="tenotsu-story-menu-debug">${esc(debugNote)}</div>
      <div class="tenotsu-story-menu-list">${body}</div>
      <div class="tenotsu-story-menu-actions">
        <button type="button" class="tenotsu-town-back" data-story-menu-action="office">事務所に戻る</button>
      </div>
    `;
    ns.showTownPanel(html);
    const panel = ns.layers && ns.layers.town;
    if (!panel) return;
    panel.querySelectorAll("[data-story-id]").forEach((btn)=>btn.addEventListener("click",()=>{
      const story = allStories().find((s)=>s.id === btn.dataset.storyId);
      if (!story || !story.scenario || (typeof ns.isStoryUnlocked === "function" && !ns.isStoryUnlocked(story))) return;
      if (typeof ns.markStoryRead === "function") ns.markStoryRead(story.id);
      if (typeof ns.startStory === "function") ns.startStory(story.scenario, { mode:"storyMenu", storyId:story.id, storyMenuTab:"recollection" });
    }));
    const back = panel.querySelector('[data-story-menu-action="office"]');
    if (back) back.addEventListener("click",()=>{ ns.hideStoryMenuPanel(); ns.enterOffice({ speaker:"店長", message:"事務所に戻りました。" }); });
  };

  ns.enterStoryMenu = async function enterStoryMenu(options = {}){
    if (!options.noTransition && typeof ns.transitionTo === "function") return ns.transitionTo(()=>ns.enterStoryMenu(Object.assign({}, options, { noTransition:true })));
    ns.setMode("storyMenu");
    ns.ensureLayers();
    if (typeof ns.hideSettingsPanel === "function") ns.hideSettingsPanel();
    if (typeof ns.hideShopPanel === "function") ns.hideShopPanel();
    if (typeof ns.hideMembersPanel === "function") ns.hideMembersPanel();
    if (typeof ns.hideStoreStatusPanel === "function") ns.hideStoreStatusPanel();
    if (typeof ns.hideSalesPanel === "function") ns.hideSalesPanel();
    if (typeof ns.hideTuningPanel === "function") ns.hideTuningPanel();
    if (typeof ns.clearCharacters === "function") ns.clearCharacters();
    if (typeof ns.setBackgroundReady === "function") await ns.setBackgroundReady(ns.paths.officeBg); else ns.setBackground(ns.paths.officeBg);
    ns.renderOfficeMenu();
    ns.renderStoryMenu("recollection");
    ns.setText("回想", "回想一覧を開きました。");
  };
})();
