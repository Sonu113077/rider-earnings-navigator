
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { 
  User, Search, Bell, LogOut, Home, Settings, 
  FileText, CreditCard, Menu, X, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [greetingTime, setGreetingTime] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Get appropriate greeting based on time of day
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreetingTime('Good morning');
    } else if (hours < 18) {
      setGreetingTime('Good afternoon');
    } else {
      setGreetingTime('Good evening');
    }
  }, []);

  const handleNotificationClick = () => {
    navigate('/dashboard/notifications');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/dashboard/search', label: 'Search Earnings', icon: Search },
    { path: '/dashboard/reports', label: 'Reports', icon: FileText },
    { path: '/dashboard/profile', label: 'My Profile', icon: User },
    { path: '/dashboard/notifications', label: 'Notifications', icon: Bell, badge: notificationsCount },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <Button 
          onClick={toggleSidebar}
          className="rounded-full w-12 h-12 shadow-lg flex items-center justify-center"
          size="icon"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-20 w-64 bg-card shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-16`}>
        <div className="flex flex-col h-full">
          {/* User info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.fullName || 'Demo User'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink 
                key={item.path}
                to={item.path} 
                end={item.path === '/dashboard'}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
              >
                <item.icon className="mr-3 h-4 w-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-border">
            <button 
              onClick={() => {
                logout();
                toast({
                  title: "Logged out",
                  description: "You have been successfully logged out.",
                });
              }}
              className="flex items-center w-full px-3 py-2 text-sm text-muted-foreground rounded-md hover:bg-muted hover:text-foreground transition-colors"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-background z-30 border-b border-border px-4 flex items-center">
        <div className="flex items-center lg:w-64">
          <Link to="/" className="flex items-center space-x-2 text-primary font-medium">
            <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
              <div className="absolute w-6 h-6 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute w-4 h-4 bg-background rounded-full"></div>
            </div>
            <span className="text-xl font-semibold tracking-tight">Rider Earnings</span>
          </Link>
        </div>
        
        <div className="flex-1 flex justify-end items-center space-x-4">
          <div className="relative">
            <button 
              onClick={handleNotificationClick}
              className="relative p-2 text-foreground hover:bg-muted rounded-full transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {notificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              )}
            </button>
          </div>
          
          <div className="hidden md:flex items-center border-l border-border pl-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <User size={18} />
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">{user?.fullName || 'Demo User'}</p>
              <p className="text-xs text-muted-foreground">{user?.role || 'User'}</p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="lg:pl-64 pt-16">
        <div className="p-4 md:p-8 space-y-6">
          {/* Welcome card */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-none">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{greetingTime}, {user?.fullName?.split(' ')[0] || 'Rider'}</h1>
                  <p className="text-muted-foreground mt-1">
                    Welcome to your dashboard. Here's a summary of your recent activities.
                  </p>
                  <div className="flex items-center mt-4">
                    <Link to="/dashboard/search" className="flex items-center text-sm text-primary font-medium">
                      Search earnings <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
                
                <div className="flex flex-col sm:items-end gap-2">
                  <div className="text-sm text-muted-foreground">Your recent earnings</div>
                  <div className="text-3xl font-bold">$1,254</div>
                  <div className="text-sm text-green-600 flex items-center">
                    <span className="flex items-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mr-1">
                        <path d="M18 15l-6-6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      +12.5%
                    </span>
                    <span className="text-muted-foreground ml-1">vs last month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
