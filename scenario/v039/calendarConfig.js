/* Monthly content endpoints are intentionally unconfigured. */
(function(){
  "use strict";
  window.TENOTSU_CALENDAR_CONFIG = {
    version: 1,
    months: Object.fromEntries(Array.from({ length: 12 }, (_, i) => [
      String(i + 1).padStart(2, "0"),
      { contentBaseUrl: "", officeBackground: "", officeOutfits: {},
        timePeriods: Object.fromEntries(["morning", "day", "night"].map(period => [period, { officeBackground: "", officeOutfits: {} }])) }
    ]))
  };
})();
