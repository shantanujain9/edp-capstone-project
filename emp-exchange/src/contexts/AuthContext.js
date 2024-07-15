import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correctly importing the named export
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user: null,
  });

  useEffect(() => {
    if (auth.token) {
      const decoded = jwtDecode(auth.token);
      setAuth((prevState) => ({
        ...prevState,
        user: decoded.user,
      }));
    }
  }, [auth.token]);

  const login = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const token = res.data.token;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setAuth({ token, user: decoded.user });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const signup = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      const token = res.data.token;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setAuth({ token, user: decoded.user });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
