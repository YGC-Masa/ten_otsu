/* v039_282 story debug overlay, default-hidden story UI, existing black fade, and office surface reset */
(function(){
  "use strict";
  const ns=window.TENOTSU_V039=window.TENOTSU_V039||{};
  const st={debugVisible:false,storyUiVisible:false,autoActive:false,autoPending:false,autoTimer:null,pendingTimers:[],overlay:null,toast:null,wrapped:false,hiddenUi:new Map(),startHold:false,fadeInstalled:false,officeStabilizeTimer:null};

  function delay(ms){return new Promise(resolve=>setTimeout(resolve,ms));}
  function isTypingTarget(el){if(!el)return false;const tag=String(el.tagName||"").toLowerCase();return tag==="input"||tag==="textarea"||tag==="select"||!!el.isContentEditable;}
  function ensureOverlay(){if(!st.overlay){st.overlay=document.createElement("div");st.overlay.className="tenotsu-story-debug-overlay";st.overlay.hidden=true;document.body.appendChild(st.overlay);}return st.overlay;}
  function ensureToast(){if(!st.toast){st.toast=document.createElement("div");st.toast.className="tenotsu-story-autoplay-toast";st.toast.hidden=true;document.body.appendChild(st.toast);}return st.toast;}
  function getFade(){try{const layers=ns.layers||ns.ensureLayers&&ns.ensureLayers()||{};return layers.fade||document.querySelector(".tenotsu-fade-layer");}catch(_){return document.querySelector(".tenotsu-fade-layer");}}
  function elevateFadeLayer(){const fade=getFade();if(!fade)return;fade.style.setProperty("z-index","2147483647","important");fade.style.setProperty("background","#000","important");}
  function currentStep(){const story=ns.story||{},data=story.data||{},steps=Array.isArray(data.steps)?data.steps:[],i=Number.isFinite(story.index)?story.index:-1;return steps[i]||null;}
  function shortPath(v){const s=String(v||"");if(!s)return "-";const p=s.split("/");return p.length>3?p.slice(-3).join("/"):s;}
  function spriteText(step){const sprites=step&&(Array.isArray(step.storySprites)?step.storySprites:Array.isArray(step.characters)?step.characters:[]);if(!sprites||!sprites.length)return "-";return sprites.map(s=>(s.id||s.name||s.side||"?")+":"+shortPath(s.src||s.image||"")).join("\n  ");}

  function updateOverlay(){
    if(!st.debugVisible)return;
    const el=ensureOverlay(),story=ns.story||{},data=story.data||{},steps=Array.isArray(data.steps)?data.steps:[],i=Number.isFinite(story.index)?story.index:-1,step=currentStep(),ret=story.returnInfo||{};
    el.textContent=["STORY DEBUG  [Q: debug] [W: ui] [A: auto]","title: "+(data.title||"-"),"id: "+(ret.storyId||ret.eventId||data.id||"-"),"step: "+(i+1)+" / "+steps.length+"  (index "+i+")","speaker: "+((step&&step.speaker)||"-"),"bg: "+shortPath((step&&step.bg)||story.lastBg||ns.storyCurrentBackground||""),"eventCg: "+shortPath(step&&(step.eventCg||step.cg)||""),"sprites: "+spriteText(step),"loading: "+(!!story.isLoadingStep),"ending: "+(!!story.isEnding),"storyUi: "+(st.storyUiVisible?"ON":"OFF"),"auto: "+(st.autoActive?"ON":st.autoPending?"PENDING":"OFF")].join("\n");
    el.hidden=false;
  }
  function hideOverlay(){ensureOverlay().hidden=true;}
  function toggleDebug(){st.debugVisible=!st.debugVisible;if(st.debugVisible)updateOverlay();else hideOverlay();}

  function isSafeBottomLeftVersionLeaf(el){
    if(!el||el.nodeType!==1)return false;
    if(el.children&&el.children.length>0)return false;
    const text=(el.textContent||"").trim();
    if(!/^v\d{3}_\d{3}$/.test(text))return false;
    const r=el.getBoundingClientRect();
    if(!r||!Number.isFinite(r.left)||!Number.isFinite(r.bottom))return false;
    const vw=window.innerWidth||document.documentElement.clientWidth||0;
    const vh=window.innerHeight||document.documentElement.clientHeight||0;
    if(!vw||!vh)return false;
    return r.left>=0&&r.left<=180&&r.width<=180&&r.bottom>=vh-80&&r.top>=vh-120;
  }
  function collectStoryUiTargets(){
    const list=[];const add=el=>{if(el&&el.nodeType===1&&!list.includes(el))list.push(el);};
    [".tenotsu-story-ui",".tenotsu-story-title",".tenotsu-story-progress",".tenotsu-story-skip",".tenotsu-story-hint","[data-story-progress]","[data-story-action='end']",".tenotsu-menu-version",".tenotsu-menu-version-main",".tenotsu-menu-version-sub"].forEach(sel=>document.querySelectorAll(sel).forEach(add));
    document.querySelectorAll("body *").forEach(el=>{if(isSafeBottomLeftVersionLeaf(el))add(el);});
    return list;
  }
  function hideElement(el){
    if(!st.hiddenUi.has(el)){st.hiddenUi.set(el,{display:el.style.display,visibility:el.style.visibility,opacity:el.style.opacity,pointerEvents:el.style.pointerEvents});}
    el.setAttribute("data-tenotsu-story-ui-hidden-target","1");
    el.style.setProperty("display","none","important");
    el.style.setProperty("visibility","hidden","important");
    el.style.setProperty("opacity","0","important");
    el.style.setProperty("pointer-events","none","important");
  }
  function restoreHiddenElements(){st.hiddenUi.forEach((old,el)=>{if(!el||!el.style)return;el.removeAttribute("data-tenotsu-story-ui-hidden-target");el.style.display=old.display||"";el.style.visibility=old.visibility||"";el.style.opacity=old.opacity||"";el.style.pointerEvents=old.pointerEvents||"";});st.hiddenUi.clear();}
  function applyStoryUiVisibility(){document.body.classList.toggle("tenotsu-story-ui-hidden",!st.storyUiVisible);if(st.storyUiVisible){restoreHiddenElements();return;}collectStoryUiTargets().forEach(hideElement);}
  function setStoryUiVisible(v){st.storyUiVisible=!!v;applyStoryUiVisibility();updateOverlay();}
  function toggleStoryUi(){setStoryUiVisible(!st.storyUiVisible);}

  function clearPending(){st.pendingTimers.forEach(id=>clearTimeout(id));st.pendingTimers.length=0;st.autoPending=false;ensureToast().hidden=true;}
  function stopAuto(){clearPending();st.autoActive=false;if(st.autoTimer)clearInterval(st.autoTimer);st.autoTimer=null;updateOverlay();}
  function autoTick(){const story=ns.story||{};if(!story.active||story.isEnding||st.startHold)return;if(story.isLoadingStep)return;if(typeof ns.nextStoryStep==="function")ns.nextStoryStep({autoplay:true});}
  function startAutoNow(){clearPending();const story=ns.story||{};if(!story.active||story.isEnding||st.startHold)return;st.autoActive=true;if(st.autoTimer)clearInterval(st.autoTimer);st.autoTimer=setInterval(autoTick,2400);updateOverlay();}
  function toggleAuto(){if(st.autoActive||st.autoPending)stopAuto();else startAutoNow();}

  function installBlackToSceneStoryStartFade(){
    if(st.fadeInstalled)return;
    st.fadeInstalled=true;
    ns.fadeOutForStoryStart=function(){
      st.startHold=true;
      document.body.classList.add("tenotsu-story-start-hold-black");
      if(typeof ns.forceBlack==="function") ns.forceBlack();
      elevateFadeLayer();
      return Promise.resolve();
    };
    ns.fadeInForStoryStart=async function(){
      try{
        await delay(2000);
        elevateFadeLayer();
        if(typeof ns.releaseBlack==="function") await ns.releaseBlack(1000);
      } finally {
        st.startHold=false;
        document.body.classList.remove("tenotsu-story-start-hold-black");
      }
    };
  }

  function hideResidualStorySurfaces(){
    const selectors=[
      "#tenotsu-unified-story-bg-layer","#tenotsu-event-cg-surface",".tenotsu-event-cg-layer",".tenotsu-cg-layer",".event-cg-layer",".memory-cg-layer","[data-event-cg]","[data-cg-layer]",
      "#tenotsu-story-body-sprite-layer",".tenotsu-story-standing",".tenotsu-story-body-standing"
    ];
    document.querySelectorAll(selectors.join(",")).forEach(el=>{
      el.hidden=true;
      el.style.setProperty("display","none","important");
      el.style.setProperty("visibility","hidden","important");
      el.style.setProperty("opacity","0","important");
      el.style.setProperty("pointer-events","none","important");
    });
    try{ if(typeof ns.hideEventCgSurface==="function") ns.hideEventCgSurface({noRestore:true}); }catch(_){}
    try{ if(typeof ns.disableUnifiedStoryBackgroundLayer==="function") ns.disableUnifiedStoryBackgroundLayer(); }catch(_){}
    try{ if(typeof ns.hideStoryCharacters==="function") ns.hideStoryCharacters(); }catch(_){}
  }

  function forceOfficeBackground(){
    try{
      const bg=ns.paths&&ns.paths.officeBg;
      if(!bg)return;
      const layers=ns.layers||ns.ensureLayers&&ns.ensureLayers()||{};
      if(layers.bg){layers.bg.hidden=false;layers.bg.style.setProperty("display","block","important");layers.bg.style.setProperty("visibility","visible","important");layers.bg.style.setProperty("opacity","1","important");layers.bg.style.setProperty("background-image",`url("${bg}")`,"important");layers.bg.style.setProperty("background-size","cover","important");layers.bg.style.setProperty("background-position","center center","important");}
      if(layers.bgImg){layers.bgImg.hidden=false;layers.bgImg.removeAttribute("hidden");layers.bgImg.style.setProperty("display","block","important");layers.bgImg.style.setProperty("visibility","visible","important");layers.bgImg.style.setProperty("opacity","1","important");layers.bgImg.style.setProperty("object-fit","cover","important");layers.bgImg.style.setProperty("object-position","center center","important");layers.bgImg.src=bg;}
      if(typeof ns.setBackgroundReady==="function") ns.setBackgroundReady(bg).catch(()=>{});
      else if(typeof ns.setBackground==="function") ns.setBackground(bg);
      ns.storyCurrentBackground=bg;
      if(ns.story) ns.story.lastBg=bg;
    }catch(_){}
  }

  function stabilizeOfficeLayout(){
    document.body.classList.remove("tenotsu-story-active","tenotsu-story-final-line","tenotsu-story-loading","tenotsu-story-bg-blackfade","tenotsu-story-ending-blackfade","tenotsu-story-start-hold-black","tenotsu-story-ui-hidden");
    restoreHiddenElements();
    hideResidualStorySurfaces();
    try{const layers=ns.layers||ns.ensureLayers&&ns.ensureLayers()||{};if(layers.story){layers.story.classList.remove("ending","loading");layers.story.style.removeProperty("pointer-events");layers.story.hidden=true;}if(layers.menu){layers.menu.hidden=false;layers.menu.style.removeProperty("display");layers.menu.style.removeProperty("visibility");layers.menu.style.removeProperty("opacity");}if(layers.officeChars){layers.officeChars.hidden=false;layers.officeChars.style.removeProperty("display");layers.officeChars.style.removeProperty("visibility");layers.officeChars.style.removeProperty("opacity");}}catch(_){}
    forceOfficeBackground();
  }
  function scheduleOfficeStabilize(){
    if(st.officeStabilizeTimer) clearTimeout(st.officeStabilizeTimer);
    requestAnimationFrame(stabilizeOfficeLayout);
    st.officeStabilizeTimer=setTimeout(stabilizeOfficeLayout,160);
  }

  function storyEndBlackFadeToTitle(){
    stopAuto();
    if(typeof ns.transitionTo==="function"){
      elevateFadeLayer();
      ns.transitionTo(()=>{
        if(ns.story)ns.story.returnInfo={mode:"office"};
        if(typeof ns.endStory==="function")ns.endStory();
        stabilizeOfficeLayout();
        try{if(typeof ns.setText==="function")ns.setText("店長お疲れ様です","事務所に戻りました。");}catch(_){}
      },{out:650,hold:3000,in:650,skipOutIfBlack:false});
      return;
    }
    if(typeof ns.endStory==="function")ns.endStory();
    scheduleOfficeStabilize();
  }

  function hotkeys(){
    if(document.__tenotsuStoryDebugHotkeysInstalled)return;
    document.__tenotsuStoryDebugHotkeysInstalled=true;
    document.addEventListener("keydown",ev=>{if(ev.defaultPrevented||ev.repeat||isTypingTarget(ev.target))return;const k=String(ev.key||"").toLowerCase();if(k==="q"){ev.preventDefault();toggleDebug();}else if(k==="w"){ev.preventDefault();toggleStoryUi();}else if(k==="a"){ev.preventDefault();toggleAuto();}},true);
  }

  function wrap(){
    if(st.wrapped)return;st.wrapped=true;
    installBlackToSceneStoryStartFade();
    const n=ns.nextStoryStep;if(typeof n==="function")ns.nextStoryStep=async function(o){const r=await n.call(this,o||{});if(!st.storyUiVisible)applyStoryUiVisibility();updateOverlay();return r;};
    const ss=ns.startStory;if(typeof ss==="function")ns.startStory=async function(){stopAuto();setStoryUiVisible(false);installBlackToSceneStoryStartFade();const r=await ss.apply(this,arguments);setStoryUiVisible(false);setTimeout(startAutoNow,120);updateOverlay();return r;};
    const e=ns.endStory;if(typeof e==="function")ns.endStory=function(){stopAuto();setStoryUiVisible(true);const r=e.apply(this,arguments);scheduleOfficeStabilize();updateOverlay();return r;};
    const b=ns.beginStoryEnd;if(typeof b==="function")ns.beginStoryEnd=function(){stopAuto();setStoryUiVisible(true);storyEndBlackFadeToTitle();updateOverlay();};
    const eo=ns.enterOffice;if(typeof eo==="function")ns.enterOffice=function(){const r=eo.apply(this,arguments);Promise.resolve(r).finally(scheduleOfficeStabilize);return r;};
    ns.fadeToBlackThenReturn=storyEndBlackFadeToTitle;
  }

  function boot(){hotkeys();wrap();window.setInterval(()=>{if(!st.storyUiVisible)applyStoryUiVisibility();updateOverlay();},500);if((ns.state&&ns.state.mode)==="office"||document.body.classList.contains("v039-mode-office"))scheduleOfficeStabilize();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
  ns.storyDebugToolsV039282={toggleDebugOverlay:toggleDebug,toggleStoryUi:toggleStoryUi,setStoryUiVisible:setStoryUiVisible,updateOverlay:updateOverlay,stopAutoplay:stopAuto,startAutoplayNow:startAutoNow,toggleAutoplay:toggleAuto,storyEndBlackFadeToTitle:storyEndBlackFadeToTitle,installBlackToSceneStoryStartFade:installBlackToSceneStoryStartFade,stabilizeOfficeLayout:stabilizeOfficeLayout,forceOfficeBackground:forceOfficeBackground};
})();
