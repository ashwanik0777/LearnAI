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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Loader2, 
  GraduationCap, 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  BarChart3, 
  Brain,
  UserPlus,
  Sparkles,
  Award,
  Check,
  AlertCircle
} from "lucide-react";

// Registration form schema with validation
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  academicLevel: z.enum([
    "elementary", 
    "middle_school", 
    "high_school", 
    "undergraduate", 
    "graduate", 
    "postgraduate"
  ], {
    required_error: "Please select your academic level",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const totalSteps = 2;
  
  // Initialize form with react-hook-form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
      academicLevel: undefined,
    },
    mode: "onChange"
  });
  
  // Dynamic real-time completion calculation based on valid filled fields
  const watchedValues = form.watch();

  const calculateProgress = () => {
    const isNameValid = (watchedValues.fullName || "").trim().length >= 2;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((watchedValues.email || "").trim());
    const isPasswordValid = (watchedValues.password || "").length >= 6;
    const isUsernameValid = (watchedValues.username || "").trim().length >= 3;
    const isAcademicLevelValid = Boolean(watchedValues.academicLevel);

    let step1ValidCount = 0;
    if (isNameValid) step1ValidCount++;
    if (isEmailValid) step1ValidCount++;
    if (isPasswordValid) step1ValidCount++;

    if (step === 1) {
      if (step1ValidCount === 0) return 0;
      if (step1ValidCount === 1) return 15;
      if (step1ValidCount === 2) return 35;
      return 50; // Step 1 completely filled!
    }

    // On Step 2 (Step 1 is verified and done = 50% base):
    let step2ValidCount = 0;
    if (isUsernameValid) step2ValidCount++;
    if (isAcademicLevelValid) step2ValidCount++;

    if (step2ValidCount === 0) return 50;
    if (step2ValidCount === 1) return 75;
    return 100; // All fields completed!
  };

  const progressPercentage = calculateProgress();

  // Form step validation helpers
  const validateStep1 = () => {
    const { fullName, email, password } = form.getValues();
    const isValid = 
      fullName.length >= 2 && 
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && 
      password.length >= 6;
    
    if (isValid) {
      setStep(2);
    } else {
      form.trigger(["fullName", "email", "password"]);
    }
  };

  // Form submission handler
  const onSubmit = async (data: RegisterFormValues) => {
    setError("");
    try {
      await register(data);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 relative overflow-hidden">
      {/* 1. LEFT PANEL - HIGH-CONTRAST STEPPED REGISTRATION FORM WITH SOFT PASTEL CIRCLES */}
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
            href="/login" 
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200/60"
          >
            Sign In
          </Link>
        </div>

        {/* Center Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-6 sm:py-8 relative z-10 md:pr-4 lg:pr-8">
          {/* Header */}
          <div className="mb-6 text-center sm:text-left">
            <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Create Student Account
            </h1>
          </div>

          {/* Dynamic Real-Time Stepper Progress */}
          <div className="mb-6 p-4 rounded-xl bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-semibold text-slate-700">
                Step {step} of {totalSteps}: {step === 1 ? 'Account Credentials' : 'Academic Profile'}
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md transition-all duration-300 ${
                progressPercentage === 100 
                  ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' 
                  : progressPercentage > 0 
                    ? 'text-blue-700 bg-blue-50 border border-blue-200/60' 
                    : 'text-slate-500 bg-slate-100 border border-slate-200'
              }`}>
                {progressPercentage === 100 ? '100% Ready' : `${progressPercentage}% Complete`}
              </span>
            </div>

            {/* Continuous Track Connected Between Nodes 1 & 2 */}
            <div className="relative px-1 py-1">
              {/* Background connecting track */}
              <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-1.5 bg-slate-100 rounded-full pointer-events-none" />
              
              {/* Dynamic filled progress bar */}
              <div 
                className="absolute left-3 top-1/2 -translate-y-1/2 h-1.5 bg-blue-600 rounded-full transition-all duration-300 ease-out pointer-events-none"
                style={{ width: `calc(${progressPercentage}% * 0.94)` }}
              />

              {/* Step Nodes Row */}
              <div className="relative flex items-center justify-between z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-200 ${
                  step > 1 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : progressPercentage >= 50 
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-xs' 
                      : 'bg-blue-600 text-white shadow-xs'
                }`}>
                  {step > 1 ? <Check className="h-3.5 w-3.5" /> : '1'}
                </div>

                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-200 ${
                  progressPercentage === 100 
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-xs' 
                    : step === 2 
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-xs' 
                      : 'bg-slate-200 text-slate-500'
                }`}>
                  {progressPercentage === 100 ? <Check className="h-3.5 w-3.5" /> : '2'}
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white/95 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                {step === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-slate-400" />
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. Alex Morgan" 
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5 text-slate-400" />
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="e.g. alex@university.edu" 
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
                          <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                            <Lock className="h-3.5 w-3.5 text-slate-400" />
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Minimum 6 characters" 
                              className="h-11 bg-slate-50/80 hover:bg-white focus:bg-white border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 rounded-xl text-sm transition-all" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="button" 
                      className="w-full h-11 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                      onClick={validateStep1}
                    >
                      Continue to Academic Profile
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                            Username
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. alex_student" 
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
                      name="academicLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                            <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                            Academic Level
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 bg-slate-50/80 hover:bg-white focus:bg-white border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 rounded-xl text-sm">
                                <SelectValue placeholder="Select your current education level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-slate-200 text-slate-800 shadow-lg">
                              <SelectItem value="elementary">Elementary School</SelectItem>
                              <SelectItem value="middle_school">Middle School</SelectItem>
                              <SelectItem value="high_school">High School</SelectItem>
                              <SelectItem value="undergraduate">University - Undergraduate</SelectItem>
                              <SelectItem value="graduate">University - Graduate</SelectItem>
                              <SelectItem value="postgraduate">Post-Graduation</SelectItem>
                            </SelectContent>
                          </Select>
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

                    <div className="flex flex-col space-y-2.5 pt-2">
                      <Button 
                        type="submit" 
                        className="w-full h-11 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4" />
                            Create Student Account
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full h-10 rounded-xl text-xs font-medium border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                        onClick={() => setStep(1)}
                      >
                        Back to Account Credentials
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </Form>
          </div>

          <div className="text-center mt-6">
            <p className="text-slate-600 text-xs sm:text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Legal Links */}
        <div className="flex flex-wrap justify-center gap-5 text-xs text-slate-400 pt-4 relative z-10 md:pr-6">
          <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms & Conditions</Link>
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
            Join 10,000+ Students Learning Smarter, Not Harder
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Access personalized diagnostic testing, cognitive fatigue pacing, and automated spaced repetition tailored to your syllabus.
          </p>

          {/* 3 Highlight Cards */}
          <div className="space-y-3.5">
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-lg bg-blue-600/25 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">AI-Powered Diagnostic Quizzes</h3>
                <p className="text-xs text-slate-400 mt-0.5">Identifies exact formula & concept gaps in minutes rather than failing exams later.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/35 flex items-center justify-center text-amber-400 shrink-0">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">Progress Analytics & Pacing</h3>
                <p className="text-xs text-slate-400 mt-0.5">Monitors mental fatigue and dynamically shifts workload to lighter flashcard reviews.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/35 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">Smart Spaced Recommendations</h3>
                <p className="text-xs text-slate-400 mt-0.5">Algorithmically schedules topics right at your forgetting threshold for 98% retention.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>&copy; {new Date().getFullYear()} LearnAI Platform</span>
          <Link href="/login" className="font-semibold text-slate-300 hover:text-white flex items-center gap-1 transition-colors">
            Already enrolled? Sign In <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
