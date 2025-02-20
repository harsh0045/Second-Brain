import React, { useRef, useState } from 'react'
import { Input } from '../Components/Input'
import CrossIcon from '../Icons/CrossIcon'
import { Button } from '../Components/Button'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


export const Signin = () => {
    const [loading,setLoading]=useState(false);
   const navigate=useNavigate();
    const passwordRef=useRef();
    const emailRef=useRef();
    async function signin (){
     
      const email=emailRef.current?.value;
      const password=passwordRef.current?.value;
      try{
        setLoading(true);
        const response=await axios.post(`${BACKEND_URL}/api/v1/users/login`,{
            email: email,
            password: password
        
        })
        
        toast.success("User loged in Successfully")
        const jwt=response.data.token;
        
        localStorage.setItem("token",`bearer ${jwt}`);
     
      
        navigate("/dashboard");
      
      }catch(err){
        toast.error(err.response?.data?.message || "Something went wrong");    
      }finally {
        setLoading(false);
        console.log("Final block executed");
      }
     
  }
  return (
    <div className="h-screen w-screen bg-gray-200  flex justify-center items-center">
        <div className='bg-white rounded-xl border min-w-48 p-8 pt-4'>
            <div className="flex justify-end">
                     <div className="cursor-pointer p-2 hover:bg-gray-200 rounded " onClick={()=>navigate("/")}>
                        <CrossIcon/>
                     </div>
            </div>
          
            <Input reference={emailRef}  type="email" placeholder="Email"/>
            <Input reference={passwordRef} type="password" placeholder="Password"/>
           <div className='flex justify-center py-2'>
            < Button onClick={signin} variant="Primary" text="Sign in" fullWidth={true} loading={loading}/>
           </div>
           <div className=' font-light font-sans text-sm  flex justify-center text-gray-500 gap-1'>
            Don't have an account?    <span onClick={()=>navigate("/signup")} className='cursor-pointer font-normal text-purple-600  hover:text-gray-500'> Signup</span>
           </div>
            
        </div>
    </div>
  )
}