import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB is connected");
    }catch(error){
        console.log(`MongoDB is not connect : ${error}`);
    }
}


