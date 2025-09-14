from ..settings.database import get_supabase_admin_client
from supabase import Client
from pydantic import BaseModel
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class DBRelationshipResponse(BaseModel):
    id: str
    user_id_1: str
    user_id_2: str
    created_at: datetime
    updated_at: datetime


class RelationshipsDatabridge:
    def __init__(self, supabase: Client):
        self.supabase = supabase
        self.relationships = self.supabase.table('relationships')
    
    async def create_relationship(
        self, 
        *, 
        user_id_1: str, 
        user_id_2: str
    ) -> DBRelationshipResponse | None:
        """Create a new relationship between two users"""
        try:
            data = {
                'user_id_1': user_id_1,
                'user_id_2': user_id_2
            }
            
            response = self.relationships.insert(data).execute()
            if not response.data:
                return None
            
            _data = response.data[0]
            return DBRelationshipResponse(**_data)
        except Exception as e:
            logger.info(f"Error creating relationship: {e}")
            return None
    
    async def get_relationship_by_id(self, *, relationship_id: str) -> DBRelationshipResponse | None:
        """Get a specific relationship by ID"""
        try:
            response = self.relationships.select('*').eq('id', relationship_id).single().execute()
            if not response.data:
                return None
            
            return DBRelationshipResponse(**response.data)
        except Exception as e:
            logger.info(f"Error fetching relationship: {e}")
            return None
    
    async def get_user_relationships(
        self, 
        *, 
        user_id: str
    ) -> list[DBRelationshipResponse]:
        """Get all relationships for a user with optional filters"""
        try:
            query = self.relationships.select('*').or_(f'user_id_1.eq.{user_id},user_id_2.eq.{user_id}')
            
            response = query.execute()
            if not response.data:
                return []
            
            return [DBRelationshipResponse(**item) for item in response.data]
        except Exception as e:
            logger.info(f"Error fetching user relationships: {e}")
            return []
    
    async def update_relationship(
        self, 
        *, 
        relationship_id: str
    ) -> DBRelationshipResponse | None:
        """Update a relationship"""
        try:
            update_data = {'updated_at': datetime.now().isoformat()}
            
            response = self.relationships.update(update_data).eq('id', relationship_id).execute()
            if not response.data:
                return None
            
            return DBRelationshipResponse(**response.data[0])
        except Exception as e:
            logger.info(f"Error updating relationship: {e}")
            return None
    
    async def delete_relationship(self, *, relationship_id: str) -> bool:
        """Delete a relationship"""
        try:
            response = self.relationships.delete().eq('id', relationship_id).execute()
            return response.data is not None and len(response.data) > 0
        except Exception as e:
            logger.info(f"Error deleting relationship: {e}")
            return False
    
    async def check_existing_relationship(
        self, 
        *, 
        user_id_1: str, 
        user_id_2: str
    ) -> DBRelationshipResponse | None:
        """Check if a relationship already exists between two users"""
        try:
            response = self.relationships.select('*').or_(
                f'and(user_id_1.eq.{user_id_1},user_id_2.eq.{user_id_2}),'
                f'and(user_id_1.eq.{user_id_2},user_id_2.eq.{user_id_1})'
            ).execute()
            
            if not response.data:
                return None
            
            return DBRelationshipResponse(**response.data[0])
        except Exception as e:
            logger.info(f"Error checking existing relationship: {e}")
            return None
