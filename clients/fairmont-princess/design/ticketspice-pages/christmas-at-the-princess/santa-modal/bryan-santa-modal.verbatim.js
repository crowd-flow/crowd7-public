
(function () {
  const SECTION_SEL = '#ticketBlock > table > tbody:nth-child(7) > tr.ticket.ticket-type';

  // OPTIONAL: still image if video can’t autoplay
  const FALLBACK_POSTER = 'https://symphony.cdn.tambourine.com/christmas-at-the-princess/media/christmasattheprincess-santaexperience-photoswithsanta-63533312d8b93.webp';

  // ---- utilities ----
  function waitFor(sel, {timeout=20000}={}) {
    return new Promise((res, rej) => {
      const f = () => document.querySelector(sel);
      if (f()) return res(f());
      const obs = new MutationObserver(() => { if (f()) done(); });
      const to = setTimeout(() => { obs.disconnect(); rej(new Error('timeout: '+sel)); }, timeout);
      function done(){ clearTimeout(to); obs.disconnect(); res(f()); }
      obs.observe(document.documentElement, {childList:true,subtree:true});
    });
  }
  function showElement(el){ if (el) el.style.display = ''; }

  // ---- styles ----
  const css = `
    :root{
      --ux-bg:#0f0f10; --ux-fg:#f5f6f7; --ux-muted:#c8cbd0;
      --ux-border:#2a2b2f; --ux-accent:#F61D0A; --ux-accent-2:#c21609;
    }
    body.modal-open { overflow: hidden; }

    #ux-overlay{
      position:fixed; inset:0;
      background: radial-gradient(120% 120% at 50% -20%, rgba(0,0,0,.85) 0%, rgba(0,0,0,.72) 60%, rgba(0,0,0,.66) 100%);
      backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
      z-index: 9998; display:none;
    }
    #ux-modal{
      position:fixed; inset:0; display:none; align-items:center; justify-content:center;
      z-index:10000; padding:16px;
    }
    #ux-modal .panel{
      width:min(760px, 92vw); max-height:88vh; overflow:auto;
      background: var(--ux-bg); color: var(--ux-fg);
      border-radius:16px; box-shadow: 0 24px 60px rgba(0,0,0,.55);
      border:1px solid rgba(246,29,10,.35); font-family:Poppins,system-ui,sans-serif;
      animation: ux-slide-up .18s ease-out both;
    }

    /* 🎥 Video banner */
    #ux-modal .banner{ position:relative; width:100%; height:220px; overflow:hidden;
      border-top-left-radius:16px; border-top-right-radius:16px; background:#000;
    }
    #ux-modal .banner video{
      position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block;
      border-top-left-radius:16px; border-top-right-radius:16px;
    }
    #ux-modal .banner::after{
      content:\"\"; position:absolute; inset:0;
      background: linear-gradient(to top, rgba(0,0,0,.6), rgba(0,0,0,.15));
      pointer-events:none;
    }

    /* Header */
    #ux-modal .hdr{
      display:flex; align-items:center; justify-content:space-between; gap:12px;
      padding:14px 18px; background: linear-gradient(180deg,#141415 0%, #101011 100%);
      border-bottom:1px solid var(--ux-border);
    }
    #ux-modal .hdr h3{ margin:0; font-size:1.15rem; font-weight:700; color:var(--ux-fg); }
    #ux-modal .hdr h3::after{
      content:\"\"; display:inline-block; margin-left:.5ch; width:6ch; height:2px;
      background:var(--ux-accent); opacity:.8; border-radius:2px; vertical-align:middle;
    }
    #ux-modal .close{ cursor:pointer; font-size:20px; border:none; background:transparent;
      color:var(--ux-fg); opacity:.85; padding:6px 8px; border-radius:8px;
    }
    #ux-modal .close:hover, #ux-modal .close:focus-visible{ background:rgba(246,29,10,.12); opacity:1; }

    /* Body & content */
    #ux-modal .body{ padding:16px 16px 6px; }
    #ux-modal .body .pitch{
      background: rgba(246,29,10,.10); border:1px solid rgba(246,29,10,.35);
      border-radius:12px; padding:12px 14px; margin-bottom:14px;
      font-size:.98rem; line-height:1.35; color:var(--ux-fg);
    }
    #ux-modal h1,#ux-modal h2,#ux-modal h3,#ux-modal h4{ color:var(--ux-fg)!important; }
    #ux-modal p,#ux-modal li,#ux-modal label,#ux-modal .help,#ux-modal small{ color:var(--ux-muted)!important; }
    #ux-modal select,#ux-modal input[type=\"text\"],#ux-modal input[type=\"number\"]{
      background:#1a1b1e; color:var(--ux-fg); border:1px solid #32343a; border-radius:10px; padding:8px 10px; font:inherit;
    }
    #ux-modal select:focus,#ux-modal input:focus{ outline:none; border-color:var(--ux-accent); box-shadow:0 0 0 3px rgba(246,29,10,.25); }

    /* Footer */
    #ux-modal .ftr{
      display:flex; gap:12px; flex-wrap:wrap; padding:14px 16px 16px;
      border-top:1px solid var(--ux-border); background:linear-gradient(180deg,#111113 0%, #0f0f10 100%);
      border-bottom-left-radius:16px; border-bottom-right-radius:16px;
    }
    #ux-modal .btn{ border:none; cursor:pointer; padding:12px 16px; border-radius:12px; font-weight:700; transition:transform .06s, background .12s; }
    #ux-regular-btn{ background:#26272b; color:var(--ux-fg); }
    #ux-regular-btn:hover{ background:#333; }
    #ux-keep-btn{ background:var(--ux-accent); color:#fff; }
    #ux-keep-btn:hover{ background:var(--ux-accent-2); }

    /* Mobile bottom-sheet + stacked rows */
    @media (max-width:560px){
      #ux-modal{ align-items:flex-end; padding:0; }
      #ux-modal .panel{ width:100%; border-radius:16px 16px 0 0; }
      #ux-modal .banner{ height:150px; border-radius:12px 12px 0 0; }
      #ux-modal .ftr .btn{ flex:1; padding:14px 16px; }
      #ux-modal .hdr h3::after{ display:none; }

      /* --- Mobile stacking for the moved TBODY --- */
      #ux-modal .ux-mobile-stack{ width:100%; border-collapse:separate; border-spacing:0; }
      #ux-modal .ux-mobile-stack thead{ display:none; }
      #ux-modal .ux-mobile-stack tr{
        display:flex; flex-direction:column; gap:10px;
        padding:12px; margin:10px 0 12px;
        background:#121214; border:1px solid var(--ux-border); border-radius:12px;
      }
      #ux-modal .ux-mobile-stack td, #ux-modal .ux-mobile-stack th{
        display:block; width:100% !important; padding:6px 0 !important; text-align:left !important;
      }
      #ux-modal .ux-mobile-stack select,
      #ux-modal .ux-mobile-stack input[type=\"number\"],
      #ux-modal .ux-mobile-stack input[type=\"text\"]{ width:100%; }
      #ux-modal .ux-mobile-stack button, #ux-modal .ux-mobile-stack .button{ width:100%; justify-content:center; }
    }

    @keyframes ux-slide-up{ from{ transform:translateY(16px); opacity:.98; } to{ transform:translateY(0); opacity:1; } }

    .ux-hidden-placeholder{ display:none !important; }
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  // ---- modal structure ----
  const overlay = document.createElement('div'); overlay.id = 'ux-overlay';
  const modal = document.createElement('div'); modal.id = 'ux-modal';
  modal.innerHTML = `
    <div class=\"panel\">
      <div class=\"banner\"><!-- video injected dynamically for autoplay control --></div>
      <div class=\"hdr\">
        <h3>Upgrade your experience and add on photos with Santa</h3>
        <button class=\"close\" type=\"button\" aria-label=\"Close\">✕</button>
      </div>
      <div class=\"body\">
        <div class=\"pitch\">Make your night extra magical—reserve your photos with Santa today!</div>
      </div>
      <div class=\"ftr\">
        <button id=\"ux-regular-btn\" class=\"btn\" type=\"button\">Keep Browsing</button>
        <button id=\"ux-keep-btn\" class=\"btn\" type=\"button\">I selected a timeslot and ticket</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  const bodySlot   = modal.querySelector('.body');
  const banner     = modal.querySelector('.banner');
  const closeBtn   = modal.querySelector('.close');
  const regularBtn = modal.querySelector('#ux-regular-btn');
  const keepBtn    = modal.querySelector('#ux-keep-btn');

  let placeholder = null, sectionEl = null, tmpWrapper = null;

  // Build video with correct attributes BEFORE setting src
  function ensureVideo() {
    if (banner.querySelector('video')) return banner.querySelector('video');
    const v = document.createElement('video');
    v.setAttribute('muted',''); v.muted = true;
    v.setAttribute('playsinline',''); v.setAttribute('webkit-playsinline','');
    v.autoplay = true; v.loop = true; v.preload = 'auto';
    v.poster = FALLBACK_POSTER || '';
    if (FALLBACK_POSTER) v.style.background = `center/cover no-repeat url(\"${FALLBACK_POSTER}\")`;
    const src = document.createElement('source');
    src.src = 'https://symphony.cdn.tambourine.com/christmas-at-the-princess/media/santa-experience-header-63ade797339d1.mp4';
    src.type = 'video/mp4';
    v.appendChild(src);
    banner.appendChild(v);
    return v;
  }
  async function tryPlay(video){
    try {
      await new Promise(r=>requestAnimationFrame(r));
      await video.play();
    } catch (err) {
      console.warn('[upgrade] video autoplay blocked or failed:', err);
      video.removeAttribute('autoplay');
      const kick = () => { video.play().catch(()=>{}); modal.removeEventListener('click', kick); };
      modal.addEventListener('click', kick, { once:true });
    }
  }

  // ---- open/close ----
  function openModal() {
    overlay.style.display = 'block';
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    const vid = ensureVideo();
    tryPlay(vid);
  }
  function closeModal() {
    overlay.style.display = 'none';
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');

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
  }

  // ---- accessibility ----
  modal.setAttribute('role','dialog');
  modal.setAttribute('aria-modal','true');
  modal.setAttribute('aria-label','Upgrade your experience with private photos with Santa');
  document.addEventListener('keydown', e=>{ if (e.key==='Escape') closeModal(); });

  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  // Buttons: neither hides anything
  keepBtn.addEventListener('click', closeModal);
  regularBtn.addEventListener('click', closeModal);

  // ---- main ----
  waitFor(SECTION_SEL).then(el=>{
    sectionEl = el;

    // placeholder to restore on close
    placeholder = document.createElement('div');
    placeholder.className = 'ux-hidden-placeholder';
    sectionEl.parentNode.insertBefore(placeholder, sectionEl);

    // If TBODY, wrap in a table so it's valid inside modal + add mobile-stack class
    if (sectionEl.tagName && sectionEl.tagName.toUpperCase() === 'TBODY') {
      tmpWrapper = document.createElement('table');
      tmpWrapper.className = 'ux-tmp-table ux-mobile-stack';
      tmpWrapper.appendChild(sectionEl);
      bodySlot.appendChild(tmpWrapper);
    } else {
      bodySlot.appendChild(sectionEl);
    }

    openModal();

    // Guard against SPA re-render
    const mo = new MutationObserver(() => {
      if (!document.body.contains(sectionEl)) {
        const again = document.querySelector(SECTION_SEL);
        if (again) {
          sectionEl = again;
          if (again.tagName.toUpperCase() === 'TBODY') {
            if (!tmpWrapper) {
              tmpWrapper = document.createElement('table');
              tmpWrapper.className = 'ux-tmp-table ux-mobile-stack';
              bodySlot.appendChild(tmpWrapper);
            }
            tmpWrapper.appendChild(sectionEl);
          } else {
            bodySlot.appendChild(sectionEl);
          }
        }
      }
    });
    mo.observe(document.documentElement, {childList:true, subtree:true});
  }).catch(()=>{});
})();
