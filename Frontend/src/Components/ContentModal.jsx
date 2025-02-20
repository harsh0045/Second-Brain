import { useRef, useState } from "react"
import CrossIcon from "../Icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useContent } from "../hooks/useContent";
import toast from "react-hot-toast";

export function ContentModal({open,onClose}){
    const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const options = [
    { value: "youtube", label: "Youtube" },
    { value: "twitter", label: "Twitter" },
    { value: "linkedin", label: "Linkedin" },
    { value: "docs", label: "Docs" },
  ];
    const titleRef=useRef();
    const linkRef=useRef();
    const {refresh}=useContent();
   
    async function addContent(){
     
       
        const title=titleRef.current?.value;
        if(!title) {toast.error("Title is needed");return;}
    
        const link=linkRef.current?.value;
        if(!link) {toast.error("Link is needed");return;}

        if(!selected){toast.error("Select type");return;}
        try{
            const response= await axios.post(`${BACKEND_URL}/api/v1/contents/addcontent`,{
                title:title,
                link:link,
                type:selected
                
            },{
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            toast.success("Added Content");
           
        }catch(err){
            toast.error(`Not Added:${err.response.data.message || "Something went wrong"}`);    
        }finally{
            onClose();
            setSelected("");
            refresh();
        }
       

    }
    return (
        <div>
           {open && 
            <div className="w-screen bg-opacity-40 h-screen bg-slate-500 fixed top-0 left-0 flex justify-center items-center"> 
                    <div className="bg-white flex flex-col gap-2 p-8 pt-4 rounded-md ">
                        <div className="flex justify-end">
                            <div className="cursor-pointer p-2 rounded hover:bg-gray-200" onClick={()=>{onClose(); setIsOpen(false);setSelected("");}}>
                                <CrossIcon/>
                            </div>
                        </div>
                        <div>
                    
                    <Input reference={titleRef} type="text"  placeholder="Title"/>
                    <Input reference={linkRef} type="text"  placeholder="Link"/>
                    <div className="relative min-w-38 max-w-46">
      
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="py-2 pl-4  w-full text-gray-500 cursor-pointer text-sm md:text-md  font-normal bg-slate-50 border rounded    my-2 focus:outline-none"
                    >
                        {selected || "Select Type"}
                    </div>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <ul className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded shadow-md">
                        {options.map((option) => (
                            <li
                            key={option.value}
                            onClick={() => {
                                setSelected(option.value);
                                setIsOpen(false); // Close dropdown on select
                            }}
                            className="cursor-pointer px-4 py-2 text-gray-500 hover:bg-purple-600 hover:text-white"
                            >
                            {option.label}
                            </li>
                        ))}
                        </ul>
                    )}
                    </div>
                    
                  </div>
                  <div className="flex justify-center ">
                    <Button onClick={addContent} variant="Primary" text="Add Content"/>
                  </div>
               </div>
            </div> } 

        </div>
       
    )
}

