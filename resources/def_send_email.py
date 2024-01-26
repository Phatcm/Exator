import logging
import boto3
from botocore.exceptions import ClientError
from def_buildresponse import buildResponse

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def is_email_verified(email):
    client = boto3.client('ses', region_name='ap-northeast-1')
    response = client.list_identities(
        IdentityType='EmailAddress',  # to list only email addresses
    )

    if email in response['Identities']:
        return True
    else:
        return False

def sendResetPasswordEmail(requestBody):
    email = requestBody["email"]
    response = is_email_verified(email)
    if response == False:
        return buildResponse(400, {"Message": "Email is not verified"})
        
    token = requestBody["token"]
    
    # Create a new SES resource and specify a region.
    client = boto3.client('ses',region_name="ap-northeast-1")

    # The email body for recipients with non-HTML email clients.
    BODY_TEXT = ("Please click on the following link to reset your password:\n"
                 "https://exator.vercel.app/resetPassword?token={}&email={}".format(token, email))

    # The HTML body of the email.
    BODY_HTML = """<html>
    <head></head>
    <body>
      <h1>Password Reset Requested</h1>
      <p>Please click on the following link to reset your password:</p>
      <a href='https://exator.vercel.app/resetPassword?token={}&email={}'>Reset Password</a>
    </body>
    </html>
                """.format(token,email)

    # The character encoding for the email.
    CHARSET = "UTF-8"

    # The subject line for the email.
    SUBJECT = "Password Reset Requested"

    # Try to send the email.
    try:
        #Provide the contents of the email.
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    email,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': CHARSET,
                        'Data': BODY_HTML,
                    },
                    'Text': {
                        'Charset': CHARSET,
                        'Data': BODY_TEXT,
                    },
                },
                'Subject': {
                    'Charset': CHARSET,
                    'Data': SUBJECT,
                },
            },
            Source="phat.caominh.dev@gmail.com", # replace with your "From" address
        )
    # Display an error if something goes wrong. 
    except ClientError as e:
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})
    else:
        return buildResponse(200, {"Message": "Email sent! Message ID:" + response['MessageId']})
    
def sendAccountInfoEmail(email, password):
    # Create a new SES resource and specify a region.
    client = boto3.client('ses',region_name="ap-northeast-1")

    # The email body for recipients with non-HTML email clients.
    BODY_TEXT = ("Welcome to Exator, this is your information for account login. You can change the password later in the website:\n"
             "Account: {}\n"
             "Password: {}".format(email, password))

    # The HTML body of the email.
    BODY_HTML = """<html>
    <head></head>
    <body>
      <h1>Password Reset Requested</h1>
      <p>Welcome to Exator, this is your information for account login. You can change the password later in the website:</p>
        <p>Account: {}</p>
        <p>Password: {}</p>
    </body>
    </html>
                """.format(email, password)

    # The character encoding for the email.
    CHARSET = "UTF-8"

    # The subject line for the email.
    SUBJECT = "Exator account information"

    # Try to send the email.
    try:
        #Provide the contents of the email.
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    email,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': CHARSET,
                        'Data': BODY_HTML,
                    },
                    'Text': {
                        'Charset': CHARSET,
                        'Data': BODY_TEXT,
                    },
                },
                'Subject': {
                    'Charset': CHARSET,
                    'Data': SUBJECT,
                },
            },
            Source="phat.caominh.dev@gmail.com", # replace with your "From" address
        )
    # Display an error if something goes wrong. 
    except ClientError as e:
        return buildResponse(500, {"Message": "Internal server error: " + str(e)})
    else:
        return buildResponse(200, {"Message": "Email sent! Message ID:" + response['MessageId']})