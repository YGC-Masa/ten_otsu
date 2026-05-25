# v038_25 → v038_26 menu flicker / z-index fix 差分

## 修正内容
- 事務所スロット点滅時に一瞬出る旧ピンク右メニューを抑止。
- #list-panel / #menu-panel / 旧menu系DOMを強制非表示。
- 旧メニューDOMが後からstyle/class変更で復活しても即時隠す限定Observerを追加。
- テキストサーフェス #dialogue-box を z-index 2200 へ上げ、キャラクターより前面化。
- showList/showlist/showMenuList系をsurface takeover中はno-op化。

リポジトリ直下へ展開して上書きしてください。
