import React from 'react'
import { useState,useEffect } from 'react'
import {useAuth} from "../../context/Auth"
import {Outlet} from "react-router-dom"

import Spinner from './Spinner'
const AdminRoute
 = () => {
    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();
    useEffect(()=>{
        const authCheck = async() =>{
        //     const res = await axios.get('/api/v1/auth/user-auth',
        //    { headers: {
        //     "Authorization": auth?.token

        //     }}
        //     )
        const res = await fetch("/api/v1/auth/admin-auth",{
      method: 'get',
    headers: {
        "Authorization": auth?.token
      
    }})
 
    // const data = await res.json();
   
            if(res.ok){
                setOk(true);
            }
            else{
                setOk(false);

                console.log("hj");
            }

        }
        console.log(auth);
        if(auth?.token) authCheck();
    },[auth?.token])

  return ok ? <Outlet/>: <Spinner path="" /> 
}

export default AdminRoute;

