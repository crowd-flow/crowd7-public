#!/usr/bin/env python3
"""Re-sync the CrowdView pop-up block in installed pages from the _shared template.

WHY THIS EXISTS
The block is copy-PASTED inline into each page's content HTML, so improving the
template does nothing to pages already carrying an older copy. That drift is
not hypothetical — on 2026-08-16 Mat opened Jack's Lighted Trail and found the
pop-up rendering white-on-white instead of the page's spooky palette. The theme
`<style>` block had been retrofitted onto that page correctly, but the SCRIPT
underneath was still v1, which hardcodes `background:#fff` and reads
`var(--c7a-*)` exactly zero times. The variables were defined and never read.

Three pages were in that state (Jack's Lighted Trail, Montpelier Fall Festival,
Montpelier Flash Sale) and all 22 predate the v3 preview guard.

WHAT IT DOES
Replaces the block region — from the opening `<!-- ===...CrowdView...` comment
through the `END CrowdView ... block` marker — with the current template, while
PRESERVING that page's own `:root { --c7a-* }` theme values. The theme is the
one part that is legitimately per-page; everything else should be identical
everywhere.

Idempotent: a file already matching the template is left untouched and
reported as `ok`. Never touches a file that has no block.

Usage:
    python3 clients/_shared/sync_popup_block.py --dry-run
    python3 clients/_shared/sync_popup_block.py --only jacks-lighted-trail montpelier
    python3 clients/_shared/sync_popup_block.py            # every installed page
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent          # clients/
TEMPLATE = Path(__file__).resolve().parent / "crowdview-announcement-block.html"

# The block is delimited by its own comment banner at both ends. Matching on
# those markers (rather than on line offsets or a fuzzy search) is what makes
# this safe to run against files whose surrounding content differs wildly.
START_RE = re.compile(r"<!--\s*=+\s*\n\s*CrowdView client (?:announcement|pop-up) block", re.M)
END_RE = re.compile(r"<!--\s*=+\s*END CrowdView (?:announcement|pop-up) block\s*=+\s*-->")
THEME_RE = re.compile(r":root\s*\{.*?\}", re.S)
# Legacy account/page slugs are per-page state too — preserve them across a
# sync exactly like the theme, or a page that can only be matched by slug
# (unpublished form, so no ts_url and no name match) silently stops resolving.
TOKEN_RE = re.compile(r"(var\s+C7A_(?:ACCOUNT|PAGE)\s*=\s*)'([^']*)'")


def find_block(text: str) -> tuple[int, int] | None:
    """Byte range of the whole block, or None."""
    m = START_RE.search(text)
    if not m:
        return None
    # Back up to the start of the comment that the banner belongs to.
    start = text.rfind("<!--", 0, m.end())
    e = END_RE.search(text, start)
    if not e:
        return None
    return start, e.end()


def extract_theme(block: str) -> str | None:
    """This page's own `:root { --c7a-* }` values, if it has real ones.

    A template block whose tokens are all commented out is NOT a theme — it is
    the placeholder. Returning None for that case is what stops the sync from
    'preserving' emptiness over a page that never had a theme.
    """
    m = THEME_RE.search(block)
    if not m:
        return None
    body = m.group(0)
    # At least one live (uncommented) --c7a-* declaration.
    live = re.search(r"^\s*--c7a-[\w-]+\s*:", body, re.M)
    return body if live else None


def extract_tokens(block: str) -> dict[str, str]:
    """This page's legacy C7A_ACCOUNT / C7A_PAGE values, if it set any."""
    out = {}
    for m in TOKEN_RE.finditer(block):
        name = "C7A_ACCOUNT" if "ACCOUNT" in m.group(1) else "C7A_PAGE"
        val = m.group(2)
        if val and not val.startswith("__"):
            out[name] = val
    return out


def apply_tokens(block: str, tokens: dict[str, str]) -> str:
    if not tokens:
        return block
    def sub(m):
        name = "C7A_ACCOUNT" if "ACCOUNT" in m.group(1) else "C7A_PAGE"
        return f"{m.group(1)}'{tokens.get(name, m.group(2))}'"
    return TOKEN_RE.sub(sub, block)


def apply_theme(template_block: str, theme: str | None) -> str:
    if not theme:
        return template_block
    m = THEME_RE.search(template_block)
    if not m:
        return template_block
    return template_block[: m.start()] + theme + template_block[m.end():]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--only", nargs="*", default=None,
                    help="only paths containing any of these substrings")
    args = ap.parse_args()

    template = TEMPLATE.read_text()
    tb = find_block(template)
    if not tb:
        print(f"!! could not locate the block in the template: {TEMPLATE}")
        return 1
    template_block = template[tb[0]:tb[1]]

    changed = updated = skipped = 0
    for path in sorted(ROOT.rglob("*.html")):
        if "_shared" in path.parts:
            continue
        text = path.read_text(errors="ignore")
        if "c7a-root" not in text:
            continue
        rel = str(path.relative_to(ROOT))
        if args.only and not any(s in rel for s in args.only):
            continue

        span = find_block(text)
        if not span:
            print(f"  ?? {rel}: has c7a-root but no delimited block — skipped, fix by hand")
            skipped += 1
            continue

        current = text[span[0]:span[1]]
        new_block = apply_theme(template_block, extract_theme(current))
        new_block = apply_tokens(new_block, extract_tokens(current))
        if new_block == current:
            print(f"  ok {rel}")
            continue

        themed = "themed" if extract_theme(current) else "no theme"
        reads = "reads-theme" if "var(--c7a-" in current else "IGNORED-THEME"
        print(f"  {'~~' if args.dry_run else '->'} {rel}   ({reads}, {themed})")
        changed += 1
        if not args.dry_run:
            path.write_text(text[:span[0]] + new_block + text[span[1]:])
            updated += 1

    print(f"\n{changed} file(s) {'would change' if args.dry_run else 'changed'} · {skipped} skipped")
    if not args.dry_run and updated:
        print("crowd7-public: git push IS the deploy (Cloudflare Pages) — commit and push to ship.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
