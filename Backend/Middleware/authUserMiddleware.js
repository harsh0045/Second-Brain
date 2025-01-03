import { blackListToken } from "../Models/blacklistTokeModel.js";
import  jwt  from "jsonwebtoken";
import { UserModel } from "../Models/userModel.js";

export const authUserMiddleware=async(req,res,next)=>{
    const token= req.cookies?.token || req.headers.authorization?.split(' ')[1];
    const isBlackListed=await blackListToken.findOne({token});
    if(isBlackListed){
        return res.status(400).json({message:"Blacklisted token"});
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_USER_SECRET);
        const user = await UserModel.findById(decode.userId);
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }
            // Check if the token's version matches the latest stored version
           // if (decoded.version !== user.lastTokenVersion) {
           //   return res.status(401).json({ message: 'Token is invalid (multi-device access not allowed)' });
          // }

        req.user=user;
        return next();
     }catch(err){
        res.status(401).json({message:'Unauthorized access'});
     }
}