
const SidebarItem = ({text,icon,brainType,typeselect}) => {
  let type=text.toLowerCase();

  return (
    <div className="pl-8 w-full">
        <div onClick={()=>{typeselect(type)} } className={`flex justify-start rounded max-w-48 my-2  px-4 py-2  text-md items-center gap-3 cursor-pointer
         ${brainType === type ? "bg-purple-600 text-white" : " hover:bg-gray-200  transition-all duration-150  text-gray-500"} `}>
            <div>
              {icon}
            </div>
            <div>
               {text}
            </div>
        </div>
    
    </div>
  )
}

export default SidebarItem