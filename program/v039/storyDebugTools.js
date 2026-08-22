/* v039_270 story debug overlay and autoplay hotkeys */
(function(){
  "use strict";
  const ns=window.TENOTSU_V039=window.TENOTSU_V039||{};
  const st={debugVisible:false,autoActive:false,autoPending:false,autoTimer:null,pendingTimers:[],overlay:null,toast:null,wrapped:false};
  function isTypingTarget(el){if(!el)return false;const tag=String(el.tagName||"").toLowerCase();return tag==="input"||tag==="textarea"||tag==="select"||!!el.isContentEditable;}
  function ensureOverlay(){if(!st.overlay){st.overlay=document.createElement("div");st.overlay.className="tenotsu-story-debug-overlay";st.overlay.hidden=true;document.body.appendChild(st.overlay);}return st.overlay;}
  function ensureToast(){if(!st.toast){st.toast=document.createElement("div");st.toast.className="tenotsu-story-autoplay-toast";st.toast.hidden=true;document.body.appendChild(st.toast);}return st.toast;}
  function currentStep(){const story=ns.story||{},data=story.data||{},steps=Array.isArray(data.steps)?data.steps:[],i=Number.isFinite(story.index)?story.index:-1;return steps[i]||null;}
  function shortPath(v){const s=String(v||"");if(!s)return "-";const p=s.split("/");return p.length>3?p.slice(-3).join("/"):s;}
  function spriteText(step){const sprites=step&&(Array.isArray(step.storySprites)?step.storySprites:Array.isArray(step.characters)?step.characters:[]);if(!sprites||!sprites.length)return "-";return sprites.map(s=>(s.id||s.name||s.side||"?")+":"+shortPath(s.src||s.image||"")).join("\n  ");}
  function updateOverlay(){if(!st.debugVisible)return;const el=ensureOverlay(),story=ns.story||{},data=story.data||{},steps=Array.isArray(data.steps)?data.steps:[],i=Number.isFinite(story.index)?story.index:-1,step=currentStep(),ret=story.returnInfo||{};el.textContent=["STORY DEBUG  [Q: hide] [A: auto]","title: "+(data.title||"-"),"id: "+(ret.storyId||ret.eventId||data.id||"-"),"step: "+(i+1)+" / "+steps.length+"  (index "+i+")","speaker: "+((step&&step.speaker)||"-"),"bg: "+shortPath((step&&step.bg)||story.lastBg||ns.storyCurrentBackground||""),"eventCg: "+shortPath(step&&(step.eventCg||step.cg)||""),"sprites: "+spriteText(step),"loading: "+(!!story.isLoadingStep),"ending: "+(!!story.isEnding),"auto: "+(st.autoActive?"ON":st.autoPending?"PENDING":"OFF")].join("\n");el.hidden=false;}
  function hideOverlay(){ensureOverlay().hidden=true;}
  function toggleDebug(){st.debugVisible=!st.debugVisible;if(st.debugVisible)updateOverlay();else hideOverlay();}
  function clearPending(){st.pendingTimers.forEach(id=>clearTimeout(id));st.pendingTimers.length=0;st.autoPending=false;ensureToast().hidden=true;}
  function stopAuto(){clearPending();st.autoActive=false;if(st.autoTimer)clearInterval(st.autoTimer);st.autoTimer=null;updateOverlay();}
  function autoTick(){const story=ns.story||{};if(!story.active||story.isEnding){stopAuto();return;}if(story.isLoadingStep)return;if(typeof ns.nextStoryStep==="function")ns.nextStoryStep({autoplay:true});}
  function startAutoNow(){clearPending();st.autoActive=true;if(st.autoTimer)clearInterval(st.autoTimer);st.autoTimer=setInterval(autoTick,2400);updateOverlay();}
  function beginCountdown(){const story=ns.story||{};if(!story.active)return;if(st.autoActive||st.autoPending){stopAuto();return;}st.autoPending=true;const toast=ensureToast();toast.textContent="3秒後オートプレイ";toast.hidden=false;updateOverlay();st.pendingTimers.push(setTimeout(()=>{toast.hidden=true;updateOverlay();},1000));st.pendingTimers.push(setTimeout(startAutoNow,3000));}
  function hotkeys(){if(document.__tenotsuStoryDebugHotkeysInstalled)return;document.__tenotsuStoryDebugHotkeysInstalled=true;document.addEventListener("keydown",ev=>{if(ev.defaultPrevented||ev.repeat||isTypingTarget(ev.target))return;const k=String(ev.key||"").toLowerCase();if(k==="q"){ev.preventDefault();toggleDebug();}else if(k==="a"){ev.preventDefault();beginCountdown();}},true);}
  function wrap(){if(st.wrapped)return;st.wrapped=true;const n=ns.nextStoryStep;if(typeof n==="function")ns.nextStoryStep=async function(o){const r=await n.call(this,o||{});updateOverlay();return r;};const ss=ns.startStory;if(typeof ss==="function")ns.startStory=async function(){stopAuto();const r=await ss.apply(this,arguments);updateOverlay();return r;};const e=ns.endStory;if(typeof e==="function")ns.endStory=function(){stopAuto();const r=e.apply(this,arguments);updateOverlay();return r;};const b=ns.beginStoryEnd;if(typeof b==="function")ns.beginStoryEnd=function(){stopAuto();const r=b.apply(this,arguments);updateOverlay();return r;};}
  function boot(){hotkeys();wrap();window.setInterval(updateOverlay,500);}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
  ns.storyDebugToolsV039270={toggleDebugOverlay:toggleDebug,updateOverlay:updateOverlay,stopAutoplay:stopAuto,startAutoplayNow:startAutoNow,beginAutoplayCountdown:beginCountdown};
})();
