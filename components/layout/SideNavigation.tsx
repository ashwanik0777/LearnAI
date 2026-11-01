'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  GraduationCap, 
  Lightbulb, 
  BarChart2, 
  Calendar, 
  BookOpen, 
  Trophy, 
  Settings, 
  HelpCircle,
  Activity,
  User,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";

export function SideNavigation() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const getLevelLabel = (level: string) => {
    switch(level) {
      case 'elementary': return 'Elementary School';
      case 'middle_school': return 'Middle School';
      case 'high_school': return 'High School';
      case 'undergraduate': return 'University - Undergraduate';
      case 'graduate': return 'University - Graduate';
      case 'postgraduate': return 'Post-Graduation';
      default: return level;
    }
  };
  
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/courses", label: "My Courses", icon: GraduationCap },
    { href: "/quizzes", label: "Quizzes", icon: BookOpen },
    { href: "/recommendations", label: "Recommendations", icon: Lightbulb },
    { href: "/progress", label: "Progress Analytics", icon: BarChart2 },
    { href: "/analytics", label: "Learning Analytics", icon: Activity },
    { href: "/planner", label: "Study Planner", icon: Calendar },
    { href: "/resources", label: "Resource Library", icon: BookOpen },
    { href: "/achievements", label: "Achievements", icon: Trophy },
  ];

  const bottomNavItems = [
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/help", label: "Help & Support", icon: HelpCircle },
  ];

  if (!user) return null;

  const isAdmin = user.role === 'admin' || user.role === 'subadmin';

  return (
    <aside className="hidden lg:block bg-white w-64 border-r border-gray-200 flex-shrink-0 overflow-y-auto">
      <div className="py-6 px-4">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Avatar className="w-12 h-12 shadow-sm">
              {user.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={user.fullName} />
              ) : (
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-800">{user.fullName}</h3>
              <p className="text-sm text-gray-500">{getLevelLabel(user.academicLevel)}</p>
            </div>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-3 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-indigo-700">Level {user.level}</h4>
              <span className="text-indigo-600 font-semibold">{user.totalPoints} pts</span>
            </div>
            <Progress value={Math.min(100, (user.xp % 100))} className="bg-white h-2" />
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {isAdmin && (
            <Link
              href="/admin"
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                pathname.startsWith("/admin")
                  ? "bg-amber-50 text-amber-800 font-semibold"
                  : "text-amber-700 hover:bg-amber-50"
              )}
            >
              <ShieldAlert className="w-5 h-5" />
              <span>Admin Panel</span>
            </Link>
          )}
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-200">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default SideNavigation;
