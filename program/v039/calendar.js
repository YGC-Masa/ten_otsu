/* Corrected free trials: TimeThymus controls periods; SeasonRaisin controls seasons. */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};
  const KEY = "tenotsu_season_raisin_v1";
  const PERIOD_KEY = "tenotsu_time_thymus_period_v1";
  const PERIODS = { morning: "朝", day: "昼", night: "夜" };
  const TOWN_KEY = "tenotsu_town_encounter_v1";
  const JST = 9 * 60 * 60 * 1000;
  const defaultOfficeBg = ns.paths && ns.paths.officeBg;
  let previous = "";

  function realDate(now) {
    const d = new Date(now + JST);
    return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate(),
      weekday: d.getUTCDay(), hour: d.getUTCHours(), minute: d.getUTCMinutes(), second: d.getUTCSeconds() };
  }
  function season(month) {
    return month >= 3 && month <= 5 ? "spring" : month >= 6 && month <= 8 ? "summer" : month >= 9 && month <= 11 ? "autumn" : "winter";
  }
  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || "null"); } catch (_) { return null; }
  }
  function clearSeasonTrial() { try { localStorage.removeItem(KEY); } catch (_) {} }
  function seasonExpiry(selectedAt) {
    const d = realDate(selectedAt);
    return Date.UTC(d.year, d.month - 1, d.day + 2) - JST;
  }
  function seasonTrial(now) {
    const data = read(KEY);
    if (!data) return null;
    if (data.version !== 1 || data.itemId !== "season_raisin" || !["spring", "summer", "autumn", "winter"].includes(data.season)) {
      clearSeasonTrial();
      return null;
    }
    const used = typeof data.selectedAt === "string" ? Date.parse(data.selectedAt) : NaN;
    const expected = seasonExpiry(used);
    const canonicalDate = Number.isFinite(used) && new Date(used).toISOString() === data.selectedAt;
    if (!canonicalDate || used > now || !Number.isFinite(expected) || now >= expected) {
      clearSeasonTrial();
      return null;
    }
    if (!Object.hasOwn(data, "expiresAt")) {
      // Migrate the published trial from its original selection date, never from now.
      data.expiresAt = new Date(expected).toISOString();
      try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (_) { return null; }
    }
    if (data.expiresAt !== new Date(expected).toISOString()) {
      clearSeasonTrial();
      return null;
    }
    return data;
  }
  function getSnapshot(now = Date.now()) {
    const real = realDate(now), active = seasonTrial(now);
    const month = real.month;
    const selected = read(PERIOD_KEY);
    const timeTrial = selected && selected.version === 1 && selected.itemId === "time_thymus" && Object.hasOwn(PERIODS, selected.period) ? selected : null;
    return { real, month, season: active?.season || season(month), seasonTrial: active, period: timeTrial?.period || null, timeTrial };
  }
  function monthConfig(month = getSnapshot().month) {
    return (window.TENOTSU_CALENDAR_CONFIG?.months || {})[String(month).padStart(2, "0")] || {};
  }
  function resolveContent(path, month = getSnapshot().month) {
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
    const snapshot = getSnapshot();
    document.querySelectorAll("[data-real-time-clock]").forEach(node => { node.textContent = formatReal(snapshot.real); });
    const seasonName = { spring: "春", summer: "夏", autumn: "秋", winter: "冬" }[snapshot.season];
    const deadline = snapshot.seasonTrial ? formatReal(realDate(Date.parse(snapshot.seasonTrial.expiresAt) - 1)).replace(/:\d\d JST$/, " JST") : "";
    const stay = `現実の${snapshot.month}月・季節：${seasonName}${snapshot.seasonTrial ? `（無料試用・${deadline}まで）` : ""}`;
    document.querySelectorAll("[data-calendar-stay]").forEach(node => { node.textContent = stay; });
    document.querySelectorAll("[data-calendar-period]").forEach(node => { node.textContent = snapshot.period ? `時間帯：${PERIODS[snapshot.period]}（無料試用）` : "時間帯：実時刻・区分未選択"; });
  }
  function tick(render = true) {
    const snapshot = getSnapshot();
    const signature = `${snapshot.real.year}-${snapshot.real.month}-${snapshot.real.day}:${snapshot.month}:${snapshot.season}:${!!snapshot.seasonTrial}:${snapshot.period || ""}`;
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
    const record = { version: 1, itemId: "season_raisin", season: selected, selectedAt: new Date(now).toISOString(), expiresAt: new Date(seasonExpiry(now)).toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(record)); } catch (_) { return { ok: false, reason: "storage-unavailable" }; }
    tick();
    return { ok: true, seasonTrial: record };
  }
  function returnToReality() { clearSeasonTrial(); tick(); }
  function usePeriod(period) {
    if (!Object.hasOwn(PERIODS, period)) return { ok: false, reason: "invalid-period" };
    const record = { version: 1, itemId: "time_thymus", period, selectedAt: new Date().toISOString() };
    try { localStorage.setItem(PERIOD_KEY, JSON.stringify(record)); } catch (_) { return { ok: false, reason: "storage-unavailable" }; }
    tick();
    return { ok: true, timeTrial: record };
  }
  function returnTimeToReality() { try { localStorage.removeItem(PERIOD_KEY); } catch (_) {} tick(); }
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
