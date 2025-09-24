import {
    BaseResponse,
    BaseCreateRequest,
    BaseUpdateRequest,
    BaseDeleteResponse,
    PaginationData,
} from './common.types';

// Event DateTime Types (matching Google API format)
export interface EventDateTime {
    date?: string | null; // Date in YYYY-MM-DD format for all-day events
    date_time?: string | null; // ISO datetime string for timed events
    time_zone?: string | null; // Time zone identifier
}

// Event Request Data Types
export interface EventRequestData {
    id: string;
    google_event_id: string | null;
    title: string | null;
    location: string | null;
    description: string | null;
    start_date: EventDateTime;
    end_date: EventDateTime;
    importance_level: number;
    status: string;
    notes: string | null;
    created_by: string;
    created_at: string;
    updated_at: string;
}

export interface EventRequestWithApprovalsData {
    id: string;
    google_event_id: string | null;
    title: string | null;
    location: string | null;
    description: string | null;
    start_date: EventDateTime;
    end_date: EventDateTime;
    importance_level: number;
    status: string;
    notes: string | null;
    created_by: string;
    created_at: string;
    updated_at: string;
    approval_status: string;
    requested_approvals: number;
    completed_count: number;
    approvers?: Approver[];
}

export interface Approver {
    user_id: string;
    required: boolean;
}

// Event Request Request Types
export interface CreateEventRequestRequest extends BaseCreateRequest {
    title?: string | null;
    google_event_id?: string | null;
    location?: string | null;
    description?: string | null;
    start_date: EventDateTime;
    end_date: EventDateTime;
    importance_level: number;
    notes?: string | null;
    approvers?: Approver[];
}

export interface UpdateEventRequestRequest extends BaseUpdateRequest {
    event_request_id: string;
    google_event_id?: string | null;
    title?: string | null;
    location?: string | null;
    description?: string | null;
    start_date?: EventDateTime | null;
    end_date?: EventDateTime | null;
    importance_level?: number | null;
    status?: 'pending' | 'approved' | 'rejected' | null;
    notes?: string | null;
}

export interface GetEventRequestsRequest {
    status?: 'pending' | 'approved' | 'rejected' | null;
    importance_level?: number;
    start_date_from?: EventDateTime;
    start_date_to?: EventDateTime;
    created_by?: string;
}

export interface ListEventRequestsWithApprovalsRequest {
    status?: 'pending' | 'approved' | 'rejected';
    skip?: number;
    take?: number;
}

export interface SmartParseEventRequestRequest {
    title?: string | null;
    google_event_id?: string | null;
    location?: string | null;
    description?: string | null;
    start_date: EventDateTime;
    end_date: EventDateTime;
    importance_level: number;
    notes?: string | null;
    approvers?: Approver[];
    current_date: string; // ISO datetime string
}

export interface SmartParseEvent {
    title: string | null;
    location: string | null;
    description: string | null;
    start_date: EventDateTime;
    end_date: EventDateTime;
    importance_level: number;
    notes: string | null;
    approvers?: Approver[];
}

export interface SmartParseEventRequestResponse {
    status: string;
    event_request: SmartParseEvent;
    message: string;
}

// Event Request Response Types
export interface EventRequestResponse extends BaseResponse {
    event_request: EventRequestData;
}

export interface EventRequestWithApprovalsResponse extends BaseResponse {
    event_request: EventRequestWithApprovalsData;
}

export interface EventRequestsListResponse extends BaseResponse {
    event_requests: EventRequestData[];
    count: number;
    filters?: Record<string, string | number | EventDateTime>;
}

export interface EventRequestsWithApprovalsListResponse extends BaseResponse {
    event_requests: EventRequestWithApprovalsData[];
    count: number;
    total_count: number;
    skip: number;
    take: number;
    filters?: Record<string, string | number>;
}

export interface EventRequestDeleteResponse extends BaseDeleteResponse {}

export interface EventRequestCreateResponse extends BaseResponse {
    event_request: EventRequestData;
}

export interface EventRequestUpdateResponse extends BaseResponse {
    event_request: EventRequestData;
}

// Event Requests State Types
export interface EventRequestsState {
    eventRequests: EventRequestData[];
    eventRequestsWithApprovals: EventRequestWithApprovalsData[];
    currentEventRequest: EventRequestData | null;
    currentEventRequestWithApprovals: EventRequestWithApprovalsData | null;
    pagination: PaginationData;
    loading: {
        eventRequests: boolean;
        eventRequestsWithApprovals: boolean;
        currentEventRequest: boolean;
        currentEventRequestWithApprovals: boolean;
    };
    error: {
        eventRequests: string | null;
        eventRequestsWithApprovals: string | null;
        currentEventRequest: string | null;
        currentEventRequestWithApprovals: string | null;
        smartParse: string | null;
    };
    smartParse: {
        loading: boolean;
        result: SmartParseEvent | null;
    };
}
