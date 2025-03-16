
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  User, Search, Bell, LogOut, Home, Settings, 
  FileText, X, Menu
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  notificationsCount: number;
}

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen, notificationsCount }: DashboardSidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/dashboard/search', label: 'Search Earnings', icon: Search },
    { path: '/dashboard/reports', label: 'Reports', icon: FileText },
    { path: '/dashboard/profile', label: 'My Profile', icon: User },
    { path: '/dashboard/notifications', label: 'Notifications', icon: Bell, badge: notificationsCount },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-full w-12 h-12 shadow-lg flex items-center justify-center bg-primary text-primary-foreground"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
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
    </>
  );
};

export default DashboardSidebar;
