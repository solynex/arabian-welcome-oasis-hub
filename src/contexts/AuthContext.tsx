
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  companyName: string;
  businessCategory: string;
  country: string;
  commercialRegistration: string;
  logo?: string;
  userType: 'importer' | 'exporter';
  subscriptionPlan?: 'exporter1' | 'exporter2' | 'exporter3' | 'importer';
  profileCompletion: number;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'profileCompletion'>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock data for simulation
const mockUsers: User[] = [
  {
    id: '1',
    username: 'importer1',
    email: 'importer@company.com',
    companyName: 'شركة الأندلس للتكنولوجيا',
    businessCategory: 'إلكترونيات',
    country: 'السعودية',
    commercialRegistration: '1234567890',
    userType: 'importer',
    subscriptionPlan: 'importer',
    profileCompletion: 75
  },
  {
    id: '2',
    username: 'exporter1',
    email: 'exporter@supplier.com',
    companyName: 'شركة التصدير العالمية',
    businessCategory: 'إلكترونيات',
    country: 'الصين',
    commercialRegistration: '0987654321',
    userType: 'exporter',
    subscriptionPlan: 'exporter2',
    profileCompletion: 90
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('globtrade_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('globtrade_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (userData: Omit<User, 'id' | 'profileCompletion'>): Promise<boolean> => {
    // Simulate registration
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      profileCompletion: 40
    };
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('globtrade_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('globtrade_user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('globtrade_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
