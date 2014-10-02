class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :job_title
      t.string :display_name
      t.string :email

      t.timestamps
    end
  end
end
