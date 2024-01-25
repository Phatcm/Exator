import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import userRouters from "./routes/userRouters";
import cors from "cors";
const serverless = require("serverless-http");

const app = express();
//allow cors header

app.use(
  cors({
    origin: true, // Allow requests from any origin
    methods: "*", // Allow all HTTP methods
    allowedHeaders: [
      "Content-Type",
      "X-Amz-Date",
      "Authorization",
      "X-Api-Key",
      "X-Amz-Security-Token",
      "X-Amz-User-Agent",
    ],
    credentials: true, // Allow credentials (cookies, authorization headers) with HTTPS
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.get("/health", (req: Request, res: Response) => {
  const ipAddress = req.ip;

  res.status(200).json({
    message: `Hello! Your IP address is: ${ipAddress}`,
  });
});

app.use("/user", userRouters);

module.exports.handler = serverless(app);
