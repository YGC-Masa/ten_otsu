const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../program/v039/storyMenu.js'), 'utf8');
function album(stories) {
  let html = '';
  const panel = { querySelectorAll:()=>[], querySelector:()=>null };
  const ns = { layers:{town:panel}, showTownPanel:value=>{html=value;}, isStoryUnlocked:s=>s.id!=='locked', isStoryRead:()=>false, isStoryCleared:id=>id==='shared' };
  const window = { TENOTSU_V039:ns, TENOTSU_RECOLLECTION_STORY_INDEX:stories };
  vm.runInNewContext(source,{window});
  return {ns,html:()=>html};
}
test('shared cast is selectable under each existing person without duplicating works in one column',()=>{
  const a=album([
    {id:'shared',title:'共有作品',season:'spring',characters:['a','b'],characterNames:['実在A','実在B'],scenario:'shared.json'},
    {id:'only_a',title:'A作品',season:'spring',characters:['a'],characterNames:['実在A'],scenario:'a.json'},
    {id:'key',title:'親愛',type:'key',season:'spring',characters:['a'],characterNames:['実在A'],scenario:'key.json'}
  ]);
  a.ns.renderStoryMenu('spring');
  assert.match(a.html(),/data-album-character="id:a"/);
  assert.match(a.html(),/data-album-character="id:b"/);
  assert.equal((a.html().match(/data-story-id="shared"/g)||[]).length,1);
  assert.match(a.html(),/data-story-id="only_a"/);
  assert.doesNotMatch(a.html(),/data-story-id="key"/);
  a.ns.storyMenuSelectedCharacters.spring='id:b';a.ns.renderStoryMenu('spring');
  assert.match(a.html(),/作品 · 実在B/);assert.match(a.html(),/読了/);
  assert.doesNotMatch(a.html(),/data-story-id="only_a"/);
});
test('unassigned metadata, empty categories and locked playback remain explicit without inventing a cast',()=>{
  const a=album([{id:'locked',title:'未解放',category:'event',scenario:'locked.json'},{id:'intro_x',title:'自己紹介',category:'intro',scenario:'intro.json'}]);
  a.ns.renderStoryMenu('event');assert.match(a.html(),/人物情報なし/);
  assert.match(a.html(),/data-story-id="locked" disabled/);assert.doesNotMatch(a.html(),/data-story-id="intro_x"/);
  a.ns.renderStoryMenu('winter');assert.match(a.html(),/冬に表示できる回想ストーリーはまだありません/);
  assert.equal((a.html().match(/data-story-menu-tab=/g)||[]).length,7);
});
