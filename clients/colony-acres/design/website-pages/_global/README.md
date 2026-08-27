# Colony Acres — GLOBAL chrome (`ticket-btn`)

The first **site-wide** hybrid zone on this site — everything else under
`website-pages/` is a single page. What lives here is fetched by **every** page.

## What this is

Both the header strip and the footer showed a flat image,
`special-nav-COMING200N2026.webp`, reading *"2026 TICKETS COMING SOON!"* — a
**picture of a button**, not a button. Nobody could click it, and by 2026-08-26 it
was also wrong: tickets were on sale.

`ticket-btn/` holds the real replacement — one `<a class="ca-ticket-btn">`. The
loader swaps it in wherever that image appears, so header and footer are served by
one file. Change the wording or the destination here and `git push`; it lands on all
30 pages.

## Why a selector swap and not a host `<div>`

The per-page hybrids paste a host div into a Divi module. That is impossible here:

- Both targets live in Divi **Theme Builder** layouts (664 header / 666 footer).
  TB layouts **403 on the REST API and on `post.php`** — the Visual Builder is the
  only editor, and its hover toolbars can't be driven reliably from automation.
- The footer nav additionally carries Divi **multi-view** content — separate
  desktop/tablet/phone copies of the same markup. A single module edit would leave
  the other two breakpoints stale, which is exactly how this site got into trouble
  (see below).

So the loader keys off the image itself rather than a div we inject. Nothing about
the Theme Builder templates is modified, so nothing about them can be broken, and
the entire change reverts by clearing one text box in Theme Options.

## The URL repair that ships with it

While wiring this up, the footer "BUY TICKETS" link turned out to be dead on all 30
pages, in three different ways:

| Breakpoint | Linked to | Result |
| --- | --- | --- |
| desktop | `ticketspice.com/fun-yard-general-admission-2026` | **301 → homepage** (real slug has a `colony-acres-` prefix) |
| tablet | `ticketspice.com/fun-yard-general-admission-2025` | **last year's page** |
| phone | `ticketspice.com/fun-yard-general-admission-2025` | **last year's page** |

The loader rewrites any ticketspice URL missing the `colony-acres-` prefix to the
correct 2026 page. That half needs no network, so the link is fixed even if
Cloudflare is unreachable.

## Fail-safe behaviour

Nothing is hidden pre-emptively. If the fetch fails, the original badge image stays
where it is — the page degrades to how it looked before, not to a hole in the header.

## Edit loop (autonomous — no WordPress editor)

1. Edit `ticket-btn/preview/ticket-btn.html`. Check it on any page with `?preview=1`.
2. Promote: `cp ticket-btn/preview/ticket-btn.html ticket-btn/production/ticket-btn.html`
3. `git push` — Cloudflare Pages builds atomically, live in ~30–90s, every page at once.

The `.ca-ticket-btn` **style** is not in this file — it lives in the loader block in
Divi Theme Options, because the fallback path needs it too. Text and destination are
git-editable; the look is pinned there. Loader source + full notes:
`crowd7/data/clients/colony-acres/design/website-loaders/global-chrome.divi-theme-options-body.html`

## Live URLs (Cloudflare Pages)

- production: https://assets.crowd7digital.us/clients/colony-acres/design/website-pages/_global/ticket-btn/production/ticket-btn.html
- preview: https://assets.crowd7digital.us/clients/colony-acres/design/website-pages/_global/ticket-btn/preview/ticket-btn.html

## Context — the homepage normalization that made this possible (2026-08-26)

Until 2026-08-26 the homepage (page id 18) did **not** use layouts 664/666. Theme
Builder template **671** carried `exclude_from: ["homepage"]`, so the homepage hid the
theme chrome with page-level CSS and rendered hand-baked copies of the header and
footer as Divi sections inside the page — copies that had already drifted from the
real ones. That exclusion was removed and the baked sections disabled, so all 30
published pages now share one header and one footer. **Without that, this file would
fix 29 pages and silently miss the homepage.**

## Where the rest of this is written down

- **Project state + full workstream history:**
  `notes/work/crowd7/projects/colony-wp-hybrid-loader/state.md` — see **WS9**. Start there.
- **Rollback runbook for every live-site change:**
  `notes/work/crowd7/projects/colony-wp-hybrid-loader/artifacts/ROLLBACK-header-footer-normalize.md`
- **The reusable, cross-client version of the constraints above:**
  `crowd7/data/clients/_patterns/divi-theme-builder-hybrid-limits.md` — read before attempting a
  hybrid loader on **any** Divi site.
- **Loader source + full inline commentary:**
  `crowd7/data/clients/colony-acres/design/website-loaders/global-chrome.divi-theme-options-body.html`
