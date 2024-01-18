import generateToken from "./signToken";

const healthPath = "/health";
const userPath = "/user";

export const handler = async (event) => {
  console.log(event);

  let response;

  switch (true) {
    case event.httpMethod === "GET" && event.path === healthPath:
      response = buildResponse(200, { messages: "Hello from lambda!" });
      break;
    case event.httpMethod === "POST" && event.path === userPath:
      response = buildResponse(200, { messages: "Hello from lambda!" });
      break;
    default:
      response = buildResponse(404, "404 Not Found");
  }

  return response;
};

const buildResponse = (statusCode: Number, body: Object) => {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent",
      "Access-Control-Allow-Credentials": "true", // Required for cookies, authorization headers with HTTPS
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
};
