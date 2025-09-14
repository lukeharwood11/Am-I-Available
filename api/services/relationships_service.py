from fastapi import HTTPException
from ..databridge.relationships_databridge import RelationshipsDatabridge, DBRelationshipResponse
from ..models.v1.relationships import (
    RelationshipData,
    RelationshipCreateResponse,
    RelationshipUpdateResponse,
    RelationshipDeleteResponse,
    RelationshipsListResponse,
    RelationshipResponse
)


class RelationshipsService:
    def __init__(self, databridge: RelationshipsDatabridge):
        self.databridge = databridge
    
    def _convert_db_to_model(self, db_relationship: DBRelationshipResponse) -> RelationshipData:
        """Convert database response to API model"""
        return RelationshipData(
            id=db_relationship.id,
            user_id_1=db_relationship.user_id_1,
            user_id_2=db_relationship.user_id_2,
            created_at=db_relationship.created_at,
            updated_at=db_relationship.updated_at
        )
    
    async def create_relationship(
        self, 
        *, 
        user_id_1: str, 
        user_id_2: str
    ) -> RelationshipCreateResponse:
        """Create a new relationship between two users"""
        # Check if relationship already exists
        existing = await self.databridge.check_existing_relationship(
            user_id_1=user_id_1, 
            user_id_2=user_id_2
        )
        
        if existing:
            raise HTTPException(
                status_code=400, 
                detail="Relationship already exists between these users"
            )
        
        # Create the relationship
        db_relationship = await self.databridge.create_relationship(
            user_id_1=user_id_1,
            user_id_2=user_id_2
        )
        
        if not db_relationship:
            raise HTTPException(
                status_code=500, 
                detail="Failed to create relationship"
            )
        
        relationship_data = self._convert_db_to_model(db_relationship)
        return RelationshipCreateResponse(relationship=relationship_data)
    
    async def get_relationship(self, *, relationship_id: str) -> RelationshipResponse:
        """Get a specific relationship by ID"""
        db_relationship = await self.databridge.get_relationship_by_id(
            relationship_id=relationship_id
        )
        
        if not db_relationship:
            raise HTTPException(
                status_code=404, 
                detail="Relationship not found"
            )
        
        relationship_data = self._convert_db_to_model(db_relationship)
        return RelationshipResponse(relationship=relationship_data)
    
    async def get_user_relationships(
        self, 
        *, 
        user_id: str
    ) -> RelationshipsListResponse:
        """Get all relationships for a user with optional filters"""
        print(self.databridge)
        db_relationships = await self.databridge.get_user_relationships(
            user_id=user_id
        )
        
        relationships = [self._convert_db_to_model(rel) for rel in db_relationships]
        
        return RelationshipsListResponse(
            relationships=relationships,
            count=len(relationships),
            filters=None
        )
    
    async def update_relationship(
        self, 
        *, 
        relationship_id: str, 
        user_id: str
    ) -> RelationshipUpdateResponse:
        """Update a relationship"""
        # First verify the relationship exists and user has permission
        existing = await self.databridge.get_relationship_by_id(
            relationship_id=relationship_id
        )
        
        if not existing:
            raise HTTPException(
                status_code=404, 
                detail="Relationship not found"
            )
        
        # Check if user is part of this relationship
        if existing.user_id_1 != user_id and existing.user_id_2 != user_id:
            raise HTTPException(
                status_code=403, 
                detail="You don't have permission to update this relationship"
            )
        
        # Update the relationship
        db_relationship = await self.databridge.update_relationship(
            relationship_id=relationship_id
        )
        
        if not db_relationship:
            raise HTTPException(
                status_code=500, 
                detail="Failed to update relationship"
            )
        
        relationship_data = self._convert_db_to_model(db_relationship)
        return RelationshipUpdateResponse(relationship=relationship_data)
    
    async def delete_relationship(
        self, 
        *, 
        relationship_id: str, 
        user_id: str
    ) -> RelationshipDeleteResponse:
        """Delete a relationship"""
        # First verify the relationship exists and user has permission
        existing = await self.databridge.get_relationship_by_id(
            relationship_id=relationship_id
        )
        
        if not existing:
            raise HTTPException(
                status_code=404, 
                detail="Relationship not found"
            )
        
        # Check if user is part of this relationship
        if existing.user_id_1 != user_id and existing.user_id_2 != user_id:
            raise HTTPException(
                status_code=403, 
                detail="You don't have permission to delete this relationship"
            )
        
        # Delete the relationship
        success = await self.databridge.delete_relationship(
            relationship_id=relationship_id
        )
        
        if not success:
            raise HTTPException(
                status_code=500, 
                detail="Failed to delete relationship"
            )
        
        return RelationshipDeleteResponse()
    
