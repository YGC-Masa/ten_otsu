/* v039_288 charcoal member patch */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};
  if (ns.__charcoalMemberPatchV039288) return;
  ns.__charcoalMemberPatchV039288 = true;

  const charcoal = {
    name: "チャコール",
    id: "ch",
    color: "#3f424a",
    role: "Web実験班",
    specialty: "HTML・CSS・UI検証",
    image: "charcoal_placeholder.svg",
    comment: "店長、Web側の小さな実験は任せて。智恵さんの本線に戻しやすい形で試します。"
  };

  ns.memberProfiles = Array.isArray(ns.memberProfiles) ? ns.memberProfiles : [];
  if (!ns.memberProfiles.some((m) => m && (m.id === charcoal.id || m.name === charcoal.name))) {
    ns.memberProfiles.push(charcoal);
  }

  ns.nameColorMap = ns.nameColorMap || {};
  ns.nameColorMap["チャコール"] = "#9aa0ad";
})();
