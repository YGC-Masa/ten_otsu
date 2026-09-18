/* v039_332: Hina spring bento multilingual recording prototype */
(function(){
  "use strict";
  const ns=window.TENOTSU_V039;
  if(!ns||typeof ns.startStory!=="function"||typeof ns.loadStoryScenario!=="function") return;

  const BASE="scenario/v039/events/hina_spring_bento.json";
  const VIRTUAL="__hina_spring_bento_locale__:";
  const localeFiles={
    en:"scenario/v039/locales/hina_spring_bento.en.json",
    "zh-CN":"scenario/v039/locales/hina_spring_bento.zh-CN.json"
  };

  const baseLoad=ns.loadStoryScenario.bind(ns);
  ns.loadStoryScenario=async function(path){
    if(typeof path!=="string"||path.indexOf(VIRTUAL)!==0) return baseLoad(path);
    const locale=path.slice(VIRTUAL.length);
    const localePath=localeFiles[locale];
    if(!localePath) return baseLoad(BASE);
    const data=await baseLoad(BASE);
    const res=await fetch(localePath,{cache:"no-store"});
    if(!res.ok) throw new Error("locale fetch failed: "+localePath+" / "+res.status);
    const pack=await res.json();
    const clone=JSON.parse(JSON.stringify(data));
    const steps=clone.steps||[];
    if(!Array.isArray(pack.texts)||pack.texts.length!==steps.length){
      throw new Error("locale step mismatch: "+locale+" "+(pack.texts&&pack.texts.length)+" / "+steps.length);
    }
    clone.id="hina_spring_bento_"+locale.replace(/[^a-zA-Z0-9]+/g,"_");
    clone.title=pack.title||clone.title;
    clone.locale=pack.locale||locale;
    steps.forEach((step,i)=>{
      step.text=pack.texts[i];
      if(step.speaker&&pack.speakers&&pack.speakers[step.speaker]) step.speaker=pack.speakers[step.speaker];
    });
    return clone;
  };

  const baseStart=ns.startStory.bind(ns);
  ns.startStory=function(path,returnInfo){
    if(path!==BASE) return baseStart(path,returnInfo);
    let choice=(window.TENOTSU_RECORDING_LOCALE||"").toLowerCase();
    if(choice==="zh"||choice==="zh-cn") choice="zh-CN";
    if(choice!=="ja"&&choice!=="en"&&choice!=="zh-CN"){
      const answer=prompt("緋奈『春の公園でのお弁当タイム』\n1: 日本語\n2: English\n3: 中文（简体）","1");
      if(answer===null) return Promise.resolve();
      choice=answer==="2"?"en":answer==="3"?"zh-CN":"ja";
    }
    return baseStart(choice==="ja"?BASE:VIRTUAL+choice,returnInfo);
  };
})();