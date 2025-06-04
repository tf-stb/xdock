//***************************//
// Warehouse Porte Management System - XDock PRO
// V 3.1 - With Real State Checking
//***************************//

// Add warehouse-optimized styles
$("<style>").appendTo("head").html(`
#porte-management {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  width: 100%;
  padding: 15px;
  background-color: #f5f7fa;
}

.warehouse-header {
  background: linear-gradient(135deg, #2c3e50 0%, #4a6491 100%);
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.warehouse-title {
  font-size: 26px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
}

.warehouse-title .navArrow {
  margin: 0 10px;
  color: #a3b1c6;
}

.porte-grid-container {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 25px;
}

.porte-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 15px;
  margin-bottom: 10px;
}

.porte-container {
  position: relative;
}

.porte {
  height: 160px;
  background: #ffffff;
  border-radius: 8px;
  text-align: center;
  padding: 15px 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid #e0e6ed;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  position: relative;
  overflow: visible;
}

.porte:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border-color: #c0ccda;
}

.porte::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: #e0e6ed;
}

/* Status indicator bars */
.porte.free::before { background: #27ae60; }
.porte.taken::before { background: #2980b9; }
.porte.blocked::before { background: #e74c3c; }
.porte.tow_affectation::before { background: #f39c12; }

.porte-door {
  display: block;
  width: 60px;
  height: 40px;
  margin: 10px auto;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
  border-radius: 4px;
  position: relative;
  border: 2px solid #dee2e6;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.1);
}

.porte-door.taken {
  background: linear-gradient(145deg,rgb(41 128 185),rgb(131, 184, 238));
}

.porte-door.blocked {
  background: linear-gradient(145deg, #e74c3c, #ff8893);
}
.porte-door.tow_affectation {
  background: linear-gradient(145deg, #ffb84d,rgb(255, 200, 117));
}
.porte-door.free {
  background: linear-gradient(145deg, #2ecc71,rgb(90, 216, 142));
}

.porte-label {
  background: rgba(255,255,255,0.8);
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  display: inline-block;
  margin-top: 5px;
  border: 1px solid #e0e6ed;
}

/* Dropdown styles */
.porte-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  min-width: 180px;
  padding: 8px 0;
  margin-top: 5px;
  font-size: 14px;
  background-color: white;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.porte-dropdown.show {
  display: block;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.porte-dropdown a {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.2s;
}

.porte-dropdown a:hover {
  background-color: #f8f9fa;
  color: #3498db;
}

.porte-dropdown a i {
  margin-right: 10px;
  width: 18px;
  text-align: center;
}

.porte-dropdown .divider {
  height: 1px;
  margin: 5px 0;
  background-color: #eee;
}

/* Status dashboard */
.status-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 25px;
}

.status-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
}

.status-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: white;
  font-size: 18px;
}

.status-info {
  flex: 1;
}

.status-title {
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 3px;
}

.status-count {
  font-size: 22px;
  font-weight: 600;
  color: #2c3e50;
}

.free-card .status-icon { background: #27ae60; }
.taken-card .status-icon { background: #2980b9; }
.blocked-card .status-icon { background: #e74c3c; }
.tow-card .status-icon { background: #f39c12; }

/* State checking styles */
.porte.checking-state {
  position: relative;
  opacity: 0.8;
}

.porte.checking-state::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255,255,255,0.7);
  z-index: 10;
}

.porte.checking-state .porte-door::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 11;
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.state-notification {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 20;
  white-space: nowrap;
  animation: slideUp 0.3s ease;
}

.state-notification i {
  margin-right: 5px;
}

.state-notification.free {
  background: #27ae60;
  color: white;
}

.state-notification.taken {
  background: #2980b9;
  color: white;
}

.state-notification.tow_affectation {
  background: #f39c12;
  color: white;
}

.state-notification.error {
  background: #e74c3c;
  color: white;
}

@keyframes slideUp {
  from { bottom: -20px; opacity: 0; }
  to { bottom: -5px; opacity: 1; }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .porte-grid {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  }
  
  .status-dashboard {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .status-dashboard {
    grid-template-columns: 1fr;
  }
}
`);

