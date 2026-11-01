'use client';

import { ChevronRight, TrendingUp, BarChart, PieChart, DollarSign, Users, Globe, LineChart, Target, Download, ExternalLink, Mail, Building, Calendar, Clock, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function Investors() {
  const financialHighlights = [
    {
      title: "Annual Recurring Revenue",
      value: "$82M",
      change: "+47%",
      positive: true,
      icon: <DollarSign className="h-5 w-5 text-indigo-600" />
    },
    {
      title: "Active Learners",
      value: "2.4M",
      change: "+38%",
      positive: true,
      icon: <Users className="h-5 w-5 text-indigo-600" />
    },
    {
      title: "Global Reach",
      value: "150+",
      change: "+12",
      positive: true,
      icon: <Globe className="h-5 w-5 text-indigo-600" />
    },
    {
      title: "Gross Margin",
      value: "78%",
      change: "+5%",
      positive: true,
      icon: <PieChart className="h-5 w-5 text-indigo-600" />
    }
  ];
  
  const investmentRounds = [
    {
      round: "Series B",
      date: "March 2025",
      amount: "$50M",
      valuation: "$450M",
      leadInvestor: "Sequoia Capital",
      investorLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Sequoia_Capital_logo.svg/1200px-Sequoia_Capital_logo.svg.png",
      otherInvestors: ["Accel", "Founders Fund", "Y Combinator"]
    },
    {
      round: "Series A",
      date: "May 2023",
      amount: "$22M",
      valuation: "$120M",
      leadInvestor: "Andreessen Horowitz",
      investorLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Andreessen_Horowitz_logo.svg/1200px-Andreessen_Horowitz_logo.svg.png",
      otherInvestors: ["GV", "Y Combinator", "EdTech Ventures"]
    },
    {
      round: "Seed",
      date: "January 2022",
      amount: "$4.5M",
      valuation: "$18M",
      leadInvestor: "Y Combinator",
      investorLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Y_Combinator_logo.svg/1200px-Y_Combinator_logo.svg.png",
      otherInvestors: ["AngelList", "SV Angel"]
    }
  ];
  
  const boardMembers = [
    {
      name: "Dr. Emily Chen",
      title: "Co-Founder & CEO",
      bio: "Former education researcher with expertise in AI applications for learning. Led multiple EdTech startups before founding LearnAI.",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg"
    },
    {
      name: "Marcus Johnson",
      title: "Co-Founder & CTO",
      bio: "AI engineer with extensive background in machine learning and educational technology. Previously led engineering at a major EdTech company.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Jennifer Walsh",
      title: "Partner, Sequoia Capital",
      bio: "Leads EdTech investments at Sequoia. Extensive experience in scaling technology companies from Series A to IPO.",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    {
      name: "Michael Torres",
      title: "Partner, Andreessen Horowitz",
      bio: "Education technology specialist at a16z. Former founder of two successful education startups with expertise in go-to-market strategy.",
      avatar: "https://randomuser.me/api/portraits/men/86.jpg"
    },
    {
      name: "Dr. Sarah Patel",
      title: "Independent Board Member",
      bio: "Former Dean of Education at Stanford University with extensive research in learning science and educational policy.",
      avatar: "https://randomuser.me/api/portraits/women/57.jpg"
    }
  ];
  
  const keyMetrics = {
    revenue: {
      current: 82,
      previous: 56,
      target: 90,
      unit: "$ Millions"
    },
    users: {
      current: 2.4,
      previous: 1.7,
      target: 3.0,
      unit: "Millions"
    },
    retention: {
      current: 92,
      previous: 88,
      target: 95,
      unit: "%"
    },
    cac: {
      current: 38,
      previous: 45,
      target: 35,
      unit: "$"
    },
    ltv: {
      current: 420,
      previous: 350,
      target: 450,
      unit: "$"
    }
  };
  
  const newsReleases = [
    {
      title: "LearnAI Raises $50M Series B to Expand Personalized Learning Platform Globally",
      date: "March 10, 2025",
      source: "TechCrunch",
      url: "#"
    },
    {
      title: "LearnAI Reports 47% YoY Revenue Growth in Q1 2025",
      date: "April 20, 2025",
      source: "Business Wire",
      url: "#"
    },
    {
      title: "LearnAI Expands Leadership Team with Former Google Education Executive",
      date: "February 15, 2025",
      source: "EdTech Magazine",
      url: "#"
    },
    {
      title: "LearnAI Announces Strategic Partnership with 200 Global Universities",
      date: "January 28, 2025",
      source: "PR Newswire",
      url: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/" className="text-indigo-100 hover:text-white text-sm">Home</Link>
            <ChevronRight className="h-4 w-4 text-indigo-200" />
            <span className="text-white text-sm">Investor Relations</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Investor Relations</h1>
              <p className="text-indigo-100 text-xl mb-8">
                Information and resources for current and prospective investors in LearnAI.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#financials" className="bg-white text-indigo-700 hover:bg-indigo-50 font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-lg">
                  Financial Highlights
                </a>
                <a href="#contact" className="bg-indigo-700/30 text-white hover:bg-indigo-700/50 font-medium px-6 py-3 rounded-lg transition-all duration-300 backdrop-blur-sm border border-indigo-400/30">
                  Investor Contact
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-indigo-500/20 backdrop-blur-sm p-8 rounded-xl border border-indigo-400/30">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-white font-bold text-2xl">LEARN</h2>
                    <p className="text-indigo-200">NASDAQ</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-2xl">$78.42</p>
                    <p className="text-green-400 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +2.34 (3.1%)
                    </p>
                  </div>
                </div>
                <div className="h-32 mb-4 bg-gradient-to-t from-indigo-500/10 to-transparent relative">
                  {/* Simplified chart visual */}
                  <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                    <path d="M0,35 C5,32 10,30 15,25 C20,20 25,18 30,20 C35,22 40,25 45,24 C50,23 55,19 60,18 C65,17 70,20 75,24 C80,28 85,32 90,30 C95,28 100,20 100,20" 
                      fill="none" 
                      stroke="rgba(139, 92, 246, 0.8)" 
                      strokeWidth="2"
                      strokeLinecap="round" />
                    <path d="M0,35 C5,32 10,30 15,25 C20,20 25,18 30,20 C35,22 40,25 45,24 C50,23 55,19 60,18 C65,17 70,20 75,24 C80,28 85,32 90,30 C95,28 100,20 100,20 L 100,40 L 0,40 Z" 
                      fill="url(#stockGradient)" 
                      stroke="none"
                      opacity="0.3" />
                    <defs>
                      <linearGradient id="stockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(139, 92, 246, 0.7)" />
                        <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <p className="text-indigo-200 text-xs mb-1">Open</p>
                    <p className="text-white font-medium">$76.10</p>
                  </div>
                  <div>
                    <p className="text-indigo-200 text-xs mb-1">High</p>
                    <p className="text-white font-medium">$79.28</p>
                  </div>
                  <div>
                    <p className="text-indigo-200 text-xs mb-1">Low</p>
                    <p className="text-white font-medium">$75.92</p>
                  </div>
                  <div>
                    <p className="text-indigo-200 text-xs mb-1">Volume</p>
                    <p className="text-white font-medium">1.2M</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Highlights */}
      <div id="financials" className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-10">
          <div className="inline-block mb-4 bg-indigo-100 px-4 py-1 rounded-full">
            <span className="text-indigo-800 font-medium text-sm">FINANCIAL PERFORMANCE</span>
          </div>
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Financial Highlights</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            LearnAI has demonstrated strong growth and financial performance since its founding.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {financialHighlights.map((highlight, index) => (
            <Card key={index} className="border-indigo-100 hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="bg-indigo-100 p-3 rounded-lg mb-4">
                    {highlight.icon}
                  </div>
                  <div className={`text-sm font-semibold ${highlight.positive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                    {highlight.change}
                    <TrendingUp className={`h-4 w-4 ml-1 ${highlight.positive ? 'text-green-600' : 'text-red-600 transform rotate-180'}`} />
                  </div>
                </div>
                <h3 className="text-gray-700 font-medium">{highlight.title}</h3>
                <p className="text-3xl font-bold text-indigo-900">{highlight.value}</p>
                <p className="text-gray-500 text-sm mt-1">Year over Year</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 mb-12">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-indigo-900 mb-1">Key Performance Metrics</h3>
              <p className="text-gray-600">Tracking our progress toward ambitious growth targets</p>
            </div>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Previous Year</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border border-dashed border-amber-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Target</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-indigo-900">Annual Recurring Revenue</h4>
                  <p className="text-gray-500 text-sm">{keyMetrics.revenue.unit}</p>
                </div>
                <div className="text-2xl font-bold text-indigo-900">
                  {keyMetrics.revenue.current}
                </div>
              </div>
              <div className="relative h-8 w-full bg-gray-100 rounded-full">
                <div className="absolute left-0 top-0 h-8 bg-gray-300 rounded-full" style={{ width: `${(keyMetrics.revenue.previous / keyMetrics.revenue.target) * 100}%` }}></div>
                <div className="absolute left-0 top-0 h-8 bg-indigo-600 rounded-full" style={{ width: `${(keyMetrics.revenue.current / keyMetrics.revenue.target) * 100}%` }}></div>
                <div className="absolute" style={{ left: `${(keyMetrics.revenue.target / keyMetrics.revenue.target) * 100}%`, top: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div className="w-4 h-4 border-2 border-dashed border-amber-500 rounded-full bg-white"></div>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 left-2 text-xs font-semibold text-white">
                  {keyMetrics.revenue.current}
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-indigo-900">Active Learners</h4>
                  <p className="text-gray-500 text-sm">{keyMetrics.users.unit}</p>
                </div>
                <div className="text-2xl font-bold text-indigo-900">
                  {keyMetrics.users.current}
                </div>
              </div>
              <div className="relative h-8 w-full bg-gray-100 rounded-full">
                <div className="absolute left-0 top-0 h-8 bg-gray-300 rounded-full" style={{ width: `${(keyMetrics.users.previous / keyMetrics.users.target) * 100}%` }}></div>
                <div className="absolute left-0 top-0 h-8 bg-indigo-600 rounded-full" style={{ width: `${(keyMetrics.users.current / keyMetrics.users.target) * 100}%` }}></div>
                <div className="absolute" style={{ left: `${(keyMetrics.users.target / keyMetrics.users.target) * 100}%`, top: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div className="w-4 h-4 border-2 border-dashed border-amber-500 rounded-full bg-white"></div>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 left-2 text-xs font-semibold text-white">
                  {keyMetrics.users.current}
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-indigo-900">Customer Retention</h4>
                  <p className="text-gray-500 text-sm">{keyMetrics.retention.unit}</p>
                </div>
                <div className="text-2xl font-bold text-indigo-900">
                  {keyMetrics.retention.current}%
                </div>
              </div>
              <div className="relative h-8 w-full bg-gray-100 rounded-full">
                <div className="absolute left-0 top-0 h-8 bg-gray-300 rounded-full" style={{ width: `${(keyMetrics.retention.previous / 100) * 100}%` }}></div>
                <div className="absolute left-0 top-0 h-8 bg-indigo-600 rounded-full" style={{ width: `${(keyMetrics.retention.current / 100) * 100}%` }}></div>
                <div className="absolute" style={{ left: `${(keyMetrics.retention.target / 100) * 100}%`, top: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div className="w-4 h-4 border-2 border-dashed border-amber-500 rounded-full bg-white"></div>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 left-2 text-xs font-semibold text-white">
                  {keyMetrics.retention.current}%
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
            <div className="flex items-center gap-2 mb-6">
              <BarChart className="h-5 w-5 text-indigo-600" />
              <h3 className="text-xl font-bold text-indigo-900">Revenue Breakdown</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-700">K-12 Schools</span>
                  <span className="text-indigo-900 font-medium">38%</span>
                </div>
                <Progress value={38} className="h-2 bg-indigo-100" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-700">Higher Education</span>
                  <span className="text-indigo-900 font-medium">32%</span>
                </div>
                <Progress value={32} className="h-2 bg-indigo-100" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-700">Corporate Learning</span>
                  <span className="text-indigo-900 font-medium">18%</span>
                </div>
                <Progress value={18} className="h-2 bg-indigo-100" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-700">Consumer Subscriptions</span>
                  <span className="text-indigo-900 font-medium">12%</span>
                </div>
                <Progress value={12} className="h-2 bg-indigo-100" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="h-5 w-5 text-indigo-600" />
              <h3 className="text-xl font-bold text-indigo-900">Geographic Distribution</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-700">North America</span>
                  <span className="text-indigo-900 font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2 bg-indigo-100" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-700">Europe</span>
                  <span className="text-indigo-900 font-medium">28%</span>
                </div>
                <Progress value={28} className="h-2 bg-indigo-100" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-700">Asia-Pacific</span>
                  <span className="text-indigo-900 font-medium">20%</span>
                </div>
                <Progress value={20} className="h-2 bg-indigo-100" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-700">Rest of World</span>
                  <span className="text-indigo-900 font-medium">7%</span>
                </div>
                <Progress value={7} className="h-2 bg-indigo-100" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Download className="h-5 w-5 mr-2" />
            Download Financial Report
          </Button>
        </div>
      </div>

      {/* Investment History */}
      <div className="bg-indigo-50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block mb-4 bg-indigo-200 px-4 py-1 rounded-full">
              <span className="text-indigo-800 font-medium text-sm">FUNDING HISTORY</span>
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Investment Rounds</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              LearnAI has raised strategic funding from top-tier investors to fuel our growth and innovation.
            </p>
          </div>
          
          <div className="space-y-8 relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-200 hidden md:block ml-8"></div>
            
            {investmentRounds.map((round, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md border border-indigo-100 relative md:ml-16">
                {/* Timeline dot */}
                <div className="hidden md:flex absolute -left-16 top-8 items-center justify-center w-10 h-10 bg-indigo-100 rounded-full border-4 border-white">
                  <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-indigo-100 text-indigo-700 font-semibold px-3 py-1">
                        {round.round}
                      </Badge>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {round.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={round.investorLogo} alt={round.leadInvestor} className="h-6 object-contain" />
                      <span className="text-indigo-900 font-medium">Lead: {round.leadInvestor}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <p className="text-gray-500 text-sm mb-1">Amount Raised</p>
                        <p className="text-3xl font-bold text-indigo-900">{round.amount}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm mb-1">Valuation</p>
                        <p className="text-xl font-semibold text-indigo-900">{round.valuation}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-sm mb-2">Participating Investors</p>
                      <div className="flex flex-wrap gap-2">
                        {round.otherInvestors.map((investor, i) => (
                          <Badge key={i} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                            {investor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership & Governance */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-10">
          <div className="inline-block mb-4 bg-indigo-100 px-4 py-1 rounded-full">
            <span className="text-indigo-800 font-medium text-sm">LEADERSHIP & GOVERNANCE</span>
          </div>
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Board of Directors</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Our experienced board provides strategic guidance and oversight to help LearnAI achieve its vision.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {boardMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md border border-indigo-100 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="w-24 h-24 border-4 border-indigo-50 mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-indigo-200 text-indigo-700 text-xl">{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-xl text-indigo-900">{member.name}</h3>
                <p className="text-indigo-600">{member.title}</p>
              </div>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 bg-indigo-50 p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Building className="h-5 w-5 text-indigo-600" />
            <h3 className="text-xl font-bold text-indigo-900">Corporate Governance</h3>
          </div>
          <p className="text-gray-700 mb-6">
            LearnAI is committed to maintaining the highest standards of corporate governance to ensure transparency and accountability to our stakeholders.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="#" className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300 flex items-center gap-3">
              <Download className="h-5 w-5 text-indigo-600" />
              <span className="text-indigo-900 font-medium">Corporate Bylaws</span>
            </a>
            <a href="#" className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300 flex items-center gap-3">
              <Download className="h-5 w-5 text-indigo-600" />
              <span className="text-indigo-900 font-medium">Code of Ethics</span>
            </a>
            <a href="#" className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300 flex items-center gap-3">
              <Download className="h-5 w-5 text-indigo-600" />
              <span className="text-indigo-900 font-medium">Committee Charters</span>
            </a>
          </div>
        </div>
      </div>

      {/* News & Events */}
      <div className="bg-white py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block mb-4 bg-indigo-100 px-4 py-1 rounded-full">
              <span className="text-indigo-800 font-medium text-sm">LATEST UPDATES</span>
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Investor News & Events</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Stay up to date with the latest LearnAI announcements, financial news, and upcoming events.
            </p>
          </div>
          
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-8">
              <TabsTrigger value="news">Recent News</TabsTrigger>
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="news" className="space-y-6">
              {newsReleases.map((news, index) => (
                <a key={index} href={news.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{news.date}</span>
                      </div>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        {news.source}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg text-indigo-900 hover:text-indigo-700 transition-colors">
                      {news.title}
                    </h3>
                    <div className="flex items-center mt-2 text-indigo-600 text-sm">
                      <span>Read More</span>
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </a>
              ))}
              
              <div className="text-center">
                <Button variant="link" className="text-indigo-600 hover:text-indigo-800">
                  View All News Releases
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="events" className="space-y-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="text-center bg-indigo-100 text-indigo-700 font-semibold p-3 rounded-lg md:w-28 mb-4 md:mb-0">
                    <div className="text-xs uppercase">MAY</div>
                    <div className="text-3xl">15</div>
                    <div className="text-xs uppercase">2025</div>
                  </div>
                  <div>
                    <Badge className="bg-green-100 text-green-700 mb-2">Earnings Call</Badge>
                    <h3 className="font-bold text-lg text-indigo-900 mb-2">Q1 2025 Earnings Conference Call</h3>
                    <p className="text-gray-600 mb-3">Join our CEO and CFO as they discuss LearnAI's financial results for the first quarter of fiscal year 2025.</p>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>2:00 PM ET</span>
                      </div>
                      <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                        Add to Calendar
                      </Button>
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        Register
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="text-center bg-indigo-100 text-indigo-700 font-semibold p-3 rounded-lg md:w-28 mb-4 md:mb-0">
                    <div className="text-xs uppercase">JUN</div>
                    <div className="text-3xl">10</div>
                    <div className="text-xs uppercase">2025</div>
                  </div>
                  <div>
                    <Badge className="bg-amber-100 text-amber-700 mb-2">Investor Day</Badge>
                    <h3 className="font-bold text-lg text-indigo-900 mb-2">Annual Investor Day 2025</h3>
                    <p className="text-gray-600 mb-3">A comprehensive overview of LearnAI's growth strategy, product roadmap, and financial outlook for the coming years.</p>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>9:00 AM ET</span>
                      </div>
                      <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                        Add to Calendar
                      </Button>
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        Register
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="text-center bg-indigo-100 text-indigo-700 font-semibold p-3 rounded-lg md:w-28 mb-4 md:mb-0">
                    <div className="text-xs uppercase">JUL</div>
                    <div className="text-3xl">22</div>
                    <div className="text-xs uppercase">2025</div>
                  </div>
                  <div>
                    <Badge className="bg-blue-100 text-blue-700 mb-2">Conference</Badge>
                    <h3 className="font-bold text-lg text-indigo-900 mb-2">Goldman Sachs EdTech Conference</h3>
                    <p className="text-gray-600 mb-3">LearnAI's CEO will be presenting at the annual Goldman Sachs Education Technology Conference in New York.</p>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>11:30 AM ET</span>
                      </div>
                      <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                        Add to Calendar
                      </Button>
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Investor Resources */}
      <div className="bg-indigo-50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block mb-4 bg-indigo-200 px-4 py-1 rounded-full">
              <span className="text-indigo-800 font-medium text-sm">RESOURCES</span>
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Investor Resources</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Access reports, presentations, and other materials to help you understand LearnAI's business and potential.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-indigo-100 hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-indigo-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-bold text-xl text-indigo-900 mb-3">Financial Reports</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center justify-between">
                    <span>Annual Report 2024</span>
                    <Download className="h-4 w-4 text-indigo-600" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Q4 2024 Results</span>
                    <Download className="h-4 w-4 text-indigo-600" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Q3 2024 Results</span>
                    <Download className="h-4 w-4 text-indigo-600" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Q2 2024 Results</span>
                    <Download className="h-4 w-4 text-indigo-600" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Q1 2024 Results</span>
                    <Download className="h-4 w-4 text-indigo-600" />
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-indigo-100 hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-indigo-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <LineChart className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-bold text-xl text-indigo-900 mb-3">Presentations</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center justify-between">
                    <span>Investor Day 2024</span>
                    <Download className="h-4 w-4 text-indigo-600" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Q4 2024 Earnings Call</span>
                    <Download className="h-4 w-4 text-indigo-600" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span>AI Strategy Overview</span>
                    <Download className="h-4 w-4 text-indigo-600" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Growth Initiatives</span>
                    <Download className="h-4 w-4 text-indigo-600" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Product Roadmap</span>
                    <Download className="h-4 w-4 text-indigo-600" />
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-indigo-100 hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-indigo-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-bold text-xl text-indigo-900 mb-3">SEC Filings</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center justify-between">
                    <span>Form 10-K (2024)</span>
                    <ExternalLink className="h-4 w-4 text-indigo-600" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Form 10-Q (Q1 2025)</span>
                    <ExternalLink className="h-4 w-4 text-indigo-600" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Form 8-K (Mar 2025)</span>
                    <ExternalLink className="h-4 w-4 text-indigo-600" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Form 8-K (Feb 2025)</span>
                    <ExternalLink className="h-4 w-4 text-indigo-600" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Form 4 Filings</span>
                    <ExternalLink className="h-4 w-4 text-indigo-600" />
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="container mx-auto max-w-5xl px-4 py-16">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-indigo-900">Investor Relations Contact</h2>
              </div>
              <p className="text-gray-700 mb-6">
                For investor-related questions or to receive updates about LearnAI, please contact our IR team.
              </p>
              <div className="space-y-5 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full mt-1 shrink-0">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-indigo-900 mb-1">Investor Relations Team</h3>
                    <p className="text-gray-600 text-sm">For investor inquiries, annual reports, and financial information</p>
                    <a href="mailto:investors@learnai.example" className="text-indigo-600 text-sm hover:text-indigo-800">
                      investors@learnai.example
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full mt-1 shrink-0">
                    <Building className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-indigo-900 mb-1">Transfer Agent</h3>
                    <p className="text-gray-600 text-sm">For questions about stock certificates, transfers, or direct deposits</p>
                    <a href="mailto:transfers@learnai.example" className="text-indigo-600 text-sm hover:text-indigo-800">
                      transfers@learnai.example
                    </a>
                  </div>
                </div>
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white mb-4 w-full">
                Subscribe to Investor Updates
              </Button>
              <p className="text-xs text-gray-500 text-center">
                We respect your privacy and will only send you relevant investor information.
              </p>
            </div>
            <div className="relative hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Stock market data" 
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-indigo-900/80">
                <div className="absolute bottom-10 left-10 max-w-xs">
                  <blockquote className="text-white text-lg font-medium italic">
                    "Investing in education is investing in our collective future."
                  </blockquote>
                  <p className="text-indigo-200 mt-4">- Dr. Emily Chen, CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-indigo-50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block mb-4 bg-indigo-200 px-4 py-1 rounded-full">
              <span className="text-indigo-800 font-medium text-sm">FAQS</span>
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Investor FAQs</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Find answers to common investor questions about LearnAI.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md border border-indigo-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-indigo-900 mb-2">When was LearnAI founded?</h3>
                  <p className="text-gray-700">
                    LearnAI was founded in 2022 by Dr. Emily Chen and Marcus Johnson to revolutionize personalized education through artificial intelligence.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-indigo-900 mb-2">What is LearnAI's business model?</h3>
                  <p className="text-gray-700">
                    LearnAI operates on a subscription-based model, offering its AI-powered learning platform to educational institutions, corporate learning departments, and individual learners.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-indigo-900 mb-2">Does LearnAI pay dividends?</h3>
                  <p className="text-gray-700">
                    LearnAI currently does not pay dividends as we are reinvesting our profits to fuel growth and innovation. Our focus is on long-term shareholder value through sustainable growth.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-indigo-900 mb-2">Who are LearnAI's main competitors?</h3>
                  <p className="text-gray-700">
                    Our competitive landscape includes traditional educational technology companies as well as emerging AI-driven learning platforms. Our key differentiator is our adaptive learning algorithms and comprehensive content library.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-indigo-900 mb-2">What is LearnAI's growth strategy?</h3>
                  <p className="text-gray-700">
                    Our growth strategy focuses on expanding our institutional partnerships, enhancing our AI capabilities, developing new content areas, and strategic geographic expansion in key global markets.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-indigo-900 mb-2">How does LearnAI use AI technology?</h3>
                  <p className="text-gray-700">
                    LearnAI leverages artificial intelligence to create personalized learning paths, provide real-time feedback, identify knowledge gaps, and adapt content difficulty based on individual learning patterns and progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Informed About LearnAI's Progress</h2>
              <p className="text-indigo-100 mb-8">
                Subscribe to receive quarterly updates, investor presentations, and news about upcoming events.
              </p>
              <Button className="bg-white text-indigo-700 hover:bg-indigo-50">
                Subscribe to IR Updates
              </Button>
            </div>
            <div className="hidden md:block">
              <div className="bg-indigo-500/20 backdrop-blur-sm p-6 rounded-xl border border-indigo-400/30">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-white">
                    <Target className="h-5 w-5 text-amber-300" />
                    <span>Quarterly earnings reports</span>
                  </li>
                  <li className="flex items-center gap-2 text-white">
                    <Target className="h-5 w-5 text-amber-300" />
                    <span>Conference and event invitations</span>
                  </li>
                  <li className="flex items-center gap-2 text-white">
                    <Target className="h-5 w-5 text-amber-300" />
                    <span>Strategic partnership announcements</span>
                  </li>
                  <li className="flex items-center gap-2 text-white">
                    <Target className="h-5 w-5 text-amber-300" />
                    <span>Product roadmap updates</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}