import React from 'react';
import { useSearch } from '../../../context/Search';
import { useCart } from '../../../context/Cart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "../user/user.css";

const Searchpage = () => {
  const base_url = process.env.BASE_URL;
    const [values,setValues] = useSearch();
    { console.log("values are", values);}
    const [cart,setCart] = useCart([])
    const navigate= useNavigate();
  return (

    <div className='container'>
        <div className='text-center'>
               <h3 className='mt-3'>Search Results</h3>
             
               {/* <h6>{values?.result.length<1 ? 'No Product Found' 
               : `Found ${values?.result.length}` }
               </h6> */}
               <div className='d-flex flex-wrap mt-4'>
                    {/* <h1>Products</h1> */}
                    {
                  values?.result.map((p)=>(
                   
                    <div className="card"  key = {p._id}>
                    <img src={`${base_url}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />
                
                
                   <div className="card-body">
                    <h5 className="card-title ms-2">{p.name}</h5>
                    <p className="card-text ms-2">{p.description.substring(0,20)}....</p>
                    <p className="card-text ms-2 price-text" > ₹ {p.price}</p>
                   <button  className="btn  more-btn m-2 " onClick = {()=> navigate(`/product/${p.slug}`)}>More Details</button>
                    <button  className="btn add-btn "
                     onClick={()=>{setCart([...cart,p])
                      localStorage.setItem('cart',JSON.stringify([...cart,p]))
                      toast.success('Item Addes to cart')
                     }}>ADD To Cart</button>
                    
                
                
                  </div>
                </div>
                   
     

                  ))
              
                }
                </div>
              
        </div>
      
    </div>
  )
}

export default Searchpage
