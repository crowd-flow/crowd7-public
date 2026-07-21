# 🌻 Eckert's Sunflower Festival (Versailles) — TicketSpice Build Brief

**Page:** Eckert's Sunflower Festival — standalone rebranded event (NOT on the field-access page)
**Cloned from:** the Belleville sunflower-festival build (`work/crowd7/CLAUDE.md` § Ticket-page build workflow), per Mat's directive 2026-07-21. Exact clone — copy, location/language swap only. No ticket-structure, pricing, or date changes made; those still need Versailles-specific confirmation (see below).
**ClickUp:** fleet `86bb193q8` (workspace `90141379118`)
**Built by:** Crowdly · 2026-07-21
**Round 2 (2026-07-21):** Amanda feedback applied — dates corrected (page was a Belleville clone and carried Belleville's dates), mason jar lemonade converted to a non-alcoholic add-on (no boozy option for Versailles), truck photo removed from gallery, picnic basket removed entirely (not offered at Versailles). See "Round 2 changes" below.
**Design system:** standalone `#sf-funnel` sunflower-gold sub-brand (same as Belleville's build; Versailles reuses the identical CSS/layout system)
**CDN:** **Cloudflare Pages** (`assets.crowd7digital.us`) — this is a brand-new page, so it ships straight on the migrated path per `work/crowd7/TS-CDN-MIGRATION.md`. No jsDelivr, no `purge.sh` needed. A `git push` to `crowd7-public` is the full deploy.

This brief covers the **native TicketSpice cart** (ticket types, prices, caps, rules, Actions) — the part the hybrid loader does NOT own. The page content/design (hero, benefits band, gallery, ticket-card copy) ships from the repo via the loader; see `code-snippets/ts-hybrid-loader-runbook.md`.

## 🌻 Round 2 changes (2026-07-21, Amanda feedback)

1. **Dates corrected.** Belleville's cloned dates are gone. Real Versailles dates per Amanda:
   - **Flash Sale: Aug 14–17.**
   - **Festival: Aug 22–Sep 6** — this is the **TS-native ticket date window**; configure the TS event's buyable date range to match (see TS-native build notes below).
   - Updated everywhere on-page: top banner, info-row "Festival Dates" and "Sales Open" values, and the page's own header comment. There is no JS date-gate/popup on this page (unlike the CIJ popup elsewhere) — the flash-window enforcement is a **TS-native Action**, still open per item 3 below.
2. **Mason jar lemonade → add-on, non-alcoholic only, no boozy option for Versailles KY.** Removed the bundled "souvenir mason jar lemonade (boozy or non-alcoholic)" bullet from both the Flower Power Pass and Family & Friends cards, and from the benefits-band "Sips & Treats" copy. Added a standalone add-on card in the add-on strip: "Souvenir Mason Jar Lemonade," non-alcoholic, price shown as **TBD** — **this is a new TS-native cart add-on product that doesn't exist yet; needs a price from Amanda/Jill/Angie before it can be configured in TS.** Flagging an open judgment call: dropping this as a bundled tier perk without an offsetting price change means Flower Power Pass / Family & Friends are unchanged in price but now include one fewer perk — confirm with Amanda/Bryan whether tier pricing should move.
3. **Truck photo removed.** Both gallery instances of `red-truck-next-to-flower-field.jpg` (main card + marquee-loop duplicate) deleted from the gallery track.
4. **Picnic basket removed entirely.** The "Sunshine Picnic Basket" add-on card is gone from the page — Versailles does not offer it (Belleville may still).

## ⚠️ CONFIRM-BEFORE-PUBLISH — remaining items, NOT yet re-verified for Versailles

**This build started as a location/branding clone of the Belleville sunflower-festival page.** Round 2 above resolved the dates and the mason-jar/picnic-basket items. Still open before this page's cart goes live — confirm with Amanda/Bryan:

1. **Does Versailles run the same three-tier ticket structure** (General Admission / Flower Power Pass / Family & Friends) **at the same prices** as Belleville? Or does Versailles need its own package set (parallel to how Versailles' peach/apple field-access pricing already differs by location)?
2. ~~Festival dates~~ — **RESOLVED round 2**: Flash Sale Aug 14–17, Festival Aug 22–Sep 6.
3. **Flash-sale pricing** — no flash discount amount has been set for this package set yet. Needs sign-off via Jill/Angie for Versailles specifically, then a TS-native date-conditional Action for the Aug 14–17 window (see TS-native build notes below).
4. **Cut-Your-Own Sunflower Bouquet ($15, onsite-only)** — confirm this add-on applies at Versailles too, or if Versailles has a different onsite offer.
5. **NEW — Souvenir Mason Jar Lemonade add-on price** — needs sign-off (see Round 2 item 2 above) before it can be configured as a TS cart product.

## 🌻 What changed vs. the Belleville source (this build)

- **Hero image** — swapped from `family-pictures-sunflowers.jpg` to `sunflower-close-up.jpg` (both already in-repo at `clients/eckerts/design/assets/sunflowers/web/`) so the two location pages don't look identical. No Versailles-specific sunflower photography exists yet — when Amanda/the Versailles team supplies real photos, swap this placeholder the same way Belleville's brief flags its own pending-photo swap.
- **Every Belleville → Versailles reference** — banner ("Belleville Farm" → "Versailles Orchard"), nav location ("Belleville, IL" → "Versailles, KY"), hero eyebrow, and the info-row location value ("Eckert's Belleville Farm" → "Eckert's Versailles Orchard"), matching the naming convention already established on the live Versailles peaches page (`versailles/peaches/production/...peach-content.html`: "Eckert's Versailles Orchard," "Versailles, KY").
- **Everything else is an exact clone** — same ticket tiers, same prices, same festival-date copy, same gallery images, same layout/CSS, same add-on. These are flagged above as needing Versailles-specific confirmation, not silently assumed correct.

## 🎫 Native TicketSpice ticket types (round 2 — dates + mason jar/picnic basket corrected; pricing still CONFIRM before publish)

| Ticket type | Online price | Gate price | Includes | Flash (Aug 14–17) |
|---|---|---|---|---|
| **General Admission** | **$12.99** | **$18.00** | General admission for one · 1 cut-your-own sunflower | TBD *(pending sign-off + Versailles-specific confirmation)* |
| **Flower Power Pass** | **$19.99** | **$25.00** | General admission for one · 1 cut-your-own sunflower · 1 flower crown | TBD |
| **Family & Friends Package** | **$74.99** | **$80.00** | General admission for four · 4 cut-your-own sunflowers · 2 flower crowns · 2 pairs flower sunglasses | TBD |
| **Souvenir Mason Jar Lemonade** *(add-on, NEW round 2 — non-alcoholic only, no boozy option for Versailles)* | **TBD — needs price sign-off** | — | Souvenir mason jar filled with fresh lemonade | — |
| **Flower Sunglasses** *(add-on)* | **$4** | — | Any ticket | — |
| **Cut-Your-Own Sunflower Bouquet** *(NOT a TS item — onsite cash/card only)* | **$15** | — | 3 sunflowers + 12 zinnias, plastic vase | — |
| ~~Sunshine Picnic Basket~~ *(add-on — REMOVED round 2, 2026-07-21)* | — | — | Not offered at Versailles per Amanda. Do NOT configure in TS. | — |

**Online-vs-gate slash pricing:** each tier shows a struck gate price next to the online price to drive pre-sale. Use the name-keyed JS + `MutationObserver` + `content: attr(data-gate)` pattern (`~/Desktop/crowd7/data/clients/_patterns/slash-through-pricing.md`) — match each ticket by its `<h4>` name, NOT DOM position.

## 🎟️ TS-native build notes (round 2)

- **Ticket date window:** configure the TS event's buyable/valid date range as **Aug 22 – Sep 6, 2026** (the actual festival run). This is separate from the page-content flash-sale copy above the fold — it's the native TS ticket-type date field.
- **Flash-sale window:** build a native TS conditional **Action** to swap all tiers to flash pricing for **Aug 14 00:00 → Aug 17 23:59** (Eastern), reverting to standard online pricing once the window closes. Flash price amounts are still TBD — do not publish the Action without real numbers from Jill/Angie.
- **Mason jar lemonade add-on:** this is a brand-new TS cart product for Versailles (didn't exist as a standalone item before round 2) — non-alcoholic only, no age-gate/boozy dropdown needed (unlike Belleville, which may offer a boozy option and therefore needs the 21+ Action). Needs a price before it can be created in TS.
- **21+ / boozy Action:** Versailles does **not** need the boozy-vs-non-alcoholic Action that Belleville's brief calls for — there is only one (non-alcoholic) option here.

## 🔌 Hybrid-loader wiring (for Bryan/Mat — publish enablement)

This is a **new standalone TicketSpice page** — it does not exist in TS yet. To take it live:

1. **Create the Sunflower Festival event/page in TicketSpice** (Bryan/Amanda) for the Versailles location — its own page, separate from both the Belleville sunflower-festival page and the Versailles field-access (peach/apple) page.
2. **Paste the v8 (Cloudflare Pages) loader** — see the completion ping / `code-snippets/ts-hybrid-loader-runbook.md` § "The canonical loader (v8...)" — into the new page's Raw HTML block **once**, with:
   - `u3` → `'clients/eckerts/design/'`
   - `u4` → `'ticketspice-pages/versailles/sunflower-festival/'`
   - `f` → `'sunflower-festival-versailles-2026-content'`
3. **No `production/`→`preview/` cache dance needed the way jsDelivr required** — Cloudflare Pages deploys atomically on every push. `preview/` and `production/` folders are still used for the promotion **gate** (so Mat can review before the live TS page shows it), not for CDN cache-freshness reasons.

## 📸 Image note

Hero currently uses `sunflower-close-up.jpg` (in-repo, real Eckert's-brand sunflower photography, not Versailles-specific). Gallery cards are the same set as Belleville's — generic sunflower-field imagery, not tied to a location. When Versailles-specific photos land (Dropbox or otherwise), swap the hero background URL and any gallery cards Amanda flags as most Versailles-relevant.

## ✅ Three artifacts (this build)

1. **Content HTML** — `sunflower-festival/preview/sunflower-festival-versailles-2026-content.html` (loader fetches this; also promoted to `production/`)
2. **Standalone preview** — `sunflower-festival/preview/sunflower-festival-versailles-2026-content-preview.html` (`open` in a browser for Mat/Amanda)
3. **This build brief** — `sunflower-festival/ticketspice-build-brief.sunflower-festival.md`

## 🧱 Open dependencies (gate go-live, not the build)

- **Amanda/Bryan:** confirm ticket-tier pricing/structure (dates are now locked — see Round 2 above); sign off on flash-sale pricing and the new mason-jar add-on price; Versailles-specific sunflower photos if available.
- **Bryan/Amanda:** create the TS event with the Aug 22–Sep 6 date window + paste the v8 loader; build the flash-sale Action for Aug 14–17 once pricing is set; create the mason-jar add-on product once priced.
- **Mat:** review the preview, then promote/confirm once cart config + pricing are locked.
