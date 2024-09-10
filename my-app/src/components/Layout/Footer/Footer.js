import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <div>  <section  className="footer">
    <div  className="footer-container">
      <div  className="footer-box" id="footer-box1">
        <h2 className='ms-4'>Ecommerce App</h2>
        {/* <!-- <p>At Editage, our English editing and proofreading services polish and perfect your manuscript with not one, but two thorough checks</p> --> */}
      </div>
      <div  className="footer-box">
        <h4>Categoriess</h4>
        {/* <div  className="underline" id="no1"><span></span></div> */}

        <ul>
          <li><a href="#">Samrtphones</a></li>
          <li><a href="#">Laptops</a></li>
          <li><a href="#">Headphones</a></li>
          <li><a href="#">Tabltes</a></li>
          <li><a href="#">Blutooth Speakers</a></li>
         
        </ul>
      </div>

       <div  className="footer-box">
        <h4>
          Links
           {/* <div  className="underline" id="no2"><span></span></div>  */}
         </h4>
        <a href="#">Home</a>
        <a href="#">Categories</a>
        <a href="#">Login</a>
        <a href="#">Register</a>
        <a href="#">Conatct Us</a>
      </div> 

      <div  className="footer-box" id="contact">
        <h4>
          Contact Us
          {/* <div  className="underline"><span></span></div> */}
        </h4>
        <a href="#"><i  className="fa fa-phone"> </i>+917828479207</a>
        <a href="#"><i  className="fa fa-envelope"></i>shoppingcart@gmail.com</a>
        {/* <div  className="social">
          <a href="#"><i  className="fa fa-facebook-square"></i></a>
          <a href="#"><i  className="fa fa-instagram"></i></a>
          <a href="#"><i  className="fa fa-linkedin-square"></i></a>
          <a href="#"><i  className="fa fa-twitter-square"></i></a>
        </div> */}
      </div>
    </div>
  </section>

      
    </div>
  )
}

export default Footer
