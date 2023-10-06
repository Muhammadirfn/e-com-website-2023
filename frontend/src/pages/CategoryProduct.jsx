import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import {Button} from 'antd'

const CategoryProduct = () => {
  const navigate = useNavigate()
  const location = useLocation(); // Use useLocation to access the current URL

  const slug = location.pathname.split('/').pop(); // Extract the slug from the URL

  const [Products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    productByCa(slug); // Pass the slug to your function
  }, [slug]); // Include slug in the dependencies array

  const productByCa = async (slug) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/product/product-category/${slug}`);
      const data = response.data;
      console.log(data);
      setProduct(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1>C Name</h1>
        {category !== null ? (
          <h1 className='text-center'>{category.name}</h1>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Products.length > 0 ? (
      Products.map((p) => (
        <div
          key={p._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <img
            src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
            alt={p.name}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{p.name}</h2>
            <p className="text-gray-600 mb-2">{p.description.substring(0, 20)}</p>
            <p className="text-blue-500 font-semibold">${p.price}</p>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <Button className="w-1/2 bg-gray-500 hover:bg-gray-600 m-2 text-white" onClick={() => navigate(`/product/${p.slug}`)}>
                More Details 
              </Button>
              <Button
                type="primary"
                className="w-1/2 m-2 bg-blue-500 hover:bg-blue-600"
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No products available</p>
    )}
  </div>
    </Layout>
  );
};

export default CategoryProduct;
