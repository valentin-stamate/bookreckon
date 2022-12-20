# Infrastructure

What's in here are Terraform modules (which will be instantiated in order to be used), needed for the
infrastructure of BookRecon.

## How to get it running
- In that order, for each folder, starting with `init`,
```bash
# What this does is initializing the Terraform module in order to be instantiated.
# More precisely, it will download all the required providers that the module needs.
# If you change the version of one provider, you will need to remove the old .terraform folder
# and .terraform.lock.hcl file. This can be achieved easily by: `rm -rf .terra*`
# But probably you won't need to run `terraform init` twice. Just keep that in mind.
# --------------
$ terraform init
# --------------

# That's optional. It shows you what it will do. The next command (after `terraform plan`) will also
# show you the plan and it will ask if you want to continue by applying that plan.
# --------------
$ terraform plan
# --------------

# This is the command that actually instantiates the module.
# After you successfully apply the module, Terraform will keep track of the changes that occur
# on the resources created.
# ---------------
$ terraform apply
# ---------------
```
