//***************************//
// TF-STB Map add-on for XDock PRO
// Dernière mise à jour le 12/03/2026
//***************************//

$("<style>").appendTo("head").html(`

  @media print {
    @page { size: landscape; }
    body {
      background: #fff !important;
      height: 21cm;
      width: 29.7cm;
      overflow: hidden;
    }
    #a4 { zoom: 100% !important; }
    .container-fluid.mt-3, #xdock_pro_page_header, .countdown-container, #note--map-container {
      display: none !important;
    }
    .guide {
      bottom: 70px !important;
      left: 73px !important;
      zoom: 90%;
    }
    .date { display: block !important; }
  }

  
  #a4 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    height: 21cm;
    width: 29.7cm;
    background-color: #fff;
    position: relative;
    zoom: 120%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }

 

[zone]{
box-shadow:0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
}
  #a4 > * { box-sizing: border-box; margin: 0; padding: 0; }
  #map-border {
    height: 90%;
    width: 90%;
    border: 2px solid #929292;
    margin: auto;
    margin-top: 30px;
  }
  .first_color { background-color: #b3b3b3; }
  .sec_color   { background-color: #d4d4d4; }
  .free        { background: #2ecc71 !important; }
  .taken       { background: #3498db; }
  .en_cours    { background: #e67e22; }
  .de_hier     { background: #34495e !important; }
  a.de_hier > div[id], a.blocked > div[id] { color: #fff !important; }
  a.blocked > div[id] { color: #fff !important; text-align: center; font-size: 11px; }
  .de_avance   { background: #f1c40f !important; }
  .blocked     { background: #c0392b !important; }
  .m-0         { margin: 0 !important; }
  #a4 a { text-decoration: none; color: inherit; font-size:13px; }
  #a4 a:hover { opacity: 0.7; }
  a.url_edit { height: 100%; width: 100%; }

  .M {
    position: absolute; top: 58px; left: 110px;
    display: flex; justify-content: center; align-items: center;
  }
  .zoneM {
    height: 70px; width: 50px; margin-left: 4px;
    display: flex; align-items: center; justify-content: space-around; flex-direction: column;
  }
  .zone_M_name { position: absolute; top: -20px; }

  .C {
    position: absolute; bottom: 98px; right: 61px;
    display: flex; justify-content: center; align-items: center; flex-direction: column-reverse;
  }
  .zoneC { height: 30px; width: 75px; display: flex; align-items: center; justify-content: space-around; margin-bottom: 4px; }
  [zone="C6"] { margin-top: 10px; }
  .zone_C_name { position: absolute; left: -25px; }

  .C_B_L { position: absolute; right: 257px; top: 197px; }
  .C_B_L > .top { display: flex; }
  .zone_top_right {
    width: 100px; height: 37px; margin-right: 4px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
  }
  .zone_top_right_name { position: absolute; top: -20px; }
  .center_B_C { display: flex; align-items: center; justify-content: center; margin-top: 4px; }
  .left_B { margin-right: 4px; width: 50%; }
  .rghit_C { width: 50%; }
  .zone_long { height: 30px; margin-bottom: 4px; display: flex; align-items: center; justify-content: space-around; }
  .long_right { flex-direction: row-reverse; }
  .zone_long_right_name { position: absolute; right: -25px; }
  .zone_long_left_name  { position: absolute; left: -26px; }
  .right_L { position: relative; display: flex; height: 187px; }
  .zoneL {
    margin-right: 4px; width: 18px;
    display: flex; align-items: center; justify-content: center; flex-direction: column-reverse;
  }
  .zone_L_name { position: absolute; bottom: -18px; }
  .L_value { rotate: -90deg; }

  .A_B_L { position: absolute; left: 144px; top: 208px; }
  .A_B_L > .top { display: flex; align-items: center; }
  .zone_top_left {
    width: 53px; height: 53px; margin-right: 4px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
  }
  .zone_top_left_name { position: absolute; top: -20px; }
  .A_B_L > .center { display: flex; margin-top: 4px; }
  .A_B_L > .down { display: flex; height: 195px; }
  .A_B_L > .down > .right { display: flex; }
  .left_a5 { margin-right: 4px; width: 60%; }
  .l1_name { position: absolute; bottom: -18px; left: 119px; }
  .l1 { width: 40px; text-align: left; float: right; height: 25px; margin-bottom: 4px; display: flex; align-items: center; justify-content: space-around; }

  .guide { position: absolute; bottom: 17px; left: 66px; font-size: 10px; color: #292929; }
  .gud_item { margin-right: 15px; display: flex; }
  .gud_item .title { margin-right: 4px; }
  .color { height: 12px; width: 12px; border-radius: 50%; margin-right: 3px; }
  #show_avance, #show_SM_hier { cursor: pointer; text-decoration: underline; }
  .zoneL { text-wrap: nowrap; }
  .rlq { border: 1px solid #c0392b; }


    /* ══════════════════════════════════════════
       COUNTDOWN CONTAINER
    ══════════════════════════════════════════ */
    .countdown-container {
      width: 100%;
      background: #ffffff;
      overflow: hidden;
      margin-top: 65px !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    }

    /* ══════════════════════════════════════════
       TIMELINE SECTION
    ══════════════════════════════════════════ */
    .timeline-section {
      padding: 28px 32px 24px;
    }

    .timeline-title {
      font-size: 11px;
      font-weight: 600;
      color: #1f1f1f;
      text-transform: uppercase;
      margin-bottom: 24px;
    }

    /* ── Track ── */
    .tl-track {
      display: flex;
      align-items: flex-start;
      position: relative;
    }

    /* ── Individual step ── */
    .tl-step {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }

    /* connector line between steps */
    .tl-step:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 17px;
      left: calc(50% + 20px);
      right: calc(-50% + 20px);
      height: 2px;
      background: #e3e6ef;
      z-index: 0;
      transition: background 0.3s ease;
    }
    .tl-step.done:not(:last-child)::after   { background: #27ae60; }
    .tl-step.active:not(:last-child)::after { background: #2980b9; }
    .tl-step.warn:not(:last-child)::after   { background: #e67e22; }
    .tl-step.danger:not(:last-child)::after { background: #c0392b; }
    .tl-step.info:not(:last-child)::after   { background: #5dade2; }

    /* ── Icon circle ── */
    .tl-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #dde1ea;
      background: #f3f4f8;
      position: relative;
      z-index: 1;
      transition: all 0.2s ease;
    }
    .tl-icon svg { width: 16px; height: 16px; }

    /* state: done — green */
    .tl-step.done .tl-icon {
      background: #27ae60;
      border-color: #27ae60;
    }
    /* state: active — blue */
    .tl-step.active .tl-icon {
      background: #2980b9;
      border-color: #2980b9;
      box-shadow: 0 0 0 5px rgba(41, 128, 185, 0.14);
    }
    /* state: warn — orange */
    .tl-step.warn .tl-icon {
      background: #e67e22;
      border-color: #e67e22;
      box-shadow: 0 0 0 5px rgba(230, 126, 34, 0.12);
    }
    /* state: danger — red */
    .tl-step.danger .tl-icon {
      background: #c0392b;
      border-color: #c0392b;
      box-shadow: 0 0 0 5px rgba(192, 57, 43, 0.12);
    }
    /* state: info — light blue */
    .tl-step.info .tl-icon {
      background: #5dade2;
      border-color: #5dade2;
      box-shadow: 0 0 0 5px rgba(93, 173, 226, 0.14);
    }
    /* state: idle */
    .tl-step.idle .tl-icon {
      background: #f3f4f8;
      border-color: #dde1ea;
    }

    /* ── Step label ── */
    .tl-label {
      margin-top: 10px;
      font-size: 11px;
      font-weight: 600;
      color: #9aa0b8;
      text-align: center;
      line-height: 1.35;
      max-width: 85px;
    }
    .tl-step.done .tl-label   { color: #1e2340; }
    .tl-step.active .tl-label { color: #1e2340; }
    .tl-step.warn .tl-label   { color: #1e2340; }
    .tl-step.danger .tl-label { color: #1e2340; }
    .tl-step.info .tl-label   { color: #1e2340; }

    /* ── Status code badges ── */
    .tl-badges {
      margin-top: 6px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 3px;
    }
    .badge {
      font-size: 9px;
      font-weight: 600;
      padding: 2px 5px;
      border-radius: 4px;
      background: #f0f2f7;
      color: #8a90a8;
      border: 0.5px solid #dde1ea;
      letter-spacing: 0.2px;
    }
    .tl-step.done .badge {
      background: #eaf7f0;
      color: #1a7a45;
      border-color: #a3d9bc;
    }
    .tl-step.active .badge {
      background: #e8f3fb;
      color: #1a5f8a;
      border-color: #90c3e8;
    }
    .tl-step.warn .badge {
      background: #fdf3e8;
      color: #8a4a10;
      border-color: #f0c08a;
    }
    .tl-step.danger .badge {
      background: #fdecea;
      color: #7b1c13;
      border-color: #f0a09e;
    }
    .tl-step.info .badge {
      background: #eaf4fb;
      color: #1a5f8a;
      border-color: #aed6f1;
    }

    /* ── Count below badge ── */
    .tl-count {
      font-size: 20px;
      font-weight: 600;
      color: #c0c5d8;
      margin-top: 8px;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }
    .tl-step.done .tl-count   { color: #27ae60; }
    .tl-step.active .tl-count { color: #2980b9; }
    .tl-step.warn .tl-count   { color: #e67e22; }
    .tl-step.danger .tl-count { color: #c0392b; }
    .tl-step.info .tl-count   { color: #5dade2; }

    /* ── Legend row ── */
    .tl-legend {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-top: 22px;
      padding-top: 16px;
      border-top: 1px solid #eaecf2;
    }
    .leg {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: #7b829a;
      font-weight: 500;
    }
    .leg-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  .double-zonage { border: 2px dashed red; background-color: rgba(255, 0, 0, 0.1) !important; }
  footer { margin-top: 450px; }
`);

// ─── HTML Template ────────────────────────────────────────────────────────────

let a4 = `
  <div id="a4">
    <div id="map-border"></div>

    <!-- Zone M -->
    <div class="M">
      ${[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(n => `
        <a class="zoneM ${n % 2 ? 'first_color' : 'sec_color'}" zone="M${n}" target="_blank">
          <div class="zone_M_name">M${n}</div>
          <div id="M${n}"></div>
        </a>`).join('')}
    </div>

    <!-- Zone C (bottom row: C1–C6 consecutive, then even C8–C24) -->
    <div class="C">
      ${[1,2,3,4,5,6,8,10,12,14,16,18,20,22,24].map(n => `
        <a class="zoneC ${n % 2 ? 'first_color' : 'sec_color'}" zone="C${n}" target="_blank">
          <div class="zone_C_name">C${n}</div>
          <div id="C${n}"></div>
        </a>`).join('')}
    </div>

    <!-- Zone C_B_L -->
    <div class="C_B_L">
      <div class="top">
        ${[['B16','first_color'],['C23','sec_color'],['C21','first_color m-0']].map(([z,cls]) => `
          <a class="zone_top_right ${cls}" zone="${z}" target="_blank">
            <div class="zone_top_right_name">${z}</div>
            <div id="${z}"></div>
          </a>`).join('')}
      </div>
      <div class="center_B_C">
        <div class="left_B">
          ${[14,12,10,8,6,4,2].map(n => `
            <a class="zone_long ${n % 4 === 2 ? 'first_color' : 'sec_color'}" zone="B${n}" target="_blank">
              <div class="zone_long_left_name">B${n}</div>
              <div id="B${n}"></div>
            </a>`).join('')}
        </div>
        <div class="rghit_C">
          ${[19,17,15,13,11,9,7].map(n => `
            <a class="zone_long long_right ${n % 2 ? 'first_color' : 'sec_color'}" zone="C${n}" target="_blank">
              <div class="zone_long_right_name">C${n}</div>
              <div id="C${n}"></div>
            </a>`).join('')}
        </div>
      </div>
      <div class="right_L">
        ${[8,9,10,11,12,13,14,15,16,17,18,19,20,21].map(n => `
          <a class="zoneL ${n % 2 === 0 ? 'first_color' : 'sec_color'}" zone="L${n}" target="_blank">
            <div class="zone_L_name">L${n}</div>
            <div class="L_value" id="L${n}"></div>
          </a>`).join('')}
      </div>
    </div>

    <!-- Zone A_B_L -->
    <div class="A_B_L">
      <div class="top">
        ${[['A11','first_color'],['A12','sec_color'],['B17','first_color'],['B15','sec_color'],['B13','first_color m-0']].map(([z,cls]) => `
          <a class="zone_top_left ${cls}" zone="${z}" target="_blank">
            <div class="zone_top_left_name">${z}</div>
            <div id="${z}"></div>
          </a>`).join('')}
      </div>
      <div class="center">
        <div class="left_B">
          ${[10,9,8,7,6,5].map(n => `
            <a class="zone_long ${n % 2 === 0 ? 'first_color' : 'sec_color'}" zone="A${n}" target="_blank">
              <div class="zone_long_left_name">A${n}</div>
              <div id="A${n}"></div>
            </a>`).join('')}
        </div>
        <div class="rghit_C">
          ${[11,9,7,5,3,1].map(n => `
            <a class="zone_long long_right ${n % 2 ? 'first_color' : 'sec_color'}" zone="B${n}" target="_blank">
              <div class="zone_long_right_name">B${n}</div>
              <div id="B${n}"></div>
            </a>`).join('')}
        </div>
      </div>
      <div class="down">
        <div class="left_a5">
          ${[4,3,2,1].map(n => `
            <a class="zone_long ${n % 2 === 0 ? 'first_color' : 'sec_color'}" zone="A${n}" target="_blank">
              <div class="zone_long_left_name">A${n}</div>
              <div id="A${n}"></div>
            </a>`).join('')}
          <div class="zone_long first_color" zone="A0">
            <div class="zone_long_left_name"></div>
            <div id="A0"></div>
          </div>
          <a class="zone_long l1 sec_color" zone="L1" target="_blank">
            <div class="zone_long_left_name l1_name">L1</div>
            <div id="L1"></div>
          </a>
        </div>
        <div class="right">
          ${[2,3,4,5,6,7].map(n => `
            <a class="zoneL ${n % 2 === 0 ? 'sec_color' : 'first_color'}" zone="L${n}" target="_blank">
              <div class="zone_L_name">L${n}</div>
              <div class="L_value" id="L${n}"></div>
            </a>`).join('')}
        </div>
      </div>
    </div>

   
    <div class="guide d-flex">
      <div class="gud_item"><div class="color free"></div>    <span class="title">Zones libres</span>      <span id="total_free"></span></div>
      <div class="gud_item"><div class="color taken"></div>   <span class="title">Zones occupées</span>    <span id="total_taken"></span></div>
      <div class="gud_item"><div class="color blocked"></div> <span class="title">Zones bloquées</span>    <span id="total_blocked"></span></div>
      <div class="gud_item"><div class="color en_cours"></div><span class="title">SM en cours</span>       <span id="total_en_cours"></span></div>
      <div class="gud_item"><div class="color de_avance"></div><span class="title">Marchandises en avance</span><span id="total_de_avance"></span></div>
      <div class="gud_item"><div class="color de_hier"></div> <span class="title">Reliquats</span>         <span id="total_de_hier"></span></div>
      <div class="gud_item"><div class="color first_color"></div><span class="title">Données inconnues</span></div>
      <div class="gud_item"><span class="date d-none">Date d'impression: <span id="date_of_print"></span></span></div>
    </div>

 
     <!-- countdown -->
   <div class="countdown-container">
    <div class="timeline-section">

      <div class="timeline-title">Progression des camions</div>

      <div class="tl-track">

        <!-- STEP 1 — Non zoné · statut 10 · RED -->
        <div class="tl-step danger">
          <div class="tl-icon">
            <svg viewBox="0 0 16 16" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="8" cy="8" r="6.2"/>
              <line x1="8" y1="4.8" x2="8" y2="8.8"/>
              <circle cx="8" cy="11" r="0.8" fill="#ffffff" stroke="none"/>
            </svg>
          </div>
          <div class="tl-label">Non zoné</div>
          <div class="tl-badges"><span class="badge">10</span></div>
          <div class="tl-count" id="tl-nozone">-</div>
        </div>

        <!-- STEP 1b — Grand lot à venir · statut 10 · LIGHT BLUE -->
        <div class="tl-step info">
          <div class="tl-icon">
             <svg viewBox="0 0 16 16" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 2v4l2.5 2.5"/>
              <circle cx="8" cy="8" r="6"/>
            </svg>
          </div>
          <div class="tl-label">Grand lot à venir</div>
          <div class="tl-badges"><span class="badge">10</span></div>
          <div class="tl-count" id="tl-grandlot">-</div>
        </div>

        <!-- STEP 2 — Zoné · statuts 11, 50, 70, 71, 72 · BLUE -->
        <div class="tl-step active">
          <div class="tl-icon">
            <svg viewBox="0 0 16 16" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 2h5.5l6 6a1.5 1.5 0 0 1 0 2.1l-3.4 3.4a1.5 1.5 0 0 1-2.1 0L2 7.5V2z"/>
              <circle cx="5.5" cy="5.5" r="1" fill="#ffffff" stroke="none"/>
            </svg>
          </div>
          <div class="tl-label">Zoné</div>
          <div class="tl-badges">
            <span class="badge">11</span>
            <span class="badge">50</span>
            <span class="badge">70</span>
            <span class="badge">71</span>
            <span class="badge">72</span>
          </div>
          <div class="tl-count" id="tl-zoned">-</div>
        </div>

        <!-- STEP 3 — À la porte · statut 75 · BLUE -->
        <div class="tl-step active">
          <div class="tl-icon">
            <svg viewBox="0 0 16 16" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="1.5" width="10" height="13" rx="1"/>
              <line x1="3" y1="14.5" x2="13" y2="14.5"/>
              <circle cx="10.5" cy="8" r="0.8" fill="#ffffff" stroke="none"/>
            </svg>
          </div>
          <div class="tl-label">À la porte</div>
          <div class="tl-badges"><span class="badge">75</span></div>
          <div class="tl-count" id="tl-door">-</div>
        </div>

        <!-- STEP 3b — Pré-chargement en cours · statut 75 · ORANGE -->
        <div class="tl-step warn">
          <div class="tl-icon">
            <svg viewBox="0 0 16 16" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 2v4l2.5 2.5"/>
              <circle cx="8" cy="8" r="6"/>
            </svg>
          </div>
          <div class="tl-label">Pré-chargement en cours</div>
          <div class="tl-badges"><span class="badge">75</span></div>
          <div class="tl-count" id="tl-preload">-</div>
        </div>

        <!-- STEP 4 — En cours de chargement · statuts 80, 81 · ORANGE -->
        <div class="tl-step warn">
          <div class="tl-icon">
            <svg viewBox="0 0 16 16" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="4" width="9" height="7" rx="1"/>
              <path d="M10 6.5h2.5l2 2.5V11H10V6.5z"/>
              <circle cx="3.5" cy="12.5" r="1.2"/>
              <circle cx="12" cy="12.5" r="1.2"/>
            </svg>
          </div>
          <div class="tl-label">En cours de chargement</div>
          <div class="tl-badges">
            <span class="badge">80</span>
            <span class="badge">81</span>
          </div>
          <div class="tl-count" id="tl-loading">-</div>
        </div>

        <!-- STEP 5 — Terminé · statuts 89, 90 · GREEN -->
        <div class="tl-step done">
          <div class="tl-icon">
            <svg viewBox="0 0 16 16" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2.5 8.5l3.5 3.5 7-7"/>
            </svg>
          </div>
          <div class="tl-label">Terminé</div>
          <div class="tl-badges">
            <span class="badge">89</span>
            <span class="badge">90</span>
          </div>
          <div class="tl-count" id="tl-done">-</div>
        </div>

      </div>
      <!-- /tl-track -->

      <!-- Legend -->
      <div class="tl-legend">
        <div class="leg"><div class="leg-dot" style="background:#c0392b;"></div>Non zoné</div>
        <div class="leg"><div class="leg-dot" style="background:#5dade2;"></div>Grand lot</div>
        <div class="leg"><div class="leg-dot" style="background:#2980b9;"></div>En cours</div>
        <div class="leg"><div class="leg-dot" style="background:#e67e22;"></div>Chargement</div>
        <div class="leg"><div class="leg-dot" style="background:#27ae60;"></div>Terminé</div>
        <div class="leg"><div class="leg-dot" style="background:#c0c5d8;"></div>Aucune donnée</div>
      </div>

    </div>
  </div>
    <!-- /timeline-section -->

  
  <!-- /countdown-container -->

    <div class="info mt-3 small text-muted">
      <p><strong><i class="fal fa-info-circle"></i> Ctrl + clic</strong> sur une zone occupée pour ouvrir le SM correspondant dans une nouvelle fenêtre</strong></p>
      

      
    </div>
  </div>`;

// ─── Constants ────────────────────────────────────────────────────────────────

const TOTAL_ZONES = 90;

const STATUS = {
  FREE:      'free',
  TAKEN:     'taken',
  EN_COURS:  'en_cours',
  DE_HIER:   'de_hier',
  DE_AVANCE: 'de_avance',
  BLOCKED:   'blocked',
};

// Status codes that map to en_cours
const EN_COURS_CODES = new Set([80, 81]);

/**
 * Lookup map: normalized location name → 3-letter code.
 * Keys are lowercased and trimmed. Add new entries here as needed.
 */
const LOCATION_CODE_MAP = {
  // France
  'ablis':                        'ABL',
  'alcalá':                       'ALC',
  'alcala':                       'ALC',
  'arcs-sur-argens':              'ASA',
  'barbery':                      'BAR',
  'baziège':                      'BAZ',
  'baziege':                      'BAZ',
  'beaucaire':                    'LUN',
  'béziers':                      'BEZ',
  'beziers':                      'BEZ',
  'carquefou':                    'CAQ',
  'cestas':                       'CET',
  'chanteloup-les-vignes':        'CLV',
  'entzheim':                     'ENT',
  'gondreville':                  'GON',
  'guingamp':                     'GUI',
  'châtelaudren-plouagat':        'GUI',
  'chatelaudren-plouagat':        'GUI',
  'honguemare-guenouville':       'HON',
  "la chapelle d'armentières":    'LCA',
  'le coudray-montceaux':         'LCM',
  'liffré':                       'LIF',
  'liffre':                       'LIF',
  'lillers':                      'LIL',
  'loures':                       'LOU',
  'lunel':                        'LUN',
  'meaux':                        'MEA',
  'montchanin':                   'MON',
  'montoy flanville':             'MFV',
  'plouagat':                     'PLO',
  'pontcharra':                   'PCH',
  'provence':                     'PRO',
  'rousset':                      'PRO',
  'sailly-lez-cambrai':           'SLC',
  'saint quentin fallavier':      'SQF',
  'saint augustin':               'SAI',
  'sorigny':                      'SOR',
  'vars':                         'VAR',
  // Spain
  'barcelona':                    'BCN',
  'granada':                      'GRN',
  'málaga':                       'MLG',
  'malaga':                       'MLG',
  'murcia':                       'MUR',
  'sevilla':                      'SEV',
  'tarragona':                    'TRG',
  'valencia':                     'VLC',
  'vitoria':                      'VIT',
  'martorell':                    'MAT',
  // Portugal
  'palmela':                      'PAL',
  'santo tirso':                  'SAN',
  'sintra':                       'SIN',
  'torres novas':                 'TON',
  'narón':                        'NAR',
  'naron':                        'NAR',
  // Special
  'gran canaria':                 'GCA?_TEN?',
  'tenerife':                     'GCA?_TEN?',
};

