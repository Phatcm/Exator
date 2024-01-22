import json
import logging
import random
import uuid
import boto3
from datetime import datetime, timedelta
import time
from def_buildresponse import buildResponse
from def_questions import getQuestions

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource("dynamodb")
attempts_table = dynamodb.Table("attempts-db")

#GET
def getExam(parameter):
    # Input validation
    if not all(key in parameter for key in ["username", "owner", "topic", "number"]):
        return buildResponse(400, {"Message": "Missing required parameters"})

    try:
        username = parameter["username"]
        owner = parameter["owner"]
        topic = parameter["topic"]
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
        
        #Save to attempt-db
        # Random id for exam attempt
        attempt_id = str(uuid.uuid4())
        
        #Update the item to dynamodb
        response = attempts_table.put_item(
            Item={
                "username": username,
                "attempt_id": attempt_id,
                "owner": owner,
                "topic": topic,
                "questions": questions,
                "score": "NULL",
                "submit_time": "NULL",
                "complete_time": "NULL",
                "marked_questions": []
            }
        )
        
        #Format attempt_id:questions
        body={
            attempt_id: questions
        }
        
        #Return the questions list to FE
        return buildResponse(200, body)
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        print(e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})

#POST
def saveExam(requestBody):
    try:
        username = requestBody["username"]
        attempt_id = requestBody["attemptId"]
        answers = requestBody["answers"]
        complete_time = requestBody["completeTime"]
        
        # Get current time in GMT+7
        now_utc = datetime.utcnow()
        submit_time = now_utc + timedelta(hours=7)
        submit_time = submit_time.strftime("%Y-%m-%d %H:%M")
        
        #Get questions list from attempt-db to compare with anwsers list from FE
        response = attempts_table.get_item(
            Key={
                "username": username,
                "attempt_id": attempt_id
            }
        )
        body = response["Item"]
        questions = body["questions"]
        
        #Calculate score
        body = calculateScore(questions, answers)
        
        #Extract score from body
        score = body["score"]
        marked_questions = body["marked_questions"]
        
        #Update time and score to dynamodb based on attempt_id
        response = attempts_table.update_item(
            Key={
                "username": username,
                "attempt_id": attempt_id
            },
            UpdateExpression="set score=:s, submit_time=:t, complete_time=:c, marked_questions=:m",
            ExpressionAttributeValues={
                ":s": score,
                ":t": submit_time,
                ":c": complete_time,
                ":m": marked_questions #List of marked questions
            },
            ReturnValues="UPDATED_NEW"
        )
        
        #Return the score and marked questions to FE
        return buildResponse(200, body)
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        print(e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})

def calculateScore(questions, answers):
    score = 0
    #create a list of marked questions
    marked_questions = []
    
    #Loop through questions list
    for index,question in enumerate(questions):
        #create a list of marked answers
        marked_answers = []
        #Loop through answers list
        for ans in question[1]:
            #Check if the answer is correct
            if ans.startswith('*') and ans[1:] in answers[index]:
                score += 1
            #Check if the answer is marked
            if ans[1:] in answers[index]:
                ans = ">" + ans
            marked_answers.append(ans)
        #Append the question to marked_questions list
        marked_questions.append((question[0],marked_answers,question[2]))
        
    #Format score:total
    ratio = str(score) + "/" + str(index+1)
    #Format body
    body = {
        "score": ratio,
        "marked_questions": marked_questions
    }
    return body