// Create main container with warehouse theme
const porteManagement = $(`
<div id="porte-management">
  
  <div class="porte-grid-container">
    <div class="porte-grid" id="porte-grid-container"></div>
  </div>
  
  <div class="status-dashboard">
    <div class="status-card free-card">
      <div class="status-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <div class="status-info">
        <div class="status-title">Portes Libres</div>
        <div class="status-count" id="total-free">0</div>
      </div>
    </div>
    
    <div class="status-card taken-card">
      <div class="status-icon">
        <i class="fas fa-truck-loading"></i>
      </div>
      <div class="status-info">
        <div class="status-title">Portes Occupées</div>
        <div class="status-count" id="total-taken">0</div>
      </div>
    </div>
    
    <div class="status-card blocked-card">
      <div class="status-icon">
        <i class="fas fa-ban"></i>
      </div>
      <div class="status-info">
        <div class="status-title">Portes Bloquées</div>
        <div class="status-count" id="total-blocked">0</div>
      </div>
    </div>
    
    <div class="status-card tow-card">
      <div class="status-icon">
        <i class="fas fa-clipboard-list"></i>
      </div>
      <div class="status-info">
        <div class="status-title">Multi-Affectations</div>
        <div class="status-count" id="total-tow-affectation">0</div>
      </div>
    </div>
  </div>
</div>
`);

// Replace existing content
$("#img-zonenuebersicht").parent().replaceWith(porteManagement);
// Set page title
  // Set page header
  $("h1").parent().replaceWith(`<div id="xdock_pro_page_header" class="row d-flex align-items-center h-100 xdock-head-row">
    <div class="col-6 h-100 xdock-head-title">
        <h1>
           XDock PRO <span class="fa fa-caret-right navArrow"></span> Gestion des Portes   
        </h1>
    </div>
 
    </div>`);
    // Set page title
    $("head>title").html("Gestion des Portes Entrepôt :: XDock PRO");

// Load Font Awesome for icons
$("head").append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">');

// Main application
class WarehousePorteManager {
  constructor() {
    this.portes = [];
    this.init();
  }

  async init() {
    await this.loadPortesData();
    this.renderPortes();
    this.updateStatusDashboard();
    this.setupEventListeners();
  }

  async loadPortesData() {
    try {
      const data = await $.get("/ToreZonenCluster/ToreZonenIndex");
      const domData = $(data);
      
      this.portes = domData.find("#tore-table tbody tr").map((index, row) => {
        const cells = $(row).find("td");
        const num = cells.eq(1).text().trim();
        const url = cells.eq(1).find("a").attr("href");
        const blocked = cells.eq(3).find("input").is(":checked");
        const affectation = parseInt(cells.eq(4).text().trim()) || 0;
        
        return {
          id: `T${index + 0}`, // T0-T28
          num,
          url,
          blocked,
          affectation,
          status: this.determineStatus(blocked, affectation)
        };
      }).get();
    } catch (error) {
      console.error("Error loading portes data:", error);
      // Show error to user
      $("#porte-grid-container").html(`
        <div class="alert alert-danger" style="grid-column: 1/-1">
          Erreur de chargement des données. Veuillez rafraîchir la page.
        </div>
      `);
    }
  }

  determineStatus(blocked, affectation) {
    if (blocked) return "blocked";
    if (affectation === 0) return "free";
    if (affectation > 1) return "tow_affectation";
    return "taken";
  }

  renderPortes() {
    const gridContainer = $("#porte-grid-container");
    gridContainer.empty();

    this.portes.forEach(porte => {
      const porteElement = $(`
        <div class="porte-container">
          <div id="${porte.id}" class="porte ${porte.status}" 
               data-porte-id="${porte.id}" 
               data-porte-num="${porte.num}">
            <div class="porte-door ${porte.status}"></div>
            <span class="porte-label">${porte.num}</span>
          </div>
        </div>
      `);

      gridContainer.append(porteElement);
    });
  }

