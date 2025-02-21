import React, { useEffect, useState } from 'react'
import CrossIcon from '../Icons/CrossIcon'
import { Button } from './Button'

import { DeleteIcon } from '../Icons/DeleteIcon'
import RegenerateIcon from '../Icons/RegenerateIcon'
import axios from 'axios'

import CopyIcon from '../Icons/CopyIcon'
import CorrectIcon from '../Icons/CorrectIcon'
import { ShareIcon } from '../Icons/ShareIcon'
import toast from 'react-hot-toast'

const ShareHashModal = ({open,onClose}) => {
    const [hashcode,setHashCode]=useState("Regenerate");
    const [loading,setLoading]=useState(false);
    async function existingLink(){
        try{
            setLoading(true);
            const response= await axios.get(`${process.env.VITE_BACKEND_URL}/api/v1/links/exist`,{
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            
            if(response.data.hash)setHashCode(response.data.hash);
            else setHashCode("Regenerate");
           
        }catch(err){
          toast.error(`${err.response.data.message || "Something went wrong"}`); 
        }finally{
          setLoading(false);
        }
       
    }
    useEffect(()=>{
       existingLink();
 
    },[open]);
    async function addLink(share){
        try{
          setLoading(true);
            const response= await axios.post(`${process.env.BACKEND_URL}/api/v1/links/addlink`,{
                share:share
            },{
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            if(share){
              toast.success("Generated New Hash")
              setHashCode(response.data.hash);
            }else{
              setHashCode("Regenerate")  
              toast.success("Deleted Hash")
            }
            setCopy(false)
           
        }catch(err){
          toast.error(`${err.response.data.message || "Something went wrong"}`); 
        }finally{
          setLoading(false);
        }
       
    }
  const [copy,setCopy]=useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashcode)
      .then(() => {
        setCopy(true);
        toast.success("Copied");
      })
      .catch(() => {
        toast.error("Failed to copy text.");
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
       
      } catch (error) {
        toast.error("Error sharing:", error);
      }
    } else {
      toast.error("Sharing is not supported on this browser.");
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
                         <button onClick={ hashcode && hashcode!=="Regenerate" && copyToClipboard } className="p-2 hover:bg-gray-200 rounded transition-all duration-150">
                              {!copy && <CopyIcon/>}
                              {copy && <CorrectIcon/>}
                         </button>
                    </div>
                  

                    <div className="flex items-center justify-center gap-2 ">
                        
                        <Button loading={loading}  onClick={()=>{addLink(true)}} startIcons={<RegenerateIcon/>} variant="Primary" text="Regenerate"/>
                        <Button loading={loading} onClick={()=>{hashcode && hashcode!=="Regenerate" && addLink(false)}} startIcons={<DeleteIcon/>} variant="Primary" text="Delete"/>
                        {copy && <Button loading={loading}  onClick={()=>{hashcode && hashcode!=="Regenerate" && handleShare()}} startIcons={<ShareIcon/>} variant="Primary" text="Share"/>}
                    </div>
            </div>
        </div> } 

 </div>

)
}

export default ShareHashModal