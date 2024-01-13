import boto3
import json
import logging
import random
import uuid
from custom_encoder import CustomEncoder
from boto3.dynamodb.conditions import Key

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource("dynamodb")
questions_table = dynamodb.Table("question-db")
attempts_table = dynamodb.Table("attempts-db")

getMethod = "GET"
postMethod = "POST"
patchMethod = "PATCH"
deleteMethod = "DELETE"
healthPath = "/health"
questionPath = "/question"
questionsPath = "/questions"
topicPath = "/topic"
topicsPath = "/topics"
examPath = "/exam"


def lambda_handler(event, context):
    try:
        print(event)
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
            #Modify Questions
            (patchMethod, questionsPath): lambda: modifyQuestions(json.loads(event["body"])),
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
            (deleteMethod, topicPath): lambda: deleteTopic(event["queryStringParameters"]),
            #Post Exam
            (postMethod, examPath): lambda: saveExam(json.loads(event["body"]))
        }
    
        # Get the function from the dictionary and call it
        response = func_dict.get((httpMethod, path), lambda: buildResponse(500, {"Message": "Internal server error!: " + str(e)}))()
        return response
        
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})

def getQuestions(parameter):
    try:
        name = parameter["username"]
        topic = parameter["topic"]
        
        response = questions_table.query(
            KeyConditionExpression=Key('username').eq(name)&Key('topic').eq(topic)
        )
        result = response["Items"]

        # while "LastEvaluateKey" in response:
        #     response = questions_table.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
        #     result.extend(response["Items"])

        return buildResponse(200, result)
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        print(e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})

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
            saveQuestion(questionBody)
        
        return buildResponse(200, {"Message": "Questions added successfully"})
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        print(e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})

def modifyQuestions(requestBody):
    try:
        name = requestBody["username"]
        topic = requestBody["topic"]
        description = requestBody["description"]
        questions = requestBody["questions"].split("\n") #Split the question by line
        
        question_list = []
        for question in questions:
            # Parse the new question
            new_question = parse_question(question)
            question_list.append(new_question)
        
        #Update the item to dynamodb
        response = questions_table.put_item(
            Item={
                "username": name,
                "topic": topic,
                "description": description,
                "questions": question_list
            }
        )
        
        body = {
            "Operation": "POST",
            "Message": "SUCCESS",
            "UpdatedAttributes": response
        }
        
        return buildResponse(200, body)
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        print(e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})
    
def getQuestion(questionId):
    try:
        response = questions_table.get_item(
            Key={
                "username": questionId
            }
        )
        if "Item" in response:
            return buildResponse(200, response["Item"])
        else:
            return buildResponse(404, {"Message": "QuestionId: {0}s not found".format(questionId)})
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        print(e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})

def saveQuestion(requestBody):
    try:
        name = requestBody["username"]
        topic = requestBody["topic"]
        description = requestBody["description"]
        
        response = questions_table.get_item(
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
        response = questions_table.put_item(
            Item={
                "username": name,
                "topic": topic,
                "description": description,
                "questions": old_questions
            }
        )
        
        body = {
            "Operation": "POST",
            "Message": "SUCCESS",
            "UpdatedAttributes": response
        }
        
        return buildResponse(200, body)
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        print(e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})

    
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
        response = questions_table.update_item(
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
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        print(e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})

def deleteQuestion(questionId):
    try:
        response = questions_table.delete_item(
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
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        print(e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})

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

def getExam(parameter):
    try:
        #Extract questions number require
        number = int(parameter["number"])
        
        #Call get questions function
        response = getQuestions(parameter)
        body = json.loads(response["body"])
        
        #Extract the questions from the body response
        questions = [item for sublist in [d["questions"] for d in body] for item in sublist]
        
        # Randomly select number of questions from the list
        random.shuffle(questions)
        questions = questions[:number]
        
        return buildResponse(200, questions)
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        print(e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})

def saveExam(requestBody):
    try:
        username = requestBody["username"]
        topic = requestBody["topic"]
        questions = requestBody["questions"]
        
        #Calculate score
        score = calculateScore(questions)
        
        # Random id for exam attempt
        attempt_id = str(uuid.uuid4())
        
        #Update the item to dynamodb
        response = attempts_table.put_item(
            Item={
                "username": username,
                "attempt_id": attempt_id,
                "topic": topic,
                "questions": questions,
                "score": score
            }
        )
        
        body = {
            "Operation": "UPDATE",
            "Message": "SUCCESS",
            "UpdatedAttributes": response
        }

        return buildResponse(200, body)
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        print(e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})

def calculateScore(questions):
    score = 0
    count = 0
    for question in questions:
        for i in question[1]:
            if i[:2] == ">*":
                score += 1
        count +=1
    return str(score) + "/" + str(count)

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
