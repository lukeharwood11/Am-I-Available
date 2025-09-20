import { get, post, patch, del } from './auth.hub';
import {
    CreateRelationshipRequest,
    UpdateRelationshipRequest,
    RelationshipWithUserResponse,
    RelationshipsWithUsersListResponse,
    RelationshipDeleteResponse,
    RelationshipCreateResponse,
    RelationshipUpdateResponse,
} from '../types/relationships.types';
import { PaginationParams } from '../types/common.types';

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Create a new relationship between current user and another user
 */
export async function createRelationship(
    request: CreateRelationshipRequest
): Promise<RelationshipCreateResponse> {
    try {
        const response = await post<RelationshipCreateResponse>(
            '/api/v1/relationships',
            request
        );
        return response;
    } catch (error) {
        console.error('Error creating relationship:', error);
        throw new Error('Failed to create relationship');
    }
}

/**
 * Get all relationships for the current user with pagination and user data
 */
export async function getUserRelationships(
    params?: PaginationParams
): Promise<RelationshipsWithUsersListResponse> {
    try {
        const queryParams = new URLSearchParams();
        if (params?.skip !== undefined) {
            queryParams.append('skip', params.skip.toString());
        }
        if (params?.take !== undefined) {
            queryParams.append('take', params.take.toString());
        }

        const url = `/api/v1/relationships${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await get<RelationshipsWithUsersListResponse>(url);
        return response;
    } catch (error) {
        console.error('Error fetching user relationships:', error);
        throw new Error('Failed to fetch user relationships');
    }
}

/**
 * Get a specific relationship by ID with user data
 */
export async function getRelationship(
    relationshipId: string
): Promise<RelationshipWithUserResponse> {
    try {
        const response = await get<RelationshipWithUserResponse>(
            `/api/v1/relationships/${relationshipId}`
        );
        return response;
    } catch (error) {
        console.error('Error fetching relationship:', error);
        throw new Error('Failed to fetch relationship');
    }
}

/**
 * Update a relationship (type or status)
 */
export async function updateRelationship(
    relationshipId: string,
    request: UpdateRelationshipRequest
): Promise<RelationshipUpdateResponse> {
    try {
        const response = await patch<RelationshipUpdateResponse>(
            `/api/v1/relationships/${relationshipId}`,
            request
        );
        return response;
    } catch (error) {
        console.error('Error updating relationship:', error);
        throw new Error('Failed to update relationship');
    }
}

/**
 * Delete a relationship
 */
export async function deleteRelationship(
    relationshipId: string
): Promise<RelationshipDeleteResponse> {
    try {
        const response = await del<RelationshipDeleteResponse>(
            `/api/v1/relationships/${relationshipId}`
        );
        return response;
    } catch (error) {
        console.error('Error deleting relationship:', error);
        throw new Error('Failed to delete relationship');
    }
}
