'use client';

import React, { useState } from "react";
import Link from "next/link";
import { 
  GraduationCap, Brain, BarChart3, BookOpen, 
  ArrowRight, CheckCircle2, Trophy, Smile, Star, Zap, 
  Clock, Flame, ShieldCheck, ChevronRight, 
  Users, Check, Award, Calendar, 
  TrendingUp, Lightbulb, Calculator, Code2, 
  FlaskConical, Quote, Sparkles, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { StudentChatbot } from "@/components/chat/StudentChatbot";

export default function Home() {
  // Mobile responsive nav toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive preview state for Hero mockup
  const [activeTab, setActiveTab] = useState<"quiz" | "planner" | "mood" | "progress">("quiz");

  // Interactive sample selector for "Try the AI" section
  const [selectedDemoSubject, setSelectedDemoSubject] = useState<"math" | "physics" | "cs" | "chemistry">("math");

  const demoQuestions = {
    math: {
      topic: "Calculus & Derivatives",
      question: "What is the critical point of f(x) = 2x³ - 9x² + 12x + 5?",
      hint: "Set f'(x) = 0: 6x² - 18x + 12 = 0 ⟹ x = 1 and x = 2",
      difficulty: "Intermediate",
      xp: "+120 XP"
    },
    physics: {
      topic: "Electromagnetism & Faraday's Law",
      question: "How does induced EMF relate to magnetic flux through a closed loop?",
      hint: "EMF = -dΦB/dt (Lenz's Law ensures opposing magnetic field)",
      difficulty: "Advanced",
      xp: "+150 XP"
    },
    cs: {
      topic: "Data Structures & Big-O",
      question: "What is the amortized time complexity of dynamic array resizing?",
      hint: "O(1) amortized because doubling cost is distributed across n insertions",
      difficulty: "Mastery",
      xp: "+140 XP"
    },
    chemistry: {
      topic: "Organic Chemistry Mechanisms",
      question: "Which mechanism operates via a carbocation intermediate in polar protic solvents?",
      hint: "SN1 mechanism forms planar carbocation with racemic stereochemistry",
      difficulty: "Intermediate",
      xp: "+130 XP"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. TOP STICKY NAVBAR - RESPONSIVE FOR MOBILE, TABLET & LAPTOP */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 group">
            <div className="bg-blue-600 p-2 sm:p-2.5 rounded-xl shadow-sm text-white group-hover:bg-blue-700 transition-colors shrink-0">
              <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  LearnAI
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                  Student Edition
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:block">Adaptive Academic Learning</span>
            </div>
          </Link>

          {/* Desktop & Laptop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#demo" className="hover:text-blue-600 transition-colors">Live Demo</a>
            <a href="#comparison" className="hover:text-blue-600 transition-colors">Why LearnAI</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">Student Stories</a>
            <Link href="/courses" className="hover:text-blue-600 transition-colors">Course Catalog</Link>
          </nav>

          {/* Header Action CTAs & Mobile Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link href="/login" className="hidden sm:inline-block">
              <Button variant="ghost" className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm rounded-xl px-3.5 sm:px-5 py-2 sm:py-2.5 transition-colors">
                Get Started
              </Button>
            </Link>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-2.5 shadow-lg animate-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a 
                href="#demo" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                Live Demo
              </a>
              <a 
                href="#comparison" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                Why LearnAI
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                Student Stories
              </a>
              <Link 
                href="/courses" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                Course Catalog
              </Link>
            </nav>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between sm:hidden">
              <Link href="/login" className="w-1/2 pr-1" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full text-xs font-semibold border-slate-200">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" className="w-1/2 pl-1" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION - RESPONSIVE & PUNCHY (NO REDUNDANT SUBTITLE) */}
      <section className="pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Student Announcement Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
              <span>Adaptive AI Education Platform</span>
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.14]">
              Master Any Subject Faster with{" "}
              <span className="text-blue-600 italic">
                Personalized AI
              </span>
            </h1>

            {/* Main CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-bold shadow-sm rounded-xl group transition-colors">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/courses" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-base font-semibold border-slate-300 hover:bg-slate-50 rounded-xl shadow-sm text-slate-700">
                  <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                  Explore Courses
                </Button>
              </Link>
            </div>

            {/* Social Trust Badges */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center space-x-1 text-amber-600 font-semibold">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-slate-900 ml-1.5 font-bold">4.9/5 Student Rating</span>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <div className="flex items-center space-x-1 text-slate-700">
                <Users className="h-4 w-4 text-blue-600 mr-1" />
                <span>Over <strong>50,000+</strong> Active Students</span>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <div className="flex items-center space-x-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="h-4 w-4 mr-1 text-emerald-600" />
                <span>94% Exam Retention</span>
              </div>
            </div>
          </div>

          {/* 3. HERO INTERACTIVE LIVE DASHBOARD PREVIEW - EXPANDED WIDTH FOR LAPTOP & RESPONSIVE FOR MOBILE */}
          <div className="mt-12 sm:mt-16 max-w-6xl lg:max-w-7xl mx-auto w-full">
            <div className="rounded-2xl p-2 sm:p-2.5 bg-slate-100 border border-slate-200 shadow-lg">
              {/* Card Container */}
              <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                {/* Mockup Top Navigation Tabs - Horizontal Scroll on Mobile */}
                <div className="bg-slate-900 text-white px-3 sm:px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-700" />
                    <span className="text-[11px] sm:text-xs font-mono text-slate-400 ml-1 sm:ml-2 truncate max-w-[150px] sm:max-w-none">
                      learnai-student-workspace.app
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-lg text-xs font-medium overflow-x-auto max-w-full">
                    <button 
                      onClick={() => setActiveTab("quiz")}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${activeTab === "quiz" ? "bg-blue-600 text-white font-semibold" : "text-slate-400 hover:text-white"}`}
                    >
                      AI Quiz Engine
                    </button>
                    <button 
                      onClick={() => setActiveTab("planner")}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${activeTab === "planner" ? "bg-blue-600 text-white font-semibold" : "text-slate-400 hover:text-white"}`}
                    >
                      Smart Planner
                    </button>
                    <button 
                      onClick={() => setActiveTab("mood")}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${activeTab === "mood" ? "bg-blue-600 text-white font-semibold" : "text-slate-400 hover:text-white"}`}
                    >
                      Cognitive Energy
                    </button>
                    <button 
                      onClick={() => setActiveTab("progress")}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${activeTab === "progress" ? "bg-blue-600 text-white font-semibold" : "text-slate-400 hover:text-white"}`}
                    >
                      Analytics Heatmap
                    </button>
                  </div>
                </div>

                {/* Mockup Active Content Views */}
                <div className="p-4 sm:p-6 lg:p-8 bg-slate-950 text-slate-100">
                  {activeTab === "quiz" && (
                    <div className="space-y-5 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                        <div>
                          <Badge className="bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs">
                            Adaptive Diagnostic Quiz
                          </Badge>
                          <h3 className="text-base sm:text-lg font-bold text-white mt-1">Calculus: Limits & Derivatives</h3>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-slate-400 font-mono flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" /> 04:32 remaining
                          </span>
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                            +150 XP on completion
                          </span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                        <p className="text-sm font-semibold text-slate-200">
                          Question 3 of 5: What is the derivative of f(x) = 3x² + 5x - 7 at x = 2?
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                          <div className="p-3 sm:p-3.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-300 hover:border-slate-700 cursor-pointer transition-colors flex items-center justify-between">
                            <span>A) 12</span>
                            <span className="text-slate-500">f'(x) = 6x</span>
                          </div>
                          <div className="p-3 sm:p-3.5 rounded-lg border border-blue-500 bg-blue-950/40 text-xs text-blue-200 font-bold cursor-pointer transition-colors flex items-center justify-between">
                            <span>B) 17 (Correct)</span>
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          </div>
                          <div className="p-3 sm:p-3.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-300 hover:border-slate-700 cursor-pointer transition-colors flex items-center justify-between">
                            <span>C) 19</span>
                            <span className="text-slate-500">Calculation error</span>
                          </div>
                          <div className="p-3 sm:p-3.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-300 hover:border-slate-700 cursor-pointer transition-colors flex items-center justify-between">
                            <span>D) 24</span>
                            <span className="text-slate-500">Power rule miss</span>
                          </div>
                        </div>

                        <div className="p-3 sm:p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2.5">
                          <Brain className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-blue-300">AI Step-by-Step Logic:</strong> Applying power rule yields f'(x) = 6x + 5. Evaluating at x = 2 gives 6(2) + 5 = 17. Excellent work!
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "planner" && (
                    <div className="space-y-5 sm:space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <div>
                          <Badge className="bg-blue-500/15 text-blue-300 border border-blue-500/30 text-xs">
                            Cognitive Schedule
                          </Badge>
                          <h3 className="text-base sm:text-lg font-bold text-white mt-1">Today's Optimized Time Slots</h3>
                        </div>
                        <span className="text-xs text-amber-400 font-semibold flex items-center">
                          <Flame className="h-4 w-4 mr-1 text-amber-400" /> 14-Day Streak Active
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                        <div className="p-4 rounded-xl bg-slate-900 border border-blue-500/50">
                          <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span>04:00 PM - 04:45 PM</span>
                            <span className="text-emerald-400 font-semibold">Peak Energy</span>
                          </div>
                          <h4 className="font-bold text-sm text-white">Quantum Physics Mechanics</h4>
                          <p className="text-xs text-slate-400 mt-1">Wave functions & Schrödinger formulation</p>
                          <div className="mt-3 flex items-center text-[11px] text-blue-400 font-medium">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-400" /> Scheduled (45 mins)
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span>05:15 PM - 05:45 PM</span>
                            <span className="text-amber-400 font-semibold">Active Review</span>
                          </div>
                          <h4 className="font-bold text-sm text-white">Organic Synthesis Practice</h4>
                          <p className="text-xs text-slate-400 mt-1">Nucleophilic addition mechanism drill</p>
                          <div className="mt-3 flex items-center text-[11px] text-slate-400">
                            <Clock className="h-3.5 w-3.5 mr-1" /> Upcoming (30 mins)
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span>07:00 PM - 07:30 PM</span>
                            <span className="text-blue-300 font-semibold">Light Practice</span>
                          </div>
                          <h4 className="font-bold text-sm text-white">Data Structures Flashcards</h4>
                          <p className="text-xs text-slate-400 mt-1">Graph traversals & DFS/BFS review</p>
                          <div className="mt-3 flex items-center text-[11px] text-slate-400">
                            <Clock className="h-3.5 w-3.5 mr-1" /> Upcoming (30 mins)
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "mood" && (
                    <div className="space-y-5 sm:space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <div>
                          <Badge className="bg-blue-500/15 text-blue-300 border border-blue-500/30 text-xs">
                            Mental State Optimization
                          </Badge>
                          <h3 className="text-base sm:text-lg font-bold text-white mt-1">Cognitive Readiness Score: 88%</h3>
                        </div>
                        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                          High Focus Detected
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                        <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Focus & Attention Level</span>
                            <span className="text-white font-mono font-bold">92%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: "92%" }} />
                          </div>

                          <div className="flex justify-between text-xs pt-2">
                            <span className="text-slate-400">Mental Fatigue</span>
                            <span className="text-emerald-400 font-mono font-bold">14% (Very Low)</span>
                          </div>
                          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: "14%" }} />
                          </div>
                        </div>

                        <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                          <div>
                            <span className="text-xs uppercase font-bold text-amber-400">AI Adaptation Strategy</span>
                            <p className="text-sm text-slate-200 mt-2 font-medium">
                              "You are in deep focus flow. We have prioritized challenging algorithmic problem sets instead of passive reading to maximize your memory retention."
                            </p>
                          </div>
                          <div className="mt-4 flex items-center text-xs text-blue-300 font-semibold">
                            <Zap className="h-4 w-4 mr-1 text-amber-400" /> Pacing tuned dynamically
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "progress" && (
                    <div className="space-y-5 sm:space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <div>
                          <Badge className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs">
                            Mastery Heatmap
                          </Badge>
                          <h3 className="text-base sm:text-lg font-bold text-white mt-1">Weekly Retention & XP Growth</h3>
                        </div>
                        <span className="text-xs font-semibold text-amber-400 flex items-center">
                          <Award className="h-4 w-4 mr-1 text-amber-400" /> Diamond Tier Achiever
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-xs text-slate-400">Total XP</span>
                          <h4 className="text-xl sm:text-2xl font-black text-amber-400 mt-1">3,840 XP</h4>
                          <span className="text-[11px] text-emerald-400">+420 this week</span>
                        </div>
                        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-xs text-slate-400">Quizzes Completed</span>
                          <h4 className="text-xl sm:text-2xl font-black text-blue-400 mt-1">48 Tests</h4>
                          <span className="text-[11px] text-slate-400">92% accuracy</span>
                        </div>
                        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-xs text-slate-400">Active Streak</span>
                          <h4 className="text-xl sm:text-2xl font-black text-white mt-1">14 Days</h4>
                          <span className="text-[11px] text-amber-400 flex items-center mt-1">
                            <Flame className="h-3 w-3 mr-1 text-amber-400" /> Habit active
                          </span>
                        </div>
                        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-xs text-slate-400">Concept Retention</span>
                          <h4 className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">94.8%</h4>
                          <span className="text-[11px] text-emerald-400">+8% vs last month</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY PLATFORM STATS / TRUST METRICS - RESPONSIVE 2X2 ON MOBILE, 4 COLS ON LAPTOP */}
      <section className="py-10 sm:py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center divide-y-0 sm:divide-x divide-slate-100">
            <div className="px-2 sm:px-4">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">50,000+</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Students Enrolled Worldwide</p>
            </div>
            <div className="px-2 sm:px-4">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">1.2 Million</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Practice Quizzes Generated</p>
            </div>
            <div className="px-2 sm:px-4">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-amber-600 tracking-tight">94.8%</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Exam Score Improvement</p>
            </div>
            <div className="px-2 sm:px-4">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">100%</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Tailored to Individual Pace</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE "EXPERIENCE THE AI" DEMO SECTION - NO SUBTITLE, EXPANDED WIDTH */}
      <section id="demo" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
            <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs mb-3">
              Interactive Diagnostic Preview
            </Badge>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Test Our Adaptive Generator in Action
            </h2>

            {/* Subject selector pills - Touch friendly */}
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-2.5">
              <button
                onClick={() => setSelectedDemoSubject("math")}
                className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center transition-colors ${
                  selectedDemoSubject === "math"
                    ? "bg-blue-600 text-white font-bold shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Calculator className="h-4 w-4 mr-1.5" /> Calculus (Math)
              </button>
              <button
                onClick={() => setSelectedDemoSubject("physics")}
                className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center transition-colors ${
                  selectedDemoSubject === "physics"
                    ? "bg-blue-600 text-white font-bold shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Zap className="h-4 w-4 mr-1.5" /> Electromagnetism (Physics)
              </button>
              <button
                onClick={() => setSelectedDemoSubject("cs")}
                className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center transition-colors ${
                  selectedDemoSubject === "cs"
                    ? "bg-blue-600 text-white font-bold shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Code2 className="h-4 w-4 mr-1.5" /> Algorithms (Computer Science)
              </button>
              <button
                onClick={() => setSelectedDemoSubject("chemistry")}
                className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center transition-colors ${
                  selectedDemoSubject === "chemistry"
                    ? "bg-blue-600 text-white font-bold shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <FlaskConical className="h-4 w-4 mr-1.5" /> Organic Chemistry
              </button>
            </div>
          </div>

          {/* Interactive Question Card - EXPANDED WIDTH TO 5XL/6XL */}
          <div className="max-w-5xl lg:max-w-6xl mx-auto bg-slate-950 rounded-2xl border border-slate-800 p-5 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-blue-400" />
                <span className="font-bold text-sm sm:text-base text-white">{demoQuestions[selectedDemoSubject].topic}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-amber-400 border-amber-400/30 text-xs">
                  {demoQuestions[selectedDemoSubject].difficulty}
                </Badge>
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  {demoQuestions[selectedDemoSubject].xp}
                </span>
              </div>
            </div>

            <div className="my-5 sm:my-6">
              <h4 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                {demoQuestions[selectedDemoSubject].question}
              </h4>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center text-xs font-semibold text-amber-400">
                <Lightbulb className="h-4 w-4 mr-1.5" />
                <span>AI Tutor Step-by-Step Insight:</span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed">
                {demoQuestions[selectedDemoSubject].hint}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <span>Identifies key conceptual prerequisites</span>
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="sm" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition-colors">
                  Take Full Diagnostic <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CORE PILLARS & FEATURES - NO SUBTITLE, EXPANDED TO 7XL */}
      <section id="features" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
            <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs mb-3">
              Platform Features
            </Badge>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Engineered for Deep Learning & Total Retention
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm mb-5 sm:mb-6">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Smart AI Quiz Generator</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Instantly generates customized quizzes targeting your exact weaknesses. Includes timers, instant feedback, and step-by-step logic explanations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm mb-5 sm:mb-6">
                <Smile className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Cognitive Energy & Mood Pacing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Study smarter by factoring in focus and stress. When fatigued, review micro-concepts; when sharp, tackle complex calculations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm mb-5 sm:mb-6">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Gamified Badges & Streaks</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Earn XP, progress from Bronze to Diamond tiers, and maintain daily study streaks. Build lasting learning consistency effortlessly.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-sm mb-5 sm:mb-6">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Adaptive 30-Min Study Planner</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Schedule study sessions across 30-minute intervals. The planner balances review frequency and optimal spacing intervals automatically.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-sm mb-5 sm:mb-6">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Multi-Format Resource Library</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Seamlessly toggle between video lectures, concise summary sheets, interactive drills, and downloadable reference materials.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-sm mb-5 sm:mb-6">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Detailed Heatmap Analytics</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                View weekly learning trajectories, subject masteries, and topic-by-topic retention metrics through clean visual charts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COMPARISON TABLE - NO SUBTITLE, EXPANDED TO 7XL, RESPONSIVE HORIZONTAL SCROLL ON MOBILE */}
      <section id="comparison" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Why LearnAI Outperforms Conventional Learning
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <div className="min-w-[620px] sm:min-w-full">
                <div className="grid grid-cols-3 p-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider text-center">
                  <div className="text-left pl-4 text-slate-400">Learning Dimension</div>
                  <div className="text-slate-400">Standard Textbooks & Videos</div>
                  <div className="text-amber-400">LearnAI Adaptive Platform</div>
                </div>

                <div className="divide-y divide-slate-100 text-sm">
                  <div className="grid grid-cols-3 p-4 sm:p-5 items-center">
                    <div className="font-semibold text-slate-900">Pacing & Speed</div>
                    <div className="text-slate-500 text-center text-xs">Fixed, identical for every student</div>
                    <div className="text-blue-700 font-semibold text-center text-xs flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 mr-1 text-emerald-600" /> Dynamically adapts to your speed
                    </div>
                  </div>

                  <div className="grid grid-cols-3 p-4 sm:p-5 items-center bg-slate-50">
                    <div className="font-semibold text-slate-900">Identifying Weak Spots</div>
                    <div className="text-slate-500 text-center text-xs">Discovered only after failing exams</div>
                    <div className="text-blue-700 font-semibold text-center text-xs flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 mr-1 text-emerald-600" /> Flagged instantly after 1 quiz
                    </div>
                  </div>

                  <div className="grid grid-cols-3 p-4 sm:p-5 items-center">
                    <div className="font-semibold text-slate-900">Cognitive Fatigue</div>
                    <div className="text-slate-500 text-center text-xs">Ignored; leads to burnout</div>
                    <div className="text-blue-700 font-semibold text-center text-xs flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 mr-1 text-emerald-600" /> Mood & energy pacing algorithms
                    </div>
                  </div>

                  <div className="grid grid-cols-3 p-4 sm:p-5 items-center bg-slate-50">
                    <div className="font-semibold text-slate-900">Motivation & Habit</div>
                    <div className="text-slate-500 text-center text-xs">Relies purely on willpower</div>
                    <div className="text-blue-700 font-semibold text-center text-xs flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 mr-1 text-emerald-600" /> Gamified XP, Streaks & Badges
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. STUDENT TESTIMONIALS - NO SUBTITLE, EXPANDED TO 7XL, RESPONSIVE CARDS */}
      <section id="testimonials" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
            <Badge className="bg-amber-50 text-amber-800 border-amber-200 text-xs mb-3">
              Real Student Stories
            </Badge>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Loved by Students Across Academic Disciplines
            </h2>

            {/* Social Proof Pill Bar */}
            <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold">
              <span className="flex items-center text-amber-600">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 mr-1" /> 4.9 / 5.0 Average Rating
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700">14,000+ Verified Reviews</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700">94.8% Score Boost</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Testimonial Card 1 */}
            <Card className="border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all rounded-2xl bg-white flex flex-col justify-between relative overflow-hidden">
              <CardContent className="p-6 sm:p-7">
                <Quote className="h-8 w-8 text-slate-200 absolute top-5 right-5 pointer-events-none" />
                <div className="flex text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>

                <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">
                  <TrendingUp className="h-3 w-3 mr-1" /> Score jumped +22% in 4 weeks
                </span>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-normal">
                  "The diagnostic quizzes identified gaps in my calculus understanding that I had no idea existed. Being able to see step-by-step logic explanations saved me hours before mid-term exams. My grade went from 72% to 94%."
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center space-x-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                    PS
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Priya Sharma</h4>
                    <p className="text-xs text-slate-500">B.Tech Computer Science • IIT Delhi</p>
                    <div className="flex items-center text-[11px] text-blue-600 font-medium mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-600" /> Verified Student
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Card 2 */}
            <Card className="border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all rounded-2xl bg-white flex flex-col justify-between relative overflow-hidden">
              <CardContent className="p-6 sm:p-7">
                <Quote className="h-8 w-8 text-slate-200 absolute top-5 right-5 pointer-events-none" />
                <div className="flex text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>

                <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 mb-4">
                  <Brain className="h-3 w-3 mr-1" /> Zero Burnout During Prep
                </span>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-normal">
                  "The Mood & Energy tracker is genuine genius. When I come home exhausted after coaching classes, it adjusts to quick review cards instead of overwhelming me with complex calculations. It kept me consistent without burnout."
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center space-x-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
                    RV
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Rahul Verma</h4>
                    <p className="text-xs text-slate-500">NEET Medical Aspirant • Delhi</p>
                    <div className="flex items-center text-[11px] text-blue-600 font-medium mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-600" /> Verified Student
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Card 3 */}
            <Card className="border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all rounded-2xl bg-white flex flex-col justify-between relative overflow-hidden md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 sm:p-7">
                <Quote className="h-8 w-8 text-slate-200 absolute top-5 right-5 pointer-events-none" />
                <div className="flex text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>

                <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 mb-4">
                  <Flame className="h-3 w-3 mr-1 text-amber-600" /> 45-Day Active Streak
                </span>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-normal">
                  "The streak tracker and XP ranks made studying feel engaging and achievable. I used to dread organic chemistry, but with bite-sized daily drills and smart recommendations, I have maintained a 45-day unbroken habit."
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center space-x-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                    AP
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Ananya Patel</h4>
                    <p className="text-xs text-slate-500">Class 12 CBSE & Engineering Prep</p>
                    <div className="flex items-center text-[11px] text-blue-600 font-medium mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-600" /> Verified Student
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 9. PRE-FOOTER CTA SECTION - UNIFORM FONT, SIZE & COLOR */}
      <section className="py-16 sm:py-24 bg-slate-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-14 lg:p-18 text-slate-900 text-center border-2 border-slate-200 shadow-lg">
            {/* Free Tier Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Free for All Individual Students</span>
            </div>

            {/* Headline - EXACT SAME FONT, SIZE & COLOR */}
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Ready to Transform Your Learning Routine?
            </h2>

            {/* Trust feature checklist */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>50+ Free Diagnostic Quizzes</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Instant Step-by-Step AI Guidance</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-9 py-6 text-base rounded-xl transition-colors shadow-sm">
                  Start Learning for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/courses" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-bold px-9 py-6 text-base rounded-xl transition-colors shadow-sm">
                  Browse Course Catalog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. INTERACTIVE STUDENT AI CHATBOT (COPILOT) */}
      <StudentChatbot />

      {/* 11. GLOBAL RICH FOOTER */}
      <Footer />
    </div>
  );
}
