-- Create functions to get relationships with user data and pagination
DROP FUNCTION IF EXISTS get_user_relationships CASCADE;

-- Function to get user relationships with user data and pagination
CREATE OR REPLACE FUNCTION get_user_relationships(
    p_user_id UUID,
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
    total_relationships BIGINT;
BEGIN
    -- Get total count first
    SELECT COUNT(*) INTO total_relationships
    FROM public.relationships r
    WHERE r.user_id_1 = p_user_id OR r.user_id_2 = p_user_id;

    RETURN QUERY
    SELECT 
        r.id,
        r.user_id_1,
        r.user_id_2,
        r.created_at,
        r.updated_at,
        CASE 
            WHEN r.user_id_1 = p_user_id THEN r.user_id_2
            ELSE r.user_id_1
        END as other_user_id,
        au.email as other_user_email,
        COALESCE(au.raw_user_meta_data->>'full_name', '')::TEXT as other_user_full_name,
        total_relationships as total_count
    FROM public.relationships r
    JOIN auth.users au ON (
        CASE 
            WHEN r.user_id_1 = p_user_id THEN r.user_id_2
            ELSE r.user_id_1
        END = au.id
    )
    WHERE r.user_id_1 = p_user_id OR r.user_id_2 = p_user_id
    ORDER BY r.created_at DESC
    LIMIT p_take OFFSET p_skip;
END;
$$;

DROP FUNCTION IF EXISTS get_relationship_by_id_with_user;

-- Function to get single relationship with user data
CREATE OR REPLACE FUNCTION get_relationship_by_id_with_user(
    p_relationship_id UUID,
    p_current_user_id UUID
)
RETURNS TABLE (
    id UUID,
    user_id_1 UUID,
    user_id_2 UUID,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    other_user_id UUID,
    other_user_email VARCHAR(255),
    other_user_full_name TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
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
        COALESCE(au.raw_user_meta_data->>'full_name', '')::TEXT as other_user_full_name
    FROM public.relationships r
    JOIN auth.users au ON (
        CASE 
            WHEN r.user_id_1 = p_current_user_id THEN r.user_id_2
            ELSE r.user_id_1
        END = au.id
    )
    WHERE r.id = p_relationship_id
    AND (r.user_id_1 = p_current_user_id OR r.user_id_2 = p_current_user_id);
END;
$$;

-- Grant access to the functions
GRANT EXECUTE ON FUNCTION get_user_relationships(UUID, INTEGER, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_relationship_by_id_with_user(UUID, UUID) TO authenticated;
