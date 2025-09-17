resource "openai_project" "amia" {
  name = "AMIA"
}

resource "openai_project_service_account" "amia" {
  project_id = openai_project.amia.id
  name       = "amia-api"
}