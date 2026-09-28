const { chromium } = require("playwright");
const assert = require("node:assert/strict");

const BASE = process.env.TENOTSU_TEST_URL || "http://127.0.0.1:4173/index.html";
const cases = [
  { name:"prompt-ja", prompt:"1", recording:null, title:"自己紹介：星野 緋奈", speaker:"緋奈", text:"おつかれさまです、店長！" },
  { name:"prompt-en", prompt:"2", recording:null, title:"Introduction: Hina Hoshino", speaker:"Hina", text:"Hey, Manager! Good work today!" },
  { name:"prompt-zh", prompt:"3", recording:null, title:"自我介绍：星野绯奈", speaker:"绯奈", text:"店长，辛苦啦！" },
  { name:"recording-ja", prompt:null, recording:"ja", title:"自己紹介：星野 緋奈", speaker:"緋奈", text:"おつかれさまです、店長！" },
  { name:"recording-en", prompt:null, recording:"en", title:"Introduction: Hina Hoshino", speaker:"Hina", text:"Hey, Manager! Good work today!" },
  { name:"recording-zh", prompt:null, recording:"zh-CN", title:"自我介绍：星野绯奈", speaker:"绯奈", text:"店长，辛苦啦！" }
];

(async()=>{
  const browser = await chromium.launch({headless:true});
  let failed = 0;
  for (const tc of cases) {
    const page = await browser.newPage({viewport:{width:1920,height:1080}});
    const errors = [];
    page.on("pageerror", e => errors.push("pageerror: "+e.message));
    page.on("console", m => { if (m.type()==="error") errors.push("console: "+m.text()); });
    if (tc.prompt) page.on("dialog", async d => {
      if (d.type() !== "prompt") { await d.dismiss(); return; }
      await d.accept(tc.prompt);
    });
    try {
      await page.goto(BASE,{waitUntil:"networkidle",timeout:30000});
      await page.waitForFunction(()=>window.TENOTSU_V039 && typeof window.TENOTSU_V039.renderMembersPanel==="function" && typeof window.TENOTSU_V039.nextStoryStep==="function");
      await page.evaluate((recording)=>{
        if(recording) window.TENOTSU_RECORDING_LOCALE=recording; else delete window.TENOTSU_RECORDING_LOCALE;
        const ns=window.TENOTSU_V039;
        if(typeof ns.setMode==="function") ns.setMode("members");
        ns.renderMembersPanel({selectedMemberId:"aa"});
      },tc.recording);
      const intro=page.locator('[data-member-intro="scenario/v039/events/intro_hina.json"]');
      await intro.waitFor({state:"visible",timeout:10000});
      await intro.click();
      await page.waitForFunction(()=>document.body.dataset.v039Mode==="story" && window.TENOTSU_V039.story && window.TENOTSU_V039.story.active,{timeout:15000});
      await page.waitForFunction(()=>document.querySelector(".tenotsu-story-title") && document.querySelector(".tenotsu-story-title").textContent.trim().length>0);
      assert.equal((await page.locator(".tenotsu-story-title").textContent()).trim(),tc.title,tc.name+" title");
      await page.evaluate(async()=>{
        const ns=window.TENOTSU_V039;
        let guard=0;
        while(ns.story && ns.story.active && ns.story.index<4 && guard++<12){
          if(!ns.story.isLoadingStep) await ns.nextStoryStep();
          await new Promise(r=>setTimeout(r,20));
        }
      });
      await page.waitForFunction(()=>window.TENOTSU_V039.story && window.TENOTSU_V039.story.index>=4);
      assert.equal((await page.locator(".tenotsu-speaker").textContent()).trim(),tc.speaker,tc.name+" speaker");
      assert.equal((await page.locator(".tenotsu-message").textContent()).trim(),tc.text,tc.name+" text");
      await page.evaluate(async()=>{
        const ns=window.TENOTSU_V039;
        let guard=0;
        while(document.body.dataset.v039Mode==="story" && guard++<80){
          if(ns.story && ns.story.active && !ns.story.isLoadingStep) await ns.nextStoryStep();
          await new Promise(r=>setTimeout(r,25));
        }
      });
      await page.waitForFunction(()=>document.body.dataset.v039Mode==="members",{timeout:20000});
      assert.equal(errors.length,0,tc.name+" browser errors: "+errors.join(" | "));
      console.log("PASS",tc.name);
    } catch(e) {
      failed++;
      console.error("FAIL",tc.name,e.stack||e);
      if(errors.length) console.error(errors.join("\n"));
    } finally { await page.close(); }
  }
  await browser.close();
  if(failed) process.exit(1);
  console.log("Hina intro browser gate: OK",cases.length);
})().catch(e=>{console.error(e);process.exit(1)});
