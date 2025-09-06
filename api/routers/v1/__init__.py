from fastapi import APIRouter, Depends
from api.settings import auth
from api.routers.v1 import events

protected_router = APIRouter(
    dependencies=[Depends(auth.verify_jwt)],
    responses={401: {"description": "Unauthorized"}},
)
protected_router.include_router(events.router)

unprotected_router = APIRouter()

# Create v1 API router
v1_router = APIRouter(prefix="/api/v1")

# Include all routers (auth is handled separately as unprotected)

v1_router.include_router(unprotected_router)
v1_router.include_router(protected_router)

