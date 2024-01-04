resource "aws_api_gateway_rest_api" "api_gateway" {
    name        = var.api_name
    description = "This is my API for demonstration purposes"
    
    endpoint_configuration {
    types = ["REGIONAL"]
    }
}

#health
resource "aws_api_gateway_resource" "health" {
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
    path_part   = "health"
}

resource "aws_api_gateway_method" "get_health" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.health.id
    http_method   = "GET"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "get_health_integration" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.health.id
    http_method             = aws_api_gateway_method.get_health.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

#questions
resource "aws_api_gateway_resource" "questions" {
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
    path_part   = "questions"
}

resource "aws_api_gateway_method" "get_questions" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.questions.id
    http_method   = "GET"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "get_questions_integration" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.questions.id
    http_method             = aws_api_gateway_method.get_questions.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

resource "aws_api_gateway_method" "post_questions" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.questions.id
    http_method   = "POST"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "post_questions_integration" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.questions.id
    http_method             = aws_api_gateway_method.post_questions.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

#question
resource "aws_api_gateway_resource" "question" {
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
    path_part   = "question"
}

resource "aws_api_gateway_method" "get_question" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.question.id
    http_method   = "GET"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "get_question_integration" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.question.id
    http_method             = aws_api_gateway_method.get_question.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

resource "aws_api_gateway_method" "post_question" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.question.id
    http_method   = "POST"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "post_question_integration" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.question.id
    http_method             = aws_api_gateway_method.post_question.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

resource "aws_api_gateway_method" "patch_question" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.question.id
    http_method   = "PATCH"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "patch_question_integration" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.question.id
    http_method             = aws_api_gateway_method.patch_question.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

resource "aws_api_gateway_method" "delete_question" {
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    resource_id   = aws_api_gateway_resource.question.id
    http_method   = "DELETE"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "delete_question_integration" {
    rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
    resource_id             = aws_api_gateway_resource.question.id
    http_method             = aws_api_gateway_method.delete_question.http_method
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = var.lambda_invoke_arn
}

resource "aws_api_gateway_deployment" "prod" {
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    
    triggers = {
        redeployment = sha1(jsonencode([
            aws_api_gateway_resource.questions.id,
            aws_api_gateway_resource.question.id,
            aws_api_gateway_method.get_questions.id,
            aws_api_gateway_method.post_questions.id,
            aws_api_gateway_method.get_question.id,
            aws_api_gateway_method.post_question.id,
            aws_api_gateway_method.patch_question.id,
            aws_api_gateway_method.delete_question.id,
            aws_api_gateway_integration.get_questions_integration.id,
            aws_api_gateway_integration.post_questions_integration.id,
            aws_api_gateway_integration.get_question_integration.id,
            aws_api_gateway_integration.post_question_integration.id,
            aws_api_gateway_integration.patch_question_integration.id,
            aws_api_gateway_integration.delete_question_integration.id
        ]))
    }

    lifecycle {
        create_before_destroy = true
    }
    depends_on = [
        aws_api_gateway_integration.get_questions_integration,
        aws_api_gateway_integration.post_questions_integration,
        aws_api_gateway_integration.get_question_integration,
        aws_api_gateway_integration.post_question_integration,
        aws_api_gateway_integration.patch_question_integration,
        aws_api_gateway_integration.delete_question_integration
    ]
}

resource "aws_api_gateway_stage" "api_stage" {
    deployment_id = aws_api_gateway_deployment.prod.id
    rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
    stage_name    = "prod"
    depends_on = [
        aws_api_gateway_deployment.prod
    ]
}

# Permission
resource "aws_lambda_permission" "apigw" {
	action        = "lambda:InvokeFunction"
	function_name = var.lambda_function_name
	principal     = "apigateway.amazonaws.com"

	source_arn = "${aws_api_gateway_rest_api.api_gateway.execution_arn}/*/*/*"
}
