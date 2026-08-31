# 🦇 TicketSpice Build Brief — Confreda Farms (Hope, RI) · Scary Acres 2026

**Page:** rebuilt 2026-08-31, superseding the 2026-08-24 from-zero build.
**Built by:** Crowdly · rebuild triggered by Mat, 2026-08-31
**Client contact:** Cory (Corey Confreda) — `coreycconfreda@gmail.com`, `+1 (401) 580-2152`
**TS page:** not published yet. Builder link is account `203563`, page `1057849`
(Mat, Slack `#confreda-farm-scary-acres`, 2026-08-31). The paste is blocked; the build is not.

This brief covers the **native TicketSpice cart** — ticket types, prices, caps and date-based
Actions — the part the hybrid loader does NOT own. Page content/design ships from `crowd7-public`
via the v8 loader; see `code-snippets/ts-hybrid-loader-runbook.md`.

## ✅ What the 8/31 rebuild resolved

The 8/24 build shipped under a loud "pricing conflict" banner and an unresolved-dates flag. **Both
are now closed by real client input that landed after that build.**

### 1. Pricing is confirmed — and the structure inverted

Corey answered Bryan **in writing** on **2026-08-25** (text thread; captured in
`work/crowd7/projects/confreda-ticketspice-pages/artifacts/pricing-synopsis-20260826.md`). He did
not accept Bryan's proposal — he returned a **different structure**:

| Tier | Bryan proposed 8/25 | **Corey's answer 8/25 — BUILD THIS** |
|---|---|---|
| General Admission | $29.95 flat, all days | **$30** Sun/Mon/Thu · **$35** Fri/Sat |
| VIP | $49.95–$59.95, date-based | **$50 flat**, "no matter the day" |
| Fast Pass Ultimate | $74.95 | *Not addressed* — see Open Items #1 |

**⚠️ The structural flip is the thing to get right in the cart.** Bryan proposed **flat GA +
date-based VIP**. Corey returned the **exact inverse: date-based GA + flat VIP**. Anything
scaffolded against the 8/24 spec is now backwards.

This also aligns with Corey's stated intent on 2026-08-24 — *"I'm just going to revert back to the
pricing that we did last year"* — and with what is live on `scaryacresri.com` today.

### 2. Run dates are confirmed

**Sept 18 – Nov 7, 2026.** Mat spoke to Corey on 8/24 and posted it in Slack the same day:
*"Scary Acres is Sept 18th - Nov 7th for dates of the event."* Opening day moved **11 Sept → 18
Sept**. CrowdView event id 18 agrees. The page now prints these dates.

### 3. Real photography

Eight assets pulled from the client's own live site, optimised, and committed to
`clients/confreda-farms/design/assets/scary-acres/`. The 8/24 build was CSS-only.

## 🎫 Native TicketSpice cart — build this

| # | Ticket type | Price | Cart config |
|---|---|---|---|
| 1 | **General Admission** | **$30** Sun/Mon/Thu · **$35** Fri/Sat | **Needs a date-based Action** switching price by day-of-week. This is the one piece of real conditional logic on the page. |
| 2 | **VIP** | **$50 flat** | **No date logic.** Valid any day, any time slot. |
| 3 | **Fast Pass Ultimate** | ❌ **Do not configure yet** | Price unconfirmed — see Open Items #1. |

**Operating nights (confirmed, live site):** Fri/Sat/Sun **7–10pm**; Thu & Mon **7–9pm**. Closed
Tue & Wed. Gates open 7pm; trail opens at sundown. Safe to configure.

**At-the-door policy (confirmed, live site):** *"Tickets will NOT be available at the door."*
VIP **upgrades** are available on site. Configure online-only accordingly.

**Merchandise: none this year.** Tariffs roughly tripled the order cost (~$5k quoted → ~$23k) —
cancelled. No beer or wine on site. Don't configure a merch add-on.

## 🎨 Slash-through pricing — deliberately NOT on this page

The 8/24 build struck a **$40 "at the gate"** price on General, sourced from the 6/23 call. **That
block has been removed on purpose.** Under the confirmed 2026 structure there is no at-the-door
General price to strike — the client's own site says tickets are not sold at the door. A struck
$40 would advertise a saving against a price the guest cannot pay.

