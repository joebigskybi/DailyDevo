# DailyDevo

A moment with God instead of a scroll. Open the app and get a different
scripture (KJV), 60-second devotional, or quote every time — plus a prayer
journal with a daily mood check-in and a one-thing commitment the app
follows up on the next time you open it.

Everything runs on your phone: no server, no account, no tracking. Journal
entries live in your browser's local storage and the app works fully
offline after the first visit.

## Install on your phone

1. Enable GitHub Pages for this repo: **Settings → Pages → Deploy from a
   branch**, pick your branch and `/ (root)`, save. GitHub gives you a URL
   like `https://<user>.github.io/DailyDevo/`.
2. Open that URL on your phone.
3. **iPhone (Safari):** tap Share → *Add to Home Screen*.
   **Android (Chrome):** tap ⋮ → *Add to Home screen* / *Install app*.
4. Launch it from the home-screen icon — it opens fullscreen like a native
   app and works offline.

## How it works

- **Today** — serves the next card from a shuffled deck of all content
  (60 scriptures, 24 devotionals, 36 quotes). No repeats until the whole
  library has cycled, then it reshuffles. If your last journal entry had a
  commitment, the app asks whether you did it before anything else.
- **Journal** — write a prayer, tap a mood (5-point emoji scale), pick an
  optional feeling word, and commit to one thing.
- **History** — every entry with mood, prayer, and commitment status
  (✓ kept / ✗ missed / ◦ open), plus entry count, day streak, and
  commitments kept.

## Editing content

All content lives in `content.js` — plain JavaScript arrays of scriptures,
devotionals, and quotes. Add or edit items (each needs a unique `id`), and
the app rebuilds its shuffle deck automatically. After changing any file,
bump `CACHE_VERSION` in `sw.js` so installed phones pick up the update.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole app — UI, journal, deck logic (no build step) |
| `content.js` | Content library (scriptures, devotionals, quotes) |
| `manifest.webmanifest` | PWA manifest (standalone display, icons) |
| `sw.js` | Service worker — precaches everything for offline use |
| `icons/` | App icons |
