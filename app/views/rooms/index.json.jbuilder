json.array!(@rooms) do |room|
  json.extract! room, :id, :name, :floor, :whiteboard, :monitor, :capacity, :building, :ea_only, :ethernet
  json.url room_url(room, format: :json)
end
