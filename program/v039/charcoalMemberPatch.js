/* v039_292 charcoal member patch */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039 = window.TENOTSU_V039 || {};
  if (ns.__charcoalMemberPatchV039292) return;
  ns.__charcoalMemberPatchV039292 = true;

  const charcoal = {
    name: "チャコール",
    id: "ha",
    legacyId: "ch",
    characterLetter: "n",
    color: "#3f424a",
    role: "Web実験班",
    specialty: "HTML・CSS・UI検証",
    image: "n10301.webp?v=v039_292",
    comment: "店長、Web側の小さな実験は任せて。智恵さんの本線に戻しやすい形で試します。"
  };

  if (ns.state && ns.state.lastSelectedMemberId === charcoal.legacyId) {
    ns.state.lastSelectedMemberId = charcoal.id;
  }

  ns.memberProfiles = Array.isArray(ns.memberProfiles) ? ns.memberProfiles : [];
  const existingIndex = ns.memberProfiles.findIndex((m) => m && (m.id === charcoal.id || m.id === charcoal.legacyId || m.name === charcoal.name));
  if (existingIndex >= 0) {
    ns.memberProfiles[existingIndex] = Object.assign({}, ns.memberProfiles[existingIndex], charcoal);
  } else {
    ns.memberProfiles.push(charcoal);
  }

  ns.officeMembers = Array.isArray(ns.officeMembers) ? ns.officeMembers : [];
  if (!ns.officeMembers.some((m) => Array.isArray(m) && m[0] === charcoal.name)) {
    ns.officeMembers.push([charcoal.name, "n10301.webp", charcoal.comment]);
  }

  ns.nameColorMap = ns.nameColorMap || {};
  ns.nameColorMap["チャコール"] = "#9aa0ad";
})();
