/* v039_151 story index: refresh Yozora 90-3 and 100 revised scenarios */
(function(){
  "use strict";
  window.TENOTSU_STORY_INDEX = [
    {
      id: "kogane_natsu_marinpia",
      title: "マリンピアの海中トンネル",
      type: "normal",
      category: "town_encounter",
      season: "summer",
      placeId: "marinpia_aqua_tunnel",
      placeName: "マリンピア・海中トンネル",
      characters: ["ad", "bc"],
      characterNames: ["小麦沢 こがね", "日向 なつ"],
      scenario: "scenario/v039/events/kogane_natsu_marinpia.json",
      version: "v039_105",
      unlock: { type: "always" },
      encounter: { enabled: true, staminaCost: 10, revealItem: "visitor_scope", seasonItem: "season_ticket" },
      order: 105,
      summary: "こがねとなつと一緒に、マリンピアの海中トンネルを見に行く夏の外回りイベント。"
    },
    {
      id: "sample_hina_kogane_new_juice_002",
      title: "事務所にて緋奈＆こがね：新作ジュースは何の味？",
      type: "normal",
      category: "office",
      placeId: "hidamari_office",
      placeName: "ひだまりストア・事務所",
      characters: ["aa", "ad", "ac"],
      characterNames: ["星野 緋奈", "小麦沢 こがね", "草壁 翠"],
      scenario: "scenario/v039/events/sample_hina_kogane_new_juice_002.json",
      version: "v039_106",
      unlock: { type: "always" },
      encounter: { enabled: false },
      order: 106,
      summary: "事務所の新作ジュースをきっかけに、緋奈が照れて、こがねが無邪気にかき回し、翠が締める日常会話。"
    },
    {
      id: "yozora_affection_00_01_key",
      title: "美空なら休憩室",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 1,
      affectionSlot: "key1",
      unlockLevel: 1,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_00_01_key.json",
      version: "v039_114",
      unlock: { type: "affection_level", character: "ai", level: 1 },
      order: 3001,
      summary: "夜空がまだ店長に距離を置き、自分ではなく美空を見てほしいと示す序盤キーストーリー。"
    },
    {
      id: "yozora_affection_00_02_key",
      title: "見てるだけ",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 1,
      affectionSlot: "key2",
      unlockLevel: 4,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_00_02_key.json",
      version: "v039_114",
      unlock: { type: "affection_level", character: "ai", level: 4 },
      order: 3002,
      summary: "美空の接客を夜空が横から自然にフォローし、自分は見ているだけだと距離を取る夜空キーシナリオ第2話。"
    },
    {
      id: "yozora_affection_00_03_key",
      title: "特別公演のチケット",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 1,
      affectionSlot: "key3",
      unlockLevel: 7,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_00_03_key.json",
      version: "v039_116",
      unlock: { type: "affection_level", character: "ai", level: 7 },
      order: 3003,
      summary: "星見ヶ丘プラネタリウムの特別公演を前に、夜空が美空の付き添いとして同行を決めるキーシナリオ第3話。"
    },
    {
      id: "yozora_affection_10_00_main",
      title: "余計なところまで見ないで",
      type: "main",
      category: "character_main",
      character: "ai",
      route: "yozora",
      affectionBlock: 1,
      affectionSlot: "main",
      unlockLevel: 10,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_10_00_main.json",
      version: "v039_116",
      unlock: {
        type: "all_story_cleared",
        storyIds: ["yozora_affection_00_01_key", "yozora_affection_00_02_key", "yozora_affection_00_03_key"],
        fallback: { type: "affection_level", character: "ai", level: 10 }
      },
      order: 3010,
      summary: "キー1-1〜1-3の伏線を受け、プラネタリウムで夜空が自分を見られることを意識し始めるメイン1。"
    }
    ,
    {
      id: "yozora_affection_10_01_key",
      title: "そういうの、気づかなくていい",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 2,
      affectionSlot: "key1",
      unlockLevel: 11,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_10_01_key.json",
      version: "v039_117",
      unlock: { type: "affection_level", character: "ai", level: 11 },
      order: 3011,
      summary: "プラネタリウム後、店長が夜空の細かな気遣いに気づき始め、夜空が『気づかなくていい』と拒むキーシナリオ。"
    },
    {
      id: "yozora_affection_10_02_key",
      title: "美空だけでいいでしょ",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 2,
      affectionSlot: "key2",
      unlockLevel: 14,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_10_02_key.json",
      version: "v039_117",
      unlock: { type: "affection_level", character: "ai", level: 14 },
      order: 3012,
      summary: "地域フェスの記念撮影で、夜空が見られる側になることや美空と比較されることを避けるキーシナリオ。"
    },
    {
      id: "yozora_affection_10_03_key",
      title: "気づかなくていい疲れ",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 2,
      affectionSlot: "key3",
      unlockLevel: 17,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_10_03_key.json",
      version: "v039_117",
      unlock: { type: "affection_level", character: "ai", level: 17 },
      order: 3013,
      summary: "閉店後の帰り道、夜空が美空の疲れには気づく一方、自分の寒さや疲れを見られることを嫌がるキーシナリオ。"
    },
    {
      id: "yozora_affection_20_00_main",
      title: "一歩後ろの夜空",
      type: "main",
      category: "character_main",
      character: "ai",
      route: "yozora",
      affectionBlock: 2,
      affectionSlot: "main",
      unlockLevel: 20,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_20_00_main.json",
      version: "v039_117",
      unlock: {
        type: "all_story_cleared",
        storyIds: ["yozora_affection_10_00_main", "yozora_affection_10_01_key", "yozora_affection_10_02_key", "yozora_affection_10_03_key"],
        fallback: { type: "affection_level", character: "ai", level: 20 }
      },
      order: 3020,
      summary: "潮見浜で、美空の一歩後ろにいる夜空の理由と、店長が夜空本人を見る違和感を掘り下げるメイン2。"
    }
    ,
    {
      id: "yozora_affection_20_01_key",
      title: "黒いリボン",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 3,
      affectionSlot: "key1",
      unlockLevel: 21,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_20_01_key.json",
      version: "v039_122",
      unlock: { type: "affection_level", character: "ai", level: 21 },
      order: 3021,
      summary: "夜空が黒いリボンを通して、美空が白なら自分は黒でいいと語り、白黒対比の原点に触れるキーシナリオ。"
    },
    {
      id: "yozora_affection_20_02_key",
      title: "夜空らしいって何",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 3,
      affectionSlot: "key2",
      unlockLevel: 24,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_20_02_key.json",
      version: "v039_122",
      unlock: { type: "affection_level", character: "ai", level: 24 },
      order: 3022,
      summary: "夜空が弓道を通して、反対を選んだだけなのか、それとも自分のものになっているのか揺れ始めるキーシナリオ。"
    },
    {
      id: "yozora_affection_20_03_key",
      title: "白と黒の飲み物",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 3,
      affectionSlot: "key3",
      unlockLevel: 27,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_20_03_key.json",
      version: "v039_122",
      unlock: { type: "affection_level", character: "ai", level: 27 },
      order: 3023,
      summary: "ブラックコーヒーとホットミルクを通じて、夜空が美空の反対を選ぶ癖と、同じものを選ぶ揺らぎを見せるキーシナリオ。"
    },
    {
      id: "yozora_affection_30_00_main",
      title: "白黒ツインルーム",
      type: "main",
      category: "character_main",
      character: "ai",
      route: "yozora",
      affectionBlock: 3,
      affectionSlot: "main",
      unlockLevel: 30,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_30_00_main.json",
      version: "v039_122",
      unlock: {
        type: "all_story_cleared",
        storyIds: ["yozora_affection_20_00_main", "yozora_affection_20_01_key", "yozora_affection_20_02_key", "yozora_affection_20_03_key"],
        fallback: { type: "affection_level", character: "ai", level: 30 }
      },
      order: 3030,
      summary: "双沢姉妹の白黒ツインルームで、夜空が美空の反対を選んできた自分と、それでも自分のものになったものへ向き合うメイン3。"
    }
    ,
    {
      id: "yozora_affection_30_01_key",
      title: "美空が褒められるのは嬉しい",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 4,
      affectionSlot: "key1",
      unlockLevel: 31,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_30_01_key.json",
      version: "v039_124",
      unlock: { type: "affection_level", character: "ai", level: 31 },
      order: 3031,
      summary: "美空が常連客に褒められ、夜空が嬉しさと小さな痛みの両方を抱くキーシナリオ。"
    },
    {
      id: "yozora_affection_30_02_key",
      title: "美空の剣道の方がわかりやすい",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 4,
      affectionSlot: "key2",
      unlockLevel: 34,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_30_02_key.json",
      version: "v039_124",
      unlock: { type: "affection_level", character: "ai", level: 34 },
      order: 3032,
      summary: "夜空の弓道をめぐり、美空の剣道への尊敬と自分が見られることへの抵抗を描くキーシナリオ。"
    },
    {
      id: "yozora_affection_30_03_key",
      title: "別にいい",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 4,
      affectionSlot: "key3",
      unlockLevel: 37,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_30_03_key.json",
      version: "v039_124",
      unlock: { type: "affection_level", character: "ai", level: 37 },
      order: 3033,
      summary: "夜空が接客で成果を出すが、話題が美空に流れることで嬉しさと痛みが混ざるキーシナリオ。"
    },
    {
      id: "yozora_affection_40_00_main",
      title: "嬉しいのに、苦しい",
      type: "main",
      category: "character_main",
      character: "ai",
      route: "yozora",
      affectionBlock: 4,
      affectionSlot: "main",
      unlockLevel: 40,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_40_00_main.json",
      version: "v039_124",
      unlock: {
        type: "all_story_cleared",
        storyIds: ["yozora_affection_30_00_main", "yozora_affection_30_01_key", "yozora_affection_30_02_key", "yozora_affection_30_03_key"],
        fallback: { type: "affection_level", character: "ai", level: 40 }
      },
      order: 3040,
      summary: "武道イベントで、美空の華やかな剣道と夜空の静かな弓道を対比し、夜空が嬉しいのに苦しい感情を漏らすメイン4。"
    },
    {
      id: "yozora_affection_40_01_key",
      title: "少し一人にして",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 5,
      affectionSlot: "key1",
      unlockLevel: 41,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_40_01_key.json",
      version: "v039_145",
      unlock: { type: "affection_level", character: "ai", level: 41 },
      order: 3041,
      summary: "メイン40で自分の矛盾した感情を漏らした夜空が、店長と美空の視線を避け始める。店長を美空へ押し返し、「少し一人にして」と告げて運動公園方面へ向かう。"
    },
    {
      id: "yozora_affection_40_02_key",
      title: "夜空の行きそうな場所",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 5,
      affectionSlot: "key2",
      unlockLevel: 44,
      characters: ["ai"],
      characterNames: ["双沢 夜空"],
      scenario: "scenario/v039/events/yozora_affection_40_02_key.json",
      version: "v039_145",
      unlock: { type: "affection_level", character: "ai", level: 44 },
      order: 3042,
      summary: "夜空が戻らず、店長が探しに行く。美空は通話・メッセージのみで登場し、店長は駅前ではなく運動公園、そして海沿いのみなと公園方面へ向かう。"
    },
    {
      id: "yozora_affection_40_03_key",
      title: "見つけないで",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 5,
      affectionSlot: "key3",
      unlockLevel: 47,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_40_03_key.json",
      version: "v039_145",
      unlock: { type: "affection_level", character: "ai", level: 47 },
      order: 3043,
      summary: "夜のみなと公園で店長が夜空を見つける。夜空は美空への羨望や黒い感情を漏らし、それを認めた自己嫌悪からパニックになって夕凪展望台へ逃げる。"
    },
    {
      id: "yozora_affection_50_00_main",
      title: "夜空のままで",
      type: "main",
      category: "character_main",
      character: "ai",
      route: "yozora",
      affectionBlock: 5,
      affectionSlot: "main",
      unlockLevel: 50,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_50_00_main.json",
      version: "v039_145",
      unlock: {
        type: "all_story_cleared",
        storyIds: ["yozora_affection_40_00_main", "yozora_affection_40_01_key", "yozora_affection_40_02_key", "yozora_affection_40_03_key"],
        fallback: { type: "affection_level", character: "ai", level: 50 }
      },
      order: 3050,
      summary: "キー5-3で逃走した夜空は夕凪展望台へ逃げ込む。店長に追いつかれて本爆発し、拒絶の勢いで店長を突き飛ばしてしまう。事故後に大声で泣き切り、本音を吐露し、店長から「いつもの夜空のままで」と受け止められて帰る。"
    },
    {
          "id": "yozora_affection_50_01_key",
          "title": "店長、大丈夫？",
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
          "version": "v039_145",
          "unlock": {
                "type": "affection_level",
                "character": "ai",
                "level": 51
          },
          "order": 3051,
          "summary": "メイン50翌日、夜空は店長の怪我を何度も確認し、美空には心配させたことを謝る。"
    },
    {
          "id": "yozora_affection_50_02_key",
          "title": "一生面倒見るって、どういう意味",
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
          "version": "v039_145",
          "unlock": {
                "type": "affection_level",
                "character": "ai",
                "level": 54
          },
          "order": 3052,
          "summary": "夜空は店長の怪我を心配しすぎて「一生面倒を見る」と口走り、遅れて意味を理解してパニックになる。"
    },
    {
          "id": "yozora_affection_50_03_key",
          "title": "店長のあったかさ",
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
          "version": "v039_145",
          "unlock": {
                "type": "affection_level",
                "character": "ai",
                "level": 57
          },
          "order": 3053,
          "summary": "夜空は美空との会話の中で、店長のあたたかさが美空に少し似ていることに気づく。"
    },
    {
          "id": "yozora_affection_60_00_main",
          "title": "忘れて、でも忘れないで",
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
          "version": "v039_145",
          "unlock": {
                "type": "all_story_cleared",
                "storyIds": [
                      "yozora_affection_50_00_main",
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
          "summary": "夜空は「いつもの夜空のままで」の意味を考え直し、後半で店長の袖をつまむCG見せ場を経て、店長を道しるべのようだと伝える。"
    },
{
    "id": "yozora_affection_60_01_key",
    "title": "昨日のことは見ないで",
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
    "version": "v039_126",
    "unlock": {
        "type": "affection_level",
        "character": "ai",
        "level": 61
    },
    "order": 3071,
    "summary": "メイン60翌日。夜空は店長にすべて見られた恥ずかしさと気まずさで目を合わせられない。「忘れて。でも忘れないで」と矛盾した気持ちを見せる。"
},
{
    "id": "yozora_affection_60_02_key",
    "title": "謝りたいけど言えない",
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
    "version": "v039_126",
    "unlock": {
        "type": "affection_level",
        "character": "ai",
        "level": 64
    },
    "order": 3072,
    "summary": "夜空は店長に謝りたいが、何度も言葉が詰まる。美空に背中を押され、ようやく「昨日は言いすぎた」「ごめん」と言える。"
},
{
    "id": "yozora_affection_60_03_key",
    "title": "ありがとう、の手前",
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
    "version": "v039_126",
    "unlock": {
        "type": "affection_level",
        "character": "ai",
        "level": 67
    },
    "order": 3073,
    "summary": "夜空は「探してくれて」「見つけてくれて」「帰らないでいてくれて」への感謝を伝えようとするが、まだ「ありがとう」と言い切れない。店長は無理に引き出さず、「聞こえかけたことにしておく」と受け止める。"
},
{
    "id": "yozora_affection_70_00_main",
    "title": "忘れて、でも忘れないで",
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
    "version": "v039_126",
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
    "summary": "夜空は店長に、メイン60で感情をぶつけたことを謝り、探してくれたこと・見つけてくれたこと・帰らないでいてくれたことへの感謝を伝える。「忘れて。でも忘れないで」という矛盾した気持ちを、店長は「しまっておく」と受け止める。"
},
{
    "id": "yozora_affection_70_01_key",
    "title": "ちゃんと謝りたい",
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
    "version": "v039_145",
    "unlock": {
        "type": "affection_level",
        "character": "ai",
        "level": 71
    },
    "order": 3081,
    "summary": "夜空が美空へ改めて謝りたいと思い始め、まだ核心までは言えないが、心配させたことや抱え込んだことを謝る。"
},
{
    "id": "yozora_affection_70_02_key",
    "title": "言えなかったこと",
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
    "version": "v039_145",
    "unlock": {
        "type": "affection_level",
        "character": "ai",
        "level": 74
    },
    "order": 3082,
    "summary": "夜空は美空が悪いわけではないとわかっているのに苦しかったこと、大好きなのに羨ましかったことを打ち明ける。"
},
{
    "id": "yozora_affection_70_03_key",
    "title": "帰ったら、好きなものの話をしよう",
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
    "version": "v039_145",
    "unlock": {
        "type": "affection_level",
        "character": "ai",
        "level": 77
    },
    "order": 3083,
    "summary": "核心を話した後の気まずさを残しつつ、美空は『帰ったら、好きなものの話をしよう』と誘う。"
},
{
    "id": "yozora_affection_80_00_main",
    "title": "一緒だね",
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
    "version": "v039_145",
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
    "summary": "美空と夜空が双沢家のツインルームで二人だけの時間を過ごし、互いの影響で好きになったものも自分の好きでいいと確認する。"
},
{
    "id": "yozora_affection_80_01_key",
    "title": "本物の星の話",
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
    "version": "v039_146",
    "unlock": {
        "type": "affection_level",
        "character": "ai",
        "level": 81
    },
    "order": 3091,
    "summary": "夜空は羽白湖の星空観察会のチラシを見つける。最初は「美空が好きそうだから」とごまかすが、美空と店長に促されて「少しだけ、見たい」と自分自身の希望を口にする。"
},
{
    "id": "yozora_affection_80_02_key",
    "title": "自分のための準備",
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
    "version": "v039_146",
    "unlock": {
        "type": "affection_level",
        "character": "ai",
        "level": 84
    },
    "order": 3092,
    "summary": "夜空は羽白湖の星空観察会に向けて準備をする中で、黒い手袋や小さなライトを「ぼくが星を見るために」選ぶ。「黒でいい」ではなく「黒がいい」と言えたことも成長点。"
},
{
    "id": "yozora_affection_80_03_key",
    "title": "楽しみなのが、少し怖い",
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
    "version": "v039_146",
    "unlock": {
        "type": "affection_level",
        "character": "ai",
        "level": 87
    },
    "order": 3093,
    "summary": "羽白湖の星空観察会前夜〜当日の移動前。夜空は「自分が楽しみにしていることが怖い」と認める。美空はそれを否定せず、「見えなかったら一緒にがっかりする、見えたら一緒に嬉しい」と受け止める。"
},
{
    "id": "yozora_affection_90_00_main",
    "title": "羽白湖・本物の星を見る夜",
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
    "version": "v039_146",
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
    "summary": "羽白湖で本物の星を見ながら、夜空は「美空のためだけではなく、自分が見たかった」と認める。黒い手袋や星、弓道、ココアなど、かつて“美空の反対”として選んできたものを、今の自分が選び直していいのだと気づく。"
},
{
  "id": "yozora_affection_90_01_key",
  "title": "夜のブックカフェ企画",
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
  "version": "v039_150",
  "unlock": {
    "type": "affection_level",
    "character": "ai",
    "level": 91
  },
  "order": 3101,
  "summary": "美空がアントステラ2階の夜のブックカフェ企画を見つけ、夜空が静かな本とあたたかい場所に興味を持つ。"
},
{
  "id": "yozora_affection_90_02_key",
  "title": "アントステラへ行こう",
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
  "version": "v039_150",
  "unlock": {
    "type": "affection_level",
    "character": "ai",
    "level": 94
  },
  "order": 3102,
  "summary": "夜空がアントステラへ店長と行く意思を固め、予約まで進む。"
},
{
  "id": "yozora_affection_90_03_key",
  "title": "二人だから、少し素直になる",
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
  "version": "v039_151",
  "unlock": {
    "type": "affection_level",
    "character": "ai",
    "level": 97
  },
  "order": 3103,
  "summary": "夜空は店長とアントステラ2階の夜のブックカフェへ行き、赤いカップルシートで近距離に動揺しながらも、いつもありがとうまで伝える。"
},
{
  "id": "yozora_affection_100_00_main",
  "title": "春の中で、ありがとう",
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
  "version": "v039_151",
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
  "summary": "夜空が春待ち花畑で白いワンピースと花冠姿になり、店長に「ありがとう。私を見つけてくれて」と伝える。"
}

  ];
})();
