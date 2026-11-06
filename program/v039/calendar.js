/* Corrected free trials: TimeThymus controls periods; SeasonRaisin controls seasons. */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};
  const KEY = "tenotsu_season_raisin_v1";
  const PERIOD_KEY = "tenotsu_time_thymus_period_v1";
  const PERIODS = { early_morning: "早朝", morning: "朝", day: "昼", evening: "夕方", night: "夜", late_night: "深夜" };
  const TOWN_KEY = "tenotsu_town_encounter_v1";
  const JST = 9 * 60 * 60 * 1000;
  const TRIAL_DURATION_MS = 2 * 60 * 60 * 1000;
  const defaultOfficeBg = ns.paths && ns.paths.officeBg;
  let previous = "";

  function realDate(now) {
    const d = new Date(now + JST);
    return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate(),
      weekday: d.getUTCDay(), hour: d.getUTCHours(), minute: d.getUTCMinutes(), second: d.getUTCSeconds() };
  }
  function season(month) {
    return month >= 3 && month <= 5 ? "spring" : month >= 6 && month <= 8 ? "summer" : month >= 9 && month <= 10 ? "autumn" : "winter";
  }
  function realPeriod(hour) {
    return hour >= 4 && hour < 7 ? "early_morning" :
      hour >= 7 && hour < 10 ? "morning" :
      hour >= 10 && hour < 16 ? "day" :
      hour >= 16 && hour < 19 ? "evening" :
      hour >= 19 && hour < 23 ? "night" : "late_night";
  }
  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || "null"); } catch (_) { return null; }
  }
  function clearTrial(key) { try { localStorage.removeItem(key); } catch (_) {} }
  function legacySeasonExpiry(selectedAt) {
    const d = realDate(selectedAt);
    return Date.UTC(d.year, d.month - 1, d.day + 2) - JST;
  }
  function trial(key, itemId, field, allowed, now) {
    const data = read(key);
    if (data === null) return null;
    const used = typeof data?.selectedAt === "string" ? Date.parse(data.selectedAt) : NaN;
    if (![1, 2].includes(data?.version) || data.itemId !== itemId || !allowed.includes(data[field]) ||
        !Number.isFinite(used) || new Date(used).toISOString() !== data.selectedAt || used > now || now >= used + TRIAL_DURATION_MS) {
      clearTrial(key);
      return null;
    }
    const expiresAt = new Date(used + TRIAL_DURATION_MS).toISOString();
    if (data.version === 1) {
      // Published trials: preserve the original use time, never the migration time.
      const legacyExpiry = itemId === "season_raisin" ? new Date(legacySeasonExpiry(used)).toISOString() : undefined;
      if (Object.hasOwn(data, "expiresAt") && data.expiresAt !== legacyExpiry) {
        clearTrial(key);
        return null;
      }
      const migrated = Object.assign({}, data, { version: 2, expiresAt });
      try { localStorage.setItem(key, JSON.stringify(migrated)); } catch (_) { return null; }
      return migrated;
    }
    if (data.expiresAt !== expiresAt) {
      clearTrial(key);
      return null;
    }
    return data;
  }
  function getSnapshot(now = Date.now()) {
    const real = realDate(now), active = trial(KEY, "season_raisin", "season", ["spring", "summer", "autumn", "winter"], now);
    const month = real.month;
    const timeTrial = trial(PERIOD_KEY, "time_thymus", "period", Object.keys(PERIODS), now);
    const actualPeriod = realPeriod(real.hour);
    return { real, month, season: active?.season || season(month), seasonTrial: active, period: timeTrial?.period || actualPeriod, realPeriod: actualPeriod, timeTrial };
  }
  function monthConfig(month = getSnapshot().month) {
    return (window.TENOTSU_CALENDAR_CONFIG?.months || {})[String(month).padStart(2, "0")] || {};
  }
  function resolveContent(path, month = getSnapshot().month) {
    if (path === "images/assets/bg/bg_tsukiga_irodori_shop_day.webp") return "https://raw.githubusercontent.com/YGC-Masa/ten_otsu_backgrounds/f9faf211ea13c208afacec6939b2b23c645b7c24/" + path;
    if (typeof path !== "string" || !path || /^(?:[a-z][a-z\d+.-]*:|\/)/i.test(path)) return path;
    const base = monthConfig(month).contentBaseUrl;
    if (!base) return path;
    try {
      const url = new URL(base);
      if (!["https:", "http:"].includes(url.protocol)) return path;
      if (!url.pathname.endsWith("/")) url.pathname += "/";
      return new URL(path, url).href;
    } catch (_) { return path; }
  }
  function freezeStoryAssets(source, month) {
    const data = JSON.parse(JSON.stringify(source));
    for (const step of data.steps || []) {
      if (step.bg) step.bg = resolveContent(step.bg, month);
      for (const sprite of step.storySprites || []) {
        if (sprite.src) sprite.src = resolveContent(sprite.src, month);
      }
    }
    return data;
  }
  function officeBackground() {
    const snapshot = getSnapshot();
    const config = monthConfig(snapshot.month);
    const bg = config.timePeriods?.[snapshot.period]?.officeBackground || config.officeBackground;
    return bg ? resolveContent(bg, snapshot.month) : defaultOfficeBg;
  }
  function officeOutfit(member) {
    const id = (ns.memberProfiles || []).find(profile => profile.name === member[0])?.id;
    const snapshot = getSnapshot();
    const config = monthConfig(snapshot.month);
    const outfit = config.timePeriods?.[snapshot.period]?.officeOutfits?.[id] || config.officeOutfits?.[id];
    return outfit ? resolveContent(outfit, snapshot.month) : ns.paths.charBase + member[1];
  }
  const pad = value => String(value).padStart(2, "0");
  function formatReal(real) {
    return `${real.year}/${pad(real.month)}/${pad(real.day)}（${"日月火水木金土"[real.weekday]}）${pad(real.hour)}:${pad(real.minute)}:${pad(real.second)} JST`;
  }
  function statusHtml() {
    return '<div class="tenotsu-calendar-status"><div data-real-time-clock></div><div data-calendar-stay></div><div data-calendar-period></div></div>';
  }
  function updateClock() {
    if (typeof document === "undefined") return;
    const now = Date.now();
    const snapshot = getSnapshot(now);
    document.querySelectorAll("[data-real-time-clock]").forEach(node => { node.textContent = formatReal(snapshot.real); });
    const seasonNames = { spring: "春", summer: "夏", autumn: "秋", winter: "冬" };
    const deadline = snapshot.seasonTrial ? formatReal(realDate(Date.parse(snapshot.seasonTrial.expiresAt))) : "";
    let stay = `現実の${snapshot.month}月・季節：${seasonNames[season(snapshot.real.month)]}`;
    if (snapshot.seasonTrial) {
      const remaining = Math.max(0, Math.ceil((Date.parse(snapshot.seasonTrial.expiresAt) - now) / 1000));
      const duration = `${Math.floor(remaining / 3600)}時間${pad(Math.floor(remaining / 60) % 60)}分${pad(remaining % 60)}秒`;
      stay += ` ／ 試用中の季節：${seasonNames[snapshot.season]}（シーズンレーズン・無料試用2時間／残り${duration}／${deadline}に失効・現実の季節へ戻ります）`;
    }
    document.querySelectorAll("[data-calendar-stay]").forEach(node => { node.textContent = stay; });
    document.querySelectorAll("[data-calendar-period]").forEach(node => { node.textContent = snapshot.timeTrial ? `時間帯：${PERIODS[snapshot.period]}（無料試用・2時間／${formatReal(realDate(Date.parse(snapshot.timeTrial.expiresAt)))}に失効）` : `時間帯：${PERIODS[snapshot.realPeriod]}（実時刻）`; });
  }
  function tick(render = true) {
    const snapshot = getSnapshot();
    const signature = `${snapshot.real.year}-${snapshot.real.month}-${snapshot.real.day}:${snapshot.month}:${snapshot.season}:${!!snapshot.seasonTrial}:${!!snapshot.timeTrial}:${snapshot.period || ""}`;
    const changed = signature !== previous;
    previous = signature;
    const stored = read(TOWN_KEY);
    const saved = stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
    if (saved.currentSeason !== snapshot.season) {
      saved.currentSeason = snapshot.season;
      try { localStorage.setItem(TOWN_KEY, JSON.stringify(saved)); } catch (_) {}
    }
    if (ns.paths) ns.paths.officeBg = officeBackground();
    if (render && changed && !ns.story?.active) {
      if (ns.state?.mode === "town") {
        if (ns.refreshTownCalendar) ns.refreshTownCalendar();
        else {
          ns.renderTownSeasonTop?.();
          const bg = (window.TENOTSU_TOWN_ENCOUNTER_CONFIG?.seasons || []).find(s => s.id === snapshot.season)?.bg;
          if (bg) Promise.resolve(ns.setBackgroundReady?.(bg)).catch(() => {});
        }
      } else if (ns.state?.mode === "office") {
        Promise.resolve(ns.setBackgroundReady?.(ns.paths.officeBg)).catch(() => {});
        ns.renderOfficeCharacters?.({ preserveSelection: true });
      }
    }
    updateClock();
    return snapshot;
  }
  function useSeason(selected) {
    if (!["spring", "summer", "autumn", "winter"].includes(selected)) return { ok: false, reason: "invalid-season" };
    const now = Date.now();
    const record = { version: 2, itemId: "season_raisin", season: selected, selectedAt: new Date(now).toISOString(), expiresAt: new Date(now + TRIAL_DURATION_MS).toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(record)); } catch (_) { return { ok: false, reason: "storage-unavailable" }; }
    tick();
    return { ok: true, seasonTrial: record };
  }
  function returnToReality() { clearTrial(KEY); tick(); }
  function usePeriod(period) {
    if (!Object.hasOwn(PERIODS, period)) return { ok: false, reason: "invalid-period" };
    const now = Date.now();
    const record = { version: 2, itemId: "time_thymus", period, selectedAt: new Date(now).toISOString(), expiresAt: new Date(now + TRIAL_DURATION_MS).toISOString() };
    try { localStorage.setItem(PERIOD_KEY, JSON.stringify(record)); } catch (_) { return { ok: false, reason: "storage-unavailable" }; }
    tick();
    return { ok: true, timeTrial: record };
  }
  function returnTimeToReality() { clearTrial(PERIOD_KEY); tick(); }
  ns.calendar = { getSnapshot, useSeason, usePeriod, returnTimeToReality, returnToReality, tick, resolveContent, freezeStoryAssets,
    officeBackground, officeOutfit, statusHtml, updateClock };
  tick(false);
  if (typeof document !== "undefined") {
    window.setInterval(() => tick(), 1000);
    window.addEventListener("focus", () => tick());
    window.addEventListener("pageshow", () => tick());
    document.addEventListener("visibilitychange", () => { if (!document.hidden) tick(); });
  }
})();
