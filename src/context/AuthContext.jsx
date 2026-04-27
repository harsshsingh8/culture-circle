import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('luxecart_user');
      const token = localStorage.getItem('luxecart_token');
      
      if (storedUser && token) {
        try {
          // Verify token with backend
          const res = await fetch(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          
          if (data.success) {
            setUser(data.data);
          } else {
            localStorage.removeItem('luxecart_user');
            localStorage.removeItem('luxecart_token');
          }
        } catch (e) {
          localStorage.removeItem('luxecart_user');
          localStorage.removeItem('luxecart_token');
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setUser(data.data);
        localStorage.setItem('luxecart_user', JSON.stringify(data.data));
        localStorage.setItem('luxecart_token', data.data.token);
        return { success: true };
      }
      
      return { success: false, error: data.message };
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  }, []);

  const signup = useCallback(async (name, email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setUser(data.data);
        localStorage.setItem('luxecart_user', JSON.stringify(data.data));
        localStorage.setItem('luxecart_token', data.data.token);
        return { success: true };
      }
      
      return { success: false, error: data.message };
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('luxecart_user');
  }, []);

  const updateProfile = useCallback(async (updates) => {
    try {
      const token = localStorage.getItem('luxecart_token');
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      
      const data = await res.json();
      
      if (data.success) {
        setUser(data.data);
        localStorage.setItem('luxecart_user', JSON.stringify(data.data));
        localStorage.setItem('luxecart_token', data.data.token);
        return { success: true };
      }
      
      return { success: false, error: data.message };
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
