import logging
import boto3
from boto3.dynamodb.conditions import Key, Attr
from def_buildresponse import buildResponse

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource("dynamodb")
favorite_table = dynamodb.Table("favorite-db")
questions_table = dynamodb.Table("question-db")

def saveFavorite(parameter):
    try:
        name = parameter["username"]
        topic = parameter["topic"]
        owner = parameter["owner"]
        
        #Save the favorite topic to dynamodb
        response = favorite_table.put_item(
            Item={
                "username": name,
                "topic": topic,
                "owner": owner
                #"questions_count": count
            }
        )
        
        body = {
            "Operation": "SAVE",
            "Message": "SUCCESS",
            "SavedItem": response
        }
        
        return buildResponse(200, body)
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})
    
def getFavorite(parameter):
    try:
        name = parameter["username"]
        
        favs = favorite_table.query(
            KeyConditionExpression=Key('username').eq(name),
            ProjectionExpression="username, topic, #o",
            ExpressionAttributeNames={"#o": "owner"}
        )
        
        for fav in favs["Items"]:
            owner = fav["owner"]
            topic = fav["topic"]
            #Query to get others information from question-db
            response = questions_table.query(
                KeyConditionExpression=Key('username').eq(owner)&Key('topic').eq(topic),
                ProjectionExpression="questions"
            )
        
            #Count number of questions
            if response["Items"]:
                count = len(response["Items"][0]["questions"])
                fav["questions_count"] = count
            
        temp = buildResponse(200, favs["Items"])
        return temp
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})

def deleteFavorite(parameter):
    try:
        name = parameter["username"]
        topic = parameter["topic"]
        owner = parameter["owner"]
        
        #Query to find the items that matches username, topic and owner
        response = favorite_table.query(
            KeyConditionExpression=Key('username').eq(name)&Key('topic').eq(topic),
            FilterExpression=Attr('owner').eq(owner)
        )
        
        #If the item is found, delete it
        if response["Items"]:
            response = favorite_table.delete_item(
                Key={
                    "username": name,
                    "topic": topic
                }
            )
        
        body = {
            "Operation": "DELETE",
            "Message": "SUCCESS",
            "DeletedItem": response
        }
        return buildResponse(200, body)
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})