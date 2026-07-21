# 🌻 Eckert's Sunflower Festival (Versailles) — TicketSpice Build Brief

**Page:** Eckert's Sunflower Festival — standalone rebranded event (NOT on the field-access page)
**Cloned from:** the Belleville sunflower-festival build (`work/crowd7/CLAUDE.md` § Ticket-page build workflow), per Mat's directive 2026-07-21. Exact clone — copy, location/language swap only. No ticket-structure, pricing, or date changes made; those still need Versailles-specific confirmation (see below).
**ClickUp:** fleet `86bb193q8` (workspace `90141379118`)
**Built by:** Crowdly · 2026-07-21
**Design system:** standalone `#sf-funnel` sunflower-gold sub-brand (same as Belleville's build; Versailles reuses the identical CSS/layout system)
**CDN:** **Cloudflare Pages** (`assets.crowd7digital.us`) — this is a brand-new page, so it ships straight on the migrated path per `work/crowd7/TS-CDN-MIGRATION.md`. No jsDelivr, no `purge.sh` needed. A `git push` to `crowd7-public` is the full deploy.

This brief covers the **native TicketSpice cart** (ticket types, prices, caps, rules, Actions) — the part the hybrid loader does NOT own. The page content/design (hero, benefits band, gallery, ticket-card copy) ships from the repo via the loader; see `code-snippets/ts-hybrid-loader-runbook.md`.

## ⚠️ CONFIRM-BEFORE-PUBLISH — carried over from the Belleville clone, NOT yet re-verified for Versailles

**This build is a location/branding clone of the Belleville sunflower-festival page.** Ticket structure, pricing, festival dates, and flash-sale window are copied byte-for-byte from Belleville's brief — none of that is confirmed as correct for Versailles. Before this page's cart goes live, confirm with Amanda/Bryan:

1. **Does Versailles run the same three-tier ticket structure** (General Admission / Flower Power Pass / Family & Friends) **at the same prices** as Belleville? Or does Versailles need its own package set (parallel to how Versailles' peach/apple field-access pricing already differs by location)?
2. **Festival dates** — the cloned page still reads "Aug 1–16 (tentative)" and "Flash Sale July 24–27," which are Belleville's dates. Versailles' sunflower bloom window is almost certainly on a different calendar — confirm real dates before promoting.
3. **Flash-sale pricing** — same open item as Belleville's brief: no flash discount amount has been set for this package set. Needs sign-off via Jill/Angie for Versailles specifically.
4. **Cut-Your-Own Sunflower Bouquet ($15, onsite-only)** — confirm this add-on applies at Versailles too, or if Versailles has a different onsite offer.

## 🌻 What changed vs. the Belleville source (this build)

- **Hero image** — swapped from `family-pictures-sunflowers.jpg` to `sunflower-close-up.jpg` (both already in-repo at `clients/eckerts/design/assets/sunflowers/web/`) so the two location pages don't look identical. No Versailles-specific sunflower photography exists yet — when Amanda/the Versailles team supplies real photos, swap this placeholder the same way Belleville's brief flags its own pending-photo swap.
- **Every Belleville → Versailles reference** — banner ("Belleville Farm" → "Versailles Orchard"), nav location ("Belleville, IL" → "Versailles, KY"), hero eyebrow, and the info-row location value ("Eckert's Belleville Farm" → "Eckert's Versailles Orchard"), matching the naming convention already established on the live Versailles peaches page (`versailles/peaches/production/...peach-content.html`: "Eckert's Versailles Orchard," "Versailles, KY").
- **Everything else is an exact clone** — same ticket tiers, same prices, same festival-date copy, same gallery images, same layout/CSS, same add-on. These are flagged above as needing Versailles-specific confirmation, not silently assumed correct.

## 🎫 Native TicketSpice ticket types (copied from Belleville — CONFIRM before publish)

| Ticket type | Online price | Gate price | Includes | Flash (dates TBD) |
|---|---|---|---|---|
| **General Admission** | **$12.99** | **$18.00** | General admission for one · 1 cut-your-own sunflower | TBD *(pending sign-off + Versailles-specific confirmation)* |
| **Flower Power Pass** | **$19.99** | **$25.00** | General admission for one · 1 cut-your-own sunflower · 1 souvenir mason jar lemonade (boozy or non-alcoholic) · 1 flower crown | TBD |
| **Family & Friends Package** | **$74.99** | **$80.00** | General admission for four · 4 cut-your-own sunflowers · 4 souvenir mason jar lemonades (boozy or non-alcoholic) · 2 flower crowns · 2 pairs flower sunglasses | TBD |
| **Sunshine Picnic Basket** *(add-on)* | **$18** | — | Eckert's half-peck box: 2 deli ham & cheese sliders, kettle chips, brownie bites, fresh mixed fruit, cheese cubes, gummy bears | — |
| **Flower Sunglasses** *(add-on)* | **$4** | — | Any ticket | — |
| **Cut-Your-Own Sunflower Bouquet** *(NOT a TS item — onsite cash/card only)* | **$15** | — | 3 sunflowers + 12 zinnias, plastic vase | — |

**Online-vs-gate slash pricing:** each tier shows a struck gate price next to the online price to drive pre-sale. Use the name-keyed JS + `MutationObserver` + `content: attr(data-gate)` pattern (`~/Desktop/crowd7/data/clients/_patterns/slash-through-pricing.md`) — match each ticket by its `<h4>` name, NOT DOM position.

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

- **Amanda/Bryan:** confirm ticket structure/pricing/dates apply to Versailles as-is or need their own numbers (see CONFIRM-BEFORE-PUBLISH above); Versailles-specific sunflower photos if available.
- **Bryan/Amanda:** create the TS event + paste the v8 loader.
- **Mat:** review the preview, then promote/confirm once cart config + dates are locked.
