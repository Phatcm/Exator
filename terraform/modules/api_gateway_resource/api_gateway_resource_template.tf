variable "rest_api_id" {}
variable "parent_id" {}
variable "path_part" {}
variable "lambda_invoke_arn" {}
variable "enable_get" {default = false}
variable "enable_post" {default = false}
variable "enable_patch" {default = false}
variable "enable_delete" {default = false}

#CREATE RESOURCE
resource "aws_api_gateway_resource" "resource" {
    rest_api_id = var.rest_api_id
    parent_id   = var.parent_id
    path_part   = var.path_part
}

#GET
resource "aws_api_gateway_method" "get_method" {
    count = var.enable_get ? 1 : 0
    rest_api_id   = var.rest_api_id
    resource_id   = aws_api_gateway_resource.resource.id
    http_method   = "GET"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "get_method_integration" {
    count = var.enable_get ? 1 : 0
    rest_api_id             = var.rest_api_id
    resource_id             = aws_api_gateway_resource.resource.id
    http_method             = aws_api_gateway_method.get_method[0].http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

#POST
resource "aws_api_gateway_method" "post_method" {
    count = var.enable_post ? 1 : 0
    rest_api_id   = var.rest_api_id
    resource_id   = aws_api_gateway_resource.resource.id
    http_method   = "POST"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "post_method_integration" {
    count = var.enable_post ? 1 : 0
    rest_api_id             = var.rest_api_id
    resource_id             = aws_api_gateway_resource.resource.id
    http_method             = aws_api_gateway_method.post_method[0].http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

#PATCH
resource "aws_api_gateway_method" "patch_method" {
    count = var.enable_patch ? 1 : 0
    rest_api_id   = var.rest_api_id
    resource_id   = aws_api_gateway_resource.resource.id
    http_method   = "PATCH"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "patch_method_integration" {
    count = var.enable_patch ? 1 : 0
    rest_api_id             = var.rest_api_id
    resource_id             = aws_api_gateway_resource.resource.id
    http_method             = aws_api_gateway_method.patch_method[0].http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

#DELETE
resource "aws_api_gateway_method" "delete_method" {
    count = var.enable_delete ? 1 : 0
    rest_api_id   = var.rest_api_id
    resource_id   = aws_api_gateway_resource.resource.id
    http_method   = "DELETE"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "delete_method_integration" {
    count = var.enable_delete ? 1 : 0
    rest_api_id             = var.rest_api_id
    resource_id             = aws_api_gateway_resource.resource.id
    http_method             = aws_api_gateway_method.delete_method[0].http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

#OPTIONS
resource "aws_api_gateway_method" "options_method" {
    rest_api_id   = var.rest_api_id
    resource_id   = aws_api_gateway_resource.resource.id
    http_method   = "OPTIONS"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "options_method_integration" {
    rest_api_id             = var.rest_api_id
    resource_id             = aws_api_gateway_resource.resource.id
    http_method             = aws_api_gateway_method.options_method.http_method
    integration_http_method = "OPTIONS"
    type                    = "MOCK"
    request_templates = {
        "application/json" = "{\"statusCode\": 200}"
    }
    lifecycle {
        ignore_changes = [integration_http_method]
    }
}

resource "aws_api_gateway_method_response" "options_method_response" {
  rest_api_id = var.rest_api_id
  resource_id = aws_api_gateway_resource.resource.id
  http_method = aws_api_gateway_method.options_method.http_method
  status_code = "200"

  //cors section
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_integration_response" "options_method_integration_response" {
  rest_api_id = var.rest_api_id
  resource_id = aws_api_gateway_resource.resource.id
  http_method = aws_api_gateway_method.options_method.http_method
  status_code = aws_api_gateway_method_response.options_method_response.status_code

  //cors
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" =  "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,PATCH,OPTIONS,POST,PUT,DELETE'",
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
  depends_on = [
    aws_api_gateway_method.options_method,
    aws_api_gateway_integration.options_method_integration,
  ]
}