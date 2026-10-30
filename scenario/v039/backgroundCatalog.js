/* v039_144 若葉中央公園冬背景＋夜空70-80帯リライト用背景互換 */
(function(){
  "use strict";
  window.TENOTSU_BACKGROUND_CATALOG = Object.assign({}, window.TENOTSU_BACKGROUND_CATALOG || {}, {
    hidamari_store_sales_floor: { name: "ひだまりストア店内売り場・正式", path: "images/assets/bg/battle_store_lv1.webp", status: "正式採用" },
    battle_store_lv1: { name: "ひだまりストア店内売り場・正式（互換）", path: "images/assets/bg/battle_store_lv1.webp", status: "正式採用" },
    hidamari_office: { name: "ひだまりストア事務所・正式", path: "images/assets/bgev/bg_office_hidamari.webp", status: "正式採用" },
    office_hidamari: { name: "ひだまりストア事務所・正式（互換）", path: "images/assets/bgev/bg_office_hidamari.webp", status: "正式採用" },
    hiyorizaka_sports_park_budokan_evening: { name: "日和坂総合運動公園・武術演武奉納祭・広場特設演舞場（互換）", path: "images/assets/bg/bg_hiyorizaka_bujutsu_hounousai_stage_day.webp", status: "正式採用" },
    hiyorizaka_sports_park_budokan: { name: "日和坂総合運動公園・武術演武奉納祭・広場特設演舞場（互換）", path: "images/assets/bg/bg_hiyorizaka_bujutsu_hounousai_stage_day.webp", status: "正式採用" },

    hidamari_warehouse: { name: "ひだまりストア倉庫・正式", path: "images/assets/bg/bg_hidamari_warehouse.webp", status: "正式採用" },
    hidamari_store_front_night: { name: "ひだまりストア前・夜（旧暫定/互換）", path: "images/assets/bg/bg_hidamari_store_front_night_open.webp" },

    hidamari_store_front_early_morning: { name: "ひだまりストア外観・早朝", path: "images/assets/bg/bg_hidamari_store_front_early_morning.webp" },
    hidamari_store_front_morning: { name: "ひだまりストア外観・朝", path: "images/assets/bg/bg_hidamari_store_front_morning.webp" },
    hidamari_store_front_day: { name: "ひだまりストア外観・昼", path: "images/assets/bg/bg_hidamari_store_front_day.webp" },
    hidamari_store_front_evening: { name: "ひだまりストア外観・夕方", path: "images/assets/bg/bg_hidamari_store_front_evening.webp" },
    hidamari_store_front_night_open: { name: "ひだまりストア外観・夜", path: "images/assets/bg/bg_hidamari_store_front_night_open.webp" },
    hidamari_store_front_closed: { name: "ひだまりストア外観・閉店後", path: "images/assets/bg/bg_hidamari_store_front_closed.webp" },

    planetarium_exterior_twilight: { name: "星見ヶ丘プラネタリウム・外観", path: "images/assets/bg/bg_planetarium_exterior_twilight.webp" },
    planetarium_lobby: { name: "星見ヶ丘プラネタリウム・ロビー", path: "images/assets/bg/bg_planetarium_lobby.webp" },
    planetarium_hall_before_show: { name: "星見ヶ丘プラネタリウム・投影ホール", path: "images/assets/bg/bg_planetarium_hall_before_show.webp" },
    planetarium_hall_showing: { name: "星見ヶ丘プラネタリウム・開演中ホール", path: "images/assets/bg/bg_planetarium_hall_showing.webp" },

    sugosawa_house_day: { name: "双沢家・昼", path: "images/assets/bg/bg_sugosawa_house_day.webp" },
    sugosawa_house_night: { name: "双沢家・夜", path: "images/assets/bg/bg_sugosawa_house_night.webp" },

    sugosawa_room_day: { name: "双沢姉妹の部屋・昼", path: "images/assets/bg/bg_sugosawa_room_day.webp", spaceId: "SPACE-SUGOSAWA-TWINROOM" },
    sugosawa_room_night_indirect: { name: "双沢姉妹の部屋・夜（間接照明）", path: "images/assets/bg/bg_sugosawa_room_night_indirect.webp", spaceId: "SPACE-SUGOSAWA-TWINROOM" },
    sugosawa_room_night_light_on: { name: "双沢姉妹の部屋・夜（照明ON）", path: "images/assets/bg/bg_sugosawa_room_night_light_on.webp", spaceId: "SPACE-SUGOSAWA-TWINROOM" },
    misora_room_day: { name: "双沢姉妹の部屋・昼（旧:美空の部屋）", path: "images/assets/bg/bg_sugosawa_room_day.webp" },
    misora_room_night: { name: "双沢姉妹の部屋・夜（旧:美空の部屋）", path: "images/assets/bg/bg_sugosawa_room_night_light_on.webp" },
    yozora_room_day: { name: "双沢姉妹の部屋・昼（旧:夜空の部屋）", path: "images/assets/bg/bg_sugosawa_room_day.webp" },
    yozora_room_night: { name: "双沢姉妹の部屋・夜（旧:夜空の部屋）", path: "images/assets/bg/bg_sugosawa_room_night_indirect.webp" },

    minato_event_plaza: { name: "みなと公園・イベント広場", path: "images/assets/bg/bg_minato_event_plaza.webp" },
    minato_event_plaza_festival: { name: "みなと公園・イベント広場・フェス時", path: "images/assets/bg/bg_minato_event_plaza_festival.webp" },
    minato_seaside_fence_day: { name: "みなと公園・海の見える柵", path: "images/assets/bg/bg_minato_seaside_fence_day.webp" },
    minato_park_event_plaza_day: { name: "みなと公園・イベント広場（旧暫定/互換）", path: "images/assets/bg/bg_minato_event_plaza.webp" },

    shiomi_beach_early_morning: { name: "塩見浜・早朝", path: "images/assets/bg/bg_shiomi_beach_early_morning.webp" },
    shiomi_beach_morning: { name: "塩見浜・朝", path: "images/assets/bg/bg_shiomi_beach_morning.webp" },
    shiomi_beach_day: { name: "塩見浜・昼", path: "images/assets/bg/bg_shiomi_beach_day.webp" },
    shiomi_beach_evening: { name: "塩見浜・夕方", path: "images/assets/bg/bg_shiomi_beach_evening.webp" },
    shiomi_beach_night: { name: "塩見浜・夜", path: "images/assets/bg/bg_shiomi_beach_night.webp" },
    shiomi_beach_midnight: { name: "塩見浜・深夜", path: "images/assets/bg/bg_shiomi_beach_midnight.webp" },

    hiyorizaka_station_midnight: { name: "日和坂駅・深夜", path: "images/assets/bg/bg_hiyorizaka_station_midnight.webp" },
    hiyorizaka_station_early_morning: { name: "日和坂駅・早朝", path: "images/assets/bg/bg_hiyorizaka_station_early_morning.webp" },
    hiyorizaka_station_day: { name: "日和坂駅・昼", path: "images/assets/bg/bg_hiyorizaka_station_day.webp" },
    hiyorizaka_station_morning: { name: "日和坂駅・朝", path: "images/assets/bg/bg_hiyorizaka_station_morning.webp" },
    hiyorizaka_station_evening: { name: "日和坂駅・夕方", path: "images/assets/bg/bg_hiyorizaka_station_evening.webp" },
    hiyorizaka_station_night: { name: "日和坂駅・夜", path: "images/assets/bg/bg_hiyorizaka_station_night.webp" }
,

    bookcafe_antostella_exterior_night: { name: "BOOKCAFEアントステラ・外観・夜", path: "images/assets/bg/bg_bookcafe_antostella_exterior_night.webp" },
    bookcafe_antostella_1f_night: { name: "BOOKCAFEアントステラ・1階・夜", path: "images/assets/bg/bg_bookcafe_antostella_1f_night.webp" },
    bookcafe_antostella_2f_night: { name: "BOOKCAFEアントステラ・2階・夜", path: "images/assets/bg/bg_bookcafe_antostella_2f_night.webp" },
    night_book_cafe_entrance: { name: "静かな夜のブックカフェ・入口（アントステラ外観）", path: "images/assets/bg/bg_bookcafe_antostella_exterior_night.webp" },
    night_book_cafe_interior: { name: "静かな夜のブックカフェ・店内（アントステラ1階）", path: "images/assets/bg/bg_bookcafe_antostella_1f_night.webp" },
    night_book_cafe_2f: { name: "静かな夜のブックカフェ・2階席", path: "images/assets/bg/bg_bookcafe_antostella_2f_night.webp" },

    hashiro_lake_night: { name: "羽白湖・夜", path: "images/assets/bg/bg_hashiro_lake_night.webp" },
    hashiro_lake_day: { name: "羽白湖・昼", path: "images/assets/bg/bg_hashiro_lake_day.webp" },
    hashiro_lake_evening: { name: "羽白湖・夕方", path: "images/assets/bg/bg_hashiro_lake_evening.webp" },
    hashiro_lake_morning: { name: "羽白湖・朝", path: "images/assets/bg/bg_hashiro_lake_morning.webp" },
    hashiro_lake_early_morning: { name: "羽白湖・早朝", path: "images/assets/bg/bg_hashiro_lake_early_morning.webp" },
    hashiro_lake_bus_stop_night: { name: "羽白湖・バス停前・夜（互換）", path: "images/assets/bg/bg_hashiro_lake_night.webp" },
    hashiro_lake_path_night: { name: "羽白湖・湖畔遊歩道・夜（互換）", path: "images/assets/bg/bg_hashiro_lake_night.webp" },
    hashiro_lake_stargazing_night: { name: "羽白湖・星空観察スポット・夜（互換）", path: "images/assets/bg/bg_hashiro_lake_night.webp" }
,

    hiyorizaka_bujutsu_hounousai_stage_day: { name: "日和坂市 武術演武奉納祭・広場特設演舞場", path: "images/assets/bg/bg_hiyorizaka_bujutsu_hounousai_stage_day.webp", status: "正式採用" },
    hiyorizaka_sports_park_kyudojo_day: { name: "日和坂総合運動公園・弓道場・昼", path: "images/assets/bg/bg_hiyorizaka_sports_park_kyudojo_day.webp", status: "正式採用" },
    hiyorizaka_sports_park_midnight: { name: "日和坂総合運動公園・深夜", path: "images/assets/bg/bg_hiyorizaka_sports_park_midnight.webp", status: "正式採用" },
    hiyorizaka_sports_park_night: { name: "日和坂総合運動公園・夜（深夜背景互換）", path: "images/assets/bg/bg_hiyorizaka_sports_park_midnight.webp", status: "正式採用・互換" },
    hiyorizaka_sports_park_early_morning: { name: "日和坂総合運動公園・早朝", path: "images/assets/bg/bg_hiyorizaka_sports_park_early_morning.webp", status: "正式採用" },
    hiyorizaka_sports_park_morning: { name: "日和坂総合運動公園・朝", path: "images/assets/bg/bg_hiyorizaka_sports_park_morning.webp", status: "正式採用" },
    hiyorizaka_sports_park_day: { name: "日和坂総合運動公園・昼", path: "images/assets/bg/bg_hiyorizaka_sports_park_day.webp", status: "正式採用" },
    hiyorizaka_sports_park_evening: { name: "日和坂総合運動公園・夕方", path: "images/assets/bg/bg_hiyorizaka_sports_park_evening.webp", status: "正式採用" }
,

    yunagi_observatory_night: { name: "夕凪展望台・夜", path: "images/assets/bg/bg_yunagi_observatory_night.webp", status: "正式採用" },
    yunagi_observatory_morning: { name: "夕凪展望台・朝", path: "images/assets/bg/bg_yunagi_observatory_morning.webp", status: "正式採用" },
    yunagi_observatory_early_morning: { name: "夕凪展望台・早朝", path: "images/assets/bg/bg_yunagi_observatory_early_morning.webp", status: "正式採用" },
    yunagi_observatory_day: { name: "夕凪展望台・昼", path: "images/assets/bg/bg_yunagi_observatory_day.webp", status: "正式採用" },
    yunagi_observatory_evening: { name: "夕凪展望台・夕方", path: "images/assets/bg/bg_yunagi_observatory_evening.webp", status: "正式採用" },
    yunagi_observatory: { name: "夕凪展望台・夜（互換）", path: "images/assets/bg/bg_yunagi_observatory_night.webp", status: "正式採用・互換" }
,

    manager_mansion_road_early_morning: { name: "店長マンション前の帰り道・早朝", path: "images/assets/bg/bg_manager_mansion_road_early_morning.webp", location: "店長マンション前 / メゾン・ド・エトワール前", time: "early_morning", status: "正式採用" },
    manager_mansion_road_morning: { name: "店長マンション前の帰り道・朝", path: "images/assets/bg/bg_manager_mansion_road_morning.webp", location: "店長マンション前 / メゾン・ド・エトワール前", time: "morning", status: "正式採用" },
    manager_mansion_road_day: { name: "店長マンション前の帰り道・昼", path: "images/assets/bg/bg_manager_mansion_road_day.webp", location: "店長マンション前 / メゾン・ド・エトワール前", time: "day", status: "正式採用" },
    manager_mansion_road_evening: { name: "店長マンション前の帰り道・夕方", path: "images/assets/bg/bg_manager_mansion_road_evening.webp", location: "店長マンション前 / メゾン・ド・エトワール前", time: "evening", status: "正式採用" },
    manager_mansion_road_night: { name: "店長マンション前の帰り道・夜", path: "images/assets/bg/bg_manager_mansion_road_night.webp", location: "店長マンション前 / メゾン・ド・エトワール前", time: "night", status: "正式採用" },
    manager_mansion_road: { name: "店長マンション前の帰り道（メゾン・ド・エトワール前）", path: "images/assets/bg/bg_manager_mansion_road_night.webp", location: "店長マンション前 / メゾン・ド・エトワール前", time: "default", status: "正式採用・互換" }
    ,minato_park_night: { name: "みなと公園・夜", path: "images/assets/bg/bg_minato_park_night.webp", location: "みなと公園", time: "night", status: "正式採用" }
    ,minato_park_evening: { name: "みなと公園・夕方", path: "images/assets/bg/bg_minato_park_evening.webp", location: "みなと公園", time: "evening", status: "正式採用" }
    ,minato_park_morning: { name: "みなと公園・朝", path: "images/assets/bg/bg_minato_park_morning.webp", location: "みなと公園", time: "morning", status: "正式採用" }
    ,minato_park: { name: "みなと公園（標準・夜）", path: "images/assets/bg/bg_minato_park_night.webp", location: "みなと公園", time: "default", status: "正式採用・互換" }
    ,hiyorizaka_seaside_road_night: { name: "海沿いへ向かう道・夜（みなと公園互換）", path: "images/assets/bg/bg_minato_park_night.webp", location: "みなと公園", time: "night", status: "正式採用・互換" }
    ,hidamari_store_closed_night: { name: "ひだまりストア閉店後（店内売り場互換）", path: "images/assets/bg/battle_store_lv1.webp", status: "正式採用・互換" }
    ,hidamari_store_backyard_morning: { name: "ひだまりストア・翌日朝／バックヤード（倉庫互換）", path: "images/assets/bg/bg_hidamari_warehouse.webp", status: "正式採用・互換" }
    ,hidamari_store_breakroom_day: { name: "ひだまりストア・休憩室（店内売り場互換）", path: "images/assets/bg/battle_store_lv1.webp", status: "正式採用・互換" }
    ,wakaba_central_park_night: { name: "若葉中央公園・夜（みなと公園夜互換）", path: "images/assets/bg/bg_minato_park_night.webp", status: "正式採用・互換" }



  });
})();


