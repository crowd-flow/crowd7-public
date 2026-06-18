/* ════════════════════════════════════════════════════════════════════════
   🎅 CAP Photos-with-Santa modal — V2 (CAP-branded, name-keyed, integration-ready)
   Built by Crowdly 2026-06-18. Functional baseline = Bryan's verbatim modal
   (`bryan-santa-modal.verbatim.js`). V2 changes vs verbatim — ONLY these three,
   the hijack/restore ticket logic is byte-for-byte Bryan's:

   1. NAME-KEYED targeting (not Bryan's hardcoded `tbody:nth-child(7)`). Our CAP
      cart is configured natively in TicketSpice with a DIFFERENT ticket order, so
      Bryan's index would grab the wrong row (or nothing). We match the
      `tr.ticket.ticket-type` whose text contains "santa" — robust to re-ordering,
      same name-keyed philosophy as our slash-through pricing pattern.
   2. CAP BRAND reskin — cream #f5f0ec panel, deep maroon #671416 header, accent
      red #c82844 CTA, gold #c9a24b rules (was Bryan's dark #0f0f10 + #F61D0A).
   3. CONFIGURABLE TRIGGER — `AUTO_OPEN` flag. false (default) = the modal hijack
      fires when the page's "Add Photos with Santa" button calls
      window.capSantaLaunch(); true = auto-opens on load like Bryan's. One-line flip.

   Integration into the live page (pending Mat's go): paste this inside a <script>
   in christmas-at-the-princess-2026.content.html, replace the marketing-stub
   #capOvSanta modal + capOpenSanta(), and point the existing
   <button ... onclick="capOpenSanta()"> at window.capSantaLaunch().
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  // ── CONFIG ──────────────────────────────────────────────────────────────
  const AUTO_OPEN = false;            // false = wire to "Add Photos with Santa" button (default). true = auto-open on load (Bryan's behavior).
  const TICKET_MATCH = 'santa';       // case-insensitive substring matched against each ticket row's text to find the Santa ticket.
  const BLOCK_SEL = '#ticketBlock';   // native TS ticket block container.

  // OPTIONAL: still image if the video can't autoplay (Bryan's live Tambourine asset)
  const FALLBACK_POSTER = 'https://symphony.cdn.tambourine.com/christmas-at-the-princess/media/christmasattheprincess-santaexperience-photoswithsanta-63533312d8b93.webp';
  const BANNER_VIDEO    = 'https://symphony.cdn.tambourine.com/christmas-at-the-princess/media/santa-experience-header-63ade797339d1.mp4';

  // ── name-keyed section finder (replaces Bryan's fixed SECTION_SEL) ────────
  // Returns the tr.ticket.ticket-type whose visible text contains TICKET_MATCH.
  function findSection() {
    const rows = document.querySelectorAll(BLOCK_SEL + ' tr.ticket.ticket-type');
    for (const r of rows) {
      const h = r.querySelector('h4');
      const label = (h ? h.textContent : r.textContent) || '';
      if (label.toLowerCase().includes(TICKET_MATCH)) return r;
    }
    return null;
  }
  function waitForSection({timeout=20000}={}) {
    return new Promise((res, rej) => {
      const hit = findSection();
      if (hit) return res(hit);
      const obs = new MutationObserver(() => { const el = findSection(); if (el) done(el); });
      const to = setTimeout(() => { obs.disconnect(); rej(new Error('timeout: santa ticket not found in '+BLOCK_SEL)); }, timeout);
      function done(el){ clearTimeout(to); obs.disconnect(); res(el); }
      obs.observe(document.documentElement, {childList:true, subtree:true});
    });
  }
  function showElement(el){ if (el) el.style.display = ''; }

  // ── styles (CAP brand: cream panel, maroon header, red CTA, gold rules) ──
  const css = `
    :root{
      --cs-bg:#f5f0ec;        /* cream panel */
      --cs-fg:#2b1719;        /* near-black maroon text on cream */
      --cs-muted:#6b585a;     /* muted body text */
      --cs-border:#e6dcd2;    /* warm hairline */
      --cs-maroon:#671416;    /* deep maroon (header) */
      --cs-accent:#c82844;    /* bright accent red (CTA) */
      --cs-accent-2:#671416;  /* maroon (CTA hover) */
      --cs-gold:#c9a24b;      /* gold accents / fine rules */
      --cs-card:#ffffff;      /* white sub-card for the hijacked native ticket */
    }
    body.cs-modal-open { overflow: hidden; }

    #cs-overlay{
      position:fixed; inset:0;
      background: radial-gradient(120% 120% at 50% -20%, rgba(43,23,25,.78) 0%, rgba(43,23,25,.66) 60%, rgba(43,23,25,.60) 100%);
      backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
      z-index: 9998; display:none;
    }
    #cs-modal{
      position:fixed; inset:0; display:none; align-items:center; justify-content:center;
      z-index:10000; padding:16px;
    }
    #cs-modal .panel{
      width:min(720px, 92vw); max-height:88vh; overflow:auto;
      background: var(--cs-bg); color: var(--cs-fg);
      border-radius:16px; box-shadow: 0 24px 60px rgba(43,23,25,.45);
      border:1px solid var(--cs-gold);
      font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
      animation: cs-slide-up .18s ease-out both;
    }

    /* 🎥 Video banner */
    #cs-modal .banner{ position:relative; width:100%; height:210px; overflow:hidden;
      border-top-left-radius:16px; border-top-right-radius:16px; background:#1a0d0e;
    }
    #cs-modal .banner video{
      position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block;
    }
    #cs-modal .banner::after{
      content:""; position:absolute; inset:0;
      background: linear-gradient(to top, rgba(43,23,25,.55), rgba(43,23,25,.10));
      pointer-events:none;
    }

    /* Header — deep maroon bar, cream serif title, gold underline */
    #cs-modal .hdr{
      display:flex; align-items:center; justify-content:space-between; gap:12px;
      padding:14px 20px; background: var(--cs-maroon); color:#f5f0ec;
    }
    #cs-modal .hdr h3{
      margin:0; font-size:1.2rem; font-weight:600; color:#f7efe7;
      font-family:"Playfair Display", Georgia, "Times New Roman", serif; letter-spacing:.2px;
    }
    #cs-modal .hdr h3::after{
      content:""; display:block; margin-top:6px; width:48px; height:2px;
      background:var(--cs-gold); border-radius:2px;
    }
    #cs-modal .close{ cursor:pointer; font-size:20px; border:none; background:transparent;
      color:#f5f0ec; opacity:.85; padding:6px 8px; border-radius:8px; align-self:flex-start;
    }
    #cs-modal .close:hover, #cs-modal .close:focus-visible{ background:rgba(255,255,255,.14); opacity:1; }

    /* Body & content */
    #cs-modal .body{ padding:18px 18px 6px; }
    #cs-modal .body .pitch{
      background: rgba(103,20,22,.05); border:1px solid var(--cs-border);
      border-left:3px solid var(--cs-gold);
      border-radius:10px; padding:12px 14px; margin-bottom:14px;
      font-size:.98rem; line-height:1.4; color:var(--cs-fg);
    }
    #cs-modal h1,#cs-modal h2,#cs-modal h3,#cs-modal h4{ color:var(--cs-fg)!important; }
    #cs-modal .body p,#cs-modal .body li,#cs-modal .body label,#cs-modal .body .help,#cs-modal .body small{ color:var(--cs-muted)!important; }

    /* The hijacked native TS ticket row sits on a white sub-card so the
       native dark-on-white styling reads cleanly against the cream panel. */
    #cs-modal .cs-ticket-card{
      background:var(--cs-card); border:1px solid var(--cs-border);
      border-radius:12px; padding:6px 12px; margin-bottom:8px;
    }
    #cs-modal select,#cs-modal input[type="text"],#cs-modal input[type="number"]{
      background:#fff; color:var(--cs-fg); border:1px solid #d8ccc2; border-radius:10px; padding:8px 10px; font:inherit;
    }
    #cs-modal select:focus,#cs-modal input:focus{ outline:none; border-color:var(--cs-accent); box-shadow:0 0 0 3px rgba(200,40,68,.20); }

    /* Footer */
    #cs-modal .ftr{
      display:flex; gap:12px; flex-wrap:wrap; padding:14px 18px 18px;
      border-top:1px solid var(--cs-border); background:var(--cs-bg);
      border-bottom-left-radius:16px; border-bottom-right-radius:16px;
    }
    #cs-modal .btn{ border:none; cursor:pointer; padding:12px 18px; border-radius:999px;
      font-weight:700; letter-spacing:.4px; text-transform:uppercase; font-size:.85rem;
      transition:transform .06s, background .12s, color .12s; }
    #cs-regular-btn{ background:transparent; color:var(--cs-maroon); border:1px solid var(--cs-maroon); }
    #cs-regular-btn:hover{ background:rgba(103,20,22,.06); }
    #cs-keep-btn{ background:var(--cs-accent); color:#fff; }
    #cs-keep-btn:hover{ background:var(--cs-accent-2); }

    /* Mobile bottom-sheet + stacked rows */
    @media (max-width:560px){
      #cs-modal{ align-items:flex-end; padding:0; }
      #cs-modal .panel{ width:100%; border-radius:16px 16px 0 0; }
      #cs-modal .banner{ height:150px; border-radius:12px 12px 0 0; }
      #cs-modal .ftr .btn{ flex:1; padding:14px 16px; }

      #cs-modal .cs-mobile-stack{ width:100%; border-collapse:separate; border-spacing:0; }
      #cs-modal .cs-mobile-stack thead{ display:none; }
      #cs-modal .cs-mobile-stack tr{
        display:flex; flex-direction:column; gap:10px;
        padding:4px 0; margin:0;
      }
      #cs-modal .cs-mobile-stack td, #cs-modal .cs-mobile-stack th{
        display:block; width:100% !important; padding:6px 0 !important; text-align:left !important;
      }
      #cs-modal .cs-mobile-stack select,
      #cs-modal .cs-mobile-stack input[type="number"],
      #cs-modal .cs-mobile-stack input[type="text"]{ width:100%; }
      #cs-modal .cs-mobile-stack button, #cs-modal .cs-mobile-stack .button{ width:100%; justify-content:center; }
    }

    @keyframes cs-slide-up{ from{ transform:translateY(16px); opacity:.98; } to{ transform:translateY(0); opacity:1; } }

    .cs-hidden-placeholder{ display:none !important; }
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  // ── modal structure ──────────────────────────────────────────────────────
  const overlay = document.createElement('div'); overlay.id = 'cs-overlay';
  const modal = document.createElement('div'); modal.id = 'cs-modal';
  modal.innerHTML = `
    <div class="panel">
      <div class="banner"><!-- video injected dynamically for autoplay control --></div>
      <div class="hdr">
        <h3>Add Photos with Santa</h3>
        <button class="close" type="button" aria-label="Close">✕</button>
      </div>
      <div class="body">
        <div class="pitch">Make your night extra magical &mdash; reserve a timed Photos-with-Santa session and add it right to your order.</div>
        <div class="cs-ticket-card"><!-- the real native Santa ticket gets lifted in here --></div>
      </div>
      <div class="ftr">
        <button id="cs-regular-btn" class="btn" type="button">Keep Browsing</button>
        <button id="cs-keep-btn" class="btn" type="button">I selected a time slot</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  const ticketCard = modal.querySelector('.cs-ticket-card');
  const banner     = modal.querySelector('.banner');
  const closeBtn   = modal.querySelector('.close');
  const regularBtn = modal.querySelector('#cs-regular-btn');
  const keepBtn    = modal.querySelector('#cs-keep-btn');

  let placeholder = null, sectionEl = null, tmpWrapper = null, mo = null, isOpen = false;

  // Build video with correct attributes BEFORE setting src
  function ensureVideo() {
    if (banner.querySelector('video')) return banner.querySelector('video');
    const v = document.createElement('video');
    v.setAttribute('muted',''); v.muted = true;
    v.setAttribute('playsinline',''); v.setAttribute('webkit-playsinline','');
    v.autoplay = true; v.loop = true; v.preload = 'auto';
    v.poster = FALLBACK_POSTER || '';
    if (FALLBACK_POSTER) v.style.background = `center/cover no-repeat url("${FALLBACK_POSTER}")`;
    const src = document.createElement('source');
    src.src = BANNER_VIDEO; src.type = 'video/mp4';
    v.appendChild(src);
    banner.appendChild(v);
    return v;
  }
  async function tryPlay(video){
    try {
      await new Promise(r=>requestAnimationFrame(r));
      await video.play();
    } catch (err) {
      console.warn('[cap-santa] video autoplay blocked or failed:', err);
      video.removeAttribute('autoplay');
      const kick = () => { video.play().catch(()=>{}); modal.removeEventListener('click', kick); };
      modal.addEventListener('click', kick, { once:true });
    }
  }

  function paintOpen() {
    overlay.style.display = 'block';
    modal.style.display = 'flex';
    document.body.classList.add('cs-modal-open');
    tryPlay(ensureVideo());
  }

  function closeModal() {
    overlay.style.display = 'none';
    modal.style.display = 'none';
    document.body.classList.remove('cs-modal-open');
    isOpen = false;
    if (mo) { mo.disconnect(); mo = null; }

    // ALWAYS restore the section on close
    if (sectionEl && placeholder) {
      if (tmpWrapper && tmpWrapper.contains(sectionEl)) {
        tmpWrapper.parentNode && tmpWrapper.parentNode.insertBefore(sectionEl, tmpWrapper);
        tmpWrapper.remove(); tmpWrapper = null;
      }
      if (placeholder.parentNode) {
        placeholder.parentNode.insertBefore(sectionEl, placeholder);
      }
      showElement(sectionEl);
      placeholder.remove(); placeholder = null;
    }
    sectionEl = null;
  }

  function mountSection(el) {
    sectionEl = el;
    // placeholder to restore on close
    placeholder = document.createElement('div');
    placeholder.className = 'cs-hidden-placeholder';
    sectionEl.parentNode.insertBefore(placeholder, sectionEl);

    // If TBODY, wrap in a table so it's valid inside the modal + mobile-stack class
    if (sectionEl.tagName && sectionEl.tagName.toUpperCase() === 'TBODY') {
      tmpWrapper = document.createElement('table');
      tmpWrapper.className = 'cs-tmp-table cs-mobile-stack';
      tmpWrapper.appendChild(sectionEl);
      ticketCard.appendChild(tmpWrapper);
    } else {
      ticketCard.appendChild(sectionEl);
    }
  }

  // Public entry point — find the Santa ticket, hijack it into the modal, open.
  // Wire this to the page's "Add Photos with Santa" button (button mode), or
  // call it on load (AUTO_OPEN mode).
  function launch() {
    if (isOpen) return;
    isOpen = true;
    waitForSection().then(el => {
      mountSection(el);
      paintOpen();

      // Guard against TS SPA re-render swapping the row out from under us
      mo = new MutationObserver(() => {
        if (!document.body.contains(sectionEl)) {
          const again = findSection();
          if (again) {
            sectionEl = again;
            if (again.tagName.toUpperCase() === 'TBODY') {
              if (!tmpWrapper) {
                tmpWrapper = document.createElement('table');
                tmpWrapper.className = 'cs-tmp-table cs-mobile-stack';
                ticketCard.appendChild(tmpWrapper);
              }
              tmpWrapper.appendChild(sectionEl);
            } else {
              ticketCard.appendChild(sectionEl);
            }
          }
        }
      });
      mo.observe(document.documentElement, {childList:true, subtree:true});
    }).catch(err => {
      isOpen = false;
      console.warn('[cap-santa] could not open:', err && err.message);
    });
  }

  // ── accessibility + wiring ────────────────────────────────────────────────
  modal.setAttribute('role','dialog');
  modal.setAttribute('aria-modal','true');
  modal.setAttribute('aria-label','Add Photos with Santa to your order');
  document.addEventListener('keydown', e=>{ if (e.key==='Escape' && isOpen) closeModal(); });
  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  keepBtn.addEventListener('click', closeModal);     // neither button hides anything — both just close
  regularBtn.addEventListener('click', closeModal);

  // Expose the trigger so the page button can drive it.
  window.capSantaLaunch = launch;

  // ── trigger ───────────────────────────────────────────────────────────────
  if (AUTO_OPEN) {
    launch();
  }
})();
