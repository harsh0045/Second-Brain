import {UserModel} from "../Models/userModel.js";
import {createUser} from "../Services/userService.js"
import bcrypt from 'bcrypt';
import { z } from 'zod';
import jwt from 'jsonwebtoken'
import { blackListToken } from "../Models/blacklistTokeModel.js";

export const registerUser=async(req,res)=>{
    const {firstname,lastname,email,password}=req.body;
    console.log(firstname,lastname)
    const userSchema = z.object({
        firstname: z.string().min(2, "Name is required"), // String with a minimum length of 1
        lastname:z.string().min(2,"Name is required"),
        email: z.string().email("Invalid email format"), // Valid email
        password:z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .refine((password) => /[A-Z]/.test(password), {
          message: "Password must contain at least one uppercase letter",
        })
        .refine((password) => /\d/.test(password), {
          message: "Password must contain at least one number",
        })});
      
    const inputValidation= userSchema.safeParse(req.body);
    if(!inputValidation.success){
        return res.status(403).json({message:'Error in input',error:inputValidation.error.errors});
    }

    try{
        const Other=await UserModel.findOne({email});
        if(Other){
            return res.status(409).json({message:"User already exists"});
         }
    }catch(erorr){
        console.log("Not able to fetch User");
    }
   
   
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try{
        const user = await createUser({email,firstname,lastname,password:hashedPassword});
        const token = jwt.sign({userId:user._id},process.env.JWT_USER_SECRET,{expiresIn:'1h'});
        res.cookie('token',token);
        return res.status(200).json({message:"User Registered Successfully",token})
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Either problem in token generation or saving user data"});
    }
}

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    const userSchema = z.object({
        email: z.string().email("Invalid email format"), // Valid email
        password:z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .refine((password) => /[A-Z]/.test(password), {
          message: "Password must contain at least one uppercase letter",
        })
        .refine((password) => /\d/.test(password), {
          message: "Password must contain at least one number",
        })});

    const inputValidation= userSchema.safeParse(req.body);
    if(!inputValidation.success){
        return res.status(403).json({message:"Error in input",error:inputValidation.error.errors});
    }
  
  
   try{
       const user =await UserModel.findOne({email}).select('+password');
       if(!user){
         return res.status(400).json({message:"email is incorrect"});
       }
       const hashedPassword=user.password;
       const isValidPassword=await bcrypt.compare(password,hashedPassword);
       if(!isValidPassword){
         return res.status(400).json({message:"password is incorrect"});
       }
          // const newTokenVersion = user.lastTokenVersion + 1;
          // Update the user's last token version
          // user.lastTokenVersion = newTokenVersion;
          // await user.save();
        
          // // Create a new token with the updated version
          // const token = jwt.sign(
          //   { userId: user._id, version: newTokenVersion },
          //   'secretKey', // Secret key for JWT signing
          //   { expiresIn: '1h' }
          // );
       const token=jwt.sign({userId:user._id},process.env.JWT_USER_SECRET,{expiresIn:'1h'});
       res.cookie('token',token);
       return res.status(201).json({message:"User loged in",token,user})
    
   }catch(error){
      console.log(error);
      return res.status(400).json({message:"problem in email or password comparing or token generation"});
   }
}

export const logoutUser=async(req,res)=>{
  const token=  req.cookies?.token || req.headers.authorization?.split(' ')[1];
  try{
    await blackListToken.create({token});
    res.clearCookie('token');
    return res.status(201).json({message:'Logged out'});
  }catch(error){
    return res.status(400).json({message:"Already addded",error});
  } 
}

export const getUserProfile=async(req,res)=>{
  const user=req.user;
  return res.status(200).json({user:user});
}