const BLOCKED_REASON_MAP = [
  { keyword: 'livraison lundi', label: 'Livraison Lundi' },
  { keyword: 'lundi',           label: 'Lundi' },
  { keyword: 'mardi',           label: 'Mardi' },
  { keyword: 'mercredi',        label: 'Mercredi' },
  { keyword: 'jeudi',           label: 'Jeudi' },
  { keyword: 'vendredi',        label: 'Vendredi' },
  { keyword: 'samedi',          label: 'Livraison samedi' },
  { keyword: 'alsace',          label: 'Alsace Lait' },
  { keyword: 'palettes vides',  label: 'Palettes Vides' },
  { keyword: 'pv',              label: 'Palettes Vides' },
  { keyword: 'passage',         label: 'Passage' },
  { keyword: 'travaux',         label: 'Travaux' },
  { keyword: 'mix',             label: 'Mix' },
  { keyword: 'stock',           label: 'Stock' },
  { keyword: 'groupage',        label: 'Groupage' },
];

// ─── Init ─────────────────────────────────────────────────────────────────────

$("#img-zonenuebersicht").replaceWith(a4);
$("head>title").html("Gestion des zones :: XDock PRO");

$("h1").parent().replaceWith(`
  <div id="xdock_pro_page_header" class="row d-flex align-items-center h-100 xdock-head-row">
    <div class="col-6 h-100 xdock-head-title">
      <h1>XDock PRO <span class="fa fa-caret-right navArrow"></span> Gestion des zones</h1>
    </div>
    <div class="col-6 text-right">
      <button class="btn btn-sm btn-outline-primary mr-10" style="height: 50%;" id="check-double-zonage">
        <span class="fa fa-search mr-10"></span>Vérifier double zonage
      </button>
    </div>
  </div>`);

