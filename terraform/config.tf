terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }

    openai = {
      source = "jianyuan/openai"
      version = "0.3.2"
    }
  }

  backend "s3" {
    bucket         = "lukeharwood-dev-tfstate"
    key            = "prod/amia/terraform.tfstate"
    region         = "us-east-2"
    encrypt        = true
    dynamodb_table = "lukeharwood-dev-tf-lock"
  }
}

provider "openai" {
  admin_key = var.admin_openai_api_key
}

# Default provider for us-east-2
provider "aws" {
  region = "us-east-2"

  default_tags {
    tags = local.tags
  }
}

# Provider alias for us-east-1 
# (required for CloudFront certificates, since I'm dumb and decided to create the certificate in us-east-1)
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = local.tags
  }
}
