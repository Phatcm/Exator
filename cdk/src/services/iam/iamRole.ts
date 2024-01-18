import { Construct } from "constructs";
import {
  Role,
  PolicyDocument,
  PolicyStatement,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";

export const createIamRole = (
  construct: Construct,
  id: string,
  policies: any
) => {
  const policiesDocument = new PolicyDocument({
    statements: policies.map(
      (policy: any) =>
        new PolicyStatement({
          resources: policy.resource,
          actions: policy.action,
        })
    ),
  });
  const role = new Role(construct, id, {
    roleName: id,
    assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
    description: "axetor lambda role",
    inlinePolicies: { policiesDoc: policiesDocument },
  });

  return role;
};
