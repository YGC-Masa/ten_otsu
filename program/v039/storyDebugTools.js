/* v039_271 story debug overlay, UI hotkeys, autoplay, and end fade */
(function(){
  "use strict";
  const ns=window.TENOTSU_V039=window.TENOTSU_V039||{};
  const st={debugVisible:false,storyUiVisible:true,autoActive:false,autoPending:false,autoTimer:null,pendingTimers:[],overlay:null,toast:null,wrapped:false};
  function isTypingTarget(el){if(!el)return false;const tag=String(el.tagName||"").toLowerCase();return tag==="input"||tag==="textarea"||tag==="select"||!!el.isContentEditable;}
  function ensureOverlay(){if(!st.overlay){st.overlay=document.createElement("div");st.overlay.className="tenotsu-story-debug-overlay";st.overlay.hidden=true;document.body.appendChild(st.overlay);}return st.overlay;}
  function ensureToast(){if(!st.toast){st.toast=document.createElement("div");st.toast.className="tenotsu-story-autoplay-toast";st.toast.hidden=true;document.body.appendChild(st.toast);}return st.toast;}
  function currentStep(){const story=ns.story||{},data=story.data||{},steps=Array.isArray(data.steps)?data.steps:[],i=Number.isFinite(story.index)?story.index:-1;return steps[i]||null;}
  function shortPath(v){const s=String(v||"");if(!s)return "-";const p=s.split("/");return p.length>3?p.slice(-3).join("/"):s;}
  function spriteText(step){const sprites=step&&(Array.isArray(step.storySprites)?step.storySprites:Array.isArray(step.characters)?step.characters:[]);if(!sprites||!sprites.length)return "-";return sprites.map(s=>(s.id||s.name||s.side||"?")+":"+shortPath(s.src||s.image||"")).join("\n  ");}
  function updateOverlay(){if(!st.debugVisible)return;const el=ensureOverlay(),story=ns.story||{},data=story.data||{},steps=Array.isArray(data.steps)?data.steps:[],i=Number.isFinite(story.index)?story.index:-1,step=currentStep(),ret=story.returnInfo||{};el.textContent=["STORY DEBUG  [Q: debug] [W: ui] [A: auto]","title: "+(data.title||"-"),"id: "+(ret.storyId||ret.eventId||data.id||"-"),"step: "+(i+1)+" / "+steps.length+"  (index "+i+")","speaker: "+((step&&step.speaker)||"-"),"bg: "+shortPath((step&&step.bg)||story.lastBg||ns.storyCurrentBackground||""),"eventCg: "+shortPath(step&&(step.eventCg||step.cg)||""),"sprites: "+spriteText(step),"loading: "+(!!story.isLoadingStep),"ending: "+(!!story.isEnding),"storyUi: "+(st.storyUiVisible?"ON":"OFF"),"auto: "+(st.autoActive?"ON":st.autoPending?"PENDING":"OFF")].join("\n");el.hidden=false;}
  function hideOverlay(){ensureOverlay().hidden=true;}
  function toggleDebug(){st.debugVisible=!st.debugVisible;if(st.debugVisible)updateOverlay();else hideOverlay();}
  function setStoryUiVisible(v){st.storyUiVisible=!!v;document.body.classList.toggle("tenotsu-story-ui-hidden",!st.storyUiVisible);updateOverlay();}
  function toggleStoryUi(){setStoryUiVisible(!st.storyUiVisible);}
  function clearPending(){st.pendingTimers.forEach(id=>clearTimeout(id));st.pendingTimers.length=0;st.autoPending=false;ensureToast().hidden=true;}
  function stopAuto(){clearPending();st.autoActive=false;if(st.autoTimer)clearInterval(st.autoTimer);st.autoTimer=null;updateOverlay();}
  function autoTick(){const story=ns.story||{};if(!story.active||story.isEnding){stopAuto();return;}if(story.isLoadingStep)return;if(typeof ns.nextStoryStep==="function")ns.nextStoryStep({autoplay:true});}
  function startAutoNow(){clearPending();st.autoActive=true;if(st.autoTimer)clearInterval(st.autoTimer);st.autoTimer=setInterval(autoTick,2400);updateOverlay();}
  function beginCountdown(){const story=ns.story||{};if(!story.active)return;if(st.autoActive||st.autoPending){stopAuto();return;}st.autoPending=true;const toast=ensureToast();toast.textContent="3秒後オートプレイ";toast.hidden=false;updateOverlay();st.pendingTimers.push(setTimeout(()=>{toast.hidden=true;updateOverlay();},1000));st.pendingTimers.push(setTimeout(startAutoNow,3000));}
  function hotkeys(){if(document.__tenotsuStoryDebugHotkeysInstalled)return;document.__tenotsuStoryDebugHotkeysInstalled=true;document.addEventListener("keydown",ev=>{if(ev.defaultPrevented||ev.repeat||isTypingTarget(ev.target))return;const k=String(ev.key||"").toLowerCase();if(k==="q"){ev.preventDefault();toggleDebug();}else if(k==="w"){ev.preventDefault();toggleStoryUi();}else if(k==="a"){ev.preventDefault();beginCountdown();}},true);}
  function storyEndBlackFadeToTitle(){
    stopAuto();
    const layers=ns.layers||ns.ensureLayers&&ns.ensureLayers()||{};
    const fade=layers.fade||document.querySelector(".tenotsu-fade-layer");
    if(!fade){if(typeof ns.endStory==="function")ns.endStory();return;}
    document.body.classList.add("tenotsu-story-ending-blackfade");
    fade.style.display="block";
    fade.style.visibility="visible";
    fade.style.pointerEvents="auto";
    fade.style.transition="opacity 650ms ease";
    fade.style.opacity="0";
    requestAnimationFrame(()=>{fade.style.opacity="1";});
    setTimeout(()=>{
      if(ns.story) ns.story.returnInfo={mode:"office"};
      if(typeof ns.endStory==="function")ns.endStory();
      try{if(typeof ns.setText==="function")ns.setText("店長お疲れ様です","タイトルに戻りました。");}catch(_){}
      fade.style.transition="opacity 650ms ease";
      requestAnimationFrame(()=>{fade.style.opacity="0";});
      setTimeout(()=>{
        fade.style.display="none";
        fade.style.visibility="hidden";
        fade.style.pointerEvents="none";
        fade.style.transition="";
        fade.style.opacity="0";
        document.body.classList.remove("tenotsu-story-ending-blackfade");
        if(ns.layers&&ns.layers.story){ns.layers.story.classList.remove("ending");ns.layers.story.style.removeProperty("pointer-events");}
      },700);
    },3000);
  }
  function wrap(){if(st.wrapped)return;st.wrapped=true;const n=ns.nextStoryStep;if(typeof n==="function")ns.nextStoryStep=async function(o){const r=await n.call(this,o||{});updateOverlay();return r;};const ss=ns.startStory;if(typeof ss==="function")ns.startStory=async function(){stopAuto();setStoryUiVisible(true);const r=await ss.apply(this,arguments);updateOverlay();return r;};const e=ns.endStory;if(typeof e==="function")ns.endStory=function(){stopAuto();setStoryUiVisible(true);const r=e.apply(this,arguments);updateOverlay();return r;};const b=ns.beginStoryEnd;if(typeof b==="function")ns.beginStoryEnd=function(){stopAuto();setStoryUiVisible(true);const r=b.apply(this,arguments);updateOverlay();return r;};ns.fadeToBlackThenReturn=storyEndBlackFadeToTitle;}
  function boot(){hotkeys();wrap();window.setInterval(updateOverlay,500);}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
  ns.storyDebugToolsV039271={toggleDebugOverlay:toggleDebug,toggleStoryUi:toggleStoryUi,setStoryUiVisible:setStoryUiVisible,updateOverlay:updateOverlay,stopAutoplay:stopAuto,startAutoplayNow:startAutoNow,beginAutoplayCountdown:beginCountdown,storyEndBlackFadeToTitle:storyEndBlackFadeToTitle};
})();
