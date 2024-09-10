import { useEffect, useState } from "react";
export default function useCategory(){
    const [categories,setCategories] = useState([]);
    const base_url = process.env.REACT_APP_BASE_URL;

    // get Cart
    const getCategories = async ()=>{
        try {
            const res = await fetch(`${base_url}/api/v1/category/get-category`,{
                  method : "get",
                  headers: {
                    "Content-type":  'application/json'
                  }
            })
            const data  = await res.json();
            setCategories(data?.category)
        } catch (error) {
            console.log(error);
        }
      
    }
    useEffect(()=>{
        getCategories();
        // console.log(categories);
    
    },[]);
    return categories;
}
