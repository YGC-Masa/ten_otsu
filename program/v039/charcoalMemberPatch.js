/* v039_315 Chako member compatibility patch */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};
  if (ns.__chakoMemberPatchV039315) return;
  ns.__chakoMemberPatchV039315 = true;

  const chako = {
    name: "チャコ",
    id: "an",
    color: "#3f424a",
    role: "ひだまりストア",
    specialty: "HTML・CSS・UI検証",
    image: "an_chako/standing/an_charcoal_expression_03_smile.webp",
    comment: "店長、Web側の小さな実験は任せて。智恵さんの本線に戻しやすい形で試します。"
  };

  ns.memberProfiles = Array.isArray(ns.memberProfiles) ? ns.memberProfiles : [];
  const legacyIndex = ns.memberProfiles.findIndex((m) => m && (m.id === "ch" || m.name === "チャコール"));
  const currentIndex = ns.memberProfiles.findIndex((m) => m && (m.id === chako.id || m.name === chako.name));
  if (currentIndex < 0 && legacyIndex >= 0) {
    ns.memberProfiles[legacyIndex] = chako;
  } else if (currentIndex < 0) {
    ns.memberProfiles.push(chako);
  } else if (legacyIndex >= 0 && legacyIndex !== currentIndex) {
    ns.memberProfiles.splice(legacyIndex, 1);
  }

  ns.nameColorMap = ns.nameColorMap || {};
  delete ns.nameColorMap["チャコール"];
  ns.nameColorMap["チャコ"] = "#9aa0ad";
})();
