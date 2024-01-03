variable "lambda_function_name" {
    type        = string
    default     = "lambda_function"
    description = "The name of the Lambda function"
}

variable "lambda_role_arn" {
    type        = string
    description = "The ARN of the IAM role for the Lambda function"
}

variable "lambda_handler" {
    type        = string
    description = "The name of the handler function within your code"
}

variable "lambda_runtime" {
    type        = string
    description = "The runtime environment for the Lambda function"
}

variable "output_path" {
    type        = string
    description = "The path where the Lambda function deployment package will be stored"
}

variable "source_dir" {
    type        = string
    description = "The directory containing the Lambda function source code"
}

variable "filename" {
    type        = string
    description = "The name of the deployment package file"
}

variable "s3_bucket_name" {
    type        = string
    description = "The name of the S3 bucket to store the deployment package"
}

variable "questions_table_name" {
    type        = string
    description = "The name of the DynamoDB table for storing questions"
}

variable "attempts_table_name" {
    type        = string
    description = "The name of the DynamoDB table for storing attempts"
}