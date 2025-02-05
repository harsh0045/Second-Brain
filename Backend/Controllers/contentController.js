import { ContentModel } from "../Models/contentModel.js";
import mongoose from "mongoose";
export const addContent=async(req,res)=>{
   const {link,type,title}=req.body;
   const userId=req.user._id;
   
   if(!link || !type || !title || !userId){
      console.log({link,type,title,userId});
      return res.status(400).json({message:"All input field required"});
   }
   try{
       
       const content= await ContentModel.create({link,type,title,userId,tag:[]});
       return res.status(201).json({message:"Content added",content});
   }catch(error){
       return res.status(400).json({message:"Not added Content",reason:`${error}`})
   }
}
export const getContent=async(req,res)=>{
    const userId=req.user._id;
    if( !userId){
        return res.status(400).json({message:"userId is required"});
     }
    try{
        const content= await ContentModel.find({userId}).populate("userId", "email");;
        return res.status(201).json({message:"Content find",content});
    }catch(error){
        return res.status(400).json({message:"Not find Content",reason:`${error}`})
    }
}
export const deleteContent=async(req,res)=>{
    const {contentId}=req.body;
    if(!contentId){
        return res.status(400).json({message:"contentId is required"});
    }
    try{
        const content= await ContentModel.deleteOne({_id:contentId});
        return res.status(201).json({message:"Content deleted",content});
    }catch(error){
        return res.status(400).json({message:"Not delete Content",reason:`${error}`})
    }
}