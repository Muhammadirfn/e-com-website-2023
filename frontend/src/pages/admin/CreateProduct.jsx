import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import { Select, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    shipping: "",
    photo: "",
  });

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

  const validateForm = () => {
    const errors = {};
    let valid = true;

    if (!name) {
      errors.name = "Name is required";
      valid = false;
    }

    if (!category) {
      errors.category = "Category is required";
      valid = false;
    }

    if (!description) {
      errors.description = "Description is required";
      valid = false;
    }

    if (!price) {
      errors.price = "Price is required";
      valid = false;
    }

    if (!quantity) {
      errors.quantity = "Quantity is required";
      valid = false;
    }

    if (!shipping) {
      errors.shipping = "Shipping is required";
      valid = false;
    }

    if (!photo) {
      errors.photo = "Photo is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Don't proceed if the form is not valid
    }

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("photo", photo); // Append the photo data
  
      const response = await axios.post(
        `http://localhost:5000/api/v1/product/create-product`,
        productData
      );
      console.log(response);
  
      const data = response.data;
  
      if (data?.success) {
        message.success('Product created successfully');
        try {
          navigate('/dashboard/admin/product');
        } catch (error) {
          console.log("Navigation error:", error);
        }
      } else {
        console.log("Product creation failed");
      }
    } catch (error) {
      console.log(error);
      message.error("There is an error while creating the product");
    }
  };

  return (
    <Layout title={"Dashboard- CreateProduct"}>
      <div className="flex flex-col md:flex-row">
        <AdminMenu className="md:w-1/4" />
        <div className="md:ml-6 mt-4 w-full">
          <h1 className="text-xl font-semibold mb-4">Create Product</h1>
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
                required
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              {formErrors.category && <div className="text-red-500">{formErrors.category}</div>}
            </div>
            <div className="mt-3 border border-amber-200 p-2">
              <label className="flex items-center justify-center md:flex-col text-sm text-gray-600">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  required
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
              {formErrors.photo && <div className="text-red-500">{formErrors.photo}</div>}
            </div>
            <div className="mb-2">
              <input
                type="text"
                value={name}
                placeholder="Write a Name"
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => setName(e.target.value)}
              />
              {formErrors.name && <div className="text-red-500">{formErrors.name}</div>}
            </div>
            <div className="">
              <input
                type="text"
                value={description}
                placeholder="Write a Description"
                required
                className="w-full mt-2 p-6 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => setDescription(e.target.value)}
              />
              {formErrors.description && <div className="text-red-500">{formErrors.description}</div>}
            </div>
            <div className="mb-2 mt-4">
              <input
                type="number"
                value={price}
                placeholder="Write a Price"
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => setPrice(e.target.value)}
              />
              {formErrors.price && <div className="text-red-500">{formErrors.price}</div>}
            </div>
            <div className="mb-2">
              <input
                type="number"
                value={quantity}
                placeholder="Write a Quantity"
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => setQuantity(e.target.value)}
              />
              {formErrors.quantity && <div className="text-red-500">{formErrors.quantity}</div>}
            </div>
            <div className="mb-2">
              <Select
                bordered={false}
                placeholder="Select Shipping"
                required
                showSearch
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                onChange={(value) => setShipping(value)}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
              {formErrors.shipping && <div className="text-red-500">{formErrors.shipping}</div>}
            </div>
            <div className="mb-4">
              <button className='bg-blue-500 rounded px-2 py-2 hover:bg-green-500' onClick={handleCreate}>Create Product</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
