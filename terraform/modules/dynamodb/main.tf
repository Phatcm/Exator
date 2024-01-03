resource "aws_dynamodb_table" "dynamodb_table" {
    name           = var.table_name
    billing_mode   = "PROVISIONED"
    read_capacity  = 5
    write_capacity = 5
    hash_key       = var.hash_key
    range_key      = var.range_key

    attribute {
        name = var.hash_key
        type = "S"
    }

    attribute {
        name = var.range_key
        type = "S"
    }
}