import React from 'react'
import AdminMenu from '../../../components/Layout/AdminMenu'
import { useState,useEffect } from 'react';
import { toast } from "react-toastify";
import CategoryForm from '../../../components/Form/CategoryForm';
import {useAuth } from '../../../context/Auth';
import {Modal} from "antd";
import "./Admin.css";



const CreateCategory = () => {
 

  const base_url = process.env.REACT_APP_BASE_URL;
  console.log("Base URL:", base_url);
  const [category,setCategory] = useState([]);
  const [auth,setAuth] = useAuth();
    const [name,setName] = useState("");
    const [open,setOpen] = useState(false);
    const [selected,setSelected] = useState(null)
   const [updatedname, setUpdatedname] = useState("")
    // getcategory
  const getAllCategory = async()=>{
    try {
      const res = await fetch(`${base_url}/api/v1/category/get-category`,{
      method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    
      
      
    } } )
    const data = await res.json();
    if(data.success){
      setCategory(data.category);
    }
  }catch (error) {
      console.log(error);
      toast.error("Something wemt wrong in getting category")
    }
  }
  useEffect(()=>{
    getAllCategory();

  },[])
  // submit button
  const  handleSubmit = async(e) =>{
    // alert("hello");
    // e.preventDefault();
    try {
      const res = await fetch(`${base_url}/api/v1/category/create-category`,{
        method: 'POST',
      headers: {

        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
       
        
      },
      body: JSON.stringify({name}) } )

      const data = await res.json();
     
     if(data.success){
      toast.success(data.message);
      alert(data.message);
    
      getAllCategory();
      setName('');
     } 
    
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
      
    }

  }

  // updaate function
  const handleupdate = async(e) =>{
    e.preventDefault();
    try {
      const res = await fetch(`${base_url}/api/v1/category/update-category/${selected._id}`,{
        method: 'PUT',
      headers: {

        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
       
        
      },
      
      body: JSON.stringify({name:updatedname}) } )
      const data = await res.json();
      console.log(data);
      if(data.success){
       toast.success(`${updatedname} is updated`);
     
       getAllCategory();
       setSelected(null);
       setUpdatedname("");
       setOpen(false);
       setName('');
      } 
      else{
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error("Something went wrong");
      
    }

  }


  // delete function
  const handleDlete = async(id) =>{
 
    try {
      const res = await fetch(`${base_url}/api/v1/category/delete-category/${id}`,{
        method: 'Delete',
      headers: {

        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
       
        
      },
      
      // body: JSON.stringify({name:updatedname}) 
    } )
      
      const data = await res.json();
      console.log(data);
      if(data.success){
       toast.success(`Category  is deleted`);
     
       getAllCategory();
    
      } 
      else{
        toast.error(data.message);
      }
      
    } catch (error) {
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
          <div className='col-md-8 m-2 create-category-container'>
          <h3>Manage category</h3>
          <div className='p-3'>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>
         
       <table className="table w-75">
  <thead>
    <tr>
      
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {category?.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td><button className='btn edit-btn' onClick={()=>{setOpen(true); setUpdatedname(c.name); setSelected(c)}}>Edit</button></td>
                <td><button className='btn btn-danger ms-2' onClick={()=>handleDlete(c._id)}>Delete</button></td>
              </tr>
            ))}
   
   
  </tbody>
</table>
</div>
<Modal onCancel={() => setOpen(false)}  open={open} footer = {null}>
  <CategoryForm value={updatedname} setValue={setUpdatedname} handleSubmit={handleupdate}/>
</Modal>

        </div>

      </div>

   
      
    </div>
  )
}

export default CreateCategory
