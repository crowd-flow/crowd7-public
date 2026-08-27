#!/usr/bin/env python3
"""
Render each artboard to PNG via Playwright.

Chrome's --headless=new --screenshot path hangs on --virtual-time-budget, so we
drive a real browser and explicitly wait for webfonts + images before shooting.
Size is a CLI arg so the same artboards can emit 1:1, 4:5 or 9:16 without an edit.
"""
import pathlib
import sys

from playwright.sync_api import sync_playwright

# The installed pip playwright pins a browser build that isn't in the shared
# ms-playwright cache. Rather than force a download, bind to the newest headless
# shell that IS on disk.
_CACHE = pathlib.Path.home() / "Library/Caches/ms-playwright"
_SHELLS = sorted(_CACHE.glob("chromium_headless_shell-*/chrome-headless-shell-*/chrome-headless-shell"))
EXE = str(_SHELLS[-1]) if _SHELLS else None

W, H = (int(x) for x in (sys.argv[1] if len(sys.argv) > 1 else "1080x1080").split("x"))
SUFFIX = "" if (W, H) == (1080, 1080) else f"-{W}x{H}"

DIR = pathlib.Path(__file__).resolve().parent.parent / "render"
boards = sorted(p for p in DIR.glob("[0-9]*.html"))

with sync_playwright() as pw:
    browser = pw.chromium.launch(executable_path=EXE)
    page = browser.new_page(viewport={"width": W, "height": H}, device_scale_factor=1)
    for f in boards:
        page.goto(f.as_uri(), wait_until="networkidle")
        # Webfonts settle after networkidle; images may still be decoding.
        page.evaluate("""async () => {
            await document.fonts.ready;
            await Promise.all([...document.images]
                .filter(i => !i.complete)
                .map(i => new Promise(r => { i.onload = i.onerror = r; })));
        }""")
        page.wait_for_timeout(250)
        out = DIR / f"{f.stem}{SUFFIX}.png"
        page.screenshot(path=str(out))
        print(f"{f.stem}{SUFFIX}  {out.stat().st_size // 1024} KB")
    browser.close()

print(f"\nrendered {len(boards)} @ {W}x{H} → {DIR}")
