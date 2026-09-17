(() => {
  const index = window.TENOTSU_RECOLLECTION_STORY_INDEX;
  if (!Array.isArray(index)) return;

  const entry = {
    id: "misora_sudo_camp_special_20260917",
    title: "美空から須藤さんへ：今度はぜひ、美空も一緒に！🩷",
    type: "normal",
    category: "special",
    season: "other",
    placeId: "hidamari_office",
    placeName: "ひだまりストア事務所",
    characters: ["ah"],
    characterNames: ["双沢 美空"],
    scenario: "scenario/v039/events/misora_sudo_camp_special_20260917.json",
    version: "v039_328",
    unlock: { type: "always" },
    order: 9926,
    summary: "2026年9月17日。店長とランチ中の須藤さんへ、美空が感謝を伝え、次のキャンプに一緒に行きたいとお願いする特別シナリオ。",
    rawTitle: "美空から須藤さんへ：今度はぜひ、美空も一緒に！🩷",
    locationName: "ひだまりストア事務所",
    albumTab: "other",
    encounter: { enabled: false }
  };

  if (!index.some((item) => item && item.id === entry.id)) index.push(entry);
})();
