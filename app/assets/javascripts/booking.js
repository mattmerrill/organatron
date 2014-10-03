var attendees = [];
var people = [];
var selectedContacts = [];

function addAttendee(attendee) {
  $('.attendee').last().parents('.form-group').after('<div class="form-group"><div class="col-sm-12"><input class="form-control attendee" placeholder="Add Attendee"></div></div>');
  $('.attendee').last().focus();
  $('.attendee').last().autocomplete({
    source: people,
    select: function(event, ui) {
      selectedContacts.push(ui.item.id);
      addAttendee();
    }
  });
}

function resizeResults() {
  $('#Results').css('width', window.innerWidth-350);
}

function addRoom(room) {
  console.log(room);
  var result = $('<div class="result"><img class="roomPhoto" src="../assets/room'
  +room.room_number
  +'.jpg"><div class="roomInfo"><h2>'
  +room.name
  +' ('
  +room.room_number
  +')</h2><span class="time selected">2:15p</span><span class="time">3:30p</span><span class="time">5:00p</span><span class="attendeeCount">'
  +' All attendees available</span><button class="btn btn-default bookNow">Book Now</button><img class="icon" src="../assets/people.svg" alt="Room Capacity"><span class="capacity">'
  +room.capacity
  +'</span></div><div class="clearfix"></div></div>');
  if (room.ethernet) {
    result.find('.roomInfo').append('<img class="icon" src="../assets/ethernet.svg" alt="This room has ethernet available">');
  }
  if (room.whiteboard) {
    result.find('.roomInfo').append('<img class="icon" src="../assets/marker.svg" alt="This room has a whiteboard">');
  }
  if (room.monitor) {
    result.find('.roomInfo').append('<img class="icon" src="../assets/display.svg" alt="This room has a projector or monitor">');
  }
  $('#Results .row').append(result);
}

$(function() {
  // Window resize helpers
  resizeResults();
  $(window).resize(function() {
    resizeResults();
  });

  // Initialize input helpers
  $('#Date').datepicker({
    dateFormat: 'MM d, yy'
  });
  $('.attendee').autocomplete({
    source: people,
    select: function(event, ui) {
      selectedContacts.push(ui.item.id);
      addAttendee();
    }
  });

  // Get contacts
  $.getJSON("/contacts", function(data) {
    for (var key = 0, size = data.length; key < size; key++) {
      people.push({"label":data[key].display_name,"id":data[key].id});
    }
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
    if ($('#Subject').val() == '') {
      alert("Please set a subject for your meeting");
      return false;
    }

    // Get the available rooms
    var duration = $('#Duration').val().split(' Minutes')[0];
    if (duration != 30 && duration != 60 && duration != 180) {
      duration = 30;
    }
    $.getJSON("/availabilities?duration="+duration+"&people_ids=3", function(data) {
      for (var i = 0; i < data.rooms.length; i++) {
        addRoom(data.rooms[i]);
      }
    });

    $('#Search').blur().text("Search Again").toggleClass('col-sm-6 col-sm-offset-3 col-sm-8 col-sm-offset-2');
    $('#Date').parent().toggleClass('col-sm-12 col-sm-6');
    $('#Duration').parent().toggleClass('col-sm-12 col-sm-6');
    $('#Results, #Intro').toggleClass('passive active');
  });

  $(document).on('click', '.time', function() {
    $(this).parent().find('.time').removeClass('selected');
    $(this).addClass('selected');
  });

  $('#CloseBookingModal').on('click', function() {
    location.reload();
  });

  $(document).on('click', '.bookNow', function() {
    $('#bookModal img.roomInfo').attr('src', $(this).parents('.result').find('img').attr('src'));
    $('#bookModal').modal('show');
  });
});
