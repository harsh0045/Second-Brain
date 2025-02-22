import React, { useRef, useState } from 'react'
import { Input } from '../Components/Input'
import CrossIcon from '../Icons/CrossIcon'
import { Button } from '../Components/Button'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


export const Signup = () => {
  const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const firstnameRef=useRef();
    const passwordRef=useRef();
    const lastnameRef=useRef();
    const emailRef=useRef();
    async function signup (){
      setLoading(true);
      const firstname=firstnameRef.current?.value;
      const lastname=lastnameRef.current?.value;
      const email=emailRef.current?.value;
      const password=passwordRef.current?.value;
      console.log({ firstname, lastname, email, password });
      try{
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`,{
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password
      
        })
        toast.success("Signed up Successfully");
        navigate("/signin");
      }catch(err){
        toast.error(err.response?.data?.message || "Something went wrong");    
      }
     
  }
 
  return (
    <div className="h-screen w-screen bg-gray-200  flex justify-center items-center">
        <div className='bg-white rounded-xl border min-w-40 p-8 pt-4'>
           
           <div className="flex justify-end">
                  <div className=" rounded p-2 hover:bg-gray-200 cursor-pointer" onClick={()=>{navigate("/")}} >
                    <CrossIcon/>
                  </div>
            </div>
            <Input reference={firstnameRef} type="text" placeholder="Firstname"/>
            <Input reference={lastnameRef} type="text" placeholder="Lastname"/>
            <Input reference={emailRef} type="email" placeholder="Email"/>
            <Input reference={passwordRef} type="password" placeholder="Password"/>
           <div className='flex justify-center py-2'>
            < Button onClick={signup} variant="Primary" text="Sign Up" fullWidth={true} loading={loading}/>
           </div>
           <div className=' font-light font-sans text-sm  flex justify-center gap-1 text-gray-500'>
              Already Exist?  <span onClick={()=>navigate("/signin")} className='cursor-pointer text-purple-600  font-normal hover:text-gray-500'> Login</span>
           </div>
            
        </div>
    </div>
  )
}
