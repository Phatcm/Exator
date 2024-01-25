import boto3
from def_buildresponse import buildResponse

def verify_email_address(email):
    try:
        client = boto3.client('ses', region_name='ap-northeast-1')
        response = client.verify_email_identity(
            EmailAddress=email
        )
        return buildResponse(200, {"Message": "Email sent! Message ID:" + response['MessageId']})
    except Exception as e:
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})