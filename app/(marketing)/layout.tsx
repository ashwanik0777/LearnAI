'use client';

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Header */}
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-md">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">LearnAI</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
            <Link href="/courses" className="hover:text-indigo-600 transition-colors">Courses</Link>
            <Link href="/about-us" className="hover:text-indigo-600 transition-colors">About Us</Link>
            <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
            <Link href="/careers" className="hover:text-indigo-600 transition-colors">Careers</Link>
            <Link href="/help" className="hover:text-indigo-600 transition-colors">Help</Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
