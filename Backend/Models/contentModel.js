// userModel.js
import mongoose from 'mongoose';
// Define the schema for the User with firstName, lastName, email, and password
    const contentSchema = new mongoose.Schema({
        title:
        {
            type:String,
            required:true
        },
        type:
        {
            type:String,
            required:true
        },
        link:
        {
            type:String,
            required:true
        },
        tags:
        [{
            type:mongoose.Types.ObjectId,
            ref:'tag'
        }],
        userId:
        {
            type:mongoose.Types.ObjectId,
            ref:'Users',
            required:true
        }
    })
export const ContentModel=mongoose.model('Contents',contentSchema);