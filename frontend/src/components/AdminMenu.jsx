import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <div className=' p-10 shadow-lg m-8 '>
    <h4 className='text-lg font-semibold mb-4'>Admin Panel</h4>
  
    <NavLink
      to='/dashboard/admin/create-category'
      className='block p-2 text-black hover:text-blue-700 mb-2'
    
    >
      Create Category
    </NavLink>
    <NavLink
      to='/dashboard/admin/create-product'
      className='block p-2 text-black hover:text-blue-700 mb-2 '
      
    >
      Create Product
    </NavLink>
    <NavLink
      to='/dashboard/admin/product'
      className='block p-2 text-black hover:text-blue-700 mb-2 '
      
    >
       Products
    </NavLink>
    <NavLink
      to='/dashboard/admin/orders'
      className='block p-2 text-black hover:text-blue-700 mb-2 '
      
    >
       Orders
    </NavLink>
    <NavLink
      to='/dashboard/admin/user'
      className='block p-2 text-black hover:text-blue-700'
      
    >
      User
    </NavLink>
  </div>
  
  );
};

export default AdminMenu;
