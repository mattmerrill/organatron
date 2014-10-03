
Mail.defaults do
  delivery_method :smtp,
    address: "smtp.gmail.com",
    port: 587,
    domain: "meetme.infusionsoft.com",
    user_name: "meetme.infusionsoft",
    password: "infusionsoft",
    authentication: "plain",
    enable_starttls_auto: true
end
