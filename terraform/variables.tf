variable "api_image_uri" {
  type        = string
  description = "The URI of the API image"
}

variable "admin_openai_api_key" {
  type        = string
  description = "The OpenAI API key for the admin user"
}

variable "google_client_id" {
  type        = string
  description = "The Google client ID"
}

variable "google_client_secret" {
  type        = string
  description = "The Google client secret"
}

variable "supabase_anon_key" {
  type        = string
  description = "The Supabase anon key"
}

variable "supabase_url" {
  type        = string
  description = "The Supabase URL"
}

variable "supabase_service_role_key" {
  type        = string
  description = "The Supabase service role key"
}

variable "database_username" {  
  type        = string
  description = "The database username"
}

variable "database_password" {
  type        = string
  description = "The database password"
}