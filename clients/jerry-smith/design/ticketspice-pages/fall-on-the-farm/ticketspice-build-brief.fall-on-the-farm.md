# 🎫 TicketSpice Build Brief — Jerry Smith Farm · "Fall on the Farm" (Phase 1)

**Build target:** live for the in-person QR sale at Dog Days weekend (Sat 6/13–Sun 6/14), toggled off, reopened for Father's Day weekend (Sat 6/20–Sun 6/21).
**Scope (Phase 1):** **Season Pass ONLY**, full price. No GA tickets, no merch. Sold in person via QR (no ads/email).
**Phase 2 (Sept 12):** add GA Weekday + GA Weekend cards — not part of this build.

**📦 Architecture (hybrid loader):** this page deploys via the **crowd7-public hybrid loader**, not a manual Custom-HTML paste of the full content. The live TS page carries a one-time loader snippet that `fetch`es the page content from this repo at render time, so a `git push` to `crowd7-public` IS the deploy. Content lives at `design/ticketspice-pages/fall-on-the-farm/{preview,production}/fall-on-the-farm-2026.html`; promotion = `cp preview/<file> production/<file> && git push`. Loader recipe + gotchas: `work/crowd7/code-snippets/ts-hybrid-loader-runbook.md`. The native TS cart (ticket types, prices, Square box-office price, toggle) is still configured by hand per the sections below.

Walk this top-to-bottom while configuring the TicketSpice UI; it's ordered the way TS asks for values.

## 1. Page Basics

- **Page / event name:** `Fall on the Farm` (confirmed live name — NOT "Fall in the Farm").
- **Subaccount:** 🔴 **OPEN** — `account.json` `ticketspice_name` is blank. Confirm whether a Jerry Smith TS subaccount exists yet, or create one. The published page URL is needed to install the loader snippet and to generate the QR (Section 6).
- **Slug suggestion:** `fall-on-the-farm` (e.g. `jerrysmithfarm.ticketspice.com/fall-on-the-farm`).
- **Loader install:** paste the one-time hybrid-loader snippet (per the runbook) into a **Custom HTML** content block above the ticket selector. The loader pulls the page content from `crowd7-public/.../fall-on-the-farm/production/fall-on-the-farm-2026.html` — you do NOT paste the full content HTML by hand.
  - 🔴 Before the page is promoted to `production/`: find-and-replace `__CLOUDFRONT__` → the live CloudFront domain fronting `crowd7-assets` in the content HTML. **This now covers the hero VIDEO + poster ONLY** — the 6 gallery images are already in-repo (`raw.githubusercontent.com/crowd-flow/crowd7-public/master/clients/jerry-smith/design/assets/`) and need no host swap. See Section 7 (asset hosting) — the video host is the gated step.
  - The **floating "Get the Season Pass" button** at the bottom of the content file renders with the rest of the loaded content — no separate paste needed under the hybrid model.

## 2. Ticket Type — Season Pass

One ticket type only:

- **Name:** `Fall Season Pass` (this exact string is also the slash-through JS key — see Section 4; a one-char mismatch silently kills the slash).
- **Online price:** **$39.95**
- **Door / box-office price:** **$49.95** — set via the **Square POS / Box Office** separate-price field (confirmed feasible on the 5.21 call; Lauren signed the Square contract).
- **Inclusions (description copy — DRAFT, confirm with Lauren):**

  > Your all-access pass to the whole fall season at Jerry Smith Farm. Come back as many times as you like from September 12 through November 1, 2026 — every day we're open. Season Pass holders also get **10% off at Smitty's Bar and the Country Store** all season long (Food Court excluded). One pass, one price, a whole season of fall memories.

- **Capacity / inventory cap:** none (no sell-out cap committed).
- **Per-person:** yes — one pass admits one person, valid the entire 2026 fall season.

## 3. Conditional Actions

- **None for Phase 1.** Single ticket, no date-driven show/hide. (Weekday/weekend conditional logic is Phase 2.)

## 4. Slash-Through Pricing ($49.95 → $39.95)

Two layers, both already in the content HTML:

1. **Custom card** (the `#jsf-funnel` Season Pass card) — shows `$39.95` online with `$49.95 at gate` struck. Pure HTML, nothing to configure.
2. **Native TS ticket block** — the name-keyed JS + `MutationObserver` + `content: attr(data-gate)` block at the bottom of the content HTML (pattern: `_patterns/slash-through-pricing.md`). It strikes the `$49.95` gate price on TS's own `#ticketBlock` Season Pass row.
   - 🔴 **Confirm the exact ticket `<h4>` name** TS renders for the Season Pass and make sure it matches the `GATE` map key (`"Fall Season Pass": "$49.95"`). If TS strips `<script>`, the custom card still carries the visible anchor — the native strike is a bonus.

## 5. Pre-Publish Checklist

- [ ] `__CLOUDFRONT__` replaced with the live CloudFront domain (hero video + poster load). **Gallery images are in-repo — no swap needed.**
- [ ] Content promoted `preview/` → `production/` and pushed (the hybrid-loader deploy).
- [ ] Hero video autoplays muted/looping on desktop + mobile (Safari iOS respects `playsinline`).
- [ ] Season Pass = $39.95 online, $49.95 door (Square Box Office).
- [ ] Description copy pasted (or Lauren's wording swapped in).
- [ ] Slash-through renders ($49.95 struck) on both the custom card and, if `<script>` survives, the native ticket block.
- [ ] TicketSpice footer chrome (flag + TS logo) suppressed — the CSS block attempts it; if it leaks, hide via TS theme/branding panel.
- [ ] Mobile pass at 320 / 375 / 414px (see `artifacts/mobile-audit.md`).
- [ ] Test purchase in TS preview/sandbox.

## 6. Toggle Schedule (manual — TS "Registrations Closed")

The pass is sold in person at two free summer weekends, then the page sleeps until fall.

| When | Action | How |
|---|---|---|
| **Fri 6/12 eve / Sat 6/13 AM** | **OPEN** registrations | Publish + set registrations open |
| **After Sun 6/14** | **CLOSE** registrations | TS → "Registrations Closed" |
| **Sat 6/20 AM** | **REOPEN** registrations | Toggle registrations back open |
| **After Sun 6/21** | **CLOSE** registrations | TS → "Registrations Closed" |

(Page content stays published the whole time; only the registration toggle flips. Set a "Registrations Closed" message like *"Season Pass sales are open on-site this weekend — see you at the farm!"*)

## 7. QR Code (gated on the published URL)

- Once the page is published and the URL is final, generate a QR → that URL → `artifacts/jerry-smith-season-pass-qr.png` and send to Lauren for on-site scanning.
- **Blocked until** the TS subaccount/slug is confirmed (Section 1) and the page is published.

## 8. Open Items — Surface to Lauren (Phase 1 builds with defaults, flag for swap)

- [ ] **Brand colors (hex) + font system** — page uses a fall/harvest palette + our proven web font stack as placeholders. Pull from jerrysmithfarm.com if useful; swap when the style guide lands.
- [ ] **Logo file** — nav currently uses a text lockup ("Jerry Smith *Farm*"). Swap for the real logo (SVG/PNG) when supplied.
- [ ] **Season Pass description copy** — ghostwritten draft above; confirm or replace.
- [ ] **Gallery photos + order** — using all 6 supplied (pumpkin patch, treats, animals, family, barnyard, family-fun). Confirm crop/order.
- [ ] **TS subaccount / slug** — needed to publish + generate the QR.
- [ ] **Street address / age policy** — omitted from the info row to avoid fabricating; add if Lauren wants them shown.

## Artifacts (this build)

- Content HTML: `design/ticketspice-pages/fall-on-the-farm/preview/fall-on-the-farm-2026.html` (gallery in-repo; hero video on `__CLOUDFRONT__` token pending hosting)
- Local preview: `design/ticketspice-pages/fall-on-the-farm/preview/fall-on-the-farm-2026-preview.html` (real hero video + photos via local paths — `open` this to review)
- This brief: `design/ticketspice-pages/fall-on-the-farm/ticketspice-build-brief.fall-on-the-farm.md`
