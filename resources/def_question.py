import boto3
import logging
from def_buildresponse import buildResponse

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource("dynamodb")
questions_table = dynamodb.Table("question-db")

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