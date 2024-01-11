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
                file("modules/api_gateway/main.tf"), 
                file("modules/api_gateway/resource_health.tf"), 
                file("modules/api_gateway/resource_question.tf"), 
                file("modules/api_gateway/resource_questions.tf"), 
                file("modules/api_gateway/resource_topic.tf"), 
                file("modules/api_gateway/resource_topics.tf")
            ])
        )
    }
    lifecycle {
        create_before_destroy = true
    }
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

