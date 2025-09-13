from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal


# ============================================================================
# REQUEST MODELS
# ============================================================================

class CreateRelationshipMetadataRequest(BaseModel):
    """Request model for creating relationship metadata"""
    relationship_id: str = Field(description="UUID of the relationship")
    relationship_type: Literal["family", "friend", "partner", "colleague"] = Field(
        description="Type of relationship from this user's perspective"
    )


class UpdateRelationshipMetadataRequest(BaseModel):
    """Request model for updating relationship metadata"""
    metadata_id: str = Field(description="UUID of the relationship metadata to update")
    relationship_type: Literal["family", "friend", "partner", "colleague"] = Field(
        description="Updated relationship type"
    )


class GetRelationshipMetadataRequest(BaseModel):
    """Request model for getting relationship metadata"""
    relationship_id: str | None = Field(None, description="Filter by relationship ID")
    relationship_type: Literal["family", "friend", "partner", "colleague"] | None = Field(
        None, description="Filter by relationship type"
    )


class DeleteRelationshipMetadataRequest(BaseModel):
    """Request model for deleting relationship metadata"""
    metadata_id: str = Field(description="UUID of the relationship metadata to delete")


# ============================================================================
# RESPONSE MODELS
# ============================================================================

class RelationshipMetadataData(BaseModel):
    """Core relationship metadata data model"""
    id: str = Field(description="Relationship metadata UUID")
    user_id: str = Field(description="UUID of the user who owns this metadata")
    relationship_id: str = Field(description="UUID of the relationship")
    relationship_type: str = Field(description="Type of relationship from this user's perspective")
    created_at: datetime = Field(description="When the metadata was created")
    updated_at: datetime = Field(description="When the metadata was last updated")


class RelationshipMetadataResponse(BaseModel):
    """Response model for single relationship metadata operations"""
    status: str = "success"
    relationship_metadata: RelationshipMetadataData
    message: str | None = None


class RelationshipMetadataListResponse(BaseModel):
    """Response model for listing relationship metadata"""
    status: str = "success"
    relationship_metadata: list[RelationshipMetadataData]
    count: int
    filters: dict[str, str] | None = None


class RelationshipMetadataDeleteResponse(BaseModel):
    """Response model for relationship metadata deletion"""
    status: str = "success"
    message: str = "Relationship metadata deleted successfully"


class RelationshipMetadataCreateResponse(BaseModel):
    """Response model for relationship metadata creation"""
    status: str = "success"
    relationship_metadata: RelationshipMetadataData
    message: str = "Relationship metadata created successfully"


class RelationshipMetadataUpdateResponse(BaseModel):
    """Response model for relationship metadata updates"""
    status: str = "success"
    relationship_metadata: RelationshipMetadataData
    message: str = "Relationship metadata updated successfully"
