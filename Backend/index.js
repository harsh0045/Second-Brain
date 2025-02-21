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

  
const allowedOrigins = [
    process.env.FRONTEND_URL,
  ];
  
  app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies if needed
  }));
  
  // ✅ Explicitly handle preflight requests
  app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Max-Age", "600"); // Cache preflight for 10 minutes
    res.sendStatus(204);
  });
  

const port = process.env.PORT || 3000;



app.get("/",(req,res)=>{
    res.send("Welcome to the Second Brain API")
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/contents", contentRouter);
app.use("/api/v1/links", linkRouter);

app.listen(port,()=>{
    console.log(`Server is listening on ${port}`)
})

export default app;
