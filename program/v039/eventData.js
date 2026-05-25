/* v039_15 event data */
(function(){
  "use strict";
  const ns = window.TENOTSU_V039;

  ns.seasonOrder = ["spring", "summer", "autumn", "winter"];

  ns.seasonEvents = {
    spring: {
      id: "spring",
      label: "春",
      catchcopy: "桜、読書、お弁当。穏やかな出会いの季節。",
      bg: "images/assets/bgev/bg_park_spring.png",
      color: "#f7adc3",
      events: [
        {
          id: "ai_spring_book_bread",
          scenario: "scenario/v039/events/ai_spring_book_bread.json",
          title: "桜と読書とパン",
          character: "速水川 藍",
          place: "若葉中央公園",
          status: "接続予定",
          bg: "images/assets/bgev/bg_park_spring.png",
          cg: "images/assets/bgev/bg_memory_ai_spring_book_bread_share.png",
          summary: "桜の木陰で読書する藍ちゃんと、パンを半分こする春イベント。",
          startMessage: "若葉中央公園へ向かいます。桜の木陰で読書する藍ちゃんに声をかけるイベントを、storyPlayerへ接続予定です。"
        },
        {
          id: "hina_spring_bento",
          scenario: "scenario/v039/events/hina_spring_bento.json",
          title: "春のお弁当日和",
          character: "星野 緋奈",
          place: "若葉中央公園",
          status: "接続予定",
          bg: "images/assets/bgev/bg_park_spring.png",
          cg: "images/assets/bgev/bg_memory_hina_spring_bento.png",
          summary: "緋奈と春の公園でお弁当を食べる、明るく距離の近い日常イベント。",
          startMessage: "緋奈のお弁当イベントは、立ち姿とイベントCGを使った春シナリオとして接続予定です。"
        }
      ]
    },
    summer: {
      id: "summer",
      label: "夏",
      catchcopy: "海、展示、涼しさ。にぎやかな外回り。",
      bg: "images/assets/bgev/bg_park_summer.png",
      color: "#64c7ff",
      events: [
        {
          id: "kogane_natsu_marinpia",
          title: "マリンピアの海中トンネル",
          character: "小麦沢 こがね / 日向 なつ",
          place: "マリンピア",
          status: "構想中",
          bg: "images/assets/bgev/bg_beach.jpg",
          summary: "こがねとなつと一緒に、水槽の海中トンネル展示を見る夏イベント。",
          startMessage: "マリンピア系イベントは、夏の外回りイベントとして後続接続します。"
        }
      ]
    },
    autumn: {
      id: "autumn",
      label: "秋",
      catchcopy: "夕暮れ、占い、ハロウィン。少し不思議な季節。",
      bg: "images/assets/bgev/bg_park_autumn.png",
      color: "#f68b1f",
      events: [
        {
          id: "moe_autumn_tarot",
          title: "秋のタロット相談",
          character: "草壁 萌",
          place: "ひだまり商店街",
          status: "構想中",
          bg: "images/assets/bgev/bg_park_autumn.png",
          summary: "萌のタロット占いと、秋の商店街イベントを絡めた相談イベント。",
          startMessage: "萌の秋イベントは、タロットとハロウィン導線を組み合わせて接続予定です。"
        }
      ]
    },
    winter: {
      id: "winter",
      label: "冬",
      catchcopy: "静けさ、加湿、雪景色。落ち着いた時間。",
      bg: "images/assets/bgev/bg_park_winter.png",
      color: "#6495ED",
      events: [
        {
          id: "yozora_winter_walk",
          title: "冬空の帰り道",
          character: "双沢 夜空",
          place: "川沿いの遊歩道",
          status: "構想中",
          bg: "images/assets/bgev/bg_park_winter.png",
          summary: "寒い季節の帰り道で、夜空と静かに話す冬イベント。",
          startMessage: "夜空の冬イベントは、冬物・加湿導線と合わせて接続予定です。"
        },
        {
          id: "yukino_winter_sweets",
          title: "雪乃のお菓子作り",
          character: "氷神 雪乃",
          place: "ひだまりストア周辺",
          status: "構想中",
          bg: "images/assets/bgev/bg_park_winter.png",
          summary: "雪乃のお菓子作りと冬の差し入れをテーマにしたイベント。",
          startMessage: "雪乃の冬イベントは、調理器具とお菓子作りの導線で接続予定です。"
        }
      ]
    }
  };

  ns.getSeason = function getSeason(seasonId) {
    return ns.seasonEvents && ns.seasonEvents[seasonId] ? ns.seasonEvents[seasonId] : null;
  };

  ns.getEventById = function getEventById(eventId) {
    for (const seasonId of ns.seasonOrder || []) {
      const season = ns.getSeason(seasonId);
      if (!season) continue;
      const found = (season.events || []).find((event) => event.id === eventId);
      if (found) return { season, event: found };
    }
    return null;
  };
})();
