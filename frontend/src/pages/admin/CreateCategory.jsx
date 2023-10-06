import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import { Modal, message } from 'antd';
import axios from 'axios';
import CategoryForm from '../../components/form/CategoryForm';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);

  const [selected , setSelected] =useState(false);
  const [updatedName, setUpdatedName] =useState("")

  // Define the useEffect hook to fetch categories when the component mounts
  useEffect(() => {
    // Call the function to fetch categories
    getallCategories();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  // Function to fetch categories
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

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/category/create-category`, {
        name,
      });
      const data = response.data;

      if (data.success) {
        message.success(`${data,name} is created`);
        // Refresh the categories after creating a new one
        getallCategories();
        setName(""); // Clear the input field
      } else {
        message.error(data.message || "Data not created"); // Display the message from the response
      }
    } catch (error) {
      console.log(error);
      message.error("There was an error while creating the category");
    }
  };
  //  for update
  const handleUpdate = async (e) =>{
    e.preventDefault()
    try {
      
      const response = await axios.put(`http://localhost:5000/api/v1/category/update-category/${selected._id}`, {
        name: updatedName
      });

      const data = response.data

      if(data.success){
        message.success(`${updatedName} is updated` )
        setSelected(null);
        setUpdatedName("")
        setVisible(false)
        getallCategories()
      } else{
        message.error(data.error)
      }
      console.log(e);
    } catch (error) {
      console.log(error);
      
    }
  }

  // for deleted
  const handleDelete = async (id) =>{
   
    try {
      
      const response = await axios.delete(`http://localhost:5000/api/v1/category/delete-category/${id}`, 
      
      );

      const data = response.data

      if(data?.success){
        message.success(`category is deleted` )
        
        getallCategories()
      } else{
        message(data.error)
      }
      console.log(error);
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <Layout title={"Dashboard- CreateCategory"}>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <AdminMenu className="md:w-1/4" />

        {/* Main Content */}
        <div className="md:ml-6 mt-4 w-full">
          <h1 className="text-lg font-semibold mb-4">Manage Category</h1>
          <div>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>

          <div className="bg-white border border-gray-300 p-4 rounded-lg">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c._id} value = {c._id}>
                    <td className="px-4 py-2" >{c.name}</td>
                    <td className="px-4 py-2">
                      <button className='px-2 py-2 rounded bg-blue-500 text-white m-4' onClick={() => 
                        {setVisible(true),
                         setUpdatedName(c.name)
                         setSelected(c)
                         
                         }}>Edit</button>
                      <button className='px-2 py-2 rounded bg-red-500 text-white m-4'
                      onClick={() => {handleDelete(c._id)}}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal onCancel={() => setVisible(false)} footer = {null} open = {visible}>

          <CategoryForm  value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>

        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCategory;
