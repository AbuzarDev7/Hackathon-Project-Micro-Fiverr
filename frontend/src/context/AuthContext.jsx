import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const API_URL = ''; // Empty string means use relative path (Vite proxy will handle it)

const AuthContext = createContext();



export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Helper to set headers
  const setAuthHeader = (t) => {
    if (t) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
      console.log('🔑 Auth Header Set');
    } else {
      delete axios.defaults.headers.common['Authorization'];
      console.log('🔓 Auth Header Cleared');
    }
  };

  // Set header on initial load
  useEffect(() => {
    if (token) setAuthHeader(token);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      if (token) {
        console.log('📡 Checking user status...');
        try {
<<<<<<< HEAD
          const response = await axios.get('/api/auth/me');
=======
          const response = await axios.get(`${API_URL}/api/auth/me`);
          console.log('✅ User check successful');
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
          setUser(response.data.user);
        } catch (error) {
          console.error('❌ Auth check failed:', error.response?.data?.message || error.message);
          // If the error is 401, clear the token as it is likely invalid
          if (error.response?.status === 401) {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
            setAuthHeader(null);
          }
        }
      } else {
        console.log('ℹ️ No token found, skipping check');
      }
      setLoading(false);
    };

    checkUser();
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    console.log(`📡 Attempting login for: ${email}`);
    try {
<<<<<<< HEAD
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { success: true, user }; // ✅ return user so Login.jsx can check role
=======
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      const { token: newToken, user: newUser } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser);
      setAuthHeader(newToken);
      
      console.log('✅ Login successful');
      return { success: true, user: newUser };
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      console.error('❌ Login error:', msg);
      setLoading(false);
      return { success: false, message: msg };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    console.log(`📡 Attempting registration for: ${userData.email}`);
    try {
<<<<<<< HEAD
      const response = await axios.post('/api/auth/register', userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { success: true, user }; // ✅ return user so Register.jsx can check role
=======
      const response = await axios.post(`${API_URL}/api/auth/register`, userData);
      const { token: newToken, user: newUser } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser);
      setAuthHeader(newToken);
      
      console.log('✅ Registration successful');
      return { success: true, user: newUser };
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      console.error('❌ Registration error:', msg);
      setLoading(false);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
<<<<<<< HEAD
    isProvider: user?.role === 'freelancer', 
    isCustomer: user?.role === 'client', // Backend defaults to 'client' for customers
    isAdmin: user?.role === 'admin'
=======
    isFreelancer: user?.role === 'freelancer', // Changed from provider to match backend
    isCustomer: user?.role === 'client', // Backend uses 'client' by default
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