// ─── State ────────────────────────────────────────────────────────────────────

let updated_zones = [];

const selected_date = window.location.href.includes("?selectedDate=")
  ? window.location.href.split("?selectedDate=")[1]
  : $("#selectedDate").val();

// ─── Date Helpers ─────────────────────────────────────────────────────────────

/**
 * Returns a YYYY-MM-DD date string offset from today by `offset` days.
 * @param {number} offset - Positive for future, negative for past.
 */
function getOffsetDate(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-');
}

// ─── Location Codes ───────────────────────────────────────────────────────────

/**
 * Returns the 3-letter code for a given location name, or '???' if unknown.
 * @param {string} ref - Raw location name from the server.
 * @returns {string}
 */
function get_ref_code(ref) {
  return LOCATION_CODE_MAP[ref.trim().toLowerCase()] ?? '???';
}

// ─── Data Parsing ─────────────────────────────────────────────────────────────

/**
 * Parses all zone options from the server HTML and returns an array of zone info objects.
 * Also updates the SMenZT and readyToLoad counters as a side-effect.
 * @param {jQuery} data - Parsed jQuery object of the server response.
 * @returns {{ id: number, name: string, ref: string, status: string, SM_ID: string }[]}
 */
function parse_zones(data) {
  const zones = [];
  let tlpreload = 0;
  let tlgrandlot = 0;
  let tlnozone=0;
  let tldoor = 0;
  let tlzoned = 0;
  let tlloading =0;
  let tldone =0;
 

  $(data.find('#wa-table tbody tr')).each(function(index, element) {
    let status = parseInt(element.cells[1].textContent.trim())
    
    if(element.cells[12].textContent.trim().length > 0 && status !== '90' && status == "10") {
      tlgrandlot++;
    }

    switch (status) {
      case 10:
        tlnozone++
        break

      case 11:
      case 44:
      case 50:
      case 70:
      case 71:
      case 72:
        tlzoned++
        break

      case 75:
        tldoor++
        break

      case 80:
      case 81:
        tlloading++
        break 
        
      case 89:
      case 90:
        tldone++
          break  
    }
  });
  
  $('#tl-nozone').text(tlnozone);
  $('#tl-grandlot').text(tlgrandlot);
  $('#tl-zoned').text(tlzoned);
  $('#tl-loading').text(tlloading);
  $('#tl-done').text(tldone);

  data.find("#ZoneBase>select>option").each(function () {
    const option = $(this);
    const zoneID = parseInt(option.val());
    const zoneName = option.html();
    const isInZT = option.hasClass("zone-in-verwendung-auslieferungstermin");

    if (isInZT && zoneName.trim().startsWith("ZT")) tlpreload++;

    if (isInZT) {
      const cells = data.find(`[data-selected='${zoneID}']`).parent().children();
      const SM_ID = cells.eq(0).text().trim();
      let ref = get_ref_code(cells.eq(6).text().trim());

      if (ref === 'GCA?_TEN?') {
        ref = cells.eq(8).text().trim().substring(11, 15);
      }

      const lpStatus = parseInt(cells.eq(1).text());
      let status = STATUS.TAKEN;
      if (EN_COURS_CODES.has(lpStatus)) status = STATUS.EN_COURS;
      else if (lpStatus === 44)         status = STATUS.BLOCKED;

      zones.push({ id: zoneID, name: zoneName, ref, status, SM_ID });

    } else if (option.hasClass("zone-in-verwendung-vergangenheit")) {
      zones.push({ id: zoneID, name: zoneName, ref: '', status: STATUS.DE_HIER, SM_ID: '' });

    } else if (option.hasClass("zone-in-verwendung-zukunft")) {
      zones.push({ id: zoneID, name: zoneName, ref: '', status: STATUS.DE_AVANCE, SM_ID: '' });

    } else if (option.is(":disabled")) {
      zones.push({ id: zoneID, name: zoneName, ref: '', status: STATUS.BLOCKED, SM_ID: '' });

    } else {
      zones.push({ id: zoneID, name: zoneName, ref: '', status: STATUS.FREE, SM_ID: '' });
    }
  });

  $('#tl-preload').text(tlpreload);
  $('#tl-door').text(tldoor - tlpreload);

  return zones;
}

