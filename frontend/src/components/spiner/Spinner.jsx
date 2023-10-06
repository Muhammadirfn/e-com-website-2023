import React, { useState, useEffect } from 'react';
import { CircleLoader } from 'react-spinners';
import { useNavigate ,useLocation } from 'react-router-dom';

const Spinner = ({path = "login"}) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
      if (count === 0) {
        navigate(`${path}`,{
          state: location.pathname
        });
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div className="flex items-center justify-center mt-10">
      <h1>Redirecting you to login in {count}</h1>
      {count ? <CircleLoader /> : null}
    </div>
  );
};

export default Spinner;