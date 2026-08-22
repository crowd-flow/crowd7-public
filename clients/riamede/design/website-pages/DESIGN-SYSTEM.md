# 🍎 Riamede Farm — Web Design System

**This is how we build every Riamede website page.** Established on `/pricing`, 2026-08-22.

> **Mat, verbatim:** *"lets remember this style of how we did this page. Background. Cards.
> Colors. Sections. I want this to be how we do other page designs for this website in the
> future too."*

**Source of truth is CODE, not this file.**
`notes/work/crowd7/projects/riamede-pricing-wix-loader/artifacts/riamede_design.py` holds the
tokens and the stylesheet. This document explains the *why* and shows the markup recipes. When
they disagree, the module wins — and someone should fix this file.

**Two ways to consume it:**

```python
# Python generator (preferred)
import riamede_design as rd
HTML = f'<div class="c7rp"><style>{rd.CSS}</style><div class="c7rp-inner"> … </div></div>'
```

```html
<!-- Anything else -->
<link rel="stylesheet" href="https://assets.crowd7digital.us/clients/riamede/design/website-pages/_shared/riamede.css">
```

🚫 **Never copy-paste the CSS into a new generator.** A hand-copied stylesheet is exactly how the
`/pricing` guts silently drifted from their generator for a full day (2026-08-21 → 22): two
Mat-approved fixes sat in the source and never reached the live CDN.

## 🎨 Why these values are trustworthy

**Every token below was MEASURED off the client's own live page** with Playwright computed
styles — not eyeballed from a screenshot, not picked to look nice. That matters because this is
*their* brand, and two of the values are ones nobody would have guessed (see Background).

## 🎯 Palette

| Token | Hex | Measured as | Used for |
|---|---|---|---|
| `RUST` | `#AA3418` | `rgb(170,52,24)` | Card header bands |
| `TEAL` | `#09554F` | `rgb(9,85,79)` | Card bodies, badge, button text |
| `CREAM` | `#FFF9EB` | `rgb(255,249,235)` | All text on teal/rust, pill buttons, page base |
| `FRAME` | `#A83324` | — | Section headings, bullets, accents |
| `PAPER` | `#F0ECDD` | — | Calendar block ground |
| `INK` | `#2b241d` | — | Body copy off-card |

**The core move:** deep teal cards with cream type, capped by a rust band, floating on a
near-white wood backdrop. High contrast where the content is, near-zero contrast everywhere
else. That's what makes it read.

## 🪵 Background — the two things that are easy to get wrong

Whitewashed plank texture, full-bleed, edge to edge.

**1. Scale.** Wix serves a **562×1081 centre crop** of `Artboard 3_2.png` and upscales it
**2.56×**. Our first attempt used the full 1921px art squeezed to 1440 — a 0.75× *down*scale,
so the grain ran **3.4× finer**. Same file, and it read as a completely different, greyer
shade. Ship the same crop; `background-size: 100% auto` then reproduces their exact zoom.

**2. Opacity — this is the important one.** Their wrapper carries **`opacity: 0.22`**. The wood
renders at **22%** over cream. That wash-back is the *point*:

> **Mat:** *"the lighter shade of theirs is preferable. It allows things to pop more — text,
> images, sections."*

A CSS `background-image` can't take opacity, so stack a **78% cream veil** over the wood layer —
`0.78 × cream + 0.22 × wood` is the identical composite:

```css
background-color:#FFF9EB;
background-image:linear-gradient(rgba(255,249,235,.78),rgba(255,249,235,.78)), url("…/wood-planks.jpg");
background-size:auto,100% auto; background-position:0 0,top center; background-repeat:repeat,repeat;
```

Strength is a one-number tweak (`.78`). Don't bake the fade into the JPEG — keep the asset pure.

`repeat`, never `cover`: cover stretches one 1081px image over a ~3,900px page and goes to mush.
Horizontal planks make the repeat seam read as just another plank edge.

## 🧱 Full-bleed structure — required

The backdrop must reach the page edges, so **the outer element is full width and an inner
element holds the column.** Every page starts like this:

