import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../components/context/auth';
import axios from 'axios';
import { Button, Checkbox, Radio, Spin, message } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/context/Cart';

const HomePage = () => {
  const { cart, setCart } = useCart();


  const navigate = useNavigate()
  const [auth, setAuth] = useAuth();
  const [Products, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [check, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  

 

  //  get all the categories
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
useEffect(() =>{
  if(page=== 1) return
  loadMore()
},[])
//  load more functionality
const loadMore = async () => {
  try {
    setIsLoading(true);
    const response = await axios.get(`http://localhost:5000/api/v1/product/product-list/${page}`);
    setIsLoading(false);
    const data = response.data;
    // Append the new products to the existing Products array
    setProduct([...Products, ...data.products]);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};

  // Define the useEffect hook to fetch categories when the component mounts
  useEffect(() => {
    // Call the function to fetch categories
    getallCategories();
    gettotalCount();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  // Get all Products
  const getAllProducts = async () => {
    try {
      setIsLoading(true); // Set loading state to true while fetching
      const response = await axios.get(`http://localhost:5000/api/v1/product/product-list/${page}`);
      const data = response.data;
     
      setProduct(data.products);
      setIsLoading(false); // Set loading state to false after fetching
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      console.log("it means that page data is not coming");
    }
  };

  // get total count
  const gettotalCount = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/product/product-count`);
      const data = response.data;
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // get by filter
  const handleFilter = (value, id) => {
    // Clone the current state array
    let all = [...check];

    if (value) {
      // If checked, add the category id to the array
      all.push(id);
    } else {
      // If unchecked, filter out the category id from the array
      all = all.filter((c) => c !== id);
    }

    // Update the state with the new array
    setChecked(all);
  };

  // Lifecycle method
  useEffect(() => {
    if (!check.length || !radio.length) getAllProducts();
  }, [check.length, radio.length]);

  // Lifecycle method
  useEffect(() => {
    if (check.length || radio.length) getfilterProduct();
  }, [check, radio]);

  // get filter product
  const getfilterProduct = async () => {
    try {
      setIsLoading(true); // Set loading state to true while fetching
      const response = await axios.post(`http://localhost:5000/api/v1/product/filter-product`, {
        check,
        radio,
      });

      const data = response.data;
      setProduct(data?.product);
      setIsLoading(false); // Set loading state to false after fetching
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best Offer"}>
      <div className="flex my-4">
        <div className="w-1/4 mr-4">
          <h6 className="text-xl font-semibold">Filter By Category</h6>
          <div>
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          <div className="mt-4">
            <h6 className="text-xl font-semibold">Filter By Prices</h6>
            <div>
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <Button className='bg-yellow-200' onClick={() => window.location.reload()}>Reset The Filter</Button>
        </div>

        <div className="w-3/4">
        <>
  <h1 className="text-2xl font-semibold my-4">All Products</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Products.length > 0 ? (
      Products.map((p) => (
        <div
          key={p._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <img
            src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
            alt={p.name}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{p.name}</h2>
            <p className="text-gray-600 mb-2">{p.description.substring(0, 20)}</p>
            <p className="text-blue-500 font-semibold">${p.price}</p>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <Button className="w-1/2 bg-gray-500 hover:bg-gray-600 m-2 text-white" onClick={() => navigate(`/product/${p.slug}`)}>
                More Details 
              </Button>
              <Button
                type="primary"
                className="w-1/2 m-2 bg-blue-500 hover:bg-blue-600"
              onClick={() => {setCart([...cart,p]), 
                localStorage.setItem('cart', JSON.stringify([...cart, p]))
              message.success("Cart Addded Successfully") }}>
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No products available</p>
    )}
  </div>
  <div> Total Products: {total}</div>
  {Products && Products.length < total ? (
    <Button
      className=' '
      onClick={(e) => {
        e.preventDefault();
        setPage(page + 1);
        loadMore(); // Call loadMore function when the button is clicked
      }}
    >
      {isLoading ? "Loading" : "Load More..."}
    </Button>
  ) : null}
</>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

