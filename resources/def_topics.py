import logging
import boto3
from def_buildresponse import buildResponse
from boto3.dynamodb.conditions import Key

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource("dynamodb")
questions_table = dynamodb.Table("question-db")

def getTopics(parameter):
    if parameter is not None and "username" in parameter:
        try:
            name = parameter["username"]
            response = questions_table.query(
                KeyConditionExpression=Key('username').eq(name),
                ProjectionExpression="username, topic, description"
            )
            body = response["Items"]
            temp = buildResponse(200, body)
            return temp
        except Exception as e:
            logger.exception("An error occurred: %s", e)
            print(e)
            return buildResponse(500, {"Message": "Internal server error: " + str(e)})
            
    else:
        try:
            response = questions_table.scan(
                ProjectionExpression="username, topic, description"
            )
            body = response["Items"]
            while "LastEvaluateKey" in response:
                response = questions_table.scan(
                    ExclusiveStartKey=response["LastEvaluatedKey"],
                    ProjectionExpression="username, topic, description"
                )
                body.extend(response["Items"])
            
            temp = buildResponse(200, body)
            return temp
        except Exception as e:
            logger.exception("An error occurred: %s", e)
            print(e)
            return buildResponse(500, {"Message": "Internal server error: " + str(e)})

