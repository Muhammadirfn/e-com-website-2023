import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white p-6">
      <h4 className="text-center text-xl font-semibold mb-4">
        All Rights Reserved © Irfan
      </h4>
      <p className="text-center">
        <Link
          to="/about"
          className="text-blue-300 hover:text-blue-400 mr-4 transition duration-300 ease-in-out"
        >
         | About
        </Link>
        <Link
          to="/contact"
          className="text-blue-300 hover:text-blue-400 mr-4 transition duration-300 ease-in-out"
        >
          
        |  Contact
        </Link>
        <Link
          to="/policy"
          className="text-blue-300 hover:text-blue-400 transition duration-300 ease-in-out"
        >
         | Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
