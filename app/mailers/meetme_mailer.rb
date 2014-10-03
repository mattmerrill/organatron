require 'mail'

class MeetmeMailer < ActionMailer::Base
  default from: "meetme.infusionsoft@gmail.com"

  def event_confirmation(contact, start_time, location, icalendar, subject)
    #attachments['meetme.ics'] = {:mime_type => 'text/calendar', :content => icalendar.to_ical }

    #@contact = contact
    #@start_time = DateTime.parse(start_time)
    #@location = location
    #@description = subject
    #mail to: contact.email, subject: subject


    mail = Mail.new do
      to      contact.email
      from    'meetme.infusionsoft@gmail.com'
      subject subject
    end

      html_part = Mail::Part.new do
        content_type "text/html; charset='utf-8'"
        body 'check your email'
      end

      calendar_part = Mail::Part.new do
        content_type "text/calendar; charset='utf-8'; method=REQUEST"
        content_transfer_encoding "base64"
        body Base64.encode64(icalendar.to_ical)
      end

      mail.html_part = html_part
    mail.text_part = calendar_part

    Rails.logger.info(mail.text_part.attachment?)

mail.deliver!

  end
end
