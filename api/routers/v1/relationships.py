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
    RelationshipDeleteResponse,
    RelationshipWithUserResponse,
    RelationshipsWithUsersListResponse,
)


router = APIRouter(prefix="/relationships", tags=["Relationships"])


@router.post("", response_model=RelationshipCreateResponse)
async def create_relationship(
    request: CreateRelationshipRequest,
    user_id: str = Depends(get_current_user_id),
    service: RelationshipsService = Depends(get_relationships_service),
) -> RelationshipCreateResponse:
    """
    Create a new relationship between current user and another user

    Returns:
        Created relationship data
    """
    return await service.create_relationship(
        user_id_1=user_id,
        user_id_2=request.user_id_2,
    )


@router.get("")
async def get_user_relationships(
    skip: int = Query(0, ge=0, description="Number of records to skip for pagination"),
    take: int = Query(10, ge=1, description="Number of records to take (max 100)"),
    user_id: str = Depends(get_current_user_id),
    service: RelationshipsService = Depends(get_relationships_service),
) -> RelationshipsWithUsersListResponse:
    """
    Get relationships for the current user with other user data and pagination

    Returns:
        List of user's relationships with other user information and pagination details
    """
    return await service.get_user_relationships_with_users(
        user_id=user_id,
        skip=skip,
        take=take,
    )


@router.get("/{relationship_id}", response_model=RelationshipResponse)
async def get_relationship(
    relationship_id: str,
    user_id: str = Depends(get_current_user_id),
    service: RelationshipsService = Depends(get_relationships_service),
) -> RelationshipWithUserResponse:
    """
    Get a specific relationship by ID with other user data

    Returns:
        Relationship data with other user information
    """
    return await service.get_relationship_with_user(
        relationship_id=relationship_id, current_user_id=user_id
    )


@router.patch("/{relationship_id}", response_model=RelationshipUpdateResponse)
async def update_relationship(
    relationship_id: str,
    request: UpdateRelationshipRequest,
    user_id: str = Depends(get_current_user_id),
    service: RelationshipsService = Depends(get_relationships_service),
) -> RelationshipUpdateResponse:
    """
    Update a relationship

    Returns:
        Updated relationship data
    """
    return await service.update_relationship(
        relationship_id=relationship_id,
        user_id=user_id,
    )


@router.delete("/{relationship_id}", response_model=RelationshipDeleteResponse)
async def delete_relationship(
    relationship_id: str,
    user_id: str = Depends(get_current_user_id),
    service: RelationshipsService = Depends(get_relationships_service),
) -> RelationshipDeleteResponse:
    """
    Delete a relationship

    Returns:
        Deletion confirmation
    """
    return await service.delete_relationship(
        relationship_id=relationship_id, user_id=user_id
    )
