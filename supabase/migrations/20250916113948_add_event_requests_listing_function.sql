DROP FUNCTION IF EXISTS public.list_event_requests_with_approvals;

-- Function to list event requests with approval status aggregation
CREATE OR REPLACE FUNCTION public.list_event_requests_with_approvals(
    p_user_id UUID DEFAULT NULL,
    p_status TEXT DEFAULT NULL,
    p_skip INTEGER DEFAULT 0,
    p_take INTEGER DEFAULT 50
)
RETURNS TABLE (
    id UUID,
    google_event_id UUID,
    title TEXT,
    location TEXT,
    description TEXT,
    start_date JSONB,
    end_date JSONB,
    importance_level INTEGER,
    status TEXT,
    notes TEXT,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    approval_status TEXT,
    requested_approvals INTEGER,
    completed_count INTEGER,
    total_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_total_count BIGINT;
BEGIN
    -- Get total count for pagination
    SELECT COUNT(*) INTO v_total_count
    FROM public.event_requests er
    WHERE (p_user_id IS NULL OR er.created_by = p_user_id)
      AND (p_status IS NULL OR er.status = p_status);

    -- Return the paginated results with approval aggregation
    RETURN QUERY
    SELECT 
        er.id,
        er.google_event_id,
        er.title,
        er.location,
        er.description,
        er.start_date,
        er.end_date,
        er.importance_level,
        er.status,
        er.notes,
        er.created_by,
        er.created_at,
        er.updated_at,
        -- Calculate approval status based on approval records
        CASE 
            WHEN COUNT(era.id) = 0 THEN 'no_approvals'
            WHEN COUNT(era.id) FILTER (WHERE era.status = 'rejected') > 0 THEN 'rejected'
            WHEN COUNT(era.id) FILTER (WHERE era.status = 'pending') > 0 THEN 'pending'
            WHEN COUNT(era.id) FILTER (WHERE era.status = 'approved') = COUNT(era.id) THEN 'approved'
            ELSE 'pending'
        END as approval_status,
        -- Total number of approval requests
        COUNT(era.id)::INTEGER as requested_approvals,
        -- Number of completed (non-pending) approvals
        COUNT(era.id) FILTER (WHERE era.status != 'pending')::INTEGER as completed_count,
        v_total_count
    FROM public.event_requests er
    LEFT JOIN public.event_request_approvals era ON er.id = era.event_request_id
    WHERE (p_user_id IS NULL OR er.created_by = p_user_id)
      AND (p_status IS NULL OR er.status = p_status)
    GROUP BY er.id, er.google_event_id, er.title, er.location, er.description, 
             er.start_date, er.end_date, er.importance_level, er.status, 
             er.notes, er.created_by, er.created_at, er.updated_at
    ORDER BY er.created_at DESC
    OFFSET p_skip
    LIMIT p_take;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.list_event_requests_with_approvals TO authenticated;
