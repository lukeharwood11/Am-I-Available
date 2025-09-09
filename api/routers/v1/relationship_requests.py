from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Dict, Any
import logging

from ...settings.auth import get_current_user_id, get_current_user
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
    RelationshipRequestDeleteResponse
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/relationship-requests", tags=["Relationship Requests"])


def get_relationship_requests_service() -> RelationshipRequestsService:
    """Dependency to get relationship requests service instance"""
    return RelationshipRequestsService()


@router.post("", response_model=RelationshipRequestCreateResponse)
async def create_relationship_request(
    request: CreateRelationshipRequestRequest,
    user_id: str = Depends(get_current_user_id),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service)
) -> RelationshipRequestCreateResponse:
    """
    Create a new relationship request by email
    
    Returns:
        Created relationship request data
    """
    try:
        return await service.create_relationship_request(
            requester_id=user_id,
            requested_email=str(request.requested_email)
        )
    except Exception as e:
        logger.error(f"Error creating relationship request: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/sent", response_model=RelationshipRequestsListResponse)
async def get_sent_relationship_requests(
    status: str | None = Query(None, description="Filter by request status"),
    user_id: str = Depends(get_current_user_id),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service)
) -> RelationshipRequestsListResponse:
    """
    Get all relationship requests sent by the current user
    
    Returns:
        List of sent relationship requests
    """
    try:
        return await service.get_sent_relationship_requests(
            requester_id=user_id,
            status=status
        )
    except Exception as e:
        logger.error(f"Error fetching sent relationship requests: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/received", response_model=RelationshipRequestsListResponse)
async def get_received_relationship_requests(
    status: str | None = Query(None, description="Filter by request status"),
    user_data: Dict[str, Any] = Depends(get_current_user),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service)
) -> RelationshipRequestsListResponse:
    """
    Get all relationship requests received by the current user (by email)
    
    Returns:
        List of received relationship requests
    """
    try:
        user_email = user_data.get("email")
        if not user_email:
            raise HTTPException(status_code=400, detail="User email not found")
        
        return await service.get_received_relationship_requests(
            user_email=user_email,
            status=status
        )
    except Exception as e:
        logger.error(f"Error fetching received relationship requests: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/{request_id}", response_model=RelationshipRequestResponse)
async def get_relationship_request(
    request_id: str,
    user_id: str = Depends(get_current_user_id),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service)
) -> RelationshipRequestResponse:
    """
    Get a specific relationship request by ID
    
    Returns:
        Relationship request data
    """
    try:
        return await service.get_relationship_request(request_id=request_id)
    except Exception as e:
        logger.error(f"Error fetching relationship request: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.patch("/{request_id}", response_model=RelationshipRequestUpdateResponse)
async def update_relationship_request(
    request_id: str,
    request: UpdateRelationshipRequestRequest,
    user_data: Dict[str, Any] = Depends(get_current_user),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service)
) -> RelationshipRequestUpdateResponse:
    """
    Update a relationship request status
    
    Returns:
        Updated relationship request data
    """
    try:
        user_id = user_data.get("user_id")
        user_email = user_data.get("email")
        
        if not user_id or not user_email:
            raise HTTPException(status_code=400, detail="User data not found")
        
        return await service.update_relationship_request(
            request_id=request_id,
            user_id=user_id,
            user_email=user_email,
            status=request.status
        )
    except Exception as e:
        logger.error(f"Error updating relationship request: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.delete("/{request_id}", response_model=RelationshipRequestDeleteResponse)
async def delete_relationship_request(
    request_id: str,
    user_data: Dict[str, Any] = Depends(get_current_user),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service)
) -> RelationshipRequestDeleteResponse:
    """
    Delete a relationship request
    
    Returns:
        Deletion confirmation
    """
    try:
        user_id = user_data.get("user_id")
        user_email = user_data.get("email")
        
        if not user_id or not user_email:
            raise HTTPException(status_code=400, detail="User data not found")
        
        return await service.delete_relationship_request(
            request_id=request_id,
            user_id=user_id,
            user_email=user_email
        )
    except Exception as e:
        logger.error(f"Error deleting relationship request: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/{request_id}/approve", response_model=RelationshipRequestUpdateResponse)
async def approve_relationship_request(
    request_id: str,
    user_data: Dict[str, Any] = Depends(get_current_user),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service)
) -> RelationshipRequestUpdateResponse:
    """
    Approve a pending relationship request
    
    Returns:
        Updated relationship request data with approved status
    """
    try:
        user_id = user_data.get("user_id")
        user_email = user_data.get("email")
        
        if not user_id or not user_email:
            raise HTTPException(status_code=400, detail="User data not found")
        
        return await service.approve_relationship_request(
            request_id=request_id,
            user_id=user_id,
            user_email=user_email
        )
    except Exception as e:
        logger.error(f"Error approving relationship request: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/{request_id}/reject", response_model=RelationshipRequestUpdateResponse)
async def reject_relationship_request(
    request_id: str,
    user_data: Dict[str, Any] = Depends(get_current_user),
    service: RelationshipRequestsService = Depends(get_relationship_requests_service)
) -> RelationshipRequestUpdateResponse:
    """
    Reject a pending relationship request
    
    Returns:
        Updated relationship request data with rejected status
    """
    try:
        user_id = user_data.get("user_id")
        user_email = user_data.get("email")
        
        if not user_id or not user_email:
            raise HTTPException(status_code=400, detail="User data not found")
        
        return await service.reject_relationship_request(
            request_id=request_id,
            user_id=user_id,
            user_email=user_email
        )
    except Exception as e:
        logger.error(f"Error rejecting relationship request: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
