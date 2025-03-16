
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

interface WelcomeCardProps {
  greetingTime: string;
}

const WelcomeCard = ({ greetingTime }: WelcomeCardProps) => {
  const { user } = useAuth();
  
  return (
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
  );
};

export default WelcomeCard;
