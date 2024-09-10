import React, { useState } from "react";
import { toast } from "react-toastify";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import "./user/user.css"




const Login = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [auth,setAuth] = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate("");
  const location = useLocation();
  
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${base_url}/api/v1/auth/login`,{
      method: 'post',
    headers: {
      'Content-Type': 'application/json',
     
      
    },
    body: JSON.stringify({email,password})
  }    
      );
    //   if(res.status === 200){
    //     // toast.success(res.data.message);
    //     toast.success("Login successfully");
    //     navigate('/')
    //   }
    //   else if(res.status === 401){
    //     // toast.success(res.data.message);
    //     toast.success("Invalid password");
        
    //   }
    //  else if(res.status === 404){
    //     toast.success("Email is not registered ");
      
    //   }
    //   else{
    //     toast.error("Error in Login");
    //   }
    const data = await res.json();
     if(data.success){
      toast.success(data.message);
      setAuth({
        ...auth,
        user: data.user,
        token: data.token
      })
      localStorage.setItem('auth',JSON.stringify(data));
      navigate(location.state || '/')
    }
    else{
      toast.error(data.message);

    }
    
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="form-container mt-5 login-form">
       <div className="register">
        <h4>Login Page</h4>
        <form onSubmit={handlesubmit}>
         
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <p onClick={()=>navigate('/register')}>Create your Acoount</p>
      </div>
    </div>
      
    
  )
}

export default Login
