
const variantClasses={
    "Primary":"px-2 md:px-4 bg-purple-600 text-white hover:bg-purple-500 rounded-md ",
    "Secondary":" px-2 md:px-4 bg-purple-200 text-purple-600 hover:bg-purple-600 rounded-md hover:text-white transition-all duration-200 " ,
    "StartingP":"px-3 md:px-4 bg-purple-600 text-white hover:bg-purple-500 rounded-full",
    "StartingS":" px-3 md:px-4 bg-purple-200 text-purple-600 hover:bg-purple-600 rounded-full hover:text-white transition-all duration-200 ",
}
const defaultStyles=" py-2 max-h-12 text-sm md:text-md font-base flex items-center gap-2 "
export function Button({text,startIcons,endIcons,variant,onClick,fullWidth,loading}){
   return <button onClick={onClick} className={variantClasses[variant] + " "+defaultStyles + `${fullWidth ?" w-full flex justify-center items-center":"" }` + `${loading ? " opacity-45":"" }`}>
     {startIcons}
     {text}
     {endIcons}
   </button>
}