**Do not reinstate it from the 6/23 numbers.** If Corey ever confirms a real gate price, rebuild
from `crowd7/data/clients/_patterns/slash-through-pricing.md` and key it to the live cart's exact
`<h4>` ticket name — still unverified, because the cart isn't configured.

## ✅ Artifacts

1. **Content HTML** — `preview/scary-acres-2026-content.html` (the loader fetches this)
2. **Standalone preview** — `preview/scary-acres-2026-content-preview.html` (`open` in a browser;
   mock `#ticketBlock` stub included)
3. **This build brief**
4. **Assets** — `clients/confreda-farms/design/assets/scary-acres/` (8 files)

Plus a fifth artifact outside this repo (private IP, never public): the loader snippet at
`crowd7/data/clients/confreda-farms/design/ticketspice-loaders/hope.scary-acres-2026.ts-loader-snippet.v8.html`
— unchanged by this rebuild, pre-paste assertion still returns 0.

## 📋 Pre-publish checklist

- [ ] Configure **General Admission** with a **date-based Action**: $30 Sun/Mon/Thu, $35 Fri/Sat
- [ ] Configure **VIP** at **$50 flat**, no date logic, valid any day/any time slot
- [ ] Set the cart to **online-only** (no at-the-door sales)
- [ ] Configure operating nights: Fri/Sat/Sun 7–10pm, Thu & Mon 7–9pm, Sept 18 – Nov 7
- [ ] **Get Corey the front-of-line comps** so Fast Pass Ultimate can be priced and added
- [ ] Get flash-sale / early-bird promo numbers from Bryan (Open Items #2) — the page makes no
      discount claim until they exist
- [ ] Publish the TS page and paste the loader snippet (account 203563, page 1057849)
- [ ] Confirm the live cart's exact ticket display names if a GATE map is ever reintroduced
- [ ] Promote `preview/` → `production/` once Mat/Cory sign off

## 🗒 Open Items

1. **🔴 Fast Pass Ultimate is unpriced — and it is a comps question, not a rejection.** Corey did
   not say no to $74.95. He asked: *"how do others sell the ultimate?"* That is a request for
   competitive justification. Send him how comparable haunts price front-of-line and this very
   likely closes. **The card is already written and commented out in the content HTML** — search
   for `FASTPASS-PENDING`; publishing it is a two-line edit once the price is confirmed.
2. **🔴 Flash-sale / early-bird promo pricing does not exist.** Everything above is **base**
   pricing. Aiden posted the exact missing-numbers list in Slack `#confreda-farm-scary-acres` on
   2026-08-20 and it still has zero replies. The page therefore makes **no discount claim
   anywhere** — no "save $X", no struck promo price, no price-rise countdown. Swap the
   `PHASE-BANNER` line in the content HTML when real numbers land.
3. **Season passes — undecided.** The live site sells a GA Season Pass ($99.99) and a VIP Season
   Pass ($149.99). The 6/23 call explicitly killed season passes for 2026 (under 12 sold last
   year). Corey's 8/25 text didn't mention them either way. Not on the page; needs a yes/no.
4. **Attraction count is contradicted on the client's own site** — the homepage says "3
   attractions" while announcing The Blood Moon Chapel as a fourth; the /attractions page lists
   only three. The page shows all four and **prints no count**, so it can't be wrong — but
   confirm before any ad creative states a number.
5. **SMS skip-line upgrade — $15/person** (CrowdView ticket id 43). An in-cart upsell, not a
   landing-page card. Not shown on the page by design; decide whether it's live for 2026.
6. **CrowdView price rows are stale.** The `price` table for event 18 still holds the superseded
   6/23 numbers (2995 / 3495 GA, 7495 Fast Pass) and has no VIP row. Corey's confirmed 8/25
   numbers have not been written to the DB. **Needs Mat's sign-off** before any DB write, per
   `crowdview/CLAUDE.md`.
7. **Campaign phase drift.** CrowdView has Scary Acres in **Early Bird (Aug 31 – Sept 13)** as of
   today, but the team stated on the 8/31 all-team that Confreda is still in lead-up, has not run
   its flash sale, and the timeline is being redone. Reconcile the DB phases with the real plan.
