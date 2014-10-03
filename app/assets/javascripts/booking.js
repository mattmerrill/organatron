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
  $('#Results').css('width', window.innerWidth-370);
}

function addRoom(room) {
  console.log(room);
  var result = $('<div class="result" data-room-id="'
  +room.id
  +'" data-room-number="'
  +room.room_number
  +'"><img class="roomPhoto" src="../assets/room'
  +room.room_number
  +'.jpg"><div class="roomInfo"><h2>'
  +'<span class="roomName">'+room.name+'</span> ('
  +room.room_number
  +')</h2><span class="attendeeCount">'
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

  // Add available time slots
  for (var i = room.availabilities.length - 1; i >= 0; i--) {
    var availability = $('<span class="time">'+room.availabilities[i]+'</span>');
    if (i === 0) {
      availability.addClass('selected');
    }
    result.find('h2').after(availability);
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
  $('#Date').datepicker('setDate', new Date);
  $('.attendee').autocomplete({
    source: people,
    select: function(event, ui) {
      selectedContacts.push(ui.item.id);
      addAttendee();
    }
  });
  $('#Duration').val('60 Minutes');

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

  // We want 2014-10-02T14:00:00Z
  function formatDateAndTime(date, time) {
    return date.getFullYear() + '-' + ("0000"+(1+date.getMonth())).slice(-2) + '-' + ("0000"+(date.getDate())).slice(-2) + 'T' + convertTimeStr(time) + ':00Z';
  }

  function formatDate(date) {
    return date.getFullYear() + '-' + ("0000"+(1+date.getMonth())).slice(-2) + '-' + ("0000"+(date.getDate())).slice(-2) + 'T' + ("0000"+(date.getHours())).slice(-2) + ':' + ("0000"+(date.getMinutes())).slice(-2) + ':00Z';
  }

  function convertTimeStr(timeStr) {
    var timeRe = /(\d{1,2}):(\d\d)([a|p])/;
    var found = timeStr.match(timeRe);
    var hour = parseInt(found[1]);
    var min = found[2];
    var meridiem = found[3];

    return ("0000" + (hour + (meridiem === 'p' ? 12 : 0))).slice(-2) + ":" + min;
}

  $(document).on('click', '.bookNow', function() {
    var result = $(this).parents('.result');
    var roomId = result.data('room-id');
    var subject = $('#Subject').val();
    var startDate = $('#Date').datepicker('getDate');
    var startTime = result.find('.time.selected').html();
    var usefulStartDateTime = formatDateAndTime(startDate,startTime);
    var duration = $('#Duration').val().split(' Minutes')[0];
    var endDateTime = new Date((new Date(usefulStartDateTime)).getTime() + duration*60000 + 25200000);
    console.log(new Date(usefulStartDateTime));
    var usefulEndDateTime = formatDate(endDateTime);
    $.post("/calendar_events", {
      "room_id": roomId,
      "contact_ids": selectedContacts,
      "start_date": usefulStartDateTime,
      "end_date": usefulEndDateTime,
      "subject": subject
    }, function() {
      console.log("Success");
    });
    $('#bookModal img.roomInfo').attr('src', result.find('img').attr('src'));
    $('#bookModal span.roomName').html(result.find('.roomName').html());
    $('#bookModal span.subject').html(subject);
    $('#bookModal span.time').html(result.find('.time.selected').html());
    $('#bookModal span.date').html($('#Date').val());
    $('#bookModal span.room_number').html(result.data('room-number'));
    for (var i = 0; i < selectedContacts.length; i++) {
      for (var j = 0; j < people.length; j++) {
        if (selectedContacts[i] == people[j].id) {
          $('#bookModal div.attendees').append($('<div class="col-sm-3"><img src="../assets/person'+people[j].id+'.png"><p>'+people[j].label+'</p></div>'));
        }
      }
    }
    $('#bookModal').modal('show');
  });
});
