from fastapi import APIRouter, Depends, HTTPException, Query, Body
from typing import Any
import logging

from api.settings.config import config
from ...settings.auth import get_current_user_id
from ...databridge.user_token_databridge import UserTokenDatabridge
from ...services.events_service import EventsService
from ...models.v1.events import (
    EventListResponse,
    EventResponse,
    EventDeleteResponse,
    EventUpdateResponse,
    EventCreateResponse,
    EventMoveResponse,
    SearchEventsResponse,
    QuickAddEventResponse,
    TodayEventsResponse,
    UpcomingEventsResponse,
    CalendarListResponse
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/events", tags=["Events"])


def get_events_service(
    user_token_databridge: UserTokenDatabridge = Depends(UserTokenDatabridge)
) -> EventsService:
    """Dependency to get events service instance"""
    return EventsService(user_token_databridge)


@router.get("/week", response_model=EventListResponse)
async def get_current_week_events(
    user_id: str = Depends(get_current_user_id),
    events_service: EventsService = Depends(get_events_service)
) -> EventListResponse:
    """
    Get calendar events for the current week
    
    Returns:
        List of calendar events for current week (Monday to Sunday)
    """
    try:
        events = await events_service.get_current_week_events(user_id=user_id)
        
        return EventListResponse(
            events=events,
            count=len(events),
            period="current_week"
        )
        
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error getting current week events: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to retrieve current week events"
        )


@router.get("", response_model=EventListResponse)
async def list_calendar_events(
    calendar_id: str = Query("primary", description="Calendar ID to query"),
    time_min: str | None = Query(None, description="Lower bound for event start time (RFC3339)"),
    time_max: str | None = Query(None, description="Upper bound for event end time (RFC3339)"),
    max_results: int = Query(250, ge=1, le=2500, description="Maximum number of events"),
    query: str | None = Query(None, description="Text search query"),
    user_id: str = Depends(get_current_user_id),
    events_service: EventsService = Depends(get_events_service)
) -> EventListResponse:
    """
    List calendar events with flexible filtering options
    
    Query Parameters:
        - calendar_id: Calendar ID (default: "primary")
        - time_min: Start time filter (RFC3339 format)
        - time_max: End time filter (RFC3339 format)
        - max_results: Maximum events to return (1-2500)
        - query: Free text search
    """
    try:
        events = await events_service.list_calendar_events(
            user_id=user_id,
            calendar_id=calendar_id,
            time_min=time_min,
            time_max=time_max,
            max_results=max_results,
            query=query
        )
        
        return EventListResponse(
            events=events,
            count=len(events),
            filters={
                "calendar_id": calendar_id,
                "time_min": time_min,
                "time_max": time_max,
                "max_results": max_results,
                "query": query
            }
        )
        
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error listing events: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to list events")


