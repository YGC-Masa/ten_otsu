const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = p => JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const audit = read('scenario/v039/introAssetAudit.json');
function sorted(x) {
  if (Array.isArray(x)) return x.map(sorted);
  if (x && typeof x === 'object') return Object.fromEntries(Object.keys(x).sort().map(k=>[k,sorted(x[k])]));
  return x;
}
test('every reachable introduction keeps its original text, speakers, steps, direction, audio and background', () => {
  const context = vm.createContext({window:{TENOTSU_V039:{}}});
  vm.runInContext(fs.readFileSync(path.join(root,'program/v039/assets.js'),'utf8'),context);
  const members = context.window.TENOTSU_V039.memberProfiles.filter(m=>m.introScenario);
  assert.equal(members.length,13);
  assert.deepEqual(Array.from(members,m=>m.introScenario).sort(),Array.from(audit.stories,s=>s.scenario).sort());
  let total = 0;
  for (const item of audit.stories) {
    const data = read(item.scenario);total+=data.steps.length;
    assert.equal(data.steps.length,item.steps);assert.equal(data.id,item.id);
    for (const [i,step] of data.steps.entries()) {
      const reviewed=item.spriteReferences.filter(x=>x.step===i+1);
      assert.deepEqual((step.storySprites||[]).map(s=>s.src),reviewed.map(x=>x.after),`${item.id} step ${i+1}`);
      for (const ref of reviewed) {
        const change=audit.records.find(x=>x.scenario===item.scenario&&x.legacy===ref.before);
        assert.equal(ref.after,change&&change.action==='replace'?change.candidate:ref.before);
      }
      for (const sprite of step.storySprites||[]) delete sprite.src;
    }
    assert.equal(sha(JSON.stringify(sorted(data))),item.semanticSha256,item.id);
  }
  assert.equal(total,593);
});
test('introduction sprites use their own adopted char25 set, with explicit unchanged/held legacy exceptions', () => {
  const manifests = fs.readdirSync(path.join(root,'images/assets/char')).filter(d=>fs.existsSync(path.join(root,'images/assets/char',d,'manifest.json'))).map(d=>({dir:d,data:read(`images/assets/char/${d}/manifest.json`)}));
  const legacy = read('scenario/data/character_expressions.json');
  const expressionMap = {1:1,2:2,3:4,4:6,5:3,6:9,7:10,8:11,9:12,10:5,11:7,12:8};
  for (const item of audit.stories) {
    const data=read(item.scenario);
    for (const step of data.steps) for (const sprite of step.storySprites||[]) {
      const manifest=manifests.find(m=>m.data.characterId===sprite.id);assert(manifest,sprite.id);
      assert(['adopted','active'].includes(manifest.data.status));
      const adopted=manifest.data.expressions.map(e=>{const p=e.path||e.file;return p.startsWith('images/')?p:`images/assets/char/${manifest.dir}/${p}`;});
      assert(fs.existsSync(path.join(root,sprite.src)),sprite.src);
      if (adopted.includes(sprite.src)) continue;
      const exception=audit.records.find(x=>x.scenario===item.scenario&&x.legacy===sprite.src);
      assert(exception,`unreviewed legacy sprite: ${sprite.src}`);assert.equal(exception.character,sprite.id);
      assert(['hold','keep-identical'].includes(exception.action));
      assert.equal(sha(fs.readFileSync(path.join(root,sprite.src))),exception.oldSha256);
      if(exception.action==='hold') assert.equal(sprite.id,'af');
      else assert.equal(exception.oldSha256,exception.candidateSha256);
    }
  }
  for (const x of audit.records) {
    assert.equal(legacy.characters[path.basename(x.legacy)[0]].id,x.character);
    assert.equal(x.candidate_expression,expressionMap[x.legacy_expression]);
    assert.equal(sha(fs.readFileSync(path.join(root,x.candidate))),x.candidateSha256);
  }
});
