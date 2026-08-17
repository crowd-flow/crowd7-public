# Warm Belly Farm — Cottage Grove home (WordPress/**Avada** Hybrid page)

First Crowd7 **Avada** website-hybrid page — same pattern as the four Colony Acres pages
(WordPress/Divi), the Arch Webflow hybrid, and the TicketSpice hybrid loader: the live
WordPress page holds only a thin loader; the real content lives here and updates by `git push`.

**Page:** `https://warmbelly.farm/cottage-grove/` (the Cottage Grove location home, `post-31`)
**Stack:** WordPress 7.0.2 multisite (`sites/2`), Avada + Avada-Child-Theme, Fusion Builder
**Status:** guts built + pushed 2026-08-17. **Loader install requires a TWO-PLACE split** — see below.

## 🚨 This is a WP multisite — the loader cannot be pasted in one place

First install attempt (2026-08-17) rendered the loader's comments and raw JS as visible text on
the live homepage and injected nothing. Cause: WordPress multisite revokes the `unfiltered_html`
capability from every role except Super Admin, so `kses` strips `<script>` tags (and HTML
comments) out of page content on save. The host `<div>` survives; the script does not.

Install is therefore: **host `<div>` in the Avada Code element + loader JS in Avada's
before-`</body>` theme-options code field.** Full write-up, forensics table and the two
paste-ready files live in the private repo at
`crowd7/data/clients/warm-belly-farm/design/website-loaders/README.install.md`; the reusable
lesson is `crowd7/data/clients/_patterns/wordpress-multisite-kses-script-stripping.md`.

Verified headless 2026-08-17 with the split install against the live CDN URL: 32,760 bytes
injected, 4/4 sections, all four tagged legacy containers hidden, no raw JS text, 0 console errors.

## How it works

- **`cottage-grove-home.wordpress-embed-loader.html`** — lives in the **private** `crowd7` repo at
  `data/clients/warm-belly-farm/design/website-loaders/` (loaders are internal IP — see
  `crowd7/data/clients/_patterns/loader-storage.md`). Paste ONCE into an Avada **Code** element
  that replaces this page's builder content. It `fetch`es the guts and injects them inline.
  Never needs editing again.
- **`production/cottage-grove-home.html`** — the live guts (content block only, no `<html>` wrapper).
- **`preview/cottage-grove-home.html`** — staging guts. Load the page with `?preview=1` to see these.
- **`*.preview.html`** — standalone browser preview (`open` it) to eyeball without the Avada chrome.

## ⚠️ Avada differs from Divi — no theme CSS is inlined here, deliberately

The Colony Acres guts must carry a big inlined theme-CSS block because **Divi emits its core
layout CSS as inline `<style>` blocks in the head**, so replacing builder content loses it and
every page renders flat.

**Avada is the opposite and needs no such block.** Verified 2026-08-17 against the live
compiled stylesheet:

- Per-element styling rides on ~**400 inline `--awb-*` custom properties** on the elements themselves.
- The generic rules that *consume* those vars (`.fusion-flex-column`, `.fusion-title`,
  `.fusion-button`, `.fullwidth-box`) live in the site's compiled
  `content/uploads/sites/2/fusion-styles/_blog-2-*.min.css`, which **stays loaded on the live page**.
- The 32 page-scoped numbered classes (`.fusion-builder-column-4`, `.fusion-title-1`, `.button-1`, …)
  have **ZERO rules** in that compiled stylesheet — they are only hooks.

So there is no page-scoped CSS to lose when the builder content is replaced, and these guts
self-style on the live page. If Avada is ever swapped or its Global Options change materially,
re-verify that claim rather than assuming it still holds.

## Content provenance (2026-08-17)

Captured from a full browser save of the live page, extracted verbatim from the `.post-content`
inner HTML — 4 `fusion-fullwidth` sections, 70 balanced divs, 29,137 bytes. Contains **no
`<script>`, no `<form>`, and no slider / Gravity Forms / booking widgets**; those all live in the
Avada theme chrome outside `.post-content`, so nothing needs script rehydration.

Sections: hero copy band · Full Harvest + Garden Center cards · Hydroponic Strawberry Picking +
Events & Rentals cards · "Meet the Warm Belly Family" band.

Rendered check (headless Chromium, 2026-08-17): 4/4 sections, **0 console errors**, correct
mobile reflow at 390px.

### 🐛 Known content bug carried over verbatim

The Strawberry Picking card's "Learn More" points at
`…/strawberry-picking-cottage-grove-**2025**` while the two sibling CTAs on the same card point at
`-2026`. Mirrored as-is so this capture is faithful. **Fix it here as the first real edit.**

### 🎟️ Why this page matters for the flash sale

The guts hold the Full Harvest ticketing CTAs (`warmbellyfarm.ticketspice.com/full-harvest-2026`).
The 8/14 flash-sale call asked for every Buy Tickets link to swap to the sign-up popup and then to
the live TS link at launch. Once the loader is installed, that swap is a one-line edit here plus a
push — not a WordPress editing session.

## Edit loop (autonomous — no WordPress editor, once installed)

1. Edit `preview/cottage-grove-home.html`; `open preview/cottage-grove-home.preview.html` to check.
2. Promote: `cp preview/cottage-grove-home.html production/cottage-grove-home.html`
   (+ rebuild `production/cottage-grove-home.preview.html`)
3. `git push` — live within ~5 min (raw.githubusercontent CDN).

## Raw URLs

- production: https://raw.githubusercontent.com/crowd-flow/crowd7-public/master/clients/warm-belly-farm/design/website-pages/cottage-grove-home/production/cottage-grove-home.html
- preview: https://raw.githubusercontent.com/crowd-flow/crowd7-public/master/clients/warm-belly-farm/design/website-pages/cottage-grove-home/preview/cottage-grove-home.html
