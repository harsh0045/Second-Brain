import express from 'express';
import { addLink, existLink } from "../Controllers/linkController.js";
import { getLink } from "../Controllers/linkController.js";

import { authUserMiddleware } from "../Middleware/authUserMiddleware.js";
console.log("Middleware imported successfully!");
export const linkRouter=express.Router();

linkRouter.post("/addlink",authUserMiddleware,addLink);
linkRouter.get("/getlink",authUserMiddleware,getLink);
linkRouter.get("/exist",authUserMiddleware,existLink);