```html
<div class="c7rp">            <!-- full width, carries the wood backdrop -->
  <div class="c7rp-inner">    <!-- max-width 1180px, the actual content column -->
     … sections …
  </div>
</div>
```

Putting `max-width` on `.c7rp` instead leaves cream gutters down both sides. ⚠️ Full-bleed is
also the classic cause of horizontal scroll on phones — **always re-check 390px and 768px for
`document.scrollWidth > window.innerWidth` after touching this.**

## 🃏 The card — the signature component

```html
<div class="c7rp-card">
  <span class="c7rp-flag">Save Online</span>          <!-- optional starburst -->
  <div class="c7rp-cardhead"><h2>Weekday Admission</h2></div>
  <div class="c7rp-cardbody">
    <p class="c7rp-sub">Every weekday, all season · closed Tuesdays</p>
    <p class="c7rp-price">$5</p>
    <a class="c7rp-buy" href="…">Buy Tickets</a>
    <p class="c7rp-fine">Ages 3+ must have a general admission ticket<br>…</p>
  </div>
</div>
```

- **`c7rp-cardhead`** — rust band, display face, uppercase, cream.
- **`c7rp-cardbody`** — teal, flexes to fill; `c7rp-buy` uses `margin:auto auto 14px` so
  **buttons align across cards of different heights**. Keep that.
- **`c7rp-flag`** — CSS starburst, top-**right**. Theirs sits top-left, which works on their
  807px card but covers the title on our ~350px grid card. Head padding is reserved so a centred
  title can never run under it.
- **`c7rp-card--wide`** — single centred card (680px) for a standalone offer.
- Cards live in **`.c7rp-cards`**, a 3-up grid that collapses to 1 column under 900px.

## 💵 Price presentation

Two shapes, both carrying the same "save online" story:

- **Table** (`.c7rp-tiers`) when prices vary by date. Column headers are display-face, uppercase,
  **underlined**; **the last column is struck through** automatically — it's always the gate price.
- **Row** (`.c7rp-tier-row`) for a simple online/gate pair. Same rule: the **last** item is struck.

Because both key off *last child*, **always put gate/box-office last** or the strike lands on the
wrong number.

## 🔤 Type

**Display face** — the client's own Wix font, `wf_f18781ea145c4c8b8a1e2969f` (Chuck Noon): heavy
condensed caps. Headings, prices, column labels, buttons, badge.

🔴 **The trap:** Wix's own CSS stack leads with `wfont_c6863c_…`, which **does not resolve**. The
family actually registered is the shorter `wf_…` name. Find it by enumerating `document.fonts`
and taking the `[loaded]` entry — `document.fonts.check()` lies, it returns true for anything.

We can use their font at all **only because the loader injects into the real page DOM** rather
than an iframe. In the standalone `*.preview.html` wrapper it falls back to Poppins — expected,
not a bug.

**Body face** — Poppins, for sub-lines, bullets and fine print.

## 📐 Sections

- **`.c7rp-h2`** — centred, display face, uppercase, rust. The standard section heading.
- **`.c7rp-included-grid`** — 50/50 photo + bullet list; add `--rev` to flip the photo to the
  right. Alternate them down the page.
- **`.c7rp-bullets`** — rust bullet, optional `<span>` for a muted qualifier.
- **`.c7rp-flowers`** — narrow centred block for a short price pair.
- Sections stack directly; the heading's `52px` top margin is the rhythm. Don't add wrappers.

## ✅ Building the next Riamede page

1. New generator in the project's `artifacts/`, `import riamede_design as rd`.
2. Open with the `.c7rp` / `.c7rp-inner` shell. Compose from the components above.
3. Write **both** `preview/` and `production/` from the generator — never hand-copy.
4. Add the route to `routes.json`, `git push`. Live in ~75s.
5. Verify: byte-match the CDN, then check 390 / 768 / 1440 for overflow.

Loader mechanics, install steps and the Wix gotchas: `notes/work/crowd7/code-snippets/wix-hybrid-loader-runbook.md`.
