class CalendarEventsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    room = Room.find(params[:room_id])
    subject = params[:subject]
    contacts = Contact.find(params[:contact_ids])
    event = CalendarEvent.new(start_date: params[:start_date], end_date: params[:end_date])
    event.contacts << contacts
    event.rooms << room
    event.save

    cal = ::Icalendar::Calendar.new

    event_start = DateTime.parse(params[:start_date])
    event_end = DateTime.parse(params[:end_date])

    # tzid = "America/Phoenix"
    # tz = TZInfo::Timezone.get tzid
    # timezone = tz.ical_timezone event_start
    # cal.add_timezone timezone

    description = "To talk about all the awesome things!"

    cal.event do |e|
      e.dtstart = ::Icalendar::Values::DateTime.new event_start
      e.dtend   = ::Icalendar::Values::DateTime.new event_end
      e.summary = "meetme @ #{event_start.strftime('%I:%M %P')}"
      e.description = subject
      e.location = room.name
    end
    cal.publish


    # room_name = room.name
    event_string = cal.to_ical
    contacts.each do |contact|
      Delayed::Job.enqueue SendInviteJob.new(contact.email, params[:start_date], room.name, event_string, subject)
    end
    #
    # contacts.each do |contact|
    #   MeetmeMailer.event_confirmation(contacts.map{|contact| contact.email}, params[:start_date], room.name, event_string, subject).deliver
    # end

    render json: { success: true }
  end

end


SendInviteJob = Struct.new(:emails, :start_date, :room_name, :calendar, :subject) do
  def perform
    # emails.each { |email| MeetmeMailer.deliver_event_confirmation(email, start_date, room_name, calendar, subject).deliver }
    MeetmeMailer.deliver_event_confirmation(emails, start_date, room_name, calendar, subject).deliver
  end
end
