
import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Settings, User, Truck, Bell, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Activity {
  id: string;
  type: 'user_update' | 'system_update' | 'payment_update' | 'rider_data' | 'safrate_update';
  title: string;
  description: string;
  timestamp: Date;
}

const TabbedActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [safrates, setSafrates] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading activities and safrates from an API
    setTimeout(() => {
      const allActivities = [
        {
          id: '1',
          type: 'user_update',
          title: 'Profile Updated',
          description: 'Admin updated your account information',
          timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
        },
        {
          id: '2',
          type: 'rider_data',
          title: 'Earnings Updated',
          description: 'Your earnings for October have been updated',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
        },
        {
          id: '3',
          type: 'system_update',
          title: 'System Maintenance',
          description: 'System was updated to improve performance',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
        },
        {
          id: '4',
          type: 'payment_update',
          title: 'Payment Processed',
          description: 'Your weekly payment has been processed',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
        },
        {
          id: '5',
          type: 'rider_data',
          title: 'New Routes Added',
          description: 'New delivery routes have been added to your profile',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72) // 3 days ago
        }
      ];
      
      const safrateActivities = [
        {
          id: 's1',
          type: 'safrate_update',
          title: 'Safrate Increased',
          description: 'Your safrate has been increased to $0.55/mile',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1) // 1 hour ago
        },
        {
          id: 's2',
          type: 'safrate_update',
          title: 'Safrate Review',
          description: 'Monthly safrate review completed',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
        },
        {
          id: 's3',
          type: 'safrate_update',
          title: 'Bonus Added',
          description: 'Holiday bonus of $200 added to your next payment',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) // 5 days ago
        },
      ];
      
      setActivities(allActivities);
      setSafrates(safrateActivities);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'user_update':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'system_update':
        return <Settings className="h-4 w-4 text-purple-500" />;
      case 'payment_update':
        return <CreditCard className="h-4 w-4 text-green-500" />;
      case 'rider_data':
        return <Truck className="h-4 w-4 text-orange-500" />;
      case 'safrate_update':
        return <Bell className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityBadge = (type: Activity['type']) => {
    switch (type) {
      case 'user_update':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Account</Badge>;
      case 'system_update':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">System</Badge>;
      case 'payment_update':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Payment</Badge>;
      case 'rider_data':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">Rider Data</Badge>;
      case 'safrate_update':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Safrate</Badge>;
      default:
        return <Badge variant="outline">Update</Badge>;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const renderActivityList = (activityList: Activity[]) => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center space-x-4 py-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-1 divide-y">
        {activityList.map((activity) => (
          <div key={activity.id} className="flex items-start py-3 group hover:bg-muted/30 rounded-md p-2 cursor-pointer transition-colors">
            <div className="mr-4 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{activity.title}</h4>
                <span className="text-xs text-muted-foreground">{formatTimestamp(activity.timestamp)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
              <div className="mt-2">
                {getActivityBadge(activity.type)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Activity Center</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Updates</TabsTrigger>
            <TabsTrigger value="safrate">Safrate</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {renderActivityList(activities)}
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">View All Activities</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="safrate">
            {renderActivityList(safrates)}
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">View All Safrate Updates</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TabbedActivity;
