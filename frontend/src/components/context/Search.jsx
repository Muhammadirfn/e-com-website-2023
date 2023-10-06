// import React, { useContext, useState, createContext } from 'react';
// import axios from 'axios';

// const SearchContext = createContext();

// const SearchProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     keywordString: "",
//     results: []
   
//   });


  

//   return (
//     <SearchContext.Provider value={[auth, setAuth]}>
//       {children}
//     </SearchContext.Provider>
//   );
// };

// // Custom hook
// const useSearch = () => useContext(SearchContext);

// export { useSearch, SearchProvider };

// SearchContext.js
import React, { useContext, useState, createContext } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: '', // Initialize with an empty string
    results: [],
  });

  return (
    <SearchContext.Provider value={{ auth, setAuth }}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export { useSearch, SearchProvider };


