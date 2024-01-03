variable "iam_role_name" {
  type = string
  default = "my_iam_role"
}

variable "policies_list" {
  type = list(string)
}