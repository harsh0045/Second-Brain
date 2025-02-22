import { useEffect, useState } from "react";

import axios from "axios";

export const useContent = () => {
  const [contents,setContents]=useState([]);
  async function refresh (){
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/contents/getcontent`,{
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