/* v039_144 若葉中央公園・冬（雪なし）正式背景 */
(function(){
  "use strict";
  window.TENOTSU_BACKGROUND_CATALOG = Object.assign({}, window.TENOTSU_BACKGROUND_CATALOG || {}, {
    wakaba_central_park_winter_night: { name: "若葉中央公園・冬・夜（雪なし）", path: "images/assets/bg/bg_wakaba_central_park_winter_night.webp", location: "若葉中央公園", time: "night", season: "winter", snow: false, status: "正式採用" },
    wakaba_central_park_winter_day: { name: "若葉中央公園・冬・昼（雪なし）", path: "images/assets/bg/bg_wakaba_central_park_winter_day.webp", location: "若葉中央公園", time: "day", season: "winter", snow: false, status: "正式採用" },
    wakaba_central_park_winter_evening: { name: "若葉中央公園・冬・夕方（雪なし）", path: "images/assets/bg/bg_wakaba_central_park_winter_evening.webp", location: "若葉中央公園", time: "evening", season: "winter", snow: false, status: "正式採用" },
    wakaba_central_park_winter_morning: { name: "若葉中央公園・冬・朝（雪なし）", path: "images/assets/bg/bg_wakaba_central_park_winter_morning.webp", location: "若葉中央公園", time: "morning", season: "winter", snow: false, status: "正式採用" },
    wakaba_central_park_winter: { name: "若葉中央公園・冬（雪なし）", path: "images/assets/bg/bg_wakaba_central_park_winter_day.webp", location: "若葉中央公園", time: "default", season: "winter", snow: false, status: "正式採用・互換名" }
  });
})();


