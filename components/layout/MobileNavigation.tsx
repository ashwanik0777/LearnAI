'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GraduationCap, Lightbulb, Activity, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/courses", label: "Courses", icon: GraduationCap },
    { href: "/recommendations", label: "Explore", icon: Lightbulb },
    { href: "/analytics", label: "Analytics", icon: Activity },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-10">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center",
                isActive ? "text-indigo-600 font-semibold" : "text-gray-500 hover:text-gray-800"
              )}
            >
              <item.icon className="text-lg h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MobileNavigation;
