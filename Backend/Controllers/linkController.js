
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
    const {share,userId} = req.body;
  
    if(!userId){
        res.status(400).json({ message: "User ID is required" });
         return
    }
    if (share.toLowerCase() !== "true" && share.toLowerCase()!== "false") {
        res.status(400).json({ message: "Invalid share value" });
        return
    }
  
    try {
        if (share.toLowerCase()==="true") {
          const existingLink = await LinkModel.findOne({ userId });
          if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
          }
    
        const hash = random(10);
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
export const getLink=async(req,res)=>{
    const {hash} = req.body;

    if (!hash) {
       res.status(400).json({ message: "Invalid or missing hash" });
       return
    }
  
    try {
      const link = await LinkModel.findOne({ hash });
      if (!link) {
       return res.json({ message: "Wrong hash" });
      }
  
      const content = await ContentModel.findOne({ userId: link.userId });
      const user = await UserModel.findOne({ _id: link.userId });
  
      if (!user) {
        return res.json({ message: "User not found, something went wrong" });
      }
  
      return res.json({
        email: user.email ,
        content: content 
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }