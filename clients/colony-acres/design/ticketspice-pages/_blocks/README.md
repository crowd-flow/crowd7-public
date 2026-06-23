# 🧱 Colony Acres — Page Building Blocks

Hi Michelle! These are the **Fun Yard page, broken into copy-pastable pieces.** Instead of duplicating the whole big code-heavy page every time, you can grab just the blocks you want and stack them to build a new page (bourbon dinner, group reservations, anything). Mix and match — drop a block in, leave one out, reorder them.

Each file in this folder is one chunk of the page. Open any file in a text editor, copy everything inside it, and paste it into your TicketSpice **Custom HTML** block.

## 🎯 The one rule that makes it all work

The pieces share one "look-and-feel engine" (`00-base-styles.html`). So the order is always:

1. **Paste `00-base-styles.html` ONCE at the very top.** This is the styling for everything. Without it, your sections show up as plain unstyled text.
2. **Paste `01-funnel-open.html`** — this opens the styled "box" your sections live in.
3. **Paste whichever section blocks you want** (`02` through `10`), in any order you like.
4. **Paste `99-funnel-close.html`** — this closes the box and switches on the fade-in animations.
5. **Paste `floating-buy-bar.html` as a SEPARATE Custom HTML block** (a second block in TicketSpice, after the main one). It's the orange "Buy Tickets" button that sticks to the bottom of the screen.

Think of steps 2–4 like a box: **01 opens the box → your sections go inside → 99 closes the box.**

## 📦 The blocks, in recommended paste order

| File | What it is |
|------|-----------|
| `00-base-styles.html` | ⭐ The styling engine. **Paste once, at the top.** Always needed. |
| `01-funnel-open.html` | Opens the styled wrapper. Paste once, right after the styles. |
| `02-nav-header.html` | Green top bar — logo + location + Buy Tickets button. |
| `03-hero.html` | Big photo banner with the page title + tagline. |
| `04-season-strip.html` | Thin green band: dates / open days / hours. |
| `05-benefits.html` | A row of 4 "what's included" highlights. |
| `06-gallery.html` | Auto-scrolling photo carousel. |
| `07-story-strip.html` | Green "Est. 1926 / our story" callout. |
| `08-ticket-cards.html` | The 3 pricing cards (the heart of the page). |
| `09-info-row.html` | Green strip: location / phone / who needs a pass. |
| `10-terms.html` | Terms & Conditions fine print. (Self-contained — works on its own too.) |
| `99-funnel-close.html` | Closes the wrapper + turns on animations. Paste last. |
| `floating-buy-bar.html` | The sticky orange Buy Tickets button. **Separate TS block.** |

You don't have to use all of them. Want a simpler page? Use `00` + `01` + just the sections you need + `99`. Want the sections in a different order? Go for it — they're independent.

## ✏️ The 3 things you'll usually change

For most new pages, you only swap a few things:

1. **Title & wording** — the hero title (`03`), the headings, and the copy in each section. Just type over the words.
2. **Images** — the hero photo lives in `00-base-styles.html` (search for `caf-hero` → `background-image`). The carousel photos live in `06-gallery.html` (each `<img src="...">`).
3. **Prices** — in `08-ticket-cards.html`: the big number is the online price, the struck-through number is the gate price.

Every block file starts with a short comment at the top telling you exactly **what it is, what to swap, and what it depends on.** Read that comment before editing — it'll tell you everything for that piece.

## ⚠️ Two gotchas worth knowing

- **The photo carousel (`06`) loops by duplicating its photos.** The 5 photos are listed twice on purpose (so the slide loops seamlessly). If you add or remove a photo, do it in **both** halves — there's a comment marking where the duplicate half starts.
- **The "Buy Tickets" buttons jump to `#ticketBlock`** — that's TicketSpice's own ticket selector. Leave those links alone so they keep working. These cards/buttons are the *pretty display*; TicketSpice's native ticket picker (lower on the page) is what actually takes the order.

## ❓ Questions

If a block doesn't look right or you're not sure how to combine a few, ping Mat — happy to help you assemble a page.
