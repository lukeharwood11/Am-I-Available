resource "aws_ses_domain_identity" "amia_domain_identity" {
  domain = local.domain_name
}

resource "aws_ses_domain_dkim" "amia_domain_dkim" {
  domain = aws_ses_domain_identity.amia_domain_identity.domain
}

resource "aws_ses_domain_identity_verification" "amia_domain_identity_verification" {
  domain = aws_ses_domain_identity.amia_domain_identity.domain
}

# Combined TXT Record for SES Domain Verification and SPF
resource "aws_route53_record" "amia_domain_txt" {
  zone_id         = data.aws_route53_zone.main.zone_id
  name            = aws_ses_domain_identity.amia_domain_identity.domain
  type            = "TXT"
  ttl             = "3600"
  allow_overwrite = true
  records = [
    aws_ses_domain_identity.amia_domain_identity.verification_token,
    aws_ses_domain_identity.amia_domain_identity_us_east_1.verification_token,
    "v=spf1 include:amazonses.com ~all"
  ]
}

resource "aws_route53_record" "amia_domain_mx" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = aws_ses_domain_identity.amia_domain_identity.domain
  type    = "MX"
  ttl     = "3600"
  records = ["10 inbound-smtp.us-east-1.amazonaws.com"]
}

resource "aws_ses_domain_mail_from" "amia_domain_mail_from" {
  domain           = aws_ses_domain_identity.amia_domain_identity.domain
  mail_from_domain = "mail.${aws_ses_domain_identity.amia_domain_identity.domain}"
}

resource "aws_route53_record" "amia_dkim_records" {
  count   = 3
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "${aws_ses_domain_dkim.amia_domain_dkim.dkim_tokens[count.index]}._domainkey"
  type    = "CNAME"
  ttl     = "3600"
  records = ["${aws_ses_domain_dkim.amia_domain_dkim.dkim_tokens[count.index]}.dkim.amazonses.com"]
}

# DKIM records for us-east-1 (for email receiving)
resource "aws_route53_record" "amia_dkim_records_us_east_1" {
  count   = 3
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "${aws_ses_domain_dkim.amia_domain_dkim_us_east_1.dkim_tokens[count.index]}._domainkey"
  type    = "CNAME"
  ttl     = "3600"
  records = ["${aws_ses_domain_dkim.amia_domain_dkim_us_east_1.dkim_tokens[count.index]}.dkim.amazonses.com"]
}

resource "aws_route53_record" "amia_mail_from_mx" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = aws_ses_domain_mail_from.amia_domain_mail_from.mail_from_domain
  type    = "MX"
  ttl     = "3600"
  records = ["10 feedback-smtp.${local.region}.amazonses.com"]
}

# SPF record for custom MAIL FROM domain
resource "aws_route53_record" "amia_mail_from_spf" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = aws_ses_domain_mail_from.amia_domain_mail_from.mail_from_domain
  type    = "TXT"
  ttl     = "3600"
  records = ["v=spf1 include:amazonses.com ~all"]
}

# DMARC record for main domain
resource "aws_route53_record" "amia_dmarc" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "_dmarc.${aws_ses_domain_identity.amia_domain_identity.domain}"
  type    = "TXT"
  ttl     = "3600"
  records = ["v=DMARC1; p=quarantine; rua=mailto:dmarc@${aws_ses_domain_identity.amia_domain_identity.domain}; ruf=mailto:dmarc@${aws_ses_domain_identity.amia_domain_identity.domain}; fo=1"]
}

resource "aws_iam_policy" "amia_ses_policy" {
  name = "amia_ses_policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "ses:SendEmail"
        Resource = "arn:aws:ses:${local.region}:${local.account_id}:identity/${aws_ses_domain_identity.amia_domain_identity.domain}"
      }
    ]
  })
}


// s3 bucket for incoming emails

resource "aws_s3_bucket" "amia_email_bucket" {
  bucket = "email.amiavailable.com"
  tags   = local.tags
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_policy" "amia_email_bucket_policy" {
  bucket = aws_s3_bucket.amia_email_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject"
        ]
        Resource = "arn:aws:s3:::email.amiavailable.com/*"
        Principal = {
          Service = "ses.amazonaws.com"
        }
        Condition = {
          StringEquals = {
            "AWS:SourceAccount" = local.account_id
          }
        }
      }
    ]
  })
}

# SES Domain Identity for email receiving (must be in us-east-1)
resource "aws_ses_domain_identity" "amia_domain_identity_us_east_1" {
  provider = aws.us_east_1
  domain   = local.domain_name
}

# Domain verification for us-east-1
resource "aws_ses_domain_identity_verification" "amia_domain_identity_verification_us_east_1" {
  provider = aws.us_east_1
  domain   = aws_ses_domain_identity.amia_domain_identity_us_east_1.domain
}

# DKIM for us-east-1
resource "aws_ses_domain_dkim" "amia_domain_dkim_us_east_1" {
  provider = aws.us_east_1
  domain   = aws_ses_domain_identity.amia_domain_identity_us_east_1.domain
}

# Receipt rule to handle emails sent to amia@amiavailable.com
# Add to existing INBOUND_MAIL rule set in us-east-1
resource "aws_ses_receipt_rule" "amia_catch_all_rule" {
  provider      = aws.us_east_1
  name          = "amia-emails"
  rule_set_name = "INBOUND_MAIL"
  recipients    = ["amia@amiavailable.com"]
  enabled       = true
  scan_enabled  = false
  after         = "m-184cb351d99d46eab737badfa7b19f89" # Add after existing WorkMail rule

  s3_action {
    bucket_name       = aws_s3_bucket.amia_email_bucket.bucket
    object_key_prefix = "incoming/"
    position          = 1
  }

  depends_on = [
    aws_s3_bucket_policy.amia_email_bucket_policy,
    aws_ses_domain_identity_verification.amia_domain_identity_verification_us_east_1
  ]
}