'use client';

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Loader2, 
  GraduationCap, 
  User, 
  Lock, 
  ArrowRight,
  Flame,
  BookOpen,
  Trophy,
  Sparkles,
  Award,
  AlertCircle
} from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [error, setError] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError("");
    try {
      await login(data);
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 relative overflow-hidden">
      {/* 1. LEFT PANEL - CLEAN, HIGH-CONTRAST FORM WITH SOFT PASTEL CIRCLES */}
      <div className="w-full md:w-7/12 lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-8 lg:p-12 relative overflow-hidden bg-slate-50">
        {/* Single subtle soft background circle on Form canvas */}
        <div className="absolute -bottom-14 -left-14 w-64 h-64 rounded-full bg-blue-50/80 border border-blue-100 pointer-events-none" />

        {/* Small floating pastel cubes in empty spaces */}
        <div className="absolute top-16 left-10 w-9 h-9 rounded-xl bg-blue-100/70 border border-blue-200/80 rotate-12 pointer-events-none hidden sm:block" />
        <div className="absolute top-1/2 left-8 w-8 h-8 rounded-lg bg-indigo-50/80 border border-indigo-200/70 -rotate-6 pointer-events-none hidden sm:block" />
        <div className="absolute bottom-24 right-12 w-9 h-9 rounded-xl bg-amber-100/60 border border-amber-200/70 -rotate-12 pointer-events-none hidden sm:block" />

        {/* Mobile Header (visible only on small screens) */}
        <div className="md:hidden flex items-center justify-between pb-6 mb-2 border-b border-slate-200 relative z-10">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900">LearnAI</span>
          </Link>
          <Link 
            href="/register" 
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200/60"
          >
            Sign Up
          </Link>
        </div>

        {/* Center Form Card */}
        <div className="w-full max-w-md mx-auto my-auto py-6 sm:py-8 relative z-10 md:pr-4 lg:pr-8">
          <div className="mb-6 text-center sm:text-left">
            <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Sign In to LearnAI
            </h1>
          </div>

          <div className="bg-white/95 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        Username or Email
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. demo or student@learnai.com" 
                          className="h-11 bg-slate-50/80 hover:bg-white focus:bg-white border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 rounded-xl text-sm transition-all" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                          <Lock className="h-3.5 w-3.5 text-slate-400" />
                          Password
                        </FormLabel>
                        <Link 
                          href="/forgot-password" 
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          className="h-11 bg-slate-50/80 hover:bg-white focus:bg-white border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 rounded-xl text-sm transition-all" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-11 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div className="text-center mt-6">
            <p className="text-slate-600 text-xs sm:text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
                Create student account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Legal Links */}
        <div className="flex flex-wrap justify-center gap-5 text-xs text-slate-400 pt-4 relative z-10 md:pr-6">
          <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
          <Link href="/privacy-policy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
          <Link href="/help" className="hover:text-slate-600 transition-colors">Help Center</Link>
        </div>

        {/* Professional Curved Wave Separator (Desktop) */}
        <svg 
          className="hidden md:block absolute right-0 top-0 bottom-0 w-12 lg:w-20 h-full pointer-events-none z-20 text-slate-900" 
          viewBox="0 0 80 1000" 
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M80,0 Q10,250 40,500 T80,1000 L80,1000 L80,0 Z" />
          <path d="M80,0 Q10,250 40,500 T80,1000" fill="none" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 2. RIGHT PANEL - ELEGANT DEEP SLATE SHOWCASE WITH VISIBLE SOFT CIRCLES */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 min-h-screen bg-slate-900 flex-col justify-between p-8 lg:p-12 relative overflow-hidden text-white">
        {/* Single small elegant circle with soft blue tint (no clutter) */}
        <div className="absolute top-12 right-12 w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-blue-500/10 border border-blue-400/20 pointer-events-none" />

        {/* 4 Small Tasteful Floating 3D Cubes/Tiles in Empty Spaces */}
        {/* <div className="absolute top-28 right-8 w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/35 rotate-12 shadow-lg shadow-blue-900/30 pointer-events-none" /> */}
        <div className="absolute top-1/2 right-10 w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 -rotate-12 shadow-lg pointer-events-none" />
        <div className="absolute bottom-28 right-12 w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-300/30 rotate-6 shadow-lg pointer-events-none" />
        <div className="absolute bottom-36 left-12 w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 rotate-45 shadow-lg pointer-events-none" />

        <div className="absolute top-10 right-10 bg-slate-800/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3.5 py-2 shadow-xl flex items-center gap-2 pointer-events-none z-10">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span className="text-xs font-semibold text-slate-200">Adaptive AI Active</span>
        </div>

        {/* Brand header */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center space-x-3 group">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-sm text-white group-hover:bg-blue-500 transition-colors shrink-0">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white">LearnAI</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-400/30">
                  Student Edition
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Adaptive Academic Learning</span>
            </div>
          </Link>
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-lg my-auto py-8">
          {/* Social proof rating badge - embedded cleanly in content flow, never cut by lines */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-slate-200 mb-4 shadow-xs">
            <Award className="h-3.5 w-3.5 text-blue-400" />
            <span>4.9/5 Student Rating</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 font-normal">Over 10,000+ Enrolled</span>
          </div>

          <h2 className="font-serif-title text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            Welcome Back to Your Academic Flow
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Pick up right where you left off. Your flashcards, diagnostic checkpoints, and streak records are synced and ready.
          </p>

          {/* 3 Highlight Cards */}
          <div className="space-y-3.5">
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/35 flex items-center justify-center text-amber-400 shrink-0">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">Daily Streak Protection</h3>
                <p className="text-xs text-slate-400 mt-0.5">Solve a 5-minute diagnostic quiz today to maintain your weekly study multiplier.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-lg bg-blue-600/25 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">Adaptive Reviews Queued</h3>
                <p className="text-xs text-slate-400 mt-0.5">Your spaced repetition schedule has identified 3 topics ready for quick consolidation.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/35 flex items-center justify-center text-emerald-400 shrink-0">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">Earn Mastery XP & Badges</h3>
                <p className="text-xs text-slate-400 mt-0.5">Level up your academic profile and benchmark your retention against top peers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>&copy; {new Date().getFullYear()} LearnAI Platform</span>
          <Link href="/register" className="font-semibold text-slate-300 hover:text-white flex items-center gap-1 transition-colors">
            New Student? Register here <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
