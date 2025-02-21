import express from 'express';
import { getContent } from "../Controllers/contentController.js";
import { addContent } from "../Controllers/contentController.js";
import { deleteContent } from "../Controllers/contentController.js";
import { contentValidation } from "../InputValidation/contentValidation.js";
import { authUserMiddleware } from '../Middleware/authUserMiddleware.js';

export const contentRouter=express.Router();

contentRouter.post("/addcontent",authUserMiddleware,contentValidation,addContent);
contentRouter.get("/getcontent",authUserMiddleware,getContent);
contentRouter.delete("/deletecontent",authUserMiddleware,deleteContent);