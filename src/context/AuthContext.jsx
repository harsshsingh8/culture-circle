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
        body: JSON.stringify({ email, password }),
        signal: AbortSignal.timeout(5000) // 5 second timeout
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
      // Fallback to localStorage if backend is unavailable
      console.warn('Backend unavailable, using local auth:', error.message);
      const users = JSON.parse(localStorage.getItem('luxecart_users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('luxecart_user', JSON.stringify(userWithoutPassword));
        return { success: true };
      }
      
      return { success: false, error: 'Invalid email or password. Please sign up first.' };
    }
  }, []);

  const signup = useCallback(async (name, email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        signal: AbortSignal.timeout(5000) // 5 second timeout
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
      // Fallback to localStorage if backend is unavailable
      console.warn('Backend unavailable, using local auth:', error.message);
      const users = JSON.parse(localStorage.getItem('luxecart_users') || '[]');
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        return { success: false, error: 'An account with this email already exists' };
      }
      
      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('luxecart_users', JSON.stringify(users));
      
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('luxecart_user', JSON.stringify(userWithoutPassword));
      
      return { success: true };
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
        body: JSON.stringify(updates),
        signal: AbortSignal.timeout(5000) // 5 second timeout
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
      // Fallback to localStorage
      console.warn('Backend unavailable, updating locally:', error.message);
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('luxecart_user', JSON.stringify(updatedUser));
      
      // Update in users list too
      const users = JSON.parse(localStorage.getItem('luxecart_users') || '[]');
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem('luxecart_users', JSON.stringify(users));
      }
      
      return { success: true };
    }
  }, [user]);

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
