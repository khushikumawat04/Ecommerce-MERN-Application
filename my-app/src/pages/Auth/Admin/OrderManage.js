import React, { useState,useEffect } from 'react'
import AdminMenu from '../../../components/Layout/AdminMenu'
import moment from 'moment'
import { useAuth } from '../../../context/Auth'
import { Select } from 'antd'
const {Option} = Select;

const OrderManage = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
    const [status,setstatus] = useState(["Not Process", "Processing", "Shipped","deliverd", "cancel" ])
    const [changeStatus,setChangeStatus]= useState("");
    const [orders,setOrders] = useState([]);
  const [auth,setAuth] = useAuth();
  const getOrders = async()=>{

    try {
      const res = await fetch(`${base_url}/api/v1/auth/all-orders`,
       {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth.token}`
        }})
        const data = await res.json();
        setOrders(data);
        console.log("orders" ,data);
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    if(auth?.token) getOrders()

  },[auth?.token])

  const handleChange = async(orderid,value)=>{
    try {
        const res  = await fetch(`${base_url}/api/v1/auth/order-status/${orderid}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${auth.token}`
              },
              body: JSON.stringify({status:value})
        })
        getOrders();
        
    } catch (error) {
        console.log(error);
        
    }

  }
  return (
   <div className='container-fluid m-3 p-3'>
   <div className='row'>
    <div className='col-md-3'>
      <AdminMenu/>
    </div>
    <div className='col-md-9'>
        <h3 className='text-center'>All Orders</h3>
        {console.log(orders)}
        {
            orders?.map((o,i) => (
              
               <div className='borders shadow mt-4'>

                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>#</th>
                          <th scope='col'>Status</th>
                          <th scope='col'>Buyers</th>
                          <th scope='col'>Date</th>
                          <th scope='col'>payment</th>
                          <th scope='col'>Quantity</th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i+1}</td>
                          <td><Select bordered={false} onChange={(value)=>handleChange(o._id,value)} defaultValue={o?.status}>
                            {status.map((s,i) => (
                                <>
                                <Option key={i} value= {s}>{s}</Option>
                                </>
                            ))}
                            </Select></td>
                          <td>{o?.buyer?.name }</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                           <td>{o?.payment.success? "success": "Failed"}</td>
                           <td>{o?.products?.length}</td> 

                        </tr>
                      </tbody>
                    </table>
                    <div className='container'>
                    {
                        o?.products?.map( (p) =>(
                            <div className='row mb-2 p-3 card flex-row'>
                                <div className='col-md-4' >
                                <img src={`${base_url}/api/v1/product/product-photo/${p._id}`}
                                 className="card-img-top" alt={p.name}
                                 width = "100" height = "200" />
                                </div>
                                <div className='col-md-7'>
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0,30)}</p>
                                    <p>Price: {p.price}</p>
                                  


                                </div>
                                </div>
                        ))
                    }
                    </div>
               </div>
            ))
          }
    </div>
   </div>
   </div>
  )
}

export default OrderManage
