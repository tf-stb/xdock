//--------------------------------
// Demander la priorité & afficher le temps & commentaire interne
//--------------------------------

$(document).ready(function() {
  if (!window.location.href.toLowerCase().includes("yardmanagement")) return;

  // Function to calculate and format time difference
  function formatTimeDifference(dateString) {
    const now = new Date();
    // Convert DD.MM.YYYY HH:MM:SS to Date object
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('.');
    const [hours, minutes, seconds] = timePart.split(':');
    
    const tableDate = new Date(year, month-1, day, hours, minutes, seconds);
    const diffMs = now - tableDate;
    const diffMins = Math.round(diffMs / (1000 * 60));
    
    return diffMins < 1 ? "maintenant" : 
           diffMins < 60 ? `${diffMins} min` : 
           `${Math.floor(diffMins/60)}h ${diffMins%60}min`;
  }

  // Process each row
  $('#yards-container tbody tr').each(function() {
    const $row = $(this);
    
    // 1. Check for target word in tooltip (priority badge)
    const tooltipText = $row.find('i.fal.fa-info-square').attr('data-original-title') || '';
    if (tooltipText.toLowerCase().includes('#priorité')) {
      $row.find('td:first').html(`
        <div class="badge badge-pill bg-danger text-white">
          <i class="fas fa-shipping-fast"></i> Priorité
        </div>
      `);
    }
    
    // 2. Update the 10th cell with time difference
    const $timeCell = $row.find('td').eq(10); // Zero-based index (10th cell = index 9)
    const timeText = $timeCell.find('span').text().trim();
    
    if (/^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}:\d{2}$/.test(timeText)) {
      const timeDiff = formatTimeDifference(timeText);
      $timeCell.find('span').text(`${timeText} – ${timeDiff}`);
      
     
    }

   // 3. add comment to table   
   $("#yard-table thead tr")[0].cells[8].innerHTML = '<th>Commentaire interne</th>'; // Add new header  

    const commentMatch = tooltipText.match(/Commentaire interne:<\/strong>([^<]*)/);
    if (commentMatch) {
      const comment = commentMatch[1].trim();
      $row.find('td').eq(8).html(comment.substring(0, 25) + (comment.length > 25 ? "..." : "")  ); // show only 25 characters
    }
  });
});

function DemanderPrioritaire(){
  $("#kommentarIntern").val($("#kommentarIntern").val() + "\n #priorité")
  $("#saveBtn").trigger("click")
}
