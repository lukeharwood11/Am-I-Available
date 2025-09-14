from __future__ import annotations

"""
Google API client wrapper with automatic token refresh functionality

This module provides a clean abstraction for handling Google API calls with automatic
token refresh on 401 errors. It eliminates the need to manually handle token refresh
logic in every Google API function.

Usage Examples:

1. Using the decorator (recommended for new functions):

    @with_token_refresh
    async def get_user_info(client: GoogleApiClient):
        service = client.build_service("oauth2", "v2")
        return service.userinfo().get().execute()
    
    # Usage
    client = await create_google_client(access_token, refresh_token)
    user_info = await get_user_info(client)

2. Using GoogleApiClient directly:

    async def get_calendar_events(access_token: str, refresh_token: str):
        client = await create_google_client(access_token, refresh_token)
        
        try:
            service = client.build_service("calendar", "v3")
            events = service.events().list(calendarId="primary").execute()
            return events.get("items", [])
        except HttpError as error:
            if error.resp.status == 401:
                if await client.refresh_tokens():
                    # Retry the operation
                    service = client.build_service("calendar", "v3")
                    events = service.events().list(calendarId="primary").execute()
                    return events.get("items", [])
            return []

3. In class methods:

    class MyService:
        @with_token_refresh
        async def _get_data_with_client(self, client: GoogleApiClient):
            service = client.build_service("calendar", "v3")
            return service.events().list(calendarId="primary").execute()
        
        async def get_data(self, access_token: str, refresh_token: str):
            client = await create_google_client(access_token, refresh_token)
            return await self._get_data_with_client(client)

The decorator automatically handles:
- 401 authentication errors
- Token refresh attempts
- Retry logic after successful refresh
- Proper error logging
"""
import logging
from typing import Dict, Any, Callable, TypeVar, Optional, Tuple
from functools import wraps
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from ..settings.config import config

logger = logging.getLogger(__name__)

T = TypeVar("T")


class GoogleTokens:
    """Container for Google OAuth tokens"""

    def __init__(self, access_token: str, refresh_token: str | None = None):
        self.access_token = access_token
        self.refresh_token = refresh_token

    def to_dict(self) -> dict[str, str]:
        """Convert to dictionary format"""
        result = {"access_token": self.access_token}
        if self.refresh_token:
            result["refresh_token"] = self.refresh_token
        return result


class GoogleApiClient:
    """
    Wrapper around Google API client with automatic token refresh functionality
    """

    def __init__(self, tokens: GoogleTokens):
        self.tokens = tokens
        self._credentials = None

    @classmethod
    def from_tokens(
        cls, access_token: str, refresh_token: str | None = None
    ) -> "GoogleApiClient":
        """Create GoogleApiClient from tokens"""
        tokens = GoogleTokens(access_token, refresh_token)
        return cls(tokens)

    @property
    def credentials(self) -> Credentials:
        """Get or create credentials object"""
        if self._credentials is None:
            self._credentials = self._create_credentials()
        return self._credentials

    def _create_credentials(self) -> Credentials:
        """Create Google OAuth2 credentials from tokens"""
        return Credentials(
            token=self.tokens.access_token,
            refresh_token=self.tokens.refresh_token,
            token_uri="https://oauth2.googleapis.com/token",
            client_id=config.google.client_id,
            client_secret=config.google.client_secret,
            scopes=config.google.scopes.split(),
        )

    async def refresh_tokens(self) -> bool:
        """
        Refresh the access token using the refresh token

        Returns:
            True if refresh was successful, False otherwise
        """
        try:
            if not self.tokens.refresh_token:
                logger.error("No refresh token available")
                return False

            credentials = self._create_credentials()
            request = Request()
            credentials.refresh(request)

            # Update tokens
            self.tokens.access_token = credentials.token
            if credentials.refresh_token:
                self.tokens.refresh_token = credentials.refresh_token

            # Reset credentials to force recreation with new token
            self._credentials = None

            logger.info("Successfully refreshed Google access token")
            return True

        except Exception as e:
            logger.error(f"Error refreshing Google access token: {str(e)}")
            return False

    def build_service(self, service_name: str, version: str):
        """Build a Google API service client"""
        return build(service_name, version, credentials=self.credentials)


# TODO: Remove, this isn't needed since google handles this for us
def with_token_refresh(func: Callable[..., T]) -> Callable[..., T]:
    """
    Decorator that automatically handles token refresh for Google API calls.

    The decorated function should:
    1. Take a GoogleApiClient as its first argument (after self if it's a method)
    2. Return the result or None/empty list on failure
    3. The function will be retried once if a 401 error occurs and token refresh succeeds

    Usage:
        @with_token_refresh
        async def my_google_api_call(client: GoogleApiClient, other_params...):
            # Your Google API logic here
            pass
    """

    @wraps(func)
    async def wrapper(*args, **kwargs) -> T:
        # Extract the GoogleApiClient from arguments
        client = None

        # Check if first arg is GoogleApiClient
        if args and isinstance(args[0], GoogleApiClient):
            client = args[0]
        # Check if second arg is GoogleApiClient (for instance methods)
        elif len(args) > 1 and isinstance(args[1], GoogleApiClient):
            client = args[1]
        else:
            # Look for client in kwargs
            client = kwargs.get("client")

        if not isinstance(client, GoogleApiClient):
            raise ValueError(
                "Function decorated with @with_token_refresh must have a GoogleApiClient parameter"
            )

        try:
            # First attempt
            return await func(*args, **kwargs)

        except HttpError as error:
            if error.resp.status == 401:
                logger.warning("Received 401 error, attempting to refresh token")

                # Try to refresh token
                if await client.refresh_tokens():
                    logger.info("Token refreshed successfully, retrying API call")
                    try:
                        # Retry the function call
                        return await func(*args, **kwargs)
                    except Exception as retry_error:
                        logger.error(
                            f"Retry after token refresh failed: {str(retry_error)}"
                        )
                        return None
                else:
                    logger.error("Failed to refresh token")
                    return None
            else:
                # Re-raise non-401 HTTP errors
                logger.error(f"Google API error: {error}")
                return None

        except Exception as e:
            logger.error(f"Unexpected error in Google API call: {str(e)}")
            return None

    return wrapper


async def create_google_client(
    access_token: str, refresh_token: str | None = None
) -> GoogleApiClient:
    """
    Factory function to create a GoogleApiClient

    Args:
        access_token: Google access token
        refresh_token: Google refresh token (optional)

    Returns:
        GoogleApiClient instance
    """
    tokens = GoogleTokens(access_token, refresh_token)
    return GoogleApiClient(tokens)
