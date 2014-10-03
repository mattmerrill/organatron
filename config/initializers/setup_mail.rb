ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
  address: "smtp.gmail.com",
  port: 587,
  domain: "meetme.infusionsoft.com",
  user_name: "meetme.infusionsoft",
  password: "infusionsoft",
  authentication: "plain",
  enable_starttls_auto: true
}
