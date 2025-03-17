
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

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
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Convert Supabase user to our User interface
  const formatUser = (supabaseUser: SupabaseUser | null): User | null => {
    if (!supabaseUser) return null;
    
    return {
      id: supabaseUser.id,
      username: supabaseUser.email?.split('@')[0] || '',
      fullName: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User',
      email: supabaseUser.email || '',
      mobile: supabaseUser.phone || '',
      role: supabaseUser.email === 'admin@example.com' ? 'admin' : 'user', // Default role assignment
      isApproved: true, // Default to true for now
      isBlocked: false, // Default to false for now
      lastActive: new Date(),
    };
  };

  // Check auth state on mount and subscribe to auth changes
  useEffect(() => {
    setIsLoading(true);
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(formatUser(session.user));
      }
      setIsLoading(false);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setUser(formatUser(session.user));
          navigate('/dashboard');
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          navigate('/login');
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Login with email and password
  const login = async (email: string, password: string, remember: boolean = false): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return false;
      }
      
      if (data.user) {
        const formattedUser = formatUser(data.user);
        if (formattedUser) {
          setUser(formattedUser);
          toast.success(`Welcome back, ${formattedUser.fullName}!`);
          
          // If remember me is checked, the session will be persisted by Supabase
          // We don't need to do anything extra here
          
          return true;
        }
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login.');
      setIsLoading(false);
      return false;
    }
  };
  
  // Sign in with Google
  const signInWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast.error('Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/login');
      toast.success('You have been logged out');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred during logout');
    }
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        signInWithGoogle,
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
