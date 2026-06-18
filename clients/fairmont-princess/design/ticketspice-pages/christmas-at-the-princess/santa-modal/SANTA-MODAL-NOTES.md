# 🎅 Photos-with-Santa modal — Bryan's verbatim baseline + V1/V2 plan

**Built by Crowdly, 2026-06-18** (Mat directive, 2026-06-17 voice). Source: Bryan's old
Christmas-at-the-Princess TicketSpice page, captured in
`../2026-Christmas-at-the-Princess-full-page-preview.html` (the 400KB full-page dump).

## 📦 What's here

| File | What it is |
|---|---|
| `bryan-santa-modal.verbatim.js` | Bryan's modal script, extracted **verbatim** from the dump and un-escaped. The IIFE only — paste-ready (wrap in `<script>…</script>`). The V1 source of truth. Do not edit. |
| `bryan-santa-modal-v1-demo.html` | Standalone, openable demo. Mock native-TS `#ticketBlock` + Bryan's verbatim script unchanged. `open` it in a browser to watch the modal work end-to-end. |
| `SANTA-MODAL-NOTES.md` | This file. |

## 🔍 What Bryan's modal actually does (the "functional" part Mat wants)

Unlike our current `capOvSanta` modal in the content HTML — which is a **marketing-only
stub** (hardcoded `<select>` timeslots, a dead "$24.99" button that just closes) — Bryan's
modal is **functional**: it surfaces the **real, interactive TicketSpice ticket**.

On page load it:

1. Waits for the Santa ticket row at
   `#ticketBlock > table > tbody:nth-child(7) > tr.ticket.ticket-type` (its hardcoded
   position in his old cart).
2. Drops a hidden placeholder where that row lives, then **physically lifts the real ticket
   row** (live timeslot selector + qty + add-to-cart, all native TS) out of the ticket block
   and into the popup body.
3. **Auto-opens** the popup immediately — dark panel, autoplay Santa video banner, pitch
   line, two buttons ("Keep Browsing" / "I selected a timeslot and ticket").
4. On any close (X, overlay click, Esc, either button) it **restores the ticket row** to its
   exact original spot in the block. Has a `MutationObserver` to survive TS's SPA re-renders.

So the user buys the *actual* Santa add-on from inside the popup — no fake form. That's the
"fallback-but-better baseline."

## ✅ V1 — VERBATIM, working (this session)

- Extracted + un-escaped Bryan's script verbatim. `node --check` clean.
- Demo (`bryan-santa-modal-v1-demo.html`) reproduces his exact DOM target so the unmodified
  script runs and the hijack→restore behavior is visible in a browser. **This is the V1
  proof.**
- Assets (video + poster) reference Bryan's live Tambourine CDN URLs — they load as-is.

### ⚠️ Open decision before V1 goes LIVE on our page

The script is verbatim-ready, but two things need Mat's call before it ships into our live
content HTML (these are why it's NOT yet wired into `production/`):

1. **The selector — `tbody:nth-child(7)`.** That index is specific to Bryan's old cart's
   ticket ordering. Our CAP cart is configured natively in TicketSpice (not in this repo), so
   the Santa ticket's row position on **our** page is unknown from here. Two fixes:
   (a) confirm our Santa ticket's row index and hardcode it, or
   (b) switch to **name-keyed targeting** (match the `tr.ticket.ticket-type` whose `<h4>`
   contains "Santa") — robust against re-ordering, same pattern as our slash-through pricing.
   Recommend (b). It's a one-line change but technically departs from "verbatim," so flagging.
2. **Trigger — auto-open vs. button.** Bryan's fires automatically on every page load
   (aggressive upsell). Our page has an "Add Photos with Santa" button (`capOpenSanta()`).
   Keep Bryan's auto-open verbatim, or wire it to our button? Mat's call.

## 🎨 V2 — CAP-branded + name-keyed + integration-ready (BUILT 2026-06-18)

**Files:** `cap-santa-modal-v2.js` (the script) + `cap-santa-modal-v2-demo.html`
(standalone, `open` it to watch it work). The **ticket-hijack/restore logic is
byte-for-byte Bryan's** — V2 changes exactly three things:

1. **Name-keyed targeting** — replaces Bryan's hardcoded `tbody:nth-child(7)` with a
   finder that matches the `tr.ticket.ticket-type` whose `<h4>` contains "santa". Our CAP
   cart is configured natively in TS with a *different* ticket order, so Bryan's index
   would grab the wrong row. The demo deliberately puts Santa at **position 3** to prove
   the finder works regardless of order. (Resolves open decision #1 — name-key was the
   recommended fix; it's the only correct option for our cart, not a stylistic call.)
2. **CAP brand reskin** — cream `#f5f0ec` panel, deep maroon `#671416` header w/ cream
   serif title + gold underline, accent red `#c82844` CTA pill, gold `#c9a24b` rules,
   white sub-card under the hijacked native ticket. (Was Bryan's dark `#0f0f10` + `#F61D0A`.)
3. **Configurable trigger** — `const AUTO_OPEN = false;` at the top. Default (`false`)
   wires the hijack to `window.capSantaLaunch()`, which the page's existing
   "Add Photos with Santa" button calls. Flip to `true` for Bryan's auto-open-on-load.
   **One-line flip** — resolves open decision #2 either way Mat wants.

### 🔌 Live integration (pending Mat's go — NOT yet done)

When Mat green-lights, integrating into the live page is mechanical:
1. Paste `cap-santa-modal-v2.js` (its body) inside a `<script>` in
   `../preview/christmas-at-the-princess-2026.content.html`.
2. **Delete** the marketing-stub `#capOvSanta` modal + `capOpenSanta()` (the dead
   `<select>`/`$24.99`-closes-the-popup stub).
3. Point the existing `<button ... onclick="capOpenSanta()">Add Photos with Santa</button>`
   at `window.capSantaLaunch()`.
4. Set `AUTO_OPEN` per Mat's trigger answer.
5. `cp preview/* production/*` + `git push` to promote (this IS the live deploy).

Until then this folder is **reference only** — the live page is untouched.
