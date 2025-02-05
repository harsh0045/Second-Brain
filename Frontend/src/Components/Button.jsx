
const variantClasses={
    "Primary":"bg-purple-600 text-white hover:bg-purple-500  ",
    "Secondary":"bg-purple-200 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-200 " ,
}
const defaultStyles="px-4 py-2 max-h-12 rounded-md font-base flex items-center gap-2 "
export function Button({text,startIcons,endIcons,variant,onClick,fullWidth,loading}){
   return <button onClick={onClick} className={variantClasses[variant] + " "+defaultStyles + `${fullWidth ?" w-full flex justify-center items-center":"" }` + `${loading ? " opacity-45":"" }`}>
     {startIcons}
     {text}
     {endIcons}
   </button>
}