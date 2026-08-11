# BooMont Hotel — Flash-Sale Guest-List page (RegFox / WBX)

The WBX analog of the TS hybrid loader (v8, Cloudflare Pages). Email-warming
lead-capture page for the **Aug 12–16 flash sale** (see
`work/crowd7/proposals/2026-08-03-boomont-leadup-page-spec.md`).

## Why this isn't the TS JavaScript loader

RegFox exposes **exactly one** code-injection point — **Design Settings →
Styles → Custom CSS**. No custom HTML element, no `<script>`, no header/footer
injection. So the TS loader (a JS `fetch` that injects HTML into
`#c7-hybrid-content`) has nowhere to run here.

**The v8 win was never "JavaScript" — it was "content on our Cloudflare CDN,
edited in git, push = deploy, no purge, no editor round-trips."** That transfers
by swapping the payload from **HTML → CSS**.

## How it ships

- **Content** = native RegFox builder elements (logo image, headings, body
  text, the email/mobile fields, the register button, consent, confirmation).
  Copy edits happen in the RegFox builder.
- **Look** = `production/boomont-waitlist.css` in this repo → deploys via
  Cloudflare Pages (`assets.crowd7digital.us`) exactly like a v8 TS page.
- **The "loader"** = ONE line pasted into RegFox's Custom CSS field:

  ```css
  @import url("https://assets.crowd7digital.us/clients/modus/design/regfox-pages/boomont-flash-waitlist/production/boomont-waitlist.css");
  ```

  Edit the skin in git → `git push` → Cloudflare serves it → the RegFox page
  picks it up on next load. No purge (Cloudflare Pages is atomic), no re-paste.

- **Fallback** if the live RegFox field strips `@import` (unconfirmed until we
  test on the page): paste the **whole** `boomont-waitlist.css` into the field.
  Git stays source of truth; re-paste on change. Loses only the auto-deploy.

## preview/ ↔ production/ (TS promotion-gate convention)

Both folders hold `boomont-waitlist.css`. Build against `preview/`; promote with:

```
cp preview/boomont-waitlist.css production/boomont-waitlist.css && git push
```

(RegFox has no JS folder-switch, so the live `@import` always points at
`production/`; `preview/` is for our own iteration + the content-preview.)

## Eyeball it

`boomont-waitlist-content-preview.html` — mimics a native RegFox DOM (image,
headings, email/tel inputs, register button) and `<link>`s the real skin, so it
proves the CSS binds via broad element/attribute selectors. Visual target twin:
`~/Desktop/crowd7/data/clients/modus/boomont-hotel/design/flash-waitlist-regfox/preview.html`.

## Open item — form selector binding

The input/label/button rules in `boomont-waitlist.css` (Layer B) use broad
element/attribute selectors (`input[type=email]`, `button`, `[class*=register]`)
that bind without RegFox's exact class names. Once the RegFox page exists,
inspect its DOM and refine Layer B — same discipline as confirming TS ticket
names from a live dump.
