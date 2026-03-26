// ============================================================
// FULL PAGE REPLACEMENT - TEAM DISTRIBUTION VIEW
// ============================================================
(function() {
  // ============================================================
  // STYLES
  // ============================================================
  const style = document.createElement('style');
  style.textContent = `
    /* RESET & FULL PAGE LAYOUT */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
      background: #f4f3ef !important;
      min-height: 100vh;
    }
    
    /* MAIN CONTAINER - CENTERED */
    #team-distribution-app {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 24px;
    }
    
    /* MAIN CARD */
    .distribution-card {
      background: #fff;
      border-radius: 10px;
      border: 1px solid #e3e0d9;
      box-shadow: 0 1px 3px rgba(0,0,0,.05), 0 1px 2px rgba(0,0,0,.03);
      width: 1100px;
      max-width: 100%;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    /* HEADER WITH BACK BUTTON */
    .card-header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      background: #ffffff;
      border-bottom: 2px solid #f0f4fa;
      flex-wrap: wrap;
      gap: 16px;
    }
    
    .title-section h1 {
      font-size: 1.6rem;
      font-weight: 700;
      margin: 0;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .title-section h1 i {
      color: #2c3e66;
      font-size: 1.8rem;
    }
    
    .title-section .sub {
      color: #5b6e8c;
      font-size: 0.85rem;
      margin-top: 6px;
    }
    
    .btn-back {
      background: #f1f5f9;
      border: none;
      padding: 10px 20px;
      border-radius: 40px;
      font-weight: 600;
      font-size: 0.9rem;
      color: #1e293b;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
      font-family: inherit;
    }
    
    .btn-back:hover {
      background: #e2e8f0;
      transform: translateY(-1px);
    }
    
    /* DATE SELECTOR */
    .date-selector-area {
      background: #f8fafc;
      padding: 0.8rem 1.5rem;
      margin: 1.2rem 2rem;
      border-radius: 60px;
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      border: 1px solid #e2e8f0;
    }
    
    .date-label {
      font-weight: 600;
      color: #0f3b5c;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
    }
    
    .date-label i {
      font-size: 1.1rem;
      color: #475569;
    }
    
    #equipe-date-picker {
      border: 1px solid #cbd5e1;
      border-radius: 40px;
      padding: 8px 16px;
      font-size: 0.9rem;
      background: white;
      font-weight: 500;
      cursor: pointer;
    }
    
    .refresh-indicator {
      font-size: 0.75rem;
      color: #000000;
      background: #ffffff;
      padding: 4px 12px;
      border-radius: 50px;
      margin-left: auto;
    }
    
    /* 3 CARDS: MATIN, APRÈS-MIDI, NUIT */
    .shifts-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin: 24px 2rem 2rem 2rem;
      padding: 10px 30px;
    }
    
    .shift-card {
      background: #ffffff;
      border-radius: 24px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.05);
      border: 1px solid #eef2ff;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .shift-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 16px 24px -8px rgba(0,0,0,0.1);
    }
    
    .card-header {
      padding: 1rem 1.2rem 0.8rem;
      border-bottom: 2px solid #f0f4f9;
      display: flex;
      align-items: center;
      gap: 10px;
      background: #fafcff;
    }
    
    .card-header i {
      font-size: 1.6rem;
    }
    
    .card-header h3 {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 700;
      color: #0f172a;
    }
    
    .shift-time {
      font-size: 0.7rem;
      color: #5b6e8c;
      margin-left: auto;
      background: #f1f5f9;
      padding: 2px 8px;
      border-radius: 30px;
    }
    
    .card-stats {
      padding: 1.2rem;
    }
    
    .stat-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding: 6px 0;
      border-bottom: 1px solid #f1f5f9;
    }
    
    .stat-label {
      font-weight: 600;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #334155;
    }
    
    .stat-label i {
      font-size: 1.2rem;
    }
    
    .stat-value {
      font-weight: 800;
      font-size: 1.3rem;
      letter-spacing: -0.5px;
    }
    
    .unload-value {
      color: #e69555;
    }
    
    .load-value {
      color: #537be0;
    }
    
    .progress-container {
      margin: 20px 0 8px;
    }
    
    .progress-label {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 8px;
      color: #475569;
    }
    
    .progress-bar-bg {
      background: #e2e8f0;
      border-radius: 40px;
      height: 12px;
      overflow: hidden;
    }
    
    .progress-fill {
      width: 0%;
      height: 100%;
      border-radius: 40px;
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      background: linear-gradient(90deg, #e69555, #f0a56e);
    }
    
    .team-stats-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid #eef2f8;
      font-size: 0.7rem;
      color: #62748c;
    }
    
    .global-stats {
      display: flex;
      gap: 24px;
      justify-content: flex-end;
      margin: 0 2rem 0.5rem 2rem;
      padding: 12px 24px;
      background: linear-gradient(135deg, #fef9f4 0%, #f8fafc 100%);
      border-radius: 60px;
    }
    
    .global-badge {
      font-weight: 700;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .global-unload {
      color: #e69555;
    }
    
    .global-load {
      color: #537be0;
    }
    
    .global-total {
      color: #2c3e66;
    }
    
    .empty-message {
      text-align: center;
      padding: 3rem;
      color: #94a3b8;
      font-style: italic;
    }
    
    .loading-spinner {
      text-align: center;
      padding: 4rem;
      color: #475569;
    }
    
    .loading-spinner i {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #e69555;
    }
    
    /* FOOTER */
    .card-footer {
      padding: 1.2rem 2rem;
      border-top: 1px solid #e4e4e4;
      text-align: center;
      font-size: 0.75rem;
      color: #7e8a98 !important;
      background: #ffffff  !important;
    }
    
    @media (max-width: 800px) {
      .shifts-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .global-stats {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      .card-header-bar {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `;
  document.head.appendChild(style);

  // ============================================================
  // HELPER FUNCTIONS (time parsing)
  // ============================================================
  function getShift(done_time) {
    const [hours, minutes] = done_time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const morningStart = 6 * 60;
    const morningEnd = 14 * 60;
    const afternoonStart = 14 * 60;
    const afternoonEnd = 22 * 60;
    const nightStart = 22 * 60;
    const nightEnd = 6 * 60;
    
    if (totalMinutes >= morningStart && totalMinutes < morningEnd) {
      return "matin";
    } else if (totalMinutes >= afternoonStart && totalMinutes < afternoonEnd) {
      return "am";
    } else if (totalMinutes >= nightStart || totalMinutes < nightEnd) {
      return "nuit";
    }
    return "unknown";
  }

  // ============================================================
  // PARSE FUNCTIONS
  // ============================================================
  function parseLoadTable(doc) {
    const table = doc.getElementById('wa-table');
    if (!table) return [];
    const rows = table.querySelectorAll('tbody tr');
    const tours = [];
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length < 17) return;
      const statusSpan = cells[1]?.querySelector('span[class*="waStatus"]');
      if (!statusSpan) return;
      const m = statusSpan.className.match(/waStatus(\d+)/);
      if (!m) return;
      const statut = parseInt(m[1]);
      if (statut !== 89 && statut !== 90) return;
      const debut = cells[15]?.textContent.trim() || '';
      const fin = cells[16]?.textContent.trim() || '';
      if (!debut || !fin || !/^\d{2}:\d{2}$/.test(debut) || !/^\d{2}:\d{2}$/.test(fin)) return;
      tours.push({ debut, fin, type: 'load' });
    });
    return tours;
  }

  function parseUnloadTableFromDoc(doc) {
    const table = doc.getElementById('we-table');
    if (!table) return [];
    const rows = table.querySelectorAll('tbody tr');
    const tours = [];
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length < 10) return;
      const statusSpan = cells[1]?.querySelector('span[class*="weStatus"]');
      if (!statusSpan) return;
      const m = statusSpan.className.match(/weStatus(\d+)/);
      if (!m) return;
      const statut = parseInt(m[1]);
      if (statut !== 89 && statut !== 90) return;
      const debut = cells[7]?.textContent.trim() || '';
      const fin = cells[8]?.textContent.trim() || '';
      if (!debut || !fin) return;
      tours.push({ debut, fin, type: 'unload' });
    });
    return tours;
  }

  // ============================================================
  // FETCH FUNCTIONS
  // ============================================================
  function fetchLoadData(dateVal, callback) {
    const url = 'https://tf-stb-kl.xdock.de/Warenausgang/Tag?sort=ZielortLokationNameASC&selectedDate=' + encodeURIComponent(dateVal);
    $.ajax({
      url: url,
      method: 'GET',
      timeout: 10000,
      success: function(responseText) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(responseText, 'text/html');
        callback(parseLoadTable(doc));
      },
      error: function(xhr, status, error) {
        console.error('[Équipes] Load fetch error', status, error);
        callback([]);
      }
    });
  }

  function fetchUnloadData(dateVal, callback) {
    const url = 'https://tf-stb-kl.xdock.de/Wareneingang/Tag?sort=AusgabeEntladeanweisungASC&selectedDate=' + encodeURIComponent(dateVal);
    $.ajax({
      url: url,
      method: 'GET',
      timeout: 10000,
      success: function(responseText) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(responseText, 'text/html');
        callback(parseUnloadTableFromDoc(doc));
      },
      error: function(xhr, status, error) {
        console.error('[Équipes] Unload fetch error', status, error);
        callback([]);
      }
    });
  }

  // ============================================================
  // BUILD STATS PER SHIFT
  // ============================================================
  function buildShiftStats(tours) {
    const shifts = {
      matin: { unload: 0, load: 0 },
      am: { unload: 0, load: 0 },
      nuit: { unload: 0, load: 0 }
    };
    
    tours.forEach(tour => {
      const shiftKey = getShift(tour.fin);
      if (!shiftKey) return;
      if (tour.type === 'unload') shifts[shiftKey].unload++;
      else shifts[shiftKey].load++;
    });
    
    return shifts;
  }
  
  function calculateGlobalPercentages(shiftsStats) {
    const totalUnload = shiftsStats.matin.unload + shiftsStats.am.unload + shiftsStats.nuit.unload;
    const totalLoad = shiftsStats.matin.load + shiftsStats.am.load + shiftsStats.nuit.load;
    const totalTrucks = totalUnload + totalLoad;
    
    const shiftsWithPercent = {};
    for (const shift of ['matin', 'am', 'nuit']) {
      const shiftTotal = shiftsStats[shift].unload + shiftsStats[shift].load;
      const percentOfGlobal = totalTrucks > 0 ? Math.round((shiftTotal / totalTrucks) * 100) : 0;
      shiftsWithPercent[shift] = {
        unload: shiftsStats[shift].unload,
        load: shiftsStats[shift].load,
        total: shiftTotal,
        percentOfGlobal: percentOfGlobal
      };
    }
    
    return {
      shifts: shiftsWithPercent,
      totalUnload,
      totalLoad,
      totalTrucks
    };
  }

  // ============================================================
  // RENDER MAIN CONTENT (NO MODAL, REPLACE BODY)
  // ============================================================
  function renderMainContent(allTours, selectedDate, container) {
    const shiftStats = buildShiftStats(allTours);
    const globalData = calculateGlobalPercentages(shiftStats);
    
    const shiftConfig = [
      { key: 'matin', label: 'Matin', icon: 'fas fa-sun', timeRange: '06h - 14h', bgSoft: '#fffaf5' },
      { key: 'am', label: 'Après-midi', icon: 'fas fa-cloud-sun', timeRange: '14h - 22h', bgSoft: '#f5f9ff' },
      { key: 'nuit', label: 'Nuit', icon: 'fas fa-moon', timeRange: '22h - 06h', bgSoft: '#f5f3ff' }
    ];
    
    let cardsHtml = '<div class="shifts-grid">';
    
    shiftConfig.forEach(cfg => {
      const data = globalData.shifts[cfg.key];
      const percent = data.percentOfGlobal;
      
      cardsHtml += `
        <div class="shift-card">
          <div class="card-header" style="background: ${cfg.bgSoft};">
            <i class="${cfg.icon}" style="color: #e69555;"></i>
            <h3>${cfg.label}</h3>
            <span class="shift-time">${cfg.timeRange}</span>
          </div>
          <div class="card-stats">
            <div class="stat-row">
              <span class="stat-label">
                <i class="fal fa-truck-container fa-flip-horizontal" style="color: #e69555;"></i> 
                Entrée de marchandises
              </span>
              <span class="stat-value unload-value">${data.unload}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">
                <i class="fal fa-truck-container" style="color: #537be0;"></i> 
                Sortie de marchandises 
              </span>
              <span class="stat-value load-value">${data.load}</span>
            </div>
            <div class="progress-container">
              <div class="progress-label">
                <span><i class="fas fa-chart-pie"></i> Activité équipe</span>
                <span><strong>${percent}%</strong> du travail global</span>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-fill" style="width: ${percent}%;"></div>
              </div>
            </div>
            <div class="team-stats-footer">
              <span>📊 Total: ${data.total} camions</span>
              <span>🎯 ${percent}%</span>
            </div>
          </div>
        </div>
      `;
    });
    
    cardsHtml += '</div>';
    
    const displayDate = selectedDate ? selectedDate.split('-').reverse().join('/') : '';
    
    const globalStatsHtml = `
      <div class="global-stats">
        <span class="global-badge global-unload">
          <i class="fal fa-truck-container fa-flip-horizontal" style="color: #e69555;"></i> 
          Entrées: ${globalData.totalUnload}
        </span>
        <span class="global-badge global-load">
          <i class="fal fa-truck-container" style="color: #537be0;"></i> 
          Sorties: ${globalData.totalLoad}
        </span>
        <span class="global-badge global-total">
          <i class="fas fa-chart-simple"></i> 
          Total: ${globalData.totalTrucks} camions
        </span>
      </div>
    `;
    
    const fullHtml = `
      <div class="distribution-card">
        <div class="card-header-bar">
          <div class="title-section">
            <h1>
              <i class="fas fa-users"></i>
              Répartition par équipe
            </h1>
            <div class="sub">Répartition des camions par poste • ${displayDate || 'Aujourd\'hui'}</div>
          </div>
          <button class="btn-back" id="back-to-xdock-btn">
            <i class="fas fa-arrow-left"></i> Retour à XDock
          </button>
        </div>
        
        <div class="date-selector-area">
          <div class="date-label"><i class="fas fa-calendar-alt"></i> Sélectionner une date</div>
          <input type="date" id="equipe-date-picker" value="${selectedDate}">
          <span class="refresh-indicator"><i class="fas fa-sync-alt"></i> changement = recharge données</span>
        </div>
        
        ${globalStatsHtml}
        ${cardsHtml}
        
        <div class="card-footer">
          <i class="fas fa-chart-line"></i> Données en temps réel • Mise à jour selon sélection
        </div>
      </div>
    `;
    
    container.innerHTML = fullHtml;
    
    // Attach back button listener
    const backBtn = document.getElementById('back-to-xdock-btn');
    if (backBtn) {
      backBtn.addEventListener('click', function() {
        window.location.href = "/"
      });
    }
    
    // Attach date picker change event
    const datePicker = document.getElementById('equipe-date-picker');
    if (datePicker) {
      datePicker.addEventListener('change', function(e) {
        const newDate = e.target.value;
        console.log('[Équipes] Date changed to:', newDate);
        loadDataAndRender(newDate);
      });
    }
  }
  
  function showLoadingState(container) {
    container.innerHTML = `
      <div class="distribution-card">
        <div class="card-header-bar">
          <div class="title-section">
            <h1><i class="fas fa-users"></i> Répartition par équipe</h1>
            <div class="sub">Chargement des données...</div>
          </div>
          <button class="btn-back" id="back-to-xdock-loading">
            <i class="fas fa-arrow-left"></i> Retour à XDock
          </button>
        </div>
        <div class="loading-spinner">
          <i class="fas fa-circle-notch fa-spin fa-3x"></i>
          <p style="margin-top: 16px;">Chargement des statistiques des équipes...</p>
        </div>
        <div class="card-footer">
          <i class="fas fa-chart-line"></i> Données en temps réel
        </div>
      </div>
    `;
    const backBtn = document.getElementById('back-to-xdock-loading');
    if (backBtn) {
      backBtn.addEventListener('click', function() {
        window.location.reload();
      });
    }
  }
  
  // Main function to load data for a specific date and render
  function loadDataAndRender(date) {
    const appContainer = document.getElementById('team-distribution-app');
    if (!appContainer) return;
    
    showLoadingState(appContainer);
    
    let unloadResult = [];
    let loadResult = [];
    let completed = 0;
    
    function checkComplete() {
      completed++;
      if (completed === 2) {
        const allTours = unloadResult.concat(loadResult);
        console.log('[Équipes] Total tours loaded:', allTours.length, 'for date:', date);
        renderMainContent(allTours, date, appContainer);
      }
    }
    
    fetchUnloadData(date, function(data) {
      unloadResult = data;
      checkComplete();
    });
    
    fetchLoadData(date, function(data) {
      loadResult = data;
      checkComplete();
    });
  }
  
  // ============================================================
  // REPLACE BODY WITH NEW STRUCTURE
  // ============================================================
  function replaceBodyWithApp() {
    // Clear existing body content
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = 'linear-gradient(135deg, #f5f7fc 0%, #eef2f8 100%)';
    
    // Create main app container
    const appDiv = document.createElement('div');
    appDiv.id = 'team-distribution-app';
    document.body.appendChild(appDiv);
    
    // Load initial data (today)
    const today = new Date().toISOString().slice(0, 10);
    loadDataAndRender(today);
  }
  
  // ============================================================
  // INIT - REPLACE PAGE BODY
  // ============================================================
  function init() {
    // Wait for DOM to be ready and jQuery to be available
    if (typeof $ === 'undefined') {
      // If jQuery not loaded, inject it first
      const script = document.createElement('script');
      script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      script.onload = function() {
        replaceBodyWithApp();
      };
      document.head.appendChild(script);
    } else {
      replaceBodyWithApp();
    }
  }
  
  init();
})();
