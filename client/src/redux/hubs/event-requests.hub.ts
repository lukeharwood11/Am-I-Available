import { get, post, patch, del } from './auth.hub';
import {
    CreateEventRequestRequest,
    UpdateEventRequestRequest,
    GetEventRequestsRequest,
    ListEventRequestsWithApprovalsRequest,
    EventRequestResponse,
    EventRequestWithApprovalsResponse,
    EventRequestsListResponse,
    EventRequestsWithApprovalsListResponse,
    EventRequestDeleteResponse,
    EventRequestCreateResponse,
    EventRequestUpdateResponse,
    EventDateTime,
} from '../types/event-requests.types';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Serialize EventDateTime to a string for query parameters
 * For now, we'll use the date_time field if available, otherwise the date field
 */
function serializeEventDateTime(dateTime: EventDateTime): string {
    if (dateTime.date_time) {
        return dateTime.date_time;
    }
    if (dateTime.date) {
        return dateTime.date;
    }
    return '';
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Create a new event request
 */
export async function createEventRequest(
    request: CreateEventRequestRequest
): Promise<EventRequestCreateResponse> {
    try {
        const response = await post<EventRequestCreateResponse>(
            '/api/v1/event-requests',
            request
        );
        return response;
    } catch (error) {
        console.error('Error creating event request:', error);
        throw new Error('Failed to create event request');
    }
}

/**
 * Get all event requests for the current user with filters
 */
export async function getEventRequests(
    params?: GetEventRequestsRequest
): Promise<EventRequestsListResponse> {
    try {
        const queryParams = new URLSearchParams();
        if (params?.status) {
            queryParams.append('status', params.status);
        }
        if (params?.importance_level !== undefined) {
            queryParams.append(
                'importance_level',
                params.importance_level?.toString() || ''
            );
        }
        if (params?.start_date_from) {
            queryParams.append(
                'start_date_from',
                serializeEventDateTime(params.start_date_from)
            );
        }
        if (params?.start_date_to) {
            queryParams.append(
                'start_date_to',
                serializeEventDateTime(params.start_date_to)
            );
        }
        if (params?.created_by) {
            queryParams.append('created_by', params.created_by);
        }

        const url = `/api/v1/event-requests${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await get<EventRequestsListResponse>(url);
        return response;
    } catch (error) {
        console.error('Error fetching event requests:', error);
        throw new Error('Failed to fetch event requests');
    }
}

/**
 * Get event requests with approval status and pagination
 */
export async function getEventRequestsWithApprovals(
    params?: ListEventRequestsWithApprovalsRequest
): Promise<EventRequestsWithApprovalsListResponse> {
    try {
        const queryParams = new URLSearchParams();
        if (params?.status) {
            queryParams.append('status', params.status);
        }
        if (params?.skip !== undefined) {
            queryParams.append('skip', params.skip.toString());
        }
        if (params?.take !== undefined) {
            queryParams.append('take', params.take.toString());
        }

        const url = `/api/v1/event-requests/with-approvals${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await get<EventRequestsWithApprovalsListResponse>(url);
        return response;
    } catch (error) {
        console.error('Error fetching event requests with approvals:', error);
        throw new Error('Failed to fetch event requests with approvals');
    }
}

/**
 * Get a specific event request by ID
 */
export async function getEventRequest(
    eventRequestId: string
): Promise<EventRequestResponse> {
    try {
        const response = await get<EventRequestResponse>(
            `/api/v1/event-requests/${eventRequestId}`
        );
        return response;
    } catch (error) {
        console.error('Error fetching event request:', error);
        throw new Error('Failed to fetch event request');
    }
}

/**
 * Get a specific event request with approval status by ID
 */
export async function getEventRequestWithApprovals(
    eventRequestId: string
): Promise<EventRequestWithApprovalsResponse> {
    try {
        const response = await get<EventRequestWithApprovalsResponse>(
            `/api/v1/event-requests/${eventRequestId}/with-approvals`
        );
        return response;
    } catch (error) {
        console.error('Error fetching event request with approvals:', error);
        throw new Error('Failed to fetch event request with approvals');
    }
}

/**
 * Update an event request
 */
export async function updateEventRequest(
    eventRequestId: string,
    request: Omit<UpdateEventRequestRequest, 'event_request_id'>
): Promise<EventRequestUpdateResponse> {
    try {
        const response = await patch<EventRequestUpdateResponse>(
            `/api/v1/event-requests/${eventRequestId}`,
            request
        );
        return response;
    } catch (error) {
        console.error('Error updating event request:', error);
        throw new Error('Failed to update event request');
    }
}

/**
 * Delete an event request
 */
export async function deleteEventRequest(
    eventRequestId: string
): Promise<EventRequestDeleteResponse> {
    try {
        const response = await del<EventRequestDeleteResponse>(
            `/api/v1/event-requests/${eventRequestId}`
        );
        return response;
    } catch (error) {
        console.error('Error deleting event request:', error);
        throw new Error('Failed to delete event request');
    }
}
