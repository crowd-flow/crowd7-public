# crowd7-public

Public content repo for Crowd7 client pages. Served to browsers at
**`https://assets.crowd7digital.us`** (Cloudflare Pages — atomic deploy per push).

## 🚨 What belongs in this repo — read before adding anything

**Rule (Mat, 2026-07-30): this repo may contain only what any visitor could already read by
inspecting a live page.** Treat it as a showcase surface. Anyone can browse it.

✅ **Belongs here**

- Page **content** HTML (`preview/` + `production/`) — the browser fetches this cross-origin at
  render time, so it is public whether or not this repo is.
- Sibling `*-content-preview.html` eyeball wrappers.
- Images and other page assets.
- TicketSpice build briefs *(client-facing config walkthroughs)*.

🚫 **Does NOT belong here — put it in the private `crowd7` repo**

- **Loader snippets.** The hybrid loader is Crowd7's mechanism and is internal IP. It is not
  visible from page content and must not be committed here.
  → `crowd7/data/clients/<client>/design/ticketspice-loaders/…`
- Anything carrying **margin, pricing strategy, budgets, or internal commentary**.
- Credentials, tokens, internal URLs, client contact details.

Full split table + rationale: **`crowd7/data/clients/_patterns/loader-storage.md`** (private repo).

## Layout

```
clients/<client>/design/
├── ticketspice-pages/<location>/<event>/
│   ├── preview/      <slug>.<event>-content.html   ← + sibling *-content-preview.html
│   ├── production/   <slug>.<event>-content.html   ← promoted copy; what the loader serves
│   └── ticketspice-build-brief.<event>.md
└── assets/<category>/
```

Promotion is `cp preview/<file> production/<file>` then push. **A push IS the deploy** — pages
served from `assets.crowd7digital.us` go live in seconds, nothing to purge.

## Verifying a deploy

```bash
curl -sL https://assets.crowd7digital.us/<path-to-content>.html | shasum -a 256
```

⚠️ **Use `curl -L`.** Cloudflare Pages 308-redirects `…-content.html` to the extensionless URL;
without `-L` a healthy page looks like a failure. `fetch()` follows redirects, so the loader is
unaffected.

Checking the local file or `raw.githubusercontent.com` verifies the **source**, not what the
page shows. Always verify against the live origin.