/* v039_146 夜空80-100帯用 背景互換 */
(function(){
  "use strict";
  window.TENOTSU_BACKGROUND_CATALOG = Object.assign({}, window.TENOTSU_BACKGROUND_CATALOG || {}, {
    hajiro_lake_night: { name: "羽白湖・夜（表記ゆれ互換）", path: "images/assets/bg/bg_hashiro_lake_night.webp", status: "正式採用・互換" },
    road_to_hajiro_lake_night: { name: "羽白湖へ向かう道・夜（羽白湖夜互換）", path: "images/assets/bg/bg_hashiro_lake_night.webp", status: "正式採用・互換" },
    antstella_bookcafe_night: { name: "アントステラ・夜のブックカフェ（2階互換）", path: "images/assets/bg/bg_bookcafe_antostella_2f_night.webp", status: "正式採用・互換" },
    harumachi_flower_field_day: { name: "春待ち花畑・昼", path: "images/assets/bg/bg_harumachi_flower_field_day.webp", status: "未同梱・将来正式背景" }
  });
})();


/* v039_147 春待ち花畑正式背景 */
(function(){
  "use strict";
  window.TENOTSU_BACKGROUND_CATALOG = Object.assign({}, window.TENOTSU_BACKGROUND_CATALOG || {}, {
    harumachi_flower_field_day: { name: "春待ち花畑・昼", path: "images/assets/bg/bg_harumachi_flower_field_day.webp", location: "春待ち花畑", time: "day", season: "spring", status: "正式採用" },
    haru_machi_flower_field_day: { name: "春待ち花畑・昼（表記ゆれ互換）", path: "images/assets/bg/bg_harumachi_flower_field_day.webp", location: "春待ち花畑", time: "day", season: "spring", status: "正式採用・互換" },
    spring_flower_field_day: { name: "春の花畑・昼（互換）", path: "images/assets/bg/bg_harumachi_flower_field_day.webp", location: "春待ち花畑", time: "day", season: "spring", status: "正式採用・互換" }
  });
})();


/* v039_152 ひだまりストア店内売り場・夜背景追加 */
(function(){
  "use strict";
  window.TENOTSU_BACKGROUND_CATALOG = Object.assign({}, window.TENOTSU_BACKGROUND_CATALOG || {}, {
    hidamari_store_salesfloor_night: { name: "ひだまりストア店内売り場・夜", path: "images/assets/bg/bg_hidamari_store_salesfloor_night.webp", status: "正式採用" },
    hidamari_store_closed_night: { name: "ひだまりストア閉店後・店内売り場", path: "images/assets/bg/bg_hidamari_store_salesfloor_night.webp", status: "正式採用・互換" }
  });
})();


/* v039_158 AST salon backgrounds */
(function(){
  "use strict";
  window.TENOTSU_BACKGROUND_CATALOG = Object.assign({}, window.TENOTSU_BACKGROUND_CATALOG || {}, {
    ast_salon_exterior_day: { name: "エステサロン・アスト・外観・昼", path: "images/assets/bg/bg_ast_salon_exterior_day.webp", location: "エステサロン・アスト", time: "day", status: "正式採用" },
    ast_herbal_tea_lounge_day: { name: "エステサロン・アスト・ハーブティーラウンジ・昼", path: "images/assets/bg/bg_ast_herbal_tea_lounge_day.webp", location: "エステサロン・アスト／ハーブティーラウンジ", time: "day", status: "正式採用" },
    ast_treatment_room_day: { name: "エステサロン・アスト・個室施術室・昼", path: "images/assets/bg/bg_ast_treatment_room_day.webp", location: "エステサロン・アスト／個室施術室", time: "day", status: "正式採用" }
  });
})();


/* v039_159 Existing building/background assets catalog registration */
(function(){
  "use strict";
  window.TENOTSU_BACKGROUND_CATALOG = Object.assign({}, window.TENOTSU_BACKGROUND_CATALOG || {}, {
    ayame_estate_gate_day: { name: "紫藤家・屋敷門・昼", path: "images/assets/bg/bg_ayame93_estate_gate_day.webp", location: "紫藤家", time: "day", status: "正式採用" },
    ayame_estate_house_day: { name: "紫藤家・屋敷外観・昼", path: "images/assets/bg/bg_ayame93_estate_house_day.webp", location: "紫藤家", time: "day", status: "正式採用" },
    ayame_estate_corridor_day: { name: "紫藤家・屋敷廊下・昼", path: "images/assets/bg/bg_ayame93_estate_corridor_day.webp", location: "紫藤家", time: "day", status: "正式採用" },
    ayame_estate_corridor_night: { name: "紫藤家・屋敷廊下・夜", path: "images/assets/bg/bg_ayame98_estate_corridor_night.webp", location: "紫藤家", time: "night", status: "正式採用" },
    ayame_father_room_dusk: { name: "紫藤家・父親の部屋・夕暮れ", path: "images/assets/bg/bg_ayame98_father_room_dusk.webp", location: "紫藤家", time: "dusk", status: "正式採用" },
    ayame_guestroom_night: { name: "紫藤家・客間・夜", path: "images/assets/bg/bg_ayame98_guestroom_night.webp", location: "紫藤家", time: "night", status: "正式採用" },
    ayame_station_exterior_day: { name: "紫藤家最寄り駅・外観・昼", path: "images/assets/bg/bg_ayame93_station_exterior_day.webp", location: "紫藤家最寄り駅", time: "day", status: "正式採用" },
    hidamari_store_front_winter_day: { name: "ひだまりストア外観・冬・昼", path: "images/assets/bg/bg_hidamari_store_front_winter_day.webp", location: "ひだまりストア", time: "day", season: "winter", snow: false, status: "正式採用" },
    hidamari_store_front_winter_day_snow: { name: "ひだまりストア外観・冬・雪", path: "images/assets/bg/bg_hidamari_store_front_winter_day_snow.webp", location: "ひだまりストア", time: "day", season: "winter", snow: true, status: "正式採用" },
    hidamari_store_salesfloor_day: { name: "ひだまりストア店内売り場・昼", path: "images/assets/bg/bg_hidamari_store_salesfloor_day.webp", location: "ひだまりストア", time: "day", status: "正式採用" },
    homecenter_outdoor_corner_day: { name: "ホームセンター・屋外コーナー・昼", path: "images/assets/bg/bg_homecenter_outdoor_corner_day.webp", location: "ホームセンター", time: "day", status: "正式採用" },
    lumiere_cafe_interior_day: { name: "ルミエール・カフェ店内・昼", path: "images/assets/bg/bg_lumiere_cafe_interior_day.webp", location: "ルミエール", time: "day", status: "正式採用" },
    lumiere_pension_balcony_day: { name: "ルミエール・ペンションバルコニー・昼", path: "images/assets/bg/bg_lumiere_pension_balcony_day.webp", location: "ルミエール", time: "day", status: "正式採用" },
    lumiere_pension_room_day: { name: "ルミエール・ペンション客室・昼", path: "images/assets/bg/bg_lumiere_pension_room_day.webp", location: "ルミエール", time: "day", status: "正式採用" },
    misora_room_day: { name: "美空の部屋・昼", path: "images/assets/bg/bg_misora_room_day.webp", location: "双沢家", time: "day", status: "正式採用・互換" },
    misora_room_night: { name: "美空の部屋・夜", path: "images/assets/bg/bg_misora_room_night.webp", location: "双沢家", time: "night", status: "正式採用・互換" },
    takadai_shrine_courtyard_day: { name: "わだつみ神社・境内・昼", path: "images/assets/bg/bg_takadai_shrine_courtyard_day.webp", location: "わだつみ神社", time: "day", status: "正式採用" },
    takadai_shrine_courtyard_spring: { name: "わだつみ神社・境内・春", path: "images/assets/bg/bg_takadai_shrine_courtyard_spring.webp", location: "わだつみ神社", season: "spring", status: "正式採用" },
    takadai_shrine_overlook_autumn: { name: "わだつみ神社・展望所・秋", path: "images/assets/bg/bg_takadai_shrine_overlook_autumn.webp", location: "わだつみ神社", season: "autumn", status: "正式採用" },
    takadai_shrine_overlook_sunset: { name: "わだつみ神社・展望所・夕焼け", path: "images/assets/bg/bg_takadai_shrine_overlook_sunset.webp", location: "わだつみ神社", time: "sunset", status: "正式採用" },
    takadai_shrine_steps_day: { name: "わだつみ神社・参道階段・昼", path: "images/assets/bg/bg_takadai_shrine_steps_day.webp", location: "わだつみ神社", time: "day", status: "正式採用" },
    yozora_room_day: { name: "夜空の部屋・昼", path: "images/assets/bg/bg_yozora_room_day.webp", location: "双沢家", time: "day", status: "正式採用・互換" },
    yozora_room_night: { name: "夜空の部屋・夜", path: "images/assets/bg/bg_yozora_room_night.webp", location: "双沢家", time: "night", status: "正式採用・互換" }
  });
})();

