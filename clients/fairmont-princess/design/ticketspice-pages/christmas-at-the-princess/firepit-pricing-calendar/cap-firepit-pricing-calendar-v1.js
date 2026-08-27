/* ============================================================================
   🔥 CAP Fire-Pit Dynamic-Pricing Calendar — v1 PROTOTYPE
   Built by Crowdly, 2026-06-18 (ActionQ item 38346, capture-tier auto-delegate).

   ⚠️ ALL PRICES BELOW ARE PLACEHOLDER VALUES. Do not ship to production with
   these numbers live. Swap FIREPIT_TIERS + FIREPIT_CATEGORIES once Linnea's
   real per-tier / per-category pricing lands (see fairmont-firepit-sellthrough-
   spec.md for the reporting-side companion work and inventory constants).

   Goal (per ActionQ context): a fire-pit calendar/picker showing which dates
   are on sale (tier 1-5, value vs. peak) so value-conscious buyers can find
   off-peak deals and fill low-occupancy nights. Lodge is the cheapest
   category — its tier-1 price is the page's "Starting at $X/person" anchor.

   Categories + capacities are grounded in the confirmed 2025 TicketSpice
   levelLabels + inventory constants from the 7/13 Fire Table meeting:
     Fire & Ice  — 4-top (x16), 8-top (x12), 10-top (x4)
     Igloos      — capacity 6 (x13 units)
     Lodge       — capacity 6 (x6 units)   <-- cheapest category
     Chateau Champagne — 2-4 flex (x12), 6-top (x3)

   This module is self-contained (IIFE) and paste-ready into the content HTML
   the same way cap-santa-modal-v2.js is — see SANTA-MODAL-NOTES.md for the
   integration pattern this follows. It does NOT touch the native TS cart; it
   is a pre-cart pricing/discovery tool. Wiring it to actually filter/jump to
   the matching native ticket level is a v2 step, gated on the page shipping
   the multi-type build (level = category x window) called for in the
   sell-through spec — until then this is informational only.
============================================================================ */
(function () {
  'use strict';

  // ---- 5 pricing tiers (placeholder multipliers, value -> peak) ----------
  var FIREPIT_TIERS = [
    { n: 1, label: 'Best Value',   color: '#7a9b6e', mult: 1.00 },
    { n: 2, label: 'Great Value',  color: '#c9a24b', mult: 1.15 },
    { n: 3, label: 'Standard',     color: '#d98b3f', mult: 1.30 },
    { n: 4, label: 'Popular',      color: '#c82844', mult: 1.55 },
    { n: 5, label: 'Peak Demand',  color: '#671416', mult: 1.85 }
  ];

  // ---- Fire-pit categories, base (tier-1) per-person price, sorted low->high
  var FIREPIT_CATEGORIES = [
    { key: 'lodge',    label: 'Lodge',                          capacity: 6, base: 35 },
    { key: 'fi4',      label: 'Fire & Ice — 4-Top',              capacity: 4, base: 45 },
    { key: 'cc4',      label: 'Chateau Champagne — 2-4 Flex',    capacity: 4, base: 50 },
    { key: 'fi8',      label: 'Fire & Ice — 8-Top',              capacity: 8, base: 55 },
    { key: 'cc6',      label: 'Chateau Champagne — 6-Top',       capacity: 6, base: 58 },
    { key: 'igloo',    label: 'The Igloos',                      capacity: 6, base: 60 },
    { key: 'fi10',     label: 'Fire & Ice — 10-Top',             capacity: 10, base: 65 }
  ];

  var LOWEST_BASE = Math.min.apply(null, FIREPIT_CATEGORIES.map(function (c) { return c.base; }));

  // ---- Deterministic placeholder tier-per-date (weekday/weekend + a
  //      hand-seeded holiday-cluster bump) so the demo calendar LOOKS like
  //      real seasonal pacing without any real data behind it. ----------
  function tierForDate(y, m, d) {
    var dow = new Date(y, m, d).getDay(); // 0 Sun .. 6 Sat
    var tier = 1;
    if (dow === 5 || dow === 6) tier = 4;        // Fri/Sat -> Popular
    else if (dow === 0 || dow === 1) tier = 2;   // Sun/Mon -> Great Value
    else tier = 1;                                // Tue-Thu -> Best Value
    // Holiday cluster bump (placeholder: Dec 20-31 reads Peak regardless of dow)
    if (m === 11 && d >= 20 && d <= 31) tier = 5;
    else if (m === 11 && d >= 13 && d <= 19) tier = Math.min(tier + 1, 5);
    return tier;
  }

  function fmtMoney(n) { return '$' + Math.round(n); }

  function priceRangeForTier(tierN) {
    var mult = FIREPIT_TIERS[tierN - 1].mult;
    var lo = Math.round(LOWEST_BASE * mult);
    var hi = Math.round(Math.max.apply(null, FIREPIT_CATEGORIES.map(function (c) { return c.base; })) * mult);
    return fmtMoney(lo) + '–' + fmtMoney(hi);
  }

  // ---- Rendering -----------------------------------------------------------
  var MONTHS = [
    { y: 2026, m: 10, name: 'November 2026' }, // m is 0-indexed: 10 = Nov
    { y: 2026, m: 11, name: 'December 2026' }
  ];

  function buildCalendarHTML() {
    var html = '';
    MONTHS.forEach(function (mo) {
      var first = new Date(mo.y, mo.m, 1);
      var startDow = first.getDay();
      var daysInMonth = new Date(mo.y, mo.m + 1, 0).getDate();
      html += '<div class="fp-month"><div class="fp-month-name">' + mo.name + '</div>';
      html += '<div class="fp-grid">';
      ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(function (dl) {
        html += '<div class="fp-dow">' + dl + '</div>';
      });
      for (var i = 0; i < startDow; i++) html += '<div class="fp-cell fp-empty"></div>';
      for (var d = 1; d <= daysInMonth; d++) {
        var tier = tierForDate(mo.y, mo.m, d);
        var color = FIREPIT_TIERS[tier - 1].color;
        html += '<button type="button" class="fp-cell fp-date" style="--tier-color:' + color + '" ' +
                'data-y="' + mo.y + '" data-m="' + mo.m + '" data-d="' + d + '" data-tier="' + tier + '">' +
                '<span class="fp-daynum">' + d + '</span></button>';
      }
      html += '</div></div>';
    });
    return html;
  }

  function buildLegendHTML() {
    return FIREPIT_TIERS.map(function (t) {
      return '<div class="fp-legend-item"><span class="fp-swatch" style="background:' + t.color + '"></span>' +
             '<span class="fp-legend-label">Tier ' + t.n + ' — ' + t.label + '</span>' +
             '<span class="fp-legend-range">' + priceRangeForTier(t.n) + '/person</span></div>';
    }).join('');
  }

  function buildPricingTableHTML(tierN) {
    var mult = FIREPIT_TIERS[tierN - 1].mult;
    var rows = FIREPIT_CATEGORIES.map(function (c) {
      var pp = Math.round(c.base * mult);
      var table = pp * c.capacity;
      var isLodge = c.key === 'lodge';
      return '<tr' + (isLodge ? ' class="fp-row-lodge"' : '') + '>' +
        '<td>' + c.label + (isLodge ? ' <span class="fp-startat-tag">Starting At</span>' : '') + '</td>' +
        '<td>' + c.capacity + '</td>' +
        '<td>' + fmtMoney(pp) + '/person</td>' +
        '<td>' + fmtMoney(table) + '/table</td>' +
        '</tr>';
    }).join('');
    return '<table class="fp-pricing-table"><thead><tr><th>Category</th><th>Seats</th><th>Per-Person</th><th>Per-Table</th></tr></thead><tbody>' + rows + '</tbody></table>';
  }

  function selectDate(y, m, d, tierN) {
    var dateObj = new Date(y, m, d);
    var dateLabel = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    var panel = document.getElementById('fpDetailPanel');
    if (!panel) return;
    var tier = FIREPIT_TIERS[tierN - 1];
    panel.innerHTML =
      '<div class="fp-detail-head">' +
        '<div class="fp-detail-date">' + dateLabel + '</div>' +
        '<div class="fp-detail-tier" style="background:' + tier.color + '">Tier ' + tier.n + ' — ' + tier.label + '</div>' +
      '</div>' +
      buildPricingTableHTML(tierN) +
      '<button type="button" class="fp-reserve-btn" onclick="alert(\'Prototype only \\u2014 wires to the native TicketSpice cart once the page ships the category\\u00d7window multi-type build. See fairmont-firepit-sellthrough-spec.md.\')">Reserve This Date</button>';
    document.querySelectorAll('.fp-date.fp-selected').forEach(function (el) { el.classList.remove('fp-selected'); });
    var sel = document.querySelector('.fp-date[data-y="' + y + '"][data-m="' + m + '"][data-d="' + d + '"]');
    if (sel) sel.classList.add('fp-selected');
  }

  function openFirepitModal() {
    var ov = document.getElementById('capOvFirepit');
    if (!ov) return;
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
    var grid = document.getElementById('fpCalendarGrid');
    if (grid && !grid.dataset.built) {
      grid.innerHTML = buildCalendarHTML();
      grid.dataset.built = '1';
      grid.querySelectorAll('.fp-date').forEach(function (btn) {
        btn.addEventListener('click', function () {
          selectDate(parseInt(btn.dataset.y, 10), parseInt(btn.dataset.m, 10), parseInt(btn.dataset.d, 10), parseInt(btn.dataset.tier, 10));
        });
      });
    }
    var legend = document.getElementById('fpLegend');
    if (legend && !legend.dataset.built) {
      legend.innerHTML = buildLegendHTML();
      legend.dataset.built = '1';
    }
  }

  function closeFirepitModal() {
    var ov = document.getElementById('capOvFirepit');
    if (!ov) return;
    ov.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var ov = document.getElementById('capOvFirepit');
    if (ov) ov.addEventListener('click', function (e) { if (e.target === ov) closeFirepitModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeFirepitModal(); });
  });

  window.capFirepitLaunch = openFirepitModal;
  window.capFirepitClose = closeFirepitModal;
  window.CAP_FIREPIT_LOWEST_BASE = LOWEST_BASE; // exposed so the trigger button can print "Starting at $X"
})();
