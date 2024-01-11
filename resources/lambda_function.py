import boto3
import json
import logging
from custom_encoder import CustomEncoder
from boto3.dynamodb.conditions import Key

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
topicPath = "/topic"
topicsPath = "/topics"


def lambda_handler(event, context):
    httpMethod = event["httpMethod"]
    path = event["path"]
    
    # Define a dictionary to map (httpMethod, path) to the corresponding function
    func_dict = {
        #Health Check
        (getMethod, healthPath): lambda: buildResponse(200, "Connection is OK"),
        #Get Questions
        (getMethod, questionsPath): lambda: getQuestions(event["queryStringParameters"]),
        #Save Questions
        (postMethod, questionsPath): lambda: saveQuestions(json.loads(event["body"])),
        #Get Question
        (getMethod, questionPath): lambda: getQuestion(event["queryStringParameters"]["questionId"]),
        #Save Question
        (postMethod, questionPath): lambda: saveQuestion(json.loads(event["body"])),
        #Modify Question
        (patchMethod, questionPath): lambda: modifyQuestion(json.loads(event["body"])["questionId"], json.loads(event["body"])["updateKey"], json.loads(event["body"])["updateValue"]),
        #Delete Question
        (deleteMethod, questionPath): lambda: deleteQuestion(json.loads(event["body"])["questionId"]),
        #Get Topics
        (getMethod, topicsPath): lambda: getTopics(event["queryStringParameters"]),
        #Delete Topic
        (deleteMethod, topicPath): lambda: deleteTopic(event["queryStringParameters"])
    }

    # Get the function from the dictionary and call it
    response = func_dict.get((httpMethod, path), lambda: buildResponse(404, "Not Found"))()
    
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

def getQuestions(parameter):
    try:
        name = parameter["username"]
        topic = parameter["topic"]
        
        response = table.query(
            KeyConditionExpression=Key('username').eq(name)&Key('topic').eq(topic)
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
        name = requestBody["username"]
        topic = requestBody["topic"]
        description = requestBody["description"]
        questions = requestBody["questions"].split("\n") #Split the question by line
        
        for question in questions:
            questionBody = {
                "username": name,
                "topic": topic,
                "description": description,
                "questions": question
            }
            print(questionBody)
            saveQuestion(questionBody)
        
        return buildResponse(200, {"Message": "Questions added successfully"})
    except:
        logger.exception("Do your custom error handling here. I am just gonna log it our here!!")

def saveQuestion(requestBody):
    try:
        name = requestBody["username"]
        topic = requestBody["topic"]
        description = requestBody["description"]
        
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
                "description": description,
                "questions": old_questions
            }
        )
        return buildResponse(200, {"Message": "Question added successfully"})
    except:
        logger.exception("Do your custom error handling here. I am just gonna log it our here!!")

    
def parse_question(question):
    
    if "|" in question:
        ques_explain = question.split("|")
        question = ques_explain[0]
        explain = "".join(ques_explain[1:])
        print(explain)
    else:
        explain = "NULL"
        
    question_parts = question.split("-")
    question_text = question_parts[0]  # Separate the question from the answers
    answers = [answer.strip() for answer in question_parts[1:]]  # Remove leading/trailing whitespace
    
    return (question_text, answers, explain)

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

def deleteTopic(parameter):
    try:
        name = parameter["username"]
        topic = parameter["topic"]
        
        response = table.delete_item(
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
        
    except:
        logger.exception("Do your custom error handling here. I am just gonna log it our here!!")

def getTopics(parameter):
    if parameter is not None and "username" in parameter:
        try:
            name = parameter["username"]
            response = table.query(
                KeyConditionExpression=Key('username').eq(name),
                ProjectionExpression="username, topic, description"
            )
            body = response["Items"]
            temp = buildResponse(200, body)
            return temp
        except:
            logger.exception("Do your custom error handling here. I am just gonna log it our here!!")
            
    else:
        try:
            response = table.scan(
                ProjectionExpression="username, topic, description"
            )
            body = response["Items"]
            while "LastEvaluateKey" in response:
                response = table.scan(
                    ExclusiveStartKey=response["LastEvaluatedKey"],
                    ProjectionExpression="username, topic, description"
                )
                body.extend(response["Items"])
            
            temp = buildResponse(200, body)
            return temp
        except:
            logger.exception("Do your custom error handling here. I am just gonna log it our here!!")


def buildResponse(statusCode, body=None):
    response = {
        "statusCode": statusCode,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        }
    }

    if body is not None:
        response["body"] = json.dumps(body, cls=CustomEncoder)
    return response
