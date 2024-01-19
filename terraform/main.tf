# Terraform configuration block specifying the required version
terraform {
  required_version = ">=1.0.0"
}

# Local variables block
locals {
  name = var.project_name
}

# AWS provider block specifying the region
provider "aws" {
    region = var.region
}

# Module for creating an IAM role
module "lambda-role" {
    source = "./modules/iam_role"
    iam_role_name = "Exator-lambda-role"
    policies_list = [
    "arn:aws:iam::aws:policy/AmazonAPIGatewayInvokeFullAccess",
    "arn:aws:iam::aws:policy/AmazonS3FullAccess",
    "arn:aws:iam::aws:policy/CloudWatchFullAccess",
    "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
    ]
}

# Module for creating a DynamoDB table for questions
module "questions-db" {
    source = "./modules/dynamodb"
    table_name = "question-db"
    hash_key = "username"
    range_key = "topic"
}

# Module for creating a DynamoDB table for attempts
module "attempts-db" {
    source = "./modules/dynamodb"
    table_name = "attempts-db"
    hash_key = "username"
    range_key = "attempt_id"
}

# Module for creating a DynamoDB table for favorite
module "favorite-db" {
    source = "./modules/dynamodb"
    table_name = "favorite-db"
    hash_key = "username"
    range_key = "topic"
}

# Module for creating an S3 bucket for results
module "results-db" {
    source = "./modules/s3"
    bucket_name = "exator-results"
}

# Module for creating a Lambda function
module "lambda-handler" {
    source = "./modules/lambda"
    #Layer
    layer_name = "Exator-lambda-layer"
    layer_source_dir = "lambda_layer"
    layer_output_path = "lambda_layer_payload.zip"

    #Function
    lambda_function_name = "Exator-lambda-function"
    lambda_role_arn = module.lambda-role.iam_role_arn
    lambda_handler = "lambda_function.lambda_handler"
    lambda_runtime = "python3.9"
    output_path = "../resources/lambda_function.zip"
    source_dir = "../resources/"
    filename = "../resources/lambda_function.zip"
    #Variables
    s3_bucket_name = module.results-db.s3_bucket_name
    questions_table_name = module.questions-db.dynamodb_table_name
    attempts_table_name = module.attempts-db.dynamodb_table_name
}

# Module for creating an API Gateway
module "api-gateway" {
    source = "./modules/api_gateway"
    api_name = "Exator-api-gateway"
    lambda_invoke_arn = module.lambda-handler.lambda_invoke_arn
    lambda_function_name = module.lambda-handler.lambda_function_name
    lambda_function_arn = module.lambda-handler.lambda_function_arn
}
