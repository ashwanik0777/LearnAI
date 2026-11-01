'use client';

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User,
  Settings,
  HelpCircle,
  Menu,
  Check,
  Trash2,
  Info,
  AlertTriangle,
  Trophy,
  Calendar,
  BellOff
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Notification {
  id: number;
  userId: number;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Fetch unread notification count
  const { 
    data: unreadCountData, 
    isLoading: isLoadingCount,
    isError: isErrorCount
  } = useQuery<{count: number}>({
    queryKey: ['/api/notifications/count'],
    enabled: !!user,
    refetchInterval: 60000, // Refetch every minute
  });
  
  // Fetch notifications when dropdown is opened
  const { 
    data: notifications = [] as Notification[], 
    isLoading: isLoadingNotifications,
    isError: isErrorNotifications,
    refetch: refetchNotifications
  } = useQuery<Notification[]>({
    queryKey: ['/api/notifications'],
    enabled: !!user && notificationsOpen,
  });
  
  // Mark notification as read
  const markAsReadMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest({ 
        method: 'POST', 
        path: '/api/notifications/mark-read', 
        body: { id } 
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notifications'] });
      queryClient.invalidateQueries({ queryKey: ['/api/notifications/count'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Could not mark notification as read",
        variant: "destructive"
      });
    }
  });
  
  // Mark all notifications as read
  const markAllAsReadMutation = useMutation({
    mutationFn: () => 
      apiRequest({ 
        method: 'POST', 
        path: '/api/notifications/mark-all-read' 
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notifications'] });
      queryClient.invalidateQueries({ queryKey: ['/api/notifications/count'] });
      toast({
        title: "Success",
        description: "All notifications marked as read",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Could not mark all notifications as read",
        variant: "destructive"
      });
    }
  });
  
  // Delete notification
  const deleteNotificationMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest({ 
        method: 'DELETE', 
        path: `/api/notifications/${id}` 
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notifications'] });
      queryClient.invalidateQueries({ queryKey: ['/api/notifications/count'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Could not delete notification",
        variant: "destructive"
      });
    }
  });
  
  // When dropdown is opened, refetch notifications
  useEffect(() => {
    if (notificationsOpen) {
      refetchNotifications();
    }
  }, [notificationsOpen, refetchNotifications]);
  
  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 'reminder':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'system':
      default:
        return <Info className="h-5 w-5 text-primary-500" />;
    }
  };
  
  const unreadCount = unreadCountData?.count || 0;
  
  return (
    <header className="bg-white shadow-sm py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-gray-500 hover:text-primary-600"
          onClick={onMobileMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <span className="text-primary-600 text-2xl font-bold">LearnAI</span>
          <span className="hidden sm:inline-block bg-primary-100 text-primary-600 text-xs px-2 py-1 rounded-full font-medium">BETA</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="relative hidden sm:block">
          <Input
            type="text"
            placeholder="Search resources..."
            className="pl-9 pr-3 py-2 bg-gray-100 w-48 lg:w-64 focus:bg-white transition duration-200"
          />
          <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
        </div>
        
        <div className="flex items-center space-x-4">
          {user && (
            <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-primary-600">
                  <Bell className="h-5 w-5" />
                  {isLoadingCount ? (
                    <span className="absolute -top-1 -right-1 w-4 h-4">
                      <Skeleton className="w-4 h-4 rounded-full" />
                    </span>
                  ) : (
                    unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between p-2">
                  <DropdownMenuLabel className="text-sm font-semibold">Notifications</DropdownMenuLabel>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => markAllAsReadMutation.mutate()}
                      disabled={markAllAsReadMutation.isPending}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Mark all as read
                    </Button>
                  )}
                </div>
                <DropdownMenuSeparator />
                
                {isLoadingNotifications ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="p-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-3/4 mb-2" />
                          <Skeleton className="h-3 w-full mb-1" />
                          <Skeleton className="h-3 w-2/3" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : isErrorNotifications ? (
                  <div className="p-4 text-center text-gray-500">
                    Error loading notifications
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                    <BellOff className="h-8 w-8 mb-2 text-gray-300" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notification: Notification) => (
                    <div key={notification.id} className={`p-3 border-b border-gray-100 last:border-0 ${!notification.read ? 'bg-blue-50' : ''}`}>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {notification.title}
                            {!notification.read && (
                              <Badge variant="default" className="ml-2 py-0 px-1.5 text-[10px]">New</Badge>
                            )}
                          </p>
                          <p className="text-gray-600 text-xs mt-0.5">{notification.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-gray-400 text-[11px]">
                              {new Date(notification.createdAt).toLocaleString()}
                            </p>
                            <div className="flex space-x-1">
                              {!notification.read && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6"
                                  onClick={() => markAsReadMutation.mutate(notification.id)}
                                  disabled={markAsReadMutation.isPending}
                                >
                                  <Check className="h-3 w-3 text-green-600" />
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6"
                                onClick={() => deleteNotificationMutation.mutate(notification.id)}
                                disabled={deleteNotificationMutation.isPending}
                              >
                                <Trash2 className="h-3 w-3 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 px-2">
                  <Avatar className="w-8 h-8">
                    {user.avatarUrl ? (
                      <AvatarImage src={user.avatarUrl} alt={user.fullName} />
                    ) : (
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="hidden md:block text-sm font-medium">{user.fullName.split(' ')[0]}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/settings">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/help">
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button>Log In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
