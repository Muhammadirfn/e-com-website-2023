import { Button } from 'antd';
import React from 'react';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 md:p-8">
        <div className="mb-4">
          <input
            type="text"
            value={value}
            placeholder="Enter your Category"
            onChange={(e) => setValue(e.target.value)}
            className="w-full py-2 px-4 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-md">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
