import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/db.js';
import { userRouter } from './Routes/userRouter.js';
import { contentRouter } from './Routes/contentRouter.js';
import { linkRouter } from './Routes/linkRouter.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Define allowed origins
const ALLOWED_ORIGINS = [
  `https://${process.env.FRONTEND_URL}`,
  "http://localhost:5173", // Local frontend
];

// ✅ CORS Middleware
app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;
  const accessOrigin = ALLOWED_ORIGINS.includes(requestOrigin) ? requestOrigin : ALLOWED_ORIGINS[1];

  res.setHeader("Access-Control-Allow-Origin", accessOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Vary", "Origin");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Preflight request handling
  }

  next();
});

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Second Brain API");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/contents", contentRouter);
app.use("/api/v1/links", linkRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

export default app;
