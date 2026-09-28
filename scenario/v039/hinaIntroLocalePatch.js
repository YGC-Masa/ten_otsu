/* v039_333: Hina intro stable-stepId locale loader (pack round-trip) */
(function(){"use strict";
const ns=window.TENOTSU_V039;
const JA="scenario/v039/events/intro_hina.json";
const VIRTUAL="__hina_intro_locale__:";
const FILES={en:"scenario/v039/locales/intro_hina.en.json","zh-CN":"scenario/v039/locales/intro_hina.zh-CN.json"};
if(!ns||typeof ns.loadStoryScenario!=="function"||typeof ns.startStory!=="function")return;
function applyLocale(data,pack){
  const c=JSON.parse(JSON.stringify(data));
  c.id="intro_hina_"+pack.locale.replace(/[^A-Za-z0-9]+/g,"_");
  c.locale=pack.locale;
  if(pack.title)c.title=pack.title;
  const map=pack.steps||{};
  (c.steps||[]).forEach((s)=>{
    if(!s.stepId||!Object.prototype.hasOwnProperty.call(map,s.stepId))return;
    const x=map[s.stepId]||{};
    if(Object.prototype.hasOwnProperty.call(x,"speaker"))s.speaker=x.speaker;
    if(Object.prototype.hasOwnProperty.call(x,"text"))s.text=x.text;
  });
  return c;
}
const baseLoad=ns.loadStoryScenario.bind(ns);
ns.loadStoryScenario=async function(path){
  if(typeof path!=="string"||path.indexOf(VIRTUAL)!==0)return baseLoad(path);
  const locale=path.slice(VIRTUAL.length),file=FILES[locale];
  if(!file)return baseLoad(JA);
  const data=await baseLoad(JA);
  const res=await fetch(file,{cache:"no-store"});
  if(!res.ok)throw new Error("Hina intro locale fetch failed: "+file+" / "+res.status);
  const pack=await res.json();
  if(pack.scenarioId!=="intro_hina"||pack.locale!==locale)throw new Error("Hina intro locale identity mismatch: "+locale);
  const ids=new Set((data.steps||[]).map(s=>s.stepId));
  for(const id of ids)if(!Object.prototype.hasOwnProperty.call(pack.steps||{},id))throw new Error("Hina intro locale missing stepId: "+locale+" / "+id);
  for(const id of Object.keys(pack.steps||{}))if(!ids.has(id))throw new Error("Hina intro locale unknown stepId: "+locale+" / "+id);
  return applyLocale(data,pack);
};
document.addEventListener("click",(e)=>{
  const x=e.target.closest('[data-member-intro="'+JA+'"]');
  if(!x)return;
  e.preventDefault();e.stopImmediatePropagation();
  let locale=(window.TENOTSU_RECORDING_LOCALE||"").toLowerCase();
  if(locale==="zh"||locale==="zh-cn")locale="zh-CN";
  if(!["ja","en","zh-CN"].includes(locale)){
    const answer=prompt("緋奈の自己紹介 / Hina Intro\n1: 日本語\n2: English\n3: 中文（简体）","1");
    if(answer===null)return;
    locale=answer==="2"?"en":answer==="3"?"zh-CN":"ja";
  }
  ns.startStory(locale==="ja"?JA:VIRTUAL+locale,{mode:"members",memberId:"aa"});
},true);
})();