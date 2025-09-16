import { UserData, BaseResponse, BaseListResponse, BaseCreateRequest, BaseUpdateRequest, BaseDeleteResponse } from './common.types';

// Relationship Request Data Types
export interface RelationshipRequestData {
  id: string;
  requester_id: string;
  requested_email: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RelationshipRequestWithUserData {
  id: string;
  requester: UserData;
  requested_email: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Relationship Request Request Types
export interface CreateRelationshipRequestRequest extends BaseCreateRequest {
  requested_email: string;
}

export interface UpdateRelationshipRequestRequest extends BaseUpdateRequest {
  status: 'pending' | 'approved' | 'rejected';
}

// Relationship Request Response Types
export interface RelationshipRequestResponse extends BaseResponse {
  relationship_request: RelationshipRequestData;
}

export interface RelationshipRequestsListResponse extends BaseListResponse<RelationshipRequestData> {
  relationship_requests: RelationshipRequestData[];
}

export interface RelationshipRequestWithUserListResponse extends BaseListResponse<RelationshipRequestWithUserData> {
  relationship_requests: RelationshipRequestWithUserData[];
}

export interface RelationshipRequestDeleteResponse extends BaseDeleteResponse {}

export interface RelationshipRequestCreateResponse extends BaseResponse {
  relationship_request: RelationshipRequestData;
}

export interface RelationshipRequestUpdateResponse extends BaseResponse {
  relationship_request: RelationshipRequestData;
}
