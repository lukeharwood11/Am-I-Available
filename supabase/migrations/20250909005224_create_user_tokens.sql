-- Example: Create a table for storing user tokens
DROP TABLE IF EXISTS public.user_tokens;
CREATE TABLE public.user_tokens (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  google_access_token text,
  google_refresh_token text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Enable RLS
ALTER TABLE public.user_tokens ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own tokens" ON public.user_tokens;
DROP POLICY IF EXISTS "Users can insert own tokens" ON public.user_tokens;
DROP POLICY IF EXISTS "Users can update own tokens" ON public.user_tokens;

-- Create new policies that work better with upsert
CREATE POLICY "Users can view own tokens" ON public.user_tokens
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own tokens" ON public.user_tokens
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own tokens" ON public.user_tokens
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Also create a policy for DELETE if needed
CREATE POLICY "Users can delete own tokens" ON public.user_tokens
  FOR DELETE USING (auth.uid() = id);