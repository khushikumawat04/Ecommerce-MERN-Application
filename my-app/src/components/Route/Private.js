import React from 'react'
import { useState,useEffect } from 'react'
import {useAuth} from "../../context/Auth"
import {Outlet} from "react-router-dom"
import axios from 'axios'
import Spinner from './Spinner'
const Private = () => {
    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();
    useEffect(()=>{
        const authCheck = async() =>{
        //     const res = await axios.get('/api/v1/auth/user-auth',
        //    { headers: {
        //     "Authorization": auth?.token

        //     }}
        //     )
        const res = await fetch("/api/v1/auth/user-auth",{
      method: 'get',
    headers: {
        "Authorization": auth?.token
      
    }})
            if(res.ok){
                setOk(true);
            }
            else{
                setOk(false);
            }

        }
        if(auth?.token) authCheck();
    },[auth?.token])

  return ok ? <Outlet/>: <Spinner/> 
}

export default Private
