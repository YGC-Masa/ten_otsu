const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const id = 'manaka_yoshino_greeting_20260924';
const patch = 'scenario/v039/recollectionManakaYoshinoGreetingPatch.js';
const scenarioPath = `scenario/v039/events/${id}.json`;
const scenario = JSON.parse(read(scenarioPath));
const manifest = JSON.parse(read('images/assets/char/af_manaka/manifest.json'));
const assetPaths = new Set(manifest.expressions.map(e => e.path));
const html = read('index.html');
const scripts = [...html.matchAll(/<script\s+src="([^"?]+)(?:\?[^\"]*)?"/g)].map(m => m[1]);
assert.equal(scripts.filter(p => p === patch).length, 1);
assert(scripts.indexOf(patch) > scripts.indexOf('scenario/v039/recollectionIndex.js'));
assert(scripts.indexOf(patch) < scripts.indexOf('program/v039/storyMenu.js'));

const storage = new Map();
const context = vm.createContext({
  window: {},
  localStorage: {
    getItem: k => storage.get(k) || null,
    setItem: (k, v) => storage.set(k, v)
  }
});
const run = p => vm.runInContext(read(p), context, { filename: p });
for (const p of scripts.filter(p => /^scenario\/v039\/recollection/.test(p))) {
  if (p !== patch) run(p);
}
const before = JSON.stringify(context.window.TENOTSU_RECOLLECTION_STORY_INDEX);
run(patch);
run(patch);
const index = context.window.TENOTSU_RECOLLECTION_STORY_INDEX;
assert.equal(index.filter(s => s.id === id).length, 1, 'patch is idempotent');
assert.equal(JSON.stringify(index.filter(s => s.id !== id)), before, 'existing entries unchanged');
run('program/v039/storyProgress.js');
run('program/v039/storyMenu.js');
const ns = context.window.TENOTSU_V039;
assert.equal(ns.getStoriesForTab('other').filter(s => s.id === id).length, 1);
for (const tab of ['spring', 'summer', 'autumn', 'winter', 'event', 'expression']) {
  assert(!ns.getStoriesForTab(tab).some(s => s.id === id));
}
const entry = index.find(s => s.id === id);
assert(ns.isStoryUnlocked(entry));
assert.equal(entry.scenario, scenarioPath);
assert.equal(entry.version, scenario.version);
assert.equal(entry.title, scenario.title);
assert.equal(scenario.id, id);
assert.equal(scenario.format, 'v039_steps');
assert.equal(scenario.return.mode, 'storyMenu');
assert.equal(scenario.return.storyMenuTab, 'other');
assert.equal(scenario.return.storyId, id);
assert.equal(scenario.return.eventId, id);
assert.equal(scenario.steps.length, 13);
assert(scenario.steps[0].clearStorySprites);
assert(scenario.steps[0].forceBackgroundReplace);

for (const step of scenario.steps) {
  assert(['', '大道寺 真花'].includes(step.speaker), 'no invented recipient dialogue');
  assert(step.text.length > 0);
  assert(step.text.length <= 85, 'keep each line short');
  assert(!/思い出.*登録|@|電話|住所|BASIS|浩行/.test(step.text));
  assert.deepEqual(Object.keys(step).filter(k => /unlock|affection|flag|choice|jump/i.test(k)), []);
  if (step.bg) assert(fs.existsSync(path.join(root, step.bg)));
  for (const sprite of step.storySprites || []) {
    assert.equal(sprite.id, 'af');
    assert.equal(sprite.side, 'center');
    assert(assetPaths.has(sprite.src), 'use adopted manifest assets');
    assert(fs.existsSync(path.join(root, sprite.src)), 'asset exists');
  }
}

// Exercise the actual menu click handler with a minimal DOM adapter.
let click;
let launch;
const button = { dataset: { storyId: id }, addEventListener: (event, fn) => { click = fn; } };
ns.layers = { town: {
  querySelectorAll: selector => selector === '[data-story-id]' ? [button] : [],
  querySelector: () => null
} };
ns.showTownPanel = markup => assert(markup.includes(`data-story-id="${id}"`));
ns.startStory = (p, info) => { launch = { p, info }; };
ns.renderStoryMenu('other');
assert.equal(typeof click, 'function');
click();
assert.equal(launch.p, scenarioPath);
assert.equal(launch.info.mode, scenario.return.mode);
assert.equal(launch.info.storyMenuTab, scenario.return.storyMenuTab);
assert.equal(launch.info.storyId, id);
assert(ns.isStoryRead(id));
assert.deepEqual(Object.keys(ns.getStoryProgress().affectionLevels), []);
console.log('PASS: menu selection, registration, 13 steps, asset paths, return metadata, privacy, no affection changes');