// ─── Map Rendering ────────────────────────────────────────────────────────────

function update_map() {
  updated_zones.forEach(zone => {
    const $zoneEl = $('#' + zone.name);
    $zoneEl.parent().addClass(zone.status);
    $zoneEl.html(zone.ref);
    $zoneEl.parent()
      .attr('href', `/Zonen/EditZone/${zone.id}`)
      .attr('SM_href', `/Warenausgang/Tour?sort=LieferantStrASC&waTourId=${zone.SM_ID}`);
  });

  // Update legend counters
  const statuses = [STATUS.FREE, STATUS.TAKEN, STATUS.BLOCKED, STATUS.EN_COURS, STATUS.DE_AVANCE, STATUS.DE_HIER];
  statuses.forEach(s => {
    $(`#total_${s}`).html(`(${$(`.${s}`).not('.color').length})`);
  });

  // Blocked zone percentage
  const blockedCount = $(`.${STATUS.BLOCKED}`).not('.color').length;
  const blockedPct = (blockedCount / TOTAL_ZONES * 100).toFixed(2);
  $('#ZonesBloquees').html(`${blockedPct}%`);
  $('#ZonesBloquees').toggleClass('text-danger', blockedCount / TOTAL_ZONES * 100 > 15);

  // Ctrl+click opens SM URL
  $(document).on('click', 'a[zone]', function (e) {
    if (e.ctrlKey) {
      e.preventDefault();
      window.open($(this).attr('SM_href'), '_blank');
    }
  });

  zones_preliv();
  show_SM_hier();
  show_avance();
}

