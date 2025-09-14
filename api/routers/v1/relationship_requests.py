from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Dict, Any

from ...settings.auth import get_current_user_id, get_current_user
from ...dependencies import get_relationship_requests_service
from ...services.relationship_requests_service import RelationshipRequestsService
from ...models.v1.relationship_requests import (
    CreateRelationshipRequestRequest,
    UpdateRelationshipRequestRequest,
    GetRelationshipRequestsRequest,
    DeleteRelationshipRequestRequest,
    RelationshipRequestResponse,
    RelationshipRequestsListResponse,
    RelationshipRequestCreateResponse,
    RelationshipRequestUpdateResponse,
    RelationshipRequestDeleteResponse,
)


router = APIRouter(prefix="/relationship-requests", tags=["Relationship Requests"])


@router.post("", response_model=RelationshipRequestCreateResponse)
async def create_relationship_request(
    request: CreateRelationshipRequestRequest,
    user: str = Depends(get_current_user),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service),
) -> RelationshipRequestCreateResponse:
    """
    Create a new relationship request by email

    Returns:
        Created relationship request data
    """
    return await service.create_relationship_request(
        requester_id=user["user_id"],
        requester_email=str(user["email"]),
        requested_email=str(request.requested_email),
    )


@router.get("/sent", response_model=RelationshipRequestsListResponse)
async def get_sent_relationship_requests(
    status: str | None = Query(None, description="Filter by request status"),
    user_id: str = Depends(get_current_user_id),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service),
) -> RelationshipRequestsListResponse:
    """
    Get all relationship requests sent by the current user

    Returns:
        List of sent relationship requests
    """
    return await service.get_sent_relationship_requests(
        requester_id=user_id, status=status
    )


@router.get("/received", response_model=RelationshipRequestsListResponse)
async def get_received_relationship_requests(
    status: str | None = Query(None, description="Filter by request status"),
    user_data: Dict[str, Any] = Depends(get_current_user),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service),
) -> RelationshipRequestsListResponse:
    """
    Get all relationship requests received by the current user (by email)

    Returns:
        List of received relationship requests
    """
    user_email = user_data.get("email")
    if not user_email:
        raise HTTPException(status_code=400, detail="User email not found")

    return await service.get_received_relationship_requests(
        user_email=user_email, status=status
    )


@router.get("/{request_id}", response_model=RelationshipRequestResponse)
async def get_relationship_request(
    request_id: str,
    user_id: str = Depends(get_current_user_id),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service),
) -> RelationshipRequestResponse:
    """
    Get a specific relationship request by ID

    Returns:
        Relationship request data
    """
    return await service.get_relationship_request(request_id=request_id)


@router.patch("/{request_id}", response_model=RelationshipRequestUpdateResponse)
async def update_relationship_request(
    request_id: str,
    request: UpdateRelationshipRequestRequest,
    user_data: Dict[str, Any] = Depends(get_current_user),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service),
) -> RelationshipRequestUpdateResponse:
    """
    Update a relationship request status

    Returns:
        Updated relationship request data
    """
    user_id = user_data.get("user_id")
    user_email = user_data.get("email")

    if not user_id or not user_email:
        raise HTTPException(status_code=400, detail="User data not found")

    return await service.update_relationship_request(
        request_id=request_id,
        user_id=user_id,
        user_email=user_email,
        status=request.status,
    )


@router.delete("/{request_id}", response_model=RelationshipRequestDeleteResponse)
async def delete_relationship_request(
    request_id: str,
    user_data: Dict[str, Any] = Depends(get_current_user),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service),
) -> RelationshipRequestDeleteResponse:
    """
    Delete a relationship request

    Returns:
        Deletion confirmation
    """
    user_id = user_data.get("user_id")
    user_email = user_data.get("email")

    if not user_id or not user_email:
        raise HTTPException(status_code=400, detail="User data not found")

    return await service.delete_relationship_request(
        request_id=request_id, user_id=user_id, user_email=user_email
    )


@router.post("/{request_id}/approve", response_model=RelationshipRequestUpdateResponse)
async def approve_relationship_request(
    request_id: str,
    user_data: Dict[str, Any] = Depends(get_current_user),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service),
) -> RelationshipRequestUpdateResponse:
    """
    Approve a pending relationship request

    Returns:
        Updated relationship request data with approved status
    """
    user_id = user_data.get("user_id")
    user_email = user_data.get("email")

    if not user_id or not user_email:
        raise HTTPException(status_code=400, detail="User data not found")

    return await service.approve_relationship_request(
        request_id=request_id, user_id=user_id, user_email=user_email
    )


@router.post("/{request_id}/reject", response_model=RelationshipRequestUpdateResponse)
async def reject_relationship_request(
    request_id: str,
    user_data: Dict[str, Any] = Depends(get_current_user),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service),
) -> RelationshipRequestUpdateResponse:
    """
    Reject a pending relationship request

    Returns:
        Updated relationship request data with rejected status
    """
    user_id = user_data.get("user_id")
    user_email = user_data.get("email")

    if not user_id or not user_email:
        raise HTTPException(status_code=400, detail="User data not found")

    return await service.reject_relationship_request(
        request_id=request_id, user_id=user_id, user_email=user_email
    )
