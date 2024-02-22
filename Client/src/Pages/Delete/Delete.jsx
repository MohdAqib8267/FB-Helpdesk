import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Delete = () => {
    
  const navigate = useNavigate();
    const pageId=import.meta.env.VITE_PAGE_ID;

    const logout=async()=>{
      localStorage.removeItem("token");
      navigate('/login');
    }
 
  return (
    <div className='Auth'>
      <form>
        <h2 style={{fontWeight:"500"}}>Facebook Page Integration</h2>
        <h2 style={{fontWeight:"500",marginBottom:"1rem"}}>Integrated Page: <b>Amazon Business</b></h2>
      
      <button style={{background:'red',color:'white',width:'100%'}} onClick={logout}>Delete Integration</button>
      <button className='signup-btn' onClick={()=>navigate(`/chat/${pageId}`)}>Reply To Messages</button>
     </form>
     
    </div>
  )
}

export default Delete