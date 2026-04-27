import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem('luxecart_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('luxecart_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('luxecart_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('luxecart_user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  }, []);

  const signup = useCallback(async (name, email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('luxecart_users') || '[]');
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      return { success: false, error: 'An account with this email already exists' };
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
      avatar: null
    };
    
    users.push(newUser);
    localStorage.setItem('luxecart_users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('luxecart_user', JSON.stringify(userWithoutPassword));
    
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('luxecart_user');
  }, []);

  const updateProfile = useCallback(async (updates) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
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
