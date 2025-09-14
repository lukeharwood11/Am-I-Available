import boto3
from botocore.exceptions import ClientError
from fastapi import HTTPException

import api.models.v1.emails as emails


class EmailsService:
    def __init__(self):
        self.ses_client = boto3.client("ses", region_name="us-east-2")
        self.source_email = "amia@amiavailable.com"

    async def send_email(
        self, *, to: list[str], subject: str, body: str
    ) -> emails.SendEmailResponse:
        """Send an email using AWS SES"""
        try:
            response = self.ses_client.send_email(
                Source=self.source_email,
                Destination={"ToAddresses": to},
                Message={
                    "Subject": {"Data": subject},
                    "Body": {"Text": {"Data": body}},
                },
            )

            message_id = response.get("MessageId")
            return emails.SendEmailResponse(
                message="Email sent successfully", message_id=message_id
            )

        except ClientError as e:
            error_code = e.response["Error"]["Code"]
            error_message = e.response["Error"]["Message"]

            if error_code == "MessageRejected":
                raise HTTPException(
                    status_code=400, detail=f"Email rejected: {error_message}"
                )
            elif error_code == "MailFromDomainNotVerified":
                raise HTTPException(status_code=500, detail="Email domain not verified")
            elif error_code == "ConfigurationSetDoesNotExist":
                raise HTTPException(status_code=500, detail="Email configuration error")
            else:
                raise HTTPException(
                    status_code=500, detail=f"Failed to send email: {error_message}"
                )
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Unexpected error sending email: {str(e)}"
            )
