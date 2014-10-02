class CalendarEvent < ActiveRecord::Base
  has_many :attendees

  has_many :contacts, through: :attendees
  has_many :rooms, through: :attendees
end
