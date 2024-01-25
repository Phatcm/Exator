import os
import subprocess
import boto3

def create_lambda_layer_and_add_to_function():
    # Install dependencies
    subprocess.check_call("pip install --target ../lambda_layer/python/ -r requirements.txt", shell=True)

    # Zip the dependencies
    subprocess.check_call("zip -r lambda_layer_payload.zip ../lambda_layer", shell=True)

    # Upload the zip file as a new Lambda layer version
    client = boto3.client('lambda')
    response = client.publish_layer_version(
        LayerName='Exator-lambda-layer',
        Description='Dependencies for Exator app',
        Content={
            'ZipFile': open('lambda_layer_payload.zip', 'rb').read()
        },
        CompatibleRuntimes=['python3.11']
    )

    # Print the ARN of the new layer version
    print(response['LayerVersionArn'])

    # Add the layer to the Lambda function
    client.update_function_configuration(
        #Change the function name
        FunctionName='Exator-lambda-function',
        Layers=[response['LayerVersionArn']]
    )

if __name__ == '__main__':
    create_lambda_layer_and_add_to_function()
