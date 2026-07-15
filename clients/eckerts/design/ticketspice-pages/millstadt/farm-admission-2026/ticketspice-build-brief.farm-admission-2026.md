# 🌾 TicketSpice Build Brief — Eckert's Millstadt Farm Admission 2026 (+ Bonfires)

**Page:** Millstadt Farm Admission 2026 — **existing live TS page**, restyled into the Crowd7 template and combined with bonfires onto ONE page (7/2 strategy decision, reconfirmed on the 7/15 Amanda call).
**ClickUp:** TBD (project tracked at `work/crowd7/projects/eckerts-millstadt-2026-page-rebuild/`)
**Built by:** Crowdly · 2026-07-15
**Design donor:** Belleville blackberry page (`belleville-farm-field-access-2026.blackberry-content.html`, `#sb-funnel`) — same Eckert's brand system, cloned under a fresh `#msf-funnel` id.
**Content source:** `work/crowd7/projects/eckerts-millstadt-2026-page-rebuild/artifacts/millstadt-content-source.md` (extracted from Amanda's live page, confirmed on the 7/15 call) + Amanda's bonfire-spec email (7/15 15:28, "Re: sales and pages").

This brief covers the **native TicketSpice cart** (ticket types, prices, caps, date rules) — the part the hybrid loader does NOT own. The page content/design (hero, benefits, entertainment roster, ticket cards, info row) ships from the repo via the loader; see `code-snippets/ts-hybrid-loader-runbook.md`.

## ⚠️ CONFIRM-BEFORE-PUBLISH (flagged — not invented)

1. **Family Fun Bundle price** — Amanda flagged the day-varying-admission-price problem (Wed/Thu $3/$6 vs Fri $12/$17 vs Sat/Sun $17/$22 online/gate) and has no single bundle number yet. **Omitted from v1** — do not add a bundle ticket type until Mat/Amanda land on a price (or an explicit rule for which day-tier it discounts off of).
2. **Apple Cannon + S'mores add-on prices** — TBD from Amanda. Currently listed on the page copy only as "(price to come)" / not itemized as TS add-ons. Do not configure as sellable add-ons until priced.
3. **Live buyer-facing TS page URL** — only the preview/edit URL is in hand. Confirm the actual public `millstadt...` TicketSpice URL before the loader paste (needed to verify the "Get Tickets" nav CTA + floating button anchor resolve on the real page, and for the CTA link if this ever needs to point off-page).
4. **Haunted hayride currently modeled as "included"** — content source says "one haunted hayride included with each paid admission." Confirm this needs no separate TS reservation/date-slot config (i.e., it's not capacity-limited per night) — if Amanda wants hayride slots capped, that's an additional Action/date-rule not modeled here.

## 🎫 Native TicketSpice ticket types — Farm Admission (per person, day-tiered)

Configure these in the TS cart (`#ticketBlock`). Each is a **per-person** admission ticket, priced online vs. at-gate (gate is the higher walk-up price — show struck-through per the slash-through pattern below).

| Ticket type | Online | At gate | Days | Notes |
|---|---|---|---|---|
| **Weekday Admission (Wed/Thu)** | $3 | $6 | Wed & Thu | No live entertainment / no concessions / no mechanical rides |
| **Friday Admission** | $12 | $17 | Friday | Full entertainment |
| **Weekend Admission (Sat/Sun)** | $17 | $22 | Sat & Sun | Full entertainment, concessions available |
| **Columbus Day Admission** | $12 | $17 | Mon 10/12 only, 9am–6pm | Only Monday the farm is open |
| **Children under 2** | Free | Free | All days | No ticket needed / free ticket type for headcount tracking |

Closed Mon & Tue except Columbus Day (10/12). One haunted hayride included with each paid admission, Fri/Sat nights Sept 11 – Oct 31 (see confirm-item 4 above).

**Add-on activities** (list as TS add-ons or note as pay-on-site, per Amanda's preference — not yet specified which): Pony Rides +$10 · Parakeet Encounter +$3 · Apple Cannons (5 for $3 / 10 for $5, ⚠️ price TBD confirm per open ask #2 above — this figure is from the existing live page, carry over as-is unless Amanda corrects it).

## 🔥 Native TicketSpice reservation type — Bonfire Sites

A **per-night site reservation**, NOT per person — mirrors the Summers Farm Campfires pattern (`ticketspice-build-brief.campfires.md`).

| Reservation | Price | Cap | Notes |
|---|---|---|---|
| **Bonfire Site — Friday, September** | $75 | up to 25 guests | Straw-bale seating, lit ~7pm |
| **Bonfire Site — Saturday, September** | $95 | up to 25 guests | Straw-bale seating, lit ~7pm |
| **Bonfire Site — Friday, October** | $95 | up to 25 guests | Straw-bale seating, lit ~7pm |
| **Bonfire Site — Saturday, October** | $175 | up to 25 guests | Straw-bale seating, lit ~7pm |

**Key rule to encode:** bonfire reservation does **NOT** include farm admission — every guest at the bonfire still needs a separate admission ticket (per the 7/2 decision, reconfirmed in Amanda's spec). Configure the cart so a bonfire reservation prompts/requires admission tickets for the expected headcount (an Action or a required companion ticket), so guests don't arrive without admission. Farm stays open till 10pm on bonfire nights.

## 🧩 Cart configuration notes

- **Date/time picker** — bonfires are Friday/Saturday-night-specific by month (Sept vs Oct pricing differs) — use a `wbx-calendar` date-picker restricted to valid Fri/Sat bonfire nights, with month determining which price tier applies (an Action or two separate date-scoped ticket types, matching the table above).
- **Day-of-week gating for admission** — the 4 admission tiers are date/day-scoped (Wed/Thu vs Fri vs Sat/Sun vs the single Columbus Day). Use TS's native day-of-week Actions to show/hide the correct tier per calendar date, same pattern as other Eckert's day-gated pages.
- **Capacity** — bonfire sites cap at 25 guests each; decide whether to cap the number of bonfire sites sellable per night (farm has finite fire pits).
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

- [ ] Confirm live buyer-facing Millstadt TS page URL (open item #3 above)
- [ ] Paste hybrid loader once into that page's Raw HTML block (`u4`/`f` per wiring section)
- [ ] Configure the 4 day-tiered admission ticket types + under-2 free ticket, with day-of-week Actions
- [ ] Configure the 4 bonfire site-rental reservations (Fri/Sat × Sept/Oct), require companion admission tickets
- [ ] Add name-keyed slash-through JS/CSS once real ticket `<h4>` names are confirmed from a live TS dump
- [ ] Family Fun Bundle — leave OUT of v1 until Mat/Amanda price it (confirm-item #1)
- [ ] Apple Cannon / S'mores add-on prices — confirm before listing as sellable TS add-ons (confirm-item #2)
- [ ] Haunted hayride slot-capacity question resolved (confirm-item #4)
- [ ] Promote `preview/` → `production/` + purge jsDelivr once Mat approves the preview

## 🗒 Open Items (for Mat / Amanda)

1. **Family Fun Bundle price** — day-varying admission price means no single bundle number exists yet.
2. **Apple Cannon + S'mores add-on prices** — TBD from Amanda.
3. **Live buyer-facing Millstadt 2026 TS page URL** — only the preview/edit URL is in hand.
4. **Haunted hayride capacity** — confirm whether it needs its own date/slot cap or is genuinely unlimited-with-admission.

## 📱 Mobile

Layout inherits the same `#msf-funnel` CSS + breakpoints (860px / 560px) as the Belleville/Grafton/Versailles Eckert's template family. Static mobile audit at 320/375/414px is WS4 of this project — see `artifacts/mobile-audit.md` once written.
