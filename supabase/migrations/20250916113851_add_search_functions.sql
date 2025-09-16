DROP FUNCTION IF EXISTS search_relationships_by_query;

-- Function to get single relationship with user data
CREATE OR REPLACE FUNCTION search_relationships_by_query(
    p_query TEXT,
    p_current_user_id UUID,
    p_skip INTEGER DEFAULT 0,
    p_take INTEGER DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    user_id_1 UUID,
    user_id_2 UUID,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    other_user_id UUID,
    other_user_email VARCHAR(255),
    other_user_full_name TEXT,
    total_count BIGINT
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    total_count BIGINT;
BEGIN
    -- Get total count first
    SELECT COUNT(*) INTO total_count
    FROM auth.users au
    JOIN public.relationships r ON (r.user_id_1 = au.id OR r.user_id_2 = au.id)
    WHERE au.email ILIKE '%' || p_query || '%' OR au.raw_user_meta_data->>'full_name' ILIKE '%' || p_query || '%'
    AND (r.user_id_1 = p_current_user_id OR r.user_id_2 = p_current_user_id);

    RETURN QUERY
    SELECT 
        r.id,
        r.user_id_1,
        r.user_id_2,
        r.created_at,
        r.updated_at,
        CASE 
            WHEN r.user_id_1 = p_current_user_id THEN r.user_id_2
            ELSE r.user_id_1
        END as other_user_id,
        au.email as other_user_email,
        COALESCE(au.raw_user_meta_data->>'full_name', '')::TEXT as other_user_full_name,
        total_count as total_count
    FROM auth.users au
    JOIN public.relationships r ON (r.user_id_1 = au.id OR r.user_id_2 = au.id)
    WHERE au.email ILIKE '%' || p_query || '%' OR au.raw_user_meta_data->>'full_name' ILIKE '%' || p_query || '%'
    AND (r.user_id_1 = p_current_user_id OR r.user_id_2 = p_current_user_id)
    ORDER BY r.created_at DESC
    LIMIT p_take OFFSET p_skip;
END;
$$;

GRANT EXECUTE ON FUNCTION search_relationships_by_query(TEXT, UUID, INTEGER, INTEGER) TO authenticated;