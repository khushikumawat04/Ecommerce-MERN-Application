import { useState,useEffect } from 'react'
import React from 'react';
import { toast } from "react-toastify";
import AdminMenu from '../../../components/Layout/AdminMenu'
import { Select } from 'antd';
import {useAuth } from '../../../context/Auth';
import { useNavigate } from 'react-router-dom';
const {Option} = Select;



const CreateProduct = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();
  const [categories,setCategories] = useState([]);
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [photo,setPhoto] = useState("");
  const [category,setCategory] = useState("");
const [quantity,setQuantity]= useState("");
const [shipping,setShipping] = useState("");

// get product
const getAllCategory = async()=>{
  try {
    const res = await fetch(`${base_url}/api/v1/category/get-category`,{
    method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  
    
    
  } } )
  const data = await res.json();
  if(data?.success){
    setCategories(data?.category);
  }
}catch (error) {
    console.log(error);
    toast.error("Something wemt wrong in getting category")
  }
}
useEffect(()=>{
  getAllCategory();

},[])


 
// const handleCreate = async (e) => {
//   e.preventDefault();
//   try {
//     const productData = new FormData();
//     productData.append('name', name);
//     productData.append('description', description);
//     productData.append('price', price);
//     productData.append('quantity', quantity);
//     productData.append('category', category);
//     productData.append('shipping', shipping);
//     productData.append('photo', photo);

//     const res = await fetch('${base_url}/api/v1/product/create-product', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${auth.token}`,
//       },
//       body: productData,
//     });

//     const data = await res.json();
//     if (data?.success) {
//       toast.success('Product created successfully');
//       navigate('/dashboard/admin/products');
//     } else {
//       toast.error(data?.message || 'Failed to create product');
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error('Something went wrong while creating the product');
//   }
// };

// const handleCreate = async(e) =>{
//        e.preventDefault();
//        try {
//         const productData = new FormData();
//         productData.append("name",name);
//         productData.append("description",description)
//         productData.append("price",price);
//         productData.append("photo",photo);
//         productData.append("category",category);
//         const {data} = axios.post('api/v1/product/create-product',productData);
//         if(data.success){
//           toast.error(data?.message);

//         }
//         else{
//           toast.success('Product Created successfully');
//           navigate('/dashboard/admin/products');
          
//         }
//        } catch (error) {
//         console.log(error);
//         toast.error("something went wrong");
        
//        }  
// }

// const handleCreate = async (e) => {
//   e.preventDefault();
//   try {
//     const productData = new FormData();
//     productData.append("name", name);
//     productData.append("description", description);
//     productData.append("price", price);
//     productData.append("photo", photo);
//     productData.append("category", category);
//     productData.append("shipping",shipping);

//     const res = await fetch('http://127.0.0.1:8080/api/v1/product/create-product', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${auth.token}` 
//       },
//       mode: 'no-cors',
//       body: productData,
//     });

//     const data = await res.json();
    
//     if (data.success) {
//       toast.success('Product Created successfully');
//       navigate('/dashboard/admin/products');
     
//     } else {
//       toast.error(data?.message);
     
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error("something went wrong");
//   }
// };

const handleCreate = async (e) => {
  e.preventDefault();
  try {
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("photo", photo);
    productData.append("quantity",quantity);
    productData.append("category", category);
    productData.append("shipping", shipping);

    const response = await fetch(`${base_url}/api/v1/product/create-product`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth.token}`,
      },
      body: productData,
    });

    const data = await response.json();
    console.log(data);

    if (data.success) {
      toast.success('Product Created successfully');
      navigate('/dashboard/admin/products');
    } else {
      toast.error(data?.error || 'Failed to create product');
    }
  } catch (error) {
    console.error(error);
    toast.error('Something went wrong while creating the product');
  }
};


  return (
    <div>
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
         <AdminMenu/>
        </div>
        <div className='col-md-9 cproduct-container'>
        <h3>create  Product</h3>
          <div className='m-1 w-75 mt-3'>
            <Select bordered={false} placeholder= "Select a category"
             size="large" showSearch
             className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
             
                 {categories?.map((c) => (
    <Option key={c._id} value={c._id}>
      {c.name}
    </Option>
  ))}
            </Select>
            <div className='mb-3'>
              <label  className='btn photo-btn col-md-12'>
                {photo ? photo.name: "Upload Photo" }
              <input type='file' name='' id='' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
              </label>
            </div>

            <div className='mb-3'>
              {photo && 
              <div className='text-center'>
                <img src={URL.createObjectURL(photo)} alt='product photo' 
                height={'200px'} className='img img-responsive'/>
                </div>}
            </div>

            <div className='mb-3'>
              <input
              type='text'
              value={name}
              placeholder='write a name'
              className='form-control'
              onChange={(e)=>setName(e.target.value)}/>

            </div>

            <div className='mb-3'>
              <textarea
              type='textarea' row="3" col="10"
              value={description}
              placeholder='write a description'
              className='form-control'
              onChange={(e)=>setDescription(e.target.value)}>
              </textarea>

            </div>

            <div className='mb-3'>
              <input
              type='text'
              value={price}
              placeholder='Enter Price'
              className='form-control'
              onChange={(e)=>setPrice(e.target.value)}/>
            </div>

            <div className='mb-3'>
              <input
              type='text'
              value={quantity}
              placeholder='Enter quantity'
              className='form-control'
              onChange={(e)=>setQuantity(e.target.value)}/>
            </div>

            <Select bordered={false} placeholder= "Select shipping"
             size="large" showSearch
             className='form-select mb-3' onChange={(value)=>{setShipping(value)}}>
             
             <Option value="0">No</Option>
             <Option value="1">Yes</Option>
       </Select>

            <div className='mb-3'>
              <button className='btn p-btn'
              onClick={handleCreate}>CREATE PRODUCT</button>
            </div>
          </div>

        </div>
      </div>

    </div>

 
    
  </div>
  )
}

export default CreateProduct
