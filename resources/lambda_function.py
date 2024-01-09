import boto3
import json
import logging
from custom_encoder import CustomEncoder
logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodbTableName = "question-db"
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(dynamodbTableName)

getMethod = "GET"
postMethod = "POST"
patchMethod = "PATCH"
deleteMethod = "DELETE"
healthPath = "/health"
questionPath = "/question"
questionsPath = "/questions"


def lambda_handler(event, context):
    logger.info(event)
    httpMethod = event["httpMethod"]
    path = event["path"]
    
    if httpMethod == getMethod and path == healthPath:
        response = buildResponse(200, "Connection is OK")
        
    elif httpMethod == getMethod and path == questionsPath:
        response = getQuestions(event["queryStringParameters"]["username"])
        
    elif httpMethod == postMethod and path == questionsPath:
        #loop to save all questions
        response = saveQuestions(json.loads(event["body"]))
        
    elif httpMethod == getMethod and path == questionPath:
        response = getQuestion(event["queryStringParameters"]["questionId"])
        
    elif httpMethod == postMethod and path == questionPath:
        response = saveQuestion(json.loads(event["body"]))
        
    elif httpMethod == patchMethod and path == questionPath:
        requestBody = json.loads(event["body"])
        response = modifyQuestion(requestBody["questionId"], requestBody["updateKey"], requestBody["updateValue"])
        
    elif httpMethod == deleteMethod and path == questionPath:
        requestBody = json.loads(event["body"])
        response = deleteQuestion(requestBody["questionId"])
        
    else:
        response = buildResponse(404, "Not Found")
        
    return response

def getQuestion(questionId):
    try:
        response = table.get_item(
            Key={
                "username": questionId
            }
        )
        if "Item" in response:
            return buildResponse(200, response["Item"])
        else:
            return buildResponse(404, {"Message": "QuestionId: {0}s not found".format(questionId)})
    except:
        logger.exception("Do your custom error handling here. I am just gonna log it our here!!")

def getQuestions(username):
    try:
        response = table.query(
            KeyConditionExpression=boto3.dynamodb.conditions.Key('username').eq(username)
        )
        result = response["Items"]

        # while "LastEvaluateKey" in response:
        #     response = table.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
        #     result.extend(response["Items"])

        return buildResponse(200, result)
    except:
        logger.exception("Do your custom error handling here. I am just gonna log it our here!!")

def saveQuestions(requestBody):
    try:
        name = requestBody["name"]
        topic = requestBody["topic"]
        questions = requestBody["questions"].split("\n") #Split the question by line
        
        for question in questions:
            questionBody = {
                "name": name,
                "topic": topic,
                "questions": question
            }
            print(questionBody)
            saveQuestion(questionBody)
        
        return buildResponse(200, {"Message": "Questions added successfully"})
    except:
        logger.exception("Do your custom error handling here. I am just gonna log it our here!!")

def saveQuestion(requestBody):
    try:
        name = requestBody["name"]
        topic = requestBody["topic"]
        
        response = table.get_item(
            Key={
                "username": name,
                "topic": topic
            }
        )
        if "Item" in response:
            old_questions = response["Item"]["questions"]
        else:
            old_questions = []
  
        # Parse the new question
        new_question = parse_question(requestBody["questions"])
        
        # Add the new question to the list of old questions
        old_questions.append(new_question)
        
        #Update the item to dynamodb
        table.put_item(
            Item={
                "username": name,
                "topic": topic,
                "questions": old_questions
            }
        )
        return buildResponse(200, {"Message": "Question added successfully"})
    except:
        logger.exception("Do your custom error handling here. I am just gonna log it our here!!")

        
        # table.put_item(Item={
        #     "username": name,
        #     "topic": topic,
        #     "question": new_question
        # })
        # body = {
        #     "Operation": "SAVE",
        #     "Message": "SUCCESS",
        #     "question_id": name,
        #     "question": new_question
        # }
        # return buildResponse(200, body)
    

def modifyQuestion(questionId, updateKey, updateValue):
    try:
        response = table.update_item(
            Key={
                "questionId": questionId
            },

            UpdateExpression="set {0}s = :value".format(updateKey),
            ExpressionAttributeValues={
                ":value": updateValue
            },
            ReturnValues="UPDATED_NEW"
        )
        body = {
            "Operation": "UPDATE",
            "Message": "SUCCESS",
            "UpdatedAttributes": response
        }
        return buildResponse(200, body)
    except:
        logger.exception("Do your custom error handling here. I am just gonna log it our here!!")

def deleteQuestion(questionId):
    try:
        response = table.delete_item(
            Key={
                "questionId": questionId
            },
            ReturnValues="ALL_OLD"
        )
        body = {
            "Operation": "DELETE",
            "Message": "SUCCESS",
            "deltedItem": response
        }
        return buildResponse(200, body)
    except:
        logger.exception("Do your custom error handling here. I am just gonna log it our here!!")


def buildResponse(statusCode, body=None):
    response = {
        "statusCode": statusCode,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    if body is not None:
        response["body"] = json.dumps(body, cls=CustomEncoder)
    return response
    
def parse_question(question):
    question_parts = question.split("-")
    question_text = question_parts[0]  # Separate the question from the answers
    answers = [answer.strip() for answer in question_parts[1:]]  # Remove leading/trailing whitespace
    
    # Uncomment the following lines if you want to find the correct answer
    # correct_answer = None
    # for i, answer in enumerate(answers):
    #     if answer.startswith("*"):
    #         correct_answer = answer[1:]  # Remove the asterisk *
    #         answers[i] = correct_answer
    #         break
    
    return (question_text, answers)