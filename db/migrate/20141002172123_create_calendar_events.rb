class CreateCalendarEvents < ActiveRecord::Migration
  def change
    create_table :calendar_events do |t|
      t.datetime :start_date
      t.datetime :end_date

      t.timestamps
    end
  end
end
