
import { useState } from 'react';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Calendar, 
  RefreshCw, 
  Trash2,
  Filter,
  Check
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Mock notification data
const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Earnings Report Available',
    message: 'Your earnings report for October 2023 is now available.',
    date: '2023-11-01T10:30:00',
    type: 'info',
    read: false
  },
  {
    id: 'n2',
    title: 'System Update',
    message: 'The Rider Earnings Management System will be upgraded on November 15th. Expect brief downtime.',
    date: '2023-11-05T09:15:00',
    type: 'warning',
    read: true
  },
  {
    id: 'n3',
    title: 'Missing Attendance',
    message: 'You were marked absent on October 28, 2023. Please contact your team lead if this is incorrect.',
    date: '2023-10-30T14:20:00',
    type: 'error',
    read: false
  },
  {
    id: 'n4',
    title: 'Payment Processed',
    message: 'Your earnings for September 2023 have been processed and will be deposited within 2 business days.',
    date: '2023-10-15T11:45:00',
    type: 'success',
    read: true
  },
  {
    id: 'n5',
    title: 'Welcome to the Platform',
    message: 'Welcome to the Rider Earnings Management System. Your account has been approved and activated.',
    date: '2023-10-01T08:00:00',
    type: 'info',
    read: true
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const { toast } = useToast();

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    
    toast({
      title: "Notification marked as read",
      description: "This notification has been marked as read.",
    });
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "All notifications read",
      description: "All notifications have been marked as read.",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
    
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(notification => !notification.read);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-500" />;
      case 'warning':
        return <AlertCircle size={20} className="text-amber-500" />;
      default:
        return <Info size={20} className="text-blue-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bell className="h-7 w-7" /> 
          Notifications
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none bg-destructive text-destructive-foreground rounded-full ml-2">
              {unreadCount}
            </span>
          )}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Stay updated with important system messages and alerts
        </p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Your Notifications</CardTitle>
              <CardDescription>
                Manage all your alerts and updates
              </CardDescription>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={markAllAsRead}
                variant="outline"
                className="flex items-center gap-1"
                disabled={unreadCount === 0}
                size="sm"
              >
                <Check size={14} />
                Mark all read
              </Button>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
                className="h-9 px-3 py-1 text-sm bg-transparent border border-input rounded-md"
              >
                <option value="all">All notifications</option>
                <option value="unread">Unread only</option>
              </select>
              <Button
                onClick={() => setNotifications(MOCK_NOTIFICATIONS)}
                variant="outline"
                className="flex items-center gap-1"
                aria-label="Refresh notifications"
                size="icon"
              >
                <RefreshCw size={14} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="bg-muted rounded-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background mb-4">
                  <Bell size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  {filter === 'all' 
                    ? "You don't have any notifications yet" 
                    : "You don't have any unread notifications"}
                </p>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden divide-y">
                {filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`bg-card p-4 transition-all hover:bg-muted/30 ${
                      !notification.read ? 'border-l-4 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h3 className={`font-medium ${!notification.read ? 'text-primary' : ''}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap">
                            <Calendar size={12} className="mr-1" />
                            {formatDate(notification.date)}
                          </div>
                        </div>
                        
                        <p className="text-sm mt-1">
                          {notification.message}
                        </p>
                        
                        <div className="flex justify-end mt-3 space-x-2">
                          {!notification.read && (
                            <Button
                              onClick={() => markAsRead(notification.id)}
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:bg-primary/10 hover:text-primary flex items-center h-8 px-2"
                            >
                              <CheckCircle size={14} className="mr-1" />
                              Mark as read
                            </Button>
                          )}
                          <Button
                            onClick={() => deleteNotification(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive flex items-center h-8 px-2"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
