from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Dict, Any
from datetime import datetime

from ...settings.auth import get_current_user_id, get_current_user
from ...dependencies import get_event_requests_service
from ...services.event_requests_service import EventRequestsService
from ...models.v1.event_requests import (
    CreateEventRequestRequest,
    UpdateEventRequestRequest,
    GetEventRequestsRequest,
    DeleteEventRequestRequest,
    EventRequestResponse,
    EventRequestsListResponse,
    EventRequestCreateResponse,
    EventRequestUpdateResponse,
    EventRequestDeleteResponse,
)


router = APIRouter(prefix="/event-requests", tags=["Event Requests"])


@router.post("", response_model=EventRequestCreateResponse)
async def create_event_request(
    request: CreateEventRequestRequest,
    user_id: str = Depends(get_current_user_id),
    service: EventRequestsService = Depends(get_event_requests_service),
) -> EventRequestCreateResponse:
    """
    Create a new event request

    Returns:
        Created event request data
    """
    return await service.create_event_request(
        google_event_id=request.google_event_id,
        location=request.location,
        description=request.description,
        start_date=request.start_date,
        end_date=request.end_date,
        importance_level=request.importance_level,
        notes=request.notes,
        created_by=user_id,
    )


@router.get("", response_model=EventRequestsListResponse)
async def get_user_event_requests(
    status: str | None = Query(None, description="Filter by event request status"),
    importance_level: int | None = Query(
        None, ge=1, le=5, description="Filter by importance level"
    ),
    start_date_from: datetime | None = Query(
        None, description="Filter events starting from this date"
    ),
    start_date_to: datetime | None = Query(
        None, description="Filter events starting before this date"
    ),
    user_id: str = Depends(get_current_user_id),
    service: EventRequestsService = Depends(get_event_requests_service),
) -> EventRequestsListResponse:
    """
    Get all event requests created by the current user with optional filters

    Returns:
        List of user's event requests
    """
    return await service.get_user_event_requests(
        user_id=user_id,
        status=status,
        importance_level=importance_level,
        start_date_from=start_date_from,
        start_date_to=start_date_to,
    )


@router.get("/all", response_model=EventRequestsListResponse)
async def get_all_event_requests(
    status: str | None = Query(None, description="Filter by event request status"),
    importance_level: int | None = Query(
        None, ge=1, le=5, description="Filter by importance level"
    ),
    start_date_from: datetime | None = Query(
        None, description="Filter events starting from this date"
    ),
    start_date_to: datetime | None = Query(
        None, description="Filter events starting before this date"
    ),
    created_by: str | None = Query(None, description="Filter by creator user ID"),
    user_id: str = Depends(get_current_user_id),
    service: EventRequestsService = Depends(get_event_requests_service),
) -> EventRequestsListResponse:
    """
    Get all event requests with optional filters (potentially for admin/system use)

    Returns:
        List of event requests
    """
    return await service.get_all_event_requests(
        status=status,
        importance_level=importance_level,
        start_date_from=start_date_from,
        start_date_to=start_date_to,
        created_by=created_by,
    )


@router.get("/{event_request_id}", response_model=EventRequestResponse)
async def get_event_request(
    event_request_id: str,
    user_id: str = Depends(get_current_user_id),
    service: EventRequestsService = Depends(get_event_requests_service),
) -> EventRequestResponse:
    """
    Get a specific event request by ID

    Returns:
        Event request data
    """
    return await service.get_event_request(event_request_id=event_request_id)


@router.get("/google/{google_event_id}", response_model=EventRequestResponse)
async def get_event_request_by_google_id(
    google_event_id: str,
    user_id: str = Depends(get_current_user_id),
    service: EventRequestsService = Depends(get_event_requests_service),
) -> EventRequestResponse:
    """
    Get an event request by Google Calendar event ID

    Returns:
        Event request data
    """
    return await service.get_event_request_by_google_id(google_event_id=google_event_id)


@router.patch("/{event_request_id}", response_model=EventRequestUpdateResponse)
async def update_event_request(
    event_request_id: str,
    request: UpdateEventRequestRequest,
    user_id: str = Depends(get_current_user_id),
    service: EventRequestsService = Depends(get_event_requests_service),
) -> EventRequestUpdateResponse:
    """
    Update an event request

    Returns:
        Updated event request data
    """
    return await service.update_event_request(
        event_request_id=event_request_id,
        user_id=user_id,
        google_event_id=request.google_event_id,
        location=request.location,
        description=request.description,
        start_date=request.start_date,
        end_date=request.end_date,
        importance_level=request.importance_level,
        status=request.status,
        notes=request.notes,
    )


@router.delete("/{event_request_id}", response_model=EventRequestDeleteResponse)
async def delete_event_request(
    event_request_id: str,
    user_id: str = Depends(get_current_user_id),
    service: EventRequestsService = Depends(get_event_requests_service),
) -> EventRequestDeleteResponse:
    """
    Delete an event request

    Returns:
        Deletion confirmation
    """
    return await service.delete_event_request(
        event_request_id=event_request_id, user_id=user_id
    )


@router.post("/{event_request_id}/approve", response_model=EventRequestUpdateResponse)
async def approve_event_request(
    event_request_id: str,
    user_id: str = Depends(get_current_user_id),
    service: EventRequestsService = Depends(get_event_requests_service),
) -> EventRequestUpdateResponse:
    """
    Approve a pending event request

    Returns:
        Updated event request data with approved status
    """
    return await service.approve_event_request(
        event_request_id=event_request_id, user_id=user_id
    )


@router.post("/{event_request_id}/reject", response_model=EventRequestUpdateResponse)
async def reject_event_request(
    event_request_id: str,
    user_id: str = Depends(get_current_user_id),
    service: EventRequestsService = Depends(get_event_requests_service),
) -> EventRequestUpdateResponse:
    """
    Reject a pending event request

    Returns:
        Updated event request data with rejected status
    """
    return await service.reject_event_request(
        event_request_id=event_request_id, user_id=user_id
    )
