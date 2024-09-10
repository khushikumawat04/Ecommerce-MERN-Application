import React, { useEffect, useState } from 'react'
import { useCart } from '../../../context/Cart'
import { useAuth } from '../../../context/Auth';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import { toast } from 'react-toastify';
import "./user.css";
const CartPage = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
    const [cart, setCart] = useCart();
    const [auth,setAuth] = useAuth();
    const [clientToken, setClientToken] = useState("");
    const [instance,setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
  
    const authData = localStorage.getItem('auth'); // Assuming you store the JWT token in 'token' key of localStorage
    const authd = JSON.parse(authData);

    // Access the token from the auth object
    const token = authd.token;
      // total price
    const totalPrice =()=>{
        try {
            let total = 0;
            cart?.map(item =>{
                total = total+item.price;
            })
            return total.toLocaleString("en-IN",{
                style: "currency",
                currency: "INR"
            });
            
        } catch (error) {
            console.log(error);
            
        }
    }
    // delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            console.log(index);
            myCart.splice(index, 1); // Use splice() instead of slice()
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error);
        }
    }


  
    // paymentgateway token
// const getToken = async () => {
//     try {
//         const res = await fetch('http://localhost:8080/api/v1/product/braintree/token', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         const data = await res.json();
//         console.log(data);
//         // console.log(data?.clientToken)
//         setClientToken(data?.clientToken);

//     } catch (error) {
//         console.log(error);

//     }
// }

    // useEffect(() =>{
    //     getToken();
    // },[auth?.token])
    // ...............payment
    // const handlePayment = async () => {
    //     try {
    //         setLoading(true);
    //         const { nonce } = await instance.requestPaymentMethod();
    //         console.log(nonce);
    //         const response = await fetch("http://localhost:8080/payment", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 'Authorization': `Bearer ${auth.token}`
    //             },
    //             body: JSON.stringify({
    //                 cart,
    //                 nonce
    //             }),
    //         });
    
    //         // if (!response.ok) {
    //         //     throw new Error(`Failed to make payment: ${response.status} ${response.statusText}`);
    //         // }
    
    //         const data = await response.json();
    //         console.log(data);
    
    //         if (data.success) {
             
    //             setLoading(false);
    //             localStorage.removeItem("cart");
    //             setCart([]);
    //             navigate("/dashboard/user/orders");
    //             toast.success("Payment Completed Successfully");
    //         } else {
    //             toast.error(data.message || "Error while making payment");
    //         }
    //     } catch (error) {
    //         console.error('Error handling payment:', error);
    //         setLoading(false);
    //         toast.error("Error while making payment");
    //     }
    // };
  
      
    const handlePayment = async () => {
        try {
          setLoading(true);
      
          // Create an order on the server
          const response = await fetch(`${base_url}/payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${auth.token}` // Ensure the JWT is prefixed with 'Bearer '
            },
            body: JSON.stringify({
              cart
            }),
          });
      
          const data = await response.json();
      
          if (!data.success) {
            throw new Error(data.message || 'Error creating Razorpay order');
          }
      
          const { orderId, amount } = data;
      
          // Open Razorpay payment modal
          const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Replace with your Razorpay key_id
            amount: amount * 100, // Amount is in paise
            currency: 'INR',
            name: 'Your Company Name',
            description: 'Test Transaction',
            order_id: orderId,
            handler: async function (response) {
              const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
      
              // Verify the payment on the server
              const verifyResponse = await fetch(`${base_url}/payment/success`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${auth.token}` // Ensure the JWT is prefixed with 'Bearer '
                },
                body: JSON.stringify({
                  paymentId: razorpay_payment_id,
                  orderId: razorpay_order_id,
                  signature: razorpay_signature,
                  cart
                }),
              });
      
              const verifyData = await verifyResponse.json();
              console.log(verifyData);
      
              if (verifyData.success) {
                setLoading(false);
                localStorage.removeItem("cart");
                setCart([]);
                navigate("/dashboard/user/orders");
                toast.success("Payment Completed Successfully");
              } else {
                throw new Error(verifyData.message || 'Payment verification failed');
              }
            },
            prefill: {
              name: auth.user.name,
              email: auth.user.email,
              contact: auth.user.phone,
            },
            theme: {
              color: '#3399cc'
            },
          };
      
          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch (error) {
          console.error('Error handling payment:', error);
          setLoading(false);
          toast.error("Error while making payment");
        }
      };
      
    
    

    
    
    
    
  return (
   
    <div className='container cart-page'>
        <div className='row'>
            <div className='col-md-12'>
                {/* <h2 className='text-center  p-2 mb-1'>
                    {
                        `Hello ${auth?.token && auth?.user?.name}` 
                    }
                </h2> */}
                <h4 className='text-center bg-light mt-5 '>
                    {cart?.length>0 ? `You have ${cart.length} items in your cart
                     ${auth?.token? "" : "Please Login to checkout"}`: "your Cart is empty" }
                     
                </h4>
            </div>
        </div>
        <div className='row'>
            <div className='col-md-8'>
                <div className='row'>
                    {
                        cart?.map( (p) =>(
                            <div className='row mt-3 mb-2 p-3 card flex-row cart-page-item'>
                                <div className='col-md-4' >
                                <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                 className="card-img-top" alt={p.name}
                                 width = "100" height = "200" />
                                </div>
                                <div className='col-md-7'>
                                    <p className='cart-pname'>{p.name}</p>
                                    <p>{p.description}</p>
                                    <p>₹ {p.price}</p>
                                    <button className='btn'
                                    onClick={()=>removeCartItem(p._id)}>Remove</button>


                                </div>
                                </div>
                        ))
                    }
                </div>
            </div>
            <div className='col-md-4 text-center payment-section'>
                <h2>Cart Summary</h2>
                <p>Total| Checkout | Payment</p>
                <hr></hr>
                <h4>Total : {totalPrice()}</h4>
                {
                    auth?.user?.address?(
                        <>
                        <div className='mb-3'>
                            <h4>Current Address</h4>
                            <h5>{auth?.user?.address}</h5>
                            <button className='btn'
                            onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>

                        </div>
                        </>
                    ):(
                        <div className='mb-3'>
                            {auth?.token?(
                                <button className='btn'
                                onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>

                            ):(
                                <button className='btn'
                                onClick={()=>navigate('/login',{state : '/cart'})}>Please Login to checkout</button>
                            )}
                        </div>
                    )
                }
                <div className='mt-2'>
                    {/* { !clientToken || !cart?.length ?(
                            ""
                    ):(
                        <>
                        <DropIn
                    options={{
                        authorization: clientToken,
                        // paypal: {
                        //     flow: 'vault'
                        // }
                    }}
                    onInstance={instance => setInstance(instance)}/>
                   
               
                
                   {/* <button className='btn btn-primary' onClick={handlePayment}>
                    Make Payment
                   </button> */}

                        {/* </>
                    )

                    }  */}
                    <button className='btn' onClick={handlePayment}
               
               disabled={loading  || !auth?.user?.address}>
                  {loading ? "Processing...." : "Make Payment"} 
                  </button>
                     </div>
                </div>
        </div>
      
    </div>
  )
}

export default CartPage
