import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import { connectDB } from './db/db.js';
import { userRouter } from './Routes/userRouter.js';
import { contentRouter } from './Routes/contentRouter.js';
import { linkRouter } from './Routes/linkRouter.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => res.send("Express backend is running on Vercel 🚀"));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/contents", contentRouter);
app.use("/api/v1/links", linkRouter);

// Do NOT use app.listen() for Vercel
export default app;
