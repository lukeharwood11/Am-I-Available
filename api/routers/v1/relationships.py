from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Dict, Any
import logging

from ...settings.auth import get_current_user_id, get_current_user
from ...services.relationships_service import RelationshipsService
from ...models.v1.relationships import (
    CreateRelationshipRequest,
    UpdateRelationshipRequest,
    GetRelationshipsRequest,
    DeleteRelationshipRequest,
    RelationshipResponse,
    RelationshipsListResponse,
    RelationshipCreateResponse,
    RelationshipUpdateResponse,
    RelationshipDeleteResponse
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/relationships", tags=["Relationships"])


def get_relationships_service() -> RelationshipsService:
    """Dependency to get relationships service instance"""
    return RelationshipsService()


@router.post("", response_model=RelationshipCreateResponse)
async def create_relationship(
    request: CreateRelationshipRequest,
    user_id: str = Depends(get_current_user_id),
    service: RelationshipsService = Depends(get_relationships_service)
) -> RelationshipCreateResponse:
    """
    Create a new relationship between current user and another user
    
    Returns:
        Created relationship data
    """
    try:
        return await service.create_relationship(
            user_id_1=user_id,
            user_id_2=request.user_id_2,
            relationship_type=request.relationship_type
        )
    except Exception as e:
        logger.error(f"Error creating relationship: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("", response_model=RelationshipsListResponse)
async def get_user_relationships(
    status: str | None = Query(None, description="Filter by relationship status"),
    relationship_type: str | None = Query(None, description="Filter by relationship type"),
    user_id: str = Depends(get_current_user_id),
    service: RelationshipsService = Depends(get_relationships_service)
) -> RelationshipsListResponse:
    """
    Get all relationships for the current user with optional filters
    
    Returns:
        List of user's relationships
    """
    try:
        return await service.get_user_relationships(
            user_id=user_id,
            status=status,
            relationship_type=relationship_type
        )
    except Exception as e:
        logger.error(f"Error fetching user relationships: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/{relationship_id}", response_model=RelationshipResponse)
async def get_relationship(
    relationship_id: str,
    user_id: str = Depends(get_current_user_id),
    service: RelationshipsService = Depends(get_relationships_service)
) -> RelationshipResponse:
    """
    Get a specific relationship by ID
    
    Returns:
        Relationship data
    """
    try:
        return await service.get_relationship(relationship_id=relationship_id)
    except Exception as e:
        logger.error(f"Error fetching relationship: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.patch("/{relationship_id}", response_model=RelationshipUpdateResponse)
async def update_relationship(
    relationship_id: str,
    request: UpdateRelationshipRequest,
    user_id: str = Depends(get_current_user_id),
    service: RelationshipsService = Depends(get_relationships_service)
) -> RelationshipUpdateResponse:
    """
    Update a relationship (type or status)
    
    Returns:
        Updated relationship data
    """
    try:
        return await service.update_relationship(
            relationship_id=relationship_id,
            user_id=user_id,
            relationship_type=request.relationship_type,
            status=request.status
        )
    except Exception as e:
        logger.error(f"Error updating relationship: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.delete("/{relationship_id}", response_model=RelationshipDeleteResponse)
async def delete_relationship(
    relationship_id: str,
    user_id: str = Depends(get_current_user_id),
    service: RelationshipsService = Depends(get_relationships_service)
) -> RelationshipDeleteResponse:
    """
    Delete a relationship
    
    Returns:
        Deletion confirmation
    """
    try:
        return await service.delete_relationship(
            relationship_id=relationship_id,
            user_id=user_id
        )
    except Exception as e:
        logger.error(f"Error deleting relationship: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/{relationship_id}/approve", response_model=RelationshipUpdateResponse)
async def approve_relationship(
    relationship_id: str,
    user_id: str = Depends(get_current_user_id),
    service: RelationshipsService = Depends(get_relationships_service)
) -> RelationshipUpdateResponse:
    """
    Approve a pending relationship request
    
    Returns:
        Updated relationship data with approved status
    """
    try:
        return await service.approve_relationship(
            relationship_id=relationship_id,
            user_id=user_id
        )
    except Exception as e:
        logger.error(f"Error approving relationship: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/{relationship_id}/reject", response_model=RelationshipUpdateResponse)
async def reject_relationship(
    relationship_id: str,
    user_id: str = Depends(get_current_user_id),
    service: RelationshipsService = Depends(get_relationships_service)
) -> RelationshipUpdateResponse:
    """
    Reject a pending relationship request
    
    Returns:
        Updated relationship data with rejected status
    """
    try:
        return await service.reject_relationship(
            relationship_id=relationship_id,
            user_id=user_id
        )
    except Exception as e:
        logger.error(f"Error rejecting relationship: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
