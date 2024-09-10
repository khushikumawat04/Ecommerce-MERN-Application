import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/Search';
import "../Layout/Header.css";
;

const SearchInput = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate()
    const [values, setValues] = useSearch();
    const handleSubmit = async(e)=>{
       
        e.preventDefault()
        try {
            const res = await fetch(`${base_url}/api/v1/product/search/${values.keyword}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                  },

            })
            const data = await res.json();
            console.log("data",data);
            // if(data?.success){
                setValues({...values,result:data});
                console.log(data);
                navigate('/search');
            // }
          
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
       <form className="d-flex" onSubmit = {handleSubmit}>
  <input className="form-control me-2 search" type="search" placeholder="Search" aria-label="Search" value={values.keyword}
  onChange = {(e)=>setValues({...values,keyword:e.target.value})} />
  <button className="btn search-btn" type="submit">Search</button>
</form>

    </div>
  )
}

export default SearchInput
