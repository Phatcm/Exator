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
                module.resource_test.etag,
                file("modules/api_gateway/resource_health.tf"), 
                file("modules/api_gateway/resource_question.tf"), 
                file("modules/api_gateway/resource_questions.tf"), 
                file("modules/api_gateway/resource_topic.tf"), 
                file("modules/api_gateway/resource_topics.tf"),
                file("modules/api_gateway/resource_exam.tf"),
                file("modules/api_gateway/resource_history_attempts.tf"),
                file("modules/api_gateway/resource_history_questions.tf"),
                file("modules/api_gateway/resource_favorite.tf"),
                file("modules/api_gateway/resource_user.tf"),
                file("modules/api_gateway/resource_user_password.tf")
            ])
        )
    }

    lifecycle {
        create_before_destroy = true
    }
    depends_on = [
        #questions
        aws_api_gateway_integration.get_questions_integration,
        aws_api_gateway_integration.post_questions_integration,
        aws_api_gateway_integration.patch_questions_integration,
        aws_api_gateway_integration.options_questions,
        aws_api_gateway_method_response.options_questions,

        #question
        aws_api_gateway_integration.get_question_integration,
        aws_api_gateway_integration.post_question_integration,
        aws_api_gateway_integration.patch_question_integration,
        aws_api_gateway_integration.delete_question_integration,
        aws_api_gateway_integration.options_question,
        aws_api_gateway_method_response.options_question,
        aws_api_gateway_integration_response.options_question,
        aws_api_gateway_integration_response.options_questions,

        #topics
        aws_api_gateway_integration.get_topics,
        aws_api_gateway_integration.delete_topics,
        aws_api_gateway_integration.options_topics,
        aws_api_gateway_method_response.options_topics,
        aws_api_gateway_integration_response.options_topics,

        #topic
        aws_api_gateway_integration.get_topic,
        aws_api_gateway_integration.delete_topic,
        aws_api_gateway_integration.options_topic,
        aws_api_gateway_method_response.options_topic,
        aws_api_gateway_integration_response.options_topic,

        #exam
        aws_api_gateway_integration.get_exam_integration,
        aws_api_gateway_integration.post_exam_integration,
        aws_api_gateway_integration.options_exam,
        aws_api_gateway_method_response.options_exam,
        aws_api_gateway_integration_response.options_exam,

        #history_attempts
        aws_api_gateway_integration.get_history_attempts_integration,
        aws_api_gateway_integration.options_history_attempts,
        aws_api_gateway_method_response.options_history_attempts,
        aws_api_gateway_integration_response.options_history_attempts,

        #history_questions
        aws_api_gateway_integration.get_history_questions_integration,
        aws_api_gateway_integration.options_history_questions,
        aws_api_gateway_method_response.options_history_questions,
        aws_api_gateway_integration_response.options_history_questions,

        #favorite
        aws_api_gateway_integration.get_favorite_integration,
        aws_api_gateway_integration.post_favorite_integration,
        aws_api_gateway_integration.delete_favorite_integration,
        aws_api_gateway_integration.options_favorite,
        aws_api_gateway_method_response.options_favorite,
        aws_api_gateway_integration_response.options_favorite,

        #user
        aws_api_gateway_integration.get_user_integration,
        aws_api_gateway_integration.post_user_integration,
        aws_api_gateway_integration.options_user,
        aws_api_gateway_method_response.options_user,
        aws_api_gateway_integration_response.options_user,

        #user_password
        aws_api_gateway_integration.post_password_integration,
        aws_api_gateway_integration.patch_password_integration,
        aws_api_gateway_integration.options_password,
        aws_api_gateway_method_response.options_password,
        aws_api_gateway_integration_response.options_password
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

