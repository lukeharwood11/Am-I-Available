from supabase import create_client, Client
from .config import config
from sqlalchemy import create_engine, text

# Default client instance
supabase: Client = create_client(config.supabase.url, config.supabase.anon_key)
supabase_admin: Client = create_client(config.supabase.url, config.supabase.service_role_key)

def get_supabase_client() -> Client:
    return supabase

def get_supabase_admin_client() -> Client:
    return supabase_admin
