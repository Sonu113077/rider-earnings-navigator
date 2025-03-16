
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, User, Bell, Lock, Moon, Sun, Monitor } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const DashboardSettingsPage = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [twoFactorOpen, setTwoFactorOpen] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorVerifying, setTwoFactorVerifying] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [appNotifs, setAppNotifs] = useState(true);
  const [earningsNotifs, setEarningsNotifs] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handlePasswordChange = (values) => {
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully.",
    });
    setPasswordOpen(false);
    passwordForm.reset();
  };
  
  const handleTwoFactorSetup = () => {
    setTwoFactorVerifying(true);
  };
  
  const handleTwoFactorVerify = () => {
    if (verificationCode === '123456') {
      setTwoFactorEnabled(true);
      setTwoFactorVerifying(false);
      setTwoFactorOpen(false);
      toast({
        title: "Two-factor authentication enabled",
        description: "Your account is now more secure.",
      });
    } else {
      toast({
        title: "Invalid code",
        description: "The verification code you entered is incorrect.",
        variant: "destructive",
      });
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme change
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    toast({
      title: "Theme updated",
      description: `Theme changed to ${newTheme}.`,
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
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifs">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for important updates
                  </p>
                </div>
                <Switch 
                  id="emailNotifs" 
                  checked={emailNotifs} 
                  onCheckedChange={setEmailNotifs} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="appNotifs">App Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive in-app notifications
                  </p>
                </div>
                <Switch 
                  id="appNotifs" 
                  checked={appNotifs} 
                  onCheckedChange={setAppNotifs} 
                />
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
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="earningsNotifs">Earnings Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about new earnings reports
                  </p>
                </div>
                <Switch 
                  id="earningsNotifs" 
                  checked={earningsNotifs} 
                  onCheckedChange={setEarningsNotifs} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="systemAlerts">System Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important system alerts and updates
                  </p>
                </div>
                <Switch 
                  id="systemAlerts" 
                  checked={systemAlerts} 
                  onCheckedChange={setSystemAlerts} 
                />
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
            <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Change Password</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>
                    Update your password to a new secure one.
                  </DialogDescription>
                </DialogHeader>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit">Update Password</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            
            <Dialog open={twoFactorOpen} onOpenChange={setTwoFactorOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  {twoFactorEnabled ? 'Manage Two-Factor Authentication' : 'Enable Two-Factor Authentication'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Two-Factor Authentication</DialogTitle>
                  <DialogDescription>
                    {twoFactorEnabled 
                      ? 'Manage your two-factor authentication settings.'
                      : 'Add an extra layer of security to your account.'}
                  </DialogDescription>
                </DialogHeader>
                
                {twoFactorEnabled ? (
                  <div className="space-y-4">
                    <div className="rounded-lg bg-muted p-4">
                      <div className="font-medium">Two-factor authentication is enabled</div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your account is protected with an additional layer of security.
                      </p>
                    </div>
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        setTwoFactorEnabled(false);
                        setTwoFactorOpen(false);
                        toast({
                          title: "Two-factor authentication disabled",
                          description: "Your account security settings have been updated.",
                        });
                      }}
                    >
                      Disable Two-Factor Authentication
                    </Button>
                  </div>
                ) : twoFactorVerifying ? (
                  <div className="space-y-4">
                    <p className="text-sm">
                      Enter the 6-digit verification code from your authenticator app.
                      For demo purposes, the code is 123456.
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="verificationCode">Verification Code</Label>
                      <Input 
                        id="verificationCode" 
                        value={verificationCode} 
                        onChange={(e) => setVerificationCode(e.target.value)} 
                        maxLength={6}
                        className="text-center text-xl tracking-widest"
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={handleTwoFactorVerify}>Verify</Button>
                    </DialogFooter>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4 flex items-center justify-center">
                      <div className="w-48 h-48 bg-white p-2 rounded-md flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-black font-bold">QR Code</p>
                          <p className="text-black text-xs mt-1">(For demo purposes)</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Scan this QR code with your authenticator app or enter the setup key manually.
                    </p>
                    <div className="bg-muted p-2 rounded-md text-center">
                      <code className="text-sm">ABCD-EFGH-IJKL-MNOP</code>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleTwoFactorSetup}>Continue</Button>
                    </DialogFooter>
                  </div>
                )}
              </DialogContent>
            </Dialog>
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
                onClick={() => handleThemeChange('light')}
              >
                <Sun size={20} />
                <span className="text-xs">Light</span>
              </Button>
              <Button
                variant={theme === 'dark' ? "default" : "outline"}
                className="flex flex-col items-center gap-2 h-auto py-4"
                onClick={() => handleThemeChange('dark')}
              >
                <Moon size={20} />
                <span className="text-xs">Dark</span>
              </Button>
              <Button
                variant={theme === 'system' ? "default" : "outline"}
                className="flex flex-col items-center gap-2 h-auto py-4"
                onClick={() => handleThemeChange('system')}
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
