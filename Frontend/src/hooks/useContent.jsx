import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export const useContent = () => {
  const [contents,setContents]=useState([]);
  async function refresh (){
    await axios.get(`${BACKEND_URL}/api/v1/contents/getcontent`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
     })
     .then((response)=>{
        setContents(response.data.content);
     })
  }
  useEffect(()=>{
     refresh();
    //  let interval=setInterval(refresh,10*1000);
    //  return ()=>{
    //     clearInterval(interval);
    //  }
  },[]);
  return {contents,refresh};
}
