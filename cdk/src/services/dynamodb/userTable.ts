import { Construct } from "constructs";
import { Table, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { RemovalPolicy } from "aws-cdk-lib";
import { IGrantable } from "aws-cdk-lib/aws-iam";

export const CreateUser = (
  construct: Construct,
  id: string,
  lambda: IGrantable
) => {
  const table = new Table(construct, id, {
    tableName: process.env.DYNAMODB_TABLE_NAME,
    partitionKey: { name: "email", type: AttributeType.STRING },
    removalPolicy: RemovalPolicy.DESTROY,
  });
  table.grantFullAccess(lambda);
  return table;
};
