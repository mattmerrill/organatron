class Attendee < ActiveRecord::Base
  belongs_to :room
  belongs_to :calendar_event
  belongs_to :contact
end
