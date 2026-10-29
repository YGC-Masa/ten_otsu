const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const key = 'tenotsu_time_thymus_v1';

function fixture(iso, storage = new Map()) {
  let now = Date.parse(iso);
  const events = {}, timers = [];
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  }
  const ns = { paths: { officeBg: 'images/office.webp', charBase: 'images/assets/char/' }, state: { mode: 'office' } };
  const context = vm.createContext({ Date: Clock, URL,
    window: { TENOTSU_V039: ns, addEventListener: (name, fn) => { events[name] = fn; }, setInterval: (fn, delay) => timers.push({ fn, delay }) },
    document: { hidden: false, querySelectorAll: () => [], addEventListener: (name, fn) => { events[name] = fn; } },
    localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v), removeItem: k => storage.delete(k) }
  });
  for (const file of ['scenario/v039/calendarConfig.js', 'program/v039/calendar.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  return { cal: ns.calendar, ns, storage, events, timers, context, setTime: iso => { now = Date.parse(iso); } };
}

test('all twelve calendar months and seasons use real JST dates', () => {
  const seasons=['winter','winter','spring','spring','spring','summer','summer','summer','autumn','autumn','autumn','winter'];
  for(let m=1;m<=12;m++){
    const f=fixture(`2026-${String(m).padStart(2,'0')}-01T00:00:00+09:00`);
    assert.equal(f.cal.getSnapshot().month,m);
    assert.equal(f.cal.getSnapshot().season,seasons[m-1]);
    assert(Object.values(f.context.window.TENOTSU_CALENDAR_CONFIG.months).every(c=>!c.contentBaseUrl));
  }
});

test('real JST clock crosses month end, year end and leap dates without changing trial selections',()=>{
  for(const [from,to,day,month,year] of [
    ['2026-12-31T23:59:59+09:00','2027-01-01T00:00:00+09:00',1,1,2027],
    ['2026-01-31T23:59:59+09:00','2026-02-01T00:00:00+09:00',1,2,2026],
    ['2028-02-28T23:59:59+09:00','2028-02-29T00:00:00+09:00',29,2,2028],
    ['2027-02-28T23:59:59+09:00','2027-03-01T00:00:00+09:00',1,3,2027]
  ]){
    const f=fixture(from);f.cal.usePeriod('night');f.cal.useSeason('spring');f.setTime(to);f.events.pageshow();
    const s=f.cal.getSnapshot();assert.equal(s.real.day,day);assert.equal(s.month,month);assert.equal(s.real.year,year);
    assert.equal(s.period,'night');assert.equal(s.season,'spring');
  }
});

test('TimeThymus switches morning/day/night independently of seasons, month and real clock',()=>{
  const f=fixture('2026-12-31T23:59:00+09:00');const original=JSON.stringify(f.cal.getSnapshot().real);
  for(const period of ['morning','day','night']){
    assert(f.cal.usePeriod(period).ok);const s=f.cal.getSnapshot();assert.equal(s.period,period);
    assert.equal(s.month,12);assert.equal(s.season,'winter');assert.equal(JSON.stringify(s.real),original);
    assert.equal(s.timeTrial.itemId,'time_thymus');assert(!('expiresAt' in s.timeTrial));assert(!('month' in s.timeTrial));
  }
  assert(!f.cal.usePeriod('evening').ok);
});

test('SeasonRaisin switches four seasons without assigning a time period or moving the real month',()=>{
  const f=fixture('2026-12-31T23:59:00+09:00');f.cal.usePeriod('day');
  for(const season of ['spring','summer','autumn','winter']){
    assert(f.cal.useSeason(season).ok);const s=f.cal.getSnapshot();assert.equal(s.season,season);assert.equal(s.month,12);
    assert.equal(s.period,'day');assert.equal(s.seasonTrial.itemId,'season_raisin');assert(!('expiresAt' in s.seasonTrial));
  }
  assert(!f.cal.useSeason('13').ok);
  f.cal.returnToReality();assert.equal(f.cal.getSnapshot().period,'day');assert.equal(f.cal.getSnapshot().seasonTrial,null);
  f.cal.useSeason('spring');f.cal.returnTimeToReality();assert.equal(f.cal.getSnapshot().season,'spring');assert.equal(f.cal.getSnapshot().period,null);
});

test('free trial reload/resume keeps independent selections; no old month deadline is assigned',()=>{
  let f=fixture('2026-12-31T23:59:00+09:00');f.cal.usePeriod('night');f.cal.useSeason('spring');
  const time=f.storage.get('tenotsu_time_thymus_period_v1'),season=f.storage.get('tenotsu_season_raisin_v1');
  f=fixture('2027-01-02T00:00:00+09:00',f.storage);f.events.focus();f.events.pageshow();f.events.visibilitychange();
  assert.equal(f.cal.getSnapshot().period,'night');assert.equal(f.cal.getSnapshot().season,'spring');
  assert.equal(f.storage.get('tenotsu_time_thymus_period_v1'),time);assert.equal(f.storage.get('tenotsu_season_raisin_v1'),season);
  assert.equal(f.cal.getSnapshot().month,1);
});

test('legacy progress/ST and discarded unpublished wrong-name travel data remain intact',()=>{
  const storage=new Map([
    ['tenotsu_town_encounter_v1',JSON.stringify({currentSeason:'summer',revealedPlaces:{park:true}})],
    ['tenotsu_story_progress_v1','{"clearedStories":["kept"]}'],['tenotsu_stamina_v1','{"current":80}'],
    ['tenotsu_time_thymus_v1','{"version":1,"itemId":"time_thymus","month":3,"expiresAt":"2099-01-01T00:00:00Z"}']
  ]);
  const wrong=storage.get('tenotsu_time_thymus_v1');const f=fixture('2026-12-31T23:59:00+09:00',storage);
  assert.equal(f.cal.getSnapshot().month,12);assert.equal(f.cal.getSnapshot().period,null);
  f.cal.usePeriod('day');f.cal.useSeason('spring');f.cal.returnToReality();f.cal.returnTimeToReality();
  assert.equal(storage.get('tenotsu_time_thymus_v1'),wrong);assert.equal(storage.get('tenotsu_story_progress_v1'),'{"clearedStories":["kept"]}');
  assert.equal(storage.get('tenotsu_stamina_v1'),'{"current":80}');assert(JSON.parse(storage.get('tenotsu_town_encounter_v1')).revealedPlaces.park);
  assert.equal(fixture('2026-12-31T23:59:00+09:00',new Map([['tenotsu_town_encounter_v1','"bad"']])).cal.getSnapshot().season,'winter');
});

test('monthly content is based on real month; empty endpoints fall back and loaded story stays frozen',()=>{
  const f=fixture('2026-03-01T00:00:00+09:00');assert.equal(f.cal.resolveContent('scenario/a.json'),'scenario/a.json');
  f.context.window.TENOTSU_CALENDAR_CONFIG.months['03'].contentBaseUrl='https://example.test/march/';
  const source={steps:[{bg:'images/bg.webp',text:'kept',storySprites:[{src:'images/stand.webp'}]}]};
  const loaded=f.cal.freezeStoryAssets(source,3);assert.equal(loaded.steps[0].bg,'https://example.test/march/images/bg.webp');
  f.cal.useSeason('winter');f.cal.usePeriod('night');assert.equal(f.cal.getSnapshot().month,3);
  f.setTime('2026-04-01T00:00:00+09:00');f.cal.tick();assert.equal(loaded.steps[0].bg,'https://example.test/march/images/bg.webp');
  assert.equal(source.steps[0].bg,'images/bg.webp');assert.equal(loaded.steps[0].text,'kept');assert.equal(f.cal.resolveContent('scenario/a.json'),'scenario/a.json');
});

test('one-second and resume updates never redraw active playback; blocked storage returns failure',()=>{
  const f=fixture('2026-12-31T23:59:00+09:00');let redraws=0;f.ns.renderOfficeCharacters=()=>{redraws++;};f.ns.story={active:true};
  f.setTime('2027-01-01T00:00:00+09:00');assert.equal(f.timers[0].delay,1000);f.timers[0].fn();f.events.focus();f.events.pageshow();f.events.visibilitychange();
  assert.equal(redraws,0);f.context.localStorage.setItem=()=>{throw new Error('blocked');};
  assert.equal(f.cal.usePeriod('day').reason,'storage-unavailable');assert.equal(f.cal.useSeason('spring').reason,'storage-unavailable');
});
