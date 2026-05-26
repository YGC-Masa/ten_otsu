(function(){"use strict";window.TENOTSU_V039=window.TENOTSU_V039||{};const ns=window.TENOTSU_V039;ns.VERSION = "v039_25_story_menu_and_cg_structure_fix";ns.state={mode:"boot",officeSelection:[],frontCharacter:null,bootedAt:Date.now()};ns.setMode=function(mode){ns.state.mode=mode;document.body.dataset.v039Mode=mode;["boot","office","story","shop","battle","members","settings","town"].forEach(m=>document.body.classList.toggle("v039-mode-"+m,mode===m));};})();

(function(){ window.TENOTSU_V039.BUILD_LABEL = "v039_25"; })();
