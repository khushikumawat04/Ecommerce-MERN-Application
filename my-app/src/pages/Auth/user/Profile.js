import React, {useState,useEffect} from 'react'
import UserMenu from '../../../components/Layout/UserMenu';
import { useAuth } from '../../../context/Auth';
import { toast } from 'react-toastify';
import "./user.css";
const Profile = () => {
  const base_url = process.env.BASE_URL;
  // context
  const [auth,setAuth] = useAuth();
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address,setAddress] = useState("");


  // get user data
  useEffect(()=>{
                const {name,email,phone,address,password} = auth?.user;
                setName(name);
                setEmail(email);
               
                setAddress(address);
                setPhone(phone);
  },[auth?.user])
  // form handle
  // const handlesubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch("http://localhost:8080/api/v1/auth/profile",{
  //     method: 'put',
  //   headers: {
  //     'Content-Type': 'application/json',
      
  //   },
  //   body: JSON.stringify({name,email,password,phone,address})
  // }    
  //     );
   
  //   const data = await res.json();
  //   if(data.success){
  //     setAuth({...auth, user: data?.updateUser})
  //     let ls = localStorage.getItem('auth');
  //     ls = JSON.parse(ls);
  //     ls.user = data.updateUser;
  //     localStorage.setItem('auth', JSON.stringify(ls));                                                    
  //     toast.success(data.message);
    
  //   }
  //   else{
  //     toast.error(data.message);

  //   }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
  // };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
        const authData = localStorage.getItem('auth'); // Assuming you store the JWT token in 'token' key of localStorage
        const auth = JSON.parse(authData);

        // Access the token from the auth object
        const token = auth.token;
        console.log(token);
        const res = await fetch(`${base_url}/api/v1/auth/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
            },
            body: JSON.stringify({ name, email, password, phone, address })
        });

        const data = await res.json();
        if (data.success) {
            setAuth({ ...auth, user: data?.updateUser });
            let ls = localStorage.getItem('auth');
            ls = JSON.parse(ls);
            ls.user = data.updateUser;
            localStorage.setItem('auth', JSON.stringify(ls));
            toast.success(data.message);

        } else {
            toast.error(data.message);

        }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }
};

  return (
    <div>
         <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu/>
          </div>
          <div className='col-md-9'>
          <div className="update-user-profile">
        <h4>USER PROFILE</h4>
        <div  className="punderline"><span></span></div> 
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
              disabled
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

          <button type="submit" className="btn">
           UPDATE
          </button>
        </form>
      </div> 

          </div>
        </div>

      </div>
      
    </div>
  )
}

export default Profile
