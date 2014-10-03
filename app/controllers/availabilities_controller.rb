class AvailabilitiesController < ApplicationController


  # GET availabilities
  def index
    duration = params[:duration]
    people_ids = params[:people_ids]
    day = params[:day]

    @availabilities = fake_data(duration, people_ids)
  end


  private
  def fake_data(duration, attendees)
    fake_rooms = {
      '30' => [
        Room.find_by_name('Count Chocula'),
        Room.find_by_name('Fruity Pebbles'),
        Room.find_by_name('Fruit Loops'),
        Room.find_by_name('Frosted Flakes')
      ],
      '60' => [
        Room.find_by_name('Pops'),
        Room.find_by_name('Trix'),
        Room.find_by_name('Honey Comb'),
        Room.find_by_name('Raisin Bran'),
        Room.find_by_name('Fruit Loops'),
      ],
      '180' => [
        Room.find_by_name('Breakout'),
        Room.find_by_name('Wheaties')
      ]
    }

    fake_rooms[duration].each do |room|
      room.availabilities = random_times(Random.rand(1..3))
    end
    fake_rooms[duration]
  end

  def random_times(num)
    ['9:00a', '11:30a', '12:15p', '1:00p', '1:45p', '2:00p'].sample(num)
  end

end
