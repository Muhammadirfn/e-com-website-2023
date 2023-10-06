import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'

const User = () => {
  return (
    <Layout title={"All Users Data"}>
    <div className="row ">
      <div className="col-md-3">
        <AdminMenu/>

      </div>
      <div className="col-md-9 ">
        <h1 className='text-center'>All Users </h1>

      </div>
    </div>
      
    </Layout>
  )
}

export default User
