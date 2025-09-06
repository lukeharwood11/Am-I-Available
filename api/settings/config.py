# configure environment variables to be parsed into an AppConfig
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class GoogleConfig(BaseSettings):
    model_config = SettingsConfigDict(extra="allow")
    
    client_id: str = Field(default="")
    client_secret: str = Field(default="")
    scopes: str = "email profile openid https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/calendar"

class OpenAIConfig(BaseSettings):
    model_config = SettingsConfigDict(extra="allow")
    
    api_key: str = Field(default="")

class SupabaseConfig(BaseSettings):
    model_config = SettingsConfigDict(extra="allow")
    
    url: str = Field(default="")
    anon_key: str = Field(default="")
    service_role_key: str = Field(default="")

class DatabaseConfig(BaseSettings):
    model_config = SettingsConfigDict(extra="allow")
    
    username: str = Field(default="")
    password: str = Field(default="")


class AppConfig(BaseSettings):
    model_config = SettingsConfigDict(env_nested_delimiter="__", extra="allow")

    # API Keys
    openai: OpenAIConfig = Field(default_factory=OpenAIConfig)

    # Auth Configuration
    supabase: SupabaseConfig = Field(default_factory=SupabaseConfig)
    google: GoogleConfig = Field(default_factory=GoogleConfig)
    database: DatabaseConfig = Field(default_factory=DatabaseConfig)


config = AppConfig()