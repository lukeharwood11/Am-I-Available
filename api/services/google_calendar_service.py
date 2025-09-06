"""
Google Calendar service for fetching user events
"""
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from ..settings.database import get_supabase_admin_client

logger = logging.getLogger(__name__)


class GoogleCalendarService:
    """Service for interacting with Google Calendar API"""
    
    def __init__(self):
        self.supabase = get_supabase_admin_client()
    
    async def get_user_google_tokens(self, user_id: str) -> Optional[Dict[str, str]]:
        """
        Get Google OAuth tokens for a user from Supabase
        Returns dict with access_token and refresh_token if found
        """
        try:
            # Get user from Supabase auth
            user_response = self.supabase.auth.admin.get_user_by_id(user_id)
            if not user_response.user:
                logger.error(f"User {user_id} not found")
                return None
            
            # Check if user has Google provider connected
            identities = user_response.user.identities or []
            google_identity = next(
                (identity for identity in identities if identity.provider == "google"), 
                None
            )
            
            if not google_identity:
                logger.error(f"No Google identity found for user {user_id}")
                return None
            
            print("GOOGLE IDENTITY FOUND")
            print(google_identity)
            
            # Get tokens from the identity data
            identity_data = google_identity.identity_data or {}
            access_token = identity_data.get("access_token")
            refresh_token = identity_data.get("refresh_token")
            
            if not access_token:
                logger.error(f"No access token found for user {user_id}")
                return None
            
            return {
                "access_token": access_token,
                "refresh_token": refresh_token
            }
            
        except Exception as e:
            logger.error(f"Error getting Google tokens for user {user_id}: {str(e)}")
            return None
    
    def _create_google_credentials(self, tokens: Dict[str, str]) -> Credentials:
        """Create Google OAuth2 credentials from tokens"""
        return Credentials(
            token=tokens["access_token"],
            refresh_token=tokens.get("refresh_token"),
            token_uri="https://oauth2.googleapis.com/token",
            client_id=None,  # Not needed for API calls with valid tokens
            client_secret=None,
            scopes=["https://www.googleapis.com/auth/calendar.readonly"]
        )
    
    async def get_calendar_events(
        self, 
        user_id: str, 
        calendar_id: str = "primary",
        max_results: int = 50,
        days_ahead: int = 30
    ) -> List[Dict[str, Any]]:
        """
        Get calendar events for a user
        
        Args:
            user_id: The user's Supabase ID
            calendar_id: Google Calendar ID (default: "primary")
            max_results: Maximum number of events to return
            days_ahead: Number of days ahead to fetch events
            
        Returns:
            List of calendar events
        """
        try:
            # Get user's Google tokens
            tokens = await self.get_user_google_tokens(user_id)
            if not tokens:
                logger.error(f"No Google tokens found for user {user_id}")
                return []
            
            # Create credentials
            credentials = self._create_google_credentials(tokens)
            
            # Build the Calendar service
            service = build("calendar", "v3", credentials=credentials)
            
            # Calculate time range
            now = datetime.utcnow()
            time_min = now.isoformat() + "Z"
            time_max = (now + timedelta(days=days_ahead)).isoformat() + "Z"
            
            # Call the Calendar API
            events_result = service.events().list(
                calendarId=calendar_id,
                timeMin=time_min,
                timeMax=time_max,
                maxResults=max_results,
                singleEvents=True,
                orderBy="startTime"
            ).execute()
            
            events = events_result.get("items", [])
            
            # Format events for response
            formatted_events = []
            for event in events:
                formatted_event = {
                    "id": event.get("id"),
                    "summary": event.get("summary", "No title"),
                    "description": event.get("description"),
                    "start": event.get("start", {}),
                    "end": event.get("end", {}),
                    "location": event.get("location"),
                    "attendees": event.get("attendees", []),
                    "status": event.get("status"),
                    "html_link": event.get("htmlLink"),
                    "created": event.get("created"),
                    "updated": event.get("updated")
                }
                formatted_events.append(formatted_event)
            
            logger.info(f"Retrieved {len(formatted_events)} events for user {user_id}")
            return formatted_events
            
        except HttpError as error:
            logger.error(f"Google Calendar API error for user {user_id}: {error}")
            if error.resp.status == 401:
                # Token might be expired
                logger.error("Access token expired or invalid")
            return []
        except Exception as e:
            logger.error(f"Error getting calendar events for user {user_id}: {str(e)}")
            return []
    
    async def get_calendar_list(self, user_id: str) -> List[Dict[str, Any]]:
        """
        Get list of calendars for a user
        
        Args:
            user_id: The user's Supabase ID
            
        Returns:
            List of calendar information
        """
        try:
            # Get user's Google tokens
            tokens = await self.get_user_google_tokens(user_id)
            if not tokens:
                return []
            
            # Create credentials
            credentials = self._create_google_credentials(tokens)
            
            # Build the Calendar service
            service = build("calendar", "v3", credentials=credentials)
            
            # Get calendar list
            calendar_list = service.calendarList().list().execute()
            
            calendars = []
            for calendar_item in calendar_list.get("items", []):
                calendar_info = {
                    "id": calendar_item.get("id"),
                    "summary": calendar_item.get("summary"),
                    "description": calendar_item.get("description"),
                    "primary": calendar_item.get("primary", False),
                    "access_role": calendar_item.get("accessRole"),
                    "selected": calendar_item.get("selected", False),
                    "background_color": calendar_item.get("backgroundColor"),
                    "foreground_color": calendar_item.get("foregroundColor")
                }
                calendars.append(calendar_info)
            
            logger.info(f"Retrieved {len(calendars)} calendars for user {user_id}")
            return calendars
            
        except HttpError as error:
            logger.error(f"Google Calendar API error for user {user_id}: {error}")
            return []
        except Exception as e:
            logger.error(f"Error getting calendar list for user {user_id}: {str(e)}")
            return []


# Create a singleton instance
google_calendar_service = GoogleCalendarService()
