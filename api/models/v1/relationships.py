from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal


# ============================================================================
# REQUEST MODELS
# ============================================================================

class CreateRelationshipRequest(BaseModel):
    """Request model for creating a new relationship"""
    user_id_2: str = Field(description="UUID of the user being requested to connect with")
    relationship_type: Literal["family", "friend", "partner", "colleague"] = Field(
        description="Type of relationship"
    )


class UpdateRelationshipRequest(BaseModel):
    """Request model for updating a relationship"""
    relationship_id: str = Field(description="UUID of the relationship to update")
    relationship_type: Literal["family", "friend", "partner", "colleague"] | None = Field(
        None, description="Updated relationship type"
    )
    status: Literal["pending", "approved", "rejected"] | None = Field(
        None, description="Updated relationship status"
    )


class GetRelationshipsRequest(BaseModel):
    """Request model for getting user relationships"""
    status: Literal["pending", "approved", "rejected"] | None = Field(
        None, description="Filter by relationship status"
    )
    relationship_type: Literal["family", "friend", "partner", "colleague"] | None = Field(
        None, description="Filter by relationship type"
    )


class DeleteRelationshipRequest(BaseModel):
    """Request model for deleting a relationship"""
    relationship_id: str = Field(description="UUID of the relationship to delete")


# ============================================================================
# RESPONSE MODELS
# ============================================================================

class RelationshipData(BaseModel):
    """Core relationship data model"""
    id: str = Field(description="Relationship UUID")
    user_id_1: str = Field(description="UUID of the requester")
    user_id_2: str = Field(description="UUID of the requested user")
    relationship_type: str = Field(description="Type of relationship")
    status: str = Field(description="Relationship status")
    created_at: datetime = Field(description="When the relationship was created")
    updated_at: datetime = Field(description="When the relationship was last updated")


class RelationshipResponse(BaseModel):
    """Response model for single relationship operations"""
    status: str = "success"
    relationship: RelationshipData
    message: str | None = None


class RelationshipsListResponse(BaseModel):
    """Response model for listing relationships"""
    status: str = "success"
    relationships: list[RelationshipData]
    count: int
    filters: dict[str, str] | None = None


class RelationshipDeleteResponse(BaseModel):
    """Response model for relationship deletion"""
    status: str = "success"
    message: str = "Relationship deleted successfully"


class RelationshipCreateResponse(BaseModel):
    """Response model for relationship creation"""
    status: str = "success"
    relationship: RelationshipData
    message: str = "Relationship created successfully"


class RelationshipUpdateResponse(BaseModel):
    """Response model for relationship updates"""
    status: str = "success"
    relationship: RelationshipData
    message: str = "Relationship updated successfully"
