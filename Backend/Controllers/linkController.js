
import { LinkModel } from "../Models/linkModel.js"
import { ContentModel } from "../Models/contentModel.js";
import { UserModel } from "../Models/userModel.js";
function random(len)
{
 const option="abcdefghijk123456";
 let length = option.length;
 let ans="";
 for(let i=0;i<len;i++)
 {
    ans+=option[Math.floor(Math.random()*length)];
 }
 return ans;
}
export const addLink=async(req,res)=>{
    const {share} = req.body;
    const userId=req.user._id;
    if(!userId){
        res.status(400).json({ message: "User ID is required" });
         return
    }
   
    if (typeof(share)!== "boolean") {
        res.status(400).json({ message: "Invalid share value" });
        return
    }
  
    try {
        if (share) {
          const existingLink = await LinkModel.findOne({ userId });
          if (existingLink) {
            try{
              await LinkModel.deleteOne(
                {
                   userId
                });
            }catch(err){
              res.status.json({message:"Error in deleting Link",err})
            }
           
          }
    
          const hash = random(20);
          await LinkModel.create({
              userId, 
              hash,
          });
          return res.json({hash});
        } 
        else {
              await LinkModel.deleteOne(
                {
                   userId
                });
              res.json({
                message: "Link removed successfully",
              });
              return
        }
      }catch (err) 
      {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
    export const existLink= async(req,res)=>{
      const userId=req.user._id;
      if(!userId){
         return res.status(400).json({ message: "User ID is required" });
         
      }
      try{
        const existingLink = await LinkModel.findOne({ userId });
        return res.status(201).json({hash:existingLink?.hash});
      }catch(err){
        return res.status(400).json({message:"Something went wrong"})
      }

    }
export const getLink=async(req,res)=>{
    const hash = req.query.hash;
    console.log(hash);
    if (!hash) {
       res.status(400).json({ message: "Invalid or missing hash" });
       return
    }
  
    try {
      const link = await LinkModel.findOne({ hash });
      if (!link) {
       return res.status(401).json({ message: "Wrong hash" });
      }
  
      const content = await ContentModel.find({ userId: link.userId });
      const user = await UserModel.findOne({ _id: link.userId });
  
      if (!user) {
        return res.status(401).json({ message: "User not found, something went wrong" });
      }
  
      return res.status(200).json({
        email: user.email ,
        firstname:user.firstname,
        content: content 
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }