var attendees = [];
var people =  [
      "David Smith",
      "Brian Boughton",
      "Carlos Ochoa",
      "Jeff Boughton",
      "Lisa Tassiello",
      "Matt Merrill",
      "Sheena Smith",
      "Todd Meyer"
    ];

function addAttendee(attendee) {
  attendees.push(attendee);
  console.log("Current attendees: "+attendees);
  $('.attendee').last().parents('.form-group').after('<div class="form-group"><div class="col-sm-12"><input class="form-control attendee" placeholder="Add Attendee"></div></div>');
  $('.attendee').last().focus();
  $('.attendee').last().autocomplete({
    source: people
  });
}

$(function() {
  $('.attendee').autocomplete({
    source: people
  });
  $(document).on('keypress', '.attendee', function(e) {
    if(e.charCode === 13) {
      addAttendee($(this).val());
    }
  });

  $('#Search').on('click', function() {
    $('#Search').blur().text("Search Again");
    $('.attendee').fadeOut();
    $('#Intro').addClass('passive');
  });
});
