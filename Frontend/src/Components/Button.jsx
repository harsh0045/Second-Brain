
const variantClasses={
    "Primary":"bg-purple-600 text-white hover:bg-purple-500 rounded-md ",
    "Secondary":"bg-purple-200 text-purple-600 hover:bg-purple-600 rounded-md hover:text-white transition-all duration-200 " ,
    "StartingP":"bg-purple-600 text-white hover:bg-purple-500 rounded-full",
    "StartingS":"bg-purple-200 text-purple-600 hover:bg-purple-600 rounded-full hover:text-white transition-all duration-200 ",
}
const defaultStyles="px-4 py-2 max-h-12  font-base flex items-center gap-2 "
export function Button({text,startIcons,endIcons,variant,onClick,fullWidth,loading}){
   return <button onClick={onClick} className={variantClasses[variant] + " "+defaultStyles + `${fullWidth ?" w-full flex justify-center items-center":"" }` + `${loading ? " opacity-45":"" }`}>
     {startIcons}
     {text}
     {endIcons}
   </button>
}