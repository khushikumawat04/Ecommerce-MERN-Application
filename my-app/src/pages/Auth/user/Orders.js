import React, { useEffect, useState } from 'react'
import UserMenu from '../../../components/Layout/UserMenu'
import { useAuth } from '../../../context/Auth';
import "./user.css"
import moment from "moment"
const Orders = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [orders,setOrders] = useState([]);
  const [auth,setAuth] = useAuth();
  const getOrders = async()=>{

    try {
      const res = await fetch(`${base_url}/api/v1/auth/orders`,
       {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth.token}`
        }})
        const data = await res.json();
        setOrders(data);
        console.log(orders)
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    if(auth?.token) getOrders()
      console.log(orders);

  },[auth?.token])
  return (
    <div>
         <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu/>
          </div>
          <div className='col-md-9'>
          <h3 className='text-center' style={{"color":"var(--second)"}}> All Orders</h3>
          {/* <div className="punderline text-center"><span></span></div>  */}
          {
            orders?.map((o,i) => (
               <div className='borders shadow mt-3'>
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
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name || 'N/A'}</td>
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
                                    <p className='order-product-name'>{p.name}</p>
                                    <p>{p.description.substring(0,30)}...</p>
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
      
    </div>
  )
}

export default Orders
