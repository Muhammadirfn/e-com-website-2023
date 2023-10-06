import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../components/context/auth';
import { useCart } from '../components/context/Cart';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import {  message } from 'antd';

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const { cart, setCart } = useCart();
  const [clientToken, setClientToken] = useState("");
  const [loading, setLoading] = useState("")
  const [instance, setInstance] = useState(null);
  const navigate = useNavigate();

  // Function to calculate the total in PKR and USD
  const calculateTotal = () => {
    const totalUSD = cart
      .reduce((total, item) => total + item.price, 0)
      .toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    return { totalUSD };
  };

  // Call the calculateTotal function
  const { totalUSD } = calculateTotal();

  // Function to remove a card item
  const removeCardItem = (pid) => {
    try {
      let deletecart = [...cart];
      let index = deletecart.findIndex((item) => item._id === pid);
      deletecart.splice(index, 1);
      setCart(deletecart);
      localStorage.setItem('cart', JSON.stringify(deletecart));
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  // get payment gateway token
  const getToken = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/product/braintree/token`);
      setClientToken(response.data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle payment
  const handlePayment = async () => {
    try {
      setLoading(true)
      const { nonce } = await instance.requestPaymentMethod();
     const response = await axios.post(`http://localhost:5000/api/v1/product/braintree/payment`,{
      nonce, cart
     })
     setLoading(false)
     localStorage.removeItem('cart')
     setCart([])
     navigate('/dashboard/user/order')
     message.success("Payment Completed Successfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className='text-center p-3 bg-light mb-1'>
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className='text-center'>
              {cart?.length > 0
                ? `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart ${
                  auth.token ? '' : 'please login to Checkout'
                }`
                : 'Your Cart is empty'}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row m-4 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="col-md-8">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 40)}</p>
                  <h4>Price: {p.price}</h4>
                  <button className='btn btn-danger' onClick={() => removeCardItem(p._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalUSD}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                </div>
                {/* Place the "Make Payment" button and DropIn component here */}
                <div className="mt-3">
                  {clientToken && (
                    <>
                      <DropIn 
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: 'vault'
                          }
                        }}
                        onInstance={(inst) => setInstance(inst)}
                      />
                     <button
  className='btn btn-primary'
  onClick={handlePayment}
  disabled={loading || !instance || !auth?.user?.address}
>
  {loading ? "Processing" : "Make Payment"}
</button>

                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  {auth?.token ? (
                    <button className='btn btn-outline-warning'>Update Address</button>
                  ) : (
                    <button onClick={() => navigate('/login', { state: '/cart' })} className='bg-yellow-300 rounded px-4 py-4'>Please login to Checkout</button>
                  )}
                </div>
                {/* Place the "Make Payment" button and DropIn component here as well */}
                <div className="mt-3">

                  {
                    !clientToken || !cart?.length ? ("") :(
                      <>
                      <DropIn 
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: 'vault'
                          }
                        }}
                        onInstance={(inst) => setInstance(inst)}
                      />
                      <button className='btn border-t-neutral-500' onClick={handlePayment}>{loading ? "Processing" : "Make Payment"}</button>
                      
                      
                      </>
                    )
                  }
                  
                    <>
                      
                    </>
                
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
