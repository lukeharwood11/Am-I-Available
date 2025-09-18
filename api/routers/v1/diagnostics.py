from fastapi import APIRouter
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/diagnostics", tags=["Diagnostics"])

@router.get("/health")
async def get_diagnostics():
    return {"message": "Healthy"}