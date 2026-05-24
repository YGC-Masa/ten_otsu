# v038_17 verification summary

## Repeated checks

- JS/JSON static validation: OK / 10 runs
- Local HTTP asset serving: NG / 5 runs
- Real browser operation test: not completed in this environment

## Browser limitation

Chromium in this environment either blocked localhost navigation with `ERR_BLOCKED_BY_ADMINISTRATOR` or crashed during headless GPU startup.  
Therefore I cannot honestly claim full browser interaction passed here.

## Heuristic checks

```json
{
  "surfaceManager_loaded_in_index": true,
  "surfaceManager_css_loaded_in_index": true,
  "no_mutation_observer_in_surfaceManager": true,
  "new_main_menu_used": true,
  "old_list_panel_hidden": true,
  "safe_fade_present": true,
  "front_character_layer_present": true,
  "operation_surface_present": true
}
```

## Intended user-side verification path

1. Start page.
2. Confirm office background `bg_office_hidamari.png`.
3. Confirm new right menu `#tenotsu-main-menu`.
4. Confirm front characters in `#tenotsu-front-character-layer`.
5. Click ショップ.
6. Confirm exchange background and shop panel.
7. Click 事務所に戻る.
8. Confirm office returns without old pink menu.
9. Click 店舗営業.
10. Confirm battle root opens and 戻る returns to office.

