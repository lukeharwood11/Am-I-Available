from pydantic import BaseModel, Field
from datetime import datetime
from typing import Any


class EventDateTime(BaseModel):
    """Represents date/time information for calendar events"""

    date_time: datetime | None = Field(None, alias="dateTime")
    date: str | None = None
    time_zone: str | None = Field(None, alias="timeZone")


class EventAttendee(BaseModel):
    """Represents an event attendee"""

    email: str
    display_name: str | None = Field(None, alias="displayName")
    response_status: str | None = Field(None, alias="responseStatus")
    optional: bool = False
    resource: bool = False
    organizer: bool = False
    self_: bool = Field(False, alias="self")
    comment: str | None = None
    additional_guests: int | None = Field(None, alias="additionalGuests")


class EventCreator(BaseModel):
    """Represents event creator information"""

    email: str | None = None
    display_name: str | None = Field(None, alias="displayName")
    self_: bool = Field(False, alias="self")


class EventOrganizer(BaseModel):
    """Represents event organizer information"""

    email: str | None = None
    display_name: str | None = Field(None, alias="displayName")
    self_: bool = Field(False, alias="self")


class EventReminder(BaseModel):
    """Represents a single event reminder"""

    method: str  # "email" or "popup"
    minutes: int


class EventReminders(BaseModel):
    """Represents event reminder settings"""

    use_default: bool = Field(True, alias="useDefault")
    overrides: list[EventReminder] = []


class EventAttachment(BaseModel):
    """Represents an event attachment"""

    file_id: str = Field(alias="fileId")
    file_url: str = Field(alias="fileUrl")
    title: str
    mime_type: str | None = Field(None, alias="mimeType")
    icon_link: str | None = Field(None, alias="iconLink")


class ConferenceData(BaseModel):
    """Represents conference/meeting data"""

    conference_id: str | None = Field(None, alias="conferenceId")
    conference_solution: dict[str, Any] | None = Field(None, alias="conferenceSolution")
    create_request: dict[str, Any] | None = Field(None, alias="createRequest")
    entry_points: list[dict[str, Any]] = Field(
        default_factory=list, alias="entryPoints"
    )
    notes: str | None = None
    parameters: dict[str, Any] | None = None
    signature: str | None = None


class CalendarEvent(BaseModel):
    """Represents a Google Calendar event"""

    id: str | None = None
    etag: str | None = None
    summary: str = "No title"
    description: str | None = None
    start: EventDateTime | None = None
    end: EventDateTime | None = None
    location: str | None = None
    attendees: list[EventAttendee] = []
    status: str | None = None
    html_link: str | None = Field(None, alias="htmlLink")
    created: datetime | None = None
    updated: datetime | None = None
    creator: EventCreator | None = None
    organizer: EventOrganizer | None = None
    visibility: str | None = None
    recurrence: list[str] = []
    original_start_time: EventDateTime | None = Field(None, alias="originalStartTime")
    transparency: str | None = None
    sequence: int | None = None
    reminders: EventReminders | None = None
    attachments: list[EventAttachment] = []
    conference_data: ConferenceData | None = Field(None, alias="conferenceData")
    event_type: str | None = Field(None, alias="eventType")
    recurring_event_id: str | None = Field(None, alias="recurringEventId")
    i_cal_uid: str | None = Field(None, alias="iCalUID")

    class Config:
        validate_by_name = True
        populate_by_name = True


class CalendarInfo(BaseModel):
    """Represents calendar information"""

    id: str
    summary: str | None = None
    description: str | None = None
    primary: bool = False
    access_role: str | None = Field(None, alias="accessRole")
    selected: bool = False
    color_id: str | None = Field(None, alias="colorId")
    background_color: str | None = Field(None, alias="backgroundColor")
    foreground_color: str | None = Field(None, alias="foregroundColor")
    time_zone: str | None = Field(None, alias="timeZone")
    hidden: bool = False
    deleted: bool = False
    notification_settings: dict[str, Any] | None = Field(
        None, alias="notificationSettings"
    )
    summary_override: str | None = Field(None, alias="summaryOverride")
    default_reminders: list[EventReminder] = Field(
        default_factory=list, alias="defaultReminders"
    )

    class Config:
        validate_by_name = True
        populate_by_name = True


class EventListResponse(BaseModel):
    """Response model for event list operations"""

    status: str = "success"
    events: list[CalendarEvent]
    count: int
    filters: dict[str, Any] | None = None
    period: str | None = None
    query: str | None = None
    calendar_id: str | None = None


class EventResponse(BaseModel):
    """Response model for single event operations"""

    status: str = "success"
    event: CalendarEvent
    message: str | None = None


class CalendarListResponse(BaseModel):
    """Response model for calendar list operations"""

    status: str = "success"
    calendars: list[CalendarInfo]
    count: int


class EventDeleteResponse(BaseModel):
    """Response model for event deletion"""

    status: str = "success"
    message: str = "Event deleted successfully"


class EventMoveResponse(BaseModel):
    """Response model for event move operations"""

    status: str = "success"
    event: CalendarEvent
    message: str
