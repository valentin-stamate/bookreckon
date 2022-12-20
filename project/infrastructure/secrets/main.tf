resource "random_password" "secret_key" {
  length           = 64
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "aws_secretsmanager_secret" "bookrecon_secret_key" {
  name        = "${local.tags["Inventory"]}-${local.tags["Creator"]}-${local.tags["Environment"]}-secret-key"
  description = "The secret key that will be used to encrypt BookRecon's data"
  
  tags = merge(
    local.tags,
    {
      ApplicationRole = "secret-key"
    }
  )
}

resource "aws_secretsmanager_secret_version" "bookrecon_secret_key" {
  secret_id = aws_secretsmanager_secret.bookrecon_secret_key.id
  secret_string = jsonencode({
    key = random_password.secret_key.result
  })
}