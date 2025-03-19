
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { getProfile, updateProfile } from '@/lib/db';

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

// Add your personal email to this list of admin emails
const ADMIN_EMAILS = ['admin@example.com', 'saunvirsingh19@gmail.com']; // Your email has been added

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Convert Supabase user to our User interface
  const formatUser = async (supabaseUser: SupabaseUser | null): Promise<User | null> => {
    if (!supabaseUser) return null;
    
    try {
      // Check if user has a profile in the database
      const profile = await getProfile(supabaseUser.id);
      
      // Determine if the email is in the admin list
      const isAdminEmail = ADMIN_EMAILS.includes(supabaseUser.email || '');
      const role: UserRole = isAdminEmail ? 'admin' : (profile?.role as UserRole || 'user');
      
      // If the user is an admin by email but not in the database, update their role
      if (isAdminEmail && profile && profile.role !== 'admin') {
        await updateProfile(supabaseUser.id, { role: 'admin' });
      }
      
      return {
        id: supabaseUser.id,
        username: profile?.username || supabaseUser.email?.split('@')[0] || '',
        fullName: profile?.full_name || supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User',
        email: supabaseUser.email || '',
        mobile: profile?.mobile || supabaseUser.phone || '',
        role: role,
        isApproved: profile?.is_approved ?? true,
        isBlocked: profile?.is_blocked ?? false,
        lastActive: new Date(),
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      
      // Fall back to basic user info if profile fetch fails
      return {
        id: supabaseUser.id,
        username: supabaseUser.email?.split('@')[0] || '',
        fullName: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User',
        email: supabaseUser.email || '',
        mobile: supabaseUser.phone || '',
        role: ADMIN_EMAILS.includes(supabaseUser.email || '') ? 'admin' : 'user',
        isApproved: true,
        isBlocked: false,
        lastActive: new Date(),
      };
    }
  };

  // Check auth state on mount and subscribe to auth changes
  useEffect(() => {
    setIsLoading(true);
    
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const formattedUser = await formatUser(session.user);
        setUser(formattedUser);
      }
      setIsLoading(false);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session);
        if (event === 'SIGNED_IN' && session) {
          const formattedUser = await formatUser(session.user);
          setUser(formattedUser);
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
    console.log('Attempting login with:', email);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error.message);
        toast.error(error.message);
        setIsLoading(false);
        return false;
      }
      
      if (data.user) {
        const formattedUser = await formatUser(data.user);
        if (formattedUser) {
          setUser(formattedUser);
          toast.success(`Welcome back, ${formattedUser.fullName}!`);
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
