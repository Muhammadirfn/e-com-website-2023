import React from 'react';
import Layout from '../components/Layout';
import image from '../images/policy.avif';

const Policy = () => {
  return (
    <Layout title={"Our Policy"}>
    <div className="flex flex-col-reverse md:flex-row mt-4">
      <img src={image} alt="Policy Image" className="w-full md:w-1/2 object-cover" />
      <div className="w-full md:w-1/2 p-4 md:p-6">
        <h3 className="text-2xl font-semibold mb-4">Our Policy</h3>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  </Layout>
  
  );
};

export default Policy;
