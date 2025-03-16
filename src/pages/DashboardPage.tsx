
import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  User, Search, Bell, LogOut, Home, Settings 
} from 'lucide-react';
import Header from '../components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-10 w-64 bg-card shadow-lg transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-16`}>
        <div className="flex flex-col h-full">
          {/* User info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <NavLink 
              to="/dashboard" 
              end
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`
              }
            >
              <Home className="mr-3 h-4 w-4" />
              Search Earnings
            </NavLink>
            
            <NavLink 
              to="/dashboard/profile" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`
              }
            >
              <User className="mr-3 h-4 w-4" />
              My Profile
            </NavLink>
            
            <NavLink 
              to="/dashboard/notifications" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`
              }
            >
              <Bell className="mr-3 h-4 w-4" />
              Notifications
              <span className="ml-auto bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
            </NavLink>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-border">
            <button 
              onClick={logout}
              className="flex items-center w-full px-3 py-2 text-sm text-muted-foreground rounded-md hover:bg-muted hover:text-foreground"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar toggle */}
      <div className="fixed bottom-4 left-4 z-20 lg:hidden">
        <button 
          onClick={toggleSidebar}
          className="bg-primary text-white p-3 rounded-full shadow-lg"
          aria-label="Toggle sidebar"
        >
          <Settings size={20} />
        </button>
      </div>
      
      {/* Main content */}
      <main className="lg:pl-64 pt-16">
        <div className="px-4 py-8 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
