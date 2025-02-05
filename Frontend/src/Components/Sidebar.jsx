import React, { useEffect, useRef } from 'react'
import SidebarItem from './SidebarItem'
import { TwitterIcon } from '../Icons/TwitterIcon'
import { YoutubeIcon } from '../Icons/YoutubeIcon'
import { BrainIcon } from '../Icons/BrainIcon'
import { DocsIcon } from '../Icons/DocsIcon'
import { LinkedinIcon } from '../Icons/LinkedinIcon'
import CrossIcon from '../Icons/CrossIcon'
import { StackIcon } from '../Icons/StackIcon'

const Sidebar = ({brainType,setBrainType,onClose}) => {

  return (
    <div className='h-screen border-r bg-white border shadow-md outline-slate-200 fixed top-0 left-0 w-64  flex flex-col'>
          <div className='md:hidden flex flex-row-reverse'>
              <span onClick={onClose} className=' text-purple-600 mr-4 mt-2 p-2 cursor-pointer rounded hover:bg-gray-200'>
                      <CrossIcon/>
              </span>
          </div>
          
        <div className='text-2xl text-purple-600 font-sans mb-16 p-4 pl-6 font-bold gap-2 flex flex-row items-center'>
               {<BrainIcon/>}
               <div>
                  Second Brain
               </div>
               
        </div>
        <div className="flex flex-col">
           <SidebarItem brainType={brainType} typeselect={(type)=>setBrainType(type)} text="Recent" icon={<StackIcon/>} />
            <SidebarItem brainType={brainType} typeselect={(type)=>setBrainType(type)} text="Twitter" icon={<TwitterIcon/>} />
            <SidebarItem brainType={brainType} typeselect={(type)=>setBrainType(type)} text="Youtube" icon={<YoutubeIcon/>} />
            <SidebarItem brainType={brainType} typeselect={(type)=>setBrainType(type)} text="Linkedin" icon={<LinkedinIcon/>} />
            <SidebarItem brainType={brainType} typeselect={(type)=>setBrainType(type)} text="Docs" icon={<DocsIcon/>} />
        </div>
       
    </div>
  )
}

export default Sidebar