
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Header from '../components/layout/Header';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if the URL contains a hash token
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    if (!hashParams.get('access_token') && !hashParams.get('type')) {
      // If there's no access token, user might have navigated here directly
      setError('Invalid or expired reset link. Please request a new password reset.');
    }
  }, []);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        throw error;
      }
      
      toast.success('Password has been reset successfully');
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.message || 'Failed to reset password');
      toast.error('Password reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return Math.min(strength, 4);
  };
  
  const passwordStrength = getPasswordStrength(password);
  
  const getStrengthLabel = (strength: number) => {
    if (strength === 0) return 'Poor';
    if (strength === 1) return 'Weak';
    if (strength === 2) return 'Fair';
    if (strength === 3) return 'Good';
    return 'Strong';
  };
  
  const getStrengthColor = (strength: number) => {
    if (strength === 0) return 'bg-gray-200 dark:bg-gray-700';
    if (strength === 1) return 'bg-red-500';
    if (strength === 2) return 'bg-orange-500';
    if (strength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-16 min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <div className="w-full max-w-md mx-auto p-6 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Reset Your Password</h1>
            <p className="text-muted-foreground">
              Enter a new password for your account
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
              <label htmlFor="password" className="text-sm font-medium">
                New Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password strength indicator */}
              {password && (
                <div className="space-y-2 pt-1">
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i < passwordStrength ? getStrengthColor(passwordStrength) : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password strength: <span className="font-medium">{getStrengthLabel(passwordStrength)}</span>
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className={`w-full btn-primary h-11 relative ${isLoading ? 'opacity-90' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="opacity-0">Reset Password</span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  </span>
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ResetPasswordPage;
