const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../program/v039/recordingAlbum.js'),'utf8');
function fixture(url){
 const classes=new Set(['tenotsu-recording-album']);let rendered=0;const launches=[];
 const location={href:url,search:new URL(url).search};
 const ns={recordingAlbumActive:true,layers:{town:null},renderStoryMenu:()=>{rendered++;},startStory:(p,r)=>launches.push([p,r])};
 ns.enterStoryMenu=async o=>ns.renderStoryMenu(o.tab);
 const document={body:{classList:{remove:c=>classes.delete(c),add:c=>classes.add(c)}}};
 const history={replaceState:(_,__,u)=>{location.href=u;location.search=new URL(u).search;}};
 vm.runInNewContext(source,{window:{TENOTSU_V039:ns},document,history,location,URL,URLSearchParams});
 return {ns,classes,location,launches,rendered:()=>rendered};
}
test('legacy recording URL and runtime state normalize on every album render without dropping unrelated URL data',()=>{
 const f=fixture('https://example.test/?recording=1&tab=spring&other=keep');
 assert.equal(f.ns.isRecordingAlbumRequested(),true);
 f.ns.recordingAlbumActive=true;f.ns.renderStoryMenu('spring');
 assert.equal(f.ns.recordingAlbumActive,false);assert(!f.classes.has('tenotsu-recording-album'));
 const u=new URL(f.location.href);assert.equal(u.searchParams.get('recording'),null);assert.equal(u.searchParams.get('tab'),null);assert.equal(u.searchParams.get('other'),'keep');
 f.ns.recordingAlbumActive=true;f.classes.add('tenotsu-recording-album');f.ns.renderStoryMenu('summer');
 assert.equal(f.ns.recordingAlbumActive,false);assert.equal(f.rendered(),2);
 f.ns.startStory('story.json',{mode:'storyMenu'});assert.equal(f.launches[0][1].mode,'storyMenu');
 const reloaded=fixture(f.location.href);assert.equal(reloaded.ns.isRecordingAlbumRequested(),false);assert.equal(reloaded.ns.recordingAlbumActive,false);
});
test('existing recording entry remains callable but the album settles in normal browsing',async()=>{
 const f=fixture('https://example.test/?recording=1');
 await f.ns.enterRecordingAlbum({noTransition:true,tab:'spring'});
 assert.equal(f.ns.recordingAlbumActive,false);assert(!f.classes.has('tenotsu-recording-album'));assert.equal(f.rendered(),1);
 assert.equal(f.ns.isRecordingAlbumRequested(),false);
 assert(!source.includes('makeModeSwitch'));assert(!source.includes('createElement'));
});
