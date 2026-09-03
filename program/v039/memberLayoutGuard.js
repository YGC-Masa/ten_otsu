/* v039_288 member layout guard */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};

  function isMemberLike(el){
    if (!el || !el.className) return false;
    const cls = String(el.className).toLowerCase();
    return cls.includes("member") || cls.includes("character");
  }

  function apply(){
    const text = document.body ? (document.body.innerText || "") : "";
    const hasMemberWords = /メンバー|ステータス|親愛|美空|夜空|緋奈|彩愛|小春|真冬|夏海|チャコール/.test(text);
    let active = false;

    document.querySelectorAll('img[src*="images/assets/rival/story_"], img[src*="images/assets/char/"]').forEach((img)=>{
      // Office standing sprites use the full-height office layout and must not
      // inherit the compact member-card sizing.
      if (img.classList.contains('tenotsu-office-stand') || img.closest('.tenotsu-office-character-layer')) {
        return;
      }

      let p = img.closest('[class*="member" i], [class*="character" i], [data-member-id], [data-character-id]');
      if (p || hasMemberWords) {
        active = true;
        img.classList.add('tenotsu-member-sprite-fit');
        Object.assign(img.style, {
          maxWidth: '100%',
          maxHeight: 'min(58vh, 560px)',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          objectPosition: 'center bottom',
          display: 'block'
        });
        if (p) p.classList.add('tenotsu-member-layout-guard');
      }
    });

    document.body && document.body.classList.toggle('tenotsu-member-screen-active', !!active);
  }

  function schedule(){
    requestAnimationFrame(apply);
    setTimeout(apply, 80);
    setTimeout(apply, 300);
  }

  document.addEventListener('DOMContentLoaded', schedule);
  window.addEventListener('resize', schedule);
  window.addEventListener('orientationchange', schedule);
  window.addEventListener('hashchange', schedule);
  document.addEventListener('click', () => setTimeout(schedule, 0), true);
  const mo = new MutationObserver(schedule);
  mo.observe(document.documentElement, {childList:true, subtree:true});

  ns.applyMemberLayoutGuard = apply;
})();
