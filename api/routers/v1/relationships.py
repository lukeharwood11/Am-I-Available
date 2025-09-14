from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Dict, Any

from ...settings.auth import get_current_user_id, get_current_user
from ...dependencies import get_relationships_service
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


router = APIRouter(prefix="/relationships", tags=["Relationships"])


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
    return await service.create_relationship(
        user_id_1=user_id,
        user_id_2=request.user_id_2,
        relationship_type=request.relationship_type
    )


@router.get("", response_model=RelationshipsListResponse)
async def get_user_relationships(
    user_id: str = Depends(get_current_user_id),
    service: RelationshipsService = Depends(get_relationships_service)
) -> RelationshipsListResponse:
    """
    Get all relationships for the current user with optional filters
    
    Returns:
        List of user's relationships
    """
    return await service.get_user_relationships(
        user_id=user_id,
    )


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
    return await service.get_relationship(relationship_id=relationship_id)


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
    return await service.update_relationship(
        relationship_id=relationship_id,
        user_id=user_id,
        relationship_type=request.relationship_type,
        status=request.status
    )


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
    return await service.delete_relationship(
        relationship_id=relationship_id,
        user_id=user_id
    )


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
    return await service.approve_relationship(
        relationship_id=relationship_id,
        user_id=user_id
    )


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
    return await service.reject_relationship(
        relationship_id=relationship_id,
        user_id=user_id
    )
