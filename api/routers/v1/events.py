from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Dict, Any, List, Optional
from ...services.google_calendar_service import google_calendar_service
from ...settings.auth import get_current_user_id
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/events", tags=["Events"])


@router.get("/", response_model=List[Dict[str, Any]])
async def get_events(
    user_id: str = Depends(get_current_user_id),
    calendar_id: str = Query("primary", description="Google Calendar ID to fetch events from"),
    max_results: int = Query(50, description="Maximum number of events to return", ge=1, le=100),
    days_ahead: int = Query(30, description="Number of days ahead to fetch events", ge=1, le=365)
):
    """
    Get Google Calendar events for the authenticated user
    
    This endpoint fetches events from the user's Google Calendar using their
    stored OAuth tokens. The user must have authenticated with Google and
    granted calendar access permissions.
    
    Args:
        calendar_id: Which calendar to fetch from (default: "primary")
        max_results: Maximum number of events to return (1-100)
        days_ahead: How many days ahead to fetch events (1-365)
    
    Returns:
        List of calendar events with details like summary, start/end times, etc.
    """
    try:
        logger.info(f"Fetching calendar events for user {user_id}")
        
        events = await google_calendar_service.get_calendar_events(
            user_id=user_id,
            calendar_id=calendar_id,
            max_results=max_results,
            days_ahead=days_ahead
        )
        
        if not events:
            logger.warning(f"No events found for user {user_id}")
        
        return events
        
    except Exception as e:
        logger.error(f"Error fetching events for user {user_id}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to fetch calendar events. Please ensure you have connected your Google account."
        )


@router.get("/calendars", response_model=List[Dict[str, Any]])
async def get_calendars(
    user_id: str = Depends(get_current_user_id)
):
    """
    Get list of Google Calendars for the authenticated user
    
    This endpoint fetches the list of calendars accessible to the user,
    which can then be used with the /events endpoint to fetch events
    from specific calendars.
    
    Returns:
        List of calendar information including IDs, names, and access levels
    """
    try:
        logger.info(f"Fetching calendar list for user {user_id}")
        
        calendars = await google_calendar_service.get_calendar_list(user_id)
        
        if not calendars:
            logger.warning(f"No calendars found for user {user_id}")
        
        return calendars
        
    except Exception as e:
        logger.error(f"Error fetching calendars for user {user_id}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to fetch calendar list. Please ensure you have connected your Google account."
        )