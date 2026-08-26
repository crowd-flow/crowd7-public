# Colony Acres — GLOBAL chrome (header promo strip + footer nav)

Sixth and seventh Crowd7 **website-hybrid** targets on this site — but the first two that are
**site-wide** rather than per-page. These are not pages; they are the two zones of the
**Divi Theme Builder** header/footer that actually change, made `git push`-editable.

## Why these two zones, and not the whole header/footer

Every page on `colonyacres.farm` renders Divi Theme Builder header layout **664** and footer
layout **666** (as of 2026-08-26 the homepage does too — see the normalization note below).
Hybridizing those templates *wholesale* would be a mistake:

- The header's nav is two `et_pb_menu` modules bound to real WordPress menus. Divi's dropdown
  and mobile-hamburger JS binds on DOM ready and **does not re-bind on injected markup**, so an
  injected nav loses its dropdowns and its mobile menu. It would also take nav editing away from
  Katie (Appearance → Menus), turning every nav tweak into a Crowd7 ticket.
- The rest of the chrome (logo, background bands, social icons, divider) is static and never changes.

So we hybridize only the two zones that carry copy which actually churns, both of which are plain
Divi **Text** modules containing nothing but markup and links — no JS behavior to lose:

| Zone | Divi module | What it is |
| --- | --- | --- |
| `header-promo/` | `et_pb_text_0_tb_header` | The top strip — "2026 TICKETS COMING SOON" badge + social icons |
| `footer-nav/` | `et_pb_text_7_tb_footer` | The whole footer link list (18 links, 3 rows) + Privacy/Terms |

## How it works — host div here, loader script in Theme Options

Unlike the per-page loaders, the script does **not** live in the module. Divi Theme Builder
layouts are only editable through the Visual Builder, whose Text-module editor is TinyMCE and
will mangle a `<script>`. So this uses the **split-loader** pattern already proven on Warm Belly
Farm (`crowd7/data/clients/_patterns/wordpress-multisite-kses-script-stripping.md`):

1. **In the Divi Text module** — the host `<div id="lc-colony-footer-nav">` (or `-header-promo`)
   wrapping the **current markup as a static fallback**. Pure HTML; TinyMCE-safe.
2. **In Divi → Theme Options → Integration → "Add code to the &lt; body &gt;"** — one small
   loader that fills any host it finds and returns silently when a host is absent.

Two consequences worth stating plainly:

- **The static fallback is the live content.** If the fetch fails, times out, or Cloudflare is
  down, the visitor sees the correct header/footer anyway — the loader simply never replaces it.
  Site chrome is above the fold on every page, so it must never degrade to blank. It also means
  no layout shift: the fallback is exactly the height of the replacement.
- **Styling is inherited, not ported.** Because the injected markup lands *inside* the existing
  Text module, it picks up that module's Divi design settings automatically. There is no CSS to
  port here, unlike the per-page guts.

## Edit loop (autonomous — no WordPress editor, once installed)

1. Edit `<zone>/preview/<zone>.html`. Check it on any page with `?preview=1`.
2. Promote: `cp <zone>/preview/<zone>.html <zone>/production/<zone>.html`
3. `git push` — Cloudflare Pages builds atomically, live in ~30–90s, every page at once.

⚠️ **Keep the static fallback in the Divi module roughly in sync** when the nav changes
structurally (a new top-level link, a renamed section). It is the failure-mode safety net, and a
stale fallback is only visible when something is already going wrong. Copy/word changes do not
need it.

## Live URLs (Cloudflare Pages)

- footer nav — production: https://assets.crowd7digital.us/clients/colony-acres/design/website-pages/_global/footer-nav/production/footer-nav.html
- footer nav — preview: https://assets.crowd7digital.us/clients/colony-acres/design/website-pages/_global/footer-nav/preview/footer-nav.html
- header promo — production: https://assets.crowd7digital.us/clients/colony-acres/design/website-pages/_global/header-promo/production/header-promo.html
- header promo — preview: https://assets.crowd7digital.us/clients/colony-acres/design/website-pages/_global/header-promo/preview/header-promo.html

## Context — the homepage normalization that preceded this (2026-08-26)

Until 2026-08-26 the homepage (page id 18) did **not** use layouts 664/666. Theme Builder
template **671** carried `exclude_from: ["homepage"]`, so the homepage hid the theme chrome with
page-level CSS and rendered its own hand-baked copies of the header and footer as Divi sections
inside the page. The two copies had already drifted — the homepage footer read
"Tree-Fest / Things To Do / The Market" while every other page read
"Winter Wonderland / Fun Yard Activities / Food / The Sweet Shop & Market".

That exclusion was removed and the baked sections disabled, so all 30 published pages now share
one header and one footer. **That is what makes this hybridization worth doing** — before it,
editing these files would have fixed 29 pages and silently missed the homepage.

Rollback runbook for that change:
`notes/work/crowd7/projects/colony-wp-hybrid-loader/artifacts/ROLLBACK-header-footer-normalize.md`
