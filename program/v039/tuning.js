/* v039_77 tuning entrance / tech lab tsukumo */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;
  if (!ns) return;

  const TUNING_PANELS = {
    office: {
      title: "事務所ギア",
      lead: "事務所まわりの便利装備・検証用端末・連絡網を強化する枠です。",
      body: "将来的には、メンバー管理、出撃準備、経験値や親愛度補助に関わるギアをここへ接続します。"
    },
    shop: {
      title: "店舗ギア",
      lead: "売場設備、棚、POP、レジ周りなど、店舗全体の営業性能を強化する枠です。",
      body: "売上補正、接客効率、ラッシュ時の補助、家電星人金貨の回収効率などへ接続予定です。"
    },
    manager: {
      title: "店長ギア",
      lead: "店長HELPや指示力、サポート性能を伸ばす専用ギア枠です。",
      body: "HELP回数、HELP回復、バトル中の妨害耐性、メンバー支援スキルなどへ接続予定です。"
    }
  };

  function renderTuningPanel(selectedKey) {
    const key = selectedKey || "office";
    const panel = TUNING_PANELS[key] || TUNING_PANELS.office;
    const html = `
      <div class="tenotsu-tuning-card">
        <div class="tenotsu-tuning-kicker">テックラボつくも</div>
        <div class="tenotsu-tuning-title">チューニング</div>
        <p class="tenotsu-tuning-lead">メンバーや店長のギアを調整し、営業・バトル・探索のパワーアップへつなげる入口です。</p>
        <div class="tenotsu-tuning-layout">
          <nav class="tenotsu-tuning-menu" aria-label="店舗メニュー">
            <div class="tenotsu-tuning-menu-title">店舗メニュー</div>
            <button type="button" data-tuning-action="office" class="${key === "office" ? "selected" : ""}">事務所</button>
            <button type="button" data-tuning-action="shop" class="${key === "shop" ? "selected" : ""}">店舗</button>
            <button type="button" data-tuning-action="manager" class="${key === "manager" ? "selected" : ""}">店長</button>
            <button type="button" data-tuning-action="back" class="back">事務所に戻る</button>
          </nav>
          <section class="tenotsu-tuning-detail">
            <small>ギア強化 / 準備中</small>
            <h3>${panel.title}</h3>
            <p>${panel.lead}</p>
            <p>${panel.body}</p>
            <div class="tenotsu-tuning-placeholder">つくも連携・素材消費・強化段階は後続バージョンで接続予定です。</div>
          </section>
        </div>
      </div>
    `;
    ns.showTuningPanel(html);
    const root = (ns.layers || ns.ensureLayers()).tuning;
    root.querySelectorAll("[data-tuning-action]").forEach((btn) => {
      btn.addEventListener("click", () => ns.handleTuningAction(btn.dataset.tuningAction));
    });
  }

  ns.enterTuning = async function enterTuning(options = {}) {
    if (!options.noTransition && typeof ns.transitionTo === "function") {
      return ns.transitionTo(() => ns.enterTuning({ noTransition: true }));
    }
    ns.setMode("tuning");
    ns.ensureLayers();
    if (typeof ns.hideSettingsPanel === "function") ns.hideSettingsPanel();
    if (typeof ns.hideShopPanel === "function") ns.hideShopPanel();
    if (typeof ns.hideMembersPanel === "function") ns.hideMembersPanel();
    if (typeof ns.hideTownPanel === "function") ns.hideTownPanel();
    if (typeof ns.hideSalesPanel === "function") ns.hideSalesPanel();
    if (typeof ns.clearCharacters === "function") ns.clearCharacters();
    const bg = (ns.paths && (ns.paths.shopBg || ns.paths.officeBg)) || "";
    if (bg) {
      if (typeof ns.setBackgroundReady === "function") await ns.setBackgroundReady(bg);
      else if (typeof ns.setBackground === "function") ns.setBackground(bg);
    }
    renderTuningPanel("office");
    ns.setText("店長", "テックラボつくものチューニング入口です。強化したいカテゴリを選びましょう。");
  };

  ns.handleTuningAction = function handleTuningAction(action) {
    if (action === "back") {
      if (typeof ns.hideTuningPanel === "function") ns.hideTuningPanel();
      ns.enterOffice({ speaker: "店長", message: "事務所に戻りました。" });
      return;
    }
    if (!TUNING_PANELS[action]) {
      ns.setText("店長", "未接続のチューニング項目です。");
      return;
    }
    renderTuningPanel(action);
    ns.setText("店長", TUNING_PANELS[action].title + "を確認します。詳細な強化データは後続で接続します。");
  };
})();
