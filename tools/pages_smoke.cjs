// Browser validation of the staged artifact or the actual deployed site.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const deadline = setTimeout(() => { console.error('Browser smoke test exceeded 120 seconds'); process.exit(1); }, 120000);

(async () => {
  const base = process.argv[2] || 'http://127.0.0.1:8765/';
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [], failures = [];
  page.on('dialog', dialog => dialog.accept('1'));
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400) failures.push([r.status(), r.url()]); });
  await page.goto(base);
  await page.waitForFunction(() => window.TENOTSU_V039?.state?.mode === 'office', null, { timeout: 30000 });
  const screens = [];
  for (const fn of ['enterMembers', 'enterStoreStatus', 'enterSales', 'enterTuning', 'enterTown', 'enterShop', 'enterStoryMenu', 'enterRecordingAlbum', 'enterOffice']) {
    console.log('Checking screen:', fn);
    await page.evaluate(async fn => {
      await window.TENOTSU_V039[fn]({ noTransition: true });
    }, fn);
    await page.waitForTimeout(350);
    const images = await page.locator('img').evaluateAll(async xs => {
      const visible = xs.filter(x => x.getClientRects().length);
      await Promise.all(visible.map(x => x.decode()));
      return visible.map(x => ({ src: x.getAttribute('src'), ok: x.complete && x.naturalWidth > 0 }));
    });
    assert(images.every(x => x.ok), JSON.stringify({ fn, images }));
    screens.push({ screen: fn, images });
  }
  await page.evaluate(() => window.BattleProto.openBattle());
  await page.locator('[data-action="start"]').waitFor({ state: 'visible' });
  await page.evaluate(() => window.BattleProto.closeBattle());
  const scenarios = ['hina_spring_bento.json', 'intro_ai.json', 'intro_midori.json', 'intro_kogane.json',
    'intro_manaka.json', 'intro_misora.json', 'intro_yozora.json', 'intro_moe.json'];
  const stories = [];
  for (const name of scenarios) {
    console.log('Checking story:', name);
    const result = await page.evaluate(async name => {
      const ns = window.TENOTSU_V039;
      const path = 'scenario/v039/events/' + name;
      await ns.startStory(path);
      if (!ns.story.active || !ns.story.data?.steps?.length) throw Error('Story did not start: ' + name);
      let assets = 0;
      for (const step of ns.story.data.steps) {
        await ns.applyStoryStep(step, { initial: true });
        const refs = new Set();
        function visit(x) {
          if (typeof x === 'string' && /^images\/assets\/.*\.(png|webp|jpg|jpeg)$/.test(x)) refs.add(x);
          else if (x && typeof x === 'object') Object.values(x).forEach(visit);
        }
        visit(step);
        for (const src of refs) {
          const image = new Image(); image.src = src; await image.decode(); assets++;
        }
      }
      return { path, steps: ns.story.data.steps.length, assets };
    }, name);
    stories.push(result);
    await page.evaluate(() => window.TENOTSU_V039.endStory());
  }
  await page.goto(new URL('recording.html', base).href);
  await page.waitForFunction(() => window.TENOTSU_V039?.recordingAlbumActive === true, null, { timeout: 30000 });
  await browser.close();
  clearTimeout(deadline);
  const result = { base, screens, stories, errors, failures };
  fs.writeFileSync('pages-smoke-report.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result));
  assert.equal(errors.length, 0, JSON.stringify(errors));
  assert.equal(failures.length, 0, JSON.stringify(failures));
})().catch(e => { console.error(e); process.exit(1); });
