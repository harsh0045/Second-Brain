import {UserModel} from "../Models/userModel.js"

export const createUser = async({firstname,lastname,email,password})=>{
    
    if(!firstname ||!lastname || !email || !password ){
        throw new Error("All input fields are required");
    }
    const user=await UserModel.create({firstname,lastname,email,password});
    return user;
}