  setupEventListeners() {
    // Click handler for portes
    $(document).on('click', '.porte', (e) => {
      const porteId = $(e.currentTarget).data('porte-id');
      const porte = this.portes.find(p => p.id === porteId);
      this.showPorteDropdown(porteId, porte.url);
      
      // Close other open dropdowns
      $('.porte-dropdown.show').not($(e.currentTarget).closest('.porte-container').find('.porte-dropdown')).removeClass('show');
    });

    // Close dropdown when clicking outside
    $(document).on('click', (e) => {
      if (!$(e.target).closest('.porte-container').length) {
        $('.porte-dropdown.show').removeClass('show');
      }
    });
  }

  async showPorteDropdown(porteId, porteUrl) {
    const container = $(`#${porteId}`).closest(".porte-container");
    let dropdown = container.find(".porte-dropdown");

    // Toggle if dropdown already exists
    if (dropdown.length) {
      dropdown.toggleClass("show");
      return;
    }

    // Create new dropdown
    dropdown = $('<div class="porte-dropdown"></div>');
    container.append(dropdown);

    // Add loading item
    dropdown.append('<a class="dropdown-item"><i class="fas fa-spinner fa-spin"></i> Chargement...</a>');

    try {
      const data = await $.get(porteUrl);
      const buttons = $(data).find(".btn-sm");
      
      // Clear loading item
      dropdown.empty();
      
      // Add default "Open Porte" item
      dropdown.append(`
        <a href="${porteUrl}" class="dropdown-item">
          <i class="fas fa-door-open"></i> Ouvrir Porte
        </a>
      `);
      
      // Add "Check Real State" item
      dropdown.append(`
        <a href="#" class="dropdown-item check-state" data-porte-id="${porteId}">
          <i class="fas fa-sync-alt"></i> Vérifier État Réel
        </a>
      `);

      // Add divider before action buttons
      dropdown.append('<div class="divider"></div>');

      // Add action buttons from the page
      if (buttons.length > 0) {
        buttons.each((index, button) => {
          const $button = $(button);
          const href = $button.attr("href");
          const text = $button.text().trim();
          const icon = $button.find("i").attr("class") || this.getActionIcon(text);
          
          if (href && text) {
            const itemClass = $button.hasClass("btn-danger") ? "text-danger" : 
                             $button.hasClass("btn-primary") ? "text-primary" : "";
            dropdown.append(`
              <a class="dropdown-item ${itemClass}" href="${href}">
                <i class="${icon}"></i> ${text}
              </a>
            `);
          }
        });
      } else {
        dropdown.append(`
          <a class="dropdown-item disabled">
            <i class="fas fa-info-circle"></i> Aucune action disponible
          </a>
        `);
      }
      
      // Add click handler for check real state
      dropdown.find('.check-state').on('click', (e) => {
        e.preventDefault();
        this.checkRealState(porteId, porteUrl);
      });
      
      dropdown.addClass("show");
    } catch (error) {
      console.error(`Error loading actions for ${porteId}:`, error);
      dropdown.empty().append(`
        <a class="dropdown-item text-danger">
          <i class="fas fa-exclamation-triangle"></i> Erreur de chargement
        </a>
      `);
      dropdown.addClass("show");
    }
  }

  getActionIcon(actionText) {
    const action = actionText.toLowerCase();
    if (action.includes('bloquer')) return 'fas fa-lock';
    if (action.includes('débloquer')) return 'fas fa-unlock';
    if (action.includes('modifier')) return 'fas fa-edit';
    if (action.includes('supprimer')) return 'fas fa-trash';
    if (action.includes('affecter')) return 'fas fa-truck-moving';
    return 'fas fa-truck-moving';
  }

