/* v039_59 stamina base */
(function () {
  "use strict";
  const STORAGE_KEY = "tenotsu_stamina_v1";
  const MAX_STAMINA = 100;
  const DEFAULT_COSTS = {
    normal_sales: 10,
    sales_battle: 20,
    practice_service: 0
  };

  function nowIso() { return new Date().toISOString(); }
  function clamp(value) {
    return Math.max(0, Math.min(MAX_STAMINA, Math.floor(Number(value) || 0)));
  }
  function load() {
    let data = null;
    try { data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch (_) { data = null; }
    if (!data || typeof data !== "object") {
      return { version: "v039_59", current: MAX_STAMINA, max: MAX_STAMINA, updatedAt: nowIso(), history: [] };
    }
    data.max = MAX_STAMINA;
    data.current = clamp(data.current == null ? MAX_STAMINA : data.current);
    data.history = Array.isArray(data.history) ? data.history.slice(-20) : [];
    data.version = data.version || "v039_59";
    data.updatedAt = data.updatedAt || nowIso();
    return data;
  }
  function save(data) {
    data.updatedAt = nowIso();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_) {}
    return data;
  }
  function getCost(modeId) {
    return DEFAULT_COSTS[String(modeId || "")] == null ? 10 : DEFAULT_COSTS[String(modeId || "")];
  }
  function getState() {
    return load();
  }
  function canConsume(modeOrCost) {
    const cost = typeof modeOrCost === "number" ? Math.max(0, Math.floor(modeOrCost)) : getCost(modeOrCost);
    return load().current >= cost;
  }
  function consume(modeOrCost, label = "店舗営業") {
    const cost = typeof modeOrCost === "number" ? Math.max(0, Math.floor(modeOrCost)) : getCost(modeOrCost);
    const data = load();
    if (data.current < cost) return { ok: false, cost, state: data };
    data.current = clamp(data.current - cost);
    data.history.push({ type: "consume", label, cost, at: nowIso() });
    data.history = data.history.slice(-20);
    save(data);
    return { ok: true, cost, state: data };
  }
  function recover(amount = MAX_STAMINA, label = "回復") {
    const data = load();
    const value = Math.max(0, Math.floor(Number(amount) || 0));
    data.current = clamp(data.current + value);
    data.history.push({ type: "recover", label, amount: value, at: nowIso() });
    data.history = data.history.slice(-20);
    save(data);
    return data;
  }
  function recoverAll() { return recover(MAX_STAMINA, "全回復"); }
  function renderBadge(modeId) {
    const st = load();
    const cost = getCost(modeId);
    return `<div class="tenotsu-stamina-badge"><span>スタミナ</span><b>${st.current}/${st.max}</b><small>消費 ${cost}</small></div>`;
  }

  window.TenotsuStamina = {
    VERSION: "v039_59",
    MAX_STAMINA,
    DEFAULT_COSTS: Object.assign({}, DEFAULT_COSTS),
    getCost,
    getState,
    canConsume,
    consume,
    recover,
    recoverAll,
    renderBadge
  };
})();
