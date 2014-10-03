class MeetmeMailer < ActionMailer::Base
  default from: "meetme.infusionsoft@gmail.com"

  def event_confirmation(contact, start_time, location, icalendar, description)
    attachments['meetme.ics'] = {:mime_type => 'text/calendar', :content => icalendar.to_ical }

    @contact = contact
    @start_time = DateTime.parse(start_time)
    @location = location
    @description = description
    mail to: contact.email, subject: "test"

  end
end