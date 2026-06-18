# Christmas at the Princess — design inspiration notes

Source: official site screenshots (`ChristmasAtThePrincessWebsiteScreenshots.pdf`, captured 2026-06-17). Reference for styling our TicketSpice ticket page to feel on-brand. Vibe in one line: **elegant luxury-resort holiday** — cream + deep red + gold, ornate script + refined serif, full-bleed dark photo/video sections, subtle sparkle ambiance.

## 🎯 The logo (Mat's question)
- It's a **circular red badge / crest** — deep maroon disc with ornate white lettering "CHRISTMAS AT THE PRINCESS" in a vintage script-serif, ribbon banner across the middle.
- Sits **top-left over a TRANSPARENT nav, on the dark video hero** — there is **no solid colored nav bar**. The whole header floats over the hero.
- It's a badge, not a wordmark, so it's shown fairly large (≈90–110px tall), not a thin 40px strip.
- **Implication for our page:** our current build has a solid red nav bar + 40px logo — wrong. Switch to a transparent header over the video hero, logo top-left at ~90–100px.

## 🎨 Palette
- Deep maroon/red `#671416`–`#801517` (primary), bright accent red `#c82844`/`#B91F31` (CTAs, calendar)
- Warm cream/off-white background `~#f5f0ec` (content sections)
- Gold accents (award seals, fine rules) — `~#c9a24b`
- White text on dark photo/video sections
- Muted & sophisticated, NOT bright/loud.

## ✍️ Typography — the signature (our biggest brand gap)
The whole identity is the type. Three tiers:
1. **Ornate script/cursive** for big display moments: "Home for the Holidays", "Arizona's Treasured", "Starlights", "Festivities", "The Grandest of Holidays Awaits". A flowing formal calligraphy (Pinyon Script / Allura / Tangerine family).
2. **Refined high-contrast serif** for section headings + lead paragraphs: "Our Favorite Christmas Tradition by Far", "The North Pole's Sister City", the welcome paragraph. (Playfair Display / Cormorant family.)
3. **Thin, widely letter-spaced UPPERCASE sans** for eyebrows/labels/stats: "WELCOME TO…", "FEATURED ACTIVITIES", "16 YEARS OF TRADITION", "16 MILLION LIGHTS".
> Our current page uses Josefin Sans (geometric) — replace with script-display + serif-heading + tracked-caps-eyebrow to match.

## 🧩 Layout patterns worth stealing
- **Transparent nav over video hero**, centered links separated by ❄ snowflakes, red pill "BOOK YOUR EXPERIENCE" top-right, logo top-left.
- **Eyebrow → script headline** combo everywhere (tracked-caps label above a big script line).
- **Thin vertical connector line dropping from the hero headline**, ending in a small snowflake/firework ornament.
- **Stats band** — "The Grandest of Holidays Awaits" over a dark photo, then an elegant grid of tracked-caps stats (16M lights · 128 fire tables & igloos · 2 Santa experiences · 120ft Ferris wheel · 6,000 sq ft ice rink · 65 acres…). High wow-factor, easy to replicate.
- **Numbered carousel** (01 / 02 with a thin rule) for featured activities, ← → arrows, red pill "VIEW ALL".
- **Award badges** — Newsweek "Best Christmas Lights 2024 Readers' Choice" gold seal + AAA Five Diamond. Strong social proof to drop on our page.
- **Alternating sections**: cream content ↔ full-bleed dark photo/video.
- **Resort map with pins** + a filter list (Family-Friendly / Food & Drinks / Rides / VIP) — and a cute "102°F Scottsdale / 69°F North Pole" temp gimmick.
- **Collage/Instagram gallery** ("Festivities", @ATTHEPRINCESS) — overlapping photos.
- **Red pill CTAs**, uppercase + letter-spaced.

## ✨ Ambiance
- Subtle floating sparkle/bokeh particles over dark sections.
- Faint snowflake watermarks in cream sections.
- ❄ used as a bullet/separator throughout.
- Gold fine-line rules + ornament endpoints.

## 🛠️ Implementation priority for OUR ticket page (highest brand-impact first)
1. **Typography swap** (script display + serif headings + tracked-caps eyebrows) — biggest single win.
2. **Transparent nav over the video hero + big top-left badge logo** (fixes the logo question + the nav).
3. **Cream palette + alternating dark/cream sections.**
4. **Eyebrow→script section headers** on our phase/ticket/date sections.
5. **Stats band** (lights/fire tables/acres/ice rink) — easy, high wow.
6. **Award badges** (Newsweek + AAA Five Diamond) for social proof.
7. **Red pill CTAs**, uppercase + tracked, with ❄ accents + thin connector lines.
8. Nice-to-have later: numbered-carousel treatment, sparkle particles, the temp gimmick.

_Notes by Crowdly, 2026-06-17._
