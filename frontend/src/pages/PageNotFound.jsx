import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const PageNotFound = () => {
  return (
    <Layout title={"go back- page not found"} description={"this is page not found go the main page"}>
      <div className="flex flex-col items-center justify-center pt-20">
        <h4 className="text-6xl text-black-600">404</h4>
        <h2 className="text-center text-2xl mt-2">Oops ! Page Not Found</h2>
        <Link
          to="/"
          className="mt-4 text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
        >
         <Button variant="outlined">Go Back</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
