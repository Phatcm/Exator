import { Construct } from "constructs";
import { IFunction } from "aws-cdk-lib/aws-lambda";

import { RestApi, Cors, EndpointType } from "aws-cdk-lib/aws-apigateway";
import { Resources } from "./Resource";
import { LambdaIntegration } from "../lambda/LambdaIntegration";

export const createApi = (
  construct: Construct,
  id: string,
  lambda: IFunction,
  url: string
) => {
  const api = new RestApi(construct, id, {
    defaultCorsPreflightOptions: {
      allowOrigins: [url],
      allowMethods: Cors.ALL_METHODS,
      allowHeaders: Cors.DEFAULT_HEADERS,
      allowCredentials: true,
    },
    endpointTypes: [EndpointType.REGIONAL],
  });

  const lambdaIntegration = new LambdaIntegration(
    lambda,
    {
      restApi: api,
      requestTemplates: { "application/json": '{ "statusCode": "200" }' },
    },
    id
  );
  Resources.map((resource: any) => {
    const spacesResource = api.root.addResource(resource.name);

    resource.methods.forEach((method: any) => {
      spacesResource.addMethod(method, lambdaIntegration);
    });

    if (resource.child) {
      resource.child.forEach((el: any) => {
        const childResource = spacesResource.addResource(el.name);
        el.methods.forEach((method: any) => {
          childResource.addMethod(method, lambdaIntegration);
        });
      });
    }
  });
  return api;
};
