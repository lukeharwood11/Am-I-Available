from fastapi import APIRouter, Depends

import api.models.v1.emails as emails
from ...dependencies import get_emails_service
from ...services.emails_service import EmailsService

router = APIRouter(prefix="/emails", tags=["Emails"])


@router.post("", response_model=emails.SendEmailResponse)
async def send_email(
    request: emails.SendEmailRequest,
    service: EmailsService = Depends(get_emails_service),
) -> emails.SendEmailResponse:
    """Send an email via AWS SES"""
    return await service.send_email(
        to=request.to, subject=request.subject, body=request.body
    )
