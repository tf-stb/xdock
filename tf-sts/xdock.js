//***************************//
// XDock PRO - STEF LAVAL
// Dernière mise à jour le 25/03/2025
//***************************//
$("footer>.text-muted.text-right").prepend("<small>XDock PRO - </small>");

if (window.location.pathname == "/") {
  $("h1").html("XDock PRO");
}

//--------------------------
// CSS Styles
//--------------------------

$("<style>").appendTo("head").html(`
/* From JS */
/* Augmenter la taille du texte Remorque /véhicules */
input#kennzeichenZugmaschine,
input#kennzeichenAuflieger,input#tel {
    font-size: 21px !important;
    
}
button.btn[data-id="spediteurId"] {
  width: 354px;
}

/* Augmenter la taille du texte de la porte */
label[for="tor-name"] a {
    font-size: 21px !important;
}

/* Augmenter la taille du les Collaborateurs */
select.form-control.form-control-sm.updateMitarbeiterSelectbox{
    width: 120px;
 }
 select.form-control.form-control-sm.updateMitarbeiterSelectbox > option{
     font-size: 19px;
 
 }
 /* Augmenter la taille du tooltip */
 .tooltip-mehr {
    font-size: 20px;
}


/* delete palettes btn */
div#delete_palettes_zone {
  display: contents;
}

button#delete_palettes {
  position: absolute;
  left: 274px;
  margin-top: 8px;
}

button#copy_palettes {
  position: absolute;
  left: 554px;
  margin-top: 8px;
}

button#paste_palettes {
  margin-top: 15px;
  margin-left: 10px;
}


.addLp-ausgewaehlt {
  background-color: #ccc !important;
}

.palettenStatusSmall {
  font-size: 14px;  
}


/* Tor planer */

.torplaner-main > nav {
  display: none;
}

.schnellauswahl {
  width: 1400px;
  margin: 0 auto !important;
  padding-bottom: 30px;
}

.torplaner-main {
  width: 1400px !important;
  margin: 0 auto;
}

.schnellauswahl button {
  width: 114px;
  height: 42px;
  padding: 0 20px 0 20px;
}

.schnellauswahl button:hover{
  opacity: 0.6
}
.schnellauswahl button.abwaehlen {
  width: 220px;
}

.schnellauswahl button.dummy {
  width: 133px;
}

.mr-10{
  margin-right:10px;
}

.xdock-tourlp-paletten-table img{
  height: 75px;
}


.badge-liv{
  background-color: #d5d5d5;
}

#plettes_selected_count {
  position: absolute;
  left: 808px;
  margin-top: 12px;
  font-weight: bold;
}





  .pointer{
  cursor: pointer;
  }


 `);

//--------------------------
// Statics
//--------------------------

const isSMTour = window.location.href.includes("Warenausgang/Tour") ? true : false;
const isEMTour = window.location.href.includes("Wareneingang/Tour") ? true : false;



//--------------------------------
// Select/Count/Delete palettes
//--------------------------------

// click on four to select
$(document).on("click", "span.d-inline-block.text-truncate.w-100.mightoverflow", function (ev) {
  if (!ev.ctrlKey) return false;

  $($($(this).parent().parent().find(".lieferpositionToDelete")[0])).trigger("click");
});

// add BTNs delete and copy palettes

$(".addlp-button[value='AddLieferposition']").after(`<div id="delete_palettes_zone"></div>`);

let num_palettes_selected = 0;

// on selections palettes for delete
$(document).on("change", ".lieferpositionToDelete", function (e) {
  if (!$(".to-be-deleted").length > 0) {
    $("#delete_palettes_zone").html("");
    $("#plettes_selected_count").html("");
    num_palettes_selected = 0;

    return false;
  }

  let num_palette_selected_current;

  if (isSMTour) {
    $("#delete_palettes_zone").html(`
  
    <button id="delete_palettes" class="btn btn-sm btn-outline-danger">
  <span class="fal fa-trash"></span>
  Supprimez les positions sélectionnées
  </button>

  
  
  `);

    num_palette_selected_current = parseInt($(e.target).parent().parent()[0].cells[14].innerText);
  } else {
    $("#delete_palettes_zone").html(`
      <button id="delete_palettes" class="btn btn-sm btn-outline-danger">
      <span class="fal fa-trash"></span>
      Supprimez les positions sélectionnées
      </button>
  `);

    num_palette_selected_current = parseInt($(e.target).parent().parent()[0].cells[13].innerText);
  }

  // Palettes Counters.
  // check if checked to count num palettes
  if ($(e.target).is(":checked")) {
    num_palettes_selected += num_palette_selected_current;
  } else {
    num_palettes_selected -= num_palette_selected_current;
  }

  // show num palettes selected
  $("#delete_palettes_zone").append("<span id='plettes_selected_count'> Nombre des palettes sélectionnées:  " + num_palettes_selected + "<span>");
});

