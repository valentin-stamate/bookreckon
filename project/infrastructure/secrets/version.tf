terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.47.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.4.3"
    }
  }

  # That's the Terraform version
  required_version = ">= v1.2.0"
}
