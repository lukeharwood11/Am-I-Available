from fastapi import HTTPException
from datetime import datetime
from ..databridge.event_requests_databridge import (
    EventRequestsDatabridge,
    DBEventRequestResponse,
    DBEventRequestWithApprovalsResponse,
)
from ..models.v1.event_requests import (
    EventRequestData,
    EventRequestWithApprovalsData,
    EventRequestCreateResponse,
    EventRequestUpdateResponse,
    EventRequestDeleteResponse,
    EventRequestsListResponse,
    EventRequestsWithApprovalsListResponse,
    EventRequestResponse,
)


class EventRequestsService:
    def __init__(self, databridge: EventRequestsDatabridge):
        self.databridge = databridge

    def _convert_db_to_model(
        self, db_request: DBEventRequestResponse
    ) -> EventRequestData:
        """Convert database response to API model"""
        return EventRequestData(
            id=db_request.id,
            google_event_id=db_request.google_event_id,
            title=db_request.title,
            location=db_request.location,
            description=db_request.description,
            start_date=db_request.start_date,
            end_date=db_request.end_date,
            importance_level=db_request.importance_level,
            status=db_request.status,
            notes=db_request.notes,
            created_by=db_request.created_by,
            created_at=db_request.created_at,
            updated_at=db_request.updated_at,
        )

    def _convert_db_with_approvals_to_model(
        self, db_request: DBEventRequestWithApprovalsResponse
    ) -> EventRequestWithApprovalsData:
        """Convert database response with approvals to API model"""
        return EventRequestWithApprovalsData(
            id=db_request.id,
            google_event_id=db_request.google_event_id,
            title=db_request.title,
            location=db_request.location,
            description=db_request.description,
            start_date=db_request.start_date,
            end_date=db_request.end_date,
            importance_level=db_request.importance_level,
            status=db_request.status,
            notes=db_request.notes,
            created_by=db_request.created_by,
            created_at=db_request.created_at,
            updated_at=db_request.updated_at,
            approval_status=db_request.approval_status,
            requested_approvals=db_request.requested_approvals,
            completed_count=db_request.completed_count,
        )

    async def create_event_request(
        self,
        *,
        google_event_id: str | None,
        title: str | None,
        location: str | None,
        description: str | None,
        start_date: datetime,
        end_date: datetime,
        importance_level: int,
        notes: str | None,
        created_by: str,
    ) -> EventRequestCreateResponse:
        """Create a new event request"""
        # Validate dates
        if start_date >= end_date:
            raise HTTPException(
                status_code=400, detail="Start date must be before end date"
            )

        # Validate importance level
        if not (1 <= importance_level <= 5):
            raise HTTPException(
                status_code=400, detail="Importance level must be between 1 and 5"
            )

        # Create the event request
        db_request = await self.databridge.create_event_request(
            google_event_id=google_event_id,
            title=title,
            location=location,
            description=description,
            start_date=start_date,
            end_date=end_date,
            importance_level=importance_level,
            notes=notes,
            created_by=created_by,
        )

        if not db_request:
            raise HTTPException(
                status_code=500, detail="Failed to create event request"
            )

        request_data = self._convert_db_to_model(db_request)
        return EventRequestCreateResponse(event_request=request_data)

    async def get_event_request(self, *, event_request_id: str) -> EventRequestResponse:
        """Get a specific event request by ID"""
        db_request = await self.databridge.get_event_request_by_id(
            event_request_id=event_request_id
        )

        if not db_request:
            raise HTTPException(status_code=404, detail="Event request not found")

        request_data = self._convert_db_to_model(db_request)
        return EventRequestResponse(event_request=request_data)

    async def get_user_event_requests(
        self,
        *,
        user_id: str,
        status: str | None = None,
        importance_level: int | None = None,
        start_date_from: datetime | None = None,
        start_date_to: datetime | None = None,
    ) -> EventRequestsListResponse:
        """Get all event requests created by a user with optional filters"""
        db_requests = await self.databridge.get_user_event_requests(
            user_id=user_id,
            status=status,
            importance_level=importance_level,
            start_date_from=start_date_from,
            start_date_to=start_date_to,
        )

        requests = [self._convert_db_to_model(req) for req in db_requests]

        filters = {"created_by": user_id}
        if status:
            filters["status"] = status
        if importance_level:
            filters["importance_level"] = importance_level
        if start_date_from:
            filters["start_date_from"] = start_date_from
        if start_date_to:
            filters["start_date_to"] = start_date_to

        return EventRequestsListResponse(
            event_requests=requests, count=len(requests), filters=filters
        )

    async def get_all_event_requests(
        self,
        *,
        status: str | None = None,
        importance_level: int | None = None,
        start_date_from: datetime | None = None,
        start_date_to: datetime | None = None,
        created_by: str | None = None,
    ) -> EventRequestsListResponse:
        """Get all event requests with optional filters (admin/system use)"""
        db_requests = await self.databridge.get_all_event_requests(
            status=status,
            importance_level=importance_level,
            start_date_from=start_date_from,
            start_date_to=start_date_to,
            created_by=created_by,
        )

        requests = [self._convert_db_to_model(req) for req in db_requests]

        filters = {}
        if status:
            filters["status"] = status
        if importance_level:
            filters["importance_level"] = importance_level
        if start_date_from:
            filters["start_date_from"] = start_date_from
        if start_date_to:
            filters["start_date_to"] = start_date_to
        if created_by:
            filters["created_by"] = created_by

        return EventRequestsListResponse(
            event_requests=requests,
            count=len(requests),
            filters=filters if filters else None,
        )

    async def update_event_request(
        self,
        *,
        event_request_id: str,
        user_id: str,
        google_event_id: str | None = None,
        title: str | None = None,
        location: str | None = None,
        description: str | None = None,
        start_date: datetime | None = None,
        end_date: datetime | None = None,
        importance_level: int | None = None,
        status: str | None = None,
        notes: str | None = None,
    ) -> EventRequestUpdateResponse:
        """Update an event request"""
        # First verify the request exists and user has permission
        existing = await self.databridge.get_event_request_by_id(
            event_request_id=event_request_id
        )

        if not existing:
            raise HTTPException(status_code=404, detail="Event request not found")

        # Check if user has permission to update this request
        if existing.created_by != user_id:
            raise HTTPException(
                status_code=403,
                detail="You don't have permission to update this event request",
            )

        # Validate dates if provided
        if start_date and end_date and start_date >= end_date:
            raise HTTPException(
                status_code=400, detail="Start date must be before end date"
            )

        # Validate start_date with existing end_date
        if start_date and not end_date and start_date >= existing.end_date:
            raise HTTPException(
                status_code=400, detail="Start date must be before existing end date"
            )

        # Validate end_date with existing start_date
        if end_date and not start_date and existing.start_date >= end_date:
            raise HTTPException(
                status_code=400, detail="End date must be after existing start date"
            )

        # Validate importance level if provided
        if importance_level is not None and not (1 <= importance_level <= 5):
            raise HTTPException(
                status_code=400, detail="Importance level must be between 1 and 5"
            )

        # Update the request
        db_request = await self.databridge.update_event_request(
            event_request_id=event_request_id,
            google_event_id=google_event_id,
            title=title,
            location=location,
            description=description,
            start_date=start_date,
            end_date=end_date,
            importance_level=importance_level,
            status=status,
            notes=notes,
        )

        if not db_request:
            raise HTTPException(
                status_code=500, detail="Failed to update event request"
            )

        request_data = self._convert_db_to_model(db_request)
        return EventRequestUpdateResponse(event_request=request_data)

    async def delete_event_request(
        self, *, event_request_id: str, user_id: str
    ) -> EventRequestDeleteResponse:
        """Delete an event request"""
        # First verify the request exists and user has permission
        existing = await self.databridge.get_event_request_by_id(
            event_request_id=event_request_id
        )

        if not existing:
            raise HTTPException(status_code=404, detail="Event request not found")

        # Check if user has permission to delete this request
        if existing.created_by != user_id:
            raise HTTPException(
                status_code=403,
                detail="You don't have permission to delete this event request",
            )

        # Delete the request
        success = await self.databridge.delete_event_request(
            event_request_id=event_request_id
        )

        if not success:
            raise HTTPException(
                status_code=500, detail="Failed to delete event request"
            )

        return EventRequestDeleteResponse()

    async def approve_event_request(
        self, *, event_request_id: str, user_id: str
    ) -> EventRequestUpdateResponse:
        """Approve a pending event request"""
        return await self.update_event_request(
            event_request_id=event_request_id, user_id=user_id, status="approved"
        )

    async def reject_event_request(
        self, *, event_request_id: str, user_id: str
    ) -> EventRequestUpdateResponse:
        """Reject a pending event request"""
        return await self.update_event_request(
            event_request_id=event_request_id, user_id=user_id, status="rejected"
        )

    async def get_event_request_by_google_id(
        self, *, google_event_id: str
    ) -> EventRequestResponse:
        """Get an event request by Google Calendar event ID"""
        db_request = await self.databridge.get_event_request_by_google_id(
            google_event_id=google_event_id
        )

        if not db_request:
            raise HTTPException(
                status_code=404,
                detail="Event request not found for this Google Calendar event",
            )

        request_data = self._convert_db_to_model(db_request)
        return EventRequestResponse(event_request=request_data)

    async def list_event_requests_with_approvals(
        self,
        *,
        user_id: str,
        status: str | None = None,
        skip: int = 0,
        take: int = 50,
    ) -> EventRequestsWithApprovalsListResponse:
        """List event requests with approval status aggregation"""
        db_requests = await self.databridge.list_event_requests_with_approvals(
            user_id=user_id,
            status=status,
            skip=skip,
            take=take,
        )

        requests = [self._convert_db_with_approvals_to_model(req) for req in db_requests]
        
        # Get total count from the first item if available
        total_count = db_requests[0].total_count if db_requests else 0

        filters = {}
        if status:
            filters["status"] = status

        return EventRequestsWithApprovalsListResponse(
            event_requests=requests,
            count=len(requests),
            total_count=total_count,
            skip=skip,
            take=take,
            filters=filters if filters else None,
        )
