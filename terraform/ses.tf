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
    "v=spf1 include:amazonses.com ~all"
  ]
}

resource "aws_route53_record" "amia_domain_mx" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = aws_ses_domain_identity.amia_domain_identity.domain
  type    = "MX"
  ttl     = "3600"
  records = ["10 feedback-smtp.us-east-2.amazonses.com"]
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

resource "aws_route53_record" "amia_mail_from_mx" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = aws_ses_domain_mail_from.amia_domain_mail_from.mail_from_domain
  type    = "MX"
  ttl     = "3600"
  records = ["10 feedback-smtp.${local.region}.amazonses.com"]
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

# SES Receipt Rule Set for incoming emails
resource "aws_ses_receipt_rule_set" "amia_receipt_rule_set" {
  rule_set_name = "amia-email-rules"
}

# Set the receipt rule set as active
resource "aws_ses_active_receipt_rule_set" "amia_active_rule_set" {
  rule_set_name = aws_ses_receipt_rule_set.amia_receipt_rule_set.rule_set_name
}

# Receipt rule to handle emails sent to any address at amiavailable.com
resource "aws_ses_receipt_rule" "amia_catch_all_rule" {
  name          = "catch-all-emails"
  rule_set_name = aws_ses_receipt_rule_set.amia_receipt_rule_set.rule_set_name
  recipients    = ["amiavailable.com"]
  enabled       = true
  scan_enabled  = false // TODO: enable this later

  s3_action {
    bucket_name       = aws_s3_bucket.amia_email_bucket.bucket
    object_key_prefix = "incoming/"
    position          = 1
  }

  depends_on = [aws_s3_bucket_policy.amia_email_bucket_policy]
}