import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { createIamRole } from "../services/iam/iamRole";
import { createLambda } from "../services/lambda/handleUser";
import { createApi } from "../services/api/Api";
import { CreateUser } from "../services/dynamodb/userTable";

export class MainStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const policies = [
      {
        action: [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ],
        resource: ["arn:aws:logs:*:*:*"],
      },
    ];

    const iam = createIamRole(this, "AxetorAppIamRole", policies);
    const lambda = createLambda(this, "AxetorAppLambda", iam);
    const apiprod = createApi(
      this,
      "AxetorAppApi-prod",
      lambda,
      "https://exator.vercel.app"
    );
    const apidev = createApi(
      this,
      "AxetorAppApi-dev",
      lambda,
      "https://kind-flowers-tease.loca.lt"
    );
    const database = CreateUser(this, "AxetorAppDMetadata", lambda);
  }
}
