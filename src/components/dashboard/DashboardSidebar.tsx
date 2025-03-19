
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  Search, 
  BarChart3, 
  Bell, 
  Settings,
  User,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  notificationsCount: number;
}

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen, notificationsCount }: DashboardSidebarProps) => {
  const location = useLocation();
  const { user, isAdmin } = useAuth();
  
  // Set initial state based on viewport
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setSidebarOpen]);

  // Define nav items based on user role
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', visible: true },
    { path: '/dashboard/search', icon: Search, label: 'Search Earnings', visible: true },
    { path: '/dashboard/reports', icon: BarChart3, label: 'Reports', visible: true },
    { path: '/dashboard/notifications', icon: Bell, label: 'Notifications', visible: true, badge: notificationsCount },
    { path: '/dashboard/profile', icon: User, label: 'Profile', visible: true },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings', visible: true },
    { path: '/admin', icon: LayoutDashboard, label: 'Admin Dashboard', visible: isAdmin },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 z-40 h-screen pt-16 transition-all duration-300 transform ${
        sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 lg:translate-x-0 lg:w-20'
      } bg-background border-r border-border`}
    >
      <div className="h-full px-3 pb-5 overflow-y-auto flex flex-col justify-between">
        <div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute right-4 top-3 p-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors lg:flex hidden"
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <ChevronLeft size={18} className={`transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`} />
          </button>

          <ul className="space-y-1.5 mt-6">
            {navItems.filter(item => item.visible).map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2.5 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === item.path || 
                    (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <item.icon size={20} className={!sidebarOpen ? 'mx-auto' : 'mr-3'} />
                  {sidebarOpen && <span>{item.label}</span>}
                  {!sidebarOpen && (
                    <span className="sr-only">{item.label}</span>
                  )}
                  
                  {/* Notification badge */}
                  {item.badge && item.badge > 0 && sidebarOpen && (
                    <span className="ml-auto bg-destructive text-destructive-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.badge && item.badge > 0 && !sidebarOpen && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <Link
            to="/help"
            className={`flex items-center p-2.5 text-sm font-medium rounded-lg transition-colors text-foreground hover:bg-muted ${
              !sidebarOpen ? 'justify-center' : ''
            }`}
          >
            <HelpCircle size={20} className={!sidebarOpen ? 'mx-auto' : 'mr-3'} />
            {sidebarOpen && <span>Help & Support</span>}
            {!sidebarOpen && (
              <span className="sr-only">Help & Support</span>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
