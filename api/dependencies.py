"""
FastAPI dependencies for the AMIA API.

This module contains all dependency injection functions used throughout the API.
Dependencies are organized by layer: databridges and services.
"""

from fastapi import Depends
from .settings.database import get_supabase_admin_client
from supabase import Client

# Import all databridges
from .databridge.relationships_databridge import RelationshipsDatabridge
from .databridge.relationship_metadata_databridge import RelationshipMetadataDatabridge
from .databridge.relationship_requests_databridge import RelationshipRequestsDatabridge
from .databridge.event_requests_databridge import EventRequestsDatabridge
from .databridge.event_request_approvals_databridge import (
    EventRequestApprovalsDatabridge,
)
from .databridge.user_token_databridge import UserTokenDatabridge

# Import all services
from .services.relationships_service import RelationshipsService
from .services.relationship_metadata_service import RelationshipMetadataService
from .services.relationship_requests_service import RelationshipRequestsService
from .services.event_requests_service import EventRequestsService
from .services.event_request_approvals_service import EventRequestApprovalsService
from .services.google_events_service import GoogleEventsService
from .services.emails_service import EmailsService


# Databridge Dependencies
def get_relationships_databridge(
    supabase: Client = Depends(get_supabase_admin_client),
) -> RelationshipsDatabridge:
    """Dependency to get relationships databridge instance"""
    return RelationshipsDatabridge(supabase=supabase)


def get_relationship_metadata_databridge(
    supabase: Client = Depends(get_supabase_admin_client),
) -> RelationshipMetadataDatabridge:
    """Dependency to get relationship metadata databridge instance"""
    return RelationshipMetadataDatabridge(supabase=supabase)


def get_relationship_requests_databridge(
    supabase: Client = Depends(get_supabase_admin_client),
) -> RelationshipRequestsDatabridge:
    """Dependency to get relationship requests databridge instance"""
    return RelationshipRequestsDatabridge(supabase=supabase)


def get_event_requests_databridge(
    supabase: Client = Depends(get_supabase_admin_client),
) -> EventRequestsDatabridge:
    """Dependency to get event requests databridge instance"""
    return EventRequestsDatabridge(supabase=supabase)


def get_event_request_approvals_databridge(
    supabase: Client = Depends(get_supabase_admin_client),
) -> EventRequestApprovalsDatabridge:
    """Dependency to get event request approvals databridge instance"""
    return EventRequestApprovalsDatabridge(supabase=supabase)


def get_user_token_databridge(
    supabase: Client = Depends(get_supabase_admin_client),
) -> UserTokenDatabridge:
    """Dependency to get user token databridge instance"""
    return UserTokenDatabridge(supabase=supabase)


# Service Dependencies
def get_relationships_service(
    databridge: RelationshipsDatabridge = Depends(get_relationships_databridge),
) -> RelationshipsService:
    """Dependency to get relationships service instance"""
    return RelationshipsService(databridge=databridge)


def get_relationship_metadata_service(
    databridge: RelationshipMetadataDatabridge = Depends(
        get_relationship_metadata_databridge
    ),
) -> RelationshipMetadataService:
    """Dependency to get relationship metadata service instance"""
    return RelationshipMetadataService(databridge=databridge)


def get_relationship_requests_service(
    databridge: RelationshipRequestsDatabridge = Depends(
        get_relationship_requests_databridge
    ),
    relationships_service: RelationshipsService = Depends(
        get_relationships_service
    )
) -> RelationshipRequestsService:
    """Dependency to get relationship requests service instance"""
    return RelationshipRequestsService(databridge=databridge, relationships_service=relationships_service)


def get_event_requests_service(
    databridge: EventRequestsDatabridge = Depends(get_event_requests_databridge),
) -> EventRequestsService:
    """Dependency to get event requests service instance"""
    return EventRequestsService(databridge=databridge)


def get_event_request_approvals_service(
    databridge: EventRequestApprovalsDatabridge = Depends(
        get_event_request_approvals_databridge
    ),
) -> EventRequestApprovalsService:
    """Dependency to get event request approvals service instance"""
    return EventRequestApprovalsService(databridge=databridge)


def get_google_events_service(
    user_token_databridge: UserTokenDatabridge = Depends(get_user_token_databridge),
) -> GoogleEventsService:
    """Dependency to get google events service instance"""
    return GoogleEventsService(user_token_databridge=user_token_databridge)


def get_emails_service() -> EmailsService:
    """Dependency to get emails service instance"""
    return EmailsService()
