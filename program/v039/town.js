/* v039_12 town season event tree */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;

  function seasonButton(season) {
    return `
      <button type="button" class="tenotsu-season-card" data-season-id="${season.id}" style="--season-color:${season.color}">
        <span class="tenotsu-season-label">${season.label}</span>
        <span class="tenotsu-season-copy">${season.catchcopy}</span>
        <span class="tenotsu-season-count">${(season.events || []).length}件</span>
      </button>
    `;
  }

  function eventButton(event) {
    return `
      <button type="button" class="tenotsu-event-card" data-event-id="${event.id}">
        <span class="tenotsu-event-title">${event.title}</span>
        <span class="tenotsu-event-character">${event.character}</span>
        <span class="tenotsu-event-status">${event.status}</span>
      </button>
    `;
  }

  ns.renderTownSeasonTop = function renderTownSeasonTop() {
    const seasons = (ns.seasonOrder || []).map((id) => ns.getSeason(id)).filter(Boolean);
    const html = `
      <div class="tenotsu-town-title">外回り</div>
      <div class="tenotsu-town-subtitle">季節を選んで、対象イベントを確認します。</div>
      <div class="tenotsu-season-grid">
        ${seasons.map(seasonButton).join("")}
      </div>
      <button type="button" class="tenotsu-town-back" data-town-action="back-office">事務所に戻る</button>
    `;

    ns.showTownPanel(html);
    const panel = ns.layers.town;

    panel.querySelectorAll("[data-season-id]").forEach((btn) => {
      btn.addEventListener("click", () => ns.renderSeasonEvents(btn.dataset.seasonId));
    });

    const back = panel.querySelector('[data-town-action="back-office"]');
    if (back) {
      back.addEventListener("click", () => {
        ns.hideTownPanel();
        ns.enterOffice({ speaker: "店長", message: "事務所に戻りました。" });
      });
    }
  };

  ns.renderSeasonEvents = function renderSeasonEvents(seasonId) {
    const season = ns.getSeason(seasonId);
    if (!season) {
      ns.setText("店長", "季節データを確認できませんでした。");
      return;
    }

    ns.setBackground(season.bg || ns.paths.townBg || ns.paths.officeBg);
    ns.setText("店長", `${season.label}のイベントを確認します。`);

    const html = `
      <div class="tenotsu-town-title">${season.label}の外回り</div>
      <div class="tenotsu-town-subtitle">${season.catchcopy}</div>
      <div class="tenotsu-event-tree">
        <div class="tenotsu-event-list">
          ${(season.events || []).map(eventButton).join("")}
        </div>
        <div class="tenotsu-event-detail" data-event-detail>
          <div class="tenotsu-event-detail-empty">イベントを選択してください。</div>
        </div>
      </div>
      <div class="tenotsu-town-button-row">
        <button type="button" class="tenotsu-town-back" data-town-action="season-top">季節選択へ戻る</button>
        <button type="button" class="tenotsu-town-back" data-town-action="back-office">事務所に戻る</button>
      </div>
    `;

    ns.showTownPanel(html);
    const panel = ns.layers.town;
    const detail = panel.querySelector("[data-event-detail]");

    panel.querySelectorAll("[data-event-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const eventId = btn.dataset.eventId;
        const event = (season.events || []).find((item) => item.id === eventId);
        if (!event) return;

        panel.querySelectorAll(".tenotsu-event-card").forEach((card) => card.classList.remove("selected"));
        btn.classList.add("selected");

        detail.innerHTML = `
          <div class="tenotsu-event-detail-title">${event.title}</div>
          <div class="tenotsu-event-detail-meta">登場：${event.character}</div>
          <div class="tenotsu-event-detail-meta">場所：${event.place}</div>
          <div class="tenotsu-event-detail-meta">状態：${event.status}</div>
          <div class="tenotsu-event-detail-summary">${event.summary}</div>
          ${event.cg ? `<div class="tenotsu-event-detail-cg">CG候補：${event.cg}</div>` : ""}
          <button type="button" class="tenotsu-event-start" data-event-start="${event.id}">イベント開始</button>
        `;

        ns.setText(event.character, event.summary);

        const start = detail.querySelector("[data-event-start]");
        if (start) start.addEventListener("click", () => ns.startSeasonEvent(season, event));
      });
    });

    panel.querySelectorAll("[data-town-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.townAction;
        if (action === "season-top") {
          ns.setBackground(ns.paths.townBg || ns.paths.officeBg);
          ns.renderTownSeasonTop();
          ns.setText("店長", "季節を選び直します。");
        } else if (action === "back-office") {
          ns.hideTownPanel();
          ns.enterOffice({ speaker: "店長", message: "事務所に戻りました。" });
        }
      });
    });
  };

  ns.startSeasonEvent = function startSeasonEvent(season, event) {
    if (!season || !event) return;

    if (event.scenario && typeof ns.startStory === "function") {
      ns.startStory(event.scenario, { mode: "town", season: season.id });
      return;
    }

    ns.setBackground(event.bg || season.bg || ns.paths.townBg || ns.paths.officeBg);
    ns.setText(event.character || "店長", event.startMessage || "このイベントは後続バージョンでstoryPlayerへ接続します。");

    const detail = ns.layers.town.querySelector("[data-event-detail]");
    if (detail && !detail.querySelector(".tenotsu-event-start-note")) {
      detail.innerHTML += `
        <div class="tenotsu-event-start-note">
          <strong>storyPlayer接続予定：</strong><br>
          このイベントにはまだシナリオJSONが設定されていません。
        </div>
      `;
    }
  };

  ns.enterTown = function enterTown() {
    ns.setMode("town");
    ns.ensureLayers();
    if (typeof ns.hideSettingsPanel === "function") ns.hideSettingsPanel();
    if (typeof ns.hideShopPanel === "function") ns.hideShopPanel();
    if (typeof ns.hideMembersPanel === "function") ns.hideMembersPanel();
    if (typeof ns.clearCharacters === "function") ns.clearCharacters();
    ns.setBackground(ns.paths.townBg || ns.paths.officeBg);
    ns.renderOfficeMenu();
    ns.renderTownSeasonTop();
    ns.setText("店長", "外回りへ出ます。季節を選びましょう。");
  };
})();
