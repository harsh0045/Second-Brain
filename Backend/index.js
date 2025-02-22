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

// ✅ Define allowed origins dynamically
const allowedOrigins = [process.env.FRONTEND_URL , 'http://localhost:3000'];

// ✅ Custom CORS Middleware
const allowCors = (fn) => async (req, res) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return await fn(req, res);
};

// ✅ Apply CORS middleware to Express
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle Preflight Requests for Vercel
app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Max-Age", "600"); // Cache preflight for 10 minutes
  res.sendStatus(204);
});

// ✅ Use Routes with CORS Middleware
app.use('/api/v1/users', allowCors(userRouter));
app.use('/api/v1/contents', allowCors(contentRouter));
app.use('/api/v1/links', allowCors(linkRouter));

const port = process.env.PORT || 3000;

app.get('/', allowCors((req, res) => {
  res.send('Welcome to the Second Brain API');
}));

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

export default app;
