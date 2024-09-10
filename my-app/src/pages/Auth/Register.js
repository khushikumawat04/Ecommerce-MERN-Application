import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${base_url}/api/v1/auth/register`,{
      method: 'post',
    headers: {
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify({name,email,password,phone,address})
  }    
      );
    //   if(res.status === 200){
    //     const data = await res.json();
      
    //     toast.success(data.message);
    //     // toast.success("Register successfully");
    //     navigate('/login')
    //   }
    //  else if(res.status === 201){
    //     toast.success("Already registred please Login");
    //     navigate('/login');
    //   }
    //   else{
    //     toast.error("Error in Registration");
    //   }
    const data = await res.json();
    if(data.success){
     
      toast.success(data.message);
      navigate('/login')
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
    <div className="form-conatiner mt-5">
      <div className="register">
        <h4 className="mt-3">Registration Page</h4>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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

          <div className="mb-3">
            <input
              type="text"
              value={phone}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone NO"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={address}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
