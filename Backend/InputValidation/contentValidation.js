import {z} from "zod";

  
  export const contentValidation = (req,res, next)=>{
        const validationSchema= z.object({
            link: z.string().url({ message: "Invalid URL format" }),
            title: z.string().min(1, { message: "Title is required" }),
        
        });
        const parseData = validationSchema.safeParse(req.body);
        if(!parseData.success)
        {
          const errorMessages = parseData.error.issues.map((issue) => issue.message);
          res.status(411).json({
              message:errorMessages,
               
      
          })
          return 
        }
        next();
  }