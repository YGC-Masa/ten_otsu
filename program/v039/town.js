/* v039_08 town */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;

  ns.renderTownPanel = function renderTownPanel() {
    const spots = ns.townSpots || [];
    const cards = spots.map((spot, index) => `
      <button type="button" class="tenotsu-town-card" data-town-index="${index}">
        <span class="tenotsu-town-name">${spot.name}</span>
        <span class="tenotsu-town-type">${spot.type}</span>
        <span class="tenotsu-town-status">${spot.status}</span>
      </button>
    `).join("");

    const html = `
      <div class="tenotsu-town-title">外回り</div>
      <div class="tenotsu-town-body">
        <div class="tenotsu-town-list">${cards}</div>
        <div class="tenotsu-town-detail" data-town-detail>
          <div class="tenotsu-town-detail-empty">行き先を選択してください。</div>
        </div>
      </div>
      <button type="button" class="tenotsu-town-back" data-town-action="back-office">事務所に戻る</button>
    `;

    ns.showTownPanel(html);

    const panel = ns.layers.town;
    const detail = panel.querySelector("[data-town-detail]");

    panel.querySelectorAll("[data-town-index]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const spot = spots[Number(btn.dataset.townIndex)];
        if (!spot) return;
        panel.querySelectorAll(".tenotsu-town-card").forEach((card) => card.classList.remove("selected"));
        btn.classList.add("selected");
        detail.innerHTML = `
          <div class="tenotsu-town-detail-name">${spot.name}</div>
          <div class="tenotsu-town-detail-type">${spot.type}</div>
          <div class="tenotsu-town-detail-description">${spot.description}</div>
          <div class="tenotsu-town-detail-status">状態：${spot.status}</div>
          <button type="button" class="tenotsu-town-start" data-town-start="${spot.id}">この場所へ行く</button>
        `;
        ns.setText(spot.speaker || "店長", spot.message || spot.description);

        const start = detail.querySelector("[data-town-start]");
        if (start) {
          start.addEventListener("click", () => ns.startTownSpot(spot));
        }
      });
    });

    const back = panel.querySelector('[data-town-action="back-office"]');
    if (back) {
      back.addEventListener("click", () => {
        ns.hideTownPanel();
        ns.enterOffice({ speaker: "店長", message: "事務所に戻りました。" });
      });
    }
  };

  ns.startTownSpot = function startTownSpot(spot) {
    if (!spot) return;

    if (spot.id === "wakaba_central_park") {
      ns.setText("店長", "若葉中央公園へ向かいます。桜の木陰で読書する藍ちゃんのイベントは、v039_09以降のstoryPlayerで接続します。");
      const detail = ns.layers.town.querySelector("[data-town-detail]");
      if (detail) {
        detail.innerHTML += `
          <div class="tenotsu-town-event-note">
            <strong>接続予定イベント：</strong><br>
            外回りの休憩がてら公園に立ち寄り、桜の木陰で読書する藍ちゃんに声をかける春イベント。
          </div>
        `;
      }
      return;
    }

    ns.setText(spot.name, "この行き先は後続バージョンでイベント接続します。");
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
    ns.renderTownPanel();
    ns.setText("店長", "外回りへ出ます。行き先を選びましょう。");
  };
})();
