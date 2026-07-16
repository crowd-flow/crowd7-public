#!/usr/bin/env bash
# Purge jsDelivr's edge cache for the CAP Christmas-at-the-Princess page.
# CHECK-BEFORE-PURGE (WS1 hardened, 2026-07-15) — see
# work/crowd7/projects/ts-deploy-purge-hardening/state.md for the incident.
#
# WHY CHECK-BEFORE-PURGE: jsDelivr purges are rate-limited PER FILE (~50min
# lockout after a few). A script that purges unconditionally then verifies
# burns budget on its own smoke test — that's what emptied the purge budget
# 3x in 20 minutes on 2026-07-15. This script checks the edge FIRST and only
# purges folders that are actually stale — spends ZERO purges when fresh.
#
# USAGE:  ./purge.sh          # run after EVERY git push that touches content HTML
# Exit codes: 0 = all checked folders confirmed fresh (purged or already fresh)
#             1 = genuine failure (throttled, or still stale after retry)

set -uo pipefail

REPO="crowd-flow/crowd7-public"
REF="master"
BASE_PATH="clients/fairmont-princess/design/ticketspice-pages/christmas-at-the-princess"
STEM="christmas-at-the-princess-2026.content.html"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SHA=$(git -C "$SCRIPT_DIR" rev-parse HEAD 2>/dev/null || echo "unknown")

CDN_BASE="https://cdn.jsdelivr.net/gh/${REPO}@${REF}/${BASE_PATH}"
PURGE_BASE="https://purge.jsdelivr.net/gh/${REPO}@${REF}/${BASE_PATH}"

# echoes "fresh" or "stale" or "no-local" to stdout; sizes to stderr
check_folder() {
  local folder="$1"
  local local_file="${SCRIPT_DIR}/${folder}/${STEM}"
  if [ ! -f "$local_file" ]; then
    echo "no-local"
    return
  fi
  # Compare CONTENT HASHES, not sizes. A size check silently misses any same-size
  # edit -- reordering a block, swapping equal-length text -- and then reports
  # "already fresh", leaving the edge serving stale content while claiming success.
  # (Caught 2026-07-16: moving the Millstadt bonfire-map section below the info row
  # changed ZERO bytes; the purge was skipped and the CDN kept the old ordering.)
  # Hash both sides from FILES: command substitution strips trailing newlines, so
  # hashing a captured body would never match the file and every check would read
  # "stale" -- burning the rate-limited purge budget WS1 exists to protect.
  local local_size edge_size local_hash edge_hash edge_tmp
  edge_tmp=$(mktemp)
  curl -s "${CDN_BASE}/${folder}/${STEM}" -o "$edge_tmp"
  local_size=$(wc -c < "$local_file" | tr -d ' ')
  edge_size=$(wc -c < "$edge_tmp" | tr -d ' ')
  local_hash=$(shasum -a 256 "$local_file" | cut -d' ' -f1)
  edge_hash=$(shasum -a 256 "$edge_tmp" | cut -d' ' -f1)
  rm -f "$edge_tmp"
  echo "   local=${local_size}b/${local_hash:0:12} edge=${edge_size}b/${edge_hash:0:12}" >&2
  if [ "$local_hash" = "$edge_hash" ]; then
    echo "fresh"
  else
    echo "stale"
  fi
}

FAIL=0
for folder in preview production; do
  echo "→ ${folder}/${STEM}"
  state=$(check_folder "$folder")
  case "$state" in
    no-local)
      echo "   no local file (not built yet) — skip"
      continue
      ;;
    fresh)
      echo "   ✅ already fresh — zero purges spent"
      continue
      ;;
  esac

  echo "   stale — purging"
  resp=$(curl -s "${PURGE_BASE}/${folder}/${STEM}")
  echo "   purge response: ${resp}"
  if echo "$resp" | grep -q '"throttled": *true'; then
    reset=$(echo "$resp" | grep -o '"throttlingReset":[0-9]*' | grep -o '[0-9]*')
    echo "   ⚠️  THROTTLED — purge budget spent for this file, reset in ~${reset:-?}s. Not retry-spamming."
    echo "   Workaround: hand Mat the commit-pin URL — <ts-page-url>?c7rev=${SHA}"
    FAIL=1
    continue
  fi

  sleep 2
  state=$(check_folder "$folder")
  if [ "$state" = "fresh" ]; then
    echo "   ✅ verified fresh after purge"
    continue
  fi

  echo "   still stale — one retry after backoff"
  sleep 5
  state=$(check_folder "$folder")
  if [ "$state" = "fresh" ]; then
    echo "   ✅ verified fresh after retry"
  else
    echo "   ❌ still stale after purge + retry — reporting honestly, not claiming success"
    echo "   Workaround: hand Mat the commit-pin URL — <ts-page-url>?c7rev=${SHA}"
    FAIL=1
  fi
done

echo
if [ "$FAIL" = "1" ]; then
  echo "❌ purge.sh finished with unresolved staleness — see above."
  exit 1
else
  echo "✅ purge.sh finished — all folders confirmed fresh."
  exit 0
fi
