locals {
  tags = {
    "AppName"     = "Am I Available"
    "AppWebsite"  = "amiavailable.com"
    "Environment" = "Production"
    "Owner"       = "Luke Harwood"
  }

  domain_name     = "amiavailable.com"
  api_domain_name = "api.amiavailable.com"
  region          = "us-east-2"
  account_id      = "891612573605"
}