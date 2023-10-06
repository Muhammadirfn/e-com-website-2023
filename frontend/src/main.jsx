import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './components/context/auth.jsx';
import { SearchProvider } from './components/context/Search.jsx'
import  {CartProvider} from './components/context/Cart.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
     <SearchProvider>
      <CartProvider>
 <BrowserRouter>



  {/* <React.StrictMode> */}
  

    <App />
    
    
    
  {/* </React.StrictMode>, */}
 
  </BrowserRouter>
  </CartProvider>
  </SearchProvider>
  
  </AuthProvider>
)
