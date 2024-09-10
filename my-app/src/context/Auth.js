import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const Auth = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  });

  useEffect(() => {
    const data = localStorage.getItem('auth');
    if (data) {
      try {
        const parseData = JSON.parse(data);
        setAuth({
          user: parseData.user,
          token: parseData.token
        });
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }, []);
  
  
 

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export { Auth, useAuth };