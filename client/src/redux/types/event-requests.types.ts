import { BaseResponse, BaseListResponse, BasePaginatedListResponse, BaseCreateRequest, BaseUpdateRequest, BaseDeleteResponse, PaginationData } from './common.types';

// Event Request Data Types
export interface EventRequestData {
  id: string;
  google_event_id: string | null;
  title: string | null;
  location: string | null;
  description: string | null;
  start_date: string;
  end_date: string;
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
  start_date: string;
  end_date: string;
  importance_level: number;
  status: string;
  notes: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  approval_status: string;
  requested_approvals: number;
  completed_count: number;
}

// Event Request Request Types
export interface CreateEventRequestRequest extends BaseCreateRequest {
  google_event_id?: string | null;
  title?: string | null;
  location?: string | null;
  description?: string | null;
  start_date: string;
  end_date: string;
  importance_level: number;
  notes?: string | null;
}

export interface UpdateEventRequestRequest extends BaseUpdateRequest {
  event_request_id: string;
  google_event_id?: string | null;
  title?: string | null;
  location?: string | null;
  description?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  importance_level?: number | null;
  status?: 'pending' | 'approved' | 'rejected' | null;
  notes?: string | null;
}

export interface GetEventRequestsRequest {
  status?: 'pending' | 'approved' | 'rejected' | null;
  importance_level?: number;
  start_date_from?: string;
  start_date_to?: string;
  created_by?: string;
}

export interface ListEventRequestsWithApprovalsRequest {
  status?: 'pending' | 'approved' | 'rejected';
  skip?: number;
  take?: number;
}

// Event Request Response Types
export interface EventRequestResponse extends BaseResponse {
  event_request: EventRequestData;
}

export interface EventRequestWithApprovalsResponse extends BaseResponse {
  event_request: EventRequestWithApprovalsData;
}

export interface EventRequestsListResponse extends BaseListResponse<EventRequestData> {
  event_requests: EventRequestData[];
  filters?: Record<string, string | number | string>;
}

export interface EventRequestsWithApprovalsListResponse extends BasePaginatedListResponse<EventRequestWithApprovalsData> {
  event_requests: EventRequestWithApprovalsData[];
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
  loading: boolean;
  error: string | null;
}
