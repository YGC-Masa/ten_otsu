/* v039_115 key/main story config scaffold */
(function(){
  "use strict";
  const empty = function(name, title){ return { characterName: name, requiredStories: [], slotStories: {}, completeReward: { title } }; };
  window.TENOTSU_KEY_STORY_CONFIG = {
    aa: empty("星野 緋奈", "緋奈との絆"),
    ab: empty("速水川 藍", "藍との絆"),
    ac: empty("草壁 翠", "翠との絆"),
    ad: empty("小麦沢 こがね", "こがねとの絆"),
    ae: empty("春日原 琥珀", "琥珀との絆"),
    af: empty("大道寺 真花", "真花との絆"),
    ag: empty("氷神 雪乃", "雪乃との絆"),
    ah: empty("双沢 美空", "美空との絆"),
    ai: {
      characterName: "双沢 夜空",
      requiredStories: ["yozora_affection_00_01_key", "yozora_affection_00_02_key", "yozora_affection_00_03_key"],
      slotStories: {
        b1_key1: "yozora_affection_00_01_key",
        b1_key2: "yozora_affection_00_02_key",
        b1_key3: "yozora_affection_00_03_key",
        b1_main: "yozora_affection_10_00_main"
      },
      completeReward: { title: "夜空との絆" }
    },
    aj: empty("芝桜 桃", "桃との絆"),
    ak: empty("紫藤 彩愛", "彩愛との絆"),
    al: empty("餅月 里美", "里美との絆"),
    am: empty("草壁 萌", "萌との絆"),
    ba: empty("天神 小春", "小春との因縁"),
    bb: empty("霧島 真冬", "真冬との信頼"),
    bc: empty("日向 なつ", "なつとの縁")
  };
})();
