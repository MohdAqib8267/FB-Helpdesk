import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./Pages/Login/Login"
import Auth from './Pages/Signup/Auth'
import FB from "./Pages/FB/FB"
import Delete from './Pages/Delete/Delete'
import Chat from './Pages/Chat/Chat'
import { Routes, Route, useNavigate, Navigate} from "react-router-dom";

function App() {
 
  const token = localStorage.getItem("token");
  console.log(token);
  const navigate=useNavigate();
  
  const isLoggedIn = token;

  // useEffect(() => {
  //   const url=window.location.href;
  // const urlArr=url.split('/');
  // console.log(urlArr)
  // const check = urlArr.includes('login') || urlArr.includes('signup');
  //   if(!token && url.includes('signup')){
  //     navigate('/signup');
  //   }
  //   else if (!token || urlArr.includes('/') ) {
  //     // Redirect to the login page if the user is not authenticated
  //     navigate('/login');
  //   }else if(token && check){
  //     navigate('/chat');
  //   } else{
  //     navigate('/fb');
  //   }

  // }, [token, navigate]);

  return (
    <div className="App">
     
     <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Auth />} />

        {isLoggedIn ? (
          <>
            <Route path="/FB" element={<FB />} />
            <Route path="/delete" element={<Delete />} />
            <Route path="/chat/:pageId" element={<Chat />} />
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}

        

      </Routes>
    </div>
  )
}

export default App
