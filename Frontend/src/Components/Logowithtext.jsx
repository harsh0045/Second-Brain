

const defaultStyles=" bg-purple-600 text-white px-6 py-2 max-h-12 rounded-3xl font-base flex items-center gap-2 "
function Logo({firstletter}){
   
   return (
    <div className="p-3 h-3 w-3 bg-purple-200 text-purple-600 rounded-full flex items-center justify-center">
        {firstletter}
    </div>
   )
}
export function Logowithtext({startTexts,endTexts}){
   let firstletter=startTexts?.charAt(0).toUpperCase() || endTexts?.charAt(0).toUpperCase();
   return <div className={defaultStyles} >
     {startTexts}
     <Logo firstletter={firstletter} />
     {endTexts}
   </div>
}