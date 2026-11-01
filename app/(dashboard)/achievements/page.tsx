'use client';

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { 
  Trophy, 
  Award, 
  Medal, 
  Star, 
  Zap,
  Target, 
  BookOpen, 
  Clock,
  Calendar,
  BarChart2,
  Share2,
  LucideIcon,
  Crown,
  Sparkles,
  FlameKindling,
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
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function AchievementsPage() {
  const { user, loading: authLoading } = useAuth();
  
  const { data: dashboardData, isLoading, error } = useQuery<any>({
    queryKey: ["/api/dashboard"],
    enabled: !!user,
  });

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-3" />
          <p className="text-sm font-medium text-gray-500">Loading student achievements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-red-100 max-w-md">
          <h1 className="text-lg font-semibold text-red-600 mb-2">Error loading achievements</h1>
          <p className="text-sm text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  const achievements = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first lesson",
      icon: BookOpen,
      category: "learning",
      progress: 100,
      isCompleted: true,
      completedDate: "2024-02-15",
      points: 10,
      tier: "bronze",
      badgeColor: "#CD7F32",
      xpReward: 20,
      requiredLevel: 1
    },
    {
      id: 2,
      name: "Knowledge Seeker",
      description: "Complete 10 different lessons",
      icon: Award,
      category: "learning",
      progress: 80,
      isCompleted: false,
      completedDate: null,
      points: 50,
      tier: "silver",
      badgeColor: "#94a3b8",
      xpReward: 100,
      requiredLevel: 2
    },
    {
      id: 3,
      name: "Perfect Score",
      description: "Get 100% on a quiz",
      icon: Star,
      category: "assessment",
      progress: 100,
      isCompleted: true,
      completedDate: "2024-03-20",
      points: 25,
      tier: "bronze",
      badgeColor: "#CD7F32",
      xpReward: 50,
      requiredLevel: 1
    },
    {
      id: 4,
      name: "Study Streak",
      description: "Study for 7 days in a row",
      icon: Zap,
      category: "consistency",
      progress: 100,
      isCompleted: true,
      completedDate: "2024-04-10",
      points: 100,
      tier: "silver",
      badgeColor: "#94a3b8",
      xpReward: 200,
      requiredLevel: 2
    },
    {
      id: 5,
      name: "Goal Achiever",
      description: "Complete all your weekly goals for a month",
      icon: Target,
      category: "goals",
      progress: 50,
      isCompleted: false,
      completedDate: null,
      points: 200,
      tier: "gold",
      badgeColor: "#f59e0b",
      xpReward: 400,
      requiredLevel: 5
    },
    {
      id: 6,
      name: "Speed Learner",
      description: "Complete a course 30% faster than average",
      icon: Clock,
      category: "efficiency",
      progress: 75,
      isCompleted: false,
      completedDate: null,
      points: 150,
      tier: "silver",
      badgeColor: "#94a3b8",
      xpReward: 300,
      requiredLevel: 3
    },
    {
      id: 7,
      name: "Subject Master",
      description: "Reach 90% proficiency in a subject",
      icon: Medal,
      category: "mastery",
      progress: 60,
      isCompleted: false,
      completedDate: null,
      points: 300,
      tier: "platinum",
      badgeColor: "#64748b",
      xpReward: 600,
      requiredLevel: 8
    },
    {
      id: 8,
      name: "Academic Quarter",
      description: "Complete 3 months of consistent studying",
      icon: Calendar,
      category: "consistency",
      progress: 33,
      isCompleted: false,
      completedDate: null,
      points: 250,
      tier: "gold",
      badgeColor: "#f59e0b",
      xpReward: 500,
      requiredLevel: 5
    },
    {
      id: 9,
      name: "Data Driven",
      description: "Review your analytics for 4 consecutive weeks",
      icon: BarChart2,
      category: "engagement",
      progress: 100,
      isCompleted: true,
      completedDate: "2024-05-05",
      points: 75,
      tier: "bronze",
      badgeColor: "#CD7F32",
      xpReward: 150,
      requiredLevel: 1
    },
    {
      id: 10,
      name: "Master Scholar",
      description: "Complete all achievements in the learning category",
      icon: Crown,
      category: "mastery",
      progress: 25,
      isCompleted: false,
      completedDate: null,
      points: 500,
      tier: "diamond",
      badgeColor: "#06b6d4",
      xpReward: 1000,
      requiredLevel: 10
    }
  ];

  const userData = {
    level: 5,
    xp: 430,
    totalPoints: 750,
    streak: 12,
    nextLevelXp: 500,
    xpProgress: 86,
  };
  
  const totalAchievements = achievements.length;
  const completedAchievements = achievements.filter((a) => a.isCompleted).length;
  const completionPercentage = Math.round((completedAchievements / totalAchievements) * 100);
  const totalPoints = achievements.reduce((sum, a) => a.isCompleted ? sum + a.points : sum, 0);

  const categorizedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, typeof achievements>);
  
  const getUserTier = (level: number) => {
    if (level < 5) return { name: 'Bronze', color: '#CD7F32' };
    if (level < 10) return { name: 'Silver', color: '#94a3b8' };
    if (level < 20) return { name: 'Gold', color: '#f59e0b' };
    if (level < 30) return { name: 'Platinum', color: '#64748b' };
    return { name: 'Diamond', color: '#06b6d4' };
  };
  
  const userTier = getUserTier(userData.level);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
            <p className="mt-1 text-sm text-gray-600">Track your milestones, badges, and rewards</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share Achievements
            </Button>
          </div>
        </div>
      </div>
      
      {/* User Profile & Level Card */}
      <Card>
        <div className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 relative">
            <div 
              className="w-20 h-20 rounded-full bg-indigo-600 overflow-hidden flex items-center justify-center border-4" 
              style={{ borderColor: userTier.color }}
            >
              <span className="text-white text-3xl font-bold">
                {user?.fullName?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full border-2 border-indigo-600">
              <div className="bg-indigo-600 rounded-full text-white flex items-center justify-center w-6 h-6">
                <span className="font-bold text-xs">{userData.level}</span>
              </div>
            </div>
          </div>
          
          <div className="flex-grow w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user?.fullName || 'Student'}</h2>
                <div className="flex items-center mt-1">
                  <Badge
                    className="mr-2 text-white"
                    style={{ backgroundColor: userTier.color }}
                  >
                    {userTier.name} Tier
                  </Badge>
                  <div className="flex items-center text-xs text-gray-600">
                    <FlameKindling className="w-3.5 h-3.5 mr-1 text-orange-500" />
                    <span>{userData.streak} day streak</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1 text-amber-500" />
                  <span className="font-semibold text-gray-800">{userData.totalPoints} points</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-1 text-indigo-500" />
                  <span className="font-semibold text-gray-800">{userData.xp} XP</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs font-medium">
                <span className="text-gray-600">Progress to Level {userData.level + 1}</span>
                <span className="text-gray-900">{userData.xp}/{userData.nextLevelXp} XP</span>
              </div>
              <Progress 
                value={userData.xpProgress} 
                className="h-2"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Achievements Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {completedAchievements} / {totalAchievements}
            </div>
            <Progress value={completionPercentage} className="h-2 mt-2" />
            <p className="text-xs text-gray-500 mt-2">
              {completionPercentage}% of total milestones unlocked
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Points Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {totalPoints}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {achievements.reduce((sum, a) => sum + a.points, 0) - totalPoints} points remaining
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Next Target Milestone</CardTitle>
          </CardHeader>
          <CardContent>
            {achievements.find((a) => !a.isCompleted && a.progress > 0) ? (
              <div>
                <div className="flex items-center">
                  <div className="mr-2 p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                    <Trophy className="h-4 w-4" />
                  </div>
                  <div className="font-semibold text-sm text-gray-800">
                    {achievements.find((a) => !a.isCompleted && a.progress > 0)?.name}
                  </div>
                </div>
                <Progress 
                  value={achievements.find((a) => !a.isCompleted && a.progress > 0)?.progress || 0} 
                  className="h-2 mt-2" 
                />
              </div>
            ) : (
              <div className="text-xs text-gray-500">All current milestones completed!</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Achievement Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 w-full sm:w-auto">
          <TabsTrigger value="all">All Achievements</TabsTrigger>
          {Object.keys(categorizedAchievements).map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>
        
        {Object.entries(categorizedAchievements).map(([category, categoryAchievements]) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface AchievementCardProps {
  achievement: {
    id: number;
    name: string;
    description: string;
    icon: LucideIcon;
    category: string;
    progress: number;
    isCompleted: boolean;
    completedDate: string | null;
    points: number;
    tier?: string;
    badgeColor?: string;
    xpReward?: number;
    requiredLevel?: number;
  };
}

function AchievementCard({ achievement }: AchievementCardProps) {
  const Icon = achievement.icon;
  const tier = achievement.tier || 'bronze';
  const badgeColor = achievement.badgeColor || '#CD7F32';
  const xpReward = achievement.xpReward || achievement.points * 2;
  const requiredLevel = achievement.requiredLevel || 1;
  
  const getTierIcon = (tierStr: string) => {
    switch(tierStr.toLowerCase()) {
      case 'bronze': return <Medal className="h-4 w-4" style={{ color: badgeColor }} />;
      case 'silver': return <Award className="h-4 w-4" style={{ color: badgeColor }} />;
      case 'gold': return <Trophy className="h-4 w-4" style={{ color: badgeColor }} />;
      case 'platinum': return <Crown className="h-4 w-4" style={{ color: badgeColor }} />;
      case 'diamond': return <Sparkles className="h-4 w-4" style={{ color: badgeColor }} />;
      default: return <Medal className="h-4 w-4" style={{ color: badgeColor }} />;
    }
  };
  
  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col ${
      achievement.isCompleted ? 'border-indigo-200 bg-indigo-50/20' : 'border-gray-200/80'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div 
            className="p-3 rounded-xl shadow-sm"
            style={{ 
              backgroundColor: achievement.isCompleted ? `${badgeColor}25` : '#f3f4f6',
              color: achievement.isCompleted ? badgeColor : '#6b7280'
            }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={achievement.isCompleted ? "default" : "outline"} 
              className="capitalize text-xs text-white"
              style={achievement.isCompleted ? { backgroundColor: badgeColor } : {}}
            >
              {tier}
            </Badge>
            <Badge variant="outline" className="capitalize text-xs">
              {achievement.category}
            </Badge>
          </div>
        </div>
        <CardTitle className="mt-3 text-base text-gray-900">{achievement.name}</CardTitle>
        <CardDescription className="text-xs mt-1">
          {achievement.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3 flex-1">
        <div className="flex items-center justify-between mb-1.5 text-xs">
          <span className="text-gray-500">Progress</span>
          <span className="font-semibold text-gray-900">{achievement.progress}%</span>
        </div>
        <Progress 
          value={achievement.progress} 
          className="h-2" 
        />
        
        {requiredLevel > 1 && (
          <div className="mt-2 text-[11px] text-gray-500 flex items-center">
            <FlameKindling className="h-3 w-3 mr-1 text-orange-500" />
            Requires Level {requiredLevel}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-3 pb-3 border-t text-xs bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center font-medium">
            {getTierIcon(tier)}
            <span className="ml-1 text-gray-700">{achievement.points} pts</span>
          </div>
          <div className="flex items-center font-medium text-indigo-600">
            <Zap className="h-3.5 w-3.5 mr-0.5" />
            <span>{xpReward} XP</span>
          </div>
        </div>
        {achievement.isCompleted && achievement.completedDate ? (
          <div className="text-[11px] text-green-700 font-medium">
            Earned
          </div>
        ) : (
          <div className="text-[11px] text-gray-400">In progress</div>
        )}
      </CardFooter>
    </Card>
  );
}
