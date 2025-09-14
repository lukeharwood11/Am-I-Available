from ..settings.database import get_supabase_admin_client
from supabase import Client
from pydantic import BaseModel
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class DBRelationshipRequestResponse(BaseModel):
    id: str
    requester_id: str
    requested_email: str
    status: str
    created_at: datetime
    updated_at: datetime


class RelationshipRequestsDatabridge:
    def __init__(self, supabase: Client):
        self.supabase = supabase
        self.relationship_requests = self.supabase.table('relationship_requests')
    
    async def create_relationship_request(
        self, 
        *, 
        requester_id: str, 
        requested_email: str
    ) -> DBRelationshipRequestResponse | None:
        """Create a new relationship request"""
        try:
            data = {
                'requester_id': requester_id,
                'requested_email': requested_email,
                'status': 'pending'
            }
            
            response = self.relationship_requests.insert(data).execute()
            if not response.data:
                return None
            
            _data = response.data[0]
            return DBRelationshipRequestResponse(**_data)
        except Exception as e:
            logger.info(f"Error creating relationship request: {e}")
            return None
    
    async def get_relationship_request_by_id(self, *, request_id: str) -> DBRelationshipRequestResponse | None:
        """Get a specific relationship request by ID"""
        try:
            response = self.relationship_requests.select('*').eq('id', request_id).single().execute()
            if not response.data:
                return None
            
            return DBRelationshipRequestResponse(**response.data)
        except Exception as e:
            logger.info(f"Error fetching relationship request: {e}")
            return None
    
    async def get_sent_relationship_requests(
        self, 
        *, 
        requester_id: str, 
        status: str | None = None
    ) -> list[DBRelationshipRequestResponse]:
        """Get all relationship requests sent by a user"""
        try:
            query = self.relationship_requests.select('*').eq('requester_id', requester_id)
            
            if status:
                query = query.eq('status', status)
            
            response = query.execute()
            if not response.data:
                return []
            
            return [DBRelationshipRequestResponse(**item) for item in response.data]
        except Exception as e:
            logger.info(f"Error fetching sent relationship requests: {e}")
            return []
    
    async def get_received_relationship_requests(
        self, 
        *, 
        user_email: str, 
        status: str | None = None
    ) -> list[DBRelationshipRequestResponse]:
        """Get all relationship requests received by a user (by email)"""
        try:
            query = self.relationship_requests.select('*').eq('requested_email', user_email)
            
            if status:
                query = query.eq('status', status)
            
            response = query.execute()
            if not response.data:
                return []
            
            return [DBRelationshipRequestResponse(**item) for item in response.data]
        except Exception as e:
            logger.info(f"Error fetching received relationship requests: {e}")
            return []
    
    async def update_relationship_request(
        self, 
        *, 
        request_id: str, 
        status: str
    ) -> DBRelationshipRequestResponse | None:
        """Update a relationship request status"""
        try:
            update_data = {
                'status': status,
                'updated_at': datetime.now().isoformat()
            }
            
            response = self.relationship_requests.update(update_data).eq('id', request_id).execute()
            if not response.data:
                return None
            
            return DBRelationshipRequestResponse(**response.data[0])
        except Exception as e:
            logger.info(f"Error updating relationship request: {e}")
            return None
    
    async def delete_relationship_request(self, *, request_id: str) -> bool:
        """Delete a relationship request"""
        try:
            response = self.relationship_requests.delete().eq('id', request_id).execute()
            return response.data is not None and len(response.data) > 0
        except Exception as e:
            logger.info(f"Error deleting relationship request: {e}")
            return False
    
    async def check_existing_request(
        self, 
        *, 
        requester_id: str, 
        requested_email: str
    ) -> DBRelationshipRequestResponse | None:
        """Check if a relationship request already exists"""
        try:
            response = self.relationship_requests.select('*').eq('requester_id', requester_id).eq('requested_email', requested_email).execute()
            
            if not response.data:
                return None
            
            return DBRelationshipRequestResponse(**response.data[0])
        except Exception as e:
            logger.info(f"Error checking existing request: {e}")
            return None
