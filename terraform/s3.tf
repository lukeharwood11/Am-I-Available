resource "aws_s3_bucket" "content_bucket" {
  bucket = "content.amiavailable.com"
  tags   = local.tags
}

resource "aws_s3_bucket" "spa_bucket" {
  bucket = "amiavailable.com"
  tags   = local.tags
}

resource "aws_s3_bucket_website_configuration" "spa_bucket_website" {
  bucket = aws_s3_bucket.spa_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "null_resource" "spa_bucket_file_upload" {
  triggers = {
    always_run = timestamp()
  }

  provisioner "local-exec" {
    command = "aws s3 sync ../dist/ s3://${aws_s3_bucket.spa_bucket.id} --delete"
  }

  depends_on = [aws_s3_bucket_website_configuration.spa_bucket_website]
}