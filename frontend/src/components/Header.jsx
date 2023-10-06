import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../components/context/auth';
import { message, Badge } from 'antd';
import { FormControl, MenuItem, Select } from '@mui/material';
import SearchInput from './form/SearchInput';
import useCategory from './hooks/useCategory';
import { useCart } from './context/Cart';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const { cart, setCart } = useCart();
  const categories = useCategory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    message.success('Logged out successfully');
  };

  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl flex items-center">
          <Link to="/" className="text-white">
            My Online Store
          </Link>
          <ShoppingCartIcon className="ml-2" />
        </div>
        <div>
          <SearchInput />
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <NavLink
            to="/"
            className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Home
          </NavLink>
          <NavLink
            to="/categories"
            className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Categories
          </NavLink>
          {!auth.user ? (
            <>
              <NavLink
                to="/register"
                className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              <FormControl>
                <Select
                  value=""
                  // onChange={handleMenuClose}
                  displayEmpty
                  renderValue={(value) => (
                    <IconButton
                      aria-controls="user-menu"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      {auth?.user?.name}
                    </IconButton>
                  )}
                >
                  <MenuItem value="" disabled>
                    {auth?.user?.name}
                  </MenuItem>
                  <MenuItem
                    component={NavLink}
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? 'admin' : 'user'
                    }`}
                    // onClick={handleMenuClose}
                  >
                    Dashboard
                  </MenuItem>

                  <MenuItem
                    component={NavLink}
                    to="/login"
                    onClick={handleLogout}
                  >
                    Logout
                  </MenuItem>
                </Select>
              </FormControl>
            </>
          )}

          {/* Cart section with Badge */}
        
<NavLink
  to="/cart"
  className="text-white text-2xl relative" // Adjust classes as needed
>
  Cart
  <Badge
    count={cart?.length}
    showZero
    className="cart-badge text-2xl"
    style={{ position: 'absolute', top: '-12px', right: '-12px' }}
  />
</NavLink>

        </div>

        <div className="md:hidden">
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
            <div className="p-4">
              <NavLink
                to="/"
                className="block text-blue-500 hover:text-blue-700 mb-2"
              >
                Home
              </NavLink>
              <NavLink
                to="/categories"
                className="block text-blue-500 hover:text-blue-700 mb-2"
              >
                Categories
              </NavLink>
              {!auth.user ? (
                <>
                  <NavLink
                    to="/register"
                    className="block text-blue-500 hover:text-blue-700 mb-2"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="block text-blue-500 hover:text-blue-700 mb-2"
                  >
                    Login
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={handleLogout}
                    className="block text-blue-500 hover:text-blue-700 mb-2"
                  >
                    Logout
                  </NavLink>
                </>
              )}

              {/* Cart section with Badge */}
             
<NavLink
  to="/cart"
  className="text-white text-2xl relative" // Adjust classes as needed
>
Cart
  <Badge
    count={cart?.length}Cart
    showZero
    className="cart-badge text-2xl"
    style={{ position: 'absolute', top: '-12px', right: '-12px' }}
   
  />
</NavLink>

            </div>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default Header;