// ─── Zone Status Update ───────────────────────────────────────────────────────

function update_zone_status(dataServ) {
  const data = $(dataServ);
  updated_zones = parse_zones(data);
  update_map();
}

// ─── Adjacent Day Overlays ────────────────────────────────────────────────────

/**
 * Fetches zone data for a day offset from today and appends ref codes to zones.
 * Used to show advance (next day) and reliquat (previous day) labels.
 * @param {number} dayOffset - +1 for tomorrow, -1 for yesterday.
 */
function load_other_day(dayOffset) {
  const date = getOffsetDate(dayOffset);
  $.get(`/Warenausgang/Tag?sort=StatusASC&selectedDate=${date}`, function (dataServ) {
    const data = $(dataServ);
    data.find("#ZoneBase>select>option").each(function () {
      const option = $(this);
      const zoneID = parseInt(option.val());

      if (!option.hasClass("zone-in-verwendung-auslieferungstermin")) return;

      const cells = data.find(`[data-selected='${zoneID}']`).parent().children();
      let ref = get_ref_code(cells.eq(6).text().trim());
      if (ref === 'GCA?_TEN?') ref = cells.eq(8).text().trim().substring(11, 15);

      $('#' + option.html()).append(ref);
    });
  });
}

function show_avance()   { load_other_day(+1); }
function show_SM_hier()  { load_other_day(-1); }

