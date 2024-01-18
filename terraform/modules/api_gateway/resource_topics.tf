#TOPICS RESOURCE
resource "aws_api_gateway_resource" "topics" {
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
    path_part   = "topics"
}

#GET
resource "aws_api_gateway_method" "get_topics" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.topics.id
    http_method   = "GET"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "get_topics" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.topics.id
    http_method             = aws_api_gateway_method.get_topics.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

#DELETE
resource "aws_api_gateway_method" "delete_topics" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.topics.id
    http_method   = "DELETE"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "delete_topics" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.topics.id
    http_method             = aws_api_gateway_method.delete_topics.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

#OPTIONS
resource "aws_api_gateway_method" "options_topics" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.topics.id
    http_method   = "OPTIONS"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "options_topics" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.topics.id
    http_method             = aws_api_gateway_method.options_topics.http_method
    integration_http_method = "OPTIONS"
    type                    = "MOCK"
    request_templates = {
        "application/json" = "{\"statusCode\": 200}"
    }
    lifecycle {
        ignore_changes = [integration_http_method]
    }
}

resource "aws_api_gateway_method_response" "options_topics" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  resource_id = aws_api_gateway_resource.topics.id
  http_method = aws_api_gateway_method.options_topics.http_method
  status_code = "200"

  //cors section
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_integration_response" "options_topics" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  resource_id = aws_api_gateway_resource.topics.id
  http_method = aws_api_gateway_method.options_topics.http_method
  status_code = aws_api_gateway_method_response.options_topics.status_code

  //cors
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" =  "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT,DELETE'",
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
  depends_on = [
    aws_api_gateway_method.options_topics,
    aws_api_gateway_integration.options_topics,
  ]
}