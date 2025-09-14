from pydantic import BaseModel


class SendEmailRequest(BaseModel):
    to: list[str]
    subject: str
    body: str


class SendEmailResponse(BaseModel):
    message: str
    message_id: str | None = None
