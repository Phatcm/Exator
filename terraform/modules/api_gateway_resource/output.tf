# modules/api_gateway_resource/outputs.tf

output "etag" {
  description = "An etag-style string to trigger redeployments"
  value       = jsonencode(aws_api_gateway_resource.resource)
}