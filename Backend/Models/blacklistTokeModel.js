
import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token:{
       type: String,
       required:true,
       unique: true
    },
    createdAt : {
        type: Date,
        default:Date.now,
        expires:3600 // 1 hours in seconds
    }
});

export const blackListToken= mongoose.model('BlacklistToken',blacklistTokenSchema);