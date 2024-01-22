import os
import logging
import boto3
from def_buildresponse import buildResponse
from google.oauth2 import id_token
from google.auth.transport import requests

dynamodb = boto3.resource("dynamodb")
user_table = dynamodb.Table("AXETOR_USER")


logger = logging.getLogger()
logger.setLevel(logging.INFO)

def verifyToken(parameters):
    try:
        # Get the ID token from the event
        id_token_str = parameters["token"]

        # Specify the CLIENT_ID of the app that accesses the backend
        CLIENT_ID = '515048359790-0qeabh29ovkvv4n7r27l87kvov3i94u7.apps.googleusercontent.com'

        # Verify the ID token
        idinfo = id_token.verify_oauth2_token(id_token_str, requests.Request(), CLIENT_ID)

        # ID token is valid. Get the user's Google Account ID from the decoded token.
        userid = idinfo['sub']
        email = idinfo['email']
        name = idinfo['name']
        
         # Check if userid already exist in user_table
        response = user_table.get_item(Key={"userid": userid})
        if "Item" in response:
            logger.info("User already exist")
        else:
            logger.info("User does not exist")
            # Add user to user_table
            response = user_table.put_item(
                Item={
                    "userid": userid,
                    "email": email,
                    "username": name,
                    "photo": "default.jpg",
                    "isVerify": True,
                    "role": "user"
                }
            )        
        
        body = {
            "Message": "User authenticated successfully",
            "body": {
                "userid": userid,
                "email": email,
                "name": name
            }
        }

        return buildResponse(200, body)
    except ValueError as e:
        # Invalid token
        logger.error('Invalid token: ', e)
        return buildResponse(401, {"Message": f"Invalid token: {e}"})
    except Exception as e:
        logger.error('An error occurred: ', e)
        return buildResponse(500, {"Message": f"An error occurred: {e}"})