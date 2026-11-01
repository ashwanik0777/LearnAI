'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Video, FileText } from "lucide-react";
import { Activity } from "@/lib/db/schema";
import { formatDistanceToNow } from "date-fns";

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  // Helper function to get icon based on activity type
  const getIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return Book;
      case 'video':
        return Video;
      case 'assignment':
        return FileText;
      default:
        return Book;
    }
  };
  
  // Helper function to get icon background color
  const getIconBgColor = (type: string) => {
    switch (type) {
      case 'quiz':
        return 'bg-blue-100';
      case 'video':
        return 'bg-green-100';
      case 'assignment':
        return 'bg-purple-100';
      default:
        return 'bg-gray-100';
    }
  };
  
  // Helper function to get icon color
  const getIconColor = (type: string) => {
    switch (type) {
      case 'quiz':
        return 'text-blue-600';
      case 'video':
        return 'text-green-600';
      case 'assignment':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };
  
  // Helper function to get activity title based on type
  const getActivityTitle = (type: string) => {
    switch (type) {
      case 'quiz':
        return 'Completed chapter quiz';
      case 'video':
        return 'Watched lecture';
      case 'assignment':
        return 'Submitted assignment';
      default:
        return 'Completed activity';
    }
  };
  
  // Helper function to format activity details
  const getActivityDetails = (activity: Activity) => {
    switch (activity.type) {
      case 'quiz':
        return `Score: ${activity.score}%`;
      case 'video':
        return `Progress: 100%`;
      case 'assignment':
        return `Status: Pending review`;
      default:
        return '';
    }
  };
  
  // Helper function to format time ago
  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <Card className="border-gray-100">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
          <Button variant="link" className="text-primary-600 p-0 h-auto">View All</Button>
        </div>
        
        <div className="space-y-4">
          {activities?.map((activity, index) => {
            const Icon = getIcon(activity.type);
            const isLast = index === activities.length - 1;
            
            return (
              <div 
                key={activity.id} 
                className={`flex items-start ${!isLast ? 'pb-3 border-b border-gray-100' : ''}`}
              >
                <div className={`p-2 rounded-lg mr-3 ${getIconBgColor(activity.type)}`}>
                  <Icon className={`h-4 w-4 ${getIconColor(activity.type)}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{getActivityTitle(activity.type)}</h4>
                  <p className="text-sm text-gray-500">{activity.title}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-400">{getActivityDetails(activity)}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{activity.completedAt ? getTimeAgo(activity.completedAt) : 'No date'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentActivity;
