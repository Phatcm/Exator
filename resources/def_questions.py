import boto3
import json
import logging
from boto3.dynamodb.conditions import Key
from def_buildresponse import buildResponse
from def_question import saveQuestion, parse_question

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource("dynamodb")
questions_table = dynamodb.Table("question-db")

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
    print(len(requestBody["questions"]))
    try:
        name = requestBody["username"]
        topic = requestBody["topic"]
        description = requestBody["description"]
        
        if requestBody["questions"]:
            #Split the question by line
            questions = requestBody["questions"].split("\n")
            #Send each question to saveQuestion
            for question in questions:
                questionBody = {
                    "username": name,
                    "topic": topic,
                    "description": description,
                    "questions": question
                }
                saveQuestion(questionBody)
        else:
            print("This line will print")
            body = {
                "username": name,
                "topic": topic,
                "description": description
            }
            saveQuestion(body)
            
        
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
    