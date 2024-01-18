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
    partitionKey: { name: "username", type: AttributeType.STRING },
    sortKey: { name: "password", type: AttributeType.NUMBER },
    removalPolicy: RemovalPolicy.DESTROY,
  });
  table.grantFullAccess(lambda);
  return table;
};
