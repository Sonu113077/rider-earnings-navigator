
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      // Call Supabase to send a password reset email
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      setResetSent(true);
      toast.success('Password reset instructions sent to your email');
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.message || 'An error occurred. Please try again.');
      toast.error('Failed to send reset instructions');
    } finally {
      setIsLoading(false);
    }
  };

  if (resetSent) {
    return (
      <div className="w-full max-w-md mx-auto p-6 space-y-8 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
          <Check size={32} className="text-green-600 dark:text-green-400" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Check Your Email</h1>
          <p className="text-muted-foreground">
            We've sent password reset instructions to <strong>{email}</strong>. 
            Please check your inbox and follow the link to reset your password.
          </p>
        </div>
        
        <div className="pt-4">
          <p className="text-sm text-muted-foreground mb-4">
            If you don't see the email, check your spam folder or make sure you entered the correct email address.
          </p>
          
          <Link 
            to="/login" 
            className="btn-primary"
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-muted-foreground">
          Enter your email and we'll send you a link to reset your password
        </p>
      </div>
      
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg flex items-start gap-2 text-red-600 dark:text-red-400 animate-fade-in">
          <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field pl-10"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className={`w-full btn-primary h-11 relative ${isLoading ? 'opacity-90' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="opacity-0">Send Reset Instructions</span>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              </span>
            </>
          ) : (
            'Send Reset Instructions'
          )}
        </button>
      </form>
      
      <div className="text-center text-sm text-muted-foreground">
        Remember your password?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
