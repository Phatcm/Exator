data "archive_file" "lambda_layer" {
  type        = "zip"
  source_dir  = var.layer_source_dir
  output_path = var.layer_output_path
}

resource "aws_lambda_layer_version" "lambda_layer" {
  filename            = data.archive_file.lambda_layer.output_path
  layer_name          = var.layer_name
  description         = "lambda layer for fastapi related dependencies"
  compatible_runtimes = ["python3.11"]
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  output_path = var.output_path
  source_dir  = var.source_dir
}

resource "aws_lambda_function" "lambda_function" {
  filename      = var.filename
  function_name = var.lambda_function_name
  role          = var.lambda_role_arn

  handler          = var.lambda_handler
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime          = var.lambda_runtime

  layers = [ aws_lambda_layer_version.lambda_layer.arn ]
  depends_on = [ aws_lambda_layer_version.lambda_layer ]

  timeout = 500
  environment {
    variables = {
      #S3_BUCKET_NAME = var.s3_bucket_name
      QUESTIONS_TABLE_NAME = var.questions_table_name
      ATTEMPTS_TABLE_NAME  = var.attempts_table_name
    }
  }
}
