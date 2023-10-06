import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'
import { useAuth } from '../../components/context/auth'

const DashBoard = () => {
  const [auth] = useAuth()
  return (
    <div>

      <Layout title={"Dashboard - Ecommerce App"}>

        <div>
          <UserMenu/>
          <div className="all">
          <h1 className="text-lg font-semibold border-b-2 border-yellow-500">
           Name:{auth?.user?.name}</h1>
          <h1 className="text-lg font-semibold border-b-2 border-yellow-500">
           Email:{auth?.user?.email}</h1>
          <h1 className="text-lg font-semibold border-b-2 border-yellow-500">
           Contact:{auth?.user?.address}</h1>
      
          </div>
        </div>

       
      </Layout>
      
    </div>
  )
}

export default DashBoard
