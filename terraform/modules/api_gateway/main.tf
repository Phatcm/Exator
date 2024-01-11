resource "aws_api_gateway_rest_api" "api_gateway" {
    name        = var.api_name
    description = "This is my API for demonstration purposes"
    endpoint_configuration {
        types = ["REGIONAL"]
    }
}

#Deployment
resource "aws_api_gateway_deployment" "prod" {
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id

    triggers = {
        redeployment = sha1(jsonencode([
            aws_api_gateway_resource.questions.id,
            aws_api_gateway_resource.question.id,
            aws_api_gateway_resource.topic.id,
            aws_api_gateway_resource.topics.id,
            aws_api_gateway_method.get_questions.id,
            aws_api_gateway_method.post_questions.id,
            aws_api_gateway_method.options_questions.id,
            aws_api_gateway_method.get_question.id,
            aws_api_gateway_method.post_question.id,
            aws_api_gateway_method.patch_question.id,
            aws_api_gateway_method.delete_question.id,
            aws_api_gateway_method.get_topic.id,
            aws_api_gateway_method.delete_topic.id,
            aws_api_gateway_method.options_topic.id,
            aws_api_gateway_method.get_topics.id,
            aws_api_gateway_method.delete_topics.id,
            aws_api_gateway_method.options_topics.id,
            aws_api_gateway_integration.get_questions_integration.id,
            aws_api_gateway_integration.post_questions_integration.id,
            aws_api_gateway_integration.options_questions.id,
            aws_api_gateway_integration.get_question_integration.id,
            aws_api_gateway_integration.post_question_integration.id,
            aws_api_gateway_integration.patch_question_integration.id,
            aws_api_gateway_integration.delete_question_integration.id,
            aws_api_gateway_integration.get_topic.id,
            aws_api_gateway_integration.delete_topic.id,
            aws_api_gateway_integration.options_topic.id,
            aws_api_gateway_integration.get_topics.id,
            aws_api_gateway_integration.delete_topics.id,
            aws_api_gateway_integration.options_topics.id
        ]))
    }

    lifecycle {
        create_before_destroy = true
    }

    depends_on = [
        aws_api_gateway_integration.get_questions_integration,
        aws_api_gateway_integration.post_questions_integration,
        aws_api_gateway_integration.options_questions,
        aws_api_gateway_integration.get_question_integration,
        aws_api_gateway_integration.post_question_integration,
        aws_api_gateway_integration.patch_question_integration,
        aws_api_gateway_integration.delete_question_integration,
        aws_api_gateway_integration.get_topic,
        aws_api_gateway_integration.delete_topic,
        aws_api_gateway_integration.options_topic,
        aws_api_gateway_integration.get_topics,
        aws_api_gateway_integration.delete_topics,
        aws_api_gateway_integration.options_topics
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

