from pydantic import BaseModel, Field
from typing import Any
from datetime import datetime
from ...proxy.models.google_models import CalendarEvent, CalendarInfo


# ============================================================================
# REQUEST MODELS
# ============================================================================

class EventListRequest(BaseModel):
    """Request model for listing events"""
    calendar_id: str = "primary"
    time_min: str | None = None
    time_max: str | None = None
    max_results: int = Field(250, ge=1, le=2500)
    query: str | None = None


class EventDetailRequest(BaseModel):
    """Request model for getting event details"""
    event_id: str
    calendar_id: str = "primary"


class CreateEventRequest(BaseModel):
    """Request model for creating events"""
    event_data: dict[str, Any]
    calendar_id: str = "primary"
    send_notifications: bool = True


class UpdateEventRequest(BaseModel):
    """Request model for updating events"""
    event_id: str
    event_data: dict[str, Any]
    calendar_id: str = "primary"
    send_notifications: bool = True


class DeleteEventRequest(BaseModel):
    """Request model for deleting events"""
    event_id: str
    calendar_id: str = "primary"
    send_notifications: bool = True


class SearchEventsRequest(BaseModel):
    """Request model for searching events"""
    query: str
    calendar_id: str = "primary"
    max_results: int = Field(50, ge=1, le=250)
    time_min: str | None = None
    time_max: str | None = None


class QuickAddEventRequest(BaseModel):
    """Request model for quick adding events"""
    text: str
    calendar_id: str = "primary"
    send_notifications: bool = True


class MoveEventRequest(BaseModel):
    """Request model for moving events"""
    event_id: str
    destination_calendar_id: str
    source_calendar_id: str = "primary"
    send_notifications: bool = True


class TodayEventsRequest(BaseModel):
    """Request model for getting today's events"""
    calendar_id: str = "primary"


class UpcomingEventsRequest(BaseModel):
    """Request model for getting upcoming events"""
    days_ahead: int = Field(7, ge=1, le=365)
    calendar_id: str = "primary"


class CalendarListRequest(BaseModel):
    """Request model for listing calendars"""
    pass


# ============================================================================
# RESPONSE MODELS
# ============================================================================

class EventListResponse(BaseModel):
    """Response model for event list operations"""
    events: list[CalendarEvent]
    count: int
    filters: dict[str, Any] | None = None
    period: str | None = None


class EventResponse(BaseModel):
    """Response model for single event operations"""
    event: CalendarEvent
    message: str | None = None


class EventDeleteResponse(BaseModel):
    """Response model for event deletion"""
    status: str = "success"
    message: str = "Event deleted successfully"


class EventUpdateResponse(BaseModel):
    """Response model for event updates"""
    status: str = "success"
    event: CalendarEvent
    message: str = "Event updated successfully"


class EventCreateResponse(BaseModel):
    """Response model for event creation"""
    status: str = "success"
    event: CalendarEvent
    message: str = "Event created successfully"


class EventMoveResponse(BaseModel):
    """Response model for event move operations"""
    status: str = "success"
    event: CalendarEvent
    message: str


class SearchEventsResponse(BaseModel):
    """Response model for event search operations"""
    status: str = "success"
    events: list[CalendarEvent]
    count: int
    query: str
    calendar_id: str


class QuickAddEventResponse(BaseModel):
    """Response model for quick add operations"""
    status: str = "success"
    event: CalendarEvent
    message: str = "Event created successfully from natural language"


class TodayEventsResponse(BaseModel):
    """Response model for today's events"""
    status: str = "success"
    events: list[CalendarEvent]
    count: int
    period: str = "today"


class UpcomingEventsResponse(BaseModel):
    """Response model for upcoming events"""
    status: str = "success"
    events: list[CalendarEvent]
    count: int
    period: str


class CalendarListResponse(BaseModel):
    """Response model for calendar list operations"""
    status: str = "success"
    calendars: list[CalendarInfo]
    count: int
