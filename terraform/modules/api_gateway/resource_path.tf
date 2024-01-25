# /health
module "resource_health" {
    source = "../api_gateway_resource"
    path_part = "health"
    parent_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    lambda_invoke_arn = var.lambda_invoke_arn
    enable_get = true
}

# /question
module "resource_question" {
    source = "../api_gateway_resource"
    path_part = "question"
    parent_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    lambda_invoke_arn = var.lambda_invoke_arn
    enable_post = true
    enable_get = true
    enable_delete = true
    enable_patch = true
}

# /questions
module "resource_questions" {
    source = "../api_gateway_resource"
    path_part = "questions"
    parent_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    lambda_invoke_arn = var.lambda_invoke_arn
    enable_post = true
    enable_get = true
    enable_patch = true
}

# /topic
module "resource_topic" {
    source = "../api_gateway_resource"
    path_part = "topic"
    parent_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    lambda_invoke_arn = var.lambda_invoke_arn
    enable_get = true
    enable_delete = true
}

# /topics
module "resource_topics" {
    source = "../api_gateway_resource"
    path_part = "topics"
    parent_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    lambda_invoke_arn = var.lambda_invoke_arn
    enable_get = true
    enable_delete = true
}

# /favorite
module "resource_favorite" {
    source = "../api_gateway_resource"
    path_part = "favorite"
    parent_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    lambda_invoke_arn = var.lambda_invoke_arn
    enable_post = true
    enable_get = true
    enable_delete = true
}

# /exam
module "resource_exam" {
    source = "../api_gateway_resource"
    path_part = "exam"
    parent_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    lambda_invoke_arn = var.lambda_invoke_arn
    enable_post = true
    enable_get = true
}

# /history
module "resource_history" {
    source = "../api_gateway_resource"
    path_part = "history"
    parent_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    lambda_invoke_arn = var.lambda_invoke_arn
}

# /history_attempts
module "resource_history_attempts" {
    source = "../api_gateway_resource"
    path_part = "attempts"
    parent_id = module.resource_history.resource_id
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    lambda_invoke_arn = var.lambda_invoke_arn
    enable_get = true
}

# /history_questions
module "resource_history_questions" {
    source = "../api_gateway_resource"
    path_part = "questions"
    parent_id = module.resource_history.resource_id
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    lambda_invoke_arn = var.lambda_invoke_arn
    enable_get = true
}

# /google_signin
module "resource_google_api" {
    source = "../api_gateway_resource"
    path_part = "googleApi"
    parent_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    lambda_invoke_arn = var.lambda_invoke_arn
    enable_post = true
}

# /facebook_signin
module "resource_facebook_api" {
    source = "../api_gateway_resource"
    path_part = "facebookApi"
    parent_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    lambda_invoke_arn = var.lambda_invoke_arn
    enable_post = true
}

# /send_email
module "resource_send_email" {
    source = "../api_gateway_resource"
    path_part = "email"
    parent_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    lambda_invoke_arn = var.lambda_invoke_arn
    enable_post = true
}