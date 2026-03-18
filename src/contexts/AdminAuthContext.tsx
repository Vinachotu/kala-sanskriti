import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (password: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('password', password)
        .single();

      if (data) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_auth', 'true');
        return true;
      }
      
      // Fallback for hardcoded password if table is empty or missing
      if (password === 'Sanskriti@3211') {
        setIsAuthenticated(true);
        localStorage.setItem('admin_auth', 'true');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      // Fallback for hardcoded password
      if (password === 'Sanskriti@3211') {
        setIsAuthenticated(true);
        localStorage.setItem('admin_auth', 'true');
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