// ─── Blocked Zone Labels ──────────────────────────────────────────────────────

function zones_preliv() {
  $('.blocked').not('.color').each(function () {
    const $zone = $(this);
    const zoneName = $zone.attr('zone');

    $.get($zone.attr('href'), function (dataServ) {
      const content = $(dataServ).find('#sperrgrundTextArea').val()?.toLowerCase() ?? '';
      const match = BLOCKED_REASON_MAP.find(({ keyword }) => content.includes(keyword));
      $('#' + zoneName).html(match ? match.label : '???');
    });
  });
}

// ─── Double Zonage Check ──────────────────────────────────────────────────────

$(document).on('click', '#check-double-zonage', function () {
  $.get('/ToreZonenCluster/ToreZonenIndex', function (dataServ) {
    const data = $(dataServ);
    let doubleCount = 0;

    data.find('#zonen-table>tbody>tr').each(function () {
      const cells = this.cells;
      if (parseInt(cells[6].innerText.trim()) > 1) {
        const zoneName = cells[1].innerText.trim();
        $(`[zone="${zoneName}"]`).addClass('double-zonage');
        toastr.warning(`Attention : la zone « ${zoneName} » est affectée à deux SM. Veuillez vérifier les zones.`);
        doubleCount++;
      }
    });

    if (doubleCount > 0) {
      toastr.error('Double zonage détecté');
    } else {
      toastr.success('Aucun double zonage détecté');
    }
  });
});

// ─── Before Print ─────────────────────────────────────────────────────────────

window.addEventListener('beforeprint', () => {
  $('h1').parent().remove();
  const now = new Date().toLocaleString('fr-FR', { hour12: false }).replace(/\//g, '-');
  $('#date_of_print').html(now);
});

// ─── Date Change ─────────────────────────────────────────────────────────────

$('#selectedDate').on('change', function () {
  $('#a4').replaceWith(a4);
  $.get(`/Warenausgang/Tag?sort=ZielortLokationNameASC&selectedDate=${$(this).val()}`, function (data) {
    update_zone_status(data);
  });
  window.location.href = `${window.location.href}?selectedDate=${$(this).val()}`;
});

// ─── Initial Load ─────────────────────────────────────────────────────────────

$(document).ready(function () {
  $.get(`/Warenausgang/Tag?sort=StatusASC&selectedDate=${selected_date}`, function (data) {
    update_zone_status(data);
  });
});
