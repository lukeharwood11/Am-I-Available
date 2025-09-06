from supabase import create_client, Client
from .config import config
from sqlalchemy import create_engine, text


# Create Supabase client
def get_supabase_client() -> Client:
    """Get Supabase client instance"""
    return create_client(config.supabase.url, config.supabase.anon_key)


def get_supabase_admin_client() -> Client:
    """Get Supabase admin client instance with service key"""
    return create_client(config.supabase.url, config.supabase.service_role_key)


# Default client instance
supabase: Client = get_supabase_client()
supabase_admin: Client = get_supabase_admin_client()
