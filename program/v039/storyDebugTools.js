/* v039_277 story debug overlay, UI hotkeys, default autoplay, 2s hold + 1s fade-in */
(function(){
  "use strict";
  const ns=window.TENOTSU_V039=window.TENOTSU_V039||{};
  const st={debugVisible:false,storyUiVisible:true,autoActive:false,autoPending:false,autoTimer:null,pendingTimers:[],overlay:null,toast:null,wrapped:false,hiddenUi:new Map(),startHold:false};

  function isTypingTarget(el){if(!el)return false;const tag=String(el.tagName||"").toLowerCase();return tag==="input"||tag==="textarea"||tag==="select"||!!el.isContentEditable;}
  function ensureOverlay(){if(!st.overlay){st.overlay=document.createElement("div");st.overlay.className="tenotsu-story-debug-overlay";st.overlay.hidden=true;document.body.appendChild(st.overlay);}return st.overlay;}
  function ensureToast(){if(!st.toast){st.toast=document.createElement("div");st.toast.className="tenotsu-story-autoplay-toast";st.toast.hidden=true;document.body.appendChild(st.toast);}return st.toast;}
  function getFade(){try{const layers=ns.layers||ns.ensureLayers&&ns.ensureLayers()||{};return layers.fade||document.querySelector(".tenotsu-fade-layer");}catch(_){return document.querySelector(".tenotsu-fade-layer");}}
  function currentStep(){const story=ns.story||{},data=story.data||{},steps=Array.isArray(data.steps)?data.steps:[],i=Number.isFinite(story.index)?story.index:-1;return steps[i]||null;}
  function shortPath(v){const s=String(v||"");if(!s)return "-";const p=s.split("/");return p.length>3?p.slice(-3).join("/"):s;}
  function spriteText(step){const sprites=step&&(Array.isArray(step.storySprites)?step.storySprites:Array.isArray(step.characters)?step.characters:[]);if(!sprites||!sprites.length)return "-";return sprites.map(s=>(s.id||s.name||s.side||"?")+":"+shortPath(s.src||s.image||"")).join("\n  ");}

  function updateOverlay(){
    if(!st.debugVisible)return;
    const el=ensureOverlay(),story=ns.story||{},data=story.data||{},steps=Array.isArray(data.steps)?data.steps:[],i=Number.isFinite(story.index)?story.index:-1,step=currentStep(),ret=story.returnInfo||{};
    el.textContent=[
      "STORY DEBUG  [Q: debug] [W: ui] [A: auto]",
      "title: "+(data.title||"-"),
      "id: "+(ret.storyId||ret.eventId||data.id||"-"),
      "step: "+(i+1)+" / "+steps.length+"  (index "+i+")",
      "speaker: "+((step&&step.speaker)||"-"),
      "bg: "+shortPath((step&&step.bg)||story.lastBg||ns.storyCurrentBackground||""),
      "eventCg: "+shortPath(step&&(step.eventCg||step.cg)||""),
      "sprites: "+spriteText(step),
      "loading: "+(!!story.isLoadingStep),
      "ending: "+(!!story.isEnding),
      "storyUi: "+(st.storyUiVisible?"ON":"OFF"),
      "auto: "+(st.autoActive?"ON":st.autoPending?"PENDING":"OFF")
    ].join("\n");
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
  function restoreHiddenElements(){
    st.hiddenUi.forEach((old,el)=>{if(!el||!el.style)return;el.removeAttribute("data-tenotsu-story-ui-hidden-target");el.style.display=old.display||"";el.style.visibility=old.visibility||"";el.style.opacity=old.opacity||"";el.style.pointerEvents=old.pointerEvents||"";});
    st.hiddenUi.clear();
  }
  function applyStoryUiVisibility(){document.body.classList.toggle("tenotsu-story-ui-hidden",!st.storyUiVisible);if(st.storyUiVisible){restoreHiddenElements();return;}collectStoryUiTargets().forEach(hideElement);}
  function setStoryUiVisible(v){st.storyUiVisible=!!v;applyStoryUiVisibility();updateOverlay();}
  function toggleStoryUi(){setStoryUiVisible(!st.storyUiVisible);}

  function clearPending(){st.pendingTimers.forEach(id=>clearTimeout(id));st.pendingTimers.length=0;st.autoPending=false;ensureToast().hidden=true;}
  function stopAuto(){clearPending();st.autoActive=false;if(st.autoTimer)clearInterval(st.autoTimer);st.autoTimer=null;updateOverlay();}
  function autoTick(){const story=ns.story||{};if(!story.active||story.isEnding||st.startHold)return;if(story.isLoadingStep)return;if(typeof ns.nextStoryStep==="function")ns.nextStoryStep({autoplay:true});}
  function startAutoNow(){clearPending();const story=ns.story||{};if(!story.active||story.isEnding||st.startHold)return;st.autoActive=true;if(st.autoTimer)clearInterval(st.autoTimer);st.autoTimer=setInterval(autoTick,2400);updateOverlay();}
  function toggleAuto(){if(st.autoActive||st.autoPending)stopAuto();else startAutoNow();}

  function holdBlackThenFadeIn(){
    const fade=getFade();
    if(!fade)return Promise.resolve();
    st.startHold=true;
    stopAuto();
    document.body.classList.add("tenotsu-story-start-hold-black");
    fade.style.display="block";
    fade.style.visibility="visible";
    fade.style.pointerEvents="auto";
    fade.style.transition="none";
    fade.style.opacity="1";
    return new Promise(resolve=>{
      setTimeout(()=>{
        fade.style.transition="opacity 1000ms ease";
        requestAnimationFrame(()=>{fade.style.opacity="0";});
        setTimeout(()=>{
          fade.style.display="none";
          fade.style.visibility="hidden";
          fade.style.pointerEvents="none";
          fade.style.transition="";
          fade.style.opacity="0";
          document.body.classList.remove("tenotsu-story-start-hold-black");
          st.startHold=false;
          resolve();
        },1050);
      },2000);
    });
  }

  function stabilizeOfficeLayout(){
    document.body.classList.remove("tenotsu-story-active","tenotsu-story-final-line","tenotsu-story-loading","tenotsu-story-bg-blackfade","tenotsu-story-ending-blackfade","tenotsu-story-start-hold-black","tenotsu-story-ui-hidden");
    restoreHiddenElements();
    try{const layers=ns.layers||ns.ensureLayers&&ns.ensureLayers()||{};if(layers.story){layers.story.classList.remove("ending","loading");layers.story.style.removeProperty("pointer-events");}if(layers.menu){layers.menu.hidden=false;layers.menu.style.removeProperty("display");layers.menu.style.removeProperty("visibility");layers.menu.style.removeProperty("opacity");}if(layers.officeChars){layers.officeChars.hidden=false;layers.officeChars.style.removeProperty("display");layers.officeChars.style.removeProperty("visibility");layers.officeChars.style.removeProperty("opacity");}if(typeof ns.setBackgroundReady==="function"&&ns.paths&&ns.paths.officeBg){ns.setBackgroundReady(ns.paths.officeBg).catch(()=>{});}else if(typeof ns.setBackground==="function"&&ns.paths&&ns.paths.officeBg){ns.setBackground(ns.paths.officeBg);}}catch(_){}
    try{window.dispatchEvent(new Event("resize"));}catch(_){}
  }
  function scheduleOfficeStabilize(){requestAnimationFrame(stabilizeOfficeLayout);setTimeout(stabilizeOfficeLayout,200);setTimeout(stabilizeOfficeLayout,700);}

  function storyEndBlackFadeToTitle(){
    stopAuto();
    const fade=getFade();
    if(!fade){if(typeof ns.endStory==="function")ns.endStory();return;}
    document.body.classList.add("tenotsu-story-ending-blackfade");
    fade.style.display="block";fade.style.visibility="visible";fade.style.pointerEvents="auto";fade.style.transition="opacity 650ms ease";fade.style.opacity="0";
    requestAnimationFrame(()=>{fade.style.opacity="1";});
    setTimeout(()=>{
      if(ns.story)ns.story.returnInfo={mode:"office"};
      if(typeof ns.endStory==="function")ns.endStory();
      scheduleOfficeStabilize();
      try{if(typeof ns.setText==="function")ns.setText("店長お疲れ様です","事務所に戻りました。");}catch(_){}
      fade.style.transition="opacity 650ms ease";
      requestAnimationFrame(()=>{fade.style.opacity="0";});
      setTimeout(()=>{fade.style.display="none";fade.style.visibility="hidden";fade.style.pointerEvents="none";fade.style.transition="";fade.style.opacity="0";document.body.classList.remove("tenotsu-story-ending-blackfade");if(ns.layers&&ns.layers.story){ns.layers.story.classList.remove("ending");ns.layers.story.style.removeProperty("pointer-events");}},700);
    },3000);
  }

  function hotkeys(){
    if(document.__tenotsuStoryDebugHotkeysInstalled)return;
    document.__tenotsuStoryDebugHotkeysInstalled=true;
    document.addEventListener("keydown",ev=>{if(ev.defaultPrevented||ev.repeat||isTypingTarget(ev.target))return;const k=String(ev.key||"").toLowerCase();if(k==="q"){ev.preventDefault();toggleDebug();}else if(k==="w"){ev.preventDefault();toggleStoryUi();}else if(k==="a"){ev.preventDefault();toggleAuto();}},true);
  }

  function wrap(){
    if(st.wrapped)return;st.wrapped=true;
    const n=ns.nextStoryStep;if(typeof n==="function")ns.nextStoryStep=async function(o){const r=await n.call(this,o||{});if(!st.storyUiVisible)applyStoryUiVisibility();updateOverlay();return r;};
    const ss=ns.startStory;if(typeof ss==="function")ns.startStory=async function(){stopAuto();setStoryUiVisible(true);const r=await ss.apply(this,arguments);await holdBlackThenFadeIn();setTimeout(startAutoNow,120);updateOverlay();return r;};
    const e=ns.endStory;if(typeof e==="function")ns.endStory=function(){stopAuto();setStoryUiVisible(true);const r=e.apply(this,arguments);scheduleOfficeStabilize();updateOverlay();return r;};
    const b=ns.beginStoryEnd;if(typeof b==="function")ns.beginStoryEnd=function(){stopAuto();setStoryUiVisible(true);const r=b.apply(this,arguments);updateOverlay();return r;};
    const eo=ns.enterOffice;if(typeof eo==="function")ns.enterOffice=function(){const r=eo.apply(this,arguments);Promise.resolve(r).finally(scheduleOfficeStabilize);return r;};
    ns.fadeToBlackThenReturn=storyEndBlackFadeToTitle;
  }

  function boot(){hotkeys();wrap();window.setInterval(()=>{if(!st.storyUiVisible)applyStoryUiVisibility();updateOverlay();},500);if((ns.state&&ns.state.mode)==="office"||document.body.classList.contains("v039-mode-office"))scheduleOfficeStabilize();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
  ns.storyDebugToolsV039277={toggleDebugOverlay:toggleDebug,toggleStoryUi:toggleStoryUi,setStoryUiVisible:setStoryUiVisible,updateOverlay:updateOverlay,stopAutoplay:stopAuto,startAutoplayNow:startAutoNow,toggleAutoplay:toggleAuto,storyEndBlackFadeToTitle:storyEndBlackFadeToTitle,stabilizeOfficeLayout:stabilizeOfficeLayout,holdBlackThenFadeIn:holdBlackThenFadeIn};
})();