  async checkRealState(porteId, porteUrl) {
    const porteElement = $(`#${porteId}`);
    const porteNum = porteElement.data('porte-num');
    
    // Show loading state
    porteElement.addClass('checking-state');
    const originalStatus = porteElement.attr('class').replace('checking-state', '').trim();
    
    try {
      // Get the main door page
      const data = await $.get(porteUrl);
      const buttons = $(data).find(".btn-sm");
      const buttonUrls = buttons.map((i, btn) => $(btn).attr('href')).get();
      
      // Check if there are any buttons
      if (buttonUrls.length === 0) {
        this.showStateResult(porteId, 'free', 'Porte libre (aucun camion affecté)');
        return;
      }
      
      // Check each truck's status
      const statusChecks = await Promise.all(
        buttonUrls.map(url => this.checkTruckStatus(url))
      );
      
      // Analyze results
      const allFree = statusChecks.every(status => status === 81);
      const anyFree = statusChecks.some(status => status === 81);
      const anyTaken = statusChecks.some(status => status < 81);
      
      if (allFree) {
        this.showStateResult(porteId, 'free', 'Porte libre (tous les camions ont le statut 81)');
      } else if (anyFree && anyTaken) {
        this.showStateResult(porteId, 'tow_affectation', 'Porte partiellement occupée (mix de statuts 81 et autres)');
      } else {
        this.showStateResult(porteId, 'taken', 'Porte occupée (aucun camion avec statut 81)');
      }
      
    } catch (error) {
      console.error(`Error checking real state for ${porteId}:`, error);
      this.showStateResult(porteId, originalStatus, 'Erreur de vérification', true);
    } finally {
      porteElement.removeClass('checking-state');
    }
  }

  async checkTruckStatus(truckUrl) {
    try {
      const data = await $.get(truckUrl);
      const statusElement = $(data).find('.tourStatus');
      
      if (statusElement.length) {
        const statusText = statusElement.text().trim();
        const statusValue = parseInt(statusText);
        return isNaN(statusValue) ? 0 : statusValue;
      }
      return 0;
    } catch (error) {
      console.error(`Error checking truck status at ${truckUrl}:`, error);
      return 0;
    }
  }

  showStateResult(porteId, status, message, isError = false) {
    const porteElement = $(`#${porteId}`);
    const originalClasses = porteElement.attr('class').split(' ')
      .filter(c => !c.startsWith('temp-status-')).join(' ');
    
    // Clear any previous temporary status
    porteElement.removeClass (function(index, className) {
      return (className.match(/(^|\s)temp-status-\S+/g) || []).join(' ');
    });
    
    // Add temporary status class
    porteElement.addClass(`${status}`);
    
    // Update door visual
    porteElement.find('.porte-door').removeClass('free taken blocked tow_affectation').addClass(status);
     porteElement.removeClass('free taken blocked tow_affectation').addClass(status);
    
    // Show notification
    const notification = $(`
      <div class="state-notification ${isError ? 'error' : status}">
        <i class="fas ${isError ? 'fa-exclamation-triangle' : 
                          status === 'free' ? 'fa-check-circle' : 
                          status === 'taken' ? 'fa-truck-loading' : 
                          'fa-clipboard-list'}"></i>
        ${message}
      </div>
    `);
    
    $(`#${porteId}`).append(notification);
    
    // Remove notification after delay
    setTimeout(() => {
      notification.fadeOut(500, () => notification.remove());
      
      // // Revert to original status after longer delay
      // setTimeout(() => {
      //   porteElement.removeClass(`temp-status-${status}`);
      //   const originalStatus = originalClasses.split(' ').find(c => ['free', 'taken', 'blocked', 'tow_affectation'].includes(c));
      //   porteElement.find('.porte-door').removeClass('free taken blocked tow_affectation').addClass(originalStatus);
      // }, 3000);
    }, 5000);
  }

  updateStatusDashboard() {
    $("#total-free").text(this.portes.filter(p => p.status === "free").length);
    $("#total-taken").text(this.portes.filter(p => p.status === "taken").length);
    $("#total-blocked").text(this.portes.filter(p => p.status === "blocked").length);
    $("#total-tow-affectation").text(this.portes.filter(p => p.status === "tow_affectation").length);
  }
}

// Initialize the application when DOM is ready
$(document).ready(() => {
  new WarehousePorteManager();
});
