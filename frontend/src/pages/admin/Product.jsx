import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = () => {
  const [Products, setProduct] = useState([]);

  // Getting all the products
  const getallProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/product/get-product`);
      setProduct(response.data.product); // Assuming that the products are in response.data.product
    } catch (error) {
      console.log(error);
    }
  };

  // Using the useEffect hook
  useEffect(() => {
    getallProducts();
  }, []);

  return (
    <Layout title={"Your Profile"}>
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:ml-6 mt-4 w-full">
          <h1 className="text-2xl font-semibold mb-4">All Products List</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Products.map((p) => (
              <>
              <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
              <div className="border border-gray-200 p-4 rounded-lg" >
                <img src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`} alt={p.name} className="w-full h-40 object-cover rounded-md" />
                <div className="mt-2">
                  <h2 className="text-lg font-semibold">{p.name}</h2>
                  <p className="text-gray-600">{p.description}</p>
                  <p className="text-blue-500">${p.price}</p>
                </div>
              </div>

              </Link>
             
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
