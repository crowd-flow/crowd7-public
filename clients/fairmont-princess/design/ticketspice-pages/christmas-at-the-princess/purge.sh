#!/bin/bash
# Purge jsDelivr's edge cache for the CAP hybrid-loader content.
# Run this AFTER every `git push` that changes the CAP content HTML — jsDelivr
# then serves the new commit within seconds (no ~5-min GitHub-raw cache wait).
set -e
BASE="https://purge.jsdelivr.net/gh/crowd-flow/crowd7-public@master/clients/fairmont-princess/design/ticketspice-pages/christmas-at-the-princess"
for folder in preview production; do
  url="$BASE/$folder/christmas-at-the-princess-2026.content.html"
  status=$(curl -s "$url" | grep -o '"status": *"[a-z]*"' | head -1)
  echo "purge $folder -> ${status:-no-response}"
done
