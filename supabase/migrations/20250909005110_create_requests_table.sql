DROP TABLE IF EXISTS relationships CASCADE;
DROP TABLE IF EXISTS relationship_requests CASCADE;
DROP TABLE IF EXISTS event_request CASCADE;

CREATE TABLE IF NOT EXISTS relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id_1 UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- requester
    user_id_2 UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- requested
    relationship_type TEXT NOT NULL, -- 'family', 'friend', 'partner', 'colleague' (this can be normalized later)
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)

ENABLE ROW LEVEL SECURITY ON relationships;

CREATE POLICY "Users can view relationships" ON relationships
  FOR SELECT USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

CREATE POLICY "Users can insert relationships" ON relationships
  FOR INSERT WITH CHECK (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

CREATE POLICY "Users can update relationships" ON relationships
  FOR UPDATE USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

CREATE TABLE IF NOT EXISTS relationship_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    requested_email TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)

ENABLE ROW LEVEL SECURITY ON relationship_requests;

CREATE POLICY "Users can view relationship requests" ON relationship_requests
  FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = requested_email);

CREATE POLICY "Users can insert relationship requests" ON relationship_requests
  FOR INSERT WITH CHECK (auth.uid() = requester_id OR auth.uid() = requested_email);

CREATE POLICY "Users can update relationship requests" ON relationship_requests
  FOR UPDATE USING (auth.uid() = requester_id OR auth.uid() = requested_email);

CREATE POLICY "Users can delete relationship requests" ON relationship_requests
  FOR DELETE USING (auth.uid() = requester_id OR auth.uid() = requested_email);

CREATE TABLE IF NOT EXISTS event_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    google_event_id UUID, -- the event id from google calendar, if the event is created by google calendar
    location TEXT,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    importance_level INTEGER DEFAULT 1, -- 1 = low, 5 = critical
    -- TODO: Remove the status column, it's not needed, if the user has accepted the event request, then the status is 'accepted'
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    notes TEXT,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)

ENABLE ROW LEVEL SECURITY ON event_requests;

CREATE POLICY "Users can view event requests" ON event_requests
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can insert event requests" ON event_requests
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update event requests" ON event_requests
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete event requests" ON event_requests
  FOR DELETE USING (auth.uid() = created_by);

CREATE TABLE IF NOT EXISTS event_request_users(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_request_id UUID NOT NULL REFERENCES event_requests(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    required BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)