/* Delta: LM-054 / LM-056 / LM-057 first edition */
(function(){
  "use strict";
  window.TENOTSU_BACKGROUND_CATALOG = Object.assign({}, window.TENOTSU_BACKGROUND_CATALOG || {}, {
    aoba_campfield_evening: { name: "青葉キャンプフィールド・夕方", path: "images/assets/bg/bg_aoba_campfield_evening.webp", time: "evening", status: "初版完成" },
    hiyorizaka_bridal_terrace_day: { name: "日和坂ブライダルテラス・昼", path: "images/assets/bg/bg_hiyorizaka_bridal_terrace_day.webp", time: "day", status: "初版完成" },
    yoiyami_koryori_yokocho_evening: { name: "宵闇小料理横丁・夕方", path: "images/assets/bg/bg_yoiyami_koryori_yokocho_evening.webp", time: "evening", status: "初版完成" }
  });
})();

/* Delta: five first-edition landmark backgrounds, 2026-10-30 */
(function(){
  "use strict";
  window.TENOTSU_BACKGROUND_CATALOG = Object.assign({}, window.TENOTSU_BACKGROUND_CATALOG || {}, {
    kirishima_onsen_lounge: {"name":"霧島式サウナ＆温浴研究所 湯上がりラウンジ","path":"images/assets/bg/bg_kirishima_onsen_lounge.webp","location":"霧島式サウナ＆温浴研究所 湯上がりラウンジ","spaceId":"SPACE-LM051-LOUNGE","status":"初版完成"},
    logica_boardgame_cafe_interior: {"name":"日和坂ボードゲームカフェ ロジカ 店内","path":"images/assets/bg/bg_logica_boardgame_cafe_interior.webp","location":"日和坂ボードゲームカフェ ロジカ 店内","spaceId":"SPACE-LM052-CAFE","status":"初版完成"},
    hiyorizaka_handball_court_interior: {"name":"日和坂ハンドボールコート 内観","path":"images/assets/bg/bg_hiyorizaka_handball_court_interior.webp","location":"日和坂ハンドボールコート 内観","spaceId":"SPACE-LM058-HANDBALL-COURT","status":"初版完成"},
    hiyorizaka_game_arena_interior: {"name":"日和坂ゲームアリーナ 内観","path":"images/assets/bg/bg_hiyorizaka_game_arena_interior.webp","location":"日和坂ゲームアリーナ 内観","spaceId":"SPACE-LM050-GAME-ARENA","status":"初版完成"},
    hanamori_shibazakura_garden_spring_day: {"name":"芝桜の丘 花守ガーデン 春昼","path":"images/assets/bg/bg_hanamori_shibazakura_garden_spring_day.webp","location":"芝桜の丘 花守ガーデン 春昼","spaceId":"SPACE-LM038-GARDEN","status":"初版完成","time":"day","season":"spring"}
  });
})();

/* Delta: LM-031 / 033 / 040 / 041 / 044 first editions */
(function(){
  "use strict";
  window.TENOTSU_BACKGROUND_CATALOG = Object.assign({}, window.TENOTSU_BACKGROUND_CATALOG || {}, {
    tsukumozaka_retro_electric_alley_day: {"name":"九十九坂レトロ電器小路 昼","path":"images/assets/bg/bg_tsukumozaka_retro_electric_alley_day.webp","location":"九十九坂レトロ電器小路 昼","spaceId":"SPACE-LM031-STREET","time":"day","status":"初版完成"},
    hiyorizaka_digital_workshop_day: {"name":"日和坂デジタル工作室 昼","path":"images/assets/bg/bg_hiyorizaka_digital_workshop_day.webp","location":"日和坂デジタル工作室 昼","spaceId":"SPACE-LM033-WORKSHOP","time":"day","status":"初版完成"},
    hiyorizaka_aquapool_summer_day: {"name":"日和坂アクアプール 夏昼","path":"images/assets/bg/bg_hiyorizaka_aquapool_summer_day.webp","location":"日和坂アクアプール 夏昼","spaceId":"SPACE-LM040-AQUAPOOL","time":"day","season":"summer","status":"初版完成"},
    momijidani_ropeway_cabin_autumn_day: {"name":"紅葉谷ロープウェイ ゴンドラ 秋昼","path":"images/assets/bg/bg_momijidani_ropeway_cabin_autumn_day.webp","location":"紅葉谷ロープウェイ ゴンドラ 秋昼","spaceId":"SPACE-LM041-CABIN","time":"day","season":"autumn","status":"初版完成"},
    hashiro_plateau_snowfield_winter_evening: {"name":"羽白高原 雪原 冬夕方","path":"images/assets/bg/bg_hashiro_plateau_snowfield_winter_evening.webp","location":"羽白高原 雪原 冬夕方","spaceId":"SPACE-LM044-SNOWFIELD","time":"evening","season":"winter","status":"初版完成"}
  });
})();

/* Delta: LM-014 / 015 / 018 / 019 / 021 first editions */
(function(){
  "use strict";
  window.TENOTSU_BACKGROUND_CATALOG = Object.assign({}, window.TENOTSU_BACKGROUND_CATALOG || {}, {
    hidamarizaka_bakery_street_morning: {"name":"ひだまり坂ベーカリー街 朝","path":"images/assets/bg/bg_hidamarizaka_bakery_street_morning.webp","location":"ひだまり坂ベーカリー街 朝","spaceId":"SPACE-LM014-STREET","time":"morning","status":"初版完成"},
    shiokaze_cycling_road_morning: {"name":"潮風サイクリングロード 朝","path":"images/assets/bg/bg_shiokaze_cycling_road_morning.webp","location":"潮風サイクリングロード 朝","spaceId":"SPACE-LM015-ROUTE","time":"morning","status":"初版完成"},
    hiyorizaka_civic_hall_auditorium: {"name":"日和坂市民ホール メインホール","path":"images/assets/bg/bg_hiyorizaka_civic_hall_auditorium.webp","location":"日和坂市民ホール メインホール","spaceId":"SPACE-LM018-AUDITORIUM","status":"初版完成"},
    shiomi_beach_live_deck_evening: {"name":"潮見浜ライブデッキ 夕方","path":"images/assets/bg/bg_shiomi_beach_live_deck_evening.webp","location":"潮見浜ライブデッキ 夕方","spaceId":"SPACE-LM019-LIVEDECK","time":"evening","status":"初版完成"},
    hiyorizaka_arena_interior: {"name":"日和坂アリーナ メインアリーナ","path":"images/assets/bg/bg_hiyorizaka_arena_interior.webp","location":"日和坂アリーナ メインアリーナ","spaceId":"SPACE-LM021-ARENA","status":"初版完成"}
  });
})();

/* Delta: LM-006 / 007 / 026 / 041 / 043 first editions */
(function(){
  "use strict";
  window.TENOTSU_BACKGROUND_CATALOG = Object.assign({}, window.TENOTSU_BACKGROUND_CATALOG || {}, {
    lm006_gate_after_school: {"name":"日和坂学園 校門 放課後","path":"images/assets/bg/bg_lm006_gate_after_school.webp","location":"日和坂学園 校門 放課後","spaceId":"SPACE-LM006-GATE","time":"afternoon","status":"初版完成"},
    hiyorizaka_seaglass_street_day: {"name":"日和坂シーグラス通り 昼","path":"images/assets/bg/bg_hiyorizaka_seaglass_street_day.webp","location":"日和坂シーグラス通り 昼","spaceId":"SPACE-LM007-STREET","time":"day","status":"初版完成"},
    hiyorizaka_bookcafe_street_day: {"name":"日和坂ブックカフェ通り 昼","path":"images/assets/bg/bg_hiyorizaka_bookcafe_street_day.webp","location":"日和坂ブックカフェ通り 昼","spaceId":"SPACE-LM026-STREET","time":"day","status":"初版完成"},
    momijidani_ropeway_station_autumn_day: {"name":"紅葉谷ロープウェイ 乗降駅 秋昼","path":"images/assets/bg/bg_momijidani_ropeway_station_autumn_day.webp","location":"紅葉谷ロープウェイ 乗降駅 秋昼","spaceId":"SPACE-LM041-STATION","time":"day","season":"autumn","status":"初版完成"},
    shirane_snowpark_slope_winter_day: {"name":"白嶺スノーパーク ゲレンデ 冬昼","path":"images/assets/bg/bg_shirane_snowpark_slope_winter_day.webp","location":"白嶺スノーパーク ゲレンデ 冬昼","spaceId":"SPACE-LM043-SLOPE","time":"day","season":"winter","status":"初版完成"}
  });
})();

