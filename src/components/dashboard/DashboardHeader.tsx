
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardHeaderProps {
  notificationsCount: number;
  onNotificationClick: () => void;
}

const DashboardHeader = ({ notificationsCount, onNotificationClick }: DashboardHeaderProps) => {
  const { user } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  return (
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
            onClick={onNotificationClick}
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
  );
};

export default DashboardHeader;
