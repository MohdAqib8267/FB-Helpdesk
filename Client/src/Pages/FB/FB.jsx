import React, { useEffect, useRef, useState } from "react";
import "./FB.css"
import { useNavigate } from "react-router-dom";
// import FBtext from "../../Component/FBtext/FBtext";


const Connect = () => {
  
    const navigate = useNavigate();
    const pageId=import.meta.env.VITE_PAGE_ID;
    console.log(pageId);
  return (
      <div className='Auth'>

          <form>
           
              <h2 style={{ fontWeight: "500", marginBottom: "1rem" }}>Facebook Page Integration</h2>
              <button style={{background:"purple",color:'white'}} onClick={()=>navigate(`/chat/${pageId}`)}>Connect Page</button>

            
          </form>
          {/* <FBtext /> */}
      </div>
  );
}

export default Connect;
