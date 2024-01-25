import express from "express";
import {
  forgotPassword,
  isLoggedIn,
  protect,
  resetPassword,
  signIn,
  signInWithGoogle,
  signOut,
  signUp,
  updatePassword,
} from "../controller/authController";
import { updateMe } from "../controller/userController";

const userRouters = express.Router();

userRouters.post("/signup", signUp);
userRouters.post("/signin", signIn);
userRouters.post("/signinWithGoogle", signInWithGoogle);
userRouters.post("/signout", signOut);
userRouters.post("/isLoggedIn", isLoggedIn);
userRouters.post("/forgotPassword", forgotPassword);
userRouters.post("/resetPassword", resetPassword);

userRouters.use(protect);

userRouters.patch("/updateMe", updateMe);
userRouters.patch("/updateMyPassword", updatePassword);

export default userRouters;
