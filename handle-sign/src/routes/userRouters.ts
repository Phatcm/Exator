import express from "express";
import {
  protect,
  signIn,
  signOut,
  signUp,
  updatePassword,
} from "../controller/authController";
import { updateMe } from "../controller/userController";

const userRouters = express.Router();

userRouters.post("/signup", signUp);
userRouters.post("/signin", signIn);
userRouters.post("/signout", signOut);

userRouters.use(protect);

userRouters.patch("/updateMe", updateMe);
userRouters.patch("/updateMyPassword", updatePassword);

export default userRouters;
