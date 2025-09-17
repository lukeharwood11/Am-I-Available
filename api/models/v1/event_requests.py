from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal


# ============================================================================
# DATE MODELS
# ============================================================================


class EventDateTime(BaseModel):
    """Represents date/time information matching Google API format"""

    date: str | None = Field(
        None, description="Date in YYYY-MM-DD format for all-day events"
    )
    date_time: datetime | None = Field(
        None, description="Date and time for timed events"
    )
    time_zone: str | None = Field(None, description="Time zone identifier")


# ============================================================================
# REQUEST MODELS
# ============================================================================


class CreateEventRequestRequest(BaseModel):
    """Request model for creating a new event request"""

    google_event_id: str | None = Field(
        None, description="Google Calendar event ID if created from Google Calendar"
    )
    title: str | None = Field(None, description="Event title")
    location: str | None = Field(None, description="Event location")
    description: str | None = Field(None, description="Event description")
    start_date: EventDateTime = Field(description="Event start date and time")
    end_date: EventDateTime = Field(description="Event end date and time")
    importance_level: int = Field(
        1, ge=1, le=5, description="Importance level from 1 (low) to 5 (critical)"
    )
    notes: str | None = Field(None, description="Additional notes for the event")


class UpdateEventRequestRequest(BaseModel):
    """Request model for updating an event request"""

    event_request_id: str = Field(description="UUID of the event request to update")
    google_event_id: str | None = Field(None, description="Google Calendar event ID")
    title: str | None = Field(None, description="Updated event title")
    location: str | None = Field(None, description="Updated event location")
    description: str | None = Field(None, description="Updated event description")
    start_date: EventDateTime | None = Field(
        None, description="Updated event start date and time"
    )
    end_date: EventDateTime | None = Field(
        None, description="Updated event end date and time"
    )
    importance_level: int | None = Field(
        None, ge=1, le=5, description="Updated importance level"
    )
    status: Literal["pending", "approved", "rejected"] | None = Field(
        None, description="Updated event request status"
    )
    notes: str | None = Field(None, description="Updated notes")


class GetEventRequestsRequest(BaseModel):
    """Request model for getting event requests"""

    status: Literal["pending", "approved", "rejected"] | None = Field(
        None, description="Filter by event request status"
    )
    importance_level: int | None = Field(
        None, ge=1, le=5, description="Filter by importance level"
    )
    start_date_from: EventDateTime | None = Field(
        None, description="Filter events starting from this date"
    )
    start_date_to: EventDateTime | None = Field(
        None, description="Filter events starting before this date"
    )
    created_by: str | None = Field(None, description="Filter by creator user ID")


class ListEventRequestsWithApprovalsRequest(BaseModel):
    """Request model for listing event requests with approval status"""

    status: Literal["pending", "approved", "rejected"] | None = Field(
        None, description="Filter by event request status"
    )
    skip: int = Field(0, ge=0, description="Number of records to skip for pagination")
    take: int = Field(
        50, ge=1, le=100, description="Number of records to return (max 100)"
    )


class DeleteEventRequestRequest(BaseModel):
    """Request model for deleting an event request"""

    event_request_id: str = Field(description="UUID of the event request to delete")


# ============================================================================
# RESPONSE MODELS
# ============================================================================


class EventRequestData(BaseModel):
    """Core event request data model"""

    id: str = Field(description="Event request UUID")
    google_event_id: str | None = Field(description="Google Calendar event ID")
    title: str | None = Field(description="Event title")
    location: str | None = Field(description="Event location")
    description: str | None = Field(description="Event description")
    start_date: EventDateTime = Field(description="Event start date and time")
    end_date: EventDateTime = Field(description="Event end date and time")
    importance_level: int = Field(description="Importance level from 1 to 5")
    status: str = Field(description="Event request status")
    notes: str | None = Field(description="Additional notes")
    created_by: str = Field(description="UUID of the user who created the request")
    created_at: datetime = Field(description="When the request was created")
    updated_at: datetime = Field(description="When the request was last updated")


class EventRequestWithApprovalsData(BaseModel):
    """Event request data model with approval status information"""

    id: str = Field(description="Event request UUID")
    google_event_id: str | None = Field(description="Google Calendar event ID")
    title: str | None = Field(description="Event title")
    location: str | None = Field(description="Event location")
    description: str | None = Field(description="Event description")
    start_date: EventDateTime = Field(description="Event start date and time")
    end_date: EventDateTime = Field(description="Event end date and time")
    importance_level: int = Field(description="Importance level from 1 to 5")
    status: str = Field(description="Event request status")
    notes: str | None = Field(description="Additional notes")
    created_by: str = Field(description="UUID of the user who created the request")
    created_at: datetime = Field(description="When the request was created")
    updated_at: datetime = Field(description="When the request was last updated")
    approval_status: str = Field(
        description="Aggregated approval status: pending, approved, rejected, or no_approvals"
    )
    requested_approvals: int = Field(description="Total number of approval requests")
    completed_count: int = Field(
        description="Number of completed (non-pending) approvals"
    )


class EventRequestResponse(BaseModel):
    """Response model for single event request operations"""

    status: str = "success"
    event_request: EventRequestData
    message: str | None = None


class EventRequestsListResponse(BaseModel):
    """Response model for listing event requests"""

    status: str = "success"
    event_requests: list[EventRequestData]
    count: int
    filters: dict[str, str | int | EventDateTime] | None = None


class EventRequestsWithApprovalsListResponse(BaseModel):
    """Response model for listing event requests with approval status"""

    status: str = "success"
    event_requests: list[EventRequestWithApprovalsData]
    count: int
    total_count: int
    skip: int
    take: int
    filters: dict[str, str | int] | None = None


class EventRequestDeleteResponse(BaseModel):
    """Response model for event request deletion"""

    status: str = "success"
    message: str = "Event request deleted successfully"


class EventRequestCreateResponse(BaseModel):
    """Response model for event request creation"""

    status: str = "success"
    event_request: EventRequestData
    message: str = "Event request created successfully"


class EventRequestUpdateResponse(BaseModel):
    """Response model for event request updates"""

    status: str = "success"
    event_request: EventRequestData
    message: str = "Event request updated successfully"
