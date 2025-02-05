import React, { useEffect, useState } from 'react'
import CrossIcon from '../Icons/CrossIcon'
import { Button } from './Button'

import { DeleteIcon } from '../Icons/DeleteIcon'
import RegenerateIcon from '../Icons/RegenerateIcon'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import CopyIcon from '../Icons/CopyIcon'
import CorrectIcon from '../Icons/CorrectIcon'
import { ShareIcon } from '../Icons/ShareIcon'

const ShareHashModal = ({open,onClose}) => {
    const [hashcode,setHashCode]=useState("Regenerate");
    async function existingLink(){
        try{
            const response= await axios.get(`${BACKEND_URL}/api/v1/links/exist`,{
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            
            setHashCode(response.data.hash);
        }catch(err){
            console.log(err);
        }
       
    }
    useEffect(()=>{
        existingLink()
    },[open]);
    async function addLink(share){
        try{
            const response= await axios.post(`${BACKEND_URL}/api/v1/links/addlink`,{
                share:share
            },{
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            if(share)setHashCode(response.data.hash);
            else setHashCode("Regenerate")
        }catch(err){
            console.log(err);
        }
       
    }
  const [copy,setCopy]=useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashcode)
      .then(() => {
        setCopy(true);
      })
      .catch(() => {
        alert("Failed to copy text.");
      });
  };
  const handleShare = async () => {
        
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Hashcode",
          text: "Other's Brain",
          url: hashcode, // Use the passed URL directly
        });
        console.log("Shared successfully!");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };
  return (
    <div>
        {open && 
        <div className="w-screen bg-opacity-40 h-screen bg-slate-500 fixed top-0 left-0 flex justify-center items-center"> 
                <div className="bg-white flex flex-col gap-2 p-8 pt-4 rounded-md ">
                    <div className="flex justify-end">
                        <div className="cursor-pointer p-2 hover:bg-gray-200 rounded" onClick={()=>{onClose();setCopy(false)}}>
                            <CrossIcon/>
                        </div>
                    </div>
                    <div   className="p-2 pl-4  flex justify-between items-center text-gray-500 font-mono  font-normal bg-slate-50 border rounded min-w-56  my-2">
                       <div> {hashcode}</div> 
                         <button onClick={copyToClipboard} className="p-2 hover:bg-gray-200 rounded transition-all duration-150">
                              {!copy && <CopyIcon/>}
                              {copy && <CorrectIcon/>}
                         </button>
                    </div>
                  

                    <div className="flex items-center justify-center gap-2 ">
                        
                        <Button onClick={()=>{addLink(true)}} startIcons={<RegenerateIcon/>} variant="Primary" text="Regenerate"/>
                        <Button onClick={()=>{addLink(false)}} startIcons={<DeleteIcon/>} variant="Primary" text="Delete"/>
                        {copy && <Button onClick={()=>{handleShare()}} startIcons={<ShareIcon/>} variant="Primary" text="Share"/>}
                    </div>
            </div>
        </div> } 

 </div>

)
}

export default ShareHashModal