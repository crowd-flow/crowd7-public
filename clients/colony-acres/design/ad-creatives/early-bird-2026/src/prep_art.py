#!/usr/bin/env python3
"""
Turn Colony Acres photography into screen-print plates.

The Crowd7 poster system (see the Flash Sale and Harbaugh Early Bird sets in
marketing/fb-ad-reference-corpus) isn't a photo with type on top — it's a
two-ink riso/screen-print: a cut-out subject separated into an orange plate and
a dark plate, each halftoned at its own screen angle, printed on cream stock,
with a solid offset silhouette echoing behind it like a mis-registered plate.

This script produces, per subject:
  <name>.png        the halftoned two-ink cutout (transparent)
  <name>-echo.png   the solid silhouette used as the offset registration echo
"""
import pathlib
import sys

import numpy as np
from PIL import Image, ImageFilter

SRC = pathlib.Path("/Users/matlonginow/Desktop/crowd7/marketing/fb-ad-reference-corpus/colony-acres")
LOCAL = pathlib.Path(__file__).resolve().parent.parent.parent / "fall-harvest-festival-2026/img"
OUT = pathlib.Path(__file__).resolve().parent.parent / "art"
OUT.mkdir(parents=True, exist_ok=True)

# Colony's ad inks, sampled off the shipped Flash Sale creative.
ORANGE = (232, 116, 60)
DARK = (26, 22, 18)
GREEN = (24, 92, 46)

# Crops are fractional (l, t, r, b) and are applied BEFORE segmentation.
# They exist because the matte happily keeps a bystander's arm or a slide tube,
# and at poster scale a stray dark mass reads as a printing defect.
SUBJECTS = [
    # (out name, source path, dark-ink color, crop box or None)
    ("girl-pump",   SRC / "1782335469.969559_Watch_party_little_girl_duck_races.jpg", DARK, (0.26, 0.22, 0.80, 1.0)),
    ("girl-cheer",  SRC / "1782335236.252329_Copy_of_CPPB-1.jpg",                     DARK, (0.30, 0.10, 0.68, 0.95)),
    ("kids-races",  SRC / "1782335469.969559_watch_party_kids_duck_races.jpg",        DARK, None),
    ("girl-slide",  SRC / "1782335236.252329_3C5A9049.jpg",                           DARK, (0.16, 0.26, 0.62, 0.98)),
    ("barrel-cab",  SRC / "1782335236.252329_E11742A6-9EA0-4685-A48B-A59AF83B7DEE.JPG", DARK, None),
    ("barrel-fam",  SRC / "1782335236.252329_535184431_1052645370366400_9005959327513886423_n.jpg", DARK, None),
    ("maze-aerial", LOCAL / "colony-100-years-maze.jpg",                              GREEN, None),
]

MAXW = 1500


def cutout(path: pathlib.Path, crop=None) -> Image.Image:
    """Segment the subject; fall back to the whole frame if the matte is junk."""
    from rembg import remove

    im = Image.open(path).convert("RGB")
    if crop:
        l, t, r, b = crop
        im = im.crop((round(l * im.width), round(t * im.height),
                      round(r * im.width), round(b * im.height)))
    if im.width > MAXW:
        im = im.resize((MAXW, round(im.height * MAXW / im.width)), Image.LANCZOS)
    cut = remove(im)
    a = np.array(cut.split()[-1])
    # A matte covering almost nothing (or almost everything) means segmentation
    # failed; the raw frame is a better plate than a broken silhouette.
    cover = (a > 20).mean()
    if not 0.04 < cover < 0.96:
        print(f"    matte coverage {cover:.0%} — using full frame")
        return im.convert("RGBA")
    return cut


