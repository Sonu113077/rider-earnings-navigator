
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle, ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

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
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll check if the email exists in our mock data
      const isValidUser = ['admin@example.com', 'user@example.com'].includes(email);
      
      if (isValidUser) {
        setEmailSent(true);
        toast.success('Password reset instructions sent to your email');
      } else {
        setError('No account found with this email address');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      toast.error('Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="w-full max-w-md mx-auto p-6 space-y-8 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
          <Check size={32} className="text-green-600 dark:text-green-400" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Check your email</h1>
          <p className="text-muted-foreground">
            We've sent password reset instructions to <strong>{email}</strong>.
            Please check your inbox and follow the link to reset your password.
          </p>
        </div>
        
        <div className="pt-4">
          <p className="text-sm text-muted-foreground mb-4">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={() => setEmailSent(false)}
              className="btn-secondary w-full"
            >
              Try again
            </button>
            
            <Link 
              to="/login" 
              className="flex items-center justify-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Reset your password</h1>
        <p className="text-muted-foreground">
          Enter your email address and we'll send you instructions to reset your password
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
            Email address
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
              autoComplete="email"
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
              <span className="opacity-0">Send reset instructions</span>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              </span>
            </>
          ) : (
            'Send reset instructions'
          )}
        </button>
      </form>
      
      <div className="text-center">
        <Link 
          to="/login" 
          className="flex items-center justify-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
