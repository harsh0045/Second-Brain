import { useRef, useState } from "react"
import CrossIcon from "../Icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useContent } from "../hooks/useContent";

export function ContentModal({open,onClose}){
    const titleRef=useRef();
    const linkRef=useRef();
    const {refresh}=useContent();
    const [selectedType, setSelectedType] = useState(""); // State for selected value

    const handleChange = (event) => {
        setSelectedType(event.target.value); // Update the selected value
    };
    async function addContent(){
        onClose();
       
        const title=titleRef.current?.value;
        const link=linkRef.current?.value;
        try{
            const response= await axios.post(`${BACKEND_URL}/api/v1/contents/addcontent`,{
                title:title,
                link:link,
                type:selectedType
                
            },{
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            refresh();
        }catch(err){
            console.log(err);
        }
       

    }
    return (
        <div>
           {open && 
            <div className="w-screen bg-opacity-40 h-screen bg-slate-500 fixed top-0 left-0 flex justify-center items-center"> 
                    <div className="bg-white flex flex-col gap-2 p-8 rounded-md ">
                        <div className="flex justify-end">
                            <div className="cursor-pointer p-2 rounded hover:bg-gray-200" onClick={onClose}>
                                <CrossIcon/>
                            </div>
                        </div>
                        <div>
                    
                    <Input reference={titleRef}  placeholder="Title"/>
                    <Input reference={linkRef}  placeholder="Link"/>
                    <div>
                       <select className="px-4 py-2 border rounded bg-slate-50 font-normal text-gray-500 min-w-56 my-2 " value={selectedType} onChange={handleChange}>
                        <option  value="" disabled >-- Select Type --</option>
                        <option  value="youtube">Youtube</option>
                        <option value="twitter">Twitter</option>
                        <option  value="linkedin">Linkedin</option>
                        <option value="docs">Docs</option>
                        
                      </select>
                    </div>
                    
                  </div>
                  <div className="flex justify-center ">
                    <Button onClick={addContent} variant="Primary" text="Submit"/>
                  </div>
               </div>
            </div> } 

        </div>
       
    )
}

