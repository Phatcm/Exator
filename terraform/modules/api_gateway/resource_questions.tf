#QUESTIONS RESOURCE
resource "aws_api_gateway_resource" "questions" {
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
    path_part   = "questions"
}

#GET
resource "aws_api_gateway_method" "get_questions" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.questions.id
    http_method   = "GET"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "get_questions_integration" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.questions.id
    http_method             = aws_api_gateway_method.get_questions.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

#PATCH
resource "aws_api_gateway_method" "patch_questions" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.questions.id
    http_method   = "PATCH"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "patch_questions_integration" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.questions.id
    http_method             = aws_api_gateway_method.patch_questions.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

#POST
resource "aws_api_gateway_method" "post_questions" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.questions.id
    http_method   = "POST"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "post_questions_integration" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.questions.id
    http_method             = aws_api_gateway_method.post_questions.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

#OPTIONS
resource "aws_api_gateway_method" "options_questions" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.questions.id
    http_method   = "OPTIONS"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "options_questions" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.questions.id
    http_method             = aws_api_gateway_method.options_questions.http_method
    integration_http_method = "OPTIONS"
    type                    = "MOCK"
    request_templates = {
        "application/json" = "{\"statusCode\": 200}"
    }
    lifecycle {
        ignore_changes = [integration_http_method]
    }
}

resource "aws_api_gateway_method_response" "options_questions" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  resource_id = aws_api_gateway_resource.questions.id
  http_method = aws_api_gateway_method.options_questions.http_method
  status_code = "200"

  //cors section
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_integration_response" "options_questions" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  resource_id = aws_api_gateway_resource.questions.id
  http_method = aws_api_gateway_method.options_questions.http_method
  status_code = aws_api_gateway_method_response.options_questions.status_code

  //cors
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" =  "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,PATCH,OPTIONS,POST,PUT,DELETE'",
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
  depends_on = [
    aws_api_gateway_method.options_questions,
    aws_api_gateway_integration.options_questions,
  ]
}