/* Delta: foyer, two event plazas, radio terrace and lodge */
(function(){
  "use strict";
  window.TENOTSU_BACKGROUND_CATALOG = Object.assign({}, window.TENOTSU_BACKGROUND_CATALOG || {}, {
    hiyorizaka_civic_hall_foyer: {"name":"日和坂市民ホール ホワイエ","path":"images/assets/bg/bg_hiyorizaka_civic_hall_foyer.webp","location":"日和坂市民ホール ホワイエ","spaceId":"SPACE-LM018-FOYER","status":"初版完成"},
    shiomi_dome_event_plaza_day: {"name":"潮見ドーム前イベント広場 昼","path":"images/assets/bg/bg_shiomi_dome_event_plaza_day.webp","location":"潮見ドーム前イベント広場 昼","spaceId":"SPACE-LM027-EVENTPLAZA","time":"day","status":"初版完成"},
    hashiro_radio_observation_terrace_evening: {"name":"羽白湖 電波観測テラス 夕方","path":"images/assets/bg/bg_hashiro_radio_observation_terrace_evening.webp","location":"羽白湖 電波観測テラス 夕方","spaceId":"SPACE-LM032-TERRACE","time":"evening","status":"初版完成"},
    shirane_snowpark_lodge_winter_day: {"name":"白嶺スノーパーク ロッジ 冬昼","path":"images/assets/bg/bg_shirane_snowpark_lodge_winter_day.webp","location":"白嶺スノーパーク ロッジ 冬昼","spaceId":"SPACE-LM043-LODGE","time":"day","season":"winter","status":"初版完成"},
    biribiri_station_event_plaza_day: {"name":"ビリビリ電機 駅前イベント広場 昼","path":"images/assets/bg/bg_biribiri_station_event_plaza_day.webp","location":"ビリビリ電機 駅前イベント広場 昼","spaceId":"SPACE-LM049-EVENTPLAZA","time":"day","status":"初版完成"}
  });
})();

/* Delta: Marinpia five additional spaces */
(function(){
  "use strict";
  window.TENOTSU_BACKGROUND_CATALOG = Object.assign({}, window.TENOTSU_BACKGROUND_CATALOG || {}, {
    marinpia_learning_lab_day: {"name":"マリンピア 潮だまり・海の学習ラボ 昼","path":"images/assets/bg/bg_marinpia_learning_lab_day.webp","location":"マリンピア 潮だまり・海の学習ラボ 昼","spaceId":"SPACE-LM010-LAB","time":"day","status":"初版完成"},
    marinpia_penguin_seabird_area_day: {"name":"マリンピア ペンギン・海鳥エリア 昼","path":"images/assets/bg/bg_marinpia_penguin_seabird_area_day.webp","location":"マリンピア ペンギン・海鳥エリア 昼","spaceId":"SPACE-LM010-PENGUIN","time":"day","status":"初版完成"},
    marinpia_ocean_cafe_day: {"name":"マリンピア OCEAN CAFE 昼","path":"images/assets/bg/bg_marinpia_ocean_cafe_day.webp","location":"マリンピア OCEAN CAFE 昼","spaceId":"SPACE-LM010-OCEAN-CAFE","time":"day","status":"初版完成"},
    marinpia_rooftop_terrace_evening: {"name":"マリンピア 屋上展望テラス 夕方","path":"images/assets/bg/bg_marinpia_rooftop_terrace_evening.webp","location":"マリンピア 屋上展望テラス 夕方","spaceId":"SPACE-LM010-ROOFTOP","time":"evening","status":"初版完成"},
    marinpia_backyard_tour_passage_day: {"name":"マリンピア バックヤード見学通路 昼","path":"images/assets/bg/bg_marinpia_backyard_tour_passage_day.webp","location":"マリンピア バックヤード見学通路 昼","spaceId":"SPACE-LM010-BACKYARD","time":"day","status":"初版完成"}
  });
})();

/* Delta: Marinpia dolphin, deepsea, restaurant, shop and deck */
(function(){
  "use strict";
  window.TENOTSU_BACKGROUND_CATALOG = Object.assign({}, window.TENOTSU_BACKGROUND_CATALOG || {}, {
    marinpia_dolphin_pool_day: {"name":"マリンピア イルカショープール 昼","path":"images/assets/bg/bg_marinpia_dolphin_pool_day.webp","location":"マリンピア イルカショープール 昼","spaceId":"SPACE-LM010-DOLPHIN","time":"day","status":"初版完成"},
    marinpia_deepsea_gallery: {"name":"マリンピア 深海・発光生物エリア","path":"images/assets/bg/bg_marinpia_deepsea_gallery.webp","location":"マリンピア 深海・発光生物エリア","spaceId":"SPACE-LM010-DEEPSEA","status":"初版完成"},
    marinpia_aquarium_restaurant_day: {"name":"マリンピア 水槽レストラン 昼","path":"images/assets/bg/bg_marinpia_aquarium_restaurant_day.webp","location":"マリンピア 水槽レストラン 昼","spaceId":"SPACE-LM010-RESTAURANT","time":"day","status":"初版完成"},
    marinpia_gift_shop_day: {"name":"マリンピアショップ 昼","path":"images/assets/bg/bg_marinpia_gift_shop_day.webp","location":"マリンピアショップ 昼","spaceId":"SPACE-LM010-SHOP","time":"day","status":"初版完成"},
    marinpia_seaside_deck_day: {"name":"マリンピア 海辺デッキ 昼","path":"images/assets/bg/bg_marinpia_seaside_deck_day.webp","location":"マリンピア 海辺デッキ 昼","spaceId":"SPACE-LM010-SEASIDE-DECK","time":"day","status":"初版完成"}
  });
})();

/* Delta: Marinpia entry and time variants */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  marinpia_entrance_day: {"name":"マリンピア 入口 昼","path":"images/assets/bg/bg_marinpia_entrance_day.webp","spaceId":"SPACE-LM010-ENTRANCE","time":"day","status":"初版完成"},
  marinpia_entrance_night: {"name":"マリンピア 入口 夜","path":"images/assets/bg/bg_marinpia_entrance_night.webp","spaceId":"SPACE-LM010-ENTRANCE","time":"night","status":"初版完成"},
  marinpia_seasonal_gallery_base: {"name":"マリンピア 企画展示室 建築基準","path":"images/assets/bg/bg_marinpia_seasonal_gallery_base.webp","spaceId":"SPACE-LM010-SEASONAL","status":"初版完成"},
  marinpia_rooftop_terrace_day: {"name":"マリンピア 屋上展望テラス 昼","path":"images/assets/bg/bg_marinpia_rooftop_terrace_day.webp","spaceId":"SPACE-LM010-ROOFTOP","time":"day","status":"初版完成"},
  marinpia_seaside_deck_evening: {"name":"マリンピア 海辺デッキ 夕方","path":"images/assets/bg/bg_marinpia_seaside_deck_evening.webp","spaceId":"SPACE-LM010-SEASIDE-DECK","time":"evening","status":"初版完成"}
});})();

/* Delta: seasonal and event coverage */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  shiomi_beach_fireworks_night: {"name":"潮見浜 花火大会 夜","path":"images/assets/bg/bg_shiomi_beach_fireworks_night.webp","spaceId":"SPACE-SHIOMI-BEACH","time":"night","season":"summer","status":"初版完成"},
  takadai_shrine_festival_night: {"name":"わだつみ神社 境内祭り 夜","path":"images/assets/bg/bg_takadai_shrine_festival_night.webp","spaceId":"SPACE-LM002-COURTYARD","time":"night","season":"summer","status":"初版完成"},
  hashiro_boardwalk_autumn_day: {"name":"羽白湖もみじ遊歩道 秋昼","path":"images/assets/bg/bg_hashiro_boardwalk_autumn_day.webp","spaceId":"SPACE-HASHIRO-PATH","time":"day","season":"autumn","status":"初版完成"},
  hashiro_boardwalk_autumn_evening: {"name":"羽白湖もみじ遊歩道 秋夕方","path":"images/assets/bg/bg_hashiro_boardwalk_autumn_evening.webp","spaceId":"SPACE-HASHIRO-PATH","time":"evening","season":"autumn","status":"初版完成"},
  hiyorizaka_sakura_embankment_spring_day: {"name":"日和坂さくら堤 春昼","path":"images/assets/bg/bg_hiyorizaka_sakura_embankment_spring_day.webp","spaceId":"SPACE-WAKABA-CENTRAL-PARK","time":"day","season":"spring","status":"初版完成"},
  lm006_courtyard_school_festival_day: {"name":"日和坂学園 校舎前 学園祭昼","path":"images/assets/bg/bg_lm006_courtyard_school_festival_day.webp","spaceId":"SPACE-LM006-COURTYARD","time":"day","status":"初版完成"}
});})();

