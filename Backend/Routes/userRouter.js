import express from "express";
import {registerUser} from "../Controllers/userController.js"

import { loginUser } from "../Controllers/userController.js";
import { logoutUser } from "../Controllers/userController.js";
import { getUserProfile } from "../Controllers/userController.js";

import { authUserMiddleware } from "../Middleware/authuserMiddleware.js";
console.log("Middleware imported successfully!");
export const userRouter=express.Router();
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/logout",authUserMiddleware,logoutUser);
userRouter.get("/profile",authUserMiddleware,getUserProfile);




