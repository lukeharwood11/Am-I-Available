from pydantic import BaseModel, Field
from typing import Any
from datetime import datetime
from ...proxy.models.google_models import CalendarEvent, CalendarInfo


# ============================================================================
# REQUEST MODELS
# ============================================================================

class EventDataDateTime(BaseModel):
    """DateTime structure for event start/end times"""
    date_time: str | None = Field(None, alias="dateTime", description="RFC3339 datetime string")
    date: str | None = Field(None, description="Date string for all-day events (YYYY-MM-DD)")
    time_zone: str | None = Field(None, alias="timeZone", description="Time zone (e.g., 'America/New_York')")

    class Config:
        populate_by_name = True


class EventDataAttendee(BaseModel):
    """Attendee information for events"""
    email: str = Field(description="Attendee email address")
    display_name: str | None = Field(None, alias="displayName", description="Attendee display name")
    response_status: str | None = Field(None, alias="responseStatus", description="Response status: needsAction, declined, tentative, accepted")
    optional: bool = Field(False, description="Whether attendance is optional")
    comment: str | None = Field(None, description="Attendee comment")
    additional_guests: int | None = Field(None, alias="additionalGuests", description="Number of additional guests")

    class Config:
        populate_by_name = True


class EventDataReminder(BaseModel):
    """Individual reminder for an event"""
    method: str = Field(description="Reminder method: email or popup")
    minutes: int = Field(description="Minutes before event to trigger reminder")


class EventDataReminders(BaseModel):
    """Reminder settings for events"""
    use_default: bool = Field(True, alias="useDefault", description="Use calendar default reminders")
    overrides: list[EventDataReminder] = Field(default_factory=list, description="Custom reminder overrides")

    class Config:
        populate_by_name = True


class EventDataAttachment(BaseModel):
    """File attachment for events"""
    file_id: str = Field(alias="fileId", description="Google Drive file ID")
    file_url: str = Field(alias="fileUrl", description="File URL")
    title: str = Field(description="Attachment title")
    mime_type: str | None = Field(None, alias="mimeType", description="MIME type of the file")

    class Config:
        populate_by_name = True


class EventDataConferenceCreateRequest(BaseModel):
    """Conference creation request"""
    request_id: str = Field(alias="requestId", description="Unique request ID")
    conference_solution_key: dict[str, Any] = Field(alias="conferenceSolutionKey", description="Conference solution details")
    status: dict[str, Any] | None = Field(None, description="Creation status")

    class Config:
        populate_by_name = True


class EventDataConferenceData(BaseModel):
    """Conference/meeting data for events"""
    create_request: EventDataConferenceCreateRequest | None = Field(None, alias="createRequest", description="Request to create conference")
    entry_points: list[dict[str, Any]] = Field(default_factory=list, alias="entryPoints", description="Conference entry points")
    conference_solution: dict[str, Any] | None = Field(None, alias="conferenceSolution", description="Conference solution info")
    conference_id: str | None = Field(None, alias="conferenceId", description="Conference ID")
    signature: str | None = Field(None, description="Conference signature")
    notes: str | None = Field(None, description="Conference notes")

    class Config:
        populate_by_name = True


class EventData(BaseModel):
    """Event data structure for creating and updating calendar events"""
    summary: str = Field(description="Event title/summary")
    description: str | None = Field(None, description="Event description")
    location: str | None = Field(None, description="Event location")
    start: EventDataDateTime = Field(description="Event start date/time")
    end: EventDataDateTime = Field(description="Event end date/time")
    attendees: list[EventDataAttendee] = Field(default_factory=list, description="Event attendees")
    recurrence: list[str] = Field(default_factory=list, description="Recurrence rules (RRULE format)")
    reminders: EventDataReminders | None = Field(None, description="Reminder settings")
    attachments: list[EventDataAttachment] = Field(default_factory=list, description="File attachments")
    conference_data: EventDataConferenceData | None = Field(None, alias="conferenceData", description="Conference/meeting data")
    visibility: str | None = Field(None, description="Event visibility: default, public, private, confidential")
    transparency: str | None = Field(None, description="Event transparency: opaque, transparent")
    event_type: str | None = Field(None, alias="eventType", description="Event type: default, outOfOffice, focusTime")
    color_id: str | None = Field(None, alias="colorId", description="Color ID for the event")
    guests_can_invite_others: bool | None = Field(None, alias="guestsCanInviteOthers", description="Whether guests can invite others")
    guests_can_modify: bool | None = Field(None, alias="guestsCanModify", description="Whether guests can modify the event")
    guests_can_see_other_guests: bool | None = Field(None, alias="guestsCanSeeOtherGuests", description="Whether guests can see other guests")

    class Config:
        populate_by_name = True


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
    event_data: EventData
    calendar_id: str = "primary"
    send_notifications: bool = True


class UpdateEventRequest(BaseModel):
    """Request model for updating events"""
    event_id: str
    event_data: EventData
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
