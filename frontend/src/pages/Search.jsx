// Search.js
import React from 'react';
import Layout from '../components/Layout';
import { Button } from 'antd';
import { useSearch } from '../components/context/Search';

const Search = () => {
  const { auth } = useSearch();

  return (
    <Layout title="Search Results">
      <div className="m-auto">
        <h1>Search Results</h1>
        <h4>{`Found ${auth.results.length} Products`}</h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {auth.results.length > 0 ? (
          auth.results.map((p) => (
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
                  <Button className="w-1/2 bg-gray-500 hover:bg-gray-600 m-2 text-white">
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

export default Search;
