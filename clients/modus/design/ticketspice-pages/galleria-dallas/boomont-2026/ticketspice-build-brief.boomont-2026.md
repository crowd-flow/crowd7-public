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

### 2. 🚨 Ticket names — the one thing that will silently break

The struck-through gate price is applied by matching each ticket row's `<h4>` text against a name map in the page. **The names must match exactly, character for character.** If they don't, no error appears — the struck price just never renders and nobody notices until a client asks why the discount isn't visible.

The page now ships with these keys, **read off a dictated phone call with Brian (not a live cart dump)** — two spellings hedged per tier so the match fires regardless of which one the live cart actually uses:

```
"General Admission"
"Admission Plus Master Key Bundle" / "Admission + Master Key Bundle"
"VIP Anytime Admission" / "VIP Ultimate BooMont Experience"
```

Brian's own framing on the call: GA, then "Admission Plus Master Key Bundle" (the same ticket Aiden read off Ben's doc as "GA plus... master key"), then the top tier — Brian confirmed the name to use is "VIP Ultimate BooMont Experience," but the actual cart line per Aiden's read was "VIP Anytime Admission (VIP Ultimate BooMont Experience)" — hence the hedge.

**Action still open:** open the live cart, copy each ticket's display name verbatim, and prune the wrong spelling from the `GATE` map in
`production/galleria-dallas.boomont-2026-content.html` (already promoted — edit both `preview/` and `production/`). Lower risk than before (real numbers from Brian, not a guess), but still the single highest-risk item in the build.

### 3. Timed slots

Confirm slots are **15 guests per 15-minute interval**, and that the slot picker appears at checkout. The page copy tells guests to "pick your time at checkout and arrive within it" — that promise needs the picker live.

### 4. Season dates

- Public season: **September 4 – November 1, 2026**
- **VIP preview: September 1** — confirm whether preview access is a separate ticket type or an Action on the VIP ticket. The page currently states it as a VIP inclusion.

### 5. Combo mechanics

The 3-event combos cover BooMont Hotel + Snowday Dallas + Santaland. Confirm how redemption works across the three events (single QR reused, or three separate credits) — the page describes the offer but makes no redemption claim, so nothing is wrong today. Worth pinning before In Season copy is written.

## 🔌 Loader paste — Mat-hands, one time

The loader snippet is not yet instantiated because it needs the live TS URL. Once you send me the page's TicketSpice URL/slug I'll generate the v8 snippet and hand it back; you paste it into that page's **Raw HTML block** once and never again — every later change ships by `git push`.

## ⚠️ Open placeholders in the page

Both are tagged in-file as `NEEDS-CONFIRM`:

1. **Exact native ticket names** for the gate map (see §2 above)
2. **Operating hours by day type** — not sourced anywhere in our account data. The Know-Before-You-Go panel currently gives location, season, duration, arrival and scare level, but no hours.

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
