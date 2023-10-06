import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import { useAuth } from '../../components/context/auth'


const AdminDashboard = () => {
  const [auth]= useAuth()
  return (
    <Layout>
      <div className=" flex mt-4 ">
  
      <AdminMenu/>

      <div className="  ">
     
        <h1 className="text-lg font-semibold border-b-2 border-yellow-500">
           Name:{auth?.user?.name}</h1>
          <h1 className="text-lg font-semibold border-b-2 border-yellow-500">
           Email:{auth?.user?.email}</h1>
          <h1 className="text-lg font-semibold border-b-2 border-yellow-500">
           Contact:{auth?.user?.phone}</h1>
      
    </div>
    </div>
    


      
    </Layout>
  )
}

export default AdminDashboard
