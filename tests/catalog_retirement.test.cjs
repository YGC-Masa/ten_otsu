const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const retired = [
  'satomi_kubo_farewell_20260915', 'kohaku_sato_earphone_special_20260916',
  'kogane_maki_cheer_special_20260916', 'chako_kanai_cheer_special_20260916',
  'misora_nozomi_cheer_special_20260916', 'misora_sudo_camp_special_20260917',
  'hina_madoka_night_cheer_special_20260917', 'manaka_yoshino_greeting_20260924'
];
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script\s+src="([^"?]+)/g)].map(m => m[1]);
function catalogs() {
  const context = vm.createContext({window:{}});
  for (const file of scripts.filter(f => /^scenario\/v039\/(?:recollection|storyIndex)/.test(f))) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  }
  return context.window;
}
test('explicit recipient-message group is absent from loaded registrations and source paths', () => {
  const w = catalogs();
  for (const id of retired) {
    assert(!w.TENOTSU_STORY_INDEX.some(s => s.id === id));
    assert(!w.TENOTSU_RECOLLECTION_STORY_INDEX.some(s => s.id === id));
    assert(!fs.existsSync(path.join(root, `scenario/v039/events/${id}.json`)));
  }
  for (const file of scripts) assert(fs.existsSync(path.join(root,file)), `loaded script missing: ${file}`);
});
test('main/affection stories and unrelated recollections remain available', () => {
  const w = catalogs();
  assert.equal(w.TENOTSU_STORY_INDEX.filter(s => s.type === 'key').length, 69);
  assert.equal(w.TENOTSU_STORY_INDEX.filter(s => s.type === 'main').length, 23);
  assert.equal(w.TENOTSU_RECOLLECTION_STORY_INDEX.length,28);
  for (const id of ['ai_spring_book_bread','hina_spring_bento','kogane_natsumi_marinpia','c10002']) {
    assert(w.TENOTSU_RECOLLECTION_STORY_INDEX.some(s => s.id === id));
  }
  assert.equal(w.TENOTSU_RECOLLECTION_STORY_INDEX.filter(s => s.category === 'test').length,19);
  for (const story of [...w.TENOTSU_STORY_INDEX,...w.TENOTSU_RECOLLECTION_STORY_INDEX]) {
    if (story.scenario) assert(fs.existsSync(path.join(root,story.scenario)), `missing retained story: ${story.id}`);
  }
});
