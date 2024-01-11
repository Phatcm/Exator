# Question resource
resource "aws_api_gateway_resource" "question" {
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
    path_part   = "question"
}

resource "aws_api_gateway_method" "get_question" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.question.id
    http_method   = "GET"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "get_question_integration" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.question.id
    http_method             = aws_api_gateway_method.get_question.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

resource "aws_api_gateway_method" "post_question" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.question.id
    http_method   = "POST"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "post_question_integration" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.question.id
    http_method             = aws_api_gateway_method.post_question.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

resource "aws_api_gateway_method" "patch_question" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.question.id
    http_method   = "PATCH"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "patch_question_integration" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.question.id
    http_method             = aws_api_gateway_method.patch_question.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

resource "aws_api_gateway_method" "delete_question" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.question.id
    http_method   = "DELETE"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "delete_question_integration" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.question.id
    http_method             = aws_api_gateway_method.delete_question.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}