
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, User, Bell, Lock, Moon, Sun, Monitor } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const DashboardSettingsPage = () => {
  const { toast } = useToast();
  const [theme, setTheme] = React.useState('system');

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-7 w-7" /> 
          Settings
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Account Settings
            </CardTitle>
            <CardDescription>
              Manage your account information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Email Notifications</label>
                <div className="flex items-center mt-2">
                  <input type="checkbox" id="emailNotifs" className="mr-2" defaultChecked />
                  <label htmlFor="emailNotifs" className="text-sm">
                    Receive email notifications for important updates
                  </label>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">App Notifications</label>
                <div className="flex items-center mt-2">
                  <input type="checkbox" id="appNotifs" className="mr-2" defaultChecked />
                  <label htmlFor="appNotifs" className="text-sm">
                    Receive in-app notifications
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Control what notifications you receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Earnings Updates</label>
                <div className="flex items-center mt-2">
                  <input type="checkbox" id="earningsNotifs" className="mr-2" defaultChecked />
                  <label htmlFor="earningsNotifs" className="text-sm">
                    New earnings reports and updates
                  </label>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">System Alerts</label>
                <div className="flex items-center mt-2">
                  <input type="checkbox" id="systemAlerts" className="mr-2" defaultChecked />
                  <label htmlFor="systemAlerts" className="text-sm">
                    Important system alerts and updates
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Manage your account security options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">Change Password</Button>
            <Button variant="outline" className="w-full">Enable Two-Factor Authentication</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              Display Settings
            </CardTitle>
            <CardDescription>
              Customize your display preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={theme === 'light' ? "default" : "outline"}
                className="flex flex-col items-center gap-2 h-auto py-4" 
                onClick={() => setTheme('light')}
              >
                <Sun size={20} />
                <span className="text-xs">Light</span>
              </Button>
              <Button
                variant={theme === 'dark' ? "default" : "outline"}
                className="flex flex-col items-center gap-2 h-auto py-4"
                onClick={() => setTheme('dark')}
              >
                <Moon size={20} />
                <span className="text-xs">Dark</span>
              </Button>
              <Button
                variant={theme === 'system' ? "default" : "outline"}
                className="flex flex-col items-center gap-2 h-auto py-4"
                onClick={() => setTheme('system')}
              >
                <Monitor size={20} />
                <span className="text-xs">System</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  );
};

export default DashboardSettingsPage;
