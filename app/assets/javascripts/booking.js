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

function resizeResults() {
  $('#Results').css('width', window.innerWidth-350);
}

$(function() {
  resizeResults();
  $(window).resize(function() {
    resizeResults();
  });

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
    $('#Search').blur().text("Search Again").toggleClass('col-sm-6 col-sm-offset-3 col-sm-8 col-sm-offset-2');
    $('#Results, #Intro').toggleClass('passive active');
  });

  $('.time').on('click', function() {
    $(this).parent().find('.time').removeClass('selected');
    $(this).addClass('selected');
  });

  $('#CloseBookingModal').on('click', function() {
    location.reload();
  });
});
