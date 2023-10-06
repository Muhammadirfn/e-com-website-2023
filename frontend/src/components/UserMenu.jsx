import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <div className=' p-10 shadow-lg m-8 '>
  
  
    <NavLink
      to='/dashboard/user/profile'
      className='block p-2 text-black hover:text-blue-700 mb-2'
    
    >
      Profile
    </NavLink>
    <NavLink
      to='/dashboard/user/order'
      className='block p-2 text-black hover:text-blue-700 mb-2 '
      
    >
      Orders
    </NavLink>
   
  </div>
  )
}

export default UserMenu
