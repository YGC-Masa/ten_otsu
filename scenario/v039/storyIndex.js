/* v039_157 story index: resynced Yozora 50-100 with latest manifest */
(function(){
  "use strict";
  window.TENOTSU_STORY_INDEX = [
  {
    "id": "kogane_natsu_marinpia",
    "title": "マリンピアの海中トンネル",
    "type": "normal",
    "category": "town_encounter",
    "season": "summer",
    "placeId": "marinpia_aqua_tunnel",
    "placeName": "マリンピア・海中トンネル",
    "characters": [
      "ad",
      "bc"
    ],
    "characterNames": [
      "小麦沢 こがね",
      "日向 なつ"
    ],
    "scenario": "scenario/v039/events/kogane_natsu_marinpia.json",
    "version": "v039_105",
    "unlock": {
      "type": "always"
    },
    "encounter": {
      "enabled": true,
      "staminaCost": 10,
      "revealItem": "visitor_scope",
      "seasonItem": "season_ticket"
    },
    "order": 105,
    "summary": "こがねとなつと一緒に、マリンピアの海中トンネルを見に行く夏の外回りイベント。"
  },
  {
    "id": "sample_hina_kogane_new_juice_002",
    "title": "事務所にて緋奈＆こがね：新作ジュースは何の味？",
    "type": "normal",
    "category": "office",
    "placeId": "hidamari_office",
    "placeName": "ひだまりストア・事務所",
    "characters": [
      "aa",
      "ad",
      "ac"
    ],
    "characterNames": [
      "星野 緋奈",
      "小麦沢 こがね",
      "草壁 翠"
    ],
    "scenario": "scenario/v039/events/sample_hina_kogane_new_juice_002.json",
    "version": "v039_106",
    "unlock": {
      "type": "always"
    },
    "encounter": {
      "enabled": false
    },
    "order": 106,
    "summary": "事務所の新作ジュースをきっかけに、緋奈が照れて、こがねが無邪気にかき回し、翠が締める日常会話。"
  },
  {
    "id": "yozora_affection_00_01_key",
    "title": "親愛Lv.01：美空なら休憩室",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 1,
    "affectionSlot": "key1",
    "unlockLevel": 1,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_00_01_key.json",
    "version": "v039_114",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 1
    },
    "order": 3001,
    "summary": "夜空がまだ店長に距離を置き、自分ではなく美空を見てほしいと示す序盤キーストーリー。",
    "rawTitle": "美空なら休憩室",
    "affectionLabel": "親愛Lv.01",
    "menuTitle": "親愛Lv.01：美空なら休憩室"
  },
  {
    "id": "yozora_affection_00_02_key",
    "title": "親愛Lv.04：見てるだけ",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 1,
    "affectionSlot": "key2",
    "unlockLevel": 4,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_00_02_key.json",
    "version": "v039_114",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 4
    },
    "order": 3002,
    "summary": "美空の接客を夜空が横から自然にフォローし、自分は見ているだけだと距離を取る夜空キーシナリオ第2話。",
    "rawTitle": "見てるだけ",
    "affectionLabel": "親愛Lv.04",
    "menuTitle": "親愛Lv.04：見てるだけ"
  },
  {
    "id": "yozora_affection_00_03_key",
    "title": "親愛Lv.07：特別公演のチケット",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 1,
    "affectionSlot": "key3",
    "unlockLevel": 7,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_00_03_key.json",
    "version": "v039_116",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 7
    },
    "order": 3003,
    "summary": "星見ヶ丘プラネタリウムの特別公演を前に、夜空が美空の付き添いとして同行を決めるキーシナリオ第3話。",
    "rawTitle": "特別公演のチケット",
    "affectionLabel": "親愛Lv.07",
    "menuTitle": "親愛Lv.07：特別公演のチケット"
  },
  {
    "id": "yozora_affection_10_00_main",
    "title": "親愛Lv.10：余計なところまで見ないで",
    "type": "main",
    "category": "character_main",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 1,
    "affectionSlot": "main",
    "unlockLevel": 10,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_10_00_main.json",
    "version": "v039_116",
    "unlock": {
      "type": "all_story_cleared",
      "storyIds": [
        "yozora_affection_00_01_key",
        "yozora_affection_00_02_key",
        "yozora_affection_00_03_key"
      ],
      "fallback": {
        "type": "affection_level",
        "character": "ai",
        "level": 10
      }
    },
    "order": 3010,
    "summary": "キー1-1〜1-3の伏線を受け、プラネタリウムで夜空が自分を見られることを意識し始めるメイン1。",
    "rawTitle": "余計なところまで見ないで",
    "affectionLabel": "親愛Lv.10",
    "menuTitle": "親愛Lv.10：余計なところまで見ないで"
  },
  {
    "id": "yozora_affection_10_01_key",
    "title": "親愛Lv.11：そういうの、気づかなくていい",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 2,
    "affectionSlot": "key1",
    "unlockLevel": 11,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_10_01_key.json",
    "version": "v039_117",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 11
    },
    "order": 3011,
    "summary": "プラネタリウム後、店長が夜空の細かな気遣いに気づき始め、夜空が『気づかなくていい』と拒むキーシナリオ。",
    "rawTitle": "そういうの、気づかなくていい",
    "affectionLabel": "親愛Lv.11",
    "menuTitle": "親愛Lv.11：そういうの、気づかなくていい"
  },
  {
    "id": "yozora_affection_10_02_key",
    "title": "親愛Lv.14：美空だけでいいでしょ",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 2,
    "affectionSlot": "key2",
    "unlockLevel": 14,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_10_02_key.json",
    "version": "v039_117",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 14
    },
    "order": 3012,
    "summary": "地域フェスの記念撮影で、夜空が見られる側になることや美空と比較されることを避けるキーシナリオ。",
    "rawTitle": "美空だけでいいでしょ",
    "affectionLabel": "親愛Lv.14",
    "menuTitle": "親愛Lv.14：美空だけでいいでしょ"
  },
  {
    "id": "yozora_affection_10_03_key",
    "title": "親愛Lv.17：気づかなくていい疲れ",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 2,
    "affectionSlot": "key3",
    "unlockLevel": 17,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_10_03_key.json",
    "version": "v039_117",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 17
    },
    "order": 3013,
    "summary": "閉店後の帰り道、夜空が美空の疲れには気づく一方、自分の寒さや疲れを見られることを嫌がるキーシナリオ。",
    "rawTitle": "気づかなくていい疲れ",
    "affectionLabel": "親愛Lv.17",
    "menuTitle": "親愛Lv.17：気づかなくていい疲れ"
  },
  {
    "id": "yozora_affection_20_00_main",
    "title": "親愛Lv.20：一歩後ろの夜空",
    "type": "main",
    "category": "character_main",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 2,
    "affectionSlot": "main",
    "unlockLevel": 20,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_20_00_main.json",
    "version": "v039_117",
    "unlock": {
      "type": "all_story_cleared",
      "storyIds": [
        "yozora_affection_10_00_main",
        "yozora_affection_10_01_key",
        "yozora_affection_10_02_key",
        "yozora_affection_10_03_key"
      ],
      "fallback": {
        "type": "affection_level",
        "character": "ai",
        "level": 20
      }
    },
    "order": 3020,
    "summary": "潮見浜で、美空の一歩後ろにいる夜空の理由と、店長が夜空本人を見る違和感を掘り下げるメイン2。",
    "rawTitle": "一歩後ろの夜空",
    "affectionLabel": "親愛Lv.20",
    "menuTitle": "親愛Lv.20：一歩後ろの夜空"
  },
  {
    "id": "yozora_affection_20_01_key",
    "title": "親愛Lv.21：黒いリボン",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 3,
    "affectionSlot": "key1",
    "unlockLevel": 21,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_20_01_key.json",
    "version": "v039_122",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 21
    },
    "order": 3021,
    "summary": "夜空が黒いリボンを通して、美空が白なら自分は黒でいいと語り、白黒対比の原点に触れるキーシナリオ。",
    "rawTitle": "黒いリボン",
    "affectionLabel": "親愛Lv.21",
    "menuTitle": "親愛Lv.21：黒いリボン"
  },
  {
    "id": "yozora_affection_20_02_key",
    "title": "親愛Lv.24：夜空らしいって何",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 3,
    "affectionSlot": "key2",
    "unlockLevel": 24,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_20_02_key.json",
    "version": "v039_122",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 24
    },
    "order": 3022,
    "summary": "夜空が弓道を通して、反対を選んだだけなのか、それとも自分のものになっているのか揺れ始めるキーシナリオ。",
    "rawTitle": "夜空らしいって何",
    "affectionLabel": "親愛Lv.24",
    "menuTitle": "親愛Lv.24：夜空らしいって何"
  },
  {
    "id": "yozora_affection_20_03_key",
    "title": "親愛Lv.27：白と黒の飲み物",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 3,
    "affectionSlot": "key3",
    "unlockLevel": 27,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_20_03_key.json",
    "version": "v039_122",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 27
    },
    "order": 3023,
    "summary": "ブラックコーヒーとホットミルクを通じて、夜空が美空の反対を選ぶ癖と、同じものを選ぶ揺らぎを見せるキーシナリオ。",
    "rawTitle": "白と黒の飲み物",
    "affectionLabel": "親愛Lv.27",
    "menuTitle": "親愛Lv.27：白と黒の飲み物"
  },
  {
    "id": "yozora_affection_30_00_main",
    "title": "親愛Lv.30：白黒ツインルーム",
    "type": "main",
    "category": "character_main",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 3,
    "affectionSlot": "main",
    "unlockLevel": 30,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_30_00_main.json",
    "version": "v039_122",
    "unlock": {
      "type": "all_story_cleared",
      "storyIds": [
        "yozora_affection_20_00_main",
        "yozora_affection_20_01_key",
        "yozora_affection_20_02_key",
        "yozora_affection_20_03_key"
      ],
      "fallback": {
        "type": "affection_level",
        "character": "ai",
        "level": 30
      }
    },
    "order": 3030,
    "summary": "双沢姉妹の白黒ツインルームで、夜空が美空の反対を選んできた自分と、それでも自分のものになったものへ向き合うメイン3。",
    "rawTitle": "白黒ツインルーム",
    "affectionLabel": "親愛Lv.30",
    "menuTitle": "親愛Lv.30：白黒ツインルーム"
  },
  {
    "id": "yozora_affection_30_01_key",
    "title": "親愛Lv.31：美空が褒められるのは嬉しい",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 4,
    "affectionSlot": "key1",
    "unlockLevel": 31,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_30_01_key.json",
    "version": "v039_124",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 31
    },
    "order": 3031,
    "summary": "美空が常連客に褒められ、夜空が嬉しさと小さな痛みの両方を抱くキーシナリオ。",
    "rawTitle": "美空が褒められるのは嬉しい",
    "affectionLabel": "親愛Lv.31",
    "menuTitle": "親愛Lv.31：美空が褒められるのは嬉しい"
  },
  {
    "id": "yozora_affection_30_02_key",
    "title": "親愛Lv.34：美空の剣道の方がわかりやすい",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 4,
    "affectionSlot": "key2",
    "unlockLevel": 34,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_30_02_key.json",
    "version": "v039_124",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 34
    },
    "order": 3032,
    "summary": "夜空の弓道をめぐり、美空の剣道への尊敬と自分が見られることへの抵抗を描くキーシナリオ。",
    "rawTitle": "美空の剣道の方がわかりやすい",
    "affectionLabel": "親愛Lv.34",
    "menuTitle": "親愛Lv.34：美空の剣道の方がわかりやすい"
  },
  {
    "id": "yozora_affection_30_03_key",
    "title": "親愛Lv.37：別にいい",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 4,
    "affectionSlot": "key3",
    "unlockLevel": 37,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_30_03_key.json",
    "version": "v039_124",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 37
    },
    "order": 3033,
    "summary": "夜空が接客で成果を出すが、話題が美空に流れることで嬉しさと痛みが混ざるキーシナリオ。",
    "rawTitle": "別にいい",
    "affectionLabel": "親愛Lv.37",
    "menuTitle": "親愛Lv.37：別にいい"
  },
  {
    "id": "yozora_affection_40_00_main",
    "title": "親愛Lv.40：嬉しいのに、苦しい",
    "type": "main",
    "category": "character_main",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 4,
    "affectionSlot": "main",
    "unlockLevel": 40,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_40_00_main.json",
    "version": "v039_124",
    "unlock": {
      "type": "all_story_cleared",
      "storyIds": [
        "yozora_affection_30_00_main",
        "yozora_affection_30_01_key",
        "yozora_affection_30_02_key",
        "yozora_affection_30_03_key"
      ],
      "fallback": {
        "type": "affection_level",
        "character": "ai",
        "level": 40
      }
    },
    "order": 3040,
    "summary": "武道イベントで、美空の華やかな剣道と夜空の静かな弓道を対比し、夜空が嬉しいのに苦しい感情を漏らすメイン4。",
    "rawTitle": "嬉しいのに、苦しい",
    "affectionLabel": "親愛Lv.40",
    "menuTitle": "親愛Lv.40：嬉しいのに、苦しい"
  },
  {
    "id": "yozora_affection_40_01_key",
    "title": "親愛Lv.41：少し一人にして",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 5,
    "affectionSlot": "key1",
    "unlockLevel": 41,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_40_01_key.json",
    "version": "v039_145",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 41
    },
    "order": 3041,
    "summary": "メイン40で自分の矛盾した感情を漏らした夜空が、店長と美空の視線を避け始める。店長を美空へ押し返し、「少し一人にして」と告げて運動公園方面へ向かう。",
    "rawTitle": "少し一人にして",
    "affectionLabel": "親愛Lv.41",
    "menuTitle": "親愛Lv.41：少し一人にして"
  },
  {
    "id": "yozora_affection_40_02_key",
    "title": "親愛Lv.44：夜空の行きそうな場所",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 5,
    "affectionSlot": "key2",
    "unlockLevel": 44,
    "characters": [
      "ai"
    ],
    "characterNames": [
      "双沢 夜空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_40_02_key.json",
    "version": "v039_145",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 44
    },
    "order": 3042,
    "summary": "夜空が戻らず、店長が探しに行く。美空は通話・メッセージのみで登場し、店長は駅前ではなく運動公園、そして海沿いのみなと公園方面へ向かう。",
    "rawTitle": "夜空の行きそうな場所",
    "affectionLabel": "親愛Lv.44",
    "menuTitle": "親愛Lv.44：夜空の行きそうな場所"
  },
  {
    "id": "yozora_affection_40_03_key",
    "title": "親愛Lv.47：見つけないで",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 5,
    "affectionSlot": "key3",
    "unlockLevel": 47,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_40_03_key.json",
    "version": "v039_145",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 47
    },
    "order": 3043,
    "summary": "夜のみなと公園で店長が夜空を見つける。夜空は美空への羨望や黒い感情を漏らし、それを認めた自己嫌悪からパニックになって夕凪展望台へ逃げる。",
    "rawTitle": "見つけないで",
    "affectionLabel": "親愛Lv.47",
    "menuTitle": "親愛Lv.47：見つけないで"
  },
  {
    "id": "yozora_affection_50_01_key",
    "title": "親愛Lv.51：少し一人にして",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 6,
    "affectionSlot": "key1",
    "unlockLevel": 51,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_50_01_key.json",
    "version": "v039_157",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 51
    },
    "order": 3051,
    "summary": "50-1 少し一人にして。場所：ひだまりストア・閉店後／日和坂総合運動公園方面。",
    "rawTitle": "少し一人にして",
    "affectionLabel": "親愛Lv.51",
    "menuTitle": "親愛Lv.51：少し一人にして",
    "locationName": "ひだまりストア・閉店後／日和坂総合運動公園方面"
  },
  {
    "id": "yozora_affection_50_02_key",
    "title": "親愛Lv.54：夜空の行きそうな場所",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 6,
    "affectionSlot": "key2",
    "unlockLevel": 54,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_50_02_key.json",
    "version": "v039_157",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 54
    },
    "order": 3054,
    "summary": "50-2 夜空の行きそうな場所。場所：ひだまりストア・閉店後／日和坂総合運動公園／海沿いの道。",
    "rawTitle": "夜空の行きそうな場所",
    "affectionLabel": "親愛Lv.54",
    "menuTitle": "親愛Lv.54：夜空の行きそうな場所",
    "locationName": "ひだまりストア・閉店後／日和坂総合運動公園／海沿いの道"
  },
  {
    "id": "yozora_affection_50_03_key",
    "title": "親愛Lv.57：見つけないで",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 6,
    "affectionSlot": "key3",
    "unlockLevel": 57,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_50_03_key.json",
    "version": "v039_157",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 57
    },
    "order": 3057,
    "summary": "50-3 見つけないで。場所：みなと公園・夜。",
    "rawTitle": "見つけないで",
    "affectionLabel": "親愛Lv.57",
    "menuTitle": "親愛Lv.57：見つけないで",
    "locationName": "みなと公園・夜"
  },
  {
    "id": "yozora_affection_60_00_main",
    "title": "親愛Lv.60：夜空のままで",
    "type": "main",
    "category": "character_main",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 6,
    "affectionSlot": "main",
    "unlockLevel": 60,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_60_00_main.json",
    "version": "v039_157",
    "unlock": {
      "type": "all_story_cleared",
      "storyIds": [
        "yozora_affection_50_01_key",
        "yozora_affection_50_02_key",
        "yozora_affection_50_03_key"
      ],
      "fallback": {
        "type": "affection_level",
        "character": "ai",
        "level": 60
      }
    },
    "order": 3060,
    "summary": "60-0 夜空のままで。場所：夕凪展望台・夜。",
    "rawTitle": "夜空のままで",
    "affectionLabel": "親愛Lv.60",
    "menuTitle": "親愛Lv.60：夜空のままで",
    "locationName": "夕凪展望台・夜"
  },
  {
    "id": "yozora_affection_60_01_key",
    "title": "親愛Lv.61：店長、大丈夫？",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 7,
    "affectionSlot": "key1",
    "unlockLevel": 61,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_60_01_key.json",
    "version": "v039_157",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 61
    },
    "order": 3061,
    "summary": "60-1 店長、大丈夫？。場所：ひだまりストア・翌日朝／バックヤード。",
    "rawTitle": "店長、大丈夫？",
    "affectionLabel": "親愛Lv.61",
    "menuTitle": "親愛Lv.61：店長、大丈夫？",
    "locationName": "ひだまりストア・翌日朝／バックヤード"
  },
  {
    "id": "yozora_affection_60_02_key",
    "title": "親愛Lv.64：一生面倒見るって、どういう意味",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 7,
    "affectionSlot": "key2",
    "unlockLevel": 64,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_60_02_key.json",
    "version": "v039_157",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 64
    },
    "order": 3064,
    "summary": "60-2 一生面倒見るって、どういう意味。場所：ひだまりストア・休憩室。",
    "rawTitle": "一生面倒見るって、どういう意味",
    "affectionLabel": "親愛Lv.64",
    "menuTitle": "親愛Lv.64：一生面倒見るって、どういう意味",
    "locationName": "ひだまりストア・休憩室"
  },
  {
    "id": "yozora_affection_60_03_key",
    "title": "親愛Lv.67：店長のあったかさ",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 7,
    "affectionSlot": "key3",
    "unlockLevel": 67,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_60_03_key.json",
    "version": "v039_157",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 67
    },
    "order": 3067,
    "summary": "60-3 店長のあったかさ。場所：ひだまりストア・休憩室／閉店後の店先。",
    "rawTitle": "店長のあったかさ",
    "affectionLabel": "親愛Lv.67",
    "menuTitle": "親愛Lv.67：店長のあったかさ",
    "locationName": "ひだまりストア・休憩室／閉店後の店先"
  },
  {
    "id": "yozora_affection_70_00_main",
    "title": "親愛Lv.70：忘れて、でも忘れないで",
    "type": "main",
    "category": "character_main",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 7,
    "affectionSlot": "main",
    "unlockLevel": 70,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_70_00_main.json",
    "version": "v039_157",
    "unlock": {
      "type": "all_story_cleared",
      "storyIds": [
        "yozora_affection_60_00_main",
        "yozora_affection_60_01_key",
        "yozora_affection_60_02_key",
        "yozora_affection_60_03_key"
      ],
      "fallback": {
        "type": "affection_level",
        "character": "ai",
        "level": 70
      }
    },
    "order": 3070,
    "summary": "70-0 忘れて、でも忘れないで。場所：若葉中央公園・夜。",
    "rawTitle": "忘れて、でも忘れないで",
    "affectionLabel": "親愛Lv.70",
    "menuTitle": "親愛Lv.70：忘れて、でも忘れないで",
    "locationName": "若葉中央公園・夜"
  },
  {
    "id": "yozora_affection_70_01_key",
    "title": "親愛Lv.71：ちゃんと謝りたい",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 8,
    "affectionSlot": "key1",
    "unlockLevel": 71,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_70_01_key.json",
    "version": "v039_157",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 71
    },
    "order": 3071,
    "summary": "70-1 ちゃんと謝りたい。場所：ひだまりストア・閉店後／店先。",
    "rawTitle": "ちゃんと謝りたい",
    "affectionLabel": "親愛Lv.71",
    "menuTitle": "親愛Lv.71：ちゃんと謝りたい",
    "locationName": "ひだまりストア・閉店後／店先"
  },
  {
    "id": "yozora_affection_70_02_key",
    "title": "親愛Lv.74：言えなかったこと",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 8,
    "affectionSlot": "key2",
    "unlockLevel": 74,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_70_02_key.json",
    "version": "v039_157",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 74
    },
    "order": 3074,
    "summary": "70-2 言えなかったこと。場所：若葉中央公園・夕方。",
    "rawTitle": "言えなかったこと",
    "affectionLabel": "親愛Lv.74",
    "menuTitle": "親愛Lv.74：言えなかったこと",
    "locationName": "若葉中央公園・夕方"
  },
  {
    "id": "yozora_affection_70_03_key",
    "title": "親愛Lv.77：帰ったら、好きなものの話をしよう",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 8,
    "affectionSlot": "key3",
    "unlockLevel": 77,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_70_03_key.json",
    "version": "v039_157",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 77
    },
    "order": 3077,
    "summary": "70-3 帰ったら、好きなものの話をしよう。場所：ひだまりストア・休憩室／帰り道。",
    "rawTitle": "帰ったら、好きなものの話をしよう",
    "affectionLabel": "親愛Lv.77",
    "menuTitle": "親愛Lv.77：帰ったら、好きなものの話をしよう",
    "locationName": "ひだまりストア・休憩室／帰り道"
  },
  {
    "id": "yozora_affection_80_00_main",
    "title": "親愛Lv.80：一緒だね",
    "type": "main",
    "category": "character_main",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 8,
    "affectionSlot": "main",
    "unlockLevel": 80,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_80_00_main.json",
    "version": "v039_157",
    "unlock": {
      "type": "all_story_cleared",
      "storyIds": [
        "yozora_affection_70_00_main",
        "yozora_affection_70_01_key",
        "yozora_affection_70_02_key",
        "yozora_affection_70_03_key"
      ],
      "fallback": {
        "type": "affection_level",
        "character": "ai",
        "level": 80
      }
    },
    "order": 3080,
    "summary": "80-0 一緒だね。場所：双沢家・ツインルーム・夜。",
    "rawTitle": "一緒だね",
    "affectionLabel": "親愛Lv.80",
    "menuTitle": "親愛Lv.80：一緒だね",
    "locationName": "双沢家・ツインルーム・夜"
  },
  {
    "id": "yozora_affection_80_01_key",
    "title": "親愛Lv.81：星は、見えなくても",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 9,
    "affectionSlot": "key1",
    "unlockLevel": 81,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_80_01_key.json",
    "version": "v039_157",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 81
    },
    "order": 3081,
    "summary": "80-1 星は、見えなくても。場所：ひだまりストア・閉店後／店先。",
    "rawTitle": "星は、見えなくても",
    "affectionLabel": "親愛Lv.81",
    "menuTitle": "親愛Lv.81：星は、見えなくても",
    "locationName": "ひだまりストア・閉店後／店先"
  },
  {
    "id": "yozora_affection_80_02_key",
    "title": "親愛Lv.84：行きたいって言ったら",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 9,
    "affectionSlot": "key2",
    "unlockLevel": 84,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_80_02_key.json",
    "version": "v039_157",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 84
    },
    "order": 3084,
    "summary": "80-2 行きたいって言ったら。場所：ひだまりストア・休憩室／店先。",
    "rawTitle": "行きたいって言ったら",
    "affectionLabel": "親愛Lv.84",
    "menuTitle": "親愛Lv.84：行きたいって言ったら",
    "locationName": "ひだまりストア・休憩室／店先"
  },
  {
    "id": "yozora_affection_80_03_key",
    "title": "親愛Lv.87：怖いけど、見たい",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 9,
    "affectionSlot": "key3",
    "unlockLevel": 87,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_80_03_key.json",
    "version": "v039_157",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 87
    },
    "order": 3087,
    "summary": "80-3 怖いけど、見たい。場所：双沢家・ツインルーム／ひだまりストア・店先。",
    "rawTitle": "怖いけど、見たい",
    "affectionLabel": "親愛Lv.87",
    "menuTitle": "親愛Lv.87：怖いけど、見たい",
    "locationName": "双沢家・ツインルーム／ひだまりストア・店先"
  },
  {
    "id": "yozora_affection_90_00_main",
    "title": "親愛Lv.90：本物の星を見る夜",
    "type": "main",
    "category": "character_main",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 9,
    "affectionSlot": "main",
    "unlockLevel": 90,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_90_00_main.json",
    "version": "v039_157",
    "unlock": {
      "type": "all_story_cleared",
      "storyIds": [
        "yozora_affection_80_00_main",
        "yozora_affection_80_01_key",
        "yozora_affection_80_02_key",
        "yozora_affection_80_03_key"
      ],
      "fallback": {
        "type": "affection_level",
        "character": "ai",
        "level": 90
      }
    },
    "order": 3090,
    "summary": "90-0 本物の星を見る夜。場所：羽白湖・夜。",
    "rawTitle": "本物の星を見る夜",
    "affectionLabel": "親愛Lv.90",
    "menuTitle": "親愛Lv.90：本物の星を見る夜",
    "locationName": "羽白湖・夜"
  },
  {
    "id": "yozora_affection_90_01_key",
    "title": "親愛Lv.91：夜のブックカフェ企画",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 10,
    "affectionSlot": "key1",
    "unlockLevel": 91,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_90_01_key.json",
    "version": "v039_157",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 91
    },
    "order": 3091,
    "summary": "90-1 夜のブックカフェ企画。場所：hidamari_store_breakroom。",
    "rawTitle": "夜のブックカフェ企画",
    "affectionLabel": "親愛Lv.91",
    "menuTitle": "親愛Lv.91：夜のブックカフェ企画",
    "locationName": "hidamari_store_breakroom"
  },
  {
    "id": "yozora_affection_90_02_key",
    "title": "親愛Lv.94：アントステラへ行こう",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 10,
    "affectionSlot": "key2",
    "unlockLevel": 94,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_90_02_key.json",
    "version": "v039_157",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 94
    },
    "order": 3094,
    "summary": "90-2 アントステラへ行こう。場所：hidamari_store_breakroom。",
    "rawTitle": "アントステラへ行こう",
    "affectionLabel": "親愛Lv.94",
    "menuTitle": "親愛Lv.94：アントステラへ行こう",
    "locationName": "hidamari_store_breakroom"
  },
  {
    "id": "yozora_affection_90_03_key",
    "title": "親愛Lv.97：二人だから、少し素直になる",
    "type": "key",
    "category": "character_key",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 10,
    "affectionSlot": "key3",
    "unlockLevel": 97,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_90_03_key.json",
    "version": "v039_157",
    "unlock": {
      "type": "affection_level",
      "character": "ai",
      "level": 97
    },
    "order": 3097,
    "summary": "90-3 二人だから、少し素直になる。場所：アントステラ2階・夜のブックカフェ。",
    "rawTitle": "二人だから、少し素直になる",
    "affectionLabel": "親愛Lv.97",
    "menuTitle": "親愛Lv.97：二人だから、少し素直になる",
    "locationName": "アントステラ2階・夜のブックカフェ"
  },
  {
    "id": "yozora_affection_100_00_main",
    "title": "親愛Lv.100：春の中で、ありがとう",
    "type": "main",
    "category": "character_main",
    "character": "ai",
    "route": "yozora",
    "affectionBlock": 10,
    "affectionSlot": "main",
    "unlockLevel": 100,
    "characters": [
      "ai",
      "ah"
    ],
    "characterNames": [
      "双沢 夜空",
      "双沢 美空"
    ],
    "scenario": "scenario/v039/events/yozora_affection_100_00_main.json",
    "version": "v039_157",
    "unlock": {
      "type": "all_story_cleared",
      "storyIds": [
        "yozora_affection_90_00_main",
        "yozora_affection_90_01_key",
        "yozora_affection_90_02_key",
        "yozora_affection_90_03_key"
      ],
      "fallback": {
        "type": "affection_level",
        "character": "ai",
        "level": 100
      }
    },
    "order": 3100,
    "summary": "100-0 春の中で、ありがとう。場所：春待ち花畑・昼。",
    "rawTitle": "春の中で、ありがとう",
    "affectionLabel": "親愛Lv.100",
    "menuTitle": "親愛Lv.100：春の中で、ありがとう",
    "locationName": "春待ち花畑・昼"
  }
];
})();
