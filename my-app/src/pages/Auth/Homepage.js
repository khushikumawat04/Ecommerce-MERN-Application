import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/Auth';
// import Layout from '../../components/Layout/Layout';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../../components/Prices';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/Cart';
import { toast } from 'react-toastify';
import "./user/user.css";
// import dotenv from 'dotenv';
const Homepage = () =>{
 

// dotenv.config();
const base_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
    const [auth,setauth] = useAuth();
    const [products, setProducts] = useState([]);
    const[categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio,setRadio] = useState([]);
      const [cart,setCart] = useCart([])
    // get category
    const getAllCategory = async()=>{
        try {
          const res = await fetch(`${base_url}/api/v1/category/get-category`,{
          method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        
          
          
        } } )
        const data = await res.json();
        if(data.success){
            setCategories(data.category);
        }
      }catch (error) {
          console.log(error);
          
        }
      }
      useEffect(()=>{
        getAllCategory();
    
      },[])
    // get product
    const getAllProducts = async () =>{
        try {
            const res = await fetch(`${base_url}/api/v1/product/get-product`,{
              method: 'GET',
            headers: {
              'Content-Type': 'application/json'
              
            } } )
            const data = await res.json();
            console.log("All Product" ,data);
            if(data?.success){
              setProducts(data.products);
              // console.log(product);
            }} catch (error) {
            console.log(error);
        }
    }
    
    // filter by category
    const handleFilter = (value,id) =>{
        let all = [...checked];
        if(value){
            all.push(id);
        }
        else{
            all = all.filter(c=>c!==id)
        }
        setChecked(all);
    }

    
   
// get filter product
// const filterProduct = async () => {
  

//   try {
//     console.log("filterProduct function called");
//       const res = await fetch('http://localhost:8080/api/v1/product/product-filters', {
//           method: "POST",
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ checked, radio })
//       });
//       const data = await res.json();
//       console.log("filter", data);
//       if (data?.success) {
//           setProducts(data.products);
//       }
//   } catch (error) {
//       console.log(error);
//   }
// }
const filterProduct = async () => {
  console.log(radio);
  try {
    const response = await fetch(`${base_url}/filters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ radio }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    setProducts(data?.products);
  } catch (error) {
    console.log(error);
  }
};



useEffect(()=>{
  if(!checked.length || !radio.length) getAllProducts();
      },[])

      useEffect(()=>{
        if(checked.length || radio.length) filterProduct();
      },[checked,radio])
      // useEffect(()=>{
      //   filterProduct();
      // })
   
    return(
        <>
         {/* {/* <h1>Homepage</h1> */}
        {/* <p>{JSON.stringify(auth,null,4)}</p>  ` */}
         {/* banner image */}
      <img
        src="/image/517.jpg"
        className="banner-img mt-3"
        alt="bannerimage"
        width={"100%"}
        height={"300px"}
      />
      {/* banner image */}
        <div className='row mt-5'>
           
            <div className='col-md-3'>
            
                {/* {JSON.stringify(checked,null,4)} */}
                <div className='d-flex flex-column ms-3 category-container'>
                <h4 className='text-center'>Categories</h4>
                {
                    categories?.map((c)=>(
                        <Checkbox key = {c.id} onChange = {(e)=>handleFilter(e.target.checked,c._id)} className='check-box'>
                            {c.name}
                        </Checkbox>
                    ))
                }

                </div>
                {/* price filter */}
               
                {/* {JSON.stringify(radio,null,4)} */}
                <div className='d-flex flex-column ms-3 price-container mt-5'>
                <h4 className='text-center mt-4'>Filter By Price</h4>
               <Radio.Group onChange={e=>setRadio(e.target.value)}>
                {
                   Prices?.map(p=>(
                    <div key = {p._id} className='radio-btn'>
                   <Radio value = {p.array} >{p.name}</Radio>
                    </div>
                    
                   ))
                }
               </Radio.Group>
               <div className='d-flex flex-column ms-3 reset-btn'>
                  <button className='btn reset-btn' onClick={()=>window.location.reload()}>RESET FILTERS</button>
                </div>
                </div>
               
               
            </div>

            {/* cards */}
            <div className='col-md-9'>
                {/* <h1 className='text-center'>All Products</h1> */}
                <div className=' card-container'>
                    {/* <h1>Products</h1> */}
                    {
                  products.map((p)=>(
              <>    
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

</>
                   
     

                  ))
              
                }
                </div>
            </div>

        </div>
        </>
    )
}
export default Homepage;