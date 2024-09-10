import React, { createContext, useContext, useEffect, useState } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
   keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook
const useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };