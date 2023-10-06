import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import { Select, message } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(""); // Change this to null initially
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  // get single product
  const getSingleProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/product/get-product/${params.slug}`);
      const data = response.data;
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setQuantity(data.product.quantity);
      setPrice(data.product.price);
      setCategory(data.product.category._id); // Set the category ID here
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const getallCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/category/get-category`);
      const data = response.data;

      if (data?.success) {
        setCategories(data?.category);
      } else {
        message.error("Error fetching categories");
      }
    } catch (error) {
      console.error(error);
      message.error("There was an error while getting categories");
    }
  };

  useEffect(() => {
    getallCategories();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      photo && productData.append("photo", photo); // Append the photo data

      const response = await axios.put(
        `http://localhost:5000/api/v1/product/update-product/${id}`,
        productData
      );

      const data = response.data;

      if (data?.success) {
        console.log("Product Updated Successfully");
        message.success('Product Updated successfully');
        navigate('/dashboard/admin/product')
      }
    } catch (error) {
      console.error(error);
      message.error('Error updating product');
    }
  };
  //  for deleting the product

  const handleDelete = async () => {
    try {
      const answer = window.prompt("Are You Sure Want to Delete This Product")
      if(!answer) return;
      
      const response = await axios.delete( `http://localhost:5000/api/v1/product/delete-product/${id}`);
     
      
      const data = response.data;
  
      if (data?.success) {
        message.success("Product Deleted Successfully");
        navigate('/dashboard/admin/product');
      } else {
        message.error("Product Deletion Failed");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      message.error("Something went wrong while deleting the product.");
    }
  };
  
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="flex flex-col md:flex-row">
        <AdminMenu className="md:w-1/4" />
        <div className="md:ml-6 mt-4 w-full">
          <h1 className="text-xl font-semibold mb-4">Update Product</h1>
          <div className="border border-gray-200 p-6 rounded-lg bg-white">
            <h2 className="text-lg font-semibold mb-4">Product Information</h2>
            <div className="md:w-3/4 mb-4">
              <label htmlFor="category" className="block text-gray-600 text-sm font-medium mb-2">
                Select a Category
              </label>
              <Select
                id="category"
                placeholder="Select a Category"
                size="large"
                showSearch
                className="w-full"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category} // Use category directly here
              >
                {categories?.map((c) => (
                  <Select.Option key={c._id} value={c._id}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="mt-3 border border-amber-200 p-2">
              <label className="flex items-center justify-center md:flex-col text-sm text-gray-600">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-4 md:mb-0 md:flex md:justify-center">
  {photo ? (
    <img
      src={URL.createObjectURL(photo)}
      alt="Uploaded Photo"
      className="mt-2 rounded-lg"
      style={{ maxHeight: '300px' }}
    />
  ) : (
    <img
      src={`http://localhost:5000/api/v1/product/product-photo/${id}`} 
      alt="Uploaded Photo"
      className="mt-2 rounded-lg"
      style={{ maxHeight: '300px' }}
    />
  )}
</div>

            <div className="mb-2">
              <input
                type="text"
                value={name}
                placeholder="Write a Name"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="">
              <input
                type="text"
                value={description}
                placeholder="Write a Description"
                className="w-full mt-2 p-6 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => setDescription(e.target.value)}

               
               
              />
            </div>
            <div className="mb-2 mt-4">
              <input
                type="number"
                value={price}
                placeholder="Write a Price"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <input
                type="number"
                value={quantity}
                placeholder="Write a Quantity"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <Select
                bordered={false}
                placeholder="Select Shipping"
                showSearch
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                onChange={(value) => setShipping(value)}

              value={shipping ? "Yes": "No"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-4 flex ">
              <button className='bg-blue-500 rounded px-2 py-2 hover:bg-green-500 m-3' onClick={handleUpdate}>Update Product</button>
              <button className='bg-red-500 rounded px-2 py-2 hover:bg-pink-500 m-3' onClick={handleDelete}>Delete Product</button>
            </div>
           

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
