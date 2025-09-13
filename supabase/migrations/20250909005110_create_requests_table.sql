DROP TABLE IF EXISTS relationships CASCADE;
DROP TABLE IF EXISTS relationship_requests CASCADE;
DROP TABLE IF EXISTS event_requests CASCADE;
DROP TABLE IF EXISTS relationship_metadata CASCADE;
DROP TABLE IF EXISTS event_request_approvals CASCADE;

CREATE TABLE IF NOT EXISTS public.relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id_1 UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- requester
    user_id_2 UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- requested
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.relationships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view relationships" ON public.relationships
  FOR SELECT USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

CREATE POLICY "Users can insert relationships" ON public.relationships
  FOR INSERT WITH CHECK (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

CREATE POLICY "Users can update relationships" ON public.relationships
  FOR UPDATE USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

CREATE TABLE IF NOT EXISTS public.relationship_metadata(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    relationship_id UUID NOT NULL REFERENCES relationships(id) ON DELETE CASCADE,
    relationship_type TEXT NOT NULL, -- 'family', 'friend', 'partner', 'colleague'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.relationship_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view relationship metadata" ON public.relationship_metadata
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert relationship metadata" ON public.relationship_metadata
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update relationship metadata" ON public.relationship_metadata
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete relationship metadata" ON public.relationship_metadata
  FOR DELETE USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.relationship_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    requested_email TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.relationship_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view relationship requests" ON public.relationship_requests
  FOR SELECT USING (auth.uid() = requester_id OR auth.email() = requested_email);

CREATE POLICY "Users can insert relationship requests" ON public.relationship_requests
  FOR INSERT WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update relationship requests" ON public.relationship_requests
  FOR UPDATE USING (auth.uid() = requester_id OR auth.email() = requested_email);

CREATE POLICY "Users can delete relationship requests" ON public.relationship_requests
  FOR DELETE USING (auth.uid() = requester_id);

CREATE TABLE IF NOT EXISTS public.event_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    google_event_id UUID, -- the event id from google calendar, if the event is created by google calendar, this is nullable
    location TEXT,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    importance_level INTEGER DEFAULT 1, -- 1 = low, 5 = critical
    -- TODO: Remove the status column, it's not needed, if the user has accepted the event request, then the status is 'accepted'
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    notes TEXT,
    created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.event_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view event requests" ON public.event_requests
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can insert event requests" ON public.event_requests
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update event requests" ON public.event_requests
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete event requests" ON public.event_requests
  FOR DELETE USING (auth.uid() = created_by);

CREATE TABLE IF NOT EXISTS public.event_request_approvals(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_request_id UUID NOT NULL REFERENCES public.event_requests(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    required BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    response_notes TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.event_request_approvals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view event request approvals" ON public.event_request_approvals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert event request approvals" ON public.event_request_approvals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update event request approvals" ON public.event_request_approvals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete event request approvals" ON public.event_request_approvals
  FOR DELETE USING (auth.uid() = user_id);