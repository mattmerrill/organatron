class CreateAttendeeTable < ActiveRecord::Migration
  def change
    create_table :attendees do |t|
      t.integer :room_id
      t.integer :contact_id
      t.integer :calendar_event_id
    end
  end
end
