(() => {
  const index = window.TENOTSU_RECOLLECTION_STORY_INDEX;
  if (!Array.isArray(index)) return;
  const entry = index.find((item) => item && item.id === "momo_expression_25_test");
  if (!entry) return;
  entry.version = "v039_313";
})();
