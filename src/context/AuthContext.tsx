import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "http://localhost:5000";

// --- 1. UPDATED: Interfaces to include role and branch ---
interface Branch {
  _id: string;
  name: string;
}
interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Customer' | 'Staff' | 'Admin';
  branch?: Branch; // Branch is optional, only for Staff/Admin
}
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email, password) => Promise<void>;
  register: (name, email, password) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: { 'Authorization': `Bearer ${storedToken}` },
          });
          if (!response.ok) throw new Error('Invalid session');
          
          const data = await response.json();
          // 2. The user object from the backend now includes role and branch
          setUser(data.data.user);
          setToken(storedToken);
        } catch (error) {
          console.error("Session verification failed:", error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    verifyUser();
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to login');
    
    localStorage.setItem('token', data.token);
    setToken(data.token);
    
    // 3. Store the full user object, including role and branch
    const loggedInUser: User = data.data.user;
    setUser(loggedInUser);

    // 4. Redirect based on role
    if (loggedInUser.role === 'Staff' || loggedInUser.role === 'Admin') {
        navigate('/admin');
    } else {
        navigate('/');
    }
  };

  const register = async (name, email, password) => {
    // ... register logic remains the same, it will create a 'Customer' by default
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    register,
    logout,
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading Application...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
