import json
import logging

#Functions
from def_buildresponse import buildResponse
from def_questions import getQuestions, saveQuestions, modifyQuestions
from def_question import getQuestion, saveQuestion, modifyQuestion, deleteQuestion
from def_topics import getTopics
from def_topic import deleteTopic
from def_exam import saveExam, getExam
from def_history import getHistoryAttempts, getHistoryQuestions
from def_favorite import saveFavorite, getFavorite, deleteFavorite
from def_external_signin import verifyTokenGG, verifyTokenFB
from def_send_email import sendResetPasswordEmail
from def_verify_email import verify_email_address


#Logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

#Method
getMethod = "GET"
postMethod = "POST"
patchMethod = "PATCH"
deleteMethod = "DELETE"

#Path
healthPath = "/health"
questionPath = "/question"
questionsPath = "/questions"
topicPath = "/topic"
topicsPath = "/topics"
examPath = "/exam"
historyAttemptsPath = "/history/attempts"
historyQuestionsPath = "/history/questions"
favoritePath = "/favorite"
googleApiPath = "/googleApi"
facebookApiPath = "/facebookApi"
emailPath = "/email"
verifyEmailPath = "/email/verify"

#Lambda Handler
def lambda_handler(event, context):
    print(event)
    try:
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
            #Get History Attempts
            (getMethod, historyAttemptsPath): lambda: getHistoryAttempts(event["queryStringParameters"]),
            #Get History Questions
            (getMethod, historyQuestionsPath): lambda: getHistoryQuestions(event["queryStringParameters"]),
            #Post favorite
            (postMethod, favoritePath): lambda: saveFavorite(event["queryStringParameters"]),
            #Get favorite
            (getMethod, favoritePath): lambda: getFavorite(event["queryStringParameters"]),
            #Delete favorite
            (deleteMethod, favoritePath): lambda: deleteFavorite(event["queryStringParameters"]),
            #Google api
            (postMethod, googleApiPath): lambda: verifyTokenGG(json.loads(event["body"])),
            #Facebook api
            (postMethod, facebookApiPath): lambda: verifyTokenFB(json.loads(event["body"])),
            #Send email
            (postMethod, emailPath): lambda: sendResetPasswordEmail(json.loads(event["body"])),
            #verify email
            (postMethod, verifyEmailPath): lambda: verify_email_address(json.loads(event["body"]))
        }
    
        # Get the function from the dictionary and call it
        response = func_dict.get((httpMethod, path), lambda: buildResponse(500, {"Message": "Internal server error!"}))()
        return response
        
    except Exception as e:
        logger.exception("An error occurred: %s", e)
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})
