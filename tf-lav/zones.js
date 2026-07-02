//***************************// 
// Map add-on for XDock PRO for STEF LAVAL
// Dernière mise à jour le 02/07/2026
// Refactor : logique inchangée, code dédupliqué et clarifié
//***************************//

$("<style>").appendTo("head").html(`
  @media print {
    @page {
      size: landscape;
    }
    body {
      background: #fff !important;
      height: 21cm;
      width: 29.7cm;
      overflow: hidden;
    }
    #a4 {
      zoom: 93% !important;
    }
    #map-border {
      width: 100%;
      zoom: 100%;
    }
    .container-fluid.mt-3,
    #xdock_pro_page_header {
      display: none !important;
    }
    .date {
      display: block !important;
    }
    .zones_top, .zones_down {
      left: 70px !important;
    }
  }

  #a4 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    height: 620px;
    width: 1200px;
    background-color: #fff;
    position: relative;
    zoom: 120%;
  }

  #a4 > * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #map-border {
    height: 85%;
    width: 95%;
    border: 2px solid #929292;
    margin: auto;
    margin-top: 30px;
  }

  .first_color {
    background-color: #b3b3b3;
  }

  .sec_color {
    background-color: #d4d4d4;
  }

  .free {
    background: #2ecc71 !important;
  }

  .taken {
    background: #3498db;
  }

  .en_cours {
    background: #e67e22;
  }

  .de_hier {
    background: #34495e !important;
  }

  a.de_hier > div[id],
  a.blocked > div[id] {
    color: #fff !important;
  }

  a.blocked > div[id] {
    color: #fff !important;
    text-align: center;
    font-size: 11px;
  }

  .de_avance {
    background: #f1c40f !important;
  }

  .blocked {
    background: #c0392b !important;
  }

  .m-0 {
    margin: 0 !important;
  }

  #a4 a {
    text-decoration: none;
    color: inherit;
  }

  #a4 a:hover {
    opacity: 0.7;
  }

  a.url_edit {
    height: 100%;
    width: 100%;
  }

  .zones_top {
    position: absolute;
    top: 120px;
    left: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .zones_down {
    position: absolute;
    top: 245px;
    left: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .zone {
    margin-left: 4px;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  }

  .zone_name {
    position: absolute;
    top: -20px;
  }

  .zone_value {
    rotate: -90deg;
  }

  .big {
    height: 120px;
    width: 44px;
  }

  .thin {
    height: 200px;
    width: 20px;
  }

  [zone="112"], [zone="220"] {
    margin-right: 45px;
  }

  .thin > .zone_name {
    position: absolute;
    bottom: -20px;
    top: unset !important;
    rotate: -50deg;
  }

  .guide {
    position: absolute;
    bottom: 25px;
    left: 43px;
    font-size: 11px;
    color: #292929;
    display: flex;
  }

  .gud_item {
    margin-right: 15px;
    display: flex;
  }

  .color {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    margin-right: 3px;
  }

  #show_avance,
  #show_SM_hier {
    cursor: pointer;
    text-decoration: underline;
  }

  .zone {
    text-wrap: nowrap;
  }

  .rlq {
    border: 1px solid #c0392b;
  }

  .badge {
    font-size: 100%;
  }

  .d-none {
    display: none;
  }
`);

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS = {
  FREE:      'free',
  TAKEN:     'taken',
  EN_COURS:  'en_cours',
  DE_HIER:   'de_hier',
  DE_AVANCE: 'de_avance',
  BLOCKED:   'blocked',
};

// Status codes coming from the WA table
const EN_COURS_CODES    = new Set([80, 81]);
const CODE_ZONE_BLOCKED = 44;

// Column indices shared by the truck rows and the zone lookup rows
// (both come from the same #wa-table structure)
const CELL = {
  SM_ID:        0,
  STATUS:       1,
  EMPLACEMENTS: 2,
  TOTAL:        4,
  REF_LOCATION: 6,
  SPECIAL_REF:  8,
};

/**
 * Lookup map: normalized location name → 3-letter code.
 * Keys are lowercased and trimmed.
 */
