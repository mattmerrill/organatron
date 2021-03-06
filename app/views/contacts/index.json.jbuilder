json.array!(@contacts) do |contact|
  json.extract! contact, :id, :job_title, :display_name, :email
  json.url contact_url(contact, format: :json)
end
