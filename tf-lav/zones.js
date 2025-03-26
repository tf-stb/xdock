//***************************//
// Map add-on for XDock PRO
// V 2.07
// Dernière mise à jour le  16/02/2025
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
  #map-border{
  width: 100%;
  zoom:100%;
  }

.container-fluid.mt-3,
#xdock_pro_page_header {
  display: none !important;
}



.date {
  display: block !important;
}

.zones_top,.zones_down{
left:70px !important;
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

#a4>* {
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

a.de_hier>div[id],
a.blocked>div[id] {
color: #fff !important;
}

a.blocked>div[id] {
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

.zone_value{
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

[zone="112"],[zone="220"]
{
margin-right: 45px;
}
.thin>.zone_name {
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
    display: flex
;
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

.d-none{
  display: none;
}
  `);
  
  let a4 = `
        <div id="a4">
    <div id="map-border"></div>
    <!-- Zone top -->
    <div class="zones_top" id="big-zones-container">
      <!-- Big zones will be generated here dynamically (101-121) -->
    </div>

    <!-- Zones down -->
    <div class="zones_down" id="thin-zones-container">
      <!-- Thin zones will be generated here dynamically (201-242) -->
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
        <div class="color de_avance"></div> <span class="title">Marchandises en avance</span> <span
          id="total_de_avance"></span>
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
  
  $("#img-zonenuebersicht").replaceWith(a4);
  $("head>title").html("Gestion des zones :: XDock PRO");
  
  // Set page header
  $("h1").parent().replaceWith(`<div id="xdock_pro_page_header" class="row d-flex align-items-center h-100 xdock-head-row">
  <div class="col-6 h-100 xdock-head-title">
      <h1>
         XDock PRO <span class="fa fa-caret-right navArrow"></span> Gestion des zones
      </h1>
  </div>
  <div class="col-6 text-right">
  <button class="btn btn-sm btn-outline-primary mr-10" style="height: 50%;" id="double_stock"  ><span class="fas fa-sticky-note	 mr-10"></span>Double stock (cartons)</button>
  <button class="btn btn-sm btn-outline-primary" style="height: 50%;" id="zones_preliv"  ><span class="fa fa-boxes mr-10"></span>Zones de pré-livraison</button>
  
   
  </div>
  </div>`);
  

// render the zones


  function randerer_zones() {
    // Generate big zones (101-121)
    const bigZonesContainer = document.getElementById('big-zones-container');
    for (let i = 121; i >= 101; i--) {
      const zoneClass = (i % 2 === 0) ? 'sec_color' : 'first_color';
      const zoneElement = document.createElement('a');
      zoneElement.className = `zone big ${zoneClass}`;
      zoneElement.setAttribute('zone', i);
      zoneElement.setAttribute('target', '_blank');
      
      zoneElement.innerHTML = `
        <div class="zone_name">${i}</div>
        <div class="zone_value" id="${i}"></div>
      `;
      
      bigZonesContainer.appendChild(zoneElement);
    }

    // Generate thin zones (201-242)
    const thinZonesContainer = document.getElementById('thin-zones-container');
    for (let i = 201; i <= 242; i++) {
      const zoneClass = (i % 2 === 0) ? 'sec_color' : 'first_color';
      const zoneElement = document.createElement('a');
      zoneElement.className = `zone thin ${zoneClass}`;
      zoneElement.setAttribute('zone', i);
      zoneElement.setAttribute('target', '_blank');
      
      zoneElement.innerHTML = `
        <div class="zone_name">${i}</div>
        <div class="zone_value" id="${i}"></div>
      `;
      
      thinZonesContainer.appendChild(zoneElement);
    }

    // Set current date for printing
    const today = new Date();
    const dateString = today.toLocaleDateString('fr-FR');
    document.getElementById('date_of_print').textContent = dateString;
  };




  randerer_zones()

  /* Status
   - free
   - taken
   - blocked
   - de_hier
   - de_avance
  */
  let selected_date;
  if (window.location.href.includes("?selectedDate")) {
    selected_date = window.location.href.split("?selectedDate=")[1];
  } else {
    selected_date = $("#selectedDate").val();
  }
  
  let updated_zones;
  let LastModified;
  
  $("#selectedDate").on("change", function (e) {
    // reset map
    $("#a4").replaceWith(a4);
  
    randerer_zones()
    // load new date
    $.get("/Warenausgang/Tag?sort=ZielortLokationNameASC&selectedDate=" + $(e.target).val(), function (data, textStatus, jqXHR) {
      update_zone_status(data);
    });
  
    // update url
    window.location.href = window.location.href + "?selectedDate=" + $("#selectedDate").val();
  });
  
  // When dom ready call data
  $(document).ready(function () {
    //sort: ZielortLokationNameASC
    $.get("/Warenausgang/Tag?sort=StatusASC&selectedDate=" + selected_date, function (data, textStatus, jqXHR) {
      update_zone_status(data);
    });
  });
  
  // Update zones status
  function update_zone_status(dataServ) {
    let zone_info = [];
    let data = $(dataServ);
    // loop for zone alredy teken
    $(data.find("#ZoneBase>select>option")).each(function (index, value) {
      let option = $(value);
      let zoneID = parseInt(option.val());
      // check if is taken
      if (option.hasClass("zone-in-verwendung-auslieferungstermin")) {
        let tr_children = data
          .find("[data-selected='" + zoneID + "']")
          .parent()
          .children();
        let ref = get_ref_code(tr_children[6].innerText.trim());
        let SM_ID = tr_children[0].innerText.trim()
       
  
        // check tour status
        let lpStatus = tr_children[1].innerText;
  
        switch (parseInt(lpStatus)) {
          case 81:
          case 80:
            zone_info.push({
              id: zoneID,
              name: option.html(),
              ref: ref,
              status: "en_cours",
              SM_ID:SM_ID,
            });
            break;
          default:
            zone_info.push({
              id: zoneID,
              name: option.html(),
              ref: ref,
              status: "taken",
              SM_ID:SM_ID,
            });
            break;
        }
  
        // check if is tecken for de_hier
      } else if (option.hasClass("zone-in-verwendung-vergangenheit")) {
        zone_info.push({ id: zoneID, name: option.html(), status: "de_hier" });
        // check if is tecken for de_avance
      } else if (option.hasClass("zone-in-verwendung-zukunft")) {
        zone_info.push({
          id: zoneID,
          name: option.html(),
          ref: "",
          status: "de_avance",
          SM_ID:""
        });
      } else if (option.is(":disabled")) {
        zone_info.push({
          id: zoneID,
          name: option.html(),
          ref: "",
          status: "blocked",
          SM_ID:""
        });
      } else {
        zone_info.push({
          id: zoneID,
          name: option.html(),
          ref: "",
          status: "free",
          SM_ID:""
        });
      }
    });
  
    updated_zones = zone_info;
  
    // update map
    update_map();
  }
  
  function update_map() {
    updated_zones.map((zone) => {
      let zone_el = $("#" + zone.name);
      // set status color
      switch (zone.status) {
        case "free":
          zone_el.parent().addClass("free");
          break;
        case "taken":
          zone_el.parent().addClass("taken");
          break;
        case "en_cours":
          zone_el.parent().addClass("en_cours");
          break;
        case "de_hier":
          zone_el.parent().addClass("de_hier");
          break;
        case "de_avance":
          zone_el.parent().addClass("de_avance");
          break;
        case "blocked":
          zone_el.parent().addClass("blocked");
          break;
      }
      zone_el.html(zone.ref);
  
      zone_el.parent().attr("href", "/Zonen/EditZone/" + zone.id + "");
      zone_el.parent().attr("SM_href", "/Warenausgang/Tour?sort=LieferantStrASC&waTourId=" + zone.SM_ID );
    });
  
    // numbers
    $("#total_en_cours").html("(" + $(".en_cours").not(".color").length + ")");
    $("#total_free").html("(" + $(".free").not(".color").length + ")");
    $("#total_taken").html("(" + $(".taken").not(".color").length + ")");
    $("#total_de_hier").html("(" + $(".de_hier").not(".color").length + ")");
    $("#total_de_avance").html("(" + $(".de_avance").not(".color").length + ")");
    $("#total_blocked").html("(" + $(".blocked").not(".color").length + ")");

    // hendel on shift click open SM URL
    $(document).on("click","a[zone]",function(e){
      if(e.ctrlKey){
        e.preventDefault();
        window.open($(this).attr("SM_href"),"_blank")
      }
    })
  }
  
  // remove h1 befor print
  window.addEventListener("beforeprint", (event) => {
    $("h1").parent().remove();
  
    //set date of print
    var currentdate = new Date();
    var options = { hour12: false };
    var current = currentdate.toLocaleString("fr-FR", options);
    current = current.replace(/\//g, "-");
  
    $("#date_of_print").html(current);
  });
  
  function get_ref_code(ref) {
    let code_vo;
    switch (ref) {
      case "Ablis":
        code_vo = "ABL";
        break;
      case "Les Arcs sur Argens":
        code_vo = "ASA";
        break;
      case "Barbery":
        code_vo = "BAR";
        break;
      case "Baziège":
        code_vo = "BAZ";
        break;
      case "Beaucaire":
        code_vo = "LUN";
        break;
      case "Béziers":
        code_vo = "BEZ";
        break;
      case "Carquefou":
        code_vo = "CAQ";
        break;
      case "Cestas":
        code_vo = "CET";
        break;
      case "Chanteloup les Vignes":
        code_vo = "CLV";
        break;
      case "Entzheim":
        code_vo = "ENT";
        break;
      case "Gondreville":
        code_vo = "GON";
        break;
      case "Guingamp":
      case "CHÂTELAUDREN-PLOUAGAT":
        code_vo = "GUI";
        break;
      case "Honguemare - Guenouville":
        code_vo = "HON";
        break;
      case "La Chapelle D'Armentières":
        code_vo = "LCA";
        break;
      case "Le Coudray-Montceaux":
        code_vo = "LCM";
        break;
      case "Liffré":
        code_vo = "LIF";
        break;
      case "Loures":
        code_vo = "LOU";
        break;
      case "Lillers":
        code_vo = "LIL";
        break;
      case "Saint Augustin":
        code_vo = "SAI";
        break;
      case "Lunel":
        code_vo = "LUN";
        break;
      case "Meaux":
        code_vo = "MEA";
        break;
      case "Montchanin":
        code_vo = "MON";
        break;
      case "Montoy Flanville":
        code_vo = "MFV";
        break;

      case "Pontcharra":
        code_vo = "PCH";
        break;
      case "Plouagat":
        code_vo = "PLO";
        break;
      case "Provence":
      case "ROUSSET":
      case "Rousset":
        code_vo = "PRO";
        break;
      case "Sailly lez Cambrai":
        code_vo = "SLC";
        break;
      case "Saint Quentin Fallavier":
        code_vo = "SQF";
        break;
      case "Sorigny":
        code_vo = "SOR";
        break;
      case "Vars":
        code_vo = "VAR";
        break;
   
      default:
        code_vo = "???";
        break;
    }
  
    return code_vo;
  }
  
  // update avance info
  function load_other_day(selectedDate) {
    $.get("/Warenausgang/Tag?sort=StatusASC&selectedDate=" + switchDate(selectedDate), function (dataServ, textStatus, jqXHR) {
      let zone_info = [];
      let data = $(dataServ);
      // loop for zone alredy teken
      $(data.find("#ZoneBase>select>option")).each(function (index, value) {
        let option = $(value);
        let zoneID = parseInt(option.val());
        // check if is taken
        if (option.hasClass("zone-in-verwendung-auslieferungstermin")) {
          let tr_children = data
            .find("[data-selected='" + zoneID + "']")
            .parent()
            .children();
          let ref = get_ref_code(tr_children[6].innerText.trim());
  
          // let url = $(tr_children[0]).find("a").attr("href");
  
          if (ref == "GCA?_TEN?") {
            ref = tr_children[8].innerText.trim().substring(11, 15);
          }
  
          $("#" + option.html()).append(ref);
        }
      });
    });
  }
  
  $(document).on("click", "#show_avance", function () {
    load_other_day("next");
  });
  
  $(document).on("click", "#show_SM_hier", function () {
    load_other_day("back");
  });
  
  function switchDate(dayIN) {
    let d = new Date();
  
    if (dayIN == "next") {
      d.setDate(d.getDate() + 1);
    } else {
      d.setDate(d.getDate() - 1);
    }
  
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();
  
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
  
    return [year, month, day].join("-");
  }
  
  //***************************//
  // Zones de pre-livraison
  //***************************//
  
  $(document).on("click", "#zones_preliv", function () {
    let all_zones_bloked = $(".blocked").not(".color");
  
    $.each(all_zones_bloked, function (indexInArray, valueOfElement) {
      let zoneEL = $(valueOfElement);
      let zoneName = zoneEL.attr("zone");
  
      $.get(zoneEL.attr("href"), function (dataServ, textStatus, jqXHR) {
        let content = $(dataServ).find("#sperrgrundTextArea").val();
        $("#" + zoneName).html(content.substring(0, 12));

      });
    });
  });
  
  //***************************//
  // Nomber de cartons
  //***************************//
  let cartons_ok = false;
  $(document).on("click", "#double_stock", function () {
    if (cartons_ok) return true;
    cartons_ok = true;
    $.get("/Warenausgang/Tag?sort=StatusASC&selectedDate=" + selected_date, function (servdata) {
      let data = $(servdata);
  
      $(data.find("#ZoneBase>select>option")).each(function (index, value) {
        let option = $(value);
        let zoneID = parseInt(option.val());
  
        if (option.hasClass("zone-in-verwendung-auslieferungstermin")) {
          let tr_children = data
            .find("[data-selected='" + zoneID + "']")
            .parent()
            .children();
  
          // number de cartons*
          let emplacmet = 0;
          let emplacmet_num = tr_children[2].innerText.trim();
          let total_num = tr_children[4].innerText.trim().split("/")[1];
  
          if (emplacmet_num.includes(",")) {
            // Replace the comma with a dot
            let modifiedStr = emplacmet_num.replace(",", ".");
  
            // Convert the modified string to a number
            emplacmet = parseFloat(modifiedStr);
          } else {
            emplacmet = emplacmet_num;
          }
  
          let cartons_num = parseInt(total_num) - emplacmet;
  
          let cartons = " <span class='badge bg-light  text-dark'>" + cartons_num + " </span>";
          // add cartons to dom
          $("#" + option.html()).append(cartons);
        }
      });
    });
  });
