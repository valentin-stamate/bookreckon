locals {
  config = yamldecode(file("${path.module}/../config.yaml"))
}