/* Delta: Tsukumo first-edition architecture proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  tsukumo_exterior_day: {"name":"テックラボつくも 建築外観案 昼","path":"images/assets/bg/bg_tsukumo_exterior_day.webp","spaceId":"SPACE-LM028-LOUNGE","time":"day","status":"初版案/制作済み"},
  tsukumo_reception_lounge_day: {"name":"テックラボつくも 受付ラウンジ 昼","path":"images/assets/bg/bg_tsukumo_reception_lounge_day.webp","spaceId":"SPACE-LM028-LOUNGE","time":"day","status":"初版案/制作済み"},
  tsukumo_second_floor_lab_day: {"name":"テックラボつくも 2階ラボ 昼","path":"images/assets/bg/bg_tsukumo_second_floor_lab_day.webp","spaceId":"SPACE-LM029-LAB","time":"day","status":"初版案/制作済み"},
  tsukumo_parts_storage_day: {"name":"ひかるのパーツ保管庫 昼","path":"images/assets/bg/bg_tsukumo_parts_storage_day.webp","spaceId":"SPACE-LM036-PARTS-STORAGE","time":"day","status":"初版案/制作済み"},
  tsukumo_rooftop_garden_evening: {"name":"陽里の屋上菜園 夕方","path":"images/assets/bg/bg_tsukumo_rooftop_garden_evening.webp","spaceId":"SPACE-LM035-ROOFTOP-GARDEN","time":"evening","status":"初版案/制作済み"}
});})();


/* Delta: Hiyorizaka onsen shared street/footbath proposal v1 */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hiyorizaka_onsen_street_winter_day": {
    "name": "日和坂温泉郷 温泉街 冬昼",
    "path": "images/assets/bg/bg_hiyorizaka_onsen_street_winter_day.webp",
    "spaceId": "SPACE-LM045-ONSEN-STREET",
    "time": "day",
    "season": "winter",
    "status": "初版案/制作済み"
  },
  "hiyorizaka_onsen_street_winter_evening": {
    "name": "日和坂温泉郷 温泉街 冬夕方",
    "path": "images/assets/bg/bg_hiyorizaka_onsen_street_winter_evening.webp",
    "spaceId": "SPACE-LM045-ONSEN-STREET",
    "time": "evening",
    "season": "winter",
    "status": "初版案/制作済み"
  },
  "hiyorizaka_onsen_footbath_winter_day": {
    "name": "日和坂温泉郷 足湯 冬昼",
    "path": "images/assets/bg/bg_hiyorizaka_onsen_footbath_winter_day.webp",
    "spaceId": "SPACE-LM045-FOOTBATH",
    "time": "day",
    "season": "winter",
    "status": "初版案/制作済み"
  },
  "hiyorizaka_onsen_footbath_winter_evening": {
    "name": "日和坂温泉郷 足湯 冬夕方",
    "path": "images/assets/bg/bg_hiyorizaka_onsen_footbath_winter_evening.webp",
    "spaceId": "SPACE-LM045-FOOTBATH",
    "time": "evening",
    "season": "winter",
    "status": "初版案/制作済み"
  },
  "hiyorizaka_onsen_street_footbath_approach_day": {
    "name": "日和坂温泉郷 通り→足湯導線 冬昼",
    "path": "images/assets/bg/bg_hiyorizaka_onsen_street_footbath_approach_day.webp",
    "spaceId": "SPACE-LM045-ONSEN-STREET",
    "time": "day",
    "season": "winter",
    "status": "初版案/制作済み"
  }
});})();


/* Delta: LM-053 provisional pear orchard, fruit/season not canon */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hinatanatsu_orchard_entrance_earlyautumn_day": {
    "name": "日向夏フルーツロード 入口・受付 初秋昼（梨園案）",
    "path": "images/assets/bg/bg_hinatanatsu_orchard_entrance_earlyautumn_day.webp",
    "spaceId": "SPACE-LM053-ORCHARD",
    "time": "day",
    "season": "earlyAutumn",
    "status": "初版提案/果物・収穫期未確定"
  },
  "hinatanatsu_orchard_aisle_earlyautumn_day": {
    "name": "日向夏フルーツロード 収穫園路 初秋昼（梨園案）",
    "path": "images/assets/bg/bg_hinatanatsu_orchard_aisle_earlyautumn_day.webp",
    "spaceId": "SPACE-LM053-ORCHARD",
    "time": "day",
    "season": "earlyAutumn",
    "status": "初版提案/果物・収穫期未確定"
  },
  "hinatanatsu_orchard_terrace_earlyautumn_day": {
    "name": "日向夏フルーツロード 試食・休憩テラス 初秋昼（梨園案）",
    "path": "images/assets/bg/bg_hinatanatsu_orchard_terrace_earlyautumn_day.webp",
    "spaceId": "SPACE-LM053-ORCHARD",
    "time": "day",
    "season": "earlyAutumn",
    "status": "初版提案/果物・収穫期未確定"
  },
  "hinatanatsu_orchard_entrance_earlyautumn_evening": {
    "name": "日向夏フルーツロード 入口・受付 初秋夕景（差分案）",
    "path": "images/assets/bg/bg_hinatanatsu_orchard_entrance_earlyautumn_evening.webp",
    "spaceId": "SPACE-LM053-ORCHARD",
    "time": "evening",
    "season": "earlyAutumn",
    "status": "初版提案/果物・収穫期未確定"
  },
  "hinatanatsu_orchard_aisle_earlyautumn_evening": {
    "name": "日向夏フルーツロード 収穫園路 初秋夕景（差分案）",
    "path": "images/assets/bg/bg_hinatanatsu_orchard_aisle_earlyautumn_evening.webp",
    "spaceId": "SPACE-LM053-ORCHARD",
    "time": "evening",
    "season": "earlyAutumn",
    "status": "初版提案/果物・収穫期未確定"
  }
});})();


/* Delta: library existing-image reuse proposal and LM-055 indoor market draft */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hiyorizaka_kurashi_marche_exterior_day": {
    "name": "日和坂暮らしマルシェ 外観・入口 昼（屋内市場案）",
    "path": "images/assets/bg/bg_hiyorizaka_kurashi_marche_exterior_day.webp",
    "spaceId": "SPACE-LM055-MARCHE",
    "time": "day",
    "status": "初版提案/屋内型・採否未確定"
  },
  "hiyorizaka_kurashi_marche_sales_hall_day": {
    "name": "日和坂暮らしマルシェ 売場・回遊 昼（屋内市場案）",
    "path": "images/assets/bg/bg_hiyorizaka_kurashi_marche_sales_hall_day.webp",
    "spaceId": "SPACE-LM055-MARCHE",
    "time": "day",
    "status": "初版提案/屋内型・採否未確定"
  },
  "hiyorizaka_kurashi_marche_rest_corner_day": {
    "name": "日和坂暮らしマルシェ 窓際休憩席 昼（屋内市場案）",
    "path": "images/assets/bg/bg_hiyorizaka_kurashi_marche_rest_corner_day.webp",
    "spaceId": "SPACE-LM055-MARCHE",
    "time": "day",
    "status": "初版提案/屋内型・採否未確定"
  },
  "hiyorizaka_kurashi_marche_service_access_day": {
    "name": "日和坂暮らしマルシェ 搬入動線 昼（屋内市場案）",
    "path": "images/assets/bg/bg_hiyorizaka_kurashi_marche_service_access_day.webp",
    "spaceId": "SPACE-LM055-MARCHE",
    "time": "day",
    "status": "初版提案/屋内型・採否未確定"
  },
  "lm017_library_existing_reuse_proposal": {
    "name": "日和坂市立中央図書館 書架・貸出フロア（既存流用案）",
    "path": "images/assets/bgev/bg_library.webp",
    "spaceId": "SPACE-LM017-READING",
    "status": "既存流用提案/施設同定未確定"
  }
});})();


