import json
import logging
import csv
import base64
from io import StringIO

from def_buildresponse import buildResponse
from def_questions import getQuestions, saveQuestions, modifyQuestions
from def_question import getQuestion, saveQuestion, modifyQuestion, deleteQuestion
from def_topics import getTopics
from def_topic import deleteTopic
from def_exam import saveExam, getExam

logger = logging.getLogger()
logger.setLevel(logging.INFO)

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
            (postMethod, examPath): lambda: saveExam(json.loads(event["body"])),
            #Get Exam
            (getMethod, examPath): lambda: getExam(event["queryStringParameters"]),
        }
    
        # Get the function from the dictionary and call it
        response = func_dict.get((httpMethod, path), lambda: buildResponse(500, {"Message": "Internal server error!: " + str(e)}))()
        return response
        
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})
