const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const park = 'wakaba_central_park';
const springIds = ['ai_spring_book_bread', 'hina_spring_bento'];

// Reload the actual encounter/progress/stamina modules against the same storage.
function fixture(storage = new Map()) {
  const launches = [];
  const messages = [];
  const context = vm.createContext({
    window: { TENOTSU_V039: {}, addEventListener() {}, setInterval() {} },
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value)
    },
    setTimeout() {}
  });
  for (const file of ['scenario/v039/storyIndex.js', 'scenario/v039/recollectionIndex.js',
    'scenario/v039/townEncounterConfig.js', 'program/v039/storyProgress.js',
    'program/v039/stamina.js', 'program/v039/town.js']) {
    vm.runInContext(read(file), context, { filename: file });
  }
  context.window.TENOTSU_DEBUG_ALL_STORIES = false;
  const ns = context.window.TENOTSU_V039;
  ns.layers = { town: { querySelector: () => null, querySelectorAll: () => [] } };
  ns.showTownPanel = () => {};
  ns.setText = (...args) => messages.push(args);
  ns.startStory = (file, info) => launches.push({ file, info });
  return { context, ns, launches, messages, storage, stamina: context.window.TenotsuStamina };
}

test('spring stories agree with their source text, map and recollection registration', () => {
  const { context } = fixture();
  const config = context.window.TENOTSU_TOWN_ENCOUNTER_CONFIG;
  const place = config.places.find(p => p.id === park);
  assert.equal(place.name, '若葉中央公園');
  assert(place.seasons.includes('spring'));
  for (const id of springIds) {
    const story = context.window.TENOTSU_STORY_INDEX.find(s => s.id === id);
    const recollection = context.window.TENOTSU_RECOLLECTION_STORY_INDEX.find(s => s.id === id);
    assert.equal(story.placeId, park, `${id} must be reachable from the existing map`);
    assert.equal(recollection.placeId, park);
    assert.equal(recollection.scenario, story.scenario);
    const source = JSON.parse(read(story.scenario));
    assert(source.steps.some(step => step.text.includes('若葉中央公園')));
    assert.equal(source.steps.length, id === springIds[0] ? 46 : 38);
  }
});

test('spring encounters launch in order, consume ST10 and persist season/read/completion', async () => {
  let f = fixture();
  await f.ns.setTownSeason('spring');
  for (const [index, id] of springIds.entries()) {
    f.ns.startTownEncounter(park);
    assert.equal(f.launches.length, 1);
    const launch = f.launches[0];
    assert.equal(launch.file, `scenario/v039/events/${id}.json`);
    assert.equal(launch.info.storyId, id);
    assert.equal(launch.info.placeId, park);
    assert.equal(launch.info.season, 'spring');
    assert.equal(f.stamina.getState().current, 90 - index * 10);
    assert(f.ns.isStoryRead(id));
    // Completion is supplied by the player; this test exercises its save API.
    f.ns.markStoryCleared(id);
    f = fixture(f.storage);
    assert(f.ns.isStoryCleared(id));
    assert(f.ns.isStoryRead(id));
    assert.equal(f.stamina.getState().current, 90 - index * 10);
    assert.equal(JSON.parse(f.storage.get('tenotsu_town_encounter_v1')).currentSeason, 'spring');
  }
  f.ns.startTownEncounter(park);
  assert.equal(f.launches.length, 0, 'cleared stories are not offered without debug replay');
  assert.equal(f.stamina.getState().current, 80);
});

test('summer encounter and insufficient-stamina guard remain intact', async () => {
  const f = fixture();
  await f.ns.setTownSeason('summer');
  f.stamina.consume(95, 'test setup');
  f.ns.startTownEncounter('marinpia_aqua_tunnel');
  assert.equal(f.launches.length, 0);
  assert.equal(f.stamina.getState().current, 5);
  assert(!f.ns.isStoryRead('kogane_natsumi_marinpia'));
  assert(f.messages.at(-1)[1].includes('スタミナが足りません'));
  f.stamina.recoverAll();
  f.ns.startTownEncounter('marinpia_aqua_tunnel');
  assert.equal(f.launches[0].info.storyId, 'kogane_natsumi_marinpia');
  assert.equal(f.stamina.getState().current, 90);
});
