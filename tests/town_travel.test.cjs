const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
function fixture() {
  const storage = new Map([['tenotsu_town_encounter_v1', JSON.stringify({currentSeason:'summer',revealedPlaces:{'spring:wakaba_central_park':true}})],['progress-probe','keep']]);
  const images = [], backgrounds = [], messages = [];
  const clock = {season:'summer',period:null};
  const ns = {state:{mode:'town'},story:{active:false},renderTownPlaceDetail(){},renderTownSeasonTop(){},enterTown:async()=>{},setText:(...args)=>messages.push(args),setBackground:url=>backgrounds.push(url),calendar:{getSnapshot:()=>clock,resolveContent:x=>x}};
  class Image { constructor(){this.naturalWidth=100;images.push(this);} }
  const context = vm.createContext({window:{TENOTSU_V039:ns},localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},Image, setTimeout:()=>1,clearTimeout(){}});
  for (const file of ['scenario/v039/townEncounterConfig.js','scenario/v039/backgroundCatalog.js','scenario/v039/backgroundCatalogTakadaiShrine.js','scenario/v039/townLandmarks.js','program/v039/townTravel.js']) vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
  return {ns,context,storage,images,backgrounds,messages,clock};
}
test('registered destinations retain unique IDs, catalog files, source IDs and the original season gates',()=>{
  const f=fixture(),places=f.context.window.TENOTSU_TOWN_ENCOUNTER_CONFIG.places;
  assert.equal(new Set(places.map(p=>p.id)).size,places.length);
  for(const p of places.filter(p=>p.backgroundKey||p.backgroundAsset)){
    const a=f.context.window.TENOTSU_BACKGROUND_CATALOG[p.backgroundKey]||p.backgroundAsset;assert(a,p.id);assert(fs.existsSync(path.join(root,a.path)),p.id);
    if(p.source){assert(p.landmarkId.startsWith('LM-'));assert(p.spaceId.startsWith('SPACE-'));}
  }
  assert.deepEqual(Array.from(places.find(p=>p.id==='marinpia_aqua_tunnel').seasons),['summer']);
  assert.deepEqual(Array.from(places.find(p=>p.id==='wakaba_central_park').seasons),['spring','summer','autumn']);
  assert(!places.some(p=>['SPACE-LM061-LIVING','SPACE-LM077-NEON'].includes(p.spaceId)));
});
test('a decoded image is required before changing current place; progress and old save fields survive',async()=>{
  const f=fixture();const pending=f.ns.moveTownPlace('hidamari_store_front',{showArrival:false});assert.equal(f.backgrounds.length,0);assert(!JSON.parse(f.storage.get('tenotsu_town_encounter_v1')).currentPlaceId);
  f.images[0].onload();assert((await pending).ok);const state=JSON.parse(f.storage.get('tenotsu_town_encounter_v1'));assert.equal(state.currentPlaceId,'hidamari_store_front');assert(state.revealedPlaces['spring:wakaba_central_park']);assert.equal(f.storage.get('progress-probe'),'keep');
  const failed=f.ns.moveTownPlace('landmark_lm_083',{showArrival:false});f.images[1].onerror();assert.equal((await failed).reason,'background-load-failed');assert.equal(JSON.parse(f.storage.get('tenotsu_town_encounter_v1')).currentPlaceId,'hidamari_store_front');assert.equal(f.backgrounds.length,1);
});
test('late image loads cannot overwrite a newer travel or an active story',async()=>{
  const f=fixture();const a=f.ns.moveTownPlace('hidamari_store_front',{showArrival:false}),b=f.ns.moveTownPlace('landmark_lm_083',{showArrival:false});f.images[1].onload();assert((await b).ok);f.images[0].onload();assert.equal((await a).reason,'superseded');assert.equal(f.backgrounds.length,1);
  const c=f.ns.moveTownPlace('landmark_lm_110',{showArrival:false});f.ns.story.active=true;f.ns.state.mode='story';f.images[2].onload();assert.equal((await c).reason,'superseded');assert.equal(f.backgrounds.length,1);
});
test('encounter seasons stay intact while background visits and period variants remain independent',async()=>{
  const f=fixture();f.clock.season='winter';assert(f.ns.resolveTownBackground('marinpia_aqua_tunnel'));assert.equal(f.ns.resolveTownBackground('wakaba_central_park').key,'wakaba_central_park_winter_day');assert.equal(f.ns.resolveTownBackground('unknown'),null);assert.equal(f.images.length,0);
  f.clock.period='night';assert.equal(f.ns.resolveTownBackground('hiyorizaka_station_front').key,'hiyorizaka_station_night');f.clock.period='day';assert.equal(f.ns.resolveTownBackground('hiyorizaka_station_front').key,'hiyorizaka_station_day');assert.equal(f.storage.get('progress-probe'),'keep');
});
test('background browsing cannot bypass the original winter encounter gate, even with a registered winter candidate',()=>{
  const f=fixture();f.clock.season='winter';let launches=0,charges=0;
  f.context.window.TENOTSU_STORY_INDEX=['wakaba_central_park','marinpia_aqua_tunnel'].map((placeId,i)=>({id:'guard_probe_'+i,type:'normal',placeId,season:'winter',scenario:'test-only-unused.json'}));
  f.context.window.TenotsuStamina={consume(){charges++;return {ok:true};}};
  f.ns.startStory=()=>{launches++;};
  vm.runInContext(fs.readFileSync(path.join(root,'program/v039/town.js'),'utf8'),f.context);
  f.ns.startTownEncounter('wakaba_central_park');f.ns.startTownEncounter('marinpia_aqua_tunnel');
  assert.equal(launches,0);assert.equal(charges,0);
});
