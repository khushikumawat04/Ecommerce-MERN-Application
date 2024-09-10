
import { useState,useEffect } from 'react'
import React from 'react';
import { toast } from "react-toastify";
import AdminMenu from '../../../components/Layout/AdminMenu'
import { Select } from 'antd';
import {useAuth } from '../../../context/Auth';
import { useNavigate,  useParams} from 'react-router-dom';
const {Option} = Select;
const UpdateProduct = () => {
  const base_url = process.env.REACT_APP_BASE_URL;

    const navigate = useNavigate();
    const params = useParams()
     const [auth,setAuth] = useAuth();
    const [categories,setCategories] = useState([]);
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [photo,setPhoto] = useState(null);
    const [category,setCategory] = useState("");
  const [quantity,setQuantity]= useState("");
  const [shipping,setShipping] = useState();
  const [id,setId] = useState("");
  
  // get product
  const getSingleProduct = async()=>{
    try {
      console.log(params.slug);
       const res = await fetch(`${base_url}/api/v1/product/get-product/${params.slug}`,
       {method : 'GET',}
       ) 
       const data = await res.json();
      //  return data;
      //  console.log("data",data);
//       console.log('categories:', categories);
// console.log('category:', category.name);
       if(data?.success){
        console.log(data.product);
        setId(data.product._id);
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setPhoto(data.product.photo);
        // setCategory(data.product.category._id);
        if (data.product.category) {
          setCategory(data.product.category._id); // Use optional chaining here
      }
        setShipping(data.product.shipping);
      }
    } catch (error) {
      console.log(error);
    }
  }


  
  useEffect(()=>{
    getSingleProduct();
    
  },[])
  // getcategory
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
  
  
   
 
  
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!category) {
        toast.error('Category is required.');
        return;
    }
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      photo !== null && photo !== undefined && productData.append("photo", photo);
      productData.append("quantity",quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      console.log([...productData]);
      console.log("photo",photo);
  
      const response = await fetch(`${base_url}/api/v1/product/update-product/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
        body: productData,
      });
  
      const data = await response.json();
      console.log("data",data);
  
      if (data.success) {
        toast.success('Product updated successfully');
        navigate('/dashboard/admin/products');
      } else {
        toast.error(data?.error || 'Failed to update product');
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong while updating the product');
    }
  };

  // delete button
  const handleDelete = async()=>{
    try {
      let answer  = window.confirm("Are you sure You want to delete this product");
      if(answer == true){
      const response = await fetch(`${base_url}/api/v1/product/delete-product/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
        
      });
  
      const data = await response.json();
      if(data.success){
        toast.success("Product Delete Successfully");
        navigate('/dashboard/admin/products');
      }
    }
    else{
      return;
    }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      
    }


  }
  return (
    <div>
         <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
         <AdminMenu/>
        </div>
        <div className='col-md-9'>
        <h1>Update  Product</h1>
          <div className='m-1 w-75'>
            {/* <Select bordered={false} placeholder= "Select a category"
             size="large" showSearch
             className='form-select mb-3' onChange={(value)=>{setCategory(value)}}
             value = {category.name}>
             
                 {categories?.map((c) => (
    <Option key={c._id} value={c._id}>
      {c.name}
    </Option>
  ))}
            </Select> */}
            <Select
  bordered={false}
  placeholder="Select a category"
  size="large"
  showSearch
  className='form-select mb-3'
  value={category}
  onChange={(value) => {setCategory(value) }} // Set the category state with the selected _id
  >
  {categories?.map((c) => (
    <Option key={c._id} value={c._id}>
      {c.name}
    </Option>
  ))}
</Select>
            <div className='mb-3'>
              <label  className='btn btn-outline-secondary col-md-12'>
                {photo ? photo.name: "Upload Photo" }
              <input type='file' name='' id='' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
              </label>
            </div>

            <div className='mb-3'>
           { photo ?(
              <div className='text-center'>
                <img src={URL.createObjectURL(photo)} alt='product photo' 
                height={'200px'} className='img img-responsive'/>
                </div>):
                (
                  <div className='text-center'>
                    <img src={`${base_url}/api/v1/product/product-photo/${id}`} alt='product photo' 
                    height={'200px'} className='img img-responsive'/>
                    </div>)
                }
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
             className='form-select mb-3' onChange={(value)=>{setShipping(value)}}
              value = {shipping ? "yes": "No"}>
             
             <Option value="0">No</Option>
             <Option value="1">Yes</Option>
       </Select>

            <div className='mb-3'>
              <button className='btn btn-primary'
              onClick={handleUpdate}>UPDATE PRODUCT</button>
            </div>
            {/* delete */}
            <div className='mb-3'>
              <button className='btn btn-danger'
              onClick={handleDelete}>Delete PRODUCT</button>
            </div>
          </div>

        </div>
      </div>

    </div>

 
      
    </div>
  )
}

export default UpdateProduct
