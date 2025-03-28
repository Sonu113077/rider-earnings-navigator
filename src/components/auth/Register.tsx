
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Lock, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Register = () => {
  const [formState, setFormState] = useState({
    username: '',
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [verificationSent, setVerificationSent] = useState(false);
  const { signInWithGoogle } = useAuth();
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    if (!formState.username || !formState.fullName || !formState.email || !formState.mobile) {
      setError('All fields are required');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Mobile validation - simple 10 digit check
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formState.mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    if (!formState.password || !formState.confirmPassword) {
      setError('Please enter and confirm your password');
      return false;
    }
    
    if (formState.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    if (formState.password !== formState.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmitStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (validateStep2()) {
      setIsLoading(true);
      
      try {
        // Register with Supabase
        const { data, error } = await supabase.auth.signUp({
          email: formState.email,
          password: formState.password,
          options: {
            data: {
              full_name: formState.fullName,
              username: formState.username,
              mobile: formState.mobile,
            }
          }
        });
        
        if (error) {
          throw error;
        }
        
        // Set verification sent if the user was created successfully
        if (data.user) {
          setVerificationSent(true);
        } else {
          throw new Error('Registration failed');
        }
      } catch (err: any) {
        console.error('Registration error:', err);
        setError(err.message || 'An error occurred during registration');
        toast.error(err.message || 'Registration failed');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    
    try {
      await signInWithGoogle();
      // The redirect will be handled by Supabase OAuth flow
    } catch (err) {
      setError('Failed to sign up with Google');
      toast.error('Google sign-up failed');
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
  
  const passwordStrength = getPasswordStrength(formState.password);
  
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

  if (verificationSent) {
    return (
      <div className="w-full max-w-md mx-auto p-6 space-y-8 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
          <Check size={32} className="text-green-600 dark:text-green-400" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Verification Sent</h1>
          <p className="text-muted-foreground">
            We've sent a verification email to <strong>{formState.email}</strong>. 
            Please check your inbox and follow the instructions to verify your account.
          </p>
        </div>
        
        <div className="pt-4">
          <p className="text-sm text-muted-foreground mb-4">
            After verification, an admin will review and approve your account.
            This usually takes 1-2 business days.
          </p>
          
          <Link 
            to="/login" 
            className="btn-primary"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-muted-foreground">
          Register to access Rider Earnings Management
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex-1">
          <div className={`h-1 rounded ${step >= 1 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
          <p className={`text-xs mt-1.5 ${step === 1 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
            Account Details
          </p>
        </div>
        <div className="flex-1 ml-2">
          <div className={`h-1 rounded ${step >= 2 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
          <p className={`text-xs mt-1.5 ${step === 2 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
            Security
          </p>
        </div>
      </div>
      
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg flex items-start gap-2 text-red-600 dark:text-red-400 animate-fade-in">
          <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {step === 1 ? (
        <>
          <form onSubmit={handleSubmitStep1} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formState.username}
                  onChange={handleChange}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formState.fullName}
                  onChange={handleChange}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formState.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="mobile" className="text-sm font-medium">
                Mobile Number
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  placeholder="Enter 10-digit number"
                  value={formState.mobile}
                  onChange={handleChange}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full btn-primary h-11">
              Continue
            </button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">
                Or sign up with
              </span>
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" className="text-gray-700 dark:text-gray-300">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmitStep2} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={formState.password}
                onChange={handleChange}
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
            {formState.password && (
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
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={formState.confirmPassword}
                onChange={handleChange}
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

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 btn-secondary h-11"
            >
              Back
            </button>
            <button
              type="submit"
              className={`flex-1 btn-primary h-11 relative ${isLoading ? 'opacity-90' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="opacity-0">Register</span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  </span>
                </>
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>
      )}

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;
