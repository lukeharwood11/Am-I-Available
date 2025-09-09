from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Literal


# ============================================================================
# REQUEST MODELS
# ============================================================================

class CreateRelationshipRequestRequest(BaseModel):
    """Request model for creating a new relationship request via email"""
    requested_email: EmailStr = Field(description="Email of the person being invited")


class UpdateRelationshipRequestRequest(BaseModel):
    """Request model for updating a relationship request"""
    request_id: str = Field(description="UUID of the relationship request to update")
    status: Literal["pending", "approved", "rejected"] = Field(
        description="Updated request status"
    )


class GetRelationshipRequestsRequest(BaseModel):
    """Request model for getting relationship requests"""
    status: Literal["pending", "approved", "rejected"] | None = Field(
        None, description="Filter by request status"
    )
    request_type: Literal["sent", "received"] | None = Field(
        None, description="Filter by sent or received requests"
    )


class DeleteRelationshipRequestRequest(BaseModel):
    """Request model for deleting/canceling a relationship request"""
    request_id: str = Field(description="UUID of the relationship request to delete")


# ============================================================================
# RESPONSE MODELS
# ============================================================================

class RelationshipRequestData(BaseModel):
    """Core relationship request data model"""
    id: str = Field(description="Relationship request UUID")
    requester_id: str = Field(description="UUID of the user who sent the request")
    requested_email: str = Field(description="Email of the person being invited")
    status: str = Field(description="Request status")
    created_at: datetime = Field(description="When the request was created")
    updated_at: datetime = Field(description="When the request was last updated")


class RelationshipRequestResponse(BaseModel):
    """Response model for single relationship request operations"""
    status: str = "success"
    relationship_request: RelationshipRequestData
    message: str | None = None


class RelationshipRequestsListResponse(BaseModel):
    """Response model for listing relationship requests"""
    status: str = "success"
    relationship_requests: list[RelationshipRequestData]
    count: int
    filters: dict[str, str] | None = None


class RelationshipRequestDeleteResponse(BaseModel):
    """Response model for relationship request deletion"""
    status: str = "success"
    message: str = "Relationship request deleted successfully"


class RelationshipRequestCreateResponse(BaseModel):
    """Response model for relationship request creation"""
    status: str = "success"
    relationship_request: RelationshipRequestData
    message: str = "Relationship request sent successfully"


class RelationshipRequestUpdateResponse(BaseModel):
    """Response model for relationship request updates"""
    status: str = "success"
    relationship_request: RelationshipRequestData
    message: str = "Relationship request updated successfully"
