import React,{useEffect, useState} from 'react'
import "./Login.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, SetEmail] = useState('');
  const navigate = useNavigate();
  
   
  
 
  const handleSubmit = async(e) => {
    e.preventDefault();
   
    try {
      const response = await axios.post(`http://localhost:8000/api/user/login`,{
          email,
          password
        
      })
      const { token} = response.data;
      localStorage.setItem("token",token);
      if(response){
        navigate('/fb');
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      if(error.response.status==400){
        alert('user not found');
      }
      if(error.response.status==401){
        alert('email or password wrong');
      }
    }
  };

  
  
  return (
    <div className='Auth'>
      <form onSubmit={handleSubmit}>
        <h2 style={{fontWeight:"500"}}>Login to your account</h2>
      
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => SetEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label className="chkbox">
       <input style={{width:"fit-content"}} type="checkbox" name="" id="" /> <span>Remember me</span> 
       </label>
      
      <button className='signup-btn'>Login</button>

      <div className="already">
        <span>New to MyApp?</span><span className='log'><Link to="/signup">Signup</Link></span>
      </div>
     </form>
     
    </div>
  )
}

export default Login
