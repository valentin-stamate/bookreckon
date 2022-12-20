resource "aws_s3_bucket" "terraform_state_s3" {
  bucket = local.env["terraform"]["s3_state_bucket"]
  force_destroy = true

  tags = merge(
    local.tags,
    {
      ApplicationRole = local.app_role
    }
  )
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state_s3" {
  bucket = aws_s3_bucket.terraform_state_s3.bucket

  # Enable server-side encryption by default
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_dynamodb_table" "terraform_locks" {
  name         = local.env["terraform"]["dynamodb_locks"]
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
    attribute {
     name = "LockID"
     type = "S"
  }

  tags = merge(
    local.tags,
    {
      ApplicationRole = local.app_role
    }
  )
}
