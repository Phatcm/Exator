module "resource_test" {
    source = "../api_gateway_resource"
    path_part = "test"
    parent_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    lambda_invoke_arn = var.lambda_invoke_arn
    enable_post = true
    enable_get = true
}