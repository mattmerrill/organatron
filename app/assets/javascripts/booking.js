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
  $('#Duration').on('blur', function() {
    $(this).val($(this).val()+' Minutes');
  });
  $('#Duration').on('focus', function() {
    $(this).val($(this).val().split(' Minutes')[0]);
  });

  $('#Search').on('click', function() {
    if ($('#Date').val() == '') {
      alert("Please select a date");
      return false;
    }
    if ($('#Duration').val() == '') {
      alert("Please set a duration");
      return false;
    }
    $('#Search').blur().text("Search Again").hide();
    $('#Intro').addClass('passive');
  });
});
