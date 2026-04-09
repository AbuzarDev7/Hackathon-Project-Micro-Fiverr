import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const API_URL = ''; // Empty string means use relative path (Vite proxy will handle it)
axios.defaults.baseURL = ''; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage on startup (avatar & profile persist)
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
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
          const response = await axios.get(`${API_URL}/api/auth/me`);
          console.log('✅ User check successful');
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
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      const { token: newToken, user: newUser } = response.data;
      
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser)); // persist user data
      setToken(newToken);
      setUser(newUser);
      setAuthHeader(newToken);
      
      console.log('✅ Login successful');
      return { success: true, user: newUser };
    } catch (error) {
      console.error('❌ Login error detailed:', error);
      let msg = 'Login failed';
      
      if (error.response) {
        // The server responded with a status code that falls out of the range of 2xx
        msg = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        // The request was made but no response was received
        msg = 'No response from server. Please check if your backend is running.';
      } else {
        // Something happened in setting up the request that triggered an Error
        msg = error.message;
      }
      
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    console.log(`📡 Attempting registration for: ${userData.email}`);
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, userData);
      const { token: newToken, user: newUser } = response.data;
      
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser)); // persist user data
      setToken(newToken);
      setUser(newUser);
      setAuthHeader(newToken);
      
      console.log('✅ Registration successful');
      return { success: true, user: newUser };
    } catch (error) {
      console.error('❌ Registration error detailed:', error);
      let msg = 'Registration failed';
      
      if (error.response) {
        msg = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        msg = 'No response from server. Please check if your backend is running.';
      } else {
        msg = error.message;
      }
      
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  // Update user in both state and localStorage (called after profile save)
  const updateUser = (updatedUser) => {
    const merged = { ...user, ...updatedUser };
    setUser(merged);
    localStorage.setItem('user', JSON.stringify(merged));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // clear saved user on logout
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
    updateUser,
    isAuthenticated: !!user,
    isFreelancer: user?.role === 'freelancer', 
    isCustomer: user?.role === 'client', 
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
