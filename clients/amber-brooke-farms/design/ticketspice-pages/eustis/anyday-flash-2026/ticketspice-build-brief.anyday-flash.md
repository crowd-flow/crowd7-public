# 🌾 TicketSpice Build Brief — Amber Brooke Farms (Eustis) · Any-Day GA Flash Sale 2026

**Page:** brand-new standalone flash-sale page (Bryan's explicit call — NOT a rework of the main Fall Festival page).
**Built by:** Crowdly · 2026-07-30
**Design donor:** Montpelier Fall Festival / Eckert's ticket-card template family, restyled to Amber Brooke's own brand system under a fresh `#abf-funnel` id.
**Content source:** `work/crowd7/projects/amber-brooke-campaign-brief/artifacts/source-sweep.md` (every fact sourced there — nothing here is invented) + `.../brand-palette.md`.

This brief covers the **native TicketSpice cart** (ticket type, price, caps, date rules, confirmation-email copy) — the part the hybrid loader does NOT own. The page content/design (banner, hero, blackout notice, benefits, ticket highlight, info row) ships from `crowd7-public` via **loader v8** (Cloudflare Pages primary, jsDelivr fallback) — see `code-snippets/ts-hybrid-loader-runbook.md` § "The canonical loader (v8...)".

## ⚠️ CONFIRM-BEFORE-PUBLISH (flagged, not invented — resolve before this goes live)

1. **Location — defaulted to Eustis.** Amber Brooke has two farms (Eustis, Williston). The Fall Festival copy says "near Orlando," which points to Eustis, but this is unconfirmed. Repo path and on-page address are both built against Eustis (`36111 County Rd 44A, Eustis, FL 32736`). If it's Williston or both farms, say so — the path move and address swap are quick, but must happen before publish.
2. **Go-live date — defaulted to July 31, flagged as unconfirmed.** Amanda said Thursday July 30 in the 7/28 transcript; Bryan said "tomorrow" in Slack on 7/30 (→ July 31). Built the page against Bryan's more-recent date since he's the one setting external expectations with Amanda and it postdates her transcript comment, but **this is a default, not a confirmed fact** — the banner and info-row both print "July 31 – August 4" and are a single find-and-replace (`<!-- GO-LIVE-DATE -->` markers in the content HTML) once confirmed either way.
3. **Messaging call — resolved as a build decision, not guessed.** Approved Any-Day GA is $19.95, identical to the non-peak online price — there is no headline discount to advertise. Built the page to lead on **flexibility + peak-adjacent access** ("Come Any Day You Like") rather than any "save $X" framing, per the source-sweep's explicit warning not to ship copy implying a discount that isn't there. No slash-through / compare-at pricing appears anywhere on this page (unlike the multi-tier templates it's based on) — that's deliberate, not an oversight. If Bryan/Caleb want a different angle (e.g. leading harder on "$5 less than peak gate"), that's a copy edit, not a rebuild.
4. **Peak-day capacity NOT on this page.** The garbled "68 per two-hour window" figure from the transcript is not referenced anywhere here — correctly omitted per the source-sweep's explicit flag not to publish it unverified. Not a blocker for this page; would only matter if a capacity/urgency line gets added later.

## 🎫 Native TicketSpice ticket type — Any-Day GA

| Ticket type | Online price | Caps | Valid days | Notes |
|---|---|---|---|---|
| **Any-Day General Admission** | **$19.95** | none specified — set per Bryan's cart build | Any regular-season day: Sept Sat/Sun · Oct Fri/Sat/Sun + Columbus Day Mon · Nov Sat/Sun | **Blackout: Oct 24, 25, 31 & Nov 1 — must be excluded from valid dates in the cart's date-picker/rules, not just on the page.** |

- **Season:** Sept 19 – Nov 22, 2026.
- **No gate price / no at-door option modeled** — this is an online flash-sale ticket type; if Bryan wants a gate-price fallback, that's an addition to this table, not assumed here.
- **Season passes are NOT part of this sale** — do not add pass ticket types to this cart. Caleb killed the season-pass flash-sale idea; keep this cart to the single Any-Day GA line.

## 🔴 Blackout-date configuration — the single highest-risk item on this build

Amanda's hard requirement, verbatim: blackout dates must be **"very clear on their confirmation email & ticket so we do not have any issues at the dates."**

- **Date-picker:** configure the Any-Day GA date-selection to exclude Oct 24, 25, 31 and Nov 1 entirely (not just display a warning — the guest should not be able to select those dates for this ticket type).
- **Ticket face:** blackout dates must print on the physical/digital ticket itself, not just the purchase page.
- **Confirmation email:** blackout dates must appear in the confirmation email copy, in clear language (not buried in fine print) — mirror the page's navy-on-wheat notice tone: "This ticket does not include October 24, 25, 31, or November 1."
- **Suggested confirmation-email line:** *"Your Any-Day GA ticket is valid any regular-season day this Fall — except October 24, 25, 31, and November 1, which are blackout dates for this ticket type. Please plan your visit around these dates."*

## 🎨 Design notes (content HTML, already built)

- Palette matches `amberbrookefarms.com` exactly: navy `#36578c` headlines/nav, terracotta `#c66a2b` for every buy/CTA button, sage `#5c7f71` as the ticket-card accent, cream `#f7f5e7` page field. Blackout notice uses **navy-on-wheat** (`#debc8c` background, navy border/text) — deliberately NOT terracotta, since terracotta already means "buy" on this brand.
- Typography: serif pairing (Playfair Display display / Lora body) to match the site's transitional-serif register. No exact brand fonts were supplied in the sweep — this is a reasonable placeholder, swappable at the `:root`-equivalent CSS variable block if Amanda/Caleb send brand type later.
- No photography in scope yet — page ships as a clean typographic/color-block design (no gallery marquee, no hero image) rather than placeholder gradients pretending to be photos. Add a real hero image later by swapping `.abf-hero`'s `background` to `background-image: url(...)`.
- Single-ticket-type layout (not a 3-card grid like the multi-tier templates this is based on) — matches the fact that this sale has exactly one product.

## 🔌 Hybrid-loader wiring — loader v8 (Cloudflare Pages primary)

This is a **new page**, so it is born on Cloudflare Pages — no jsDelivr, no migration, no `purge.sh`. Per `work/crowd7/TS-CDN-MIGRATION.md`, a push to `crowd7-public` IS the deploy (seconds, atomic).

Paste the v8 loader snippet (`code-snippets/ts-hybrid-loader-runbook.md` § "The canonical loader (v8...)") into the Any-Day Flash Sale TS page's Raw HTML block, editing only:

- `u3` → `'clients/amber-brooke-farms/design/'`
- `u4` → `'ticketspice-pages/eustis/anyday-flash-2026/'`
- `f`  → `'amber-brooke.anyday-flash-content'`

Then paste the floating "Buy Tickets" button block (bottom of the content HTML file) as a **separate** Custom HTML block on the same page.

**Verification — check the RIGHT surface:** confirm `assets.crowd7digital.us/clients/amber-brooke-farms/design/ticketspice-pages/eustis/anyday-flash-2026/preview/amber-brooke.anyday-flash-content.html` serves current content, **and** that the live TS page renders it. Checking the local file or `raw.githubusercontent.com` verifies the source, not the page. No `?c7rev=` needed — that escape hatch only matters for the jsDelivr fallback leg.

## ✅ Three artifacts (this build)

1. **Content HTML** — `preview/amber-brooke.anyday-flash-content.html` (loader fetches this)
2. **Standalone preview** — `preview/amber-brooke.anyday-flash-content-preview.html` (`open` in a browser for Mat/Bryan/Amanda to eyeball)
3. **This build brief** — `ticketspice-build-brief.anyday-flash.md`

## 📋 Pre-publish checklist

- [ ] Confirm location (Eustis vs Williston vs both) — item #1 above
- [ ] Confirm go-live date (July 31 vs July 30 vs other) — item #2 above, then find-and-replace the date spans
- [ ] Confirm messaging angle (flexibility-led, as built) is what Bryan/Caleb want — item #3 above
- [ ] Configure the Any-Day GA ticket type at $19.95 with the four blackout dates excluded from the date-picker
- [ ] Confirm blackout-date language lands on the ticket face + confirmation email (Amanda's hard requirement)
- [ ] Get Mat's/Bryan's eyes on the preview before promoting `preview/` → `production/`
- [ ] Promote to `production/`, push — no purge needed (Cloudflare Pages, born-on)
- [ ] Get the live TicketSpice page URL, paste the v8 loader snippet + floating-button block into its Raw HTML block(s)
- [ ] Verify against `assets.crowd7digital.us` (not just the local file) AND the live TS page render
- [ ] Add this page to the `TS-CDN-MIGRATION.md` ledger as **born-on-Cloudflare**

## 🗒 Open Items (for Mat / Bryan / Amanda)

1. Location confirm (Eustis default) — decides repo path + on-page address
2. Go-live date confirm (July 31 default) — decides banner/info-row date text
3. Messaging-angle sign-off (flexibility-led, no discount framing, as built)
4. Live TicketSpice page URL for the loader paste — not yet in hand; without it this stays a design artifact, not a shippable page
