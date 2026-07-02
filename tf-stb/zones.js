//***************************//
// TF-STB Map add-on for XDock PRO
// Dernière mise à jour le 02/07/2026
// Refactor : logique inchangée, code dédupliqué et clarifié
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
       margin-top: 65px !important;
    display: flex;
    gap: 20px;
    background: #fff;
    padding: 15px 20px !important;
    width: 29.7cm;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
}
.countItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.countdown-number {
 font-size: 2rem;
     color: #333;
}

.divider-count {
  display: block;
 
  background-color: #eee;
  width: 2px;
}
 .double-zonage {
  border: 2px dashed red;
  background-color: rgba(255, 0, 0, 0.1) !important;
}
  footer { margin-top: 300px; }
`);

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

// Status codes coming from the WA table
const EN_COURS_CODES       = new Set([80, 81]);
const READY_TO_LOAD_CODES  = new Set([70, 71, 72, 75]);
const CODE_NO_ZONE         = 10;
const CODE_ZONE_BLOCKED    = 44;

// Column indices shared by the truck rows and the zone lookup rows
// (both come from the same #wa-table structure)
const CELL = {
  SM_ID:        0,
  STATUS:       1,
  EMPLACEMENTS: 2,
  REF_LOCATION: 6,
  SPECIAL_REF:  8,
  REAPPRO:      12,
  PAUSE_INFO:   19,
};

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

// ─── HTML Template ────────────────────────────────────────────────────────────

/**
 * Builds a single zone anchor <a class="wrapClass colorClass" zone="Z" target="_blank">
 * with a name label and a value slot (optionally rotated for the L columns).
 * Every zone link in the map is built from this one function so the markup
 * only needs to be maintained in a single place.
 */
function zoneAnchor(zone, wrapClass, colorClass, nameClass, valueClass = '') {
  const valueAttr = valueClass ? ` class="${valueClass}"` : '';
  return `<a class="${wrapClass} ${colorClass}" zone="${zone}" target="_blank">
      <div class="${nameClass}">${zone}</div>
      <div${valueAttr} id="${zone}"></div>
    </a>`;
}

const zoneM = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  .map(n => zoneAnchor(`M${n}`, 'zoneM', n % 2 ? 'first_color' : 'sec_color', 'zone_M_name'))
  .join('');

// C1–C6 consecutive, then even C8–C24
const zoneCBottom = [1,2,3,4,5,6,8,10,12,14,16,18,20,22,24]
  .map(n => zoneAnchor(`C${n}`, 'zoneC', n % 2 ? 'first_color' : 'sec_color', 'zone_C_name'))
  .join('');

const cblTop = [['B16','first_color'],['C23','sec_color'],['C21','first_color m-0']]
  .map(([z, cls]) => zoneAnchor(z, 'zone_top_right', cls, 'zone_top_right_name'))
  .join('');

const cblLeftB = [14,12,10,8,6,4,2]
  .map(n => zoneAnchor(`B${n}`, 'zone_long', n % 4 === 2 ? 'first_color' : 'sec_color', 'zone_long_left_name'))
  .join('');

const cblRightC = [19,17,15,13,11,9,7]
  .map(n => zoneAnchor(`C${n}`, 'zone_long long_right', n % 2 ? 'first_color' : 'sec_color', 'zone_long_right_name'))
  .join('');

const cblRightL = [8,9,10,11,12,13,14,15,16,17,18,19,20,21]
  .map(n => zoneAnchor(`L${n}`, 'zoneL', n % 2 === 0 ? 'first_color' : 'sec_color', 'zone_L_name', 'L_value'))
  .join('');

const ablTop = [['A11','first_color'],['A12','sec_color'],['B17','first_color'],['B15','sec_color'],['B13','first_color m-0']]
  .map(([z, cls]) => zoneAnchor(z, 'zone_top_left', cls, 'zone_top_left_name'))
  .join('');

const ablCenterLeftB = [10,9,8,7,6,5]
  .map(n => zoneAnchor(`A${n}`, 'zone_long', n % 2 === 0 ? 'first_color' : 'sec_color', 'zone_long_left_name'))
  .join('');

const ablCenterRightC = [11,9,7,5,3,1]
  .map(n => zoneAnchor(`B${n}`, 'zone_long long_right', n % 2 ? 'first_color' : 'sec_color', 'zone_long_right_name'))
  .join('');

const ablDownLeftA = [4,3,2,1]
  .map(n => zoneAnchor(`A${n}`, 'zone_long', n % 2 === 0 ? 'first_color' : 'sec_color', 'zone_long_left_name'))
  .join('');

// A0 is a static (non-clickable) placeholder, not a real zone link
const zoneA0 = `
          <div class="zone_long first_color" zone="A0">
            <div class="zone_long_left_name"></div>
            <div id="A0"></div>
          </div>`;

const zoneL1 = zoneAnchor('L1', 'zone_long l1', 'sec_color', 'zone_long_left_name l1_name');

const ablDownRightL = [2,3,4,5,6,7]
  .map(n => zoneAnchor(`L${n}`, 'zoneL', n % 2 === 0 ? 'sec_color' : 'first_color', 'zone_L_name', 'L_value'))
  .join('');

let a4 = `
  <div id="a4">
    <div id="map-border"></div>

    <!-- Zone M -->
    <div class="M">${zoneM}</div>

    <!-- Zone C (bottom row) -->
    <div class="C">${zoneCBottom}</div>

    <!-- Zone C_B_L -->
    <div class="C_B_L">
      <div class="top">${cblTop}</div>
      <div class="center_B_C">
        <div class="left_B">${cblLeftB}</div>
        <div class="rghit_C">${cblRightC}</div>
      </div>
      <div class="right_L">${cblRightL}</div>
    </div>

    <!-- Zone A_B_L -->
    <div class="A_B_L">
      <div class="top">${ablTop}</div>
      <div class="center">
        <div class="left_B">${ablCenterLeftB}</div>
        <div class="rghit_C">${ablCenterRightC}</div>
      </div>
      <div class="down">
        <div class="left_a5">
          ${ablDownLeftA}
          ${zoneA0}
          ${zoneL1}
        </div>
        <div class="right">${ablDownRightL}</div>
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
      <div class="countItem ml-2">
        <div class="countdown-number" id="noZoneCount">0</div>
        <div> SM non zonés</div>
      </div>
      <div class="divider-count"></div>
      <div class="countItem">
        <div class="countdown-number" id="readyToLoad">0</div>
        <div> Possibilité de chargement*</div>
      </div>
      <div class="divider-count"></div>
      <div class="countItem">
        <div class="countdown-number" id="grandLotAvenir">0</div>
        <div> Grand lot à venir</div>
      </div>
      <div class="divider-count"></div>
      <div class="countItem">
        <div class="countdown-number" id="SMwaitForZone">0</div>
        <div> SM en attente de zone immédiate</div>
      </div>
    </div>
    <!-- /countdown-container -->

    <div class="info mt-4 text-muted">
      <p class="mb-1"><strong><i class="fal fa-info-circle"></i> alt + clic</strong> sur une zone occupée pour ouvrir le SM correspondant dans une nouvelle fenêtre</strong></p>
      <p>* Le nombre de camions en attente de chargement sur le parking ou à la porte. Disponible tout de suite, sans pause prévue.</p>
    </div>
  </div>`;

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function is_en_pause(tr) {
  if (!tr) return false; // avoid errors on null/undefined
  const text = tr.toLowerCase();
  const words_to_search = ["en pause", "decroche", "fdc", "decrocher", "dispo", "disponible", "revient", "skip"];
  return words_to_search.some(word => text.includes(word));
}

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

/**
 * Returns the 3-letter code for a given location name, or '???' if unknown.
 * @param {string} ref - Raw location name from the server.
 */
function get_ref_code(ref) {
  return LOCATION_CODE_MAP[ref.trim().toLowerCase()] ?? '???';
}

/**
 * Cache for /Warenausgang/TagZones?selectedDate=... so each date's JSON is
 * only ever fetched once, no matter how many places in the code need it
 * (initial load, date change, advance/reliquat overlays, ...).
 * Keyed by date string, values are the in-flight/resolved promise.
 */
const zonesJSONCache = new Map();

/**
 * Fetches (and caches) the zones JSON for a given date.
 * @param {string} date - YYYY-MM-DD
 * @returns {Promise<Array>} resolved zones array
 */
function fetchZonesJSON(date) {
  if (!zonesJSONCache.has(date)) {
    const promise = $.get(`/Warenausgang/TagZones?selectedDate=${date}`)
      .then(jsonZones => (typeof jsonZones === 'string' ? JSON.parse(jsonZones) : jsonZones));
    zonesJSONCache.set(date, promise);
  }
  return zonesJSONCache.get(date);
}

/**
 * Finds the WA table row for a given zone id in the given day's HTML,
 * and resolves its location code. Shared by parse_zones() and load_other_day()
 * so the "find the row / resolve the ref" logic only lives in one place.
 * @returns {{cells: JQuery, ref: string} | null}
 */
function get_zone_row(data, zoneID) {
  const cells = data.find(`[data-selected-zone-id='${zoneID}']`).parent().parent().parent().children();
  if (!cells.length) return null;

  let ref = get_ref_code(cells.eq(CELL.REF_LOCATION).text().trim());
  if (ref === 'GCA?_TEN?') {
    ref = cells.eq(CELL.SPECIAL_REF).text().trim().substring(11, 15);
  }
  return { cells, ref };
}

// ─── Data Parsing ─────────────────────────────────────────────────────────────

function parse_zones(data, zonesArray) {
  const zones = [];
  const counters = { noZoneCount: 0, readyToLoad: 0, grandLotAvenir: 0, SMwaitForZone: 0, preload: 0 };
  const inc = (key) => counters[key]++;
  const smWaitForZoneRefs = [];

  // ─── Truck loop ───────────────────────────────────────────────────────────
  data.find('#wa-table tbody tr').each(function (_, el) {
    const cells = el.cells;
    const status = parseInt(cells[CELL.STATUS].textContent.trim());
    const emplacements = parseInt(cells[CELL.EMPLACEMENTS].textContent.trim());
    const enPause = is_en_pause(cells[CELL.PAUSE_INFO].innerHTML);
    const reappro = cells[CELL.REAPPRO].textContent.trim();

    if (status === CODE_NO_ZONE) {
      inc('noZoneCount');
      if (reappro.includes("NAABT") || reappro.includes("GROPPER")) inc('grandLotAvenir');
      if (emplacements > 0) {
        inc('SMwaitForZone');
        smWaitForZoneRefs.push(get_ref_code(cells[CELL.REF_LOCATION].textContent.trim()));
      }
    }
    if (READY_TO_LOAD_CODES.has(status) && !enPause) inc('readyToLoad');
  });

  // ─── Zone loop ────────────────────────────────────────────────────────────
  zonesArray.forEach(function (zoneItem) {
    const { id: zoneID, name: zoneName } = zoneItem;

    if (zoneItem.isBelegtAmAuslieferungstermin) {
      if (zoneName.trim().startsWith("ZT")) inc('preload');

      const row = get_zone_row(data, zoneID);
      const SM_ID = row.cells.eq(CELL.SM_ID).text().trim();
      const lpStatus = parseInt(row.cells.eq(CELL.STATUS).text());

      let zStatus = STATUS.TAKEN;
      if (EN_COURS_CODES.has(lpStatus)) zStatus = STATUS.EN_COURS;
      else if (lpStatus === CODE_ZONE_BLOCKED) zStatus = STATUS.BLOCKED;

      zones.push({ id: zoneID, name: zoneName, ref: row.ref, status: zStatus, SM_ID });

    } else if (zoneItem.isBelegtInDerVergangenheit) {
      zones.push({ id: zoneID, name: zoneName, ref: '', status: STATUS.DE_HIER, SM_ID: '' });

    } else if (zoneItem.isBelegtInZukunft) {
      zones.push({ id: zoneID, name: zoneName, ref: '', status: STATUS.DE_AVANCE, SM_ID: '' });

    } else if (zoneItem.disabled) {
      zones.push({ id: zoneID, name: zoneName, ref: '', status: STATUS.BLOCKED, SM_ID: '' });

    } else {
      zones.push({ id: zoneID, name: zoneName, ref: '', status: STATUS.FREE, SM_ID: '' });
    }
  });

  $("#noZoneCount").html(counters.noZoneCount);
  $("#readyToLoad").html(counters.readyToLoad - counters.preload);
  $("#grandLotAvenir").html(counters.grandLotAvenir);
  $("#SMwaitForZone")
    .html(counters.SMwaitForZone)
    .attr('title', smWaitForZoneRefs.length ? smWaitForZoneRefs.join(', ') : 'Aucun SM en attente de zone')
    .css('cursor', 'help');

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
      .attr('zoneid', `${zone.id}`)
      .attr('SM_href', `/Warenausgang/Tour?sort=LieferantStrASC&waTourId=${zone.SM_ID}`);
  });

  // Update legend counters
  [STATUS.FREE, STATUS.TAKEN, STATUS.BLOCKED, STATUS.EN_COURS, STATUS.DE_AVANCE, STATUS.DE_HIER]
    .forEach(s => $(`#total_${s}`).html(`(${$(`.${s}`).not('.color').length})`));

  const totalDeHier = $(`.de_hier`).not('.color').length;
  const totalAvance = $(`.de_avance`).not('.color').length;

  zones_preliv();
  if (totalDeHier > 0) show_SM_hier();
  if (totalAvance > 0) show_avance();
}

