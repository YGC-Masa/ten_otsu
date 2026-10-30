/* v039_228 recollection album separate index + seasonal category fix. Member affection / intro stories live elsewhere. */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};

  const ALBUM_TABS = [
    { id:"spring", label:"春" },
    { id:"summer", label:"夏" },
    { id:"autumn", label:"秋" },
    { id:"winter", label:"冬" },
    { id:"other", label:"その他" },
    { id:"event", label:"イベント" },
    { id:"expression", label:"表情確認" }
  ];

  function esc(value){ return String(value == null ? "" : value).replace(/[&<>"]/g, (ch) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch])); }
  function allStories(){
    const source = Array.isArray(window.TENOTSU_RECOLLECTION_STORY_INDEX) ? window.TENOTSU_RECOLLECTION_STORY_INDEX : (Array.isArray(window.TENOTSU_STORY_INDEX) ? window.TENOTSU_STORY_INDEX : []);
    return source.slice().sort((a,b)=>(a.order||0)-(b.order||0));
  }
  function storyTypeLabel(type){ return ({ normal:"通常", key:"キー", main:"メイン" })[type] || type || "story"; }
  function characterLine(story){ return (story.characterNames || story.characters || []).join(" / ") || "-"; }

  function isAffectionStory(story){
    if (!story) return false;
    const id = String(story.id || "");
    const cat = String(story.category || "");
    const type = String(story.type || "");
    const scenario = String(story.scenario || "");
    return id.includes("affection")
      || scenario.includes("affection")
      || cat === "character_key"
      || cat === "character_main"
      || type === "key"
      || type === "main"
      || !!story.affectionLabel
      || !!story.affectionBlock;
  }

  function isIntroStory(story){
    if (!story) return false;
    const id = String(story.id || "");
    const scenario = String(story.scenario || "");
    const title = String(story.title || story.rawTitle || "");
    const cat = String(story.category || "");
    return id.startsWith("intro_")
      || /(^|\/)intro_[^/]+\.json$/i.test(scenario)
      || cat === "character_intro"
      || cat === "intro"
      || title.includes("自己紹介");
  }

  function isExcludedFromRecollection(story){
    return isAffectionStory(story) || isIntroStory(story);
  }

  function searchableText(story){
    return [story.title, story.rawTitle, story.summary, story.locationName, story.placeName, story.season, story.category, (story.tags || []).join(" ")].filter(Boolean).join(" ");
  }

  function isEventStory(story){
    const text = searchableText(story);
    const cat = String(story.category || "");
    return cat.includes("event") || cat.includes("encounter") || text.includes("イベント") || text.includes("外回り") || text.includes("encounter");
  }

  function seasonOfStory(story){
    const season = String(story.season || "").toLowerCase();
    const text = searchableText(story);
    if (season === "spring" || season === "春" || text.includes("春")) return "spring";
    if (season === "summer" || season === "夏" || text.includes("夏")) return "summer";
    if (season === "autumn" || season === "fall" || season === "秋" || text.includes("秋")) return "autumn";
    if (season === "winter" || season === "冬" || text.includes("冬")) return "winter";
    return "other";
  }

  function isExpressionCheckStory(story){
    if (!story) return false;
    const id = String(story.id || "");
    const cat = String(story.category || "");
    return cat === "test" || /expression_(?:25|legacy)_test/.test(id);
  }

  function expressionGroup(story){
    const ids = Array.isArray(story && story.characters) ? story.characters : [];
    if (ids.some((id) => /^a[a-n]$/.test(String(id)))) return "hidamari";
    if (ids.some((id) => /^b[a-c]$/.test(String(id)))) return "biribiri";
    return "other";
  }

  function expressionGroupLabel(group){
    return ({ hidamari:"ひだまりストア", biribiri:"ビリビリ電機", other:"その他" })[group] || "その他";
  }

  function tabForStory(story){
    if (isExpressionCheckStory(story)) return "expression";
    if (story && story.albumTab) return story.albumTab;
    const season = seasonOfStory(story);
    // 季節情報があるストーリーは、イベント系でも春夏秋冬へ優先分類する。
    if (season !== "other") return season;
    if (isEventStory(story)) return "event";
    return "other";
  }

  function tabLabel(tab){
    return (ALBUM_TABS.find((item) => item.id === tab) || ALBUM_TABS.find((item) => item.id === "other")).label;
  }

  ns.hideStoryMenuPanel = function hideStoryMenuPanel(){
    if (typeof ns.hideTownPanel === "function") ns.hideTownPanel();
  };

  ns.getStoriesForTab = function getStoriesForTab(tab){
    const activeTab = ALBUM_TABS.some((item) => item.id === tab) ? tab : "other";
    return allStories().filter((s) => {
      if (isExcludedFromRecollection(s)) return false;
      if (typeof ns.canShowInRecollection === "function" && !ns.canShowInRecollection(s)) return false;
      return tabForStory(s) === activeTab;
    });
  };

  ns.renderStoryMenu = function renderStoryMenu(tab = "other"){
    const activeTab = ALBUM_TABS.some((item) => item.id === tab) ? tab : "other";
    const stories = ns.getStoriesForTab(activeTab);
    const debugNote = window.TENOTSU_DEBUG_ALL_STORIES ? "開発用：未読・未解放も表示中" : "読了済みのみ表示";
    const tabs = ALBUM_TABS.map((item) => `<button type="button" class="tenotsu-story-menu-tab ${item.id===activeTab?"active":""}" data-story-menu-tab="${esc(item.id)}" aria-pressed="${item.id===activeTab}">${esc(item.label)}<span aria-hidden="true">›</span></button>`).join("");
    const people = new Map();
    stories.forEach((story) => {
      const ids = Array.isArray(story.characters) ? story.characters : [];
      const names = Array.isArray(story.characterNames) ? story.characterNames : [];
      const count = Math.max(ids.length, names.length, 1);
      for (let index = 0; index < count; index++) {
        const key = ids[index] ? `id:${ids[index]}` : names[index] ? `name:${names[index]}` : "unlisted";
        if (!people.has(key)) people.set(key, { key, label:names[index] || ids[index] || "人物情報なし", stories:[], group:expressionGroup(story) });
        const person = people.get(key);
        if (!person.stories.includes(story)) person.stories.push(story);
      }
    });
    const selections = ns.storyMenuSelectedCharacters = ns.storyMenuSelectedCharacters || {};
    const selected = people.get(selections[activeTab]) || people.values().next().value;
    if (selected) selections[activeTab] = selected.key;
    let lastGroup = "";
    const characters = [...people.values()].map((person) => {
      const groupTitle = activeTab === "expression" && person.group !== lastGroup
        ? `<h3 class="tenotsu-album-group">${esc(expressionGroupLabel(person.group))}</h3>` : "";
      lastGroup = person.group;
      return `${groupTitle}<button type="button" class="tenotsu-album-character ${selected === person?"active":""}" data-album-character="${esc(person.key)}" aria-pressed="${selected === person}"><span>${esc(person.label)}</span><small>${person.stories.length}作品 ›</small></button>`;
    }).join("");
    const renderStoryCard = (story) => {
      const unlocked = typeof ns.isStoryUnlocked === "function" ? ns.isStoryUnlocked(story) : true;
      const cleared = typeof ns.isStoryCleared === "function" ? ns.isStoryCleared(story.id) : false;
      const read = typeof ns.isStoryRead === "function" ? ns.isStoryRead(story.id) : false;
      const state = cleared ? "読了" : (read ? "既読" : "未読");
      const disabled = !unlocked || !story.scenario;
      const expressionMeta = activeTab === "expression"
        ? `25表情 / ${characterLine(story)}`
        : `${storyTypeLabel(story.type)} / ${story.category || "-"} / ${characterLine(story)}`;
      return `
        <button type="button" class="tenotsu-story-menu-card ${cleared?"cleared":""} ${disabled?"locked":""}" data-story-id="${esc(story.id)}" ${disabled?"disabled":""}>
          <span class="tenotsu-story-menu-card-head">
            <b>${esc(story.title)}</b>
            <i>${esc(story.version || "")}</i>
          </span>
          <span class="tenotsu-story-menu-card-meta">${esc(expressionMeta)}</span>
          <span class="tenotsu-story-menu-card-summary">${esc(story.summary || "")}</span>
          <span class="tenotsu-story-menu-card-state">${unlocked ? state : "未解放"}</span>
        </button>
      `;
    };
    const body = selected ? selected.stories.map(renderStoryCard).join("")
      : `<div class="tenotsu-story-menu-empty">${esc(tabLabel(activeTab))}に表示できる回想ストーリーはまだありません。</div>`;

    const html = `
      <div class="tenotsu-story-menu-title">回想アルバム</div>
      <div class="tenotsu-story-menu-subtitle">読了済みの通常・季節・イベントストーリーを再生するアルバムです。親愛系はメンバー個別プロフィール、自己紹介は自己紹介メニューから確認します。</div>
      <div class="tenotsu-story-menu-debug">${esc(debugNote)}</div>
      <div class="tenotsu-album-columns" aria-label="分類・登場人物・作品">
        <section class="tenotsu-album-column"><h2>分類</h2><div class="tenotsu-story-menu-tabs tenotsu-album-column-scroll" data-tenotsu-recollection-tabs="true">${tabs}</div></section>
        <section class="tenotsu-album-column"><h2>登場人物</h2><div class="tenotsu-album-characters tenotsu-album-column-scroll">${characters || '<div class="tenotsu-album-empty">表示できる人物はいません。</div>'}</div></section>
        <section class="tenotsu-album-column"><h2>作品${selected ? ` · ${esc(selected.label)}` : ""}</h2><div class="tenotsu-story-menu-list tenotsu-album-column-scroll" data-tenotsu-recollection-list="true">${body}</div></section>
      </div>
      <div class="tenotsu-story-menu-actions">
        <button type="button" class="tenotsu-town-back" data-story-menu-action="office">事務所に戻る</button>
      </div>
    `;
    ns.showTownPanel(html);
    const panel = ns.layers && ns.layers.town;
    if (!panel) return;
    panel.querySelectorAll("[data-story-menu-tab]").forEach((btn)=>btn.addEventListener("click",()=>{
      const categoryScroll = panel.querySelector(".tenotsu-story-menu-tabs").scrollTop;
      ns.renderStoryMenu(btn.dataset.storyMenuTab || "other");
      panel.querySelector(".tenotsu-story-menu-tabs").scrollTop = categoryScroll;
      const current = panel.querySelector('[data-story-menu-tab="' + (btn.dataset.storyMenuTab || "other") + '"]');
      if (current) current.focus({ preventScroll:true });
    }));
    panel.querySelectorAll("[data-album-character]").forEach((btn)=>btn.addEventListener("click",()=>{
      const characterScroll = panel.querySelector(".tenotsu-album-characters").scrollTop;
      const categoryScroll = panel.querySelector(".tenotsu-story-menu-tabs").scrollTop;
      selections[activeTab] = btn.dataset.albumCharacter;
      ns.renderStoryMenu(activeTab);
      const list = panel.querySelector(".tenotsu-album-characters");
      if (list) list.scrollTop = characterScroll;
      panel.querySelector(".tenotsu-story-menu-tabs").scrollTop = categoryScroll;
      const current = [...panel.querySelectorAll("[data-album-character]")].find((node)=>node.dataset.albumCharacter === selections[activeTab]);
      if (current) current.focus({ preventScroll:true });
    }));
    panel.querySelectorAll("[data-story-id]").forEach((btn)=>btn.addEventListener("click",()=>{
      const story = allStories().find((s)=>s.id === btn.dataset.storyId);
      if (!story || !story.scenario || (typeof ns.isStoryUnlocked === "function" && !ns.isStoryUnlocked(story))) return;
      if (typeof ns.markStoryRead === "function") ns.markStoryRead(story.id);
      if (typeof ns.startStory === "function") ns.startStory(story.scenario, { mode:"storyMenu", storyId:story.id, storyMenuTab:activeTab });
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
    ns.renderStoryMenu(options.storyMenuTab || options.tab || "other");
    ns.setText("回想アルバム", "回想アルバムを開きました。");
  };
})();
