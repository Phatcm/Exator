import logging
import boto3
from boto3.dynamodb.conditions import Key
from def_buildresponse import buildResponse

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource("dynamodb")
attempts_table = dynamodb.Table("attempts-db")


def getHistoryAttempts(parameters):
    try:
        username = parameters["username"]
        #Get attempts_id, submit_time from dynamodb
        response = attempts_table.query(
            KeyConditionExpression=Key('username').eq(username),
            ProjectionExpression="attempt_id, submit_time, complete_time, topic, score, #o",
            ExpressionAttributeNames={"#o": "owner"}
        )
        return buildResponse(200, response["Items"])
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        print(e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})

def getHistoryQuestions(parameters):
    try:
        username = parameters["username"]
        attempt_id = parameters["attempt_id"]
        #Get attempts_id, submit_time from dynamodb
        response = attempts_table.query(
            KeyConditionExpression=Key('attempt_id').eq(attempt_id)&Key('username').eq(username),
            ProjectionExpression="questions"
        )
        return buildResponse(200, response["Items"])
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        print(e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})
