resource "random_password" "secret_key" {
  length           = 64
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "aws_secretsmanager_secret" "bookrecon_secret_key" {
  name        = "bookrecon-secret-key"
  description = "The secret key that will be used to encrypt BookRecon's data"
  tags = {
    Author    = "DevOps Team"
    Inventory = "BookRecon"
  }
}

resource "aws_secretsmanager_secret_version" "bookrecon_secret_key" {
  secret_id = aws_secretsmanager_secret.bookrecon_secret_key.id
  secret_string = jsonencode({
    key = random_password.secret_key.result
  })
}