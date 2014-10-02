class Room < ActiveRecord::Base
  has_many :attendees
  has_many :calendar_events, through: :attendees

  attr_accessor :availabilities
end
