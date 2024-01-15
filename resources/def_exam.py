import json
import logging
import random
import uuid
import boto3
from def_buildresponse import buildResponse
from def_questions import getQuestions

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource("dynamodb")
attempts_table = dynamodb.Table("attempts-db")

#GET
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

#POST
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