#!/usr/bin/env bash
# Purge jsDelivr's edge cache for the Millstadt farm-admission-2026 page.
#
# WHY THIS EXISTS — read before skipping it:
# The hybrid loader on the live TS page fetches content from jsDelivr, NOT from
# raw.githubusercontent.com and NOT from disk. jsDelivr caches the branch ref at
# its edge (Cloudflare + Fastly). A `git push` alone does NOT update the live
# page — the edge keeps serving the OLD file for up to ~12h until it self-refreshes.
#
# 2026-07-15 incident: WS5 shipped 31 photos + a rebuilt page, pushed clean, and
# every asset URL HEAD-checked 200 — but the live TS page showed the OLD text-only
# pill grid for 30+ minutes because nobody purged. The verification was run against
# the local file and raw.githubusercontent URLs; the loader was eating a stale
# jsDelivr copy the entire time. Verify the surface the USER is looking at.
#
# USAGE:  ./purge.sh          # run after EVERY git push that touches content HTML
#
# A JSON "status": "finished" means it purged. Safe to re-run; idempotent.

set -euo pipefail

BASE="https://purge.jsdelivr.net/gh/crowd-flow/crowd7-public@master/clients/eckerts/design/ticketspice-pages/millstadt/farm-admission-2026"
STEM="millstadt-farm-admission-2026.content.html"

for folder in preview production; do
  echo "→ purging ${folder}/${STEM}"
  curl -s "${BASE}/${folder}/${STEM}" || true
  echo
done

echo
echo "→ verifying what jsDelivr now serves (preview):"
CDN="https://cdn.jsdelivr.net/gh/crowd-flow/crowd7-public@master/clients/eckerts/design/ticketspice-pages/millstadt/farm-admission-2026"
LOCAL_SIZE=$(wc -c < "$(dirname "$0")/preview/${STEM}" | tr -d ' ')
EDGE_SIZE=$(curl -s "${CDN}/preview/${STEM}" | wc -c | tr -d ' ')
echo "   local: ${LOCAL_SIZE}b   edge: ${EDGE_SIZE}b"
if [ "$LOCAL_SIZE" = "$EDGE_SIZE" ]; then
  echo "   ✅ edge matches local — live page will show current content"
else
  echo "   ⚠️  MISMATCH — edge is still stale; wait a few seconds and re-run"
fi

# NOTE: production/ 404s until the page is promoted (cp preview/<f> production/<f>).
# That is expected pre-promotion — the purge call above is harmless either way.
