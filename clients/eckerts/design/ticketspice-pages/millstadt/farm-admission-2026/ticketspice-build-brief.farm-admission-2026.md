# 🌾 TicketSpice Build Brief — Eckert's Millstadt Farm Admission 2026 (+ Bonfires)

**Page:** Millstadt Farm Admission 2026 — **existing live TS page**, restyled into the Crowd7 template and combined with bonfires onto ONE page (7/2 strategy decision, reconfirmed on the 7/15 Amanda call).
**ClickUp:** TBD (project tracked at `work/crowd7/projects/eckerts-millstadt-2026-page-rebuild/`)
**Built by:** Crowdly · 2026-07-15
**Design donor:** Belleville blackberry page (`belleville-farm-field-access-2026.blackberry-content.html`, `#sb-funnel`) — same Eckert's brand system, cloned under a fresh `#msf-funnel` id.
**Content source:** `work/crowd7/projects/eckerts-millstadt-2026-page-rebuild/artifacts/millstadt-content-source.md` (extracted from Amanda's live page, confirmed on the 7/15 call) + Amanda's bonfire-spec email (7/15 15:28, "Re: sales and pages").

This brief covers the **native TicketSpice cart** (ticket types, prices, caps, date rules) — the part the hybrid loader does NOT own. The page content/design (hero, benefits, entertainment roster, ticket cards, info row) ships from the repo via the loader; see `code-snippets/ts-hybrid-loader-runbook.md`.

## ⚠️ CONFIRM-BEFORE-PUBLISH (flagged — not invented)

1. **Family Fun Bundle price — RESOLVED 2026-07-29, still not built.** Amanda (external Slack, 7/29 10:56): *"We talked about that these would be the Weekend price x 4 - with a 25% discount"* — pricing rule applies to both Versailles and Millstadt. Applied to Millstadt's Weekend Admission (Sat/Sun) tier: **online $17 × 4 = $68 → −25% = $51.00**; **gate $22 × 4 = $88 → −25% = $66.00**. Bryan built the equivalent native "Friends and Family Bundle" ticket type for Versailles 8/12–8/13 (confirmed in #crowd7-and-eckerts-farm: *"Friends and Family Bundle for Versailles (card) is updated with start date, Ticket Type is active with actions"*) — **Millstadt's twin was never built**: no matching commit in this repo, no Slack confirmation, and the "excluded" fine-print (see content HTML) is still live as of the 8/27 file. Native TS ticket type still needs configuring — mirror the Versailles card exactly (name, start-date/Actions), priced per the numbers above. Amanda's direct question (7/16, 06:34: *"Once we have the bundles firmed up, will we add a card for those?"*) can now be answered yes.
2. **Apple Cannon price — RESOLVED 2026-07-16.** Amanda's "Millstadt page" email: *"Only one price this year. $5 for 10 apples."* The old $3/5-shot tier is retired — configure as a single $5/10-apples add-on, Sat & Sun only, 9am–6pm.
3. **S'mores kit price — near-final, confirm before pricing the TS item.** Amanda hedged "I think the smores kits will be $15 each" — treat as $15 unless she corrects it, but get an explicit yes before the item goes live priced.
4. **Live buyer-facing TS page URL — STILL THE CRITICAL PATH.** Only the preview/edit URL is in hand. Confirm the actual public `millstadt...` TicketSpice URL before the loader paste — until it's pasted, **production is unreachable by customers** regardless of everything else below being ready.
5. **Haunted hayride currently modeled as "included"** — content source says "one haunted hayride included with each paid admission." Confirm this needs no separate TS reservation/date-slot config (i.e., it's not capacity-limited per night) — if Amanda wants hayride slots capped, that's an additional Action/date-rule not modeled here.
6. **Bonfire site-number selection — NOT YET MODELED as a per-site picker.** Amanda (7/16, both emails): *"I don't see the option to buy bonfire sites... guests will choose the site number. Each site can hold one group consisting of 25 people or less."* and *"Only 65 sites in total available."* The 4 reservation types below (Fri/Sat × Sept/Oct pricing tiers) need an actual site-number selection mechanism (a seat-map picker or 65 numbered ticket variants under each date/price tier) — see the new section below. Bryan's call on implementation approach; flag to him directly.

## 🎫 Native TicketSpice ticket types — Farm Admission (per person, day-tiered)

Configure these in the TS cart (`#ticketBlock`). Each is a **per-person** admission ticket, priced online vs. at-gate (gate is the higher walk-up price — show struck-through per the slash-through pattern below).

| Ticket type | Online | At gate | Days | Notes |
|---|---|---|---|---|
| **Weekday Admission (Wed/Thu)** | $3 | $6 | Wed & Thu | No live entertainment / no concessions / no mechanical rides |
| **Friday Admission** | $12 | $17 | Friday | Full entertainment |
| **Weekend Admission (Sat/Sun)** | $17 | $22 | Sat & Sun | Full entertainment, concessions available |
| **Columbus Day Admission** | $12 | $17 | Mon 10/12 only, 9am–6pm | Only Monday the farm is open |
| **Children under 2** | Free | Free | All days | No ticket needed / free ticket type for headcount tracking |

Closed Mon & Tue except Columbus Day (10/12). One haunted hayride included with each paid admission, Fri/Sat nights Sept 11 – Oct 31 (see confirm-item 5 above).

**Season hours (Amanda, 7/16 correction list):** Opens for the season **Saturday 9/5**. Opening weekend (9/5–9/6): 9am–6pm. Thereafter: **Wed, Thu & Sun 9am–6pm**; **Fri & Sat 9am–10pm** (the late Fri/Sat close is what makes bonfire nights possible).

**PYO clarification (Amanda, 06:34):** Apples available Sept & Oct; Pumpkins available 9/18–10/31 only.

**Add-on activities:**
- **Apple Cannons** — $5 for 10 apples (single price, confirmed 7/16 — the old $3/5-shot tier is retired). Available Sat & Sun, 9am–6pm only. **Amanda explicitly asked for a conditional Action so this add-on only shows when a Saturday or Sunday ticket date is selected** — TS conditional Actions support this natively; build it and confirm back to her that the mechanism exists (see Open Items).
- **Pony Rides + Parakeet Encounter — REMOVED from this build entirely.** Amanda's 7/16 11:32am email (supersedes her earlier 06:34 note, which had them online Fri–Sun / Sat–Sun): *"Pony Rides and Parakeet encounter available for purchase onsite NOT online."* Third-party vendor, onsite cash/card sale only — do not configure as TS ticket types or add-ons.

## 🔥 Native TicketSpice reservation type — Bonfire Sites

A **per-night site reservation**, NOT per person — mirrors the Summers Farm Campfires pattern (`ticketspice-build-brief.campfires.md`).

| Reservation | Price | Cap | Notes |
|---|---|---|---|
| **Bonfire Site — Friday, September** | $75 | up to 25 guests | Straw-bale seating, lit ~7pm |
| **Bonfire Site — Saturday, September** | $95 | up to 25 guests | Straw-bale seating, lit ~7pm |
| **Bonfire Site — Friday, October** | $95 | up to 25 guests | Straw-bale seating, lit ~7pm |
| **Bonfire Site — Saturday, October** | $175 | up to 25 guests | Straw-bale seating, lit ~7pm |

Pricing above **confirmed correct** by Amanda's 7/16 spec (matches this table exactly) — her "pricing isn't right" complaint refers to whatever's currently live in the TS cart, not this brief.

**⚠️ Date-rule correction (Amanda, 7/16 11:32am — supersedes anything showing bonfires starting 9/5):**
- **Bonfires do NOT run opening weekend.** They start **Friday 9/11** — NOT 9/5–9/6. Audit every bonfire-adjacent date rule in the cart for this.
- **Friday & Saturday nights ONLY** — explicitly not Sunday, even though the farm is open Sundays.
- Season range: **Fri/Sat nights, Sept 11 – Oct 31.**

**⚠️ Site-number selection — not yet modeled, needs Bryan's build approach:** Amanda: *"I don't see the option to buy bonfire sites — guests will choose the site number. Each site can hold one group consisting of 25 people or less."* and *"Only 65 sites in total available."* The 4 reservation types above are date/price tiers, not the site picker itself — the cart needs a mechanism for the guest to pick a specific site number (1–65, per the clean site map at `crowd7-public/clients/eckerts/design/assets/bonfires/bonfire-site-map-2026.jpg`) within whichever date/price tier they land on. Options: (a) 65 numbered ticket variants per date-tier (heavy), (b) a single reservation type per date-tier with a required custom field/dropdown for site number + a capacity rule capping total sellable sites at 65 across the season. **This is Bryan's TS-cart implementation call, not a loader/content decision** — flagged to him in #eckerts-farm.

**Key rule to encode:** bonfire reservation does **NOT** include farm admission — every guest at the bonfire still needs a separate admission ticket (per the 7/2 decision, reconfirmed in Amanda's spec). Configure the cart so a bonfire reservation prompts/requires admission tickets for the expected headcount (an Action or a required companion ticket), so guests don't arrive without admission. Farm stays open till 10pm on bonfire nights (see season-hours note above).

## 🍡 New Action — S'mores kit pop-up (Amanda's ask, both 7/16 emails)

*"Is there a possibility to create an action/pop-up that if a bonfire site is selected, guests will receive a pop up to add on a smores kit? We only want the smores kits to show up as an add-on Friday and Saturday nights when bonfires are held."*

- **Trigger:** fires when a bonfire site reservation is added to cart.
- **Restriction:** only Friday/Saturday bonfire nights (i.e., only on the actual bonfire product, which is already Fri/Sat-only per the date rule above — no additional day gating needed beyond "bonfire site was selected").
- **Price:** $15 per kit — Amanda hedged "I think," confirm exact price before this goes live priced (confirm-item #3 above).
- **Contents (for the product description, not pricing):** 1 bag marshmallows, 1 package graham crackers, chocolate, roasting sticks — makes 11 s'mores.
- **Content-HTML side is already built and inert:** the loader's content HTML ships a s'mores upsell card with name-keyed ticket-name matchers (`BONFIRE_RE` pattern) that currently have nothing to match against since bonfire site ticket types don't exist in the live TS cart yet. Once Bryan configures the bonfire site ticket types (with names TS can read), pull a live dump and confirm the matcher strings — no code change needed in the loader content beyond that name match, this is a native TS Action for the actual pop-up/add-on mechanics.
- **Answer owed to Amanda:** yes, this is buildable as a TS Action — reply confirms the mechanism exists rather than leaving her question hanging (see Open Items).

## 🧩 Cart configuration notes

- **Date/time picker** — bonfires are Friday/Saturday-night-specific by month (Sept vs Oct pricing differs), starting 9/11 (not 9/5) — use a `wbx-calendar` date-picker restricted to valid Fri/Sat bonfire nights Sept 11 – Oct 31, with month determining which price tier applies (an Action or two separate date-scoped ticket types, matching the table above).
- **Day-of-week gating for admission** — the 4 admission tiers are date/day-scoped (Wed/Thu vs Fri vs Sat/Sun vs the single Columbus Day). Use TS's native day-of-week Actions to show/hide the correct tier per calendar date, same pattern as other Eckert's day-gated pages.
- **Apple Cannon conditional Action** — show only when a Saturday/Sunday admission date is selected (see Add-on activities above). Confirmed buildable via TS's native conditional Actions.
- **Capacity** — bonfire sites cap at 25 guests each; **65 sites total across the season** (Amanda, confirmed) — decide whether that's a global season cap or per-night cap and configure accordingly.
- **Under-2 free ticket** — configure as a $0 ticket type so it still tracks headcount/capacity, not just a footnote.

## 🎟 Slash-through pricing (native cart)

The content HTML's static ticket cards already show online-price-bold / gate-price-struck for display purposes. To mirror that on the **native** `#ticketBlock` once ticket types are live, add the name-keyed JS + `MutationObserver` pattern from `code-snippets/../data/clients/_patterns/slash-through-pricing.md` (do NOT hand-roll `nth-child` selectors — they break the moment a day-of-week Action reorders visible tickets):

```html
<script>
(function(){
  var GATE = {
    "Weekday Admission (Wed/Thu)": "$6.00",
    "Friday Admission": "$17.00",
    "Weekend Admission (Sat/Sun)": "$22.00",
    "Columbus Day Admission": "$17.00"
  };
  function tag(){
    document.querySelectorAll('#ticketBlock .ticket-type').forEach(function(row){
      var h4 = row.querySelector('h4');
      var cost = row.querySelector('.ticket-cost');
      if(!h4 || !cost) return;
      var g = GATE[h4.textContent.trim()];
      if(g) cost.setAttribute('data-gate', g);
    });
  }
  var tb = document.getElementById('ticketBlock') || document.body;
  new MutationObserver(tag).observe(tb, {childList:true, subtree:true});
  tag();
})();
</script>
<style>
  #ticketBlock .ticket-cost[data-gate]::before{
    content: attr(data-gate) " "; text-decoration: line-through;
    color:#212121; font-weight:200;
  }
  #ticketBlock .ticket-cost[data-gate]{ color:#5db75b !important; }
</style>
```

**Before pasting:** pull a live dump of the real ticket `<h4>` names once they exist in TS and confirm exact string matches against the `GATE` map keys above — a one-character mismatch = silent no-op, no error. Bonfire reservations don't need slash-through (single price each, no gate/online split).

## 🔌 Hybrid-loader wiring (paste once into the existing live TS page)

This page uses the standard Crowd7 hybrid loader (`code-snippets/ts-hybrid-loader-runbook.md`, canonical v6). Paste it **once** into the Millstadt admission page's Raw HTML block (replacing whatever hand-pasted content currently lives there), editing only:

- `u4` → `'ticketspice-pages/millstadt/farm-admission-2026/'`
- `f`  → `'millstadt-farm-admission-2026.content'`

After that one paste, all future edits ship via `git push` to `crowd7-public` — no further TS editor logins. Preview vs. production is folder-based (`preview/`/`production/`), auto-detected by the loader's `isPreview` check. Promote with `cp preview/<file> production/<file> && git push`, then purge jsDelivr (`purge.sh` pattern, see runbook).

## ✅ Three artifacts (this build)

1. **Content HTML** — `preview/millstadt-farm-admission-2026.content.html` (loader fetches this)
2. **Standalone preview** — `preview/millstadt-farm-admission-2026.content-preview.html` (`open` in a browser for Mat/Amanda to eyeball)
3. **This build brief** — `ticketspice-build-brief.farm-admission-2026.md`

## 📋 Pre-publish checklist

- [ ] **Confirm live buyer-facing Millstadt TS page URL — critical path (open item #3 above).** Nothing below reaches a customer until this is pasted.
- [ ] Paste hybrid loader once into that page's Raw HTML block (`u4`/`f` per wiring section)
- [ ] Configure the 4 day-tiered admission ticket types + under-2 free ticket, with day-of-week Actions
- [ ] Configure the 4 bonfire site-rental reservations (Fri/Sat × Sept/Oct) with **9/11 start date** (not 9/5) and Fri/Sat-only gating, require companion admission tickets
- [ ] Build the bonfire **site-number selection mechanism** (65 sites total) — see "Site-number selection" above, Bryan's implementation call
- [ ] Configure the **Apple Cannon conditional Action** (Sat/Sun ticket dates only) — $5/10 apples, price confirmed
- [ ] Build the **s'mores kit pop-up Action** (fires on bonfire site selection, Fri/Sat nights) — $15, confirm price first
- [ ] Confirm Pony Rides + Parakeet Encounter are **NOT** configured as TS ticket types/add-ons (onsite-only per Amanda)
- [ ] Add name-keyed slash-through JS/CSS once real ticket `<h4>` names are confirmed from a live TS dump
- [ ] Family Fun Bundle — price resolved ($51 online / $66 gate, Weekend tier ×4 −25%, confirm-item #1) — configure as native TS ticket type mirroring Versailles' "Friends and Family Bundle" card; still not built as of 2026-09-02
- [ ] S'mores kit $15 price — get explicit confirm before pricing the TS item (confirm-item #3)
- [ ] Haunted hayride slot-capacity question resolved (confirm-item #5)
- [ ] Promote `preview/` → `production/` + purge jsDelivr once Mat approves the preview

## 🗒 Open Items (for Mat / Amanda / Bryan)

1. **Family Fun Bundle price — RESOLVED, needs Bryan to build.** $51 online / $66 gate (Weekend Sat/Sun tier ×4 −25%, per Amanda's 7/29 rule). Native ticket type not yet configured — Versailles' equivalent card shipped 8/12–8/13, Millstadt's did not. No reply-to-Amanda blocker remains; this is now a build task, not a pricing question.
2. **Bonfire site-number picker implementation** — Bryan's TS-cart call; see "Site-number selection" section above.
3. **S'mores kit $15 price** — Amanda hedged "I think" — confirm exact price.
4. **Live buyer-facing Millstadt 2026 TS page URL** — only the preview/edit URL is in hand. **Critical path** — without it, production is unreachable by customers regardless of everything else being ready.
5. **Haunted hayride capacity** — confirm whether it needs its own date/slot cap or is genuinely unlimited-with-admission.
6. **Reply to Amanda** confirming both conditional Actions (Apple Cannon Sat/Sun-only, s'mores Fri/Sat-only) are buildable via native TS Actions — she asked "is there a possibility," this closes the loop rather than leaving it unanswered.

## 📱 Mobile

Layout inherits the same `#msf-funnel` CSS + breakpoints (860px / 560px) as the Belleville/Grafton/Versailles Eckert's template family. Static mobile audit at 320/375/414px is WS4 of this project — see `artifacts/mobile-audit.md` once written.