$(document).on("click", "#delete_palettes", function (e) {
  $("#deleteSelectedLieferpositions").trigger("click");
});

$(document).on("click", "#copy_palettes", function (e) {
  copy_palettes_GTINs();
});





//--------------------------------
// Add Apps to menu
//--------------------------------

$('.navbar [href="/Artikel/Artikel"]').after(`
<hr>
<div style="font-size: 12px; font-weight: bold; margin-left: 15px;" class="">XDock PRO:</div>
<a class="dropdown-item" href="https://tf-stb.com/iot/" target="_blank">TF-STB IoT </a>

`);


//--------------------------------
// Outils supplémentaires SM
//--------------------------------

if (isSMTour) {
  $($("#kopfdaten").children()[3]).append(
    `
    <div class="pt-3 dropdown">
      <a  href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          <i class="fal fa-chevron-right" aria-hidden="true"></i>
          Outils supplémentaires
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <div style="font-size: 12px; font-weight: bold; margin-left: 15px;" class="">Sortie de marchandises:</div>
            <button class="dropdown-item" id="make_tour81"><span class="fal fa-check  mr-10"></span> Passer la tournée en 81</button>

            <hr>
              <button class="dropdown-item" id="delete_all_positions"><span class="fal fa-trash  mr-10"></span> Supprimer tout les positions</button>   



      </div>
  </div
`
  );
}
$(document).on("click", "#delete_all_positions", function (e) {
    if (!e.ctrlKey) return toastr.info(`Veuillez rester appuyé sur CTRL pour confirmer la suppression.`);
    $(".lieferpositionToDelete").trigger("click");
    $("#deleteSelectedLieferpositions").trigger("click");
  
});

$(document).on("click", "#make_tour81", function (e) {
  if (!e.ctrlKey) return toastr.info(`Veuillez rester appuyé sur CTRL pour confirmer le changement de tournée.`);
   let tourID = window.location.href.split("TourId=")[1].substr(0, 8);
   // get token
  $.get("/TorPlanerWarenausgang/TorPlanerWarenausgang?waTourId=" + tourID, function (data) {
    
    
    let token = $(data).find("input[name='__RequestVerificationToken']").val();
   
    // update tor to dummy
    $.post(`/TorPlanerWarenausgang/UpdateTorToDummy?waTourid=${tourID}`, {
      __RequestVerificationToken: token,
    }, function (response) {
      if(response){
        toastr.success("Le tor a été mis à jour avec succès.");
        window.location.href = window.location.href + `&Dummy`;
      } else {
        toastr.error("Une erreur s'est produite lors de la mise à jour du tor.");
      }
    });
  });

}); 

 

$(document).ready(function () {
  if (
    window.location.href.includes("&Dummy") 
  ) {

     // tel
    $("#tel").val("x");

    if($("#kennzeichenZugmaschine").val() == ""){
      $("#kennzeichenZugmaschine").val("x");
    }

     if($("#kennzeichenAuflieger").val() == ""){
      $("#kennzeichenAuflieger").val("x");    
    }

    // palettenGeliefert
    if($("#palettenGeliefert").val() == ""){
      $("#palettenGeliefert").val("0");    
    }

    //Klick auf Start
    $.get(getCurrentLagerDatetimeUrl, function (data) {
      $("#ausgabeLadeanweisung").val(data.currentLagerDateTime);
      $("#fertigstellungLadeanweisung").attr({
        min: $("#ausgabeLadeanweisung").val(),
      });

       $.get(getCurrentLagerDatetimeUrl, function (data) {
      $("#fertigstellungLadeanweisung").val(data.currentLagerDateTime);
      $("#fertigstellungLadeanweisung").attr({
        min: $("#ausgabeLadeanweisung").val(),
      });

      $("#saveBtn").trigger("click");
    });
    });

  }
});



 