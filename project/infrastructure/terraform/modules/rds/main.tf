resource "aws_security_group" "rds_sg" {
  name_prefix = "${var.tags["Inventory"]}-${var.tags["Environment"]}-${var.tags["Creator"]}-${local.app_role}-sg"
  vpc_id      = var.vpc_id

  ingress {
    from_port = 3306
    to_port   = 3306
    protocol  = "tcp"

    cidr_blocks = [
      var.cidr_range,
    ]
  }

  tags = merge(var.tags,
    {
      ApplicationRole = "rds-sg"
    }
  )
}

resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "${var.tags["Inventory"]}-${var.tags["Environment"]}-${var.tags["Creator"]}-${local.app_role}-subnet-group"
  subnet_ids = var.private_subnets

  tags = merge(var.tags,
    {
      ApplicationRole = "rds-subnet-group"
    }
  )
}

module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "5.2.1"

  identifier     = "${var.tags["Inventory"]}-${var.tags["Environment"]}-${var.tags["Creator"]}-${local.app_role}"
  engine         = "postgres"
  engine_version = "14"

  instance_class    = "db.t3.micro"
  allocated_storage = 10

  db_name  = "bookrecon"
  username = "postgres"
  port     = "3306"

  iam_database_authentication_enabled = true

  # Enhanced Monitoring
  monitoring_interval    = "30"
  monitoring_role_name   = "${var.tags["Inventory"]}-${var.tags["Environment"]}-${var.tags["Creator"]}-${local.app_role}-role"
  create_monitoring_role = true

  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  multi_az               = false
  subnet_ids             = var.private_subnets

  # DB parameter group
  create_db_parameter_group = false
  family                    = "postgres14"
  major_engine_version      = "14"

  # Database Deletion Protection
  deletion_protection = false

  parameters = [
    {
      name  = "autovacuum"
      value = 1
    },
    {
      name  = "client_encoding"
      value = "utf8"
    }
  ]

  tags = merge(var.tags,
    {
      ApplicationRole = "${local.app_role}"
    }
  )
}