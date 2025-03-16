
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WelcomeCard from '@/components/dashboard/WelcomeCard';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [greetingTime, setGreetingTime] = useState('');

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
          <WelcomeCard greetingTime={greetingTime} />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
