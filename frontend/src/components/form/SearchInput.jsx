import React from 'react';
import { Input, Button } from 'antd';
import axios from 'axios';
import { useSearch } from '../context/Search';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const { auth, setAuth } = useSearch(); // Destructure auth and setAuth
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/api/v1/product/search/${auth.keyword}`);

      const data = response.data.results; // Access results from the API response
      setAuth({ ...auth, results: data });
      navigate('/search');
      // console.log('API Response:', data);

      // Handle the search results in your frontend as needed
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
      <Input
        type="text"
        placeholder="Search..."
        value={auth.keyword}
        onChange={(e) => setAuth({ ...auth, keyword: e.target.value })} // Update keyword state
      />
      <Button type="primary" htmlType="submit" style={{ marginLeft: '8px' }}>
        Search
      </Button>
    </form>
  );
};

export default SearchInput;
