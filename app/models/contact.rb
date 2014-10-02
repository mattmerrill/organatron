class Contact < ActiveRecord::Base
  has_many :attendees

  has_many :calendar_events, through: :attendees
end
