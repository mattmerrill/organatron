# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
seed_file = Rails.root.join('db', 'seeds', 'contacts.yml')
contacts = YAML::load_file(seed_file)
contacts.each do |contact|
  Contact.create!(contact)
end

seed_file = Rails.root.join('db', 'seeds', 'rooms.yml')
rooms = YAML::load_file(seed_file)
rooms.each do |room|
  Room.create!(room)
end

