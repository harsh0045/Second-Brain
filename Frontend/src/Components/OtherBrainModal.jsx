import React, { useEffect, useRef, useState } from 'react'
import CrossIcon from '../Icons/CrossIcon'
import { Button } from './Button'
import { Input } from './Input'



const OtherBrainModal = ({open,onClose,otherOpen}) => {

    const hashRef=useRef();
  return (
    <div>
    {open && 
        <div className="w-screen  bg-opacity-40 h-screen bg-slate-500 fixed top-0 left-0 flex justify-center items-center"> 
                <div className="bg-white flex flex-col gap-2 p-4 pt-2 max-w-46 rounded-md ">
                    <div className="flex justify-end">
                        <div className="cursor-pointer p-2 hover:bg-gray-200 rounded" onClick={onClose}>
                            <CrossIcon/>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 ">
                      <Input reference={hashRef} type="text" placeholder="Enter hash" />
                      <Button onClick={()=>otherOpen(hashRef.current?.value)} variant="Primary" text="Search"/>
                    </div>
            </div>
        </div> } 

 </div>
  )
}

export default OtherBrainModal