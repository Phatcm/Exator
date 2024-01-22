import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import userRouters from "./routes/userRouters";
import cors from "cors";
const serverless = require("serverless-http");

const app = express();
//allow cors header
app.use(
  cors({
    origin: "*", // Allow requests from any origin
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

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Incoming Request URL:", req.url);
  next();
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello from express lambda",
  });
});

app.use("/user", userRouters);

module.exports.handler = serverless(app);
