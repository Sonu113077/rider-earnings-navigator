
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  Search, 
  BarChart3, 
  Upload, 
  Users, 
  Bell, 
  Settings,
  HelpCircle
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Check if viewport is mobile on initial render
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1024);
    };
    
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/search', label: 'Search Earnings', icon: Search },
    { path: '/dashboard/reports', label: 'Reports', icon: BarChart3 },
    { path: '/dashboard/upload', label: 'Bulk Upload', icon: Upload },
    { path: '/dashboard/users', label: 'User Management', icon: Users },
    { path: '/dashboard/notifications', label: 'Notifications', icon: Bell },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 z-40 h-screen pt-20 transition-all duration-300 transform ${
        collapsed ? 'w-20' : 'w-64'
      } bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800`}
    >
      <div className="h-full px-3 pb-5 overflow-y-auto flex flex-col justify-between">
        <div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute right-4 top-3 p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeft size={18} className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </button>

          <ul className="space-y-1.5 mt-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2.5 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon size={20} className={collapsed ? 'mx-auto' : 'mr-3'} />
                  {!collapsed && <span>{item.label}</span>}
                  {collapsed && (
                    <span className="sr-only">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <Link
            to="/help"
            className={`flex items-center p-2.5 text-sm font-medium rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <HelpCircle size={20} className={collapsed ? 'mx-auto' : 'mr-3'} />
            {!collapsed && <span>Help & Support</span>}
            {collapsed && (
              <span className="sr-only">Help & Support</span>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
