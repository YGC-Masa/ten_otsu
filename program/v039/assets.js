/* v039_05 assets */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;

  ns.paths = {
    officeBg: "images/assets/bgev/bg_office_hidamari.png",
    shopBg: "images/assets/bgev/bg_item_exchange_counter.png",
    fallbackBg: "images/assets/bgev/bg_office_hidamari.png",
    transparentPixel: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
    charBase: "images/assets/char/"
  };

  ns.officeMembers = [
    ["星野 緋奈", "a10501.webp", "店長、今日も一緒にがんばりましょう！"],
    ["速水川 藍", "b10501.webp", "てんちょー、事務所でお待ちしていました。"],
    ["草壁 翠", "c10501.webp", "キミ、今日の予定は確認済みかな？"],
    ["小麦沢 こがね", "d10501.webp", "店長、今日もアゲてこー！"],
    ["春日原 琥珀", "e10501.webp", "旦那、困ったことがあったらオレに任せな！"],
    ["大道寺 真花", "f10501.webp", "店長、本日もよろしくお願いします。"],
    ["氷神 雪乃", "g10501.webp", "貴方様、無理はなさらないでくださいね。"],
    ["双沢 美空", "h10501.webp", "店長、今日も笑顔でいきましょう。"],
    ["双沢 夜空", "i10501.webp", "あんた、今日もちゃんと見てるから。"],
    ["芝桜 桃", "j10501.webp", "店長、ウチ参上！"],
    ["紫藤 彩愛", "k10501.webp", "貴方、こちらで確認くださいませ。"],
    ["餅月 里美", "l10501.webp", "てんちょ～、お茶でも飲んでいきます～？"],
    ["草壁 萌", "m10501.webp", "おにいちゃん、ここにいるよ。"]
  ];

  ns.shuffle = function shuffle(source) {
    const arr = source.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
})();
