import mongoose from "mongoose";
const LinkSchema = new mongoose.Schema ({
    hash:{
        type:String ,
        required:true,
        unique:true
    },
    userId:{type:mongoose.Types.ObjectId,ref:'Users',required:true,unique:true}
})
export const LinkModel = mongoose.model('Links',LinkSchema);