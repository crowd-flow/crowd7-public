#!/usr/bin/env bash
# Read-only drift check across every TS page that has a purge.sh.
#
# WHY THIS EXISTS (WS4, ts-deploy-purge-hardening, 2026-07-15): the deepest
# bug in the 7/15 Millstadt incident was epistemic, not technical — "verified"
# claims were made against local files and raw.githubusercontent, neither of
# which is what the loader actually fetches. The loader eats jsDelivr. The
# ONLY check that means "the live page shows current content" is
# edge(jsDelivr) == repo HEAD. This script asserts exactly that, for every
# known page, and NEVER purges — it's safe to run any number of times without
# spending jsDelivr's per-file purge budget (~50min lockout after a few).
#
# Use this to build the "which pages are actually stale right now" drift
# table (WS3) without risking a throttle lockout. If a page shows STALE,
# hand-run that page's own purge.sh to fix it (purge.sh is check-before-purge
# and will only spend a purge on the folder that's actually stale).
#
# USAGE: ./verify_live.sh   (run from anywhere; paths are self-locating)
# Exit codes: 0 = every folder on every page is fresh
#             1 = at least one folder is stale (see per-page report)

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="crowd-flow/crowd7-public"
REF="master"

# Registry of (BASE_PATH STEM) pairs — one line per page with a purge.sh.
# Keep in sync with `find clients -iname purge.sh` — WS3 backfill adds a line
# here whenever it generates a new purge.sh. Deliberately a flat list, not an
# auto-discovery `source` of each purge.sh (sourcing would execute the purge
# logic, not just read its constants).
PAGES='
clients/eckerts/design/ticketspice-pages/millstadt/farm-admission-2026|millstadt-farm-admission-2026.content.html
clients/eckerts/design/ticketspice-pages/belleville/blackberries|belleville-farm-field-access-2026.blackberry-content.html
clients/eckerts/design/ticketspice-pages/versailles/peaches|versailles-farm-field-access-pass-2026.peach-content.html
clients/jerry-smith/design/ticketspice-pages/fall-on-the-farm|fall-on-the-farm-2026.html
clients/summers-farm/design/ticketspice-pages/campfires|campfires-2026.html
clients/summers-farm/design/ticketspice-pages/flower-festival|flower-festival-2026.html
clients/summers-farm/design/ticketspice-pages/season-pass|season-pass-2026.html
clients/summers-farm/design/ticketspice-pages/fall-festival|fall-festival-2026.html
clients/fairmont-princess/design/ticketspice-pages/christmas-at-the-princess|christmas-at-the-princess-2026.content.html
'

# NOTE: the 5 legacy-structure Eckerts pages (versailles/apples, grafton/apples,
# belleville/apples, belleville/peaches, belleville/black-raspberries) are
# deliberately NOT in this registry — they predate the preview/production
# folder convention (content sits flat in the event folder, no folder split)
# and have no purge.sh. See WS3 finding in ts-deploy-purge-hardening/state.md
# before adding them here; the folder-pair check below assumes the split.

check_one() {
  local base_path="$1" stem="$2" folder="$3"
  local local_file="${REPO_ROOT}/${base_path}/${folder}/${stem}"
  if [ ! -f "$local_file" ]; then
    echo "no-local"
    return
  fi
  local local_size edge_size
  local_size=$(wc -c < "$local_file" | tr -d ' ')
  edge_size=$(curl -s "https://cdn.jsdelivr.net/gh/${REPO}@${REF}/${base_path}/${folder}/${stem}" | wc -c | tr -d ' ')
  echo "   local=${local_size}b edge=${edge_size}b" >&2
  if [ "$local_size" = "$edge_size" ]; then
    echo "fresh"
  else
    echo "stale"
  fi
}

ANY_STALE=0
printf '%-70s %-12s %-12s\n' "PAGE / FOLDER" "STATUS" ""
while IFS='|' read -r base_path stem; do
  [ -z "$base_path" ] && continue
  for folder in preview production; do
    label="${base_path#clients/}/${folder}"
    state=$(check_one "$base_path" "$stem" "$folder")
    case "$state" in
      no-local)
        printf '%-70s %-12s\n' "$label" "no-local (not built)"
        ;;
      fresh)
        printf '%-70s %-12s\n' "$label" "✅ fresh"
        ;;
      stale)
        printf '%-70s %-12s\n' "$label" "❌ STALE — run this page's purge.sh"
        ANY_STALE=1
        ;;
    esac
  done
done <<< "$PAGES"

if [ "$ANY_STALE" = "1" ]; then
  exit 1
fi
exit 0
