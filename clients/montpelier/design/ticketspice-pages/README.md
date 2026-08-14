# Montpelier Farms — TicketSpice pages

Registered in **CrowdView** (`page` table, account `montpelier` / id 6) on
2026-08-14 so `change` rows can bind to a real page instead of a null.

| CrowdView `page.id` | slug | Event | Repo path (this folder) | CDN |
|---|---|---|---|---|
| 20 | `flash-sale-2026` | Flash Sale | `flash-sale/` | Cloudflare Pages |
| 21 | `fall-festival-2026` | Fall Festival | `fall-festival/` | Cloudflare Pages |

**CDN:** both are **Cloudflare Pages** — there is no `purge.sh` in either
folder, which per `work/crowd7/TS-CDN-MIGRATION.md` is the tell for a migrated
page. **A `git push` IS the deploy. Do not purge; there is no jsDelivr edge to
purge.**

**⚠️ `ts_url` is NULL for both.** Nobody has recorded the live TicketSpice URLs.
The pages build and deploy fine without them (the loader addresses content by
repo path, never by TS URL) — but the portal can't link a change to the live
page a client would actually look at. **Fill these in when known.**

## Related

- CrowdView **request #8** — Adrianne Dunn's 8/14 punch list, 16 changes, all
  now bound to page 20 except the Fall-page publish (21) and the email-template
  item (no page).
- Working project + research: `notes/work/crowd7/projects/montpelier-flash-sale-edits-aug2026/`
  (`artifacts/research-findings.md` has the sourced pricing table).
- Client-side source of truth for pricing/inclusions:
  `crowd7/data/clients/montpelier/events/fall-festival/event-info.md` (5.21.26
  strategy meeting).
