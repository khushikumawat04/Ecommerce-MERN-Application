import React from 'react'
import {NavLink, Link} from "react-router-dom";
import { useAuth } from '../../context/Auth';
// import { Toast } from 'react-toastify/dist/components';
import { toast } from 'react-toastify';
import SearchInput from '../Form/SearchInput';
import { useCart } from '../../context/Cart';
import { Badge } from 'antd';
import useCategory from '../../hook/useCategory';
import "./Header.css";

const Header = () => {
  const [auth,setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  
   const handlelogout = () =>{
    setAuth({
      ...auth,user:null,
      token: ''
    })
    localStorage.removeItem('auth');
    toast.success("Logout succesfully");
   }
   
  return (
    <div>
     <nav className=" main-nav navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand navlink" href="#">E-commerce App</Link>
   <div className='ms-5 searchbar'><SearchInput/></div> 
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
   
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
        <li className="nav-item">
          <NavLink className="nav-link navlink" to = "/">Home</NavLink>
        </li>
        

        <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle navlink"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu navlink">
                  <li>
                    <Link className="dropdown-item " to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item "
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

        
        {
          !auth.user?(<>
          <li className="nav-item">
          <NavLink className="nav-link navlink" to="/register">Register</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link navlink" to="/login">Login</NavLink>
        </li>

          </>):(<>
            <li class="nav-item dropdown ">
             
          <a class="nav-link dropdown-toggle navlink " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {auth?.user?.name}
          </a>
       
           
       <ul className="dropdown-menu">
  <li><NavLink className="dropdown-item " to={`/dashboard/${
    auth?.user?.role === 1?"admin":"user"
  }`}>Dashboard</NavLink></li>
  <li className="nav-item">
          <NavLink className="nav-link " onClick={handlelogout} to="/login">Logout</NavLink>
        </li>
</ul>
</li>

          </>)
        }
        <li className="nav-item">
          <Badge className='mt-1' count = {cart?.length} showZero>
          <NavLink className="nav-link navlink" to= '/cart'>Cart</NavLink>
          </Badge>
         
        </li>
       
      </ul>
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>



      
    </div>
  )
}

export default Header
