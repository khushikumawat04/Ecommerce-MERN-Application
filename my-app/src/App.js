import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Layout/Header";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Auth/Homepage";
import Register from "./pages/Auth/Register";
import Login from './pages/Auth/Login';


import Auth from "./context/Auth";
import Dashboard from "./pages/Auth/user/Dashboard";
import Private from "./components/Route/Private";
import AdminRoute from "./components/Route/AdminRoute";
import Admindashboard from "./pages/Auth/Admin/Admindashboard";
import CreateCategory from "./pages/Auth/Admin/CreateCategory";
import CreateProduct from "./pages/Auth/Admin/CreateProduct";
import Users from "./pages/Auth/Admin/Users";
import Profile from "./pages/Auth/user/Profile";
import Orders from "./pages/Auth/user/Orders";
import Products from "./pages/Auth/Admin/Products";
import UpdateProduct from "./pages/Auth/Admin/UpdateProduct";
import Searchpage from "./pages/Auth/user/Searchpage";
import ProductDetails from "./pages/Auth/user/ProductDetails";
import CartPage from "./pages/Auth/user/CartPage";
import Categories from "./pages/Auth/user/Categories";
import CategoryProduct from "./pages/Auth/user/CategoryProduct";
import OrderManage from "./pages/Auth/Admin/OrderManage";
import Footer from "./components/Layout/Footer/Footer";

// import Search from "antd/es/input/Search";

function App() {
  return (
    <>
 <Router>
           <Header/>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/product/:slug" element={<ProductDetails/>} />
            <Route path="/categories" element={<Categories/>} />
            <Route path="/category/:slug" element={<CategoryProduct/>} />
            <Route path = "/search" element = {<Searchpage/>}/>
            <Route path = "/cart" element = {<CartPage/>}/>
            <Route path="/dashboard" element = {<Private/>}>
            <Route path="user" element={<Dashboard/>}/>
            <Route path="user/profile" element={<Profile/>}/>
            <Route path="user/orders" element={<Orders/>}/>
            </Route>
            <Route path="/dashboard" element={<AdminRoute/>}>
              <Route path="admin" element={<Admindashboard/>}/>
              <Route path="admin/create-category" element={<CreateCategory/>}/>
              <Route path ="admin/products" element={<Products/>}/>
              <Route path="admin/create-product" element={<CreateProduct/>}/>
              <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
              <Route path="admin/users" element={<Users/>}/>
              <Route path="admin/orders" element={<OrderManage/>}/>
            </Route>
           
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
         <Footer/>
          <ToastContainer />
          </Router>
     
      
    </>
  );
}

export default App;
 