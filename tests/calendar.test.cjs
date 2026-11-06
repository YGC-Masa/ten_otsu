const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const key = 'tenotsu_season_raisin_v1';

function fixture(iso, storage = new Map()) {
  let now = Date.parse(iso);
  const events = {}, timers = [];
  const nodes = Object.fromEntries(['[data-real-time-clock]', '[data-calendar-stay]', '[data-calendar-period]'].map(selector => [selector, [{ textContent: '' }, { textContent: '' }]]));
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  }
  const ns = { paths: { officeBg: 'images/office.webp', charBase: 'images/assets/char/' }, state: { mode: 'office' } };
  const context = vm.createContext({ Date: Clock, URL,
    window: { TENOTSU_V039: ns, addEventListener: (name, fn) => { events[name] = fn; }, setInterval: (fn, delay) => timers.push({ fn, delay }) },
    document: { hidden: false, querySelectorAll: selector => nodes[selector] || [], addEventListener: (name, fn) => { events[name] = fn; } },
    localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v), removeItem: k => storage.delete(k) }
  });
  for (const file of ['scenario/v039/calendarConfig.js', 'program/v039/calendar.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  return { cal: ns.calendar, ns, storage, events, timers, context, nodes, setTime: iso => { now = Date.parse(iso); } };
}

test('Irodori legacy background path resolves to pinned shared copy without changing other assets', () => {
  const f = fixture('2026-11-06T12:00:00+09:00');
  const legacy = 'images/assets/bg/bg_tsukiga_irodori_shop_day.webp';
  const pinned = 'https://raw.githubusercontent.com/YGC-Masa/ten_otsu_backgrounds/f9faf211ea13c208afacec6939b2b23c645b7c24/' + legacy;
  assert.equal(f.cal.resolveContent(legacy), pinned);
  assert.equal(f.cal.resolveContent('images/assets/bg/bg_shiomi_beach_day.webp'), 'images/assets/bg/bg_shiomi_beach_day.webp');
  assert.equal(f.cal.freezeStoryAssets({steps:[{bg:legacy}]}, 11).steps[0].bg, pinned);
});

test('all twelve calendar months and seasons use real JST dates', () => {
  const seasons=['winter','winter','spring','spring','spring','summer','summer','summer','autumn','autumn','winter','winter'];
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

test('TimeThymus switches six periods independently of seasons, month and real clock',()=>{
  const f=fixture('2026-12-31T23:59:00+09:00');const original=JSON.stringify(f.cal.getSnapshot().real);
  for(const period of ['early_morning','morning','day','evening','night','late_night']){
    assert(f.cal.usePeriod(period).ok);const s=f.cal.getSnapshot();assert.equal(s.period,period);
    assert.equal(s.month,12);assert.equal(s.season,'winter');assert.equal(JSON.stringify(s.real),original);
    assert.equal(s.timeTrial.itemId,'time_thymus');assert.equal(Date.parse(s.timeTrial.expiresAt)-Date.parse(s.timeTrial.selectedAt),7200000);assert(!('month' in s.timeTrial));
  }
  assert(!f.cal.usePeriod('invalid').ok);
});

test('real JST period boundaries use six configured ranges',()=>{
  const cases=[['03:59','late_night'],['04:00','early_morning'],['06:59','early_morning'],['07:00','morning'],['09:59','morning'],['10:00','day'],['15:59','day'],['16:00','evening'],['18:59','evening'],['19:00','night'],['22:59','night'],['23:00','late_night']];
  for(const [clock,expected] of cases){
    const f=fixture(`2026-10-31T${clock}:00+09:00`);
    assert.equal(f.cal.getSnapshot().realPeriod,expected);
    assert.equal(f.cal.getSnapshot().period,expected);
  }
});

test('SeasonRaisin switches four seasons without assigning a time period or moving the real month',()=>{
  const f=fixture('2026-12-31T23:59:00+09:00');f.cal.usePeriod('day');
  for(const season of ['spring','summer','autumn','winter']){
    assert(f.cal.useSeason(season).ok);const s=f.cal.getSnapshot();assert.equal(s.season,season);assert.equal(s.month,12);
    assert.equal(s.period,'day');assert.equal(s.seasonTrial.itemId,'season_raisin');assert.equal(s.seasonTrial.expiresAt,'2026-12-31T16:59:00.000Z');
  }
  assert(!f.cal.useSeason('13').ok);
  f.cal.returnToReality();assert.equal(f.cal.getSnapshot().period,'day');assert.equal(f.cal.getSnapshot().seasonTrial,null);
  f.cal.useSeason('spring');f.cal.returnTimeToReality();assert.equal(f.cal.getSnapshot().season,'spring');assert.equal(f.cal.getSnapshot().timeTrial,null);
});

test('both trials expire exactly two hours from use; reload/focus/pageshow/visibility never extend',()=>{
  let f=fixture('2026-12-31T23:59:00+09:00');f.cal.usePeriod('night');f.cal.useSeason('spring');
  const periodKey='tenotsu_time_thymus_period_v1',time=f.storage.get(periodKey),saved=f.storage.get(key);
  f=fixture('2027-01-01T01:58:59.999+09:00',f.storage);f.events.focus();f.events.pageshow();f.events.visibilitychange();
  assert.equal(f.cal.getSnapshot().season,'spring');assert.equal(f.cal.getSnapshot().period,'night');assert.equal(f.storage.get(key),saved);assert.equal(f.storage.get(periodKey),time);
  f.setTime('2027-01-01T01:59:00+09:00');f.events.pageshow();
  assert.equal(f.cal.getSnapshot().season,'winter');assert.equal(f.cal.getSnapshot().seasonTrial,null);assert.equal(f.cal.getSnapshot().timeTrial,null);
  assert(!f.storage.has(key));assert(!f.storage.has(periodKey));
  f=fixture('2027-01-01T01:59:00.001+09:00',f.storage);assert.equal(f.cal.getSnapshot().season,'winter');assert.equal(f.cal.getSnapshot().timeTrial,null);
});

test('fixed two-hour duration handles month/year ends and leap days in JST and UTC',()=>{
  for(const [used,end] of [
    ['2026-12-31T23:59:00+09:00','2026-12-31T16:59:00.000Z'],
    ['2026-01-31T23:01:00+09:00','2026-01-31T16:01:00.000Z'],
    ['2028-02-28T23:59:00+09:00','2028-02-28T16:59:00.000Z'],
    ['2028-02-29T23:59:00+09:00','2028-02-29T16:59:00.000Z'],
    ['2027-02-28T23:59:00+09:00','2027-02-28T16:59:00.000Z']
  ]){
    const f=fixture(used);for(const record of [f.cal.useSeason('spring').seasonTrial,f.cal.usePeriod('day').timeTrial]){
      assert.equal(record.expiresAt,end);assert.equal(Date.parse(end)-Date.parse(used),7200000);
    }
  }
});

test('published v1 season and no-expiry time saves migrate from selectedAt, not now or their old deadline',()=>{
  const periodKey='tenotsu_time_thymus_period_v1';
  const legacySeason={version:1,itemId:'season_raisin',season:'spring',selectedAt:'2026-12-31T14:59:00.000Z',expiresAt:'2027-01-01T15:00:00.000Z'};
  const legacyTime={version:1,itemId:'time_thymus',period:'night',selectedAt:legacySeason.selectedAt};
  const storage=new Map([[key,JSON.stringify(legacySeason)],[periodKey,JSON.stringify(legacyTime)]]);
  let f=fixture('2027-01-01T00:59:00+09:00',storage);
  assert.equal(f.cal.getSnapshot().seasonTrial.expiresAt,'2026-12-31T16:59:00.000Z');assert.equal(f.cal.getSnapshot().timeTrial.expiresAt,'2026-12-31T16:59:00.000Z');
  assert.equal(f.cal.getSnapshot().seasonTrial.version,2);assert.equal(f.cal.getSnapshot().timeTrial.version,2);
  const migrated=[storage.get(key),storage.get(periodKey)];
  f=fixture('2027-01-01T01:58:59.999+09:00',storage);f.events.pageshow();assert.deepEqual([storage.get(key),storage.get(periodKey)],migrated);
  f=fixture('2027-01-01T01:59:00+09:00',storage);assert.equal(f.cal.getSnapshot().seasonTrial,null);assert.equal(f.cal.getSnapshot().timeTrial,null);
  // A still-valid old next-next midnight deadline cannot resurrect an expired two-hour use.
  f=fixture('2027-01-01T12:00:00+09:00',new Map([[key,JSON.stringify(legacySeason)],[periodKey,JSON.stringify(legacyTime)]]));assert.equal(f.cal.getSnapshot().seasonTrial,null);assert.equal(f.cal.getSnapshot().timeTrial,null);
  const noDeadline={...legacySeason};delete noDeadline.expiresAt;
  assert.equal(fixture('2027-01-01T00:59:00+09:00',new Map([[key,JSON.stringify(noDeadline)]])).cal.getSnapshot().seasonTrial.version,2);
});

test('missing/future/corrupt timestamps or inconsistent v1/v2 deadlines cannot create unlimited trials',()=>{
  const periodKey='tenotsu_time_thymus_period_v1';
  for(const [storageKey,record] of [[key,{version:1,itemId:'season_raisin',season:'spring'}],[periodKey,{version:1,itemId:'time_thymus',period:'night'}]]){
    for(const override of [
      {selectedAt:undefined},{selectedAt:'invalid'},{selectedAt:'2026-12-31T14:59:00'},
      {selectedAt:'2099-01-01T00:00:00.000Z'},{expiresAt:'2099-01-01T00:00:00.000Z'},{expiresAt:null},
      {version:2},{version:2,expiresAt:'2026-12-31T16:58:00.000Z'}, {version:99}
    ]){
      const storage=new Map([[storageKey,JSON.stringify({...record,selectedAt:'2026-12-31T14:59:00.000Z',...override})]]),f=fixture('2027-01-01T00:59:00+09:00',storage);
      assert.equal(f.cal.getSnapshot().seasonTrial,null);assert.equal(f.cal.getSnapshot().timeTrial,null);assert(!storage.has(storageKey));
    }
  }
});

test('staggered trials and manual returns expire independently, preserving the other original deadline',()=>{
  const f=fixture('2026-10-31T12:00:00+09:00');f.cal.usePeriod('night');f.setTime('2026-10-31T12:30:00+09:00');f.cal.useSeason('spring');
  const saved=f.storage.get(key);f.setTime('2026-10-31T14:00:00+09:00');f.events.focus();assert.equal(f.cal.getSnapshot().timeTrial,null);assert.equal(f.cal.getSnapshot().season,'spring');assert.equal(f.storage.get(key),saved);
  f.setTime('2026-10-31T14:30:00+09:00');f.events.pageshow();assert.equal(f.cal.getSnapshot().seasonTrial,null);assert.equal(f.cal.getSnapshot().season,'autumn');
  f.cal.useSeason('spring');f.cal.usePeriod('night');f.cal.returnToReality();assert.equal(f.cal.getSnapshot().period,'night');f.cal.useSeason('summer');f.cal.returnTimeToReality();assert.equal(f.cal.getSnapshot().season,'summer');
});

test('legacy progress/ST and discarded unpublished wrong-name travel data remain intact',()=>{
  const storage=new Map([
    ['tenotsu_town_encounter_v1',JSON.stringify({currentSeason:'summer',revealedPlaces:{park:true}})],
    ['tenotsu_story_progress_v1','{"clearedStories":["kept"]}'],['tenotsu_stamina_v1','{"current":80}'],
    ['tenotsu_time_thymus_v1','{"version":1,"itemId":"time_thymus","month":3,"expiresAt":"2099-01-01T00:00:00Z"}']
  ]);
  const wrong=storage.get('tenotsu_time_thymus_v1');const f=fixture('2026-12-31T23:59:00+09:00',storage);
  assert.equal(f.cal.getSnapshot().month,12);assert.equal(f.cal.getSnapshot().timeTrial,null);
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

test('season display separates November reality from spring trial and counts down without changing saves', () => {
  const f = fixture('2026-11-02T12:00:00+09:00');
  const text = () => f.nodes['[data-calendar-stay]'][0].textContent;
  assert.equal(text(), '現実の11月・季節：冬');
  f.cal.useSeason('spring');
  const saved = f.storage.get(key);
  assert.equal(text(), '現実の11月・季節：冬 ／ 試用中の季節：春（シーズンレーズン・無料試用2時間／残り2時間00分00秒／2026/11/02（月）14:00:00 JSTに失効・現実の季節へ戻ります）');
  assert.equal(f.nodes['[data-real-time-clock]'][0].textContent, '2026/11/02（月）12:00:00 JST');
  f.setTime('2026-11-02T12:30:01+09:00'); f.timers[0].fn();
  assert.match(text(), /残り1時間29分59秒/);
  assert.equal(f.storage.get(key), saved);
  assert.equal(f.cal.getSnapshot().season, 'spring');
  assert.equal(JSON.parse(f.storage.get('tenotsu_town_encounter_v1')).currentSeason, 'spring');
  for (const selector of Object.keys(f.nodes)) {
    assert.equal(f.nodes[selector][0].textContent, f.nodes[selector][1].textContent);
  }
  f.setTime('2026-11-02T13:59:59.999+09:00'); f.cal.updateClock();
  assert.match(text(), /残り0時間00分01秒/);
  f.setTime('2026-11-02T14:00:00+09:00'); f.timers[0].fn();
  assert.equal(text(), '現実の11月・季節：冬');
  assert.equal(f.cal.getSnapshot().season, 'winter');
  assert(!f.storage.has(key));
});

test('season display follows real season at month rollover and preserves the original trial deadline', () => {
  const f = fixture('2026-10-31T23:30:00+09:00');
  const text = () => f.nodes['[data-calendar-stay]'][0].textContent;
  f.cal.useSeason('spring');
  assert.match(text(), /^現実の10月・季節：秋 ／ 試用中の季節：春/);
  const saved = f.storage.get(key);
  f.setTime('2026-11-01T00:00:00+09:00'); f.events.pageshow();
  assert.match(text(), /^現実の11月・季節：冬 ／ 試用中の季節：春/);
  assert.match(text(), /残り1時間30分00秒／2026\/11\/01（日）01:30:00 JSTに失効/);
  assert.equal(f.storage.get(key), saved);
  f.cal.returnToReality();
  assert.equal(text(), '現実の11月・季節：冬');
});

test('same-season and simultaneous trials remain clearly labeled and return independently', () => {
  const f = fixture('2026-11-02T12:00:00+09:00');
  f.cal.usePeriod('night');
  const timeSaved = f.storage.get('tenotsu_time_thymus_period_v1');
  f.cal.useSeason('winter');
  assert.match(f.nodes['[data-calendar-stay]'][0].textContent, /^現実の11月・季節：冬 ／ 試用中の季節：冬/);
  assert.match(f.nodes['[data-calendar-period]'][0].textContent, /^時間帯：夜（無料試用/);
  f.cal.returnToReality();
  assert.equal(f.nodes['[data-calendar-stay]'][0].textContent, '現実の11月・季節：冬');
  assert.equal(f.storage.get('tenotsu_time_thymus_period_v1'), timeSaved);
});
