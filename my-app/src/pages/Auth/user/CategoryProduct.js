

import React, {useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../../context/Cart';

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category,setCategory] = useState([]);
    const [cart,setCart] = useCart([]);
    const params = useParams();
    const navigate = useNavigate();
      const getProductByCat = async () =>{
        try {
            const res =  await fetch(`http://localhost:8080/api/v1/product/product-category/${params.slug}`,{
               method: "GET",
               headers: {
                "Content-Type" : "application/json"
               }
              

            })
            const data = await res.json();
            setProducts(data?.products);
            setCategory(data?.category);
            
        } catch (error) {
            console.log(error);
            
        }
      }
      useEffect(()=>{
         if(params?.slug) getProductByCat();
         
      },[params?.slug])
      console.log(category);
  return (
    
    <div>
        <div className='container mt-5'>
            <h3 className='text-center'>Category - {category?.name}</h3>
            <h6 className='text-center'>{products?.length} Result Found</h6>
          
            <div className='d-flex flex-wrap'>
                    {/* <h1>Products</h1> */}
                    {
                  products.map((p)=>(
                   
                    <div className="card m-2"  key = {p._id}>
                    <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />
                
                
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

export default CategoryProduct
