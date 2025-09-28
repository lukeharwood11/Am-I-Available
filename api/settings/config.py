# configure environment variables to be parsed into an AppConfig
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field
from .secrets import secrets_manager


class GoogleConfig(BaseSettings):
    model_config = SettingsConfigDict(extra="allow")

    client_id: str = Field(default="")
    client_secret: str = Field(default="")
    scopes: str = (
        "email profile openid https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/calendar"
    )

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Use secrets manager for sensitive Google credentials
        self.client_secret = secrets_manager.get_secret(
            name="GOOGLE__CLIENT_SECRET", default=self.client_secret
        )


class OpenAIConfig(BaseSettings):
    model_config = SettingsConfigDict(extra="allow")

    api_key: str = Field(default="")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Use secrets manager for OpenAI API key
        self.api_key = secrets_manager.get_secret(
            name="OPENAI__API_KEY", default=self.api_key
        )


class SupabaseConfig(BaseSettings):
    model_config = SettingsConfigDict(extra="allow")

    url: str = Field(default="")
    anon_key: str = Field(default="")
    service_role_key: str = Field(default="")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Use secrets manager for sensitive Supabase keys
        self.anon_key = secrets_manager.get_secret(
            name="SUPABASE__ANON_KEY", default=self.anon_key
        )
        self.service_role_key = secrets_manager.get_secret(
            name="SUPABASE__SERVICE_ROLE_KEY", default=self.service_role_key
        )


class DatabaseConfig(BaseSettings):
    model_config = SettingsConfigDict(extra="allow")

    username: str = Field(default="")
    password: str = Field(default="")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Use secrets manager for database credentials
        self.username = secrets_manager.get_secret(
            name="DATABASE__USERNAME", default=self.username
        )
        self.password = secrets_manager.get_secret(
            name="DATABASE__PASSWORD", default=self.password
        )


class AppConfig(BaseSettings):
    model_config = SettingsConfigDict(env_nested_delimiter="__", extra="allow")

    # API Keys
    openai: OpenAIConfig = Field(default_factory=OpenAIConfig)

    # Auth Configuration
    supabase: SupabaseConfig = Field(default_factory=SupabaseConfig)
    google: GoogleConfig = Field(default_factory=GoogleConfig)
    database: DatabaseConfig = Field(default_factory=DatabaseConfig)
    environment: str = Field(default="local")  # local, prod


config = AppConfig()
