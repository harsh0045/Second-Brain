import React, { useEffect, useRef } from 'react'
import SidebarItem from './SidebarItem'
import { TwitterIcon } from '../Icons/TwitterIcon'
import { YoutubeIcon } from '../Icons/YoutubeIcon'
import { BrainIcon } from '../Icons/BrainIcon'
import { DocsIcon } from '../Icons/DocsIcon'
import { LinkedinIcon } from '../Icons/LinkedinIcon'


const Sidebar = ({typeselection}) => {

  return (
    <div className='h-screen border-r bg-white border shadow-md outline-slate-200 fixed top-0 left-0 w-64  flex flex-col'>
        <div className='text-2xl text-purple-600 font-sans mb-16 p-4 pl-6 font-bold gap-2 flex flex-row items-center'>
               {<BrainIcon/>}
               <div>
                  Second Brain
               </div>
        </div>
        <div className="flex flex-col">
            <SidebarItem typeselect={(type)=>typeselection(type)} text="Twitter" icon={<TwitterIcon/>} />
            <SidebarItem typeselect={(type)=>typeselection(type)} text="Youtube" icon={<YoutubeIcon/>} />
            <SidebarItem typeselect={(type)=>typeselection(type)} text="Linkedin" icon={<LinkedinIcon/>} />
            <SidebarItem typeselect={(type)=>typeselection(type)} text="Docs" icon={<DocsIcon/>} />
        </div>
       
    </div>
  )
}

export default Sidebar