/* Delta: vip facility proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "tsukumo_basement_vip_night": {
    "name": "つくも地下VIPルーム 夜（初版内装案）",
    "path": "images/assets/bg/bg_tsukumo_basement_vip_night.webp",
    "spaceId": "SPACE-LM034-VIP",
    "time": "night",
    "status": "初版提案/採否未確定"
  }
});})();


/* Delta: port facility proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hiyorizaka_port_public_quay_day": {
    "name": "日和坂港 一般開放岸壁 昼（母体案）",
    "path": "images/assets/bg/bg_hiyorizaka_port_public_quay_day.webp",
    "spaceId": "SPACE-LM025-PORT-QUAY",
    "time": "day",
    "status": "初版提案/採否未確定"
  },
  "hiyorizaka_port_festival_day": {
    "name": "日和坂港まつり 昼（岸壁イベント案）",
    "path": "images/assets/bg/bg_hiyorizaka_port_festival_day.webp",
    "spaceId": "SPACE-LM025-PORT-QUAY",
    "time": "day",
    "status": "初版提案/採否未確定"
  }
});})();


/* Delta: shiki facility proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "minato_shiki_flower_market_day": {
    "name": "日和坂四季まつり 春の花市 昼（広場共用案）",
    "path": "images/assets/bg/bg_minato_shiki_flower_market_day.webp",
    "spaceId": "SPACE-MINATO-EVENTPLAZA",
    "time": "day",
    "season": "spring",
    "status": "初版提案/採否未確定"
  }
});})();


/* Delta: harvest facility proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "yamasato_community_square_autumn_day": {
    "name": "山側集落 交流広場 秋昼（収穫祭母体案）",
    "path": "images/assets/bg/bg_yamasato_community_square_autumn_day.webp",
    "spaceId": "SPACE-LM047-VILLAGE-SQUARE",
    "time": "day",
    "season": "autumn",
    "status": "初版提案/採否未確定"
  },
  "yamasato_harvest_festival_autumn_day": {
    "name": "山里収穫祭会場 秋昼（交流広場イベント案）",
    "path": "images/assets/bg/bg_yamasato_harvest_festival_autumn_day.webp",
    "spaceId": "SPACE-LM047-VILLAGE-SQUARE",
    "time": "day",
    "season": "autumn",
    "status": "初版提案/採否未確定"
  }
});})();


/* Delta: Biribiri parent architecture, staff room and existing-plaza stage proposals */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "biribiri_store_exterior_day": {
    "name": "ビリビリ電機 店舗外観 昼（親建築案）",
    "path": "images/assets/bg/bg_biribiri_store_exterior_day.webp",
    "spaceId": "SPACE-LM049-EVENTPLAZA",
    "time": "day",
    "status": "初版提案/階数・共用関係未確定"
  },
  "biribiri_staff_dining_lounge_day": {
    "name": "ビリビリ社員食堂・休憩ラウンジ 昼（2階奥案）",
    "path": "images/assets/bg/bg_biribiri_staff_dining_lounge_day.webp",
    "spaceId": "SPACE-LM059-STAFF-LOUNGE",
    "time": "day",
    "status": "初版提案/階数・共用関係未確定"
  },
  "biribiri_koharu_plaza_stage_day": {
    "name": "小春の勝負ステージ 昼（既存広場共用案）",
    "path": "images/assets/bg/bg_biribiri_koharu_plaza_stage_day.webp",
    "spaceId": "SPACE-LM049-EVENTPLAZA",
    "time": "day",
    "status": "初版提案/階数・共用関係未確定"
  }
});})();


/* Delta existing-qc */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "lm110_residential_area_night": {
    "name": "住宅街 夜（既存紐付け）",
    "path": "images/assets/bg/bg_residential_area_night.webp",
    "spaceId": "SPACE-LM110-RESIDENTIAL-NIGHT",
    "time": "night",
    "status": "既存紐付け/QC済・地理未確定"
  },
  "lm079_manager_mansion_road_night": {
    "name": "店長マンション前の帰り道 夜（既存紐付け）",
    "path": "images/assets/bg/bg_manager_mansion_road_night.webp",
    "spaceId": "SPACE-LM079-ROAD",
    "time": "night",
    "status": "既存紐付け/QC済・地理未確定"
  },
  "lm109_akari_dori_night": {
    "name": "駅前あかり通り 夜（既存紐付け）",
    "path": "images/assets/bg/bg_akari_dori_night.webp",
    "spaceId": "SPACE-LM109-AKARI-DORI",
    "time": "night",
    "status": "既存紐付け/モブ保持"
  }
});})();

/* Delta LM-061 */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hoshino_living_room_night": {
    "name": "星野家のリビング 夜（初版空間案）",
    "path": "images/assets/bg/bg_hoshino_living_room_night.webp",
    "spaceId": "SPACE-LM061-LIVING",
    "time": "night",
    "status": "初版空間案/採否未確定"
  }
});})();

/* Delta LM-062 */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hayamikawa_reading_room_day": {
    "name": "速水川マンションの読書部屋 昼（初版空間案）",
    "path": "images/assets/bg/bg_hayamikawa_reading_room_day.webp",
    "spaceId": "SPACE-LM062-READING",
    "time": "day",
    "status": "初版空間案/採否未確定"
  }
});})();

/* Delta LM-063 */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "kusakabe_shared_living_room_evening": {
    "name": "草壁家の共有リビング 夕方（姉妹共有案）",
    "path": "images/assets/bg/bg_kusakabe_shared_living_room_evening.webp",
    "spaceId": "SPACE-LM063-LIVING",
    "time": "evening",
    "status": "初版空間案/採否未確定"
  }
});})();

/* Delta LM-064 */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "komugisawa_room_night": {
    "name": "小麦沢家のギャル部屋 夜（マンション内装案）",
    "path": "images/assets/bg/bg_komugisawa_room_night.webp",
    "spaceId": "SPACE-LM064-ROOM",
    "time": "night",
    "status": "初版空間案/採否未確定"
  }
});})();

/* Delta LM-065 */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "kasugahara_training_room_evening": {
    "name": "春日原家のトレーニングルーム 夕方（初版空間案）",
    "path": "images/assets/bg/bg_kasugahara_training_room_evening.webp",
    "spaceId": "SPACE-LM065-TRAINING",
    "time": "evening",
    "status": "初版空間案/採否未確定"
  }
});})();

/* Delta LM-066 residential proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "daidoji_home_beauty_room_day": {
    "name": "大道寺家のエステルーム 昼（自宅美容室案）",
    "path": "images/assets/bg/bg_daidoji_home_beauty_room_day.webp",
    "spaceId": "SPACE-LM066-BEAUTY",
    "time": "day",
    "status": "住居初版案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-067 residential proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hikami_home_sweets_kitchen_day": {
    "name": "氷神家の小さな菓子工房 昼（自宅製菓室案）",
    "path": "images/assets/bg/bg_hikami_home_sweets_kitchen_day.webp",
    "spaceId": "SPACE-LM067-SWEETS",
    "time": "day",
    "status": "住居初版案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-069 residential proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "shibazakura_streaming_room_night": {
    "name": "芝桜家の配信部屋 夜（自宅配信室案）",
    "path": "images/assets/bg/bg_shibazakura_streaming_room_night.webp",
    "spaceId": "SPACE-LM069-STREAM",
    "time": "night",
    "status": "住居初版案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-070 residential proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "shido_mansion_home_kitchen_evening": {
    "name": "紫藤マンションの花嫁修業キッチン 夕方（家庭キッチン案）",
    "path": "images/assets/bg/bg_shido_mansion_home_kitchen_evening.webp",
    "spaceId": "SPACE-LM070-KITCHEN",
    "time": "evening",
    "status": "住居初版案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-071 residential proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "mochizuki_home_office_night": {
    "name": "餅月マンションのゆるふわ事務部屋 夜（自宅事務室案）",
    "path": "images/assets/bg/bg_mochizuki_home_office_night.webp",
    "spaceId": "SPACE-LM071-HOME-OFFICE",
    "time": "night",
    "status": "住居初版案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-072 residential proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "tenjin_home_game_room_night": {
    "name": "天神家のにぎやかゲーム部屋 夜（自宅空間案）",
    "path": "images/assets/bg/bg_tenjin_home_game_room_night.webp",
    "spaceId": "SPACE-LM072-GAME",
    "time": "night",
    "status": "住居初版案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-073 residential proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "kirishima_home_analysis_desk_rain_night": {
    "name": "霧島家の分析デスク 雨の夜（自宅作業案）",
    "path": "images/assets/bg/bg_kirishima_home_analysis_desk_rain_night.webp",
    "spaceId": "SPACE-LM073-ANALYSIS",
    "time": "night",
    "status": "住居初版案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-074 residential proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hinata_home_manpuku_kitchen_day": {
    "name": "日向家のまんぷく台所 昼（家庭台所案）",
    "path": "images/assets/bg/bg_hinata_home_manpuku_kitchen_day.webp",
    "spaceId": "SPACE-LM074-KITCHEN",
    "time": "day",
    "status": "住居初版案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-075 residential proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "tsukumo_3f_hiyori_living_evening": {
    "name": "陽里の住居リビング 夕方（つくも3階案）",
    "path": "images/assets/bg/bg_tsukumo_3f_hiyori_living_evening.webp",
    "spaceId": "SPACE-LM075-LIVING",
    "time": "evening",
    "status": "住居初版案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-076 residential proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "momose_hikaru_private_workdesk_night": {
    "name": "ひかるの作業机 夜（所在地未確定の自室案）",
    "path": "images/assets/bg/bg_momose_hikaru_private_workdesk_night.webp",
    "spaceId": "SPACE-LM076-WORKDESK",
    "time": "night",
    "status": "住居初版案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-077 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "sakuya_blue_violet_neon_room_midnight": {
    "name": "朔夜の青紫ネオンルーム 深夜（用途未確定の会話室案）",
    "path": "images/assets/bg/bg_sakuya_blue_violet_neon_room_midnight.webp",
    "spaceId": "SPACE-LM077-NEON",
    "time": "midnight",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-078 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "manager_apartment_living_night": {
    "name": "店長の自宅マンション 室内・夜（初版住居案）",
    "path": "images/assets/bg/bg_manager_apartment_living_night.webp",
    "spaceId": "SPACE-LM078-LIVING",
    "time": "night",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-080 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "manager_apartment_balcony_night": {
    "name": "店長マンションの小さなベランダ 夜（同一住戸案）",
    "path": "images/assets/bg/bg_manager_apartment_balcony_night.webp",
    "spaceId": "SPACE-LM080-BALCONY",
    "time": "night",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-081 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hoshiumi_wonder_resort_entrance_day": {
    "name": "星海ワンダーリゾート 代表入口・昼（初版外観案）",
    "path": "images/assets/bg/bg_hoshiumi_wonder_resort_entrance_day.webp",
    "spaceId": "SPACE-LM081-ENTRANCE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-082 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "aonami_megaseapark_entrance_night": {
    "name": "蒼波メガシーパーク 代表入口・夜（初版外観案）",
    "path": "images/assets/bg/bg_aonami_megaseapark_entrance_night.webp",
    "spaceId": "SPACE-LM082-ENTRANCE",
    "time": "night",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-083 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hiyorizaka_fureai_zoo_entrance_spring_day": {
    "name": "日和坂ふれあい動物公園 入口・春昼（初版外観案）",
    "path": "images/assets/bg/bg_hiyorizaka_fureai_zoo_entrance_spring_day.webp",
    "spaceId": "SPACE-LM083-ENTRANCE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-084 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hiyorizaka_aqua_reptile_entrance_day": {
    "name": "日和坂アクア＆レプタイル館 入口・昼（初版外観案）",
    "path": "images/assets/bg/bg_hiyorizaka_aqua_reptile_entrance_day.webp",
    "spaceId": "SPACE-LM084-ENTRANCE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-085 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "aomine_safari_entrance_autumn_day": {
    "name": "青嶺サファリパーク 入口・秋昼（初版外観案）",
    "path": "images/assets/bg/bg_aomine_safari_entrance_autumn_day.webp",
    "spaceId": "SPACE-LM085-ENTRANCE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-086 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hiyorizaka_art_museum_entrance_rain_day": {
    "name": "日和坂市立美術館 入口・雨昼（初版外観案）",
    "path": "images/assets/bg/bg_hiyorizaka_art_museum_entrance_rain_day.webp",
    "spaceId": "SPACE-LM086-ENTRANCE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-087 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "shiomi_science_museum_entrance_day": {
    "name": "潮見県立科学館 入口・昼（初版外観案）",
    "path": "images/assets/bg/bg_shiomi_science_museum_entrance_day.webp",
    "spaceId": "SPACE-LM087-ENTRANCE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-088 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hiyorizaka_trick_art_entrance_day": {
    "name": "日和坂トリックアート館 入口・昼（初版外観案）",
    "path": "images/assets/bg/bg_hiyorizaka_trick_art_entrance_day.webp",
    "spaceId": "SPACE-LM088-ENTRANCE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-089 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hashiro_nature_science_center_entrance_day": {
    "name": "羽白湖自然科学センター 入口・昼（初版外観案）",
    "path": "images/assets/bg/bg_hashiro_nature_science_center_entrance_day.webp",
    "spaceId": "SPACE-LM089-ENTRANCE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-090 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hiyorizaka_kimono_lane_day": {
    "name": "日和坂きもの小路 入口導線・昼（初版街路案）",
    "path": "images/assets/bg/bg_hiyorizaka_kimono_lane_day.webp",
    "spaceId": "SPACE-LM090-LANE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-091 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hanamori_tea_garden_entrance_autumn_day": {
    "name": "花守茶苑公園 入口導線・秋昼（初版庭園案）",
    "path": "images/assets/bg/bg_hanamori_tea_garden_entrance_autumn_day.webp",
    "spaceId": "SPACE-LM091-ENTRANCE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-092 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hiyorizaka_local_history_museum_entrance_day": {
    "name": "日和坂郷土歴史館 入口・昼（初版外観案）",
    "path": "images/assets/bg/bg_hiyorizaka_local_history_museum_entrance_day.webp",
    "spaceId": "SPACE-LM092-ENTRANCE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-093 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "shiomi_jidaimura_entrance_day": {
    "name": "潮見時代村 撮影村 入口・昼（初版外観案）",
    "path": "images/assets/bg/bg_shiomi_jidaimura_entrance_day.webp",
    "spaceId": "SPACE-LM093-ENTRANCE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-094 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hiyori_underground_mall_passage_day": {
    "name": "日和坂地下街 ひよりモール 代表通路（初版空間案）",
    "path": "images/assets/bg/bg_hiyori_underground_mall_passage_day.webp",
    "spaceId": "SPACE-LM094-PASSAGE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-095 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "shiomi_harbor_terrace_approach_night": {
    "name": "潮見ハーバーテラス 来店導線・夜（初版外観案）",
    "path": "images/assets/bg/bg_shiomi_harbor_terrace_approach_night.webp",
    "spaceId": "SPACE-LM095-APPROACH",
    "time": "night",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-096 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hiyorizaka_appliance_museum_entrance_day": {
    "name": "日和坂家電ミュージアム 入口・昼（初版外観案）",
    "path": "images/assets/bg/bg_hiyorizaka_appliance_museum_entrance_day.webp",
    "spaceId": "SPACE-LM096-ENTRANCE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-097 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hidamari_shopping_arcade_day": {
    "name": "ひだまり商店街 屋根付きアーケード 代表通路・昼（初版街路案）",
    "path": "images/assets/bg/bg_hidamari_shopping_arcade_day.webp",
    "spaceId": "SPACE-LM097-ARCADE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-098 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hiyorizaka_central_cinema_entrance_rain_day": {
    "name": "日和坂中央映画館 入口・雨昼（初版外観案）",
    "path": "images/assets/bg/bg_hiyorizaka_central_cinema_entrance_rain_day.webp",
    "spaceId": "SPACE-LM098-ENTRANCE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-099 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "shiomi_bowl_karaoke_entrance_evening": {
    "name": "潮見ボウル＆カラオケ 入口・夕方（初版外観案）",
    "path": "images/assets/bg/bg_shiomi_bowl_karaoke_entrance_evening.webp",
    "spaceId": "SPACE-LM099-ENTRANCE",
    "time": "evening",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-100 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "yamazato_loghouse_village_entrance_autumn_evening": {
    "name": "山里ログハウス村 入口・秋夕方（初版宿泊施設案）",
    "path": "images/assets/bg/bg_yamazato_loghouse_village_entrance_autumn_evening.webp",
    "spaceId": "SPACE-LM100-ENTRANCE",
    "time": "evening",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-101 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hiyorizaka_craft_workshop_lane_day": {
    "name": "日和坂クラフト工房街 入口導線・昼（初版街路案）",
    "path": "images/assets/bg/bg_hiyorizaka_craft_workshop_lane_day.webp",
    "spaceId": "SPACE-LM101-LANE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-102 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "shiokaze_drive_road_evening": {
    "name": "潮風ドライブロード 海岸道路・夕方（初版道路案）",
    "path": "images/assets/bg/bg_shiokaze_drive_road_evening.webp",
    "spaceId": "SPACE-LM102-ROAD",
    "time": "evening",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-103 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hiyorizaka_morning_market_morning": {
    "name": "日和坂朝市 代表導線・朝（初版市場案）",
    "path": "images/assets/bg/bg_hiyorizaka_morning_market_morning.webp",
    "spaceId": "SPACE-LM103-MARKET",
    "time": "morning",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-104 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "tomizaka_jazz_bar_entrance_night": {
    "name": "灯見坂ジャズバー 入口・夜（初版外観案）",
    "path": "images/assets/bg/bg_tomizaka_jazz_bar_entrance_night.webp",
    "spaceId": "SPACE-LM104-ENTRANCE",
    "time": "night",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-105 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hidamari_pokapoka_sento_entrance_evening": {
    "name": "ひだまり銭湯 ぽかぽか湯 入口・夕方（初版外観案）",
    "path": "images/assets/bg/bg_hidamari_pokapoka_sento_entrance_evening.webp",
    "spaceId": "SPACE-LM105-ENTRANCE",
    "time": "evening",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-106 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "hiyorizaka_disaster_learning_center_entrance_day": {
    "name": "日和坂防災センター 入口・昼（初版公共施設案）",
    "path": "images/assets/bg/bg_hiyorizaka_disaster_learning_center_entrance_day.webp",
    "spaceId": "SPACE-LM106-ENTRANCE",
    "time": "day",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();

/* Delta LM-107 landmark proposal */
(function(){"use strict";window.TENOTSU_BACKGROUND_CATALOG=Object.assign({},window.TENOTSU_BACKGROUND_CATALOG||{}, {
  "shiomi_lighthouse_approach_evening": {
    "name": "潮見灯台 代表導線・夕方（初版灯台案）",
    "path": "images/assets/bg/bg_shiomi_lighthouse_approach_evening.webp",
    "spaceId": "SPACE-LM107-APPROACH",
    "time": "evening",
    "status": "初版空間案/間取り・設備・採否未確定"
  }
});})();
