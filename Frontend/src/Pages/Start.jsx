import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Components/Button';
import HeadIcon from '../Icons/HeadIcon';
import GetStartedIcon from '../Icons/GetStartedIcon';
import SigninIcon from '../Icons/SigninIcon';

const Start = () => {
 const navigate=useNavigate();
  return (
    <div className='bg-white h-screen w-screen top-0 left-0 flex justify-center items-center'>
        
        <div className='min-w-96  rounded-md p-8 flex flex-col gap-4'>
            <div className='w-full  flex flex-col justify-center items-center'>
               <HeadIcon/>
            </div>
            <div className=' w-full flex flex-col  justify-center items-center gap-1'>
                <p className='text-black font-sans  font-extrabold text-4xl'> Your Digital Brain</p>
            </div>
            <div className='text-gray-400 font-sans w-full flex flex-col justify-center items-center' >
                <p>Centralise Your thoughts, ideas and information in one place.</p>
                <p>Alway accessible , wherever you are whenever you need it</p>
            </div>
            
            <div className='text-gray-900 font-medium font-sans w-full flex flex-col justify-center items-center'>
               <p>Elevate Your Mindset- Sign Up Now to Streamline Your</p>
               <p>Thought and Ideas through <span className='text-purple-600'>emails.</span></p>
            </div>
            <div className='w-full flex items-center justify-center gap-6'>
                <Button onClick={()=>{
                    navigate("/signup");
                }} startIcons={<GetStartedIcon/>} variant="Primary" text="Get Started" />
                <Button onClick={()=>{
                    navigate("/signin");
                }} endIcons={<SigninIcon/>} variant="Secondary" text="Sign In"/>
            </div>
        </div>
        
    </div>
  )
}

export default Start