var attendees = [];

function addAttendee() {
  console.log("Called");
}

$(function() {
  $(document).on('keypress', '.attendee', function(e) {
    if(e.charCode === 13) {
      addAttendee();
    }
  });
});
