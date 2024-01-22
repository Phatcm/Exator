import { Response } from "express";

export const buildResponse = (
  res: Response,
  statusCode: Number,
  status: string,
  body: object
) => {
  res.status(statusCode).json({
    status: status,
    body: body,
  });
};
