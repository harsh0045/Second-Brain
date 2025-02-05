import React, { useEffect } from 'react'
import { Button } from '../Components/Button';
import Sidebar from '../Components/Sidebar';
import { ContentModal } from '../Components/ContentModal';
import { ShareIcon } from '../Icons/ShareIcon';
import { PlusIcon } from '../Icons/PlusIcon';
import { Card } from '../Components/Card';
import { useState } from 'react';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import ShareHashModal from '../Components/ShareHashModal';


import LogoutIcon from '../Icons/LogoutIcon';

import OtherBrainModal from '../Components/OtherBrainModal';

import { Logowithtext } from '../Components/Logowithtext';
import { LeftIcon } from '../Icons/LeftIcon';


const Dashboard = () => {
    const navigate=useNavigate();
    const [contentModalOpen,setContentModalOpen]=useState(false);
    const {contents,refresh}=useContent();
    const [deleteId,setDeleteId]=useState("");
    const [hashModalOpen,setHashModalOpen]=useState(false);
    const [otherBrainModalOpen,setOtherBrainModalOpen]=useState(false);
    const [otherBrainOpen,setOtherBrainOpen]=useState(false);
    const [otherEmail,setOtherEmail]=useState("");
    const [otherContent,setOtherContent]=useState([]);
    const [otherHash,setOtherHash]=useState("");
    const [firstName,setFirstName]=useState("");
    const [brainType,setBrainType]=useState("");
    const [loading,setLoading]=useState(true);

    async function check(){
      try{
        const response= await axios.get(`${BACKEND_URL}/api/v1/users/profile`,
          {
              headers: {
                  authorization: localStorage.getItem("token"), 
              },
          })
          setLoading(false);
      
      }catch(err){
        navigate("/signin");
      }
      }
 
 
    async function deleteContentId(){
        await axios.delete(`${BACKEND_URL}/api/v1/contents/deletecontent`,
          {
            data:{
              contentId:deleteId
            },
          headers:{
              Authorization:localStorage.getItem("token")
          }
      }).then((response)=>{
          refresh();
          console.log(response);
      })
    }
    async function userLogout(){
      try{
        await axios.get(`${BACKEND_URL}/api/v1/users/logout`,{
          headers:{
             Authorization:localStorage.getItem("token")
          }
       })
       navigate("/");
      }catch(err){
        alert("Problem in logout",err)
      }
     
    }
  
   
    async function getOtherBrain(hash){
            try{
              const response= await axios.get(`${BACKEND_URL}/api/v1/links/getlink`,
                {
                    params: { hash: hash }, 
                    headers: {
                        authorization: localStorage.getItem("token"), 
                    },
                })

                    setOtherBrainOpen(true);
                    setOtherBrainModalOpen(false);
                    setFirstName(response.data.firstname);
                    setOtherEmail(response.data.email);
                    setOtherContent(response.data.content);
            
            }catch(err){
               alert("Invalid Hash",err)
             
            }
      
    }
    useEffect(()=>{
      check();
      const tm=setInterval(check,10*60000);
      return (()=>{
        clearInterval(tm);
      })

  },[]);
    useEffect(()=>{
      if(deleteId){
        deleteContentId();
      }
    },[deleteId])
    useEffect(()=>{
       refresh();
    },[contentModalOpen])
    useEffect(()=>{
      setBrainType("");
    },[otherBrainOpen]);

   

  if(loading)return <div>Loading...</div>
  return (
    <div>
        <Sidebar typeselection={(type)=>setBrainType(type)}/>
        <div className="ml-64 bg-gray-100 min-h-screen">
           {!otherBrainOpen &&
            <ContentModal open={contentModalOpen} onClose={()=>{setContentModalOpen(false)}}/>}
             {!otherBrainOpen && <ShareHashModal open={hashModalOpen} onClose={()=>{setHashModalOpen(false)}} />}
            {!otherBrainOpen && <OtherBrainModal open={otherBrainModalOpen} onClose={()=>setOtherBrainModalOpen(false)} otherOpen={(hash)=>{getOtherBrain(hash);setOtherHash(hash);}}/>}
           
            {!otherBrainOpen &&
            <div className='bg-white p-4 border h-20 flex justify-between items-center'>
               <div className='text-2xl text-purple-600 font-semibold'>
                 My Brain
              </div>
              <div className=" flex justify-end items-center gap-4">
                <Button onClick={()=>setOtherBrainModalOpen(true)} variant="Secondary" text="See Other's Brain" />
                <Button onClick={()=>setHashModalOpen(true)}  startIcons={<ShareIcon/>} variant="Secondary" text="Share Brain"/>
                <Button onClick={()=>{setContentModalOpen(true);}} startIcons={<PlusIcon/>} variant="Secondary" text="Add Content"  />
                <Button onClick={()=>userLogout()} endIcons={<LogoutIcon/>} variant="Primary" text="Log Out"/>
              </div>
            </div>}
            {otherBrainOpen &&<div className=" bg-white text-purple-600 p-4 border h-20 flex justify-between items-center gap-4">
              <div className='flex gap-6'>
                <div className=' px-2 flex justify-center items-center hover:cursor-pointer hover:bg-purple-200 hover:rounded-lg'  onClick={()=>setOtherBrainOpen(false)}>
                   <LeftIcon/>
                </div>
                 <div className='text-2xl  font-semibold'>{firstName}'s Brain</div>
              </div>
             
              <div className='text-purple-600'>{firstName}'s Hash: <span className='font-mono bg-purple-200 rounded-sm p-1'>{otherHash}</span></div>
              <Logowithtext startTexts={otherEmail}/>
            </div>}
             
            
              <div className="flex flex-wrap gap-4  pt-4 pl-4 ">
                {!otherBrainOpen && contents?.map(({ title, type, link,_id}) => (
                 (type===brainType || brainType==="") && <Card type={type} link={link} title={title} onDelete={()=>{
                    setDeleteId(_id);
                 }}/>
                
                ))}
                 {otherBrainOpen && otherContent?.map(({ title, type, link,_id}) => (
                  (type===brainType || brainType==="")&& <Card type={type} link={link} title={title} />
                ))}
              </div>
              
        </div>
  </div>
  )
}

export default Dashboard
