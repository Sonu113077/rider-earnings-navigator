
import { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, Calendar, RefreshCw, Trash2 } from 'lucide-react';

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

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell className="h-7 w-7" /> 
            Notifications
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none bg-primary text-primary-foreground rounded-full ml-2">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Stay updated with important system messages and alerts
          </p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-muted rounded-md hover:bg-muted/80"
            disabled={unreadCount === 0}
          >
            <CheckCircle size={14} />
            Mark all read
          </button>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
            className="px-3 py-1.5 text-sm bg-transparent border border-input rounded-md"
          >
            <option value="all">All notifications</option>
            <option value="unread">Unread only</option>
          </select>
          <button
            onClick={() => setNotifications(MOCK_NOTIFICATIONS)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-muted rounded-md hover:bg-muted/80"
            aria-label="Refresh notifications"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>
      
      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="bg-card rounded-lg shadow p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
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
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`bg-card rounded-lg shadow overflow-hidden transition-all ${
                !notification.read ? 'border-l-4 border-primary' : ''
              }`}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
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
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-primary hover:underline flex items-center"
                        >
                          <CheckCircle size={12} className="mr-1" />
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-destructive hover:underline flex items-center"
                      >
                        <Trash2 size={12} className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
