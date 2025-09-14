-- Create functions to get relationship requests with user data
DROP FUNCTION IF EXISTS get_sent_relationship_requests CASCADE;

-- Function to get sent relationship requests with user data
CREATE OR REPLACE FUNCTION get_sent_relationship_requests(
    p_requester_id UUID,
    p_status TEXT DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    requester_id UUID,
    requested_email TEXT,
    status TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    user_id UUID,
    user_email VARCHAR(255),
    user_full_name TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        rr.id,
        rr.requester_id,
        rr.requested_email,
        rr.status,
        rr.created_at,
        rr.updated_at,
        au.id as user_id,
        au.email as user_email,
        COALESCE(au.raw_user_meta_data->>'full_name', '')::TEXT as user_full_name
    FROM public.relationship_requests rr
    JOIN auth.users au ON rr.requester_id = au.id
    WHERE rr.requester_id = p_requester_id
    AND (p_status IS NULL OR rr.status = p_status)
    ORDER BY rr.created_at DESC;
END;
$$;

DROP FUNCTION IF EXISTS get_received_relationship_requests;

-- Function to get received relationship requests with user data
CREATE OR REPLACE FUNCTION get_received_relationship_requests(
    p_requested_email TEXT,
    p_status TEXT DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    requester_id UUID,
    requested_email TEXT,
    status TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    user_id UUID,
    user_email VARCHAR(255),
    user_full_name TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        rr.id,
        rr.requester_id,
        rr.requested_email,
        rr.status,
        rr.created_at,
        rr.updated_at,
        au.id as user_id,
        au.email as user_email,
        COALESCE(au.raw_user_meta_data->>'full_name', '')::TEXT as user_full_name
    FROM public.relationship_requests rr
    JOIN auth.users au ON rr.requester_id = au.id
    WHERE rr.requested_email = p_requested_email
    AND (p_status IS NULL OR rr.status = p_status)
    ORDER BY rr.created_at DESC;
END;
$$;

-- Function to get single relationship request with user data
DROP FUNCTION IF EXISTS get_relationship_request_with_user;

CREATE OR REPLACE FUNCTION get_relationship_request_with_user(
    p_request_id UUID
)
RETURNS TABLE (
    id UUID,
    requester_id UUID,
    requested_email TEXT,
    status TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    user_id UUID,
    user_email VARCHAR(255),
    user_full_name TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        rr.id,
        rr.requester_id,
        rr.requested_email,
        rr.status,
        rr.created_at,
        rr.updated_at,
        au.id as user_id,
        au.email as user_email,
        COALESCE(au.raw_user_meta_data->>'full_name', '')::TEXT as user_full_name
    FROM public.relationship_requests rr
    JOIN auth.users au ON rr.requester_id = au.id
    WHERE rr.id = p_request_id;
END;
$$;

-- Grant access to the functions
GRANT EXECUTE ON FUNCTION get_sent_relationship_requests(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_received_relationship_requests(TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_relationship_request_with_user(UUID) TO authenticated;
