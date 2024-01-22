# modules/api_gateway_resource/outputs.tf

output "resource_id" {
    description = "The ID of the API Gateway resource"
    value       = aws_api_gateway_resource.resource.id
}

output "etag" {
  description = "An etag-style string to trigger redeployments"
  value       = jsonencode(aws_api_gateway_resource.resource)
}

output "get_method_integration" {
  description = "The GET method integration"
  value       = aws_api_gateway_integration.get_method_integration 
}

output "post_method_integration" {
  description = "The POST method integration"
  value       = aws_api_gateway_integration.post_method_integration 
}

output "patch_method_integration" {
  description = "The PATCH method integration"
  value       = aws_api_gateway_integration.patch_method_integration 
}

output "delete_method_integration" {
  description = "The DELETE method integration"
  value       = aws_api_gateway_integration.delete_method_integration 
}

output "options_method_integration" {
  description = "The OPTIONS method integration"
  value       = aws_api_gateway_integration.options_method_integration 
}
