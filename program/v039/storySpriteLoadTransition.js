/* v039_220 story sprite load/fade transition + flicker guard */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};

  const FADE_OUT_MS = 180;
  const FADE_IN_MS = 180;
  const LOAD_TIMEOUT_MS = 2600;

  function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
  function nextFrame() { return new Promise((resolve) => requestAnimationFrame(() => resolve())); }

  function ensureSpriteLoadedCache() {
    if (!ns.__storySpriteLoadedCache) ns.__storySpriteLoadedCache = Object.create(null);
    return ns.__storySpriteLoadedCache;
  }

  function markSpriteLoaded(src) {
    if (!src || String(src).endsWith('/NULL')) return;
    ensureSpriteLoadedCache()[String(src)] = true;
  }

  function isSpriteAlreadyLoaded(src) {
    if (!src || String(src).endsWith('/NULL')) return true;
    return !!ensureSpriteLoadedCache()[String(src)];
  }

  function preloadSprite(src, timeout = LOAD_TIMEOUT_MS) {
    if (!src || String(src).endsWith('/NULL')) return Promise.resolve({ ok:false, src:null });
    if (isSpriteAlreadyLoaded(src)) return Promise.resolve({ ok:true, src, cached:true });
    return new Promise((resolve) => {
      const img = new Image();
      let done = false;
      const finish = (ok) => {
        if (done) return;
        done = true;
        resolve({ ok: !!ok, src });
      };
      const timer = setTimeout(() => finish(false), timeout);
      img.onload = () => {
        const afterDecode = () => { clearTimeout(timer); markSpriteLoaded(src); finish(true); };
        if (typeof img.decode === 'function') img.decode().then(afterDecode).catch(afterDecode);
        else afterDecode();
      };
      img.onerror = () => { clearTimeout(timer); finish(false); };
      img.src = src;
    });
  }

  function normalizeSpritesForKey(sprites) {
    let list = Array.isArray(sprites) ? sprites : [];
    if (typeof ns.normalizeStorySpriteLayerOrder === 'function') list = ns.normalizeStorySpriteLayerOrder(list);
    if (typeof ns.normalizeStoryCharacterListV039100 === 'function') list = ns.normalizeStoryCharacterListV039100(list);
    return Array.isArray(list) ? list.filter((s) => s && s.src && !String(s.src).endsWith('/NULL')) : [];
  }

  function getTargetSprites(step) {
    if (!step) return [];
    if (Array.isArray(step.storySprites)) return normalizeSpritesForKey(step.storySprites);
    if (Array.isArray(step.characters)) return normalizeSpritesForKey(step.characters);
    return [];
  }

  function spriteKey(list) {
    return JSON.stringify((Array.isArray(list) ? list : []).map((s) => [
      s.id || '', s.src || '', s.side || '', s.left || '', s.right || '', s.top || '', s.bottom || '',
      s.width || '', s.height || '', s.maxHeight || '', s.transform || '',
      s.opacity == null ? 1 : s.opacity, s.frame || '', s.variant || ''
    ]));
  }

  function rememberSpriteKey(list) {
    const key = spriteKey(list || []);
    ns.__storySpriteLastKey = key;
    ns.storyCurrentSpriteKey = key;
    (list || []).forEach((s) => { if (s && s.src) markSpriteLoaded(s.src); });
    return key;
  }

  function getRememberedKey() {
    return ns.__storySpriteLastKey || ns.storyCurrentSpriteKey || '';
  }

  function getSpriteLayer() {
    return document.getElementById('tenotsu-story-body-sprite-layer')
      || (typeof ns.ensureStoryBodySpriteLayer === 'function' ? ns.ensureStoryBodySpriteLayer() : null);
  }

  function currentSpriteImages() {
    const layer = getSpriteLayer();
    if (!layer) return [];
    const imgs = Array.from(layer.querySelectorAll('.tenotsu-story-body-standing, .tenotsu-story-standing, img'));
    imgs.forEach((img) => {
      const raw = img.getAttribute('src') || img.currentSrc || '';
      const dataSrc = img.getAttribute('data-src') || '';
      [raw, dataSrc].forEach((value) => {
        if (!value) return;
        markSpriteLoaded(value);
        try {
          const normalized = new URL(value, window.location.href).pathname.replace(/^\/+/, '');
          if (normalized) markSpriteLoaded(normalized);
        } catch (_) {}
      });
    });
    return imgs;
  }

  function resetSpriteKey() {
    ns.__storySpriteLastKey = '';
    ns.storyCurrentSpriteKey = '';
  }

  function sameAsCurrent(targetList) {
    const key = spriteKey(targetList || []);
    if (!key || key === '[]') return false;
    return key === getRememberedKey();
  }

  function shouldHandleSpriteTransition(step, targetList) {
    if (!step) return false;
    const hasClear = !!(step.clearStorySprites || step.hideStorySprites || step.spriteMode === 'hide' || step.spriteMode === 'clear' || step.spriteMode === 'cg-clear');
    const hasTargets = Array.isArray(targetList) && targetList.length > 0;
    if (!hasClear && !hasTargets) return false;

    if (hasTargets && sameAsCurrent(targetList)) {
      // Same sprite set is already rendered. Do not fade out/in, and do not re-render.
      return false;
    }
    if (!hasTargets && hasClear) return currentSpriteImages().length > 0;
    return true;
  }

  async function preloadTargetSprites(targetList) {
    const srcs = Array.from(new Set((targetList || []).map((s) => s && s.src).filter(Boolean)))
      .filter((src) => !isSpriteAlreadyLoaded(src));
    if (!srcs.length) return;
    await Promise.all(srcs.map((src) => preloadSprite(src)));
  }

  async function fadeOutCurrentSprites() {
    const imgs = currentSpriteImages();
    if (!imgs.length) return;
    imgs.forEach((img) => {
      img.style.setProperty('transition', `opacity ${FADE_OUT_MS}ms ease`, 'important');
      img.style.setProperty('opacity', '0', 'important');
    });
    await sleep(FADE_OUT_MS + 40);
  }

  async function fadeInCurrentSprites() {
    const imgs = currentSpriteImages();
    if (!imgs.length) return;
    imgs.forEach((img) => {
      const finalOpacity = img.dataset.tenotsuFinalOpacity || '1';
      img.style.setProperty('transition', 'none', 'important');
      img.style.setProperty('opacity', '0', 'important');
      img.style.setProperty('visibility', 'visible', 'important');
      img.style.setProperty('display', 'block', 'important');
      img.dataset.tenotsuFinalOpacity = finalOpacity;
    });
    await nextFrame();
    imgs.forEach((img) => {
      const finalOpacity = img.dataset.tenotsuFinalOpacity || '1';
      img.style.setProperty('transition', `opacity ${FADE_IN_MS}ms ease`, 'important');
      img.style.setProperty('opacity', finalOpacity, 'important');
    });
    await sleep(FADE_IN_MS + 40);
    imgs.forEach((img) => {
      img.style.removeProperty('transition');
      delete img.dataset.tenotsuFinalOpacity;
    });
  }

  function lockStoryInput() {
    try { if (typeof ns.setStoryLoading === 'function') ns.setStoryLoading(true); } catch (_) {}
    try { document.body.classList.add('tenotsu-story-sprite-transitioning'); } catch (_) {}
  }

  function unlockStoryInput() {
    try { document.body.classList.remove('tenotsu-story-sprite-transitioning'); } catch (_) {}
    try { if (typeof ns.setStoryLoading === 'function') ns.setStoryLoading(false); } catch (_) {}
  }

  const originalClearStorySpritesV2 = ns.clearStorySpritesV2;
  if (typeof originalClearStorySpritesV2 === 'function') {
    ns.clearStorySpritesV2 = function clearStorySpritesV2FlickerGuardPatched() {
      resetSpriteKey();
      return originalClearStorySpritesV2.apply(this, arguments);
    };
  }

  const originalHideStoryCharacters = ns.hideStoryCharacters;
  if (typeof originalHideStoryCharacters === 'function') {
    ns.hideStoryCharacters = function hideStoryCharactersFlickerGuardPatched() {
      resetSpriteKey();
      return originalHideStoryCharacters.apply(this, arguments);
    };
  }

  const originalShowStoryCharacters = ns.showStoryCharacters;
  if (typeof originalShowStoryCharacters === 'function') {
    ns.showStoryCharacters = function showStoryCharactersSpriteTransitionPatched(characters) {
      const normalized = normalizeSpritesForKey(characters);
      const nextKey = spriteKey(normalized);

      if (!ns.__storySpriteTransitionRenderHidden && normalized.length > 0 && nextKey === getRememberedKey()) {
        // Critical flicker guard: same sprites are already on screen, so do not clear/recreate DOM.
        return;
      }

      originalShowStoryCharacters.call(ns, characters);
      if (normalized.length > 0) rememberSpriteKey(normalized);

      if (!ns.__storySpriteTransitionRenderHidden) return;
      const imgs = currentSpriteImages();
      imgs.forEach((img) => {
        const finalOpacity = img.style && img.style.opacity ? img.style.opacity : (img.getAttribute('data-opacity') || '1');
        img.dataset.tenotsuFinalOpacity = finalOpacity || '1';
        img.style.setProperty('transition', 'none', 'important');
        img.style.setProperty('opacity', '0', 'important');
        img.style.setProperty('visibility', 'visible', 'important');
        img.style.setProperty('display', 'block', 'important');
      });
    };
  }

  const originalApplyStoryStep = ns.applyStoryStep;
  if (typeof originalApplyStoryStep === 'function') {
    ns.applyStoryStep = async function applyStoryStepSpriteTransitionPatched(step, options = {}) {
      const targetList = getTargetSprites(step);
      const needsSpriteTransition = shouldHandleSpriteTransition(step, targetList);
      if (!needsSpriteTransition || options.initial) {
        const result = await originalApplyStoryStep.call(ns, step, options);
        if (targetList.length > 0) rememberSpriteKey(targetList);
        return result;
      }

      lockStoryInput();
      try {
        await preloadTargetSprites(targetList);
        await fadeOutCurrentSprites();
        ns.__storySpriteTransitionRenderHidden = targetList.length > 0;
        const result = await originalApplyStoryStep.call(ns, step, options);
        ns.__storySpriteTransitionRenderHidden = false;
        lockStoryInput();
        if (targetList.length > 0) await fadeInCurrentSprites();
        if (targetList.length > 0) rememberSpriteKey(targetList);
        return result;
      } finally {
        ns.__storySpriteTransitionRenderHidden = false;
        unlockStoryInput();
      }
    };
  }
})();
