import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      setAuthState(JSON.parse(storedAuthState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      setAuthState({
        isAuthenticated: true,
        user: response.data.user,
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed:', error);
      alert(error.response.data);
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', { email, password });
      setAuthState({
        isAuthenticated: true,
        user: response.data.user,
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Signup failed:', error);
      alert(error.response.data);
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
    localStorage.removeItem('authState');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
