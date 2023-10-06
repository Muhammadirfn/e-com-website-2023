import React,{useState, useEffect} from 'react'
import useCategory from '../components/hooks/useCategory'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

const Categories = () => {
  const categories = useCategory()
  return (
    <Layout title={"All Categories"}>
      <h1>All Categories</h1>
      <div className="container">
        <div className="row">
          {categories.map(c =>(
            <div className="col-md-6 mt-4 mb-3 gap-x-3" key={c._id}>
               <Link className='btn btn-primary bg-green-500' to={`/category/${c.slug}`}>{c.name}</Link>

            </div>
           
          ))}
          
        </div>
      </div>
      
    </Layout>
  )
}

export default Categories
