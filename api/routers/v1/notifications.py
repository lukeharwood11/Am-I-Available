from fastapi import APIRouter, Depends, HTTPException, Query
from datetime import datetime

from api.settings.auth import get_current_user_id
from api.dependencies import get_notifications_service
from api.services.notifications_service import NotificationsService
import api.models.v1.notifications as models

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.post("", response_model=models.NotificationCreateResponse)
async def create_notification(
    request: models.CreateNotificationRequest,
    user_id: str = Depends(get_current_user_id),
    service: NotificationsService = Depends(get_notifications_service),
) -> models.NotificationCreateResponse:
    """
    Create a new notification

    Returns:
        Created notification data
    """
    return await service.create_notification(
        user_id=user_id,
        title=request.title,
        message=request.message,
        payload=request.payload,
    )


@router.get("", response_model=models.NotificationsListResponse)
async def get_user_notifications(
    is_read: bool | None = Query(None, description="Filter by read status"),
    is_deleted: bool | None = Query(None, description="Filter by deleted status"),
    skip: int = Query(0, ge=0, description="Number of records to skip for pagination"),
    take: int = Query(
        50, ge=1, le=100, description="Number of records to return (max 100)"
    ),
    user_id: str = Depends(get_current_user_id),
    service: NotificationsService = Depends(get_notifications_service),
) -> models.NotificationsListResponse:
    """
    Get all notifications for the current user with optional filters

    Returns:
        List of user's notifications
    """
    return await service.get_user_notifications(
        user_id=user_id,
        is_read=is_read,
        is_deleted=is_deleted,
        skip=skip,
        take=take,
    )


@router.get("/{notification_id}", response_model=models.NotificationResponse)
async def get_notification(
    notification_id: str,
    user_id: str = Depends(get_current_user_id),
    service: NotificationsService = Depends(get_notifications_service),
) -> models.NotificationResponse:
    """
    Get a specific notification by ID

    Returns:
        Notification data
    """
    return await service.get_notification(
        notification_id=notification_id, user_id=user_id
    )


@router.patch("/{notification_id}", response_model=models.NotificationUpdateResponse)
async def update_notification(
    notification_id: str,
    request: models.UpdateNotificationRequest,
    user_id: str = Depends(get_current_user_id),
    service: NotificationsService = Depends(get_notifications_service),
) -> models.NotificationUpdateResponse:
    """
    Update a notification

    Returns:
        Updated notification data
    """
    return await service.update_notification(
        notification_id=notification_id,
        user_id=user_id,
        is_read=request.is_read,
        is_deleted=request.is_deleted,
    )


@router.delete("/{notification_id}", response_model=models.NotificationDeleteResponse)
async def delete_notification(
    notification_id: str,
    user_id: str = Depends(get_current_user_id),
    service: NotificationsService = Depends(get_notifications_service),
) -> models.NotificationDeleteResponse:
    """
    Delete a notification

    Returns:
        Deletion confirmation
    """
    return await service.delete_notification(
        notification_id=notification_id, user_id=user_id
    )


@router.post("/mark-all-read", response_model=models.MarkAllAsReadResponse)
async def mark_all_as_read(
    user_id: str = Depends(get_current_user_id),
    service: NotificationsService = Depends(get_notifications_service),
) -> models.MarkAllAsReadResponse:
    """
    Mark all notifications as read for the current user

    Returns:
        Confirmation with count of updated notifications
    """
    return await service.mark_all_as_read(user_id=user_id)
