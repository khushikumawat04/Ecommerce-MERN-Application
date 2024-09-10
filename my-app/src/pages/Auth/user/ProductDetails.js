import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./user.css";


const ProductDetails = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
    const params = useParams();
    const [product,setProduct] = useState({});
    const [relativeproduct,setRelativeproduct] = useState([]);
    useEffect(()=>{
                if(params?.slug) getProduct();
    },[params?.slug])
    // get product
    const getProduct = async () =>{
        try {
            const res = await fetch(`${base_url}/api/v1/product/get-product/${params.slug}`,{
              method: 'GET',
            headers: {
              'Content-Type': 'application/json'
              
            } } )
            const data = await res.json();
            console.log("slug Product" ,data);
            
              setProduct(data?.product);
              getSimilatProduct(data?.product._id,data?.product.category._id);
              // console.log(product);
            
            
        } catch (error) {
            console.log(error);
        }
    }
    // getsimilar product
    const getSimilatProduct = async(pid,cid)=>{
                 try {
                    const res = await fetch(`${base_url}/api/v1/product/related-product/${pid}/${cid}`,{
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json'
                        }
                    })
                    const data = await res.json();
                    console.log("similar", data);
                    setRelativeproduct(data?.products);
                  
                    
                 } catch (error) {
                     console.log(error)
                 }
    }
  return (
    <div>
      {/* <h1 className='mt-1'>Product Details</h1> */}
      {/* {JSON.stringify(product, null, 4)} */}
      <h3 className='text-center mt-5'>Product Details</h3>
      <div className='row container mt-5'>

      
        <div className='col-md-6'>
   
        <img src={`${base_url}/api/v1/product/product-photo/${product._id}`} 
        className="card-img-top" alt={product.name} height="300"
         width= "200"/>
                   
        </div>
        <div className='col-md-5 ms-1'>
          
            <h6>Name: {product.name}</h6>
            <h6>Description: {product.description}</h6>
            <h6>Price: {product.price}</h6>
            <h6>Category: {product?.category?.name}</h6>
            {/* <h6>Shipping: {product.shipping}</h6> */}
            <button  className="btn add-btn ms-1">ADD To Cart</button>

        </div><br></br>
        <hr className='mt-5'></hr>
        <div className='row'>
          <h6>Similar Product</h6>
          {relativeproduct.length<1 && (<p className='text-center'>No Similar Products found</p>)}
          <div className='d-flex flex-wrap'>
                    {/* <h1>Products</h1> */}
                    {
                 relativeproduct.map((p)=>(
                   
    <div className="card m-2" style={{width: '18rem'}} key = {p._id}>
    <img src={`${base_url}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />


  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description.substring(0,30)}....</p>
    <p className="card-text"> {p.price}</p>
   <button  className="btn  ms-1 more-btn" onClick = {()=> navigate(`/product/${p.slug}`)}>More Details</button>
    <button  className="btn add-btn ms-1">ADD To Cart</button>

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

export default ProductDetails
