import boto3
import json
from def_buildresponse import buildResponse

def verify_email_address(requestBody):
    try:
        email = requestBody["email"]
        client = boto3.client('ses', region_name='ap-northeast-1')
        response = client.verify_email_identity(
            EmailAddress=email
        )
        return buildResponse(200, {"Message": "Email sent! Message ID:" +  json.dumps(response)})
    except Exception as e:
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})