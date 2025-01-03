import express from 'express';
import { addLink } from "../Controllers/linkController.js";
import { getLink } from "../Controllers/linkController.js";
import { authUserMiddleware } from "../Middleware/authuserMiddleware.js";

export const linkRouter=express.Router();

linkRouter.post("/addlink",authUserMiddleware,addLink);
linkRouter.get("/getlink",authUserMiddleware,getLink);