@router.get("/{event_id}", response_model=EventResponse)
async def get_event_by_id(
    event_id: str,
    calendar_id: str = Query("primary", description="Calendar ID"),
    user_id: str = Depends(get_current_user_id),
    events_service: EventsService = Depends(get_events_service)
) -> EventResponse:
    """
    Get details for a specific calendar event
    """
    try:
        event = await events_service.get_event_by_id(
            user_id=user_id,
            event_id=event_id,
            calendar_id=calendar_id
        )
        
        return EventResponse(event=event)
        
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error getting event {event_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get event details")


@router.post("/", response_model=EventCreateResponse)
async def create_calendar_event(
    event_data: dict[str, Any] = Body(..., description="Event data"),
    calendar_id: str = Query("primary", description="Calendar ID"),
    send_notifications: bool = Query(True, description="Send notifications to attendees"),
    user_id: str = Depends(get_current_user_id),
    events_service: EventsService = Depends(get_events_service)
) -> EventCreateResponse:
    """
    Create a new calendar event
    
    Request Body Example:
    {
        "summary": "Meeting with team",
        "description": "Weekly sync meeting",
        "start": {
            "dateTime": "2024-01-15T10:00:00Z",
            "timeZone": "UTC"
        },
        "end": {
            "dateTime": "2024-01-15T11:00:00Z",
            "timeZone": "UTC"
        },
        "location": "Conference Room A",
        "attendees": [
            {"email": "attendee@example.com"}
        ]
    }
    """
    try:
        created_event = await events_service.create_calendar_event(
            user_id=user_id,
            event_data=event_data,
            calendar_id=calendar_id,
            send_notifications=send_notifications
        )
        
        return EventCreateResponse(
            event=created_event
        )
        
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error creating event: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create event")


@router.put("/{event_id}", response_model=EventUpdateResponse)
async def update_calendar_event(
    event_id: str,
    event_data: dict[str, Any] = Body(..., description="Updated event data"),
    calendar_id: str = Query("primary", description="Calendar ID"),
    send_notifications: bool = Query(True, description="Send notifications to attendees"),
    user_id: str = Depends(get_current_user_id),
    events_service: EventsService = Depends(get_events_service)
) -> EventUpdateResponse:
    """
    Update an existing calendar event
    """
    try:
        updated_event = await events_service.update_calendar_event(
            user_id=user_id,
            event_id=event_id,
            event_data=event_data,
            calendar_id=calendar_id,
            send_notifications=send_notifications
        )
        
        return EventUpdateResponse(
            event=updated_event
        )
        
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error updating event {event_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update event")


@router.delete("/{event_id}", response_model=EventDeleteResponse)
async def delete_calendar_event(
    event_id: str,
    calendar_id: str = Query("primary", description="Calendar ID"),
    send_notifications: bool = Query(True, description="Send notifications to attendees"),
    user_id: str = Depends(get_current_user_id),
    events_service: EventsService = Depends(get_events_service)
) -> EventDeleteResponse:
    """
    Delete a calendar event
    """
    try:
        await events_service.delete_calendar_event(
            user_id=user_id,
            event_id=event_id,
            calendar_id=calendar_id,
            send_notifications=send_notifications
        )
        
        return EventDeleteResponse()
        
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error deleting event {event_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete event")


@router.get("/search", response_model=SearchEventsResponse)
async def search_calendar_events(
    q: str = Query(..., description="Search query"),
    calendar_id: str = Query("primary", description="Calendar ID"),
    max_results: int = Query(50, ge=1, le=250, description="Maximum results"),
    time_min: str | None = Query(None, description="Lower time bound (RFC3339)"),
    time_max: str | None = Query(None, description="Upper time bound (RFC3339)"),
    user_id: str = Depends(get_current_user_id),
    events_service: EventsService = Depends(get_events_service)
) -> SearchEventsResponse:
    """
    Search calendar events using text query
    """
    try:
        events = await events_service.search_calendar_events(
            user_id=user_id,
            query=q,
            calendar_id=calendar_id,
            max_results=max_results,
            time_min=time_min,
            time_max=time_max
        )
        
        return SearchEventsResponse(
            events=events,
            count=len(events),
            query=q,
            calendar_id=calendar_id
        )
        
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error searching events: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to search events")


@router.post("/quick-add", response_model=QuickAddEventResponse)
async def quick_add_calendar_event(
    text: str = Body(..., embed=True, description="Natural language event description"),
    calendar_id: str = Query("primary", description="Calendar ID"),
    send_notifications: bool = Query(True, description="Send notifications"),
    user_id: str = Depends(get_current_user_id),
    events_service: EventsService = Depends(get_events_service)
) -> QuickAddEventResponse:
    """
    Quickly add an event using natural language
    
    Example request body:
    {
        "text": "Lunch with John tomorrow at 1pm"
    }
    """
    try:
        created_event = await events_service.quick_add_calendar_event(
            user_id=user_id,
            text=text,
            calendar_id=calendar_id,
            send_notifications=send_notifications
        )
        
        return QuickAddEventResponse(
            event=created_event
        )
        
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error quick adding event: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to quick add event")


@router.post("/{event_id}/move", response_model=EventMoveResponse)
async def move_calendar_event(
    event_id: str,
    destination_calendar_id: str = Body(..., embed=True, description="Destination calendar ID"),
    source_calendar_id: str = Query("primary", description="Source calendar ID"),
    send_notifications: bool = Query(True, description="Send notifications"),
    user_id: str = Depends(get_current_user_id),
    events_service: EventsService = Depends(get_events_service)
) -> EventMoveResponse:
    """
    Move an event to a different calendar
    
    Example request body:
    {
        "destination_calendar_id": "calendar_id@group.calendar.google.com"
    }
    """
    try:
        moved_event = await events_service.move_calendar_event(
            user_id=user_id,
            event_id=event_id,
            destination_calendar_id=destination_calendar_id,
            source_calendar_id=source_calendar_id,
            send_notifications=send_notifications
        )
        
        return EventMoveResponse(
            event=moved_event,
            message=f"Event moved to {destination_calendar_id}"
        )
        
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error moving event {event_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to move event")


@router.get("/today", response_model=TodayEventsResponse)
async def get_today_calendar_events(
    calendar_id: str = Query("primary", description="Calendar ID"),
    user_id: str = Depends(get_current_user_id),
    events_service: EventsService = Depends(get_events_service)
) -> TodayEventsResponse:
    """
    Get events for today
    """
    try:
        events = await events_service.get_today_calendar_events(
            user_id=user_id,
            calendar_id=calendar_id
        )
        
        return TodayEventsResponse(
            events=events,
            count=len(events)
        )
        
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error getting today's events: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get today's events")


@router.get("/upcoming", response_model=UpcomingEventsResponse)
async def get_upcoming_calendar_events(
    days_ahead: int = Query(7, ge=1, le=365, description="Number of days ahead"),
    calendar_id: str = Query("primary", description="Calendar ID"),
    user_id: str = Depends(get_current_user_id),
    events_service: EventsService = Depends(get_events_service)
) -> UpcomingEventsResponse:
    """
    Get upcoming events for the next N days
    """
    try:
        events = await events_service.get_upcoming_calendar_events(
            user_id=user_id,
            days_ahead=days_ahead,
            calendar_id=calendar_id
        )
        
        return UpcomingEventsResponse(
            events=events,
            count=len(events),
            period=f"next_{days_ahead}_days"
        )
        
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error getting upcoming events: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get upcoming events")


# ============================================================================
# CALENDAR MANAGEMENT ENDPOINTS
# ============================================================================

@router.get("/calendars", response_model=CalendarListResponse)
async def get_user_calendars(
    user_id: str = Depends(get_current_user_id),
    events_service: EventsService = Depends(get_events_service)
) -> CalendarListResponse:
    """
    List all calendars accessible to the user
    """
    try:
        calendars = await events_service.get_user_calendars(
            user_id=user_id
        )
        
        return CalendarListResponse(
            calendars=calendars,
            count=len(calendars)
        )
        
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error getting calendars: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get calendars")
