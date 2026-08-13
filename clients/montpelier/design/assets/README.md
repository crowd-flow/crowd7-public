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
| `montpelier-logo-ver-2.png` | Stacked lockup — barn-roof + sunflower mark over **MONTPELIER FARMS**, laurel branches. **Cream/light — for dark grounds.** |
| `montpelier-logo-ver-4.png` | Circular badge — *FAMILY FARM PARK* arc, mark, **MONTPELIER FARMS**, *UPPER MARLBORO, MD* arc. **Cream/light.** |
| `farm-edaf45.png` | Fourth variant, darker sample — likely the colour/dark-ground version. **Verify before use.** |
| `farm-3e9c36.png` | Square mark, opaque background. **Verify before use.** |

⚠️ **Both confirmed logos are cream/light**, built for dark backgrounds. If a light-ground
lockup is needed, ask Adrianne — or use `farm-edaf45.png` after checking it renders correctly.

⚠️ **Two different names are in play.** The logos read **"Montpelier Farms"**; the badge and
their TicketSpice header read **"Montpelier Family Farm Park"**; Adrianne's email signature
signs **"Montpelier Farms, LLC"**. Pick one for page copy and stay consistent.

## `photos/`

Not individually curated — this is the full usable set, filtered only for junk (page dividers,
a party-rentals banner, anything under 700px). Named from the source filename where Wix
preserved one; otherwise `farm-<hash>` and you'll want to open them to see what they are.

**Known-good fall imagery** (verified by eye): `farm-022afc.jpg` is an overhead bin of heirloom
pumpkins and gourds in golden light — strong hero or full-bleed candidate. `farm-a79b4e`,
`farm-c4916c`, `farm-f67b47` and `farm-c7dd94` are from the same shoot at the same dimensions.

**⚠️ Not all of these are fall.** The set includes tulip-festival imagery
(`beautiful-tulip-flower-garden-*.jpg`) — that's the **spring** event on a separate page — plus
some AdobeStock stock (`adobestock-*.jpeg`) and generic evening/campfire shots. Check any image
belongs to the fall festival before putting it on the fall page.

## Not captured here

The **add-on product shots** (Super Mega Slide, Paintball, Paint-a-Pumpkin, Build-a-Buddy,
Mining Mania, Duck Races) live on their **TicketSpice** page, not the Wix site, so they are not
in this folder. If the page needs them, pull from the TS page directly.