const LOCATION_CODE_MAP = {
  // France
  'ablis':                        'ABL',
  'les arcs sur argens':          'ASA',
  'barbery':                      'BAR',
  'baziège':                      'BAZ',
  'baziege':                      'BAZ',
  'beaucaire':                    'LUN',
  'béziers':                      'BEZ',
  'beziers':                      'BEZ',
  'carquefou':                    'CAQ',
  'cestas':                       'CET',
  'chanteloup les vignes':        'CLV',
  'entzheim':                     'ENT',
  'gondreville':                  'GON',
  'guingamp':                     'GUI',
  'châtelaudren-plouagat':        'GUI',
  'chatelaudren-plouagat':        'GUI',
  'honguemare - guenouville':     'HON',
  'la chapelle d\'armentières':   'LCA',
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
  'sailly lez cambrai':           'SLC',
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

// ─── HTML Template ────────────────────────────────────────────────────────────

/**
 * Builds a single zone anchor <a class="zone big/thin colorClass" zone="Z" target="_blank">
 * with a name label and a value slot.
 */
function zoneAnchor(zone, sizeClass, colorClass) {
  return `<a class="zone ${sizeClass} ${colorClass}" zone="${zone}" target="_blank">
      <div class="zone_name">${zone}</div>
      <div class="zone_value" id="${zone}"></div>
    </a>`;
}

/**
 * Generates the big zones (121 → 101) and thin zones (201 → 242) markup.
 */
function generateZoneHTML() {
  const bigZones = Array.from({ length: 21 }, (_, i) => 121 - i)
    .map(n => zoneAnchor(n, 'big', n % 2 === 0 ? 'sec_color' : 'first_color'))
    .join('');

  const thinZones = Array.from({ length: 42 }, (_, i) => 201 + i)
    .map(n => zoneAnchor(n, 'thin', n % 2 === 0 ? 'sec_color' : 'first_color'))
    .join('');

  return { bigZones, thinZones };
}

const { bigZones, thinZones } = generateZoneHTML();

const a4 = `
  <div id="a4">
    <div id="map-border"></div>
    <!-- Zone top -->
    <div class="zones_top" id="big-zones-container">
      ${bigZones}
    </div>
    <!-- Zones down -->
    <div class="zones_down" id="thin-zones-container">
      ${thinZones}
    </div>
    <div class="guide d-flex">
      <div class="gud_item">
        <div class="color free"></div> <span class="title">Zones libres</span> <span id="total_free"></span>
      </div>
      <div class="gud_item">
        <div class="color taken"></div> <span class="title">Zones occupées</span> <span id="total_taken"></span>
      </div>
      <div class="gud_item">
        <div class="color blocked"></div> <span class="title">Zones bloquées</span> <span id="total_blocked"></span>
      </div>
      <div class="gud_item">
        <div class="color en_cours"></div> <span class="title">SM en cours</span> <span id="total_en_cours"></span>
      </div>
      <div class="gud_item" id="show_avance">
        <div class="color de_avance"></div> <span class="title">Marchandises en avance</span> <span id="total_de_avance"></span>
      </div>
      <div class="gud_item" id="show_SM_hier">
        <div class="color de_hier"></div> <span class="title">Reliquats</span> <span id="total_de_hier"></span>
      </div>
      <div class="gud_item">
        <div class="color first_color"></div> <span class="title">Données inconnues</span>
      </div>
      <div class="gud_item"> <span class="date d-none"> Date d'impression: <span id="date_of_print"></span></span></div>
    </div>
  </div>`;

// ─── Init ─────────────────────────────────────────────────────────────────────

$("#img-zonenuebersicht").replaceWith(a4);
$("head>title").html("Gestion des zones :: XDock PRO");

$("h1").parent().replaceWith(`<div id="xdock_pro_page_header" class="row d-flex align-items-center h-100 xdock-head-row">
  <div class="col-12 h-100 xdock-head-title">
      <h1>
         XDock PRO <span class="fa fa-caret-right navArrow"></span> Gestion des zones
      </h1>
  </div>
</div>`);

// ─── State ────────────────────────────────────────────────────────────────────

let updated_zones = [];

const selected_date = window.location.href.includes("?selectedDate=")
  ? window.location.href.split("?selectedDate=")[1]
  : $("#selectedDate").val();

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
 * (initial load, date change, advance/reliquat overlays, double stock, ...).
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
 * and resolves its location code. Shared by parse_zones(), load_other_day()
 * and the double-stock handler so the "find the row / resolve the ref"
 * logic only lives in one place.
 * @returns {{cells: JQuery, ref: string} | null}
 */
function get_zone_row(data, zoneID) {
  const cells = data.find(`[data-selected-zone-id='${zoneID}']`).parent().parent().parent().children();
  if (!cells.length) return null;

  let ref = get_ref_code(cells.eq(CELL.REF_LOCATION).text().trim());
 console.log(cells)
  return { cells, ref };
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

// ─── Data Parsing ─────────────────────────────────────────────────────────────

/**
 * Parse zone data from the TagZones JSON and the Tag HTML.
 * @param {JQuery} data - The parsed HTML from /Warenausgang/Tag
 * @param {Array} zonesArray - The parsed JSON from /Warenausgang/TagZones
 * @returns {Array} Array of zone objects with status, ref, SM_ID, etc.
 */
function parse_zones(data, zonesArray) {
  const zones = [];

  zonesArray.forEach(function (zoneItem) {
    const { id: zoneID, name: zoneName } = zoneItem;

    if (zoneItem.isBelegtAmAuslieferungstermin) {
      const row = get_zone_row(data, zoneID);
      if (!row) {
        zones.push({ id: zoneID, name: zoneName, ref: '', status: STATUS.FREE, SM_ID: '' });
        return;
      }

      const SM_ID = row.cells.eq(CELL.SM_ID).text().trim();
      const lpStatus = parseInt(row.cells.eq(CELL.STATUS).text());

      let status = STATUS.TAKEN;
      if (EN_COURS_CODES.has(lpStatus)) {
        status = STATUS.EN_COURS;
      } else if (lpStatus === CODE_ZONE_BLOCKED) {
        status = STATUS.BLOCKED;
      }

      zones.push({ id: zoneID, name: zoneName, ref: row.ref, status, SM_ID });

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

  return zones;
}

// ─── Map Rendering ────────────────────────────────────────────────────────────

/**
 * Updates the DOM with the current zone statuses and legend counters,
 * then runs the dependent overlays (block reasons, advance/reliquat
 * labels, carton counts) automatically — no user click required.
 * @param {JQuery} data - The parsed HTML from /Warenausgang/Tag (reused by double_stock)
 * @param {Array} zonesArray - The parsed JSON from /Warenausgang/TagZones (reused by double_stock)
 */
function update_map(data, zonesArray) {
  updated_zones.forEach(zone => {
    const $zoneEl = $('#' + zone.name);
    $zoneEl.parent().addClass(zone.status);
    $zoneEl.html(zone.ref);
    $zoneEl.parent()
      .attr('href', `/Zonen/EditZone/${zone.id}`)
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
  double_stock(data, zonesArray);
}

// Ctrl+click opens the SM URL. Bound once (delegated), not inside update_map,
// so it doesn't get re-registered on every date change.
$(document).on('click', 'a[zone]', function (e) {
  if (e.ctrlKey) {
    e.preventDefault();
    window.open($(this).attr('SM_href'), '_blank');
  }
});

// ─── Zone Status Update ───────────────────────────────────────────────────────

/**
 * Fetches the TagZones JSON and updates the map with parsed zone data.
 * @param {string|JQuery} htmlData - The HTML from /Warenausgang/Tag
 * @param {string} dateStr - The date string (YYYY-MM-DD) for cache key
 */
function update_zone_status(htmlData, dateStr) {
  const data = $(htmlData);

  fetchZonesJSON(dateStr).then(zonesArray => {
    updated_zones = parse_zones(data, zonesArray);
    update_map(data, zonesArray);
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

        // Append the ref code to the existing content
        const $zoneEl = $('#' + zoneItem.name);
        $zoneEl.html($zoneEl.html() + row.ref);
      });
    });
  });
}

function show_avance()  { load_other_day(+1); }
function show_SM_hier() { load_other_day(-1); }

// ─── Zones de pré-livraison ──────────────────────────────────────────────────

/**
 * Fetches the sperrgrund (block reason) for each blocked zone
 * and displays it on the map. Runs automatically after every map update.
 */
function zones_preliv() {
  $('.blocked').not('.color').each(function () {
    const $zone = $(this);
    const zoneName = $zone.attr('zone');

    $.get($zone.attr('href'), function (dataServ) {
      const match = dataServ.match(/id="sperrgrundTextArea"[^>]*>([\s\S]*?)<\/textarea>/);
      const content = match ? match[1].trim().substring(0, 12) : '';
      $('#' + zoneName).html(content || '???');
    });
  });
}


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

  // Reload the page after 60 seconds (optional, like zones.js)
  setTimeout(function () {
    window.location.reload();
  }, 60000);
});
