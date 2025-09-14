# resource "aws_iam_role" "lambda_role" {
#     name = "amia-api-lambda-role"
#     assume_role_policy = jsonencode({
#         Version = "2012-10-17"
#         Statement = [
#             {
#                 Action = "sts:AssumeRole"
#                 Effect = "Allow"
#                 Principal = {
#                     Service = "lambda.amazonaws.com"
#                 }
#             }
#         ]
#     })
# }


# resource "aws_lambda_function" "api" {
#     function_name = "amia-api"
#     role = aws_iam_role.lambda_role.arn
#     image_uri = var.api_image_uri
#     package_type = "Image"
#     environment {
#         variables = {
#             AWS_REGION = "us-east-2"
#         }
#     }
# }