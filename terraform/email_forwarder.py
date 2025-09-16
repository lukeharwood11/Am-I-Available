import json
import boto3
import os
import email
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import logging

# Set up logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize AWS clients
s3_client = boto3.client('s3')
ses_client = boto3.client('ses')

def handler(event, context):
    """
    Lambda function to forward emails received via SES to the admin email.
    This function is triggered by SES receipt rules.
    """
    try:
        # Parse the SES event
        logger.info(f"Received event: {json.dumps(event)}")
        
        for record in event['Records']:
            # Extract SES mail information
            ses_mail = record['ses']['mail']
            message_id = ses_mail['messageId']
            
            # Get the email content from S3
            bucket_name = os.environ['BUCKET_NAME']
            object_key = f"incoming/{message_id}"
            
            logger.info(f"Retrieving email from S3: {bucket_name}/{object_key}")
            
            # Download the email from S3
            response = s3_client.get_object(Bucket=bucket_name, Key=object_key)
            raw_email = response['Body'].read()
            
            # Parse the email
            parsed_email = email.message_from_bytes(raw_email)
            
            # Extract email details
            from_address = parsed_email.get('From', 'Unknown Sender')
            subject = parsed_email.get('Subject', 'No Subject')
            to_address = parsed_email.get('To', 'amia@amiavailable.com')
            date = parsed_email.get('Date', 'Unknown Date')
            
            # Get email body
            body = ""
            if parsed_email.is_multipart():
                for part in parsed_email.walk():
                    if part.get_content_type() == "text/plain":
                        body = part.get_payload(decode=True).decode('utf-8', errors='ignore')
                        break
                    elif part.get_content_type() == "text/html":
                        body = part.get_payload(decode=True).decode('utf-8', errors='ignore')
            else:
                body = parsed_email.get_payload(decode=True).decode('utf-8', errors='ignore')
            
            # Create forwarded email
            admin_email = os.environ['ADMIN_EMAIL']
            
            # Create the forwarded message
            forwarded_subject = f"[AMIA Email] {subject}"
            forwarded_body = f"""
You received an email to amia@amiavailable.com

From: {from_address}
To: {to_address}
Date: {date}
Subject: {subject}

Message:
{body}

---
This email was automatically forwarded from amia@amiavailable.com
Original Message ID: {message_id}
            """.strip()
            
            # Send the forwarded email
            logger.info(f"Forwarding email to: {admin_email}")
            
            ses_response = ses_client.send_email(
                Source='amia@amiavailable.com',
                Destination={'ToAddresses': [admin_email]},
                Message={
                    'Subject': {'Data': forwarded_subject},
                    'Body': {
                        'Text': {'Data': forwarded_body}
                    }
                }
            )
            
            logger.info(f"Email forwarded successfully. MessageId: {ses_response['MessageId']}")
        
        return {
            'statusCode': 200,
            'body': json.dumps('Email forwarded successfully')
        }
        
    except Exception as e:
        logger.error(f"Error forwarding email: {str(e)}")
        # Don't raise the exception to avoid bouncing the email
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error forwarding email: {str(e)}')
        }
