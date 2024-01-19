#proxy+ RESOURCE
resource "aws_api_gateway_resource" "proxy_resource" {
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
    path_part   = "{proxy+}"
    depends_on = [ aws_api_gateway_rest_api.api_gateway ]
}

#ANY METHOD
resource "aws_api_gateway_method" "proxy_any" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.proxy_resource.id
    http_method   = "ANY"
    authorization = "NONE"
}


#ANY METHOD INTEGRATION
resource "aws_api_gateway_integration" "proxy_any" {
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    resource_id = aws_api_gateway_resource.proxy_resource.id
    http_method = aws_api_gateway_method.proxy_any.http_method
    integration_http_method = "POST"
    type = "AWS_PROXY"
    uri = var.lambda_invoke_arn
}

#OPTIONS METHOD
resource "aws_api_gateway_method" "proxy_options" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.proxy_resource.id
    http_method   = "OPTIONS"
    authorization = "NONE"
}

#OPTIONS METHOD INTEGRATION
resource "aws_api_gateway_integration" "proxy_options" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.proxy_resource.id
    http_method             = aws_api_gateway_method.proxy_options.http_method
    integration_http_method = "OPTIONS"
    type                    = "MOCK"
    request_templates = {
        "application/json" = "{\"statusCode\": 200}"
    }
    lifecycle {
        ignore_changes = [integration_http_method]
    }
}

resource "aws_api_gateway_method_response" "proxy_options" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  resource_id = aws_api_gateway_resource.proxy_resource.id
  http_method = aws_api_gateway_method.proxy_options.http_method
  status_code = "200"

  //cors section
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_integration_response" "proxy_options" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  resource_id = aws_api_gateway_resource.proxy_resource.id
  http_method = aws_api_gateway_method.proxy_options.http_method
  status_code = aws_api_gateway_method_response.proxy_options.status_code

  //cors
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" =  "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,PATCH,OPTIONS,POST,PUT,DELETE'",
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
  depends_on = [
    aws_api_gateway_method.proxy_options,
    aws_api_gateway_integration.proxy_options,
  ]
}

