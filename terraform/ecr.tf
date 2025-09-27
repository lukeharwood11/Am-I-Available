data "aws_ecr_repository" "amia_api" {
  name = "amia/api"
}


resource "aws_ecr_lifecycle_policy" "amia_api" {
  repository = data.aws_ecr_repository.amia_api.name
  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep only the latest 5 images"
        selection = {
          tagStatus      = "tagged"
          tagPatternList = ["*"]
          countType      = "imageCountMoreThan"
          countNumber    = 5
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}
