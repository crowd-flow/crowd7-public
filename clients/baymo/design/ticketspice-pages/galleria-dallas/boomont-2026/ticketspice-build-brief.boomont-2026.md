# 🎟️ BooMont Hotel 2026 — TicketSpice Build Brief

**Client:** Modus (BooMont Hotel, Galleria Dallas) · contacts Kristi Redman, Ben Haschke
**Built:** 2026-08-11 by Crowdly
**Page type:** design overlay on Modus's **existing native cart** — not a from-scratch cart build
**Loader:** v8 Cloudflare Pages (`assets.crowd7digital.us`) — born on Cloudflare, **no jsDelivr, no purge, a push IS the deploy**

## ⏱️ Why this is urgent

The flash sale opens **Wednesday August 12** and closes **Sunday August 16** — 30% off every ticket type, the best offer of the season by design. The page needs to be live before the first send goes out.

## 📦 What the loader owns vs. what stays native

| Loader owns (repo files, ship by `git push`) | Stays native in TicketSpice |
|---|---|
| Page skin, hero, headline, copy | Ticket types and their names |
| The four offer cards + pricing display | Actual prices and fee config |
| Experience / Know-Before-You-Go panels | Date rules and day-of-week Actions |
| Native-cart CSS skin (dark inputs, emerald button) | Timed-slot capacity (15 guests / 15-min) |
| Struck gate price on the native ticket block | Inventory caps, coupon codes, merch |

**Do not rebuild any of the right-hand column.** This brief is a verification pass on a cart that already exists.

## ✅ Verify in the existing cart

Work top to bottom. Anything that doesn't match, change in TicketSpice — not in the repo file.

### 1. Ticket types and flash pricing

**✅ REPRICED 2026-08-11 PM** — Mat/Aiden got Brian on the phone (transcript: `meetings/2026/8.11.26.Crowd7MatAndAdenMeetingDetails.transcript.md`) and locked final numbers. **The 3-Event GA/VIP Combo is pulled from the sale entirely — not a ticket type on this page anymore.** Three types only, flash sale is **30% off**, running Aug 12–16 only:

| Ticket | In-season | Flash (30% off) |
|---|---|---|
| General Admission | $24.95 | **$17.47** |
| Admission + Master Key Bundle | $34.95 | **$24.47** |
| VIP Ultimate BooMont Experience | $49.95 | **$34.97** |

The old "Oct weekend step-up" tier from the original spec is gone under this pricing model — don't reintroduce it without a fresh confirm.

Confirm all three exist, are live, and carry the flash price for the Aug 12–16 window.

### 2. ✅ RESOLVED 2026-08-11 PM — Ticket names

The struck-through gate price is applied by matching each ticket row's `<h4>` text against a name map in the page. **The names must match exactly, character for character.** If they don't, no error appears — the struck price just never renders and nobody notices until a client asks why the discount isn't visible.

Previously hedged two spellings per tier (Brian's dictated call vs. a possible live-cart variant). **Resolved by a second independent source:** Ben Haschke (client, Motus) shared an official "BOOMONT TICKET TYPES" doc (`docs.google.com/document/d/16em-YDQaDglXDBGYqmSF8L4c50NdmMeMyTn5VCdVOvk`, 8/11 2:52pm) that spells the same three tiers identically to Brian's call — and identically to what the page's own offer cards already display. Both sources agree, so the hedge is pruned:

```
"General Admission"
"Admission + Master Key Bundle"
"VIP Ultimate BooMont Experience"
```

`GATE` map pruned to these three in both `preview/` and `production/galleria-dallas.boomont-2026-content.html`, plus the standalone `*-content-preview.html` mock cart in both folders so the strike-through demos correctly (`crowd7-public@6ccf21d`). **Still worth a final live-cart glance** if the strike price doesn't render once the page is pasted in — two written sources agreeing is strong but isn't a literal cart export.

### 3. Timed slots

Confirm slots are **15 guests per 15-minute interval**, and that the slot picker appears at checkout. The page copy tells guests to "pick your time at checkout and arrive within it" — that promise needs the picker live.

### 4. Season dates

- Public season: **September 4 – November 1, 2026**
- **VIP preview night: REMOVED** — Bryan 2026-08-11: the VIP preview night is off the VIP card and off the page entirely. Do not reintroduce it.

### 5. Combo mechanics

The 3-event combos cover BooMont Hotel + Snowday Dallas + Santaland. Confirm how redemption works across the three events (single QR reused, or three separate credits) — the page describes the offer but makes no redemption claim, so nothing is wrong today. Worth pinning before In Season copy is written.

## 🔌 Loader paste — Mat/Bryan-hands, one time, URGENT

**The loader snippet is already fully instantiated** — `crowd7/data/clients/modus/design/ticketspice-loaders/galleria-dallas.boomont-2026.ts-loader-snippet.v8.html`, zero placeholders (the v8 pattern detects `preview/` vs `production/` off the page's own URL, so it never needed a hardcoded TS URL to generate). What was actually missing was knowing **which TS page** to paste it into.

**Found 2026-08-11 in Slack** (`#modus-snowday-santaland-boomont`, Mat → Kristi/Ben, 2:51pm): `https://baymo.ticketspice.com/preview/005fd067c5554c9a86616c6fbbf9029e` — "TicketSpice page: ... Let me know your thoughts!" ⚠️ Note the `/preview/` in that URL — confirm with Bryan/Aiden whether this is still the page to paste into, or whether it's since been published under a different slug (the same Slack channel shows Aiden fighting a "can't track ticket orders — is it because the page isn't live?" issue this same evening, which points at the page needing to be published before pasting matters for tracking). **Flash sale email #1 goes out 7am 8/12** — this is the single item most worth Bryan/Mat's eyes tonight.

## ⚠️ Open placeholders in the page

1. **Operating hours by day type** — not sourced anywhere in our account data. The Know-Before-You-Go panel currently gives location, season, duration, arrival and scare level, but no hours.

## 🔁 Phase switchover — manual, not automatic

Per the Riamede precedent (Mat directive, 2026-08-07), this page does **not** self-advance on a date gate. It currently ships as the **flash-sale state only**. Crowdly pastes the next phase's card block manually:

- **Aug 17** → Early Bird (15% off, through doors open)
- **Sept 4** → In Season (standard pricing, Oct weekend step-up)
- **Labor Day** → 20% off, September dates only

Later-phase blocks and switchover instructions live at
`work/crowd7/projects/boomont-ticket-page/artifacts/later-phase-cards.ARCHIVE.txt`.

## 🎨 Design notes

The sub-brand is inherited verbatim from the 2026-08-10 flash-waitlist page so the two read as one campaign: black/white base, purple `#6D468F` accent, emerald `#006347` CTA, gold `#C9A24B` monogram, Futura PT (Typekit `apb7rtz`), and the arch-pattern background.

The offer grid holds a clean **three-card grid** (General Admission / Admission + Master Key Bundle / VIP Ultimate BooMont Experience) — no wide banner card needed since the 3-Event Combo tiers were pulled from scope 2026-08-11 PM.

**No client photography exists in the repo for Modus.** The page is CSS-only (gradients, SVG pattern) plus the hosted BooMont logo, matching how the waitlist page was built. If Modus supplies imagery, the hero and cards are the places it should land.
