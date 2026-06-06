/* v039_109 members: profile + affection key/main story slots */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  }

  function getGrowthInfo(member) {
    if (!window.TenotsuGrowth || !member) return null;
    const state = typeof window.TenotsuGrowth.getCharacterState === "function" ? window.TenotsuGrowth.getCharacterState(member.id) : null;
    const progress = typeof window.TenotsuGrowth.getLevelProgress === "function" ? window.TenotsuGrowth.getLevelProgress(member.id) : null;
    const stats = typeof window.TenotsuGrowth.getComputedStats === "function" ? window.TenotsuGrowth.getComputedStats(member.id) : null;
    const defs = typeof window.TenotsuGrowth.getStatDefs === "function" ? window.TenotsuGrowth.getStatDefs() : {};
    return { state, progress, stats, defs };
  }

  function renderStatsMini(member) {
    const info = getGrowthInfo(member);
    if (!info || !info.stats) return `<div class="tenotsu-member-stat-mini muted">Lv/ステータス準備中</div>`;
    const keys = ["proposal", "speed", "stamina", "care", "honesty", "luck"];
    const statItems = keys.map((key) => {
      const label = info.defs && info.defs[key] ? info.defs[key].label : key;
      return `<span><i>${esc(label)}</i><b>${esc(info.stats[key])}</b></span>`;
    }).join("");
    const level = info.state && info.state.level ? info.state.level : 1;
    const exp = info.progress && Number.isFinite(info.progress.required) ? `${info.progress.exp}/${info.progress.required}` : "MAX";
    return `
      <div class="tenotsu-member-stat-mini">
        <div class="tenotsu-member-level">Lv.${esc(level)} <small>EXP ${esc(exp)}</small></div>
        <div class="tenotsu-member-stat-grid">${statItems}</div>
      </div>
    `;
  }

  function renderEquipmentMini(member) {
    const info = getGrowthInfo(member);
    const item = info && info.state && info.state.equipment ? info.state.equipment.personal : null;
    const label = item && item.name ? item.name : "なし";
    return `
      <div class="tenotsu-member-equipment-mini" aria-label="持ち物">
        <span>持ち物</span>
        <b>${esc(label)}</b>
        <small>将来、接客道具や差し入れを持たせる枠です</small>
      </div>
    `;
  }

  function renderMemberDetail(detail, member) {
    if (!detail || !member) return;
    detail.innerHTML = `
      <div class="tenotsu-member-detail-head tenotsu-member-detail-head-v109">
        <img src="${esc(ns.paths.charBase + member.image)}" alt="${esc(member.name)}" class="tenotsu-member-detail-img">
        <div class="tenotsu-member-detail-info-stack">
          <div class="tenotsu-member-identity-box" aria-label="メンバー基本情報">
            <div class="tenotsu-member-detail-name">${esc(member.name)}</div>
            <div class="tenotsu-member-detail-role">${esc(member.role)}</div>
            <div class="tenotsu-member-detail-specialty">得意：${esc(member.specialty)}</div>
          </div>
          <div class="tenotsu-member-detail-comment" aria-label="メンバーコメント">
            <span class="tenotsu-member-comment-label">ひとこと</span>
            <span class="tenotsu-member-comment-text">${esc(member.comment)}</span>
            ${member.introScenario ? `<button type="button" class="tenotsu-member-intro-button" data-member-intro="${esc(member.introScenario)}">自己紹介</button>` : ""}
          </div>
        </div>
        ${typeof ns.renderMemberStorySlots === "function" ? ns.renderMemberStorySlots(member) : ""}
      </div>
      ${renderStatsMini(member)}
      ${renderEquipmentMini(member)}
      <div class="tenotsu-member-detail-note">メイン/キーストーリーは、メンバー個別プロフィール右側の親愛ストーリースロットから解放・再生します。</div>
    `;
    const introBtn = detail.querySelector("[data-member-intro]");
    if (introBtn) {
      introBtn.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const scenario = introBtn.getAttribute("data-member-intro");
        if (scenario && typeof ns.startStory === "function") {
          ns.startStory(scenario, { mode: "members", memberId: member.id });
        }
      });
    }
    if (typeof ns.bindMemberStorySlots === "function") {
      ns.bindMemberStorySlots(detail, member, (nextMember) => renderMemberDetail(detail, nextMember));
    }
  }

  ns.renderMembersPanel = function renderMembersPanel() {
    const members = ns.memberProfiles || [];
    const cards = members.map((m, index) => `
      <button type="button" class="tenotsu-member-card" data-member-index="${index}">
        <span class="tenotsu-member-color" style="background:${esc(m.color)}"></span>
        <span class="tenotsu-member-name">${esc(m.name)}</span>
        <span class="tenotsu-member-role">${esc(m.role)}</span>
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
        renderMemberDetail(detail, m);
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
    if (typeof ns.hideStoryMenuPanel === "function") ns.hideStoryMenuPanel();
    if (typeof ns.hideStoreStatusPanel === "function") ns.hideStoreStatusPanel();
    if (typeof ns.hideSalesPanel === "function") ns.hideSalesPanel();
    ns.renderOfficeMenu();
    ns.renderMembersPanel();
    ns.setText("店長", "メンバーを確認します。個別プロフィールから親愛ストーリーを確認できます。");
  };
})();
