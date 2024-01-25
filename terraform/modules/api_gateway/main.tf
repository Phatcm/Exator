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
        redeployment = sha1(
            jsonencode([
                module.resource_health.etag,
                module.resource_favorite.etag,
                module.resource_history.etag,
                module.resource_history_attempts.etag,
                module.resource_history_questions.etag,
                module.resource_exam.etag,
                module.resource_topic.etag,
                module.resource_topics.etag,
                module.resource_question.etag,
                module.resource_questions.etag,
                module.resource_google_api.etag,
                module.resource_facebook_api.etag,
                module.resource_send_email.etag
            ])
        )
    }

    lifecycle {
        create_before_destroy = true
    }
    depends_on = [
        #resource_health
        module.resource_health.get_method_integration,
        module.resource_health.options_method_integration,

        #resource_favorite
        module.resource_favorite.get_method_integration,
        module.resource_favorite.post_method_integration,
        module.resource_favorite.delete_method_integration,
        module.resource_favorite.options_method_integration,

        #resource_history_attempts
        module.resource_history_attempts.get_method_integration,
        module.resource_history_attempts.options_method_integration,

        #resource_history_questions
        module.resource_history_questions.get_method_integration,
        module.resource_history_questions.options_method_integration,

        #resource_question
        module.resource_question.get_method_integration,
        module.resource_question.patch_method_integration,
        module.resource_question.post_method_integration,
        module.resource_question.delete_method_integration,
        module.resource_question.options_method_integration,

        #resource_questions
        module.resource_questions.get_method_integration,
        module.resource_questions.patch_method_integration,
        module.resource_questions.post_method_integration,
        module.resource_questions.options_method_integration,

        #resource_topic
        module.resource_topic.get_method_integration,
        module.resource_topic.delete_method_integration,
        module.resource_topic.options_method_integration,

        #resource_topics
        module.resource_topics.get_method_integration,
        module.resource_topics.delete_method_integration,
        module.resource_topics.options_method_integration,

        #resource_exam
        module.resource_exam.get_method_integration,
        module.resource_exam.post_method_integration,
        module.resource_exam.options_method_integration,

        #google api
        module.resource_google_api.post_method_integration,
        module.resource_google_api.options_method_integration,

        #facebook api
        module.resource_facebook_api.post_method_integration,
        module.resource_facebook_api.options_method_integration,

        #send email
        module.resource_send_email.post_method_integration,
        module.resource_send_email.options_method_integration
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

