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
