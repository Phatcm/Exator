import logging
import boto3
from def_buildresponse import buildResponse

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource("dynamodb")
questions_table = dynamodb.Table("question-db")

def deleteTopic(parameter):
    try:
        name = parameter["username"]
        topic = parameter["topic"]
        
        response = questions_table.delete_item(
            Key={
                "username": name,
                "topic": topic
            }
        )
        
        body = {
            "Operation": "DELETE",
            "Message": "SUCCESS",
            "deltedItem": response
        }
        temp = buildResponse(200, body)
        return temp
        
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        print(e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})
