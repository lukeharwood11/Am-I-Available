import { get, post, patch, del } from './auth.hub';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface RelationshipRequestData {
  id: string;
  requester_id: string;
  requested_email: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateRelationshipRequestRequest {
  requested_email: string;
}

export interface UpdateRelationshipRequestRequest {
  status: 'pending' | 'approved' | 'rejected';
}

export interface RelationshipRequestResponse {
  status: string;
  relationship_request: RelationshipRequestData;
  message?: string;
}

export interface RelationshipRequestsListResponse {
  status: string;
  relationship_requests: RelationshipRequestData[];
  count: number;
  filters?: Record<string, string>;
}

export interface UserData {
  id: string;
  full_name: string;
  email: string;
}

export interface RelationshipRequestWithUserData {
  id: string;
  requester: UserData;
  requested_email: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RelationshipRequestWithUserListResponse {
  status: string;
  relationship_requests: RelationshipRequestWithUserData[];
  count: number;
  filters?: Record<string, string>;
}

export interface RelationshipRequestDeleteResponse {
  status: string;
  message: string;
}

export interface RelationshipRequestCreateResponse {
  status: string;
  relationship_request: RelationshipRequestData;
  message: string;
}

export interface RelationshipRequestUpdateResponse {
  status: string;
  relationship_request: RelationshipRequestData;
  message: string;
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Create a new relationship request by email
 */
export async function createRelationshipRequest(
  request: CreateRelationshipRequestRequest
): Promise<RelationshipRequestCreateResponse> {
  try {
    const response = await post<RelationshipRequestCreateResponse>(
      '/api/v1/relationship-requests',
      request
    );
    return response;
  } catch (error) {
    console.error('Error creating relationship request:', error);
    throw new Error('Failed to create relationship request');
  }
}

/**
 * Get all relationship requests sent by the current user
 */
export async function getSentRelationshipRequests(
  status?: string
): Promise<RelationshipRequestsListResponse> {
  try {
    const params = status ? { status } : undefined;
    const response = await get<RelationshipRequestsListResponse>(
      '/api/v1/relationship-requests/sent',
      { params }
    );
    return response;
  } catch (error) {
    console.error('Error fetching sent relationship requests:', error);
    throw new Error('Failed to fetch sent relationship requests');
  }
}

/**
 * Get all relationship requests received by the current user (by email)
 */
export async function getReceivedRelationshipRequests(
  status?: string
): Promise<RelationshipRequestWithUserListResponse> {
  try {
    const params = status ? { status } : undefined;
    const response = await get<RelationshipRequestWithUserListResponse>(
      '/api/v1/relationship-requests/received',
      { params }
    );
    return response;
  } catch (error) {
    console.error('Error fetching received relationship requests:', error);
    throw new Error('Failed to fetch received relationship requests');
  }
}

/**
 * Get a specific relationship request by ID
 */
export async function getRelationshipRequest(
  requestId: string
): Promise<RelationshipRequestResponse> {
  try {
    const response = await get<RelationshipRequestResponse>(
      `/api/v1/relationship-requests/${requestId}`
    );
    return response;
  } catch (error) {
    console.error('Error fetching relationship request:', error);
    throw new Error('Failed to fetch relationship request');
  }
}

/**
 * Update a relationship request status
 */
export async function updateRelationshipRequest(
  requestId: string,
  request: UpdateRelationshipRequestRequest
): Promise<RelationshipRequestUpdateResponse> {
  try {
    const response = await patch<RelationshipRequestUpdateResponse>(
      `/api/v1/relationship-requests/${requestId}`,
      request
    );
    return response;
  } catch (error) {
    console.error('Error updating relationship request:', error);
    throw new Error('Failed to update relationship request');
  }
}

/**
 * Delete a relationship request
 */
export async function deleteRelationshipRequest(
  requestId: string
): Promise<RelationshipRequestDeleteResponse> {
  try {
    const response = await del<RelationshipRequestDeleteResponse>(
      `/api/v1/relationship-requests/${requestId}`
    );
    return response;
  } catch (error) {
    console.error('Error deleting relationship request:', error);
    throw new Error('Failed to delete relationship request');
  }
}

/**
 * Approve a pending relationship request
 */
export async function approveRelationshipRequest(
  requestId: string
): Promise<RelationshipRequestUpdateResponse> {
  try {
    const response = await post<RelationshipRequestUpdateResponse>(
      `/api/v1/relationship-requests/${requestId}/approve`
    );
    return response;
  } catch (error) {
    console.error('Error approving relationship request:', error);
    throw new Error('Failed to approve relationship request');
  }
}

/**
 * Reject a pending relationship request
 */
export async function rejectRelationshipRequest(
  requestId: string
): Promise<RelationshipRequestUpdateResponse> {
  try {
    const response = await post<RelationshipRequestUpdateResponse>(
      `/api/v1/relationship-requests/${requestId}/reject`
    );
    return response;
  } catch (error) {
    console.error('Error rejecting relationship request:', error);
    throw new Error('Failed to reject relationship request');
  }
}
