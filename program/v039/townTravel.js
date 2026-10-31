/* Travel uses existing places and catalog assets; encounter costs and story logic remain in town.js. */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;
  const KEY = "tenotsu_town_encounter_v1";
  let request = 0;
  const esc = value => String(value == null ? "" : value).replace(/[&<>\"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const config = () => window.TENOTSU_TOWN_ENCOUNTER_CONFIG;
  const placeById = id => config().places.find(place => place.id === id);
  function saved() {
    try { const value = JSON.parse(localStorage.getItem(KEY) || "{}"); return value && typeof value === "object" && !Array.isArray(value) ? value : {}; }
    catch (_) { return {}; }
  }
  function snapshot() {
    return ns.calendar ? ns.calendar.getSnapshot() : {season:saved().currentSeason || config().defaultSeason, period:null};
  }
  const allowed = place => place && !place.visitBlocked;
  ns.resolveTownBackground = function(id, state = snapshot()) {
    const place = placeById(id);
    if (!allowed(place, state)) return null;
    const catalog = window.TENOTSU_BACKGROUND_CATALOG || {};
    const variant = place.backgroundBySeason?.[state.season] || place;
    const key = variant.backgroundKeys?.[state.period] || variant.backgroundKey || place.backgroundKey;
    const asset = catalog[key] || place.backgroundAsset;
    if (!asset?.path) return null;
    return {place, key, asset, url:ns.calendar ? ns.calendar.resolveContent(asset.path) : asset.path};
  };
  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      const timer = setTimeout(() => { image.onload = image.onerror = null; reject(new Error("background-timeout")); }, 12000);
      image.onload = () => { clearTimeout(timer); image.naturalWidth > 0 ? resolve() : reject(new Error("empty-background")); };
      image.onerror = () => { clearTimeout(timer); reject(new Error("background-load-failed")); };
      image.src = url;
    });
  }
  function back() { request++; ns.hideTownPanel(); ns.enterOffice({speaker:"店長",message:"事務所に戻りました。"}); }
  function arrival(target) {
    ns.state.townView = "arrival";
    ns.showTownPanel(`<div data-town-arrival="${esc(target.place.id)}"><b>${esc(target.place.name)}</b><small>代表背景：${esc(target.asset.name || target.place.name)}</small><small>背景訪問です。入場・サービス利用とは別です。</small><div class="tenotsu-town-arrival-actions"><button type="button" data-town-action="locations">場所一覧</button><button type="button" data-town-action="back-office">事務所に戻る</button></div></div>`);
    ns.layers.town.querySelector('[data-town-action="locations"]').addEventListener("click", () => ns.renderTownSeasonTop());
    ns.layers.town.querySelector('[data-town-action="back-office"]').addEventListener("click", back);
    ns.setText("外回り", `${target.place.name}へ移動しました。`);
  }
  ns.moveTownPlace = async function(id, options = {}) {
    if (ns.state.mode !== "town" || ns.story?.active) return {ok:false, reason:"scene-active"};
    const target = ns.resolveTownBackground(id);
    if (!target) return {ok:false, reason:"unavailable"};
    const token = ++request;
    try { await loadImage(target.url); }
    catch (_) {
      if (token === request && ns.state.mode === "town" && !ns.story?.active) ns.setText("外回り", "背景を読み込めませんでした。現在地を変えず、場所一覧から再度お試しください。");
      return {ok:false, reason:"background-load-failed"};
    }
    const current = ns.resolveTownBackground(id);
    if (token !== request || ns.state.mode !== "town" || ns.story?.active || current?.url !== target.url) return {ok:false, reason:"superseded"};
    ns.setBackground(target.url);
    ns.state.currentTownPlaceId = id;
    if (options.persist !== false) {
      const value = saved(); value.currentPlaceId = id;
      try { localStorage.setItem(KEY, JSON.stringify(value)); } catch (_) {}
    }
    if (options.showArrival !== false) arrival(target);
    return {ok:true, placeId:id, background:target.url};
  };
  const renderDetail = ns.renderTownPlaceDetail;
  ns.renderTownPlaceDetail = function(id) {
    request++;
    const result = renderDetail.apply(this, arguments);
    const detail = ns.layers.town.querySelector('[data-town-encounter-detail]');
    if (!detail) return result;
    const target = ns.resolveTownBackground(id);
    const row = document.createElement("div"); row.className = "tenotsu-town-tool-row";
    const button = document.createElement("button"); button.type = "button"; button.className = "tenotsu-town-tool";
    button.dataset.townTravel = id; button.disabled = !target;
    button.textContent = target ? "ここへ移動" : "移動用背景は未接続";
    button.addEventListener("click", async () => { button.disabled = true; await ns.moveTownPlace(id); if (button.isConnected) button.disabled = false; });
    row.append(button); detail.prepend(row);
    const note = document.createElement("small");
    const place = placeById(id);
    const names = {spring:"春",summer:"夏",autumn:"秋",winter:"冬"};
    note.textContent = "背景訪問と遭遇は別です。遭遇対象季節：" + (place.seasons?.length ? place.seasons.map(s => names[s] || s).join("・") : "既存シナリオの条件による") + "。施設の入場・利用条件はこの操作で解除しません。";
    row.after(note);
    return result;
  };
  const renderMenu = ns.renderTownSeasonTop;
  ns.renderTownSeasonTop = function() { request++; ns.state.townView = "menu"; return renderMenu.apply(this, arguments); };
  ns.refreshTownCalendar = function() {
    if (ns.story?.active || ns.state.mode !== "town") return;
    const id = ns.state.currentTownPlaceId || saved().currentPlaceId;
    const isArrival = ns.state.townView === "arrival";
    if (!isArrival) ns.renderTownSeasonTop();
    if (id && ns.resolveTownBackground(id)) {
      void ns.moveTownPlace(id, {persist:false,showArrival:isArrival});
    } else {
      if (isArrival) ns.renderTownSeasonTop();
      const bg = config().seasons.find(season => season.id === snapshot().season)?.bg;
      if (bg) ns.setBackground(bg);
    }
  };
  const enterTown = ns.enterTown;
  ns.enterTown = async function(options = {}) {
    const result = await enterTown.apply(this, arguments);
    if (options.noTransition || typeof ns.transitionTo !== "function") {
      const id = saved().currentPlaceId;
      if (id && ns.resolveTownBackground(id)) await ns.moveTownPlace(id, {persist:false});
    }
    return result;
  };
})();
