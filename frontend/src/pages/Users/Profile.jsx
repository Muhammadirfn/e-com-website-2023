import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import UserMenu from '../../components/UserMenu';
import axios from 'axios';
import { useAuth } from '../../components/context/auth';
import { message } from 'antd';

const Profile = () => {
  const [auth, setAuth] = useAuth()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  // get use detail from auth

  useEffect(() =>{
    const {name, email, address, phone} = auth?.user
    setName(name)
    setEmail(email)
    setAddress(address)
    setPhone(phone)
  },[auth?.user])

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/auth/profile`, {
        name,
        email,
        password,
        address,
        phone,
      });
      const data = response.data
      if (response.data.success) {
       
        setAuth({...auth, user: data.updatedUser})
        let ls = localStorage.getItem('auth')
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth', JSON.stringify(ls))
        message.success(' Profile Updated Successfuly');


        
      } else {
        message.error('User Not Registered. Please Login First');
      }
    } catch (error) {
      console.log(error);
      console.log('Something went wrong');
    }
  };

  return (
    <Layout title={'Your Profile'}>
    <div className="flex flex-col md:flex-row">
      <UserMenu />
      <div className="md:ml-6 mt-4 border border-red-200 p-4 rounded-lg w-full">
        <h1 className="text-lg font-semibold">User Profile</h1>
        <form
          className="flex flex-col w-full max-w-md flex-center justify-center items-center m-auto mt-5"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:w-64"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            disabled
            className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:w-64"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:w-64"
          />
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your phone number"
            className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:w-64"
          />
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Your address"
            className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:w-64"
          />
          <button
            type="submit"
            className="bg-black text-white text-sm rounded-lg py-2 px-4 hover:bg-blue-700 sm:w-full"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  </Layout>
  
  );
};

export default Profile;
