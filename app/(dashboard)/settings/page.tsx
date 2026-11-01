'use client';

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  Shield, 
  Monitor, 
  Moon, 
  Sun, 
  BookOpen, 
  Save,
  Check,
  Loader2
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    achievementAlerts: true,
    studyReminders: true,
    weeklyReports: true,
    recommendationAlerts: false
  });
  
  const [displaySettings, setDisplaySettings] = useState({
    theme: "system",
    fontSize: "medium",
    highContrast: false,
    reduceMotion: false
  });
  
  const [studySettings, setStudySettings] = useState({
    preferredStudyTime: "morning",
    sessionLength: "25",
    breakLength: "5",
    autoPlay: true
  });
  
  const saveSettings = (settingType: string) => {
    toast({
      title: "Settings saved",
      description: `Your ${settingType} settings have been updated successfully.`,
    });
  };

  if (authLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="mt-1 text-sm text-gray-600">Manage display aesthetics, notifications, and security settings</p>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="mb-6 w-full sm:w-auto">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="study">Study Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center font-semibold text-gray-900">
                <Bell className="mr-2 h-4 w-4 text-indigo-600" />
                Notification Preferences
              </CardTitle>
              <CardDescription className="text-xs">
                Control notification delivery channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications" className="text-sm font-medium">Email Notifications</Label>
                  <p className="text-xs text-gray-500">Receive important updates and announcements via email</p>
                </div>
                <Switch 
                  id="email-notifications" 
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({
                    ...notificationSettings,
                    emailNotifications: checked
                  })}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="achievement-alerts" className="text-sm font-medium">Achievement Alerts</Label>
                  <p className="text-xs text-gray-500">Get notified immediately upon unlocking badges</p>
                </div>
                <Switch 
                  id="achievement-alerts" 
                  checked={notificationSettings.achievementAlerts}
                  onCheckedChange={(checked) => setNotificationSettings({
                    ...notificationSettings,
                    achievementAlerts: checked
                  })}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="study-reminders" className="text-sm font-medium">Study Reminders</Label>
                  <p className="text-xs text-gray-500">Receive reminders for scheduled study blocks</p>
                </div>
                <Switch 
                  id="study-reminders" 
                  checked={notificationSettings.studyReminders}
                  onCheckedChange={(checked) => setNotificationSettings({
                    ...notificationSettings,
                    studyReminders: checked
                  })}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weekly-reports" className="text-sm font-medium">Weekly Progress Reports</Label>
                  <p className="text-xs text-gray-500">Receive weekly summaries of learning milestones</p>
                </div>
                <Switch 
                  id="weekly-reports" 
                  checked={notificationSettings.weeklyReports}
                  onCheckedChange={(checked) => setNotificationSettings({
                    ...notificationSettings,
                    weeklyReports: checked
                  })}
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button size="sm" onClick={() => saveSettings('notification')}>
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Display Settings */}
        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center font-semibold text-gray-900">
                <Monitor className="mr-2 h-4 w-4 text-indigo-600" />
                Display Settings
              </CardTitle>
              <CardDescription className="text-xs">
                Customize user interface styling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme" className="text-xs font-semibold">Theme</Label>
                <RadioGroup
                  id="theme"
                  value={displaySettings.theme}
                  onValueChange={(value) => setDisplaySettings({
                    ...displaySettings,
                    theme: value
                  })}
                  className="flex gap-6 pt-1 text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light" className="flex items-center cursor-pointer">
                      <Sun className="mr-1.5 h-4 w-4" /> Light
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark" className="flex items-center cursor-pointer">
                      <Moon className="mr-1.5 h-4 w-4" /> Dark
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system" className="flex items-center cursor-pointer">
                      <Monitor className="mr-1.5 h-4 w-4" /> System
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="font-size" className="text-xs font-semibold">Font Size</Label>
                <Select
                  value={displaySettings.fontSize}
                  onValueChange={(value) => setDisplaySettings({
                    ...displaySettings,
                    fontSize: value
                  })}
                >
                  <SelectTrigger id="font-size" className="w-full sm:w-[240px]">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Compact</SelectItem>
                    <SelectItem value="medium">Default (Medium)</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduce-motion" className="text-sm font-medium">Reduce Motion</Label>
                  <p className="text-xs text-gray-500">Minimize animations throughout navigation</p>
                </div>
                <Switch 
                  id="reduce-motion" 
                  checked={displaySettings.reduceMotion}
                  onCheckedChange={(checked) => setDisplaySettings({
                    ...displaySettings,
                    reduceMotion: checked
                  })}
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button size="sm" onClick={() => saveSettings('display')}>
                <Save className="mr-2 h-4 w-4" />
                Save Display Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Study Preferences */}
        <TabsContent value="study">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center font-semibold text-gray-900">
                <BookOpen className="mr-2 h-4 w-4 text-indigo-600" />
                Study Preferences
              </CardTitle>
              <CardDescription className="text-xs">
                Tune default learning interval timers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-length" className="text-xs font-semibold">Pomodoro Session (Minutes)</Label>
                  <Select
                    value={studySettings.sessionLength}
                    onValueChange={(value) => setStudySettings({
                      ...studySettings,
                      sessionLength: value
                    })}
                  >
                    <SelectTrigger id="session-length">
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="25">25 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="break-length" className="text-xs font-semibold">Break Length (Minutes)</Label>
                  <Select
                    value={studySettings.breakLength}
                    onValueChange={(value) => setStudySettings({
                      ...studySettings,
                      breakLength: value
                    })}
                  >
                    <SelectTrigger id="break-length">
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-play" className="text-sm font-medium">Auto-Advance Lessons</Label>
                  <p className="text-xs text-gray-500">Automatically progress to next module upon lesson completion</p>
                </div>
                <Switch 
                  id="auto-play" 
                  checked={studySettings.autoPlay}
                  onCheckedChange={(checked) => setStudySettings({
                    ...studySettings,
                    autoPlay: checked
                  })}
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button size="sm" onClick={() => saveSettings('study')}>
                <Save className="mr-2 h-4 w-4" />
                Save Study Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center font-semibold text-gray-900">
                <Shield className="mr-2 h-4 w-4 text-indigo-600" />
                Security Credentials
              </CardTitle>
              <CardDescription className="text-xs">
                Update account password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-xs">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-xs">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-xs">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button size="sm" onClick={() => saveSettings('security')}>
                <Check className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
