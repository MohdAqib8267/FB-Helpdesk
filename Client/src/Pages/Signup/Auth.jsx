import React,{useState} from 'react'
import "./Auth.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Auth = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, SetEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // onSubmit({ username, password });
    try {
      const response = await axios.post(`http://localhost:8000/api/user/signup`,{
        
          name:username,
          email,
          password
        
      })
      const { token, newUser } = response.data;
      console.log(token,newUser);
    //  console.log(response.data.message)
    localStorage.setItem("token",token);
      navigate('/fb');
    } catch (error) {
      console.log(error);
      if(error.response.status == 401){
        alert('User is already exist');
      }
    }
  };

  return (
    <div className='Auth'>
      <form onSubmit={handleSubmit}>
        <h2 style={{fontWeight:"500"}}>Create Account</h2>
      <label>
        Name:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
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
      
      <button className='signup-btn'>Signup</button>

      <div className="already">
        
        <span>Already have an account?</span><span className='log'><Link to="/login">Login</Link></span>
      </div>
     </form>
     
    </div>
  )
}

export default Auth
