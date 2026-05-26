/* v039_29 members */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;

  ns.renderMembersPanel = function renderMembersPanel() {
    const members = ns.memberProfiles || [];
    const cards = members.map((m, index) => `
      <button type="button" class="tenotsu-member-card" data-member-index="${index}">
        <span class="tenotsu-member-color" style="background:${m.color}"></span>
        <span class="tenotsu-member-name">${m.name}</span>
        <span class="tenotsu-member-role">${m.role}</span>
      </button>
    `).join("");

    const html = `
      <div class="tenotsu-members-title">メンバー</div>
      <div class="tenotsu-members-body">
        <div class="tenotsu-members-list">${cards}</div>
        <div class="tenotsu-member-detail" data-member-detail>
          <div class="tenotsu-member-detail-empty">メンバーを選択してください。</div>
        </div>
      </div>
      <button type="button" class="tenotsu-members-back" data-members-action="back-office">事務所に戻る</button>
    `;

    ns.showMembersPanel(html);

    const panel = ns.layers.members;
    const detail = panel.querySelector("[data-member-detail]");

    panel.querySelectorAll("[data-member-index]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const m = members[Number(btn.dataset.memberIndex)];
        if (!m) return;
        panel.querySelectorAll(".tenotsu-member-card").forEach((card) => card.classList.remove("selected"));
        btn.classList.add("selected");
        detail.innerHTML = `
          <div class="tenotsu-member-detail-head">
            <img src="${ns.paths.charBase + m.image}" alt="${m.name}" class="tenotsu-member-detail-img">
            <div>
              <div class="tenotsu-member-detail-name">${m.name}</div>
              <div class="tenotsu-member-detail-role">${m.role}</div>
              <div class="tenotsu-member-detail-specialty">得意：${m.specialty}</div>
            </div>
          </div>
          <div class="tenotsu-member-detail-comment">${m.comment}</div>
        `;
        ns.setText(m.name, m.comment);
      });
    });

    const back = panel.querySelector('[data-members-action="back-office"]');
    if (back) {
      back.addEventListener("click", () => {
        ns.hideMembersPanel();
        ns.enterOffice({ speaker: "店長", message: "事務所に戻りました。" });
      });
    }
  };

  ns.enterMembers = async function enterMembers(options = {}) {
    if (!options.noTransition && typeof ns.transitionTo === "function") {
      return ns.transitionTo(() => ns.enterMembers({ noTransition: true }));
    }
    ns.setMode("members");
    ns.ensureLayers();
    if (typeof ns.setBackgroundReady === "function") {
      await ns.setBackgroundReady(ns.paths.officeBg);
    } else {
      ns.setBackground(ns.paths.officeBg);
    }
    if (typeof ns.hideSettingsPanel === "function") ns.hideSettingsPanel();
    if (typeof ns.hideShopPanel === "function") ns.hideShopPanel();
    if (typeof ns.hideTownPanel === "function") ns.hideTownPanel();
    if (typeof ns.hideSalesPanel === "function") ns.hideSalesPanel();
    ns.renderOfficeMenu();
    ns.renderMembersPanel();
    ns.setText("店長", "メンバーを確認します。");
  };
})();
