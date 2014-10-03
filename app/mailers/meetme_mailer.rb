class MeetmeMailer < ActionMailer::Base
  default from: "meetme.infusionsoft@gmail.com"

  def event_confirmation(contact, start_time, location, icalendar)
    set_content_type()
    # attachments['meetme.vcs'] = {:mime_type => 'text/calendar', :content => icalendar.to_ical }

    @contact = contact
    @start_time = DateTime.parse(start_time)
    @location = location
    #mail to: contact.email, subject: "test", content_type: 'text/calendar', body: icalendar.to_ical

    mail(to: contact.email, subject: 'meet me', mime_version: "1.0", content_type: "text/plain", body: icalendar.to_ical, content_disposition: "attachment; filename='meetme.ics'")

  end
end
