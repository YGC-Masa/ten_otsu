/* Public canonical spaces. LM, SPACE, BG and game place IDs remain separate. */
(function(){
  "use strict";
  const config = window.TENOTSU_TOWN_ENCOUNTER_CONFIG;
  const existing = {
  "hidamari_store_front": {
    "backgroundKey": "hidamari_store_front_day",
    "backgroundKeys": {
      "morning": "hidamari_store_front_morning",
      "day": "hidamari_store_front_day",
      "night": "hidamari_store_front_night_open"
    }
  },
  "marinpia_aqua_tunnel": {
    "backgroundKey": "marinpia_aqua_tunnel",
    "landmarkId": "LM-010",
    "spaceId": "SPACE-LM010-AQUA-TUNNEL"
  },
  "wakaba_central_park": {
    "backgroundKey": "park_spring",
    "landmarkId": "LM-012",
    "spaceId": "SPACE-WAKABA-CENTRAL-PARK",
    "backgroundBySeason": {
      "winter": {
        "backgroundKey": "wakaba_central_park_winter_day",
        "backgroundKeys": {
          "morning": "wakaba_central_park_winter_morning",
          "day": "wakaba_central_park_winter_day",
          "night": "wakaba_central_park_winter_night"
        }
      }
    }
  },
  "techlab_tsukumo": {
    "backgroundKey": "tsukumo_exterior_day",
    "relatedLandmarkIds": [
      "LM-028"
    ]
  },
  "sugosawa_house": {
    "backgroundKey": "sugosawa_house_day",
    "backgroundKeys": {
      "day": "sugosawa_house_day",
      "night": "sugosawa_house_night"
    }
  },
  "hoshimigaoka_planetarium": {
    "backgroundKey": "planetarium_exterior_twilight",
    "landmarkId": "LM-013"
  },
  "hiyorizaka_station_front": {
    "backgroundKey": "hiyorizaka_station_day",
    "landmarkId": "LM-005",
    "spaceId": "SPACE-HIYORIZAKA-STATION",
    "backgroundKeys": {
      "morning": "hiyorizaka_station_morning",
      "day": "hiyorizaka_station_day",
      "night": "hiyorizaka_station_night"
    }
  },
  "minato_event_plaza": {
    "backgroundKey": "minato_event_plaza",
    "landmarkId": "LM-004",
    "spaceId": "SPACE-MINATO-EVENTPLAZA"
  },
  "minato_seaside_fence": {
    "backgroundKey": "minato_seaside_fence_day",
    "landmarkId": "LM-004",
    "spaceId": "SPACE-MINATO-SEASIDE"
  }
};
  config.places.forEach(place => Object.assign(place, existing[place.id] || {}));
  config.places.push(...[
  {
    "id": "landmark_lm_079",
    "name": "店長マンション前の帰り道",
    "type": "帰り道",
    "landmarkId": "LM-079",
    "spaceId": "SPACE-LM079-ROAD",
    "backgroundKey": "lm079_manager_mansion_road_night",
    "backgroundStatus": "既存紐付け/再生成なし",
    "description": "帰り道/マンション前 / ひだまりストア〜店長宅",
    "source": {
      "landmark": "'02_ランドマーク'!A79:R79",
      "space": "'09_空間・間取り管理'!A92:O92",
      "background": "'08_背景アセット'!A171:L171"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_083",
    "name": "日和坂ふれあい動物公園",
    "type": "動物園",
    "landmarkId": "LM-083",
    "spaceId": "SPACE-LM083-ENTRANCE",
    "backgroundKey": "hiyorizaka_fureai_zoo_entrance_spring_day",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "動物園/ふれあい施設 / 郊外・若葉中央公園方面",
    "source": {
      "landmark": "'02_ランドマーク'!A83:R83",
      "space": "'09_空間・間取り管理'!A115:O115",
      "background": "'08_背景アセット'!A192:L192"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_084",
    "name": "日和坂アクア＆レプタイル館",
    "type": "爬虫類",
    "landmarkId": "LM-084",
    "spaceId": "SPACE-LM084-ENTRANCE",
    "backgroundKey": "hiyorizaka_aqua_reptile_entrance_day",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "爬虫類/小型水族館 / 日和坂マリンピア隣接",
    "source": {
      "landmark": "'02_ランドマーク'!A84:R84",
      "space": "'09_空間・間取り管理'!A116:O116",
      "background": "'08_背景アセット'!A193:L193"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_086",
    "name": "日和坂市立美術館",
    "type": "美術館",
    "landmarkId": "LM-086",
    "spaceId": "SPACE-LM086-ENTRANCE",
    "backgroundKey": "hiyorizaka_art_museum_entrance_rain_day",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "美術館/文化施設 / 高台文化ゾーン",
    "source": {
      "landmark": "'02_ランドマーク'!A86:R86",
      "space": "'09_空間・間取り管理'!A118:O118",
      "background": "'08_背景アセット'!A195:L195"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_087",
    "name": "潮見県立科学館",
    "type": "科学館",
    "landmarkId": "LM-087",
    "spaceId": "SPACE-LM087-ENTRANCE",
    "backgroundKey": "shiomi_science_museum_entrance_day",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "科学館/体験施設 / 市街地・潮見ドーム周辺",
    "source": {
      "landmark": "'02_ランドマーク'!A87:R87",
      "space": "'09_空間・間取り管理'!A119:O119",
      "background": "'08_背景アセット'!A196:L196"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_088",
    "name": "日和坂トリックアート館",
    "type": "体験型美術館",
    "landmarkId": "LM-088",
    "spaceId": "SPACE-LM088-ENTRANCE",
    "backgroundKey": "hiyorizaka_trick_art_entrance_day",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "体験型美術館/写真スポット / 海側観光エリア",
    "source": {
      "landmark": "'02_ランドマーク'!A88:R88",
      "space": "'09_空間・間取り管理'!A120:O120",
      "background": "'08_背景アセット'!A197:L197"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_089",
    "name": "羽白湖自然科学センター",
    "type": "自然科学館",
    "landmarkId": "LM-089",
    "spaceId": "SPACE-LM089-ENTRANCE",
    "backgroundKey": "hashiro_nature_science_center_entrance_day",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "自然科学館/湖畔施設 / 羽白湖周辺",
    "source": {
      "landmark": "'02_ランドマーク'!A89:R89",
      "space": "'09_空間・間取り管理'!A121:O121",
      "background": "'08_背景アセット'!A198:L198"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_090",
    "name": "日和坂きもの小路",
    "type": "和服体験",
    "landmarkId": "LM-090",
    "spaceId": "SPACE-LM090-LANE",
    "backgroundKey": "hiyorizaka_kimono_lane_day",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "和服体験/観光通り / わだつみ神社〜レトロ商店街",
    "source": {
      "landmark": "'02_ランドマーク'!A90:R90",
      "space": "'09_空間・間取り管理'!A122:O122",
      "background": "'08_背景アセット'!A199:L199"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_091",
    "name": "花守茶苑公園",
    "type": "茶会",
    "landmarkId": "LM-091",
    "spaceId": "SPACE-LM091-ENTRANCE",
    "backgroundKey": "hanamori_tea_garden_entrance_autumn_day",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "茶会/日本庭園/公園 / 高台文化ゾーン",
    "source": {
      "landmark": "'02_ランドマーク'!A91:R91",
      "space": "'09_空間・間取り管理'!A123:O123",
      "background": "'08_背景アセット'!A200:L200"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_092",
    "name": "日和坂郷土歴史館",
    "type": "歴史施設",
    "landmarkId": "LM-092",
    "spaceId": "SPACE-LM092-ENTRANCE",
    "backgroundKey": "hiyorizaka_local_history_museum_entrance_day",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "歴史施設/郷土資料館 / 旧市街/わだつみ神社参道",
    "source": {
      "landmark": "'02_ランドマーク'!A92:R92",
      "space": "'09_空間・間取り管理'!A124:O124",
      "background": "'08_背景アセット'!A201:L201"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_094",
    "name": "日和坂地下街 ひよりモール",
    "type": "地下街",
    "landmarkId": "LM-094",
    "spaceId": "SPACE-LM094-PASSAGE",
    "backgroundKey": "hiyori_underground_mall_passage_day",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "地下街/買い物/雨の日 / 日和坂駅地下",
    "source": {
      "landmark": "'02_ランドマーク'!A94:R94",
      "space": "'09_空間・間取り管理'!A126:O126",
      "background": "'08_背景アセット'!A203:L203"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_095",
    "name": "潮見ハーバーテラス",
    "type": "海沿いレストラン",
    "landmarkId": "LM-095",
    "spaceId": "SPACE-LM095-APPROACH",
    "backgroundKey": "shiomi_harbor_terrace_approach_night",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "海沿いレストラン/夜景 / 港エリア",
    "source": {
      "landmark": "'02_ランドマーク'!A95:R95",
      "space": "'09_空間・間取り管理'!A127:O127",
      "background": "'08_背景アセット'!A204:L204"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_096",
    "name": "日和坂家電ミュージアム",
    "type": "博物館",
    "landmarkId": "LM-096",
    "spaceId": "SPACE-LM096-ENTRANCE",
    "backgroundKey": "hiyorizaka_appliance_museum_entrance_day",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "博物館/家電/技術史 / テックラボつくも周辺",
    "source": {
      "landmark": "'02_ランドマーク'!A96:R96",
      "space": "'09_空間・間取り管理'!A128:O128",
      "background": "'08_背景アセット'!A205:L205"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_097",
    "name": "ひだまり商店街 屋根付きアーケード",
    "type": "商店街",
    "landmarkId": "LM-097",
    "spaceId": "SPACE-LM097-ARCADE",
    "backgroundKey": "hidamari_shopping_arcade_day",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "商店街/日常拠点 / ひだまりストア周辺",
    "source": {
      "landmark": "'02_ランドマーク'!A97:R97",
      "space": "'09_空間・間取り管理'!A129:O129",
      "background": "'08_背景アセット'!A206:L206"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_098",
    "name": "日和坂中央映画館",
    "type": "映画館",
    "landmarkId": "LM-098",
    "spaceId": "SPACE-LM098-ENTRANCE",
    "backgroundKey": "hiyorizaka_central_cinema_entrance_rain_day",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "映画館/雨の日デート / 駅前商業エリア",
    "source": {
      "landmark": "'02_ランドマーク'!A98:R98",
      "space": "'09_空間・間取り管理'!A130:O130",
      "background": "'08_背景アセット'!A207:L207"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_099",
    "name": "潮見ボウル＆カラオケ",
    "type": "ボウリング",
    "landmarkId": "LM-099",
    "spaceId": "SPACE-LM099-ENTRANCE",
    "backgroundKey": "shiomi_bowl_karaoke_entrance_evening",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "ボウリング/カラオケ/遊び場 / 市街地",
    "source": {
      "landmark": "'02_ランドマーク'!A99:R99",
      "space": "'09_空間・間取り管理'!A131:O131",
      "background": "'08_背景アセット'!A208:L208"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_100",
    "name": "山里ログハウス村",
    "type": "宿泊",
    "landmarkId": "LM-100",
    "spaceId": "SPACE-LM100-ENTRANCE",
    "backgroundKey": "yamazato_loghouse_village_entrance_autumn_evening",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "宿泊/自然/キャンプ / 山側観光エリア",
    "source": {
      "landmark": "'02_ランドマーク'!A100:R100",
      "space": "'09_空間・間取り管理'!A132:O132",
      "background": "'08_背景アセット'!A209:L209"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_101",
    "name": "日和坂クラフト工房街",
    "type": "工芸",
    "landmarkId": "LM-101",
    "spaceId": "SPACE-LM101-LANE",
    "backgroundKey": "hiyorizaka_craft_workshop_lane_day",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "工芸/体験/アクセ作り / 旧市街〜高台文化ゾーン",
    "source": {
      "landmark": "'02_ランドマーク'!A101:R101",
      "space": "'09_空間・間取り管理'!A133:O133",
      "background": "'08_背景アセット'!A210:L210"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_102",
    "name": "潮風ドライブロード",
    "type": "海岸線",
    "landmarkId": "LM-102",
    "spaceId": "SPACE-LM102-ROAD",
    "backgroundKey": "shiokaze_drive_road_evening",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "海岸線/ドライブ / 潮見浜〜郊外海岸",
    "source": {
      "landmark": "'02_ランドマーク'!A102:R102",
      "space": "'09_空間・間取り管理'!A134:O134",
      "background": "'08_背景アセット'!A211:L211"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_103",
    "name": "日和坂朝市",
    "type": "朝市",
    "landmarkId": "LM-103",
    "spaceId": "SPACE-LM103-MARKET",
    "backgroundKey": "hiyorizaka_morning_market_morning",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "朝市/食べ歩き/地域 / 港〜旧市街",
    "source": {
      "landmark": "'02_ランドマーク'!A103:R103",
      "space": "'09_空間・間取り管理'!A135:O135",
      "background": "'08_背景アセット'!A212:L212"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_104",
    "name": "灯見坂ジャズバー",
    "type": "バー",
    "landmarkId": "LM-104",
    "spaceId": "SPACE-LM104-ENTRANCE",
    "backgroundKey": "tomizaka_jazz_bar_entrance_night",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "バー/音楽/大人夜 / 灯見坂レトロ横丁",
    "source": {
      "landmark": "'02_ランドマーク'!A104:R104",
      "space": "'09_空間・間取り管理'!A136:O136",
      "background": "'08_背景アセット'!A213:L213"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_105",
    "name": "ひだまり銭湯 ぽかぽか湯",
    "type": "銭湯",
    "landmarkId": "LM-105",
    "spaceId": "SPACE-LM105-ENTRANCE",
    "backgroundKey": "hidamari_pokapoka_sento_entrance_evening",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "銭湯/日常/温浴 / ひだまり商店街裏",
    "source": {
      "landmark": "'02_ランドマーク'!A105:R105",
      "space": "'09_空間・間取り管理'!A137:O137",
      "background": "'08_背景アセット'!A214:L214"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_106",
    "name": "日和坂防災センター",
    "type": "公共施設",
    "landmarkId": "LM-106",
    "spaceId": "SPACE-LM106-ENTRANCE",
    "backgroundKey": "hiyorizaka_disaster_learning_center_entrance_day",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "公共施設/防災/家電 / 市街地",
    "source": {
      "landmark": "'02_ランドマーク'!A106:R106",
      "space": "'09_空間・間取り管理'!A138:O138",
      "background": "'08_背景アセット'!A215:L215"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_107",
    "name": "潮見灯台",
    "type": "灯台",
    "landmarkId": "LM-107",
    "spaceId": "SPACE-LM107-APPROACH",
    "backgroundKey": "shiomi_lighthouse_approach_evening",
    "backgroundStatus": "初版案/配置・カタログ登録済",
    "description": "灯台/海辺/告白スポット / 潮見浜東端",
    "source": {
      "landmark": "'02_ランドマーク'!A107:R107",
      "space": "'09_空間・間取り管理'!A139:O139",
      "background": "'08_背景アセット'!A216:L216"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_109",
    "name": "駅前あかり通り：夜",
    "type": "駅前通り",
    "landmarkId": "LM-109",
    "spaceId": "SPACE-LM109-AKARI-DORI",
    "backgroundKey": "lm109_akari_dori_night",
    "backgroundStatus": "既存実装/台帳追補",
    "description": "駅前通り/夜景/商店街 / 日和坂駅前〜中心市街地",
    "source": {
      "landmark": "'02_ランドマーク'!A109:R109",
      "space": "'09_空間・間取り管理'!A93:O93",
      "background": "'08_背景アセット'!A78:L78"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_110",
    "name": "住宅街：夜",
    "type": "住宅街",
    "landmarkId": "LM-110",
    "spaceId": "SPACE-LM110-RESIDENTIAL-NIGHT",
    "backgroundKey": "lm110_residential_area_night",
    "backgroundStatus": "既存紐付け/再生成なし",
    "description": "住宅街/帰り道/夜景 / 住宅街",
    "source": {
      "landmark": "'02_ランドマーク'!A110:R110",
      "space": "'09_空間・間取り管理'!A94:O94",
      "background": "'08_背景アセット'!A170:L170"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_001",
    "name": "羽白湖",
    "type": "自然",
    "landmarkId": "LM-001",
    "spaceId": "SPACE-HASHIRO-LAKESIDE",
    "backgroundId": "BG-039",
    "backgroundStatus": "2026-09-17 QC",
    "description": "自然/湖 / 山側",
    "source": {
      "landmark": "'02_ランドマーク'!A2:R2",
      "space": "'09_空間・間取り管理'!A10:O10",
      "background": "'08_背景アセット'!A43:L43"
    },
    "backgroundKey": "hashiro_lake_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_002",
    "name": "わだつみ神社",
    "type": "神社",
    "landmarkId": "LM-002",
    "spaceId": "SPACE-LM002-COURTYARD",
    "backgroundId": "BG-045",
    "backgroundStatus": "v039_329/QC",
    "description": "神社/高台 / 山手高台",
    "source": {
      "landmark": "'02_ランドマーク'!A3:R3",
      "space": "'09_空間・間取り管理'!A15:O15",
      "background": "'08_背景アセット'!A49:L49"
    },
    "backgroundKey": "takadai_shrine_courtyard_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_003",
    "name": "潮見浜",
    "type": "浜辺",
    "landmarkId": "LM-003",
    "spaceId": "SPACE-SHIOMI-BEACH",
    "backgroundId": "BG-003",
    "backgroundStatus": "v039_118",
    "description": "浜辺/海 / 海側",
    "source": {
      "landmark": "'02_ランドマーク'!A4:R4",
      "space": "'09_空間・間取り管理'!A16:O16",
      "background": "'08_背景アセット'!A7:L7"
    },
    "backgroundKey": "shiomi_beach_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_006",
    "name": "日和坂学園",
    "type": "学校",
    "landmarkId": "LM-006",
    "spaceId": "SPACE-LM006-GATE",
    "backgroundId": "BG-106",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "学校/高台 / 内陸高台",
    "source": {
      "landmark": "'02_ランドマーク'!A7:R7",
      "space": "'09_空間・間取り管理'!A21:O21",
      "background": "'08_背景アセット'!A110:L110"
    },
    "backgroundKey": "lm006_gate_after_school",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_007",
    "name": "日和坂シーグラス通り",
    "type": "海沿い商店街",
    "landmarkId": "LM-007",
    "spaceId": "SPACE-LM007-STREET",
    "backgroundId": "BG-107",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "海沿い商店街/散歩道 / 潮見浜〜みなと公園",
    "source": {
      "landmark": "'02_ランドマーク'!A8:R8",
      "space": "'09_空間・間取り管理'!A23:O23",
      "background": "'08_背景アセット'!A111:L111"
    },
    "backgroundKey": "hiyorizaka_seaglass_street_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_008",
    "name": "夕凪展望台",
    "type": "展望台",
    "landmarkId": "LM-008",
    "spaceId": "SPACE-YUNAGI-OBSERVATORY",
    "backgroundId": "BG-055",
    "backgroundStatus": "2026-09-18 QC",
    "description": "展望台/夜景 / わだつみ神社奥",
    "source": {
      "landmark": "'02_ランドマーク'!A9:R9",
      "space": "'09_空間・間取り管理'!A24:O24",
      "background": "'08_背景アセット'!A59:L59"
    },
    "backgroundKey": "yunagi_observatory_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_009",
    "name": "羽白湖畔カフェ ルミエール",
    "type": "カフェ",
    "landmarkId": "LM-009",
    "spaceId": "SPACE-LM009-CAFE",
    "backgroundId": "BG-080",
    "backgroundStatus": "2026-09-27 ノヴァQC",
    "description": "カフェ/湖畔/小規模ペンション / 羽白湖",
    "source": {
      "landmark": "'02_ランドマーク'!A10:R10",
      "space": "'09_空間・間取り管理'!A25:O25",
      "background": "'08_背景アセット'!A84:L84"
    },
    "backgroundKey": "lumiere_lakeside_terrace_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_011",
    "name": "灯見坂レトロ横丁",
    "type": "飲食街",
    "landmarkId": "LM-011",
    "spaceId": "SPACE-TOMIZAKA-YOKOCHO-ENTRANCE",
    "backgroundId": "BG-035",
    "backgroundStatus": "2026-08-26",
    "description": "飲食街/レトロ商店街 / 駅裏",
    "source": {
      "landmark": "'02_ランドマーク'!A12:R12",
      "space": "'09_空間・間取り管理'!A9:O9",
      "background": "'08_背景アセット'!A39:L39"
    },
    "backgroundAsset": {
      "path": "images/assets/bg/bg_tomizaka_retro_yokocho_entrance_evening.webp",
      "name": "灯見坂レトロ横丁",
      "status": "2026-08-26"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_014",
    "name": "ひだまり坂ベーカリー街",
    "type": "パン屋街",
    "landmarkId": "LM-014",
    "spaceId": "SPACE-LM014-STREET",
    "backgroundId": "BG-101",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "パン屋街/小商店 / ひだまり商店街周辺",
    "source": {
      "landmark": "'02_ランドマーク'!A15:R15",
      "space": "'09_空間・間取り管理'!A44:O44",
      "background": "'08_背景アセット'!A105:L105"
    },
    "backgroundKey": "hidamarizaka_bakery_street_morning",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_015",
    "name": "潮風サイクリングロード",
    "type": "海岸線",
    "landmarkId": "LM-015",
    "spaceId": "SPACE-LM015-ROUTE",
    "backgroundId": "BG-102",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "海岸線/運動 / 潮見浜〜郊外",
    "source": {
      "landmark": "'02_ランドマーク'!A16:R16",
      "space": "'09_空間・間取り管理'!A45:O45",
      "background": "'08_背景アセット'!A106:L106"
    },
    "backgroundKey": "shiokaze_cycling_road_morning",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_018",
    "name": "日和坂市民ホール",
    "type": "コンサート",
    "landmarkId": "LM-018",
    "spaceId": "SPACE-LM018-FOYER",
    "backgroundId": "BG-111",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "コンサート/ホール / 駅前文化ゾーン",
    "source": {
      "landmark": "'02_ランドマーク'!A18:R18",
      "space": "'09_空間・間取り管理'!A47:O47",
      "background": "'08_背景アセット'!A115:L115"
    },
    "backgroundKey": "hiyorizaka_civic_hall_foyer",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_019",
    "name": "潮見浜ライブデッキ",
    "type": "ライブ",
    "landmarkId": "LM-019",
    "spaceId": "SPACE-LM019-LIVEDECK",
    "backgroundId": "BG-104",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "ライブ/野外ステージ / 潮見浜",
    "source": {
      "landmark": "'02_ランドマーク'!A19:R19",
      "space": "'09_空間・間取り管理'!A49:O49",
      "background": "'08_背景アセット'!A108:L108"
    },
    "backgroundKey": "shiomi_beach_live_deck_evening",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_020",
    "name": "日和坂総合運動公園",
    "type": "スポーツ",
    "landmarkId": "LM-020",
    "spaceId": "SPACE-HIYORIZAKA-SPORTS-PARK",
    "backgroundId": "BG-069",
    "backgroundStatus": "2026-09-20 QC",
    "description": "スポーツ/大型公園 / 郊外内陸",
    "source": {
      "landmark": "'02_ランドマーク'!A20:R20",
      "space": "'09_空間・間取り管理'!A50:O50",
      "background": "'08_背景アセット'!A73:L73"
    },
    "backgroundKey": "hiyorizaka_sports_park_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_021",
    "name": "日和坂アリーナ",
    "type": "スポーツ",
    "landmarkId": "LM-021",
    "spaceId": "SPACE-LM021-ARENA",
    "backgroundId": "BG-105",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "スポーツ/イベント会場 / 駅西エリア",
    "source": {
      "landmark": "'02_ランドマーク'!A21:R21",
      "space": "'09_空間・間取り管理'!A52:O52",
      "background": "'08_背景アセット'!A109:L109"
    },
    "backgroundKey": "hiyorizaka_arena_interior",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_026",
    "name": "日和坂ブックカフェ通り",
    "type": "本屋",
    "landmarkId": "LM-026",
    "spaceId": "SPACE-LM026-STREET",
    "backgroundId": "BG-108",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "本屋/カフェ街 / 中央図書館周辺",
    "source": {
      "landmark": "'02_ランドマーク'!A26:R26",
      "space": "'09_空間・間取り管理'!A53:O53",
      "background": "'08_背景アセット'!A112:L112"
    },
    "backgroundKey": "hiyorizaka_bookcafe_street_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_027",
    "name": "潮見ドーム前イベント広場",
    "type": "イベント広場",
    "landmarkId": "LM-027",
    "spaceId": "SPACE-LM027-EVENTPLAZA",
    "backgroundId": "BG-112",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "イベント広場/大型催事 / 市街地/潮見ドーム周辺",
    "source": {
      "landmark": "'02_ランドマーク'!A27:R27",
      "space": "'09_空間・間取り管理'!A57:O57",
      "background": "'08_背景アセット'!A116:L116"
    },
    "backgroundKey": "shiomi_dome_event_plaza_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_028",
    "name": "テックラボつくも 受付ラウンジ",
    "type": "協力店",
    "landmarkId": "LM-028",
    "spaceId": "SPACE-LM028-LOUNGE",
    "backgroundId": "BG-138",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "協力店/技術拠点 / つくも周辺",
    "source": {
      "landmark": "'02_ランドマーク'!A28:R28",
      "space": "'09_空間・間取り管理'!A58:O58",
      "background": "'08_背景アセット'!A142:L142"
    },
    "backgroundKey": "tsukumo_reception_lounge_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_030",
    "name": "つくも裏口 交換カウンター",
    "type": "交換施設",
    "landmarkId": "LM-030",
    "spaceId": "SPACE-TSUKUMO-EXCHANGE-COUNTER",
    "backgroundId": "BG-076",
    "backgroundStatus": "2026-09-21 QC",
    "description": "交換施設/交換カウンター / テックラボつくも裏手",
    "source": {
      "landmark": "'02_ランドマーク'!A30:R30",
      "space": "'09_空間・間取り管理'!A60:O60",
      "background": "'08_背景アセット'!A80:L80"
    },
    "backgroundAsset": {
      "path": "images/assets/bgev/bg_item_exchange_counter.webp",
      "name": "テックラボつくも 交換カウンター",
      "status": "2026-09-21 QC"
    },
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_031",
    "name": "九十九坂レトロ電器小路",
    "type": "商店街",
    "landmarkId": "LM-031",
    "spaceId": "SPACE-LM031-STREET",
    "backgroundId": "BG-096",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "商店街/古い電器街 / テックラボつくも周辺",
    "source": {
      "landmark": "'02_ランドマーク'!A31:R31",
      "space": "'09_空間・間取り管理'!A61:O61",
      "background": "'08_背景アセット'!A100:L100"
    },
    "backgroundKey": "tsukumozaka_retro_electric_alley_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_032",
    "name": "羽白湖 電波観測テラス",
    "type": "湖畔",
    "landmarkId": "LM-032",
    "spaceId": "SPACE-LM032-TERRACE",
    "backgroundId": "BG-113",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "湖畔/技術スポット / 羽白湖周辺",
    "source": {
      "landmark": "'02_ランドマーク'!A32:R32",
      "space": "'09_空間・間取り管理'!A62:O62",
      "background": "'08_背景アセット'!A117:L117"
    },
    "backgroundKey": "hashiro_radio_observation_terrace_evening",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_033",
    "name": "日和坂デジタル工作室",
    "type": "公共施設",
    "landmarkId": "LM-033",
    "spaceId": "SPACE-LM033-WORKSHOP",
    "backgroundId": "BG-097",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "公共施設/ものづくり / 中央図書館周辺",
    "source": {
      "landmark": "'02_ランドマーク'!A33:R33",
      "space": "'09_空間・間取り管理'!A63:O63",
      "background": "'08_背景アセット'!A101:L101"
    },
    "backgroundKey": "hiyorizaka_digital_workshop_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_038",
    "name": "芝桜の丘 花守ガーデン",
    "type": "春",
    "landmarkId": "LM-038",
    "spaceId": "SPACE-LM038-GARDEN",
    "backgroundId": "BG-095",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "春/花畑 / わだつみ神社ふもと",
    "source": {
      "landmark": "'02_ランドマーク'!A38:R38",
      "space": "'09_空間・間取り管理'!A67:O67",
      "background": "'08_背景アセット'!A99:L99"
    },
    "backgroundKey": "hanamori_shibazakura_garden_spring_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_040",
    "name": "日和坂アクアプール",
    "type": "夏",
    "landmarkId": "LM-040",
    "spaceId": "SPACE-LM040-AQUAPOOL",
    "backgroundId": "BG-098",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "夏/プール / 日和坂総合運動公園内",
    "source": {
      "landmark": "'02_ランドマーク'!A40:R40",
      "space": "'09_空間・間取り管理'!A68:O68",
      "background": "'08_背景アセット'!A102:L102"
    },
    "backgroundKey": "hiyorizaka_aquapool_summer_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_041",
    "name": "紅葉谷ロープウェイ",
    "type": "秋",
    "landmarkId": "LM-041",
    "spaceId": "SPACE-LM041-STATION",
    "backgroundId": "BG-109",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "秋/紅葉観光 / 山側観光エリア",
    "source": {
      "landmark": "'02_ランドマーク'!A41:R41",
      "space": "'09_空間・間取り管理'!A69:O69",
      "background": "'08_背景アセット'!A113:L113"
    },
    "backgroundKey": "momijidani_ropeway_station_autumn_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_043",
    "name": "白嶺スノーパーク",
    "type": "冬",
    "landmarkId": "LM-043",
    "spaceId": "SPACE-LM043-SLOPE",
    "backgroundId": "BG-110",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "冬/スキー / 山側奥地",
    "source": {
      "landmark": "'02_ランドマーク'!A43:R43",
      "space": "'09_空間・間取り管理'!A71:O71",
      "background": "'08_背景アセット'!A114:L114"
    },
    "backgroundKey": "shirane_snowpark_slope_winter_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_044",
    "name": "羽白高原 雪原エリア",
    "type": "冬",
    "landmarkId": "LM-044",
    "spaceId": "SPACE-LM044-SNOWFIELD",
    "backgroundId": "BG-100",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "冬/雪原 / 羽白湖よりさらに山側",
    "source": {
      "landmark": "'02_ランドマーク'!A44:R44",
      "space": "'09_空間・間取り管理'!A73:O73",
      "background": "'08_背景アセット'!A104:L104"
    },
    "backgroundKey": "hashiro_plateau_snowfield_winter_evening",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_045",
    "name": "日和坂温泉郷",
    "type": "四季",
    "landmarkId": "LM-045",
    "spaceId": "SPACE-LM045-ONSEN-STREET",
    "backgroundId": "BG-146",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "四季/温泉 / 山側温泉地",
    "source": {
      "landmark": "'02_ランドマーク'!A45:R45",
      "space": "'09_空間・間取り管理'!A74:O74",
      "background": "'08_背景アセット'!A150:L150"
    },
    "backgroundKey": "hiyorizaka_onsen_street_footbath_approach_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_049",
    "name": "ビリビリ電機 駅前イベント広場",
    "type": "ライバル店",
    "landmarkId": "LM-049",
    "spaceId": "SPACE-LM049-EVENTPLAZA",
    "backgroundId": "BG-115",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "ライバル店/販売イベント / 駅前商業エリア",
    "source": {
      "landmark": "'02_ランドマーク'!A49:R49",
      "space": "'09_空間・間取り管理'!A76:O76",
      "background": "'08_背景アセット'!A119:L119"
    },
    "backgroundKey": "biribiri_station_event_plaza_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_050",
    "name": "日和坂ゲームアリーナ",
    "type": "ゲームセンター",
    "landmarkId": "LM-050",
    "spaceId": "SPACE-LM050-GAME-ARENA",
    "backgroundId": "BG-094",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "ゲームセンター/eスポーツ / 駅前商業エリア",
    "source": {
      "landmark": "'02_ランドマーク'!A50:R50",
      "space": "'09_空間・間取り管理'!A77:O77",
      "background": "'08_背景アセット'!A98:L98"
    },
    "backgroundKey": "hiyorizaka_game_arena_interior",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_051",
    "name": "霧島式サウナ＆温浴研究所",
    "type": "サウナ",
    "landmarkId": "LM-051",
    "spaceId": "SPACE-LM051-LOUNGE",
    "backgroundId": "BG-091",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "サウナ/温浴施設 / 日和坂温泉郷入口",
    "source": {
      "landmark": "'02_ランドマーク'!A51:R51",
      "space": "'09_空間・間取り管理'!A78:O78",
      "background": "'08_背景アセット'!A95:L95"
    },
    "backgroundKey": "kirishima_onsen_lounge",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_052",
    "name": "日和坂ボードゲームカフェ ロジカ",
    "type": "カフェ",
    "landmarkId": "LM-052",
    "spaceId": "SPACE-LM052-CAFE",
    "backgroundId": "BG-092",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "カフェ/テーブルゲーム / 灯見坂レトロ横丁",
    "source": {
      "landmark": "'02_ランドマーク'!A52:R52",
      "space": "'09_空間・間取り管理'!A79:O79",
      "background": "'08_背景アセット'!A96:L96"
    },
    "backgroundKey": "logica_boardgame_cafe_interior",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_053",
    "name": "日向夏フルーツロード",
    "type": "果樹園",
    "landmarkId": "LM-053",
    "spaceId": "SPACE-LM053-ORCHARD",
    "backgroundId": "BG-147",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "果樹園/観光農園 / 山側集落〜郊外",
    "source": {
      "landmark": "'02_ランドマーク'!A53:R53",
      "space": "'09_空間・間取り管理'!A80:O80",
      "background": "'08_背景アセット'!A151:L151"
    },
    "backgroundKey": "hinatanatsu_orchard_entrance_earlyautumn_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_054",
    "name": "青葉キャンプフィールド",
    "type": "キャンプ",
    "landmarkId": "LM-054",
    "spaceId": "SPACE-LM054-CAMPFIELD",
    "backgroundId": "BG-088",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "キャンプ/アウトドア / 羽白湖外周",
    "source": {
      "landmark": "'02_ランドマーク'!A54:R54",
      "space": "'09_空間・間取り管理'!A81:O81",
      "background": "'08_背景アセット'!A92:L92"
    },
    "backgroundKey": "aoba_campfield_evening",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_055",
    "name": "日和坂暮らしマルシェ",
    "type": "生活雑貨",
    "landmarkId": "LM-055",
    "spaceId": "SPACE-LM055-MARCHE",
    "backgroundId": "BG-153",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "生活雑貨/家事/商店街 / 中心市街地",
    "source": {
      "landmark": "'02_ランドマーク'!A55:R55",
      "space": "'09_空間・間取り管理'!A88:O88",
      "background": "'08_背景アセット'!A157:L157"
    },
    "backgroundKey": "hiyorizaka_kurashi_marche_exterior_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_056",
    "name": "日和坂ブライダルテラス",
    "type": "式場",
    "landmarkId": "LM-056",
    "spaceId": "SPACE-LM056-TERRACE",
    "backgroundId": "BG-089",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "式場/展望カフェ / 海を望む高台",
    "source": {
      "landmark": "'02_ランドマーク'!A56:R56",
      "space": "'09_空間・間取り管理'!A82:O82",
      "background": "'08_背景アセット'!A93:L93"
    },
    "backgroundKey": "hiyorizaka_bridal_terrace_day",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_057",
    "name": "宵闇小料理横丁",
    "type": "飲食街",
    "landmarkId": "LM-057",
    "spaceId": "SPACE-LM057-YOKOCHO",
    "backgroundId": "BG-090",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "飲食街/小料理/酒場 / 駅裏〜灯見坂レトロ横丁",
    "source": {
      "landmark": "'02_ランドマーク'!A57:R57",
      "space": "'09_空間・間取り管理'!A83:O83",
      "background": "'08_背景アセット'!A94:L94"
    },
    "backgroundKey": "yoiyami_koryori_yokocho_evening",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_058",
    "name": "日和坂ハンドボールコート",
    "type": "スポーツ",
    "landmarkId": "LM-058",
    "spaceId": "SPACE-LM058-HANDBALL-COURT",
    "backgroundId": "BG-093",
    "backgroundStatus": "2026-10-30 デルタ",
    "description": "スポーツ/屋内コート / 日和坂総合運動公園内",
    "source": {
      "landmark": "'02_ランドマーク'!A58:R58",
      "space": "'09_空間・間取り管理'!A84:O84",
      "background": "'08_背景アセット'!A97:L97"
    },
    "backgroundKey": "hiyorizaka_handball_court_interior",
    "visitKind": "background"
  },
  {
    "id": "landmark_lm_111",
    "name": "エステサロン・アスト（AST BEAUTY & RELAXATION）",
    "type": "美容",
    "landmarkId": "LM-111",
    "spaceId": "SPACE-LM111-LOUNGE",
    "backgroundId": "BG-085",
    "backgroundStatus": "2026-10-10 ノヴァ",
    "description": "美容/リラクゼーション/ハーブティーラウンジ / 日和坂市街地・ひだまりストア近隣候補（所在地未確定）",
    "source": {
      "landmark": "'02_ランドマーク'!A111:R111",
      "space": "'09_空間・間取り管理'!A86:O86",
      "background": "'08_背景アセット'!A89:L89"
    },
    "backgroundKey": "ast_salon_exterior_day",
    "visitKind": "background"
  }
]);
})();
