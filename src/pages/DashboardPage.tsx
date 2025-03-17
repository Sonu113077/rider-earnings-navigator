
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import EarningsGraph from '@/components/dashboard/EarningsGraph';
import AccountSummary from '@/components/dashboard/AccountSummary';
import TabbedActivity from '@/components/dashboard/TabbedActivity';
import DataUpdateInfo from '@/components/dashboard/DataUpdateInfo';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [greetingTime, setGreetingTime] = useState('');
  
  // Check if we're on the main dashboard route
  const isMainDashboard = location.pathname === '/dashboard';

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

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        notificationsCount={notificationsCount} 
      />
      
      <DashboardHeader 
        notificationsCount={notificationsCount} 
        onNotificationClick={handleNotificationClick} 
      />
      
      {/* Main content */}
      <main className="lg:pl-64 pt-16">
        <div className="p-4 md:p-8 space-y-6">
          {/* Show dashboard content only on main dashboard route */}
          {isMainDashboard ? (
            <>
              <WelcomeCard greetingTime={greetingTime} />
              
              {/* Account Summary Cards */}
              <div className="mb-6">
                <AccountSummary />
              </div>
              
              {/* Main Dashboard Content */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Earnings Graph - Takes 2/3 of the width */}
                <div className="lg:col-span-2 space-y-6">
                  <EarningsGraph />
                  <DataUpdateInfo />
                </div>
                
                {/* Activity Feed - Takes 1/3 of the width */}
                <div className="lg:col-span-1">
                  <TabbedActivity />
                </div>
              </div>
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
