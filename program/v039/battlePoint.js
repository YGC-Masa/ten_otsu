/* v039_65 battle point base for VSビリビリ */
(function () {
  "use strict";
  const STORAGE_KEY = "tenotsu_battle_point_v1";
  const MAX_BP = 5;
  const DEFAULT_COSTS = {
    rival_battle: 1
  };

  function nowIso() { return new Date().toISOString(); }
  function clamp(value) {
    return Math.max(0, Math.min(MAX_BP, Math.floor(Number(value) || 0)));
  }
  function load() {
    let data = null;
    try { data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch (_) { data = null; }
    if (!data || typeof data !== "object") {
      return { version: "v039_65", current: MAX_BP, max: MAX_BP, updatedAt: nowIso(), history: [] };
    }
    data.max = MAX_BP;
    data.current = clamp(data.current == null ? MAX_BP : data.current);
    data.history = Array.isArray(data.history) ? data.history.slice(-20) : [];
    data.version = "v039_65";
    data.updatedAt = data.updatedAt || nowIso();
    return data;
  }
  function save(data) {
    data.updatedAt = nowIso();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_) {}
    refreshAll();
    return data;
  }
  function getCost(modeId) {
    return DEFAULT_COSTS[String(modeId || "")] == null ? 0 : DEFAULT_COSTS[String(modeId || "")];
  }
  function getState() { return load(); }
  function canConsume(modeOrCost) {
    const cost = typeof modeOrCost === "number" ? Math.max(0, Math.floor(modeOrCost)) : getCost(modeOrCost);
    return load().current >= cost;
  }
  function consume(modeOrCost, label = "バトル営業") {
    const cost = typeof modeOrCost === "number" ? Math.max(0, Math.floor(modeOrCost)) : getCost(modeOrCost);
    const data = load();
    if (cost <= 0) return { ok: true, cost, state: data };
    if (data.current < cost) return { ok: false, cost, state: data };
    data.current = clamp(data.current - cost);
    data.history.push({ type: "consume", label, cost, at: nowIso() });
    data.history = data.history.slice(-20);
    return save(data), { ok: true, cost, state: data };
  }
  function recover(amount = MAX_BP, label = "BP回復") {
    const data = load();
    const value = Math.max(0, Math.floor(Number(amount) || 0));
    data.current = clamp(data.current + value);
    data.history.push({ type: "recover", label, amount: value, at: nowIso() });
    data.history = data.history.slice(-20);
    return save(data);
  }
  function recoverAll() { return recover(MAX_BP, "BP全回復"); }
  function renderBadge(modeId) {
    const cost = getCost(modeId);
    if (cost <= 0) return "";
    const bp = load();
    return `<div class="tenotsu-battlepoint-badge"><span>バトルP</span><b>${bp.current}/${bp.max}</b><small>消費 ${cost}</small></div>`;
  }
  function renderSalesSummary() {
    const bp = load();
    return `<div class="tenotsu-battlepoint-summary"><span>バトルP</span><b>${bp.current}/${bp.max}</b><small>VSビリビリで消費</small></div>`;
  }
  function refreshAll() {
    try { if (window.TenotsuStamina && typeof window.TenotsuStamina.renderHud === "function") window.TenotsuStamina.renderHud(); } catch (_) {}
  }

  window.TenotsuBattlePoint = {
    VERSION: "v039_65",
    MAX_BP,
    DEFAULT_COSTS: Object.assign({}, DEFAULT_COSTS),
    getCost,
    getState,
    canConsume,
    consume,
    recover,
    recoverAll,
    renderBadge,
    renderSalesSummary,
    refreshAll
  };

  window.addEventListener("load", () => setTimeout(refreshAll, 0));
})();
