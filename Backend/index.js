import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app=express();
import http from 'http';
const Server = http.createServer(app);
import {connectDB} from './db/db.js';
import {userRouter} from './Routes/userRouter.js'
import { contentRouter } from './Routes/contentRouter.js';
import { linkRouter } from './Routes/linkRouter.js';

connectDB();
app.use(express.json());
app.use("/api/v1/users",userRouter);
app.use("/api/v1/contents",contentRouter);
app.use("/api/v1/links",linkRouter);

Server.listen(`${process.env.PORT}`,()=>{
    console.log(`Server is listening on Port ${process.env.PORT}`);
})