locals {
  env = yamldecode(file("${path.module}/../env.yaml"))
  tags = local.env["tags"]
  app_role = "terraform-state"
}