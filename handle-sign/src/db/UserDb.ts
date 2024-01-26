import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

export const uploadUser = async (user) => {
  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);

  const command = new PutCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Item: user,
  });

  const response = await docClient.send(command);

  return response;
};

export const getUser = async (key) => {
  const client = new DynamoDBClient();
  const docClient = DynamoDBDocumentClient.from(client);

  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Key: {
      email: key,
    },
  };

  const command = new GetCommand(params);
  try {
    const data = await docClient.send(command);
    if (data.Item) {
      return data.Item;
    } else {
      return null; // or handle the case when the item is not found
    }
  } catch (error) {
    console.error("Error fetching user from DynamoDB:", error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};

export const updateUser = async (
  key: string,
  photo: string,
  username: string
) => {
  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);
  console.log(key, photo, username);

  const command = new UpdateCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Key: {
      email: key,
    },
    UpdateExpression: "set photo = :photo, username = :username",
    ExpressionAttributeValues: {
      ":photo": photo,
      ":username": username,
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);

  return response;
};
