/* v039_107 story progress / unlock judgement */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};
  const STORAGE_KEY = "tenotsu_story_progress_v1";
  window.TENOTSU_DEBUG_ALL_STORIES = true; // v039_107 trial: show all story records for verification.

  function clone(obj){ return JSON.parse(JSON.stringify(obj || {})); }
  function load(){
    let data = null;
    try { data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch (_) { data = null; }
    if (!data || typeof data !== "object") data = {};
    data.version = data.version || "v039_107";
    data.clearedStories = Array.isArray(data.clearedStories) ? data.clearedStories : [];
    data.readStories = Array.isArray(data.readStories) ? data.readStories : [];
    data.updatedAt = data.updatedAt || new Date().toISOString();
    return data;
  }
  function save(data){
    data.updatedAt = new Date().toISOString();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_) {}
    return data;
  }
  function uniquePush(arr, value){ if (value && !arr.includes(value)) arr.push(value); }
  function getStoryIndex(){ return Array.isArray(window.TENOTSU_STORY_INDEX) ? window.TENOTSU_STORY_INDEX : []; }
  function getStoryById(storyId){ return getStoryIndex().find((s) => s && s.id === storyId) || null; }

  ns.getStoryProgress = function getStoryProgress(){ return clone(load()); };
  ns.isStoryCleared = function isStoryCleared(storyId){ return load().clearedStories.includes(storyId); };
  ns.isStoryRead = function isStoryRead(storyId){ const d = load(); return d.readStories.includes(storyId) || d.clearedStories.includes(storyId); };
  ns.markStoryRead = function markStoryRead(storyId){ const d = load(); uniquePush(d.readStories, storyId); return save(d); };
  ns.markStoryCleared = function markStoryCleared(storyId){ const d = load(); uniquePush(d.readStories, storyId); uniquePush(d.clearedStories, storyId); return save(d); };
  ns.getStoryById = getStoryById;

  ns.getCharacterLevelForUnlock = function getCharacterLevelForUnlock(characterId){
    try {
      if (window.TenotsuGrowth && typeof window.TenotsuGrowth.getCharacterState === "function") {
        const st = window.TenotsuGrowth.getCharacterState(characterId);
        return st && st.level ? Number(st.level) : 1;
      }
    } catch (_) {}
    return 1;
  };

  ns.isKeyStoryComplete = function isKeyStoryComplete(characterId){
    const cfg = window.TENOTSU_KEY_STORY_CONFIG && window.TENOTSU_KEY_STORY_CONFIG[characterId];
    if (!cfg || !Array.isArray(cfg.requiredStories) || !cfg.requiredStories.length) return false;
    return cfg.requiredStories.every((storyId) => ns.isStoryCleared(storyId));
  };

  ns.countCompletedKeyStories = function countCompletedKeyStories(){
    const cfg = window.TENOTSU_KEY_STORY_CONFIG || {};
    return Object.keys(cfg).filter((characterId) => ns.isKeyStoryComplete(characterId)).length;
  };

  ns.isStoryUnlocked = function isStoryUnlocked(story){
    if (!story) return false;
    const unlock = story.unlock || { type: "always" };
    if (window.TENOTSU_DEBUG_ALL_STORIES) return true;
    switch (unlock.type) {
      case "always": return true;
      case "story_cleared": return ns.isStoryCleared(unlock.storyId);
      case "character_level": return ns.getCharacterLevelForUnlock(unlock.character) >= Number(unlock.level || 1);
      case "key_complete": return ns.isKeyStoryComplete(unlock.character);
      case "key_complete_count": return ns.countCompletedKeyStories() >= Number(unlock.count || 0);
      case "all_key_complete": return (unlock.characters || []).every((characterId) => ns.isKeyStoryComplete(characterId));
      default: return false;
    }
  };

  ns.canShowInRecollection = function canShowInRecollection(story){
    if (!story) return false;
    if (window.TENOTSU_DEBUG_ALL_STORIES) return true;
    return ns.isStoryCleared(story.id);
  };
})();
