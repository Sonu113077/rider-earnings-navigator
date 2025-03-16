
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Temporary auth check - replace with actual auth logic
    const isAuthenticated = false; // This should check actual auth state
    if (!isAuthenticated && location.pathname.includes('/dashboard')) {
      navigate('/login');
    }
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className="lg:pl-64 pt-16">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Your rider earnings management dashboard is being implemented. Check back soon!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
