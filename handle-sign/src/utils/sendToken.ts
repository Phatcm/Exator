import User from "../models/userModel";
import generateToken from "./signToken";
import { Response } from "express";

export const sendToken = (user: User, res: Response) => {
  const token = generateToken(user.email);

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(200).json({
    status: "success",
    body: {
      user,
    },
  });
};
