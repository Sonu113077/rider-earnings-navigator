
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Sun, Moon, Laptop, Lock, Smartphone, Eye, EyeOff, Info } from "lucide-react";

const DashboardSettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Security settings
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Display settings
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [compactView, setCompactView] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [earningSummaries, setEarningSummaries] = useState(true);
  const [routeUpdates, setRouteUpdates] = useState(true);
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would call an API to change the password
    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed.",
    });
    
    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    
    toast({
      title: twoFactorEnabled ? "Two-Factor Authentication Disabled" : "Two-Factor Authentication Enabled",
      description: twoFactorEnabled 
        ? "Your account is now less secure. We recommend keeping two-factor authentication enabled."
        : "Your account is now more secure with two-factor authentication.",
    });
  };
  
  const handleThemeChange = (value: "light" | "dark" | "system") => {
    setTheme(value);
    
    // In a real app, this would apply the theme to the entire application
    // For this example, we'll just show a toast notification
    toast({
      title: "Theme Updated",
      description: `Theme changed to ${value} mode.`,
    });
    
    // Apply theme to document
    if (value === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else if (value === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      // System theme would check system preferences
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      
      <Tabs defaultValue="security" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        {/* Security Settings */}
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" /> Change Password
              </CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit">Update Password</Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" /> Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Secure your account with a verification code sent to your phone
                  </p>
                </div>
                <Switch
                  id="two-factor"
                  checked={twoFactorEnabled}
                  onCheckedChange={handleToggleTwoFactor}
                />
              </div>
              
              {twoFactorEnabled && (
                <div className="rounded-md bg-muted p-4 text-sm flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication is enabled</p>
                    <p className="text-muted-foreground mt-1">
                      You'll be asked for a verification code when signing in on a new device.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Display Settings */}
        <TabsContent value="display" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>
                Customize how the dashboard looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className="flex flex-col items-center justify-center gap-1 h-auto py-4"
                    onClick={() => handleThemeChange("light")}
                  >
                    <Sun className="h-5 w-5" />
                    <span>Light</span>
                  </Button>
                  
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className="flex flex-col items-center justify-center gap-1 h-auto py-4"
                    onClick={() => handleThemeChange("dark")}
                  >
                    <Moon className="h-5 w-5" />
                    <span>Dark</span>
                  </Button>
                  
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className="flex flex-col items-center justify-center gap-1 h-auto py-4"
                    onClick={() => handleThemeChange("system")}
                  >
                    <Laptop className="h-5 w-5" />
                    <span>System</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compact-view">Compact View</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce spacing and show more content on screen
                    </p>
                  </div>
                  <Switch
                    id="compact-view"
                    checked={compactView}
                    onCheckedChange={(checked) => {
                      setCompactView(checked);
                      toast({
                        title: checked ? "Compact View Enabled" : "Compact View Disabled",
                        description: checked 
                          ? "Dashboard now shows more content with less spacing."
                          : "Dashboard now shows content with standard spacing.",
                      });
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="high-contrast">High Contrast Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase contrast for better visibility
                    </p>
                  </div>
                  <Switch
                    id="high-contrast"
                    checked={highContrastMode}
                    onCheckedChange={(checked) => {
                      setHighContrastMode(checked);
                      toast({
                        title: checked ? "High Contrast Mode Enabled" : "High Contrast Mode Disabled",
                        description: checked 
                          ? "Dashboard now uses higher contrast for better visibility."
                          : "Dashboard now uses standard contrast.",
                      });
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <Switch
                      id="push-notifications"
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="earning-summaries">Earning Summaries</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly summaries of your earnings
                      </p>
                    </div>
                    <Switch
                      id="earning-summaries"
                      checked={earningSummaries}
                      onCheckedChange={setEarningSummaries}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="route-updates">Route Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when your routes change
                      </p>
                    </div>
                    <Switch
                      id="route-updates"
                      checked={routeUpdates}
                      onCheckedChange={setRouteUpdates}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => {
                toast({
                  title: "Notification Settings Saved",
                  description: "Your notification preferences have been updated.",
                });
              }}>
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSettingsPage;
