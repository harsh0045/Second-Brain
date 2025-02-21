import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './db/db.js';
import { userRouter } from './Routes/userRouter.js';
import { contentRouter } from './Routes/contentRouter.js';
import { linkRouter } from './Routes/linkRouter.js';
import cors from "cors";

// Connect to database
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/contents", contentRouter);
app.use("/api/v1/links", linkRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the Second Brain API!");
});

export default app;
