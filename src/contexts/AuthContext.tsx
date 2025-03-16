
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Define user types and structure
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  mobile: string;
  role: UserRole;
  isApproved: boolean;
  isBlocked: boolean;
  lastActive: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

// Mock users for testing
const MOCK_USERS: Record<string, { user: User; password: string }> = {
  'admin@example.com': {
    user: {
      id: 'admin-1',
      username: 'admin',
      fullName: 'Admin User',
      email: 'admin@example.com',
      mobile: '9876543210',
      role: 'admin',
      isApproved: true,
      isBlocked: false,
      lastActive: new Date(),
    },
    password: 'admin123'
  },
  'user@example.com': {
    user: {
      id: 'user-1',
      username: 'testuser',
      fullName: 'Test User',
      email: 'user@example.com',
      mobile: '9876543211',
      role: 'user',
      isApproved: true,
      isBlocked: false,
      lastActive: new Date(),
    },
    password: 'user123'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, remember: boolean = false): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call/validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userRecord = MOCK_USERS[email];
    
    if (!userRecord || userRecord.password !== password) {
      setIsLoading(false);
      toast.error('Invalid credentials');
      return false;
    }
    
    const userData = userRecord.user;
    
    if (userData.isBlocked) {
      setIsLoading(false);
      toast.error('Your account has been blocked. Please contact admin.');
      return false;
    }
    
    if (!userData.isApproved) {
      setIsLoading(false);
      toast.error('Your account is pending approval.');
      return false;
    }
    
    // Update last active timestamp
    userData.lastActive = new Date();
    
    setUser(userData);
    
    // Store user data if remember me is checked
    if (remember) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
    
    toast.success(`Welcome back, ${userData.fullName}!`);
    setIsLoading(false);
    return true;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
    toast.success('You have been logged out');
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        logout,
        isAdmin: user?.role === 'admin' 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
