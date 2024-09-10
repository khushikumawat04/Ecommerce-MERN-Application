import React from 'react'
import { useState,useEffect } from 'react'
import AdminMenu from '../../../components/Layout/AdminMenu'
import { FormItemInputContext } from 'antd/es/form/context'
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';
const Products = () => {
  const base_url = process.env.REACT_APP_BASE_URL;

  const [product,setProduct] = useState([]);
  const getAllProducts = async()=>{
    try {
      const res = await fetch(`${base_url}/api/v1/product/get-product`,{
        method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        
      } } )
      const data = await res.json();
      console.log(data);
      if(data?.success){
        setProduct(data.products);
        // console.log(product);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
      
    }
  }
  useEffect(()=>{
    getAllProducts();
  },[])
  return (
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9 '>
                <h3 className='text-center mt-4'>All Products List</h3>
                <div className='d-flex flex-wrap mt-4 ' >
                {
                  product.map((p)=>(
                    <Link  className = "product-link" key = {p._id} to={`/dashboard/admin/product/${p.slug}`} >
    <div className="card m-2" style={{width: '18rem'}} key = {p._id}>
    <img src={`${base_url}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />


  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description}</p>
    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  </div>
</div>
                    </Link>
     

                  ))
              
                }
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Products
