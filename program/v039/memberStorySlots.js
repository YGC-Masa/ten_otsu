/* v039_109 member profile key/main story slots */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};

  function esc(value){ return String(value == null ? "" : value).replace(/[&<>\"]/g, (ch) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch])); }
  function allStories(){ return Array.isArray(window.TENOTSU_STORY_INDEX) ? window.TENOTSU_STORY_INDEX : []; }
  function storyById(id){ return allStories().find((s) => s && s.id === id) || null; }
  function cfgFor(characterId){ return window.TENOTSU_KEY_STORY_CONFIG && window.TENOTSU_KEY_STORY_CONFIG[characterId] ? window.TENOTSU_KEY_STORY_CONFIG[characterId] : { slotStories:{} }; }
  function plan(){ return window.TENOTSU_AFFECTION_STORY_PLAN || null; }

  ns.findMemberStoryForSlot = function findMemberStoryForSlot(characterId, slot){
    const cfg = cfgFor(characterId);
    const mapped = cfg.slotStories && cfg.slotStories[slot.slotId] ? storyById(cfg.slotStories[slot.slotId]) : null;
    if (mapped) return mapped;
    return allStories().find((story) => story && story.character === characterId && story.affectionBlock === Math.ceil(slot.unlockLevel / 10) && story.affectionSlot === (slot.kind === "main" ? "main" : `key${((slot.keyIndex - 1) % 3) + 1}`)) || null;
  };

  ns.getMemberStorySlots = function getMemberStorySlots(characterId, block){
    const p = plan();
    const affection = typeof ns.getAffectionLevel === "function" ? ns.getAffectionLevel(characterId) : 1;
    const targetBlock = block || (p && p.getBlockForLevel ? p.getBlockForLevel(affection) : Math.ceil(affection / 10));
    const slots = p && p.makeSlotsForBlock ? p.makeSlotsForBlock(targetBlock) : [];
    return slots.map((slot) => {
      const story = ns.findMemberStoryForSlot(characterId, slot);
      const unlocked = affection >= slot.unlockLevel && (!story || typeof ns.isStoryUnlocked !== "function" || ns.isStoryUnlocked(story));
      const cleared = story && typeof ns.isStoryCleared === "function" ? ns.isStoryCleared(story.id) : false;
      return Object.assign({}, slot, { story, unlocked, cleared, affectionLevel: affection, block: targetBlock });
    });
  };

  ns.renderMemberStorySlots = function renderMemberStorySlots(member){
    if (!member || !member.id) return "";
    const affection = typeof ns.getAffectionLevel === "function" ? ns.getAffectionLevel(member.id) : 1;
    const p = plan();
    const block = p && p.getBlockForLevel ? p.getBlockForLevel(affection) : Math.ceil(affection / 10);
    const min = (block - 1) * 10 + 1;
    const max = block * 10;
    const slots = ns.getMemberStorySlots(member.id, block);
    const cards = slots.map((slot) => {
      const story = slot.story;
      const state = story ? (slot.cleared ? "読了" : (slot.unlocked ? "再生可" : `親愛Lv.${slot.unlockLevel}`)) : "未登録";
      const disabled = !story || !slot.unlocked;
      return `
        <button type="button" class="tenotsu-member-story-slot ${slot.kind} ${slot.cleared ? "cleared" : ""} ${disabled ? "locked" : ""}" data-member-story-id="${story ? esc(story.id) : ""}" ${disabled ? "disabled" : ""}>
          <span class="slot-label">${esc(slot.label)}</span>
          <b>${esc(story ? story.title : "シナリオ未登録")}</b>
          <small>${esc(state)}</small>
        </button>
      `;
    }).join("");

    return `
      <div class="tenotsu-member-story-box" data-member-story-box="${esc(member.id)}">
        <div class="tenotsu-member-story-head">
          <div>
            <span class="tenotsu-member-story-label">親愛ストーリー</span>
            <b>親愛Lv.${esc(affection)}</b>
            <small>現在段：Lv.${esc(min)}〜${esc(max)} / 100予定</small>
          </div>
          <div class="tenotsu-member-story-debug">
            <button type="button" data-affection-debug="down" data-character-id="${esc(member.id)}">-1</button>
            <button type="button" data-affection-debug="up" data-character-id="${esc(member.id)}">+1</button>
          </div>
        </div>
        <div class="tenotsu-member-story-slot-grid">${cards}</div>
        <div class="tenotsu-member-story-note">Lv.1〜9でキー3本、Lv.10でメイン1本。以後Lv.11〜19でキー3本、Lv.20でメイン2本……Lv.100まで同じ構造です。</div>
      </div>
    `;
  };

  ns.bindMemberStorySlots = function bindMemberStorySlots(detail, member, rerender){
    if (!detail || !member) return;
    detail.querySelectorAll("[data-member-story-id]").forEach((btn) => {
      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        const story = storyById(btn.dataset.memberStoryId);
        if (!story || !story.scenario || (typeof ns.isStoryUnlocked === "function" && !ns.isStoryUnlocked(story))) return;
        if (typeof ns.markStoryRead === "function") ns.markStoryRead(story.id);
        if (typeof ns.startStory === "function") ns.startStory(story.scenario, { mode: "members", memberId: member.id, storyId: story.id });
      });
    });
    detail.querySelectorAll("[data-affection-debug]").forEach((btn) => {
      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        const delta = btn.dataset.affectionDebug === "up" ? 1 : -1;
        if (typeof ns.addAffectionLevel === "function") ns.addAffectionLevel(member.id, delta);
        if (typeof rerender === "function") rerender(member);
      });
    });
  };
})();
