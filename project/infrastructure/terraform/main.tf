module "vpc" {
  source = "./modules/vpc"

  cidr_range         = local.env["vpc"]["cidr_range"]
  availability_zones = local.env["vpc"]["availability_zones"]
  private_subnets    = local.env["vpc"]["private_subnets"]
  public_subnets     = local.env["vpc"]["public_subnets"]
  # database_subnets = local.env["vpc"]["database_subnets"]
  cluster_name = module.eks.cluster_name
  # cluster_name = "bookrecon-prod-terraform-eks"
  tags         = local.env["tags"]
}

module "eks" {
  source = "./modules/eks"

  public_subnets = module.vpc.public_subnets
  vpc_id         = module.vpc.vpc_id
  cidr_range     = local.env["vpc"]["cidr_range"]
  tags           = local.env["tags"]
}

module "aws_secrets" {
  source = "./modules/secrets"

  tags = local.env["tags"]
}

module "ecr" {
  source = "./modules/ecr"

  tags = local.env["tags"]
}

module "rds" {
  source = "./modules/rds"

  vpc_id           = module.vpc.vpc_id
  cidr_range       = local.env["vpc"]["cidr_range"]
  private_subnets  = module.vpc.private_subnets
  tags             = local.env["tags"]
}
