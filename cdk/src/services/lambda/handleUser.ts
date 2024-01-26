import { Construct } from "constructs";
import { Function, Runtime, Code, LayerVersion } from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { Duration } from "aws-cdk-lib";

export const createLambda = (construct: Construct, id: string, role: any) => {
  const lambda = new Function(construct, id, {
    functionName: "handleUserAxetor-lambda",
    runtime: Runtime.NODEJS_20_X,
    handler: "index.handler",
    timeout: Duration.minutes(5),
    code: Code.fromAsset(
      join(__dirname, "..", "..", "..", "..", "handle-sign", "archive.zip")
    ),
    role: role,
    environment: {
      // BUCKET_NAME: process.env.BUCKET_NAME || "acv",
      DYNAMODB_TABLE_NAME: process.env.DYNAMODB_TABLE_NAME || "avc",
      REGION: "ap-northeast-1",
      JWT_SECRET: "KHAMMA_SECRET_KEY",
      URL: "https://04jicbyks4.execute-api.ap-northeast-1.amazonaws.com/prod",
    },
  });

  return lambda;
};
