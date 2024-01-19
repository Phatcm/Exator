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

  timeout = 500
  environment {
    variables = {
      # S3_BUCKET_NAME = var.s3_bucket_name
      QUESTIONS_TABLE_NAME = var.questions_table_name
      ATTEMPTS_TABLE_NAME  = var.attempts_table_name
    }
  }
}
