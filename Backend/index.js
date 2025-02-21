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

// Configure CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL, // Allow specific frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  };
  
  

const port = process.env.PORT || 3000;
app.use(cors(corsOptions));


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
