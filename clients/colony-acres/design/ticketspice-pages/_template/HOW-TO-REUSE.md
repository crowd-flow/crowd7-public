# Colony Acres — Reusable Page Template

A starter ticket-page design you can duplicate for any Colony event (bourbon dinner, group reservations, etc.). The branded header and the whole Colony look stay the same — you only change three things.

## 🟢 The 5-step routine

1. **Duplicate** this page in TicketSpice, the same way you make a copy today.
2. **Open the design/HTML block** and scroll *past* the big `<style>` section — that's just the design code, you never touch it.
3. **Find the three swap zones** (each is flagged with a big `===== SWAP # =====` banner) and change only the words and image links between them:
   - **SWAP 1 · Title** — the event name, the hero photo, and the tagline.
   - **SWAP 2 · Carousel** — the sliding photos (change the `src="..."` link + the caption).
   - **SWAP 3 · Price Boxes** — the three ticket cards (badge, title, bullets, price).
4. **Optional bits** — the highlights row and the green "story strip" are each marked *"optional — edit or delete."* Keep, reword, or remove them.
5. **Save.** The ticket types and real prices people buy are still set in the normal TicketSpice ticket section, just like always — the price boxes are only the *picture* of the prices.

## 🔑 Three rules that keep it from breaking

- **Don't touch the `< >` tags or the `class="..."` names** — just edit the text/links inside them.
- **In the carousel, photos are listed twice** (a first set + a duplicate) so the slide loops smoothly. If you change a photo, change it in **both** lists.
- **Card colors come from the class name** (`caf-card-cream` = light, `caf-card-dark` = dark, `caf-card-green` = highlighted). Leave those names alone; they set the color for you.

## 📂 Files in this folder

- `preview/colony-page-template.html` — the editable template (paste this into a TicketSpice HTML block).
- `preview/colony-page-template-preview.html` — open this in a browser to *see* how it looks before you start.

## 🧭 One honest note (for the strategy meeting)

This template makes duplicating + restyling a page much easier — but it's still HTML you hand-edit, not true drag-and-drop. A genuinely no-code, drag-the-blocks-around editor is a TicketSpice-builder capability (Michelle's lane). This v1 is the practical middle ground: a clean, clearly-labeled template that's quick to copy and edit by hand. Worth deciding the long-term approach together.