// Alt+click opens the SM URL. Bound once (delegated), not inside update_map,
// so it doesn't get re-registered — and re-fired multiple times per click —
// on every date change / auto-refresh.
$(document).on('click', 'a[zone]', function (e) {
  if (e.altKey) {
    e.preventDefault();
    window.open($(this).attr('SM_href'), '_blank');
  }
});

// ─── Zone Status Update ───────────────────────────────────────────────────────

function update_zone_status(htmlData, dateStr) {
  const data = $(htmlData);

  fetchZonesJSON(dateStr).then(zonesArray => {
    updated_zones = parse_zones(data, zonesArray);
    update_map();
  });
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

    fetchZonesJSON(date).then(zonesArray => {
      zonesArray.forEach(function (zoneItem) {
        if (!zoneItem.isBelegtAmAuslieferungstermin) return;

        const row = get_zone_row(data, zoneItem.id);
        if (!row) return;

        $('#' + zoneItem.name).html(row.ref);
      });
    });
  });
}

function show_avance()  { load_other_day(+1); }
function show_SM_hier() { load_other_day(-1); }

// ─── Blocked Zone Labels ──────────────────────────────────────────────────────

function zones_preliv() {
  $('.blocked').not('.color').each(function () {
    const $zone = $(this);
    const zoneName = $zone.attr('zone');

    $.get($zone.attr('href'), function (dataServ) {
      const match2 = dataServ.match(/id="sperrgrundTextArea"[^>]*>([\s\S]*?)<\/textarea>/);
      const content = match2 ? match2[1].trim().toLowerCase() : '';
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

    toastr[doubleCount > 0 ? 'error' : 'success'](
      doubleCount > 0 ? 'Double zonage détecté' : 'Aucun double zonage détecté'
    );
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
  const currentVal = $(this).val();
  $('#a4').replaceWith(a4);
  $.get(`/Warenausgang/Tag?sort=ZielortLokationNameASC&selectedDate=${currentVal}`, function (data) {
    update_zone_status(data, currentVal);
  });
  window.location.href = `${window.location.href.split('?')[0]}?selectedDate=${currentVal}`;
});

// ─── Initial Load ─────────────────────────────────────────────────────────────

$(document).ready(function () {
  $.get(`/Warenausgang/Tag?sort=StatusASC&selectedDate=${selected_date}`, function (data) {
    update_zone_status(data, selected_date);
  });

  // reload the page after 60 seconds
  setTimeout(function () {
    window.location.reload();
  }, 60000);
});
