class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :room_number
      t.string :name
      t.integer :floor
      t.boolean :whiteboard
      t.boolean :monitor
      t.integer :capacity
      t.string :building
      t.boolean :ea_only
      t.boolean :ethernet

      t.timestamps
    end
  end
end
