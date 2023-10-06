import React, { useContext, useState, createContext, useEffect } from 'react';

const CartContext = createContext();


const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
useEffect(()=>{
  const existingitem = localStorage.getItem('cart')
  if(existingitem) setCart(JSON.parse(existingitem))
},[])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
