import React, {useState,useEffect} from 'react'
import useCategory from '../../../hook/useCategory'
import { Link } from 'react-router-dom';
const Categories = () => {
    const categories = useCategory();
  return (
    <div>
     <div className='container '>
        <div className='row category-box'>
            {categories.map((c) => 
            (
                <div className='mt-5' key ={c._id}>
                <Link className="c-link"
                to = {`/category/${c.slug}`}>{c.name}</Link>
            </div>
            ))}
            

        </div>
     </div>
    </div>
  )
}

export default Categories
