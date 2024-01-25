import { Request, Response, NextFunction } from "express";

import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import { getUser, uploadUser } from "../db/UserDb";
import { buildResponse } from "../utils/buildResponse";
import { sendToken } from "../utils/sendToken";
import { verifyToken } from "../utils/verifyToken";
import axios from "axios";
import * as crypto from "crypto";
import { log } from "console";
import generateToken from "../utils/signToken";

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
      buildResponse(res, 401, "fail", { message: "Token is invalid!" });
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

export const updatePassword = catchAsync(async (req, res) => {
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

export const isLoggedIn = async (req, res, next) => {
  try {
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
        message: "You are not logged in!",
      });
      return;
    }
    //2. Verification token
    const decoded: DecodedToken = await verifyToken(
      token,
      process.env.JWT_SECRET
    );

    //3.Check token in blacklist
    //4.Check user
    const data = await getUser(decoded.id);

    if (data) {
      const user = new User(data);
      user.password = undefined;
      buildResponse(res, 200, "success", { user: user });
    } else {
      buildResponse(res, 401, "fail", {
        message: "Token is invalid",
      });
      return;
    }
  } catch (err) {
    buildResponse(res, 400, "error", { message: "Error in check Log in!" });
    return;
  }
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log("email: ", email);
    if (!email) {
      buildResponse(res, 400, "fail", {
        message: "Need email!",
      });
      return;
    }

    const data = await getUser(email);
    if (!data) {
      buildResponse(res, 400, "fail", {
        message: "User is not exist",
      });
      return;
    }

    const user = new User(data);
    const resetToken = user.createPasswordResetToken();
    await uploadUser(user);

    const response = await axios.post(`${process.env.URL}/email`, {
      email,
      token: resetToken,
    });

    buildResponse(res, 200, "success", {
      email: email,
      message: `Have send reset token link to ${email}`,
    });

    return;
  } catch (error) {
    buildResponse(res, 400, "error", {
      message: error,
    });
    return;
  }
});
export const resetPassword = catchAsync(async (req, res, next) => {
  const { email, token, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    buildResponse(res, 400, "fail", {
      message: "password vs passwordConfirm is different!",
    });
    return;
  }
  // 1 Get user based on the token

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const data = await getUser(email);
  if (!data) {
    buildResponse(res, 400, "fail", {
      message: "User is not exist",
    });
    return;
  }

  const user = new User(data);

  if (hashedToken !== user.passwordResetToken) {
    buildResponse(res, 400, "fail", {
      message: "Token is invalid!",
    });
    return;
  }
  const dateExpired = Date.parse(user.passwordResetExpires);
  if (dateExpired < Date.now()) {
    buildResponse(res, 400, "fail", {
      message: "Token is expired!",
    });
    return;
  }
  //2 If token has not expired, and ther is user, set the new password
  user.password = password;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;

  await user.hashPassword();

  const response = await uploadUser(user);

  if (response.$metadata.httpStatusCode === 200)
    buildResponse(res, 200, "susscess", {
      message: "Reset password successfully!",
    });
  else {
    buildResponse(res, 400, "fail", {
      message: "Reset password failed!",
    });
  }
});

export const signInWithGoogle = catchAsync(async (req, res, next) => {
  try {
    const { id_token } = req.body;

    const url = `${process.env.URL}/googleApi`;
    const response = await axios.post(url, {
      id_token,
    });

    if (response.status === 200) {
      const { email, name, is_new } = response.data.body;

      const token = generateToken(email);

      const cookieOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

      res.cookie("jwt", token, cookieOptions);

      res.status(200).json({
        status: "success",
        body: {
          user: {
            email,
            name,
            is_new,
          },
          token,
        },
      });
    } else {
      buildResponse(res, 401, "fail", {
        message: "Sign in failed",
      });
    }
  } catch (error) {
    buildResponse(res, 400, "error", {
      message: error,
    });
  }
});
