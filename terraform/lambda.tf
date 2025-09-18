resource "aws_iam_role" "lambda_role" {
  name = "amia-api-lambda-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# IAM policy for Lambda to access Secrets Manager
resource "aws_iam_role_policy" "lambda_secrets_policy" {
  name = "amia-lambda-secrets-policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue",
          "secretsmanager:DescribeSecret"
        ]
        Resource = [
          aws_secretsmanager_secret.api_secrets.arn
        ]
      }
    ]
  })
}


# Secrets Manager secret for API configuration
resource "aws_secretsmanager_secret" "api_secrets" {
  name        = "amia-api-secrets"
  description = "Secrets for the Amia API Lambda function"

  tags = local.tags
}

# Secret version with actual values
resource "aws_secretsmanager_secret_version" "api_secrets_version" {
  secret_id = aws_secretsmanager_secret.api_secrets.id
  secret_string = jsonencode({
    "OPENAI_API_KEY" = openai_project_service_account.amia.api_key
  })
}

resource "aws_lambda_function" "api" {
  function_name = "amia-api"
  role          = aws_iam_role.lambda_role.arn
  image_uri     = var.api_image_uri
  package_type  = "Image"
  timeout       = 30  # 30 seconds timeout
  memory_size   = 512 # 512 MB memory

  environment {
    variables = {
      SECRETS_MANAGER_SECRET_NAME = aws_secretsmanager_secret.api_secrets.name
      ENVIRONMENT                 = "prod"
    }
  }
}