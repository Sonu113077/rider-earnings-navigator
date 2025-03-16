
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  Users, BarChart, Upload, LogOut, Home, Settings, 
  Bell, Search, Calendar, Shield, Database
} from 'lucide-react';
import Header from '../components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboardPage = () => {
  const { user, logout } = useAuth();
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
          {/* Admin info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                <Shield size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground truncate">Administrator</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <NavLink 
              to="/admin" 
              end
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive 
                    ? 'bg-destructive/10 text-destructive' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`
              }
            >
              <Users className="mr-3 h-4 w-4" />
              User Management
            </NavLink>
            
            <NavLink 
              to="/admin/earnings" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive 
                    ? 'bg-destructive/10 text-destructive' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`
              }
            >
              <BarChart className="mr-3 h-4 w-4" />
              Earnings Monitoring
            </NavLink>
            
            <NavLink 
              to="/admin/upload" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive 
                    ? 'bg-destructive/10 text-destructive' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`
              }
            >
              <Upload className="mr-3 h-4 w-4" />
              Bulk Upload
            </NavLink>
            
            <div className="pt-4 pb-2">
              <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Quick Stats
              </div>
            </div>
            
            <div className="px-3 py-2 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground">Active Users</span>
                <span className="text-xs font-medium">24</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div className="bg-green-500 h-1 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div className="px-3 py-2 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground">Pending Approvals</span>
                <span className="text-xs font-medium">8</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div className="bg-yellow-500 h-1 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            
            <div className="px-3 py-2 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground">Blocked Accounts</span>
                <span className="text-xs font-medium">3</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div className="bg-red-500 h-1 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
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
          className="bg-destructive text-destructive-foreground p-3 rounded-full shadow-lg"
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

export default AdminDashboardPage;
