import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Register from './pages/auth/Register';
import Login from './pages/auth/Login'
import DashBoard from './pages/user/DashBoard'
import { PrivateRoute}  from './components/Route/Private'
import ForgetPassword from './pages/auth/ForgetPassword'
import AdminDashboard from './pages/admin/AdminDashboard'
import { AdminRoute } from './components/Route/AdminRoute'
import CreateCategory from './pages/admin/CreateCategory'
import CreateProduct from './pages/admin/CreateProduct'
import User from './pages/admin/User'
import UserMenu from './components/UserMenu'
import Orders from './pages/Users/Orders'
import Profile from './pages/Users/Profile'
import Product from './pages/admin/Product'
import UpdateProduct from './pages/admin/UpdateProduct'
import Search from './pages/Search'
import ProductDetail from './pages/ProductDetail'
import Categories from './pages/Categories'
import CategoryProduct from './pages/CategoryProduct'
import CartPage from './pages/CartPage'
import AdminOrders from './pages/admin/AdminOrders'
// import Product from '..'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element = {<HomePage/>}/>
      <Route path='/product/:slug' element = {<ProductDetail/>}/>
      <Route path='/categories' element = {<Categories/>}/>
      <Route path='/cart' element = {<CartPage/>}/>
      <Route path='/category/:slug' element = {<CategoryProduct/>}/>

      <Route path='/search' element = {<Search/>}/>
      <Route path='/dashboard' element = {<PrivateRoute/>}>
      <Route path='user' element = {<DashBoard/>}/>
      <Route path='user/order' element = {<Orders/>}/>
      <Route path='user/profile' element = {<Profile/>}/>

      </Route>
      <Route path='/dashboard' element = {<AdminRoute/>}>
      <Route path='admin' element = {<AdminDashboard/>}/>

      <Route path='/dashboard/admin/product' element={<Product/>}/>

      <Route path='admin/create-category' element = {<CreateCategory/>}/>
      <Route path='admin/create-product' element = {<CreateProduct/>}/>
      <Route path='admin/product/:slug' element = {<UpdateProduct/>}/>
      <Route path='admin/user' element = {<User/>}/>
      <Route path='admin/orders' element = {<AdminOrders/>}/>

      </Route>

      
      <Route path='/register' element = {<Register/>}/>
      <Route path='/forget-pasword' element={<ForgetPassword/>}/>
      <Route path='/login' element = {<Login/>}/>


      <Route path='/about' element = {<About/>}/>
      <Route path='/contact' element = {<Contact/>}/>
      <Route path='/policy' element = {<Policy/>}/>
      <Route path='*' element = {<PageNotFound/>}/>
    </Routes>  
  
    
    </>
  )
}

export default App