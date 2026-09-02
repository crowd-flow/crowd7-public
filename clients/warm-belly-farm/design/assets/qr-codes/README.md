# Warm Belly Farms — ticket-purchase QR codes

Generated on request (ActionQ item 489373, Mat-approved 2026-09-02) as the
"add QR codes for on-the-way purchases" half of the 7/24 kickoff redesign ask
(see `work/crowd7/dossier.md`).

- `full-harvest-2026-purchase-qr.png` — 600x600, encodes
  `https://warmbellyfarm.ticketspice.com/full-harvest-2026` (the live in-season
  Cottage Grove ticketing page). Generated via api.qrserver.com (public,
  no-auth QR API — no prior in-repo QR tooling existed, see project state).
  Regenerate with:
  `curl -o out.png "https://api.qrserver.com/v1/create-qr-code/?size=600x600&margin=10&data=<url-encoded-target>"`

Use: print/signage or a "buy on your way" page element so people already
driving to Cottage Grove can scan and purchase before arrival. Placement
(page content vs. printed signage vs. email) is Bryan's/the creative team's
call — this is the raw asset.

**Not yet placed anywhere live.** The live `full-harvest-2026` page is a
native TicketSpice page with no custom-content layer in this repo (unlike
the retired `full-harvest-flash` subpage), so pasting this into the actual
ticket page requires TS admin access (Matt/Ethan/Bryan), same as the
ticket-insurance toggle below.
