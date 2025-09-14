from ..settings.database import get_supabase_admin_client
from supabase import Client
from pydantic import BaseModel
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class DBEventRequestResponse(BaseModel):
    id: str
    google_event_id: str | None
    location: str | None
    description: str | None
    start_date: datetime
    end_date: datetime
    importance_level: int
    status: str
    notes: str | None
    created_by: str
    created_at: datetime
    updated_at: datetime


class EventRequestsDatabridge:
    def __init__(self, supabase: Client):
        self.supabase = supabase
        self.event_requests = self.supabase.table("event_requests")

    async def create_event_request(
        self,
        *,
        google_event_id: str | None,
        location: str | None,
        description: str | None,
        start_date: datetime,
        end_date: datetime,
        importance_level: int,
        notes: str | None,
        created_by: str,
    ) -> DBEventRequestResponse | None:
        """Create a new event request"""
        try:
            data = {
                "google_event_id": google_event_id,
                "location": location,
                "description": description,
                "start_date": start_date.isoformat(),
                "end_date": end_date.isoformat(),
                "importance_level": importance_level,
                "status": "pending",
                "notes": notes,
                "created_by": created_by,
            }

            response = self.event_requests.insert(data).execute()
            if not response.data:
                return None

            _data = response.data[0]
            return DBEventRequestResponse(**_data)
        except Exception as e:
            logger.info(f"Error creating event request: {e}")
            return None

    async def get_event_request_by_id(
        self, *, event_request_id: str
    ) -> DBEventRequestResponse | None:
        """Get a specific event request by ID"""
        try:
            response = (
                self.event_requests.select("*")
                .eq("id", event_request_id)
                .single()
                .execute()
            )
            if not response.data:
                return None

            return DBEventRequestResponse(**response.data)
        except Exception as e:
            logger.info(f"Error fetching event request: {e}")
            return None

    async def get_user_event_requests(
        self,
        *,
        user_id: str,
        status: str | None = None,
        importance_level: int | None = None,
        start_date_from: datetime | None = None,
        start_date_to: datetime | None = None,
    ) -> list[DBEventRequestResponse]:
        """Get all event requests created by a user with optional filters"""
        try:
            query = self.event_requests.select("*").eq("created_by", user_id)

            if status:
                query = query.eq("status", status)
            if importance_level:
                query = query.eq("importance_level", importance_level)
            if start_date_from:
                query = query.gte("start_date", start_date_from.isoformat())
            if start_date_to:
                query = query.lte("start_date", start_date_to.isoformat())

            response = query.order("start_date").execute()
            if not response.data:
                return []

            return [DBEventRequestResponse(**item) for item in response.data]
        except Exception as e:
            logger.info(f"Error fetching user event requests: {e}")
            return []

    async def get_all_event_requests(
        self,
        *,
        status: str | None = None,
        importance_level: int | None = None,
        start_date_from: datetime | None = None,
        start_date_to: datetime | None = None,
        created_by: str | None = None,
    ) -> list[DBEventRequestResponse]:
        """Get all event requests with optional filters"""
        try:
            query = self.event_requests.select("*")

            if status:
                query = query.eq("status", status)
            if importance_level:
                query = query.eq("importance_level", importance_level)
            if start_date_from:
                query = query.gte("start_date", start_date_from.isoformat())
            if start_date_to:
                query = query.lte("start_date", start_date_to.isoformat())
            if created_by:
                query = query.eq("created_by", created_by)

            response = query.order("start_date").execute()
            if not response.data:
                return []

            return [DBEventRequestResponse(**item) for item in response.data]
        except Exception as e:
            logger.info(f"Error fetching all event requests: {e}")
            return []

    async def update_event_request(
        self,
        *,
        event_request_id: str,
        google_event_id: str | None = None,
        location: str | None = None,
        description: str | None = None,
        start_date: datetime | None = None,
        end_date: datetime | None = None,
        importance_level: int | None = None,
        status: str | None = None,
        notes: str | None = None,
    ) -> DBEventRequestResponse | None:
        """Update an event request"""
        try:
            update_data = {"updated_at": datetime.now().isoformat()}

            if google_event_id is not None:
                update_data["google_event_id"] = google_event_id
            if location is not None:
                update_data["location"] = location
            if description is not None:
                update_data["description"] = description
            if start_date is not None:
                update_data["start_date"] = start_date.isoformat()
            if end_date is not None:
                update_data["end_date"] = end_date.isoformat()
            if importance_level is not None:
                update_data["importance_level"] = importance_level
            if status is not None:
                update_data["status"] = status
            if notes is not None:
                update_data["notes"] = notes

            response = (
                self.event_requests.update(update_data)
                .eq("id", event_request_id)
                .execute()
            )
            if not response.data:
                return None

            return DBEventRequestResponse(**response.data[0])
        except Exception as e:
            logger.info(f"Error updating event request: {e}")
            return None

    async def delete_event_request(self, *, event_request_id: str) -> bool:
        """Delete an event request"""
        try:
            response = self.event_requests.delete().eq("id", event_request_id).execute()
            return response.data is not None and len(response.data) > 0
        except Exception as e:
            logger.info(f"Error deleting event request: {e}")
            return False

    async def get_event_request_by_google_id(
        self, *, google_event_id: str
    ) -> DBEventRequestResponse | None:
        """Get an event request by Google Calendar event ID"""
        try:
            response = (
                self.event_requests.select("*")
                .eq("google_event_id", google_event_id)
                .single()
                .execute()
            )
            if not response.data:
                return None

            return DBEventRequestResponse(**response.data)
        except Exception as e:
            logger.info(f"Error fetching event request by Google ID: {e}")
            return None
