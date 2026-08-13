# 🎃 Montpelier Farms — image assets

**Scraped 2026-08-13 from `https://www.montpelierfarms.com/`** (Wix site) on Mat's directive,
across four pages: `/`, `/fall-festival`, `/pumpkin-patch`, `/tickets`.

These are the client's **own** images off their own public site — the same set their brand
already uses. This closes the "Adrianne never sent us assets" gap that had blocked the Fall
Festival page build since May: we never needed her to send them.

## How they were pulled

Wix serves every image through a transform segment:

```
https://static.wixstatic.com/media/<id>~mv2.jpg/v1/fill/w_480,h_479,.../file.jpg
                                   ^^^^^^^^^^^^ strip everything after this
```

Dropping the transform returns the **full-resolution original** — which is how these came down
at 4000–7360px rather than the 480px thumbnails the page actually renders. Worth remembering
for any other Wix client.

Then: deduped by content hash (two crawl passes had overlapping sets), long edge capped at
**2000px** to match the `push_media.py` convention, photos re-encoded JPEG (several 1920×1080
PNGs were 2–3MB each), logos left PNG for their alpha channel. 20.2 MB total across 35 files.

## Referencing them

Per the assets convention — in-repo, via raw GitHub, never S3 or longinow-assets:

```
https://raw.githubusercontent.com/crowd-flow/crowd7-public/master/clients/montpelier/design/assets/photos/<file>
```

## `logos/`

| File | What it is |
|---|---|
| `montpelier-logo-color.png` | **PRIMARY.** Full-colour lockup on transparent — brick-red barn roof + sunflower, forest-green **MONTPELIER**, brick-red *FAMILY FARM PARK*, green laurels. Use on light grounds. |
| `montpelier-logo-cream-stacked.png` | Stacked lockup, **cream/light** — for dark grounds. Used in the Fall Festival page nav. |
| `montpelier-logo-cream-badge.png` | Circular badge, cream — *FAMILY FARM PARK* / *UPPER MARLBORO, MD* arcs. |
| `montpelier-mark-square.png` | Square mark, opaque background. |

## 🎨 Brand colours — sampled from `montpelier-logo-color.png`

| Token | Hex | Where it comes from |
|---|---|---|
| Forest green | **`#2F4640`** | the MONTPELIER wordmark + laurels |
| Brick red | **`#B04A3A`** | the barn roof + *FAMILY FARM PARK* |

These are the real brand, not an approximation — pulled by decoding the logo PNG and counting
dominant non-white pixels. Anything built for Montpelier should start here.

⚠️ **Name:** use **"Montpelier Farms"** (Mat's call, 2026-08-13). The assets carry three
variants — the logos read *Montpelier Farms*, the badge and their TicketSpice header read
*Montpelier Family Farm Park*, and Adrianne signs *Montpelier Farms, LLC*.

## `photos/`

Not individually curated — this is the full usable set, filtered only for junk (page dividers,
a party-rentals banner, anything under 700px). Named from the source filename where Wix
preserved one; otherwise `farm-<hash>` and you'll want to open them to see what they are.

**Named and verified by eye:**

| File | What it is |
|---|---|
| `hero-family-in-pumpkins.jpg` | Mother + two girls in a sea of orange pumpkins, hay-bale tiers behind. **The hero** on the Fall Festival page. |
| `heirloom-pumpkin-bin.jpg` | Overhead bin of heirloom pumpkins and gourds, golden light. Strong full-bleed candidate. |
| `pumpkins-field-01..04.jpg` | Same shoot as the heirloom bin, all 5272×3948 originals. |

**⚠️ Not all of these are fall.** The set includes tulip-festival imagery
(`beautiful-tulip-flower-garden-*.jpg`) — that's the **spring** event on a separate page — plus
some AdobeStock stock (`adobestock-*.jpeg`) and generic evening/campfire shots. Check any image
belongs to the fall festival before putting it on the fall page.

## Not captured here

The **add-on product shots** (Super Mega Slide, Paintball, Paint-a-Pumpkin, Build-a-Buddy,
Mining Mania, Duck Races) live on their **TicketSpice** page, not the Wix site, so they are not
in this folder. If the page needs them, pull from the TS page directly.
