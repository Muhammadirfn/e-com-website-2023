import { useState, useEffect } from 'react';
import axios from 'axios';

function useCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Define your async function inside the useEffect
    async function getCategories() {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/category/get-category');
        const data = response.data;
        setCategories(data?.category);
      } catch (error) {
        console.error(error);
      }
    }

    // Call the async function within useEffect
    getCategories();
  }, []); // Empty dependency array to run this effect once when the component mounts

  return categories;
}

export default useCategory;
