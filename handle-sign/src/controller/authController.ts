import { Request, Response, NextFunction } from "express";

import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import { getUser, uploadUser } from "../db/UserDb";
import { buildResponse } from "../utils/buildResponse";
import { sendToken } from "../utils/sendToken";
import * as jwt from "jsonwebtoken";
import { verifyToken } from "../utils/verifyToken";

interface DecodedToken {
  id?: string;
  iat?: number;
  exp?: number;
}

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, username, passwordConfirm } = req.body;

    if (!email || !password || !username || !passwordConfirm) {
      buildResponse(res, 400, "error", { message: "Missing information!" });
      return;
    }

    if (password !== passwordConfirm) {
      buildResponse(res, 400, "error", {
        message: "password and passwordConfirm not match!",
      });
      return;
    }

    const user = new User({
      username,
      email,
      password,
    });
    //check user exist
    const existUser = await getUser(email);

    if (existUser) {
      buildResponse(res, 401, "fail", { message: "User already existed!" });
      return;
    }
    // hash password and put into db
    await user.hashPassword();

    const data = await uploadUser(user);

    if (data.$metadata.httpStatusCode === 200)
      buildResponse(res, 200, "susscess", {
        message: "Sign up successfully!",
        email: email,
      });
    else {
      buildResponse(res, 400, "fail", {
        message: "Sign up failed!",
      });
    }
  }
);

export const signIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      buildResponse(res, 400, "error", {
        message: "Missing information!",
      });
      return;
    }

    //check user exist

    const data = await getUser(email);

    if (data) {
      const user = new User(data);
      //check password
      const isCorrectPassword = await user.correctPassword(password);
      if (!isCorrectPassword) {
        buildResponse(res, 401, "fail", {
          message: "email of password is not true!",
        });
        return;
      }

      sendToken(user, res);
    } else {
      buildResponse(res, 401, "fail", {
        message: "email of password is not true!",
      });

      return;
    }
  }
);

export const signOut = (req: Request, res: Response) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //1. Getting token and check it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      buildResponse(res, 401, "fail", {
        message: "You are not logged in! Please log in to get access",
      });
      return;
    }

    //2. Verification token
    try {
      const decoded: DecodedToken = await verifyToken(
        token,
        process.env.JWT_SECRET
      );
      //4.Check token in blacklist

      // GRANT ACCESS TO PROTECTED ROU
      req.email = decoded.id;

      next();
    } catch (error) {
      buildResponse(res, 401, "fail", { message: error });
    }
  }
);

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      buildResponse(res, 403, "fail", {
        message: "You do not have permission to perform this action",
      });
      return;
    }
    next();
  };
};

export const updatePassword = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm, passwordCurrent } = req.body;
  if (!password || !passwordConfirm || !passwordCurrent) {
    buildResponse(res, 400, "error", {
      message: "Missing information!",
    });
    return;
  }
  //check match
  if (password !== passwordConfirm) {
    buildResponse(res, 400, "error", {
      message: "password and passwordConfirm is not match!",
    });
    return;
  }

  // //1. get user
  const data = await getUser(req.email);

  const user = new User(data);

  // //2. Check if POSTed current password is correct
  const isPasswordCorrect = await user.correctPassword(passwordCurrent);
  console.log("bool:", isPasswordCorrect);

  if (!isPasswordCorrect) {
    buildResponse(res, 401, "error", {
      message: "Your current password is wrong!",
    });
    return;
  }

  //3. If so. udate password
  user.password = password;
  await user.hashPassword();

  const response = await uploadUser(user);

  if (response.$metadata.httpStatusCode === 200)
    buildResponse(res, 200, "success", { message: "Update success!" });
  else buildResponse(res, 404, "error", { message: "Update fail!" });

  //4. Log user in, send JWT
  sendToken(user, res);
});