def largest_blob(alpha: np.ndarray) -> np.ndarray:
    """
    Keep only the biggest connected region of the matte.

    Segmentation reliably leaves floating crumbs — a scrap of a bystander, a
    speck of background — and at poster scale each one reads as a printing
    defect. Labelling is done on a downsampled copy (cheap, and noise either
    vanishes or separates cleanly at that size), then scaled back up as a gate
    on the full-resolution alpha.
    """
    h, w = alpha.shape
    sw = 220
    sh = max(1, round(h * sw / w))
    small = np.array(Image.fromarray((alpha > 0.5).astype(np.uint8) * 255)
                     .resize((sw, sh), Image.BILINEAR)) > 127

    labels = np.zeros((sh, sw), np.int32)
    parent = [0]

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[max(ra, rb)] = min(ra, rb)

    nxt = 1
    for y in range(sh):
        for x in np.nonzero(small[y])[0]:
            up = labels[y - 1, x] if y else 0
            left = labels[y, x - 1] if x else 0
            if up and left:
                labels[y, x] = min(up, left)
                union(up, left)
            elif up or left:
                labels[y, x] = up or left
            else:
                parent.append(nxt)
                labels[y, x] = nxt
                nxt += 1

    if nxt == 1:
        return alpha
    roots = np.array([find(i) for i in range(nxt)])
    flat = roots[labels]
    counts = np.bincount(flat.ravel())
    counts[0] = 0
    keep = counts.argmax()

    gate = np.array(Image.fromarray(((flat == keep) * 255).astype(np.uint8))
                    .resize((w, h), Image.BILINEAR)) / 255.0
    return alpha * (gate > 0.35)


def trim(im: Image.Image) -> Image.Image:
    bbox = im.split()[-1].point(lambda v: 255 if v > 12 else 0).getbbox()
    return im.crop(bbox) if bbox else im


def halftone(ink: np.ndarray, cell: float, angle_deg: float) -> np.ndarray:
    """Classic rotated-grid dot screen. `ink` is 0..1 coverage; returns 0..1 dots."""
    h, w = ink.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    t = np.radians(angle_deg)
    xr = xx * np.cos(t) + yy * np.sin(t)
    yr = -xx * np.sin(t) + yy * np.cos(t)
    fx = (xr % cell) - cell / 2
    fy = (yr % cell) - cell / 2
    dist = np.sqrt(fx * fx + fy * fy)
    # Area-true dot radius, pushed slightly past the cell so solids close up.
    radius = np.sqrt(np.clip(ink, 0, 1)) * (cell / 2) * 1.42
    return np.clip((radius - dist) * 1.6 + 0.5, 0, 1)


def smoothstep(lo, hi, x):
    t = np.clip((x - lo) / (hi - lo + 1e-6), 0, 1)
    return t * t * (3 - 2 * t)


def make_plates(im: Image.Image, dark_rgb) -> tuple:
    rgba = np.array(im).astype(np.float32) / 255.0
    rgb, alpha = rgba[..., :3], rgba[..., 3]
    lum = rgb[..., 0] * 0.299 + rgb[..., 1] * 0.587 + rgb[..., 2] * 0.114
    # Lift contrast so the separation has real blacks and real paper.
    lum = np.clip((lum - 0.5) * 1.28 + 0.48, 0, 1)

    ink_dark = smoothstep(0.62, 0.04, lum)        # shadows only
    ink_orange = smoothstep(1.00, 0.20, lum)       # broad: mids through shadows

    dots_orange = halftone(ink_orange, cell=5.2, angle_deg=15.0)
    dots_dark = halftone(ink_dark, cell=4.4, angle_deg=52.0)

    out = np.ones_like(rgb)  # start on paper
    o = np.array(ORANGE, np.float32) / 255.0
    d = np.array(dark_rgb, np.float32) / 255.0
    out = out * (1 - dots_orange[..., None]) + o * dots_orange[..., None]
    out = out * (1 - dots_dark[..., None]) + d * dots_dark[..., None]

    # Ink only exists where the subject is; keep the matte edge crisp.
    a = np.clip((alpha - 0.35) * 3.2, 0, 1)
    if a.min() < 0.5:  # a full-frame fallback has no matte to clean
        a = largest_blob(a)
    plate = np.dstack([out, a])
    return (Image.fromarray((plate * 255).astype(np.uint8), "RGBA"),
            Image.fromarray((np.dstack([
                np.broadcast_to(o, rgb.shape), a
            ]) * 255).astype(np.uint8), "RGBA"))


def main():
    only = sys.argv[1:] or None
    for name, path, dark, crop in SUBJECTS:
        if only and name not in only:
            continue
        if not path.exists():
            print(f"!!  missing {path.name}")
            continue
        print(f"::  {name}")
        cut = trim(cutout(path, crop))
        plate, echo = make_plates(cut, dark)
        # Soften the echo so it reads as a printed swash, not a hard shadow.
        echo = echo.filter(ImageFilter.GaussianBlur(1.2))
        plate.save(OUT / f"{name}.png")
        echo.save(OUT / f"{name}-echo.png")
        print(f"    {plate.size[0]}x{plate.size[1]}")
    print(f"\nplates → {OUT}")


if __name__ == "__main__":
    main()
