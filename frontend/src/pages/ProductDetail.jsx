import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/product/get-product/${params.slug}`);
      const data = response.data;
  
      setProduct(data?.product);
  
      if (data?.product?.category) {
        getsimilarProduct(data?.product._id, data?.product.category._id);
      } else {
        // Handle the case where category is not defined
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  // getting similar product
  const getsimilarProduct = async (pid, cid) => { 
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/product/similar-product/${pid}/${cid}`);

      const data = response.data;
      setRelated(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
  <div className="bg-white p-8 rounded-lg shadow-md flex items-center">
    <div className="mr-6">
      {product._id ? (
        <img
          src={`http://localhost:5000/api/v1/product/product-photo/${product._id}`}
          alt={product.name}
          className="w-64 h-64 object-cover rounded-md shadow-md"
        />
      ) : (
        <p className="text-center text-gray-600">Loading image...</p>
      )}
    </div>

    <div>
      <h1 className="text-3xl font-semibold mb-6">Product Details</h1>
      {product._id ? (
        <div>
          <p className="text-lg">
            <span className="font-semibold">Name:</span> {product.name}
          </p>

          <p className="text-lg mt-3">
            <span className="font-semibold">Description:</span> {product.description}
          </p>

          <p className="text-lg mt-3">
            <span className="font-semibold">Price:</span> ${product.price}
          </p>

          {product.category ? (
            <p className="text-lg mt-3">
              <span className="font-semibold">Category:</span> {product.category.name}
            </p>
          ) : null}

          <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white block">
            Add To Cart
          </Button>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading product details...</p>
      )}
    </div>
   
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {related.length > 0 ? (
    related.map((p) => (
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
            <Button
              type="primary" // Use type with a value like "primary"
              className="w-1/2 m-2 bg-blue-500 hover:bg-blue-600"
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className='text-center'>No products available</p>
  )}
</div>
</Layout>
  );
};

export default ProductDetail;
