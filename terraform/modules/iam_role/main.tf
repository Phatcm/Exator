resource "aws_iam_role" "iam_role" {
    name = var.iam_role_name
    assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
    EOF
}

resource "aws_iam_role_policy_attachment" "iam_role_policies" {
  for_each = toset(var.policies_list)

  role = aws_iam_role.iam_role.name
  policy_arn = each.value
}
