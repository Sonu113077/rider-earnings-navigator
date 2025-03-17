
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, User, ChevronDown, Mail } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isAuthenticated
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary font-medium"
            aria-label="Rider Earnings Navigator"
          >
            <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
              <div className="absolute w-6 h-6 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute w-4 h-4 bg-white dark:bg-gray-900 rounded-full"></div>
            </div>
            <span className="text-xl font-semibold tracking-tight">Rider Earnings</span>
          </Link>

          {isAuthenticated && (
            <nav className="hidden md:flex ml-8 space-x-1">
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === '/dashboard' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/dashboard/search" 
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === '/dashboard/search' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Search
              </Link>
              <Link 
                to="/dashboard/reports" 
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === '/dashboard/reports' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Reports
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <>
              <button 
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 text-sm focus:outline-none"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <User size={18} />
                  </div>
                  <span className="hidden md:block font-medium">{user?.fullName || 'User'}</span>
                  <ChevronDown size={16} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700 animate-fade-in">
                    <Link 
                      to="/dashboard/profile" 
                      className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link 
                      to="/dashboard/settings" 
                      className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    <button 
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="hidden md:flex space-x-3">
              <Link to="/login" className="btn-ghost">
                Sign in
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </div>
          )}
          
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-slide-in">
          <div className="pt-2 pb-4 px-4 space-y-1">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`block px-3 py-2 text-base rounded-md ${
                    location.pathname === '/dashboard' 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/dashboard/search" 
                  className={`block px-3 py-2 text-base rounded-md ${
                    location.pathname === '/dashboard/search' 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Search
                </Link>
                <Link 
                  to="/dashboard/reports" 
                  className={`block px-3 py-2 text-base rounded-md ${
                    location.pathname === '/dashboard/reports' 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reports
                </Link>
                <Link 
                  to="/dashboard/profile" 
                  className={`block px-3 py-2 text-base rounded-md ${
                    location.pathname === '/dashboard/profile' 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }} 
                  className="block w-full text-left px-3 py-2 text-base text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 text-base text-white bg-primary hover:bg-primary/90 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
