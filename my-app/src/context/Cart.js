import React, { createContext, useEffect, useContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
 useEffect(()=>{
               let existCartItem = localStorage.getItem('cart')
               if(existCartItem) setCart(JSON.parse(existCartItem))
 },[])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
const useCart = () => useContext(CartContext);

export { CartProvider, useCart };