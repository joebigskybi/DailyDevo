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

- **Today** — a full-screen swipe feed served from a shuffled deck of all
  content (100 scriptures, 36 devotionals, 60 quotes, 24 classic hymns,
  24 quotes for men/husbands/fathers, 24 for women/wives/mothers). No
  repeats until the whole library
  has cycled, then it reshuffles. If your last journal entry had a
  commitment, the app asks whether you did it before anything else, then
  asks what you'd like next — the shuffle, a theme (peace, courage,
  hope...), the men's stream, or Advent.
- **Themes** — the ✦ Themes button (or the post-commitment chooser) serves
  a single theme. Each theme deck remembers your position, so you resume
  where you left off.
- **Advent** — a 24-day sequential series (Day 1 → 24) with its own look;
  the app saves which day you're on so you can pick it back up anytime.
  Kept out of the daily shuffle.
- **Morning & Evening** — Charles Spurgeon's classic 1865 daily devotional
  (public domain), all 366 days with both readings. Pick it in the Themes
  sheet and it serves today's reading automatically — morning entry before
  5pm, evening after — then the other half and following days as you
  swipe. Text lazy-loads (`spurgeon-me.js`, ~1.4 MB) on first use and is
  precached for offline. Source text via the public-domain dataset in
  github.com/russianryebread/morning-and-evening.
- **Journal** — write a prayer, tap a mood (5-point emoji scale), pick an
  optional feeling word, and commit to one thing.
- **History** — every entry with mood, prayer, and commitment status
  (✓ kept / ✗ missed / ◦ open), plus entry count, day streak, and
  commitments kept.

## Background music

The ♫ button in the feed header opens a style picker: Gentle Piano, Quiet
Guitar, Piano & Strings, or Lofi Focus. Tracks are original instrumental
loops composed and synthesized specifically for this app (`music/`), so
there are no third-party rights or attribution requirements. The choice
persists, and music resumes on your first tap the next time you open the
app (browsers require a tap before audio can start). Replace or add MP3s
in `music/` and update the `MUSIC` map in `index.html` to change the
lineup.

## Editing content

All content lives in `content.js` — plain JavaScript arrays of scriptures,
devotionals, and quotes. Add or edit items (each needs a unique `id`), and
the app rebuilds its shuffle deck automatically. After changing any file,
bump `CACHE_VERSION` in `sw.js` **and** the matching `content.js?v=` query
in `index.html` (keep the two numbers in sync) so installed phones pick up
the update as one unit.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole app — UI, journal, deck logic (no build step) |
| `content.js` | Content library (scriptures, devotionals, quotes) |
| `manifest.webmanifest` | PWA manifest (standalone display, icons) |
| `sw.js` | Service worker — precaches everything for offline use |
| `icons/` | App icons |
