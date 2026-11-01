'use client';

import { ChevronRight, Briefcase, MapPin, Building, Calendar, Clock, ChevronDown, Target, Check, Heart, Star, Mail, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Careers() {
  const careerStats = [
    {
      label: "Global Offices",
      value: "12",
      icon: <Building className="h-5 w-5 text-indigo-600" />
    },
    {
      label: "Team Members",
      value: "250+",
      icon: <Users className="h-5 w-5 text-indigo-600" />
    },
    {
      label: "Countries",
      value: "15",
      icon: <Globe className="h-5 w-5 text-indigo-600" />
    },
    {
      label: "Open Positions",
      value: "42",
      icon: <Briefcase className="h-5 w-5 text-indigo-600" />
    }
  ];
  
  const coreValues = [
    {
      title: "Student-Centered Innovation",
      description: "We develop solutions with the learner at the center, focusing on their needs, challenges, and aspirations.",
      icon: LightbulbIcon
    },
    {
      title: "Educational Excellence",
      description: "We uphold the highest standards of educational research and pedagogy in everything we create.",
      icon: AwardIcon
    },
    {
      title: "Inclusive Learning",
      description: "We're committed to making quality education accessible to all, regardless of background or circumstance.",
      icon: UsersIcon
    },
    {
      title: "Data Privacy & Ethics",
      description: "We handle educational data with the utmost respect, transparency, and ethical consideration.",
      icon: ShieldIcon
    },
    {
      title: "Continuous Growth",
      description: "We embrace a growth mindset, constantly learning and evolving in pursuit of our mission.",
      icon: TrendingUpIcon
    },
    {
      title: "Collaborative Spirit",
      description: "We believe in the power of teamwork and partnership to create transformative educational solutions.",
      icon: HandsHelpingIcon
    }
  ];
  
  const benefits = [
    {
      title: "Flexible Work Policy",
      description: "Work from home, one of our global offices, or a hybrid arrangement that suits your life and productivity.",
      icon: <HomeIcon className="h-5 w-5 text-indigo-600" />
    },
    {
      title: "Unlimited Learning Budget",
      description: "We invest in your growth with an annual budget for courses, conferences, and learning resources.",
      icon: <GraduationCapIcon className="h-5 w-5 text-indigo-600" />
    },
    {
      title: "Competitive Compensation",
      description: "Salary packages that recognize your skills and experience, with equity options available.",
      icon: <DollarSignIcon className="h-5 w-5 text-indigo-600" />
    },
    {
      title: "Comprehensive Healthcare",
      description: "Full medical, dental, and vision coverage for you and your dependents from day one.",
      icon: <HeartIcon className="h-5 w-5 text-indigo-600" />
    },
    {
      title: "Wellness Programs",
      description: "Mental health support, fitness reimbursements, and wellness activities to keep you at your best.",
      icon: <ActivityIcon className="h-5 w-5 text-indigo-600" />
    },
    {
      title: "Global Mobility",
      description: "Opportunities for international relocation and temporary assignments in our offices worldwide.",
      icon: <GlobeIcon className="h-5 w-5 text-indigo-600" />
    },
    {
      title: "Generous Time Off",
      description: "Flexible PTO policy, plus paid volunteer time and parental leave when you need it most.",
      icon: <CalendarIcon className="h-5 w-5 text-indigo-600" />
    },
    {
      title: "Team Retreats",
      description: "Annual company-wide and team retreats to connect, collaborate, and celebrate together.",
      icon: <MapIcon className="h-5 w-5 text-indigo-600" />
    }
  ];
  
  const departments = [
    {
      name: "Engineering",
      description: "Build the technology that powers personalized learning experiences for millions of students.",
      openPositions: 15,
      icon: <CodeIcon className="h-5 w-5 text-indigo-600" />
    },
    {
      name: "Product",
      description: "Design and develop innovative solutions that transform how people learn and grow.",
      openPositions: 8,
      icon: <LayoutIcon className="h-5 w-5 text-indigo-600" />
    },
    {
      name: "Data Science",
      description: "Leverage AI and data analytics to create adaptive learning systems that understand student needs.",
      openPositions: 7,
      icon: <BarChartIcon className="h-5 w-5 text-indigo-600" />
    },
    {
      name: "Education",
      description: "Apply pedagogical expertise to develop curriculum and learning methodologies.",
      openPositions: 5,
      icon: <BookOpenIcon className="h-5 w-5 text-indigo-600" />
    },
    {
      name: "Design",
      description: "Craft beautiful, intuitive user experiences that make learning engaging and accessible.",
      openPositions: 4,
      icon: <PenToolIcon className="h-5 w-5 text-indigo-600" />
    },
    {
      name: "Marketing",
      description: "Share our story and connect educators and learners with our platform worldwide.",
      openPositions: 6,
      icon: <TrendingUpIcon className="h-5 w-5 text-indigo-600" />
    },
    {
      name: "Customer Success",
      description: "Partner with educational institutions to implement and optimize our learning solutions.",
      openPositions: 9,
      icon: <HeartHandshakeIcon className="h-5 w-5 text-indigo-600" />
    },
    {
      name: "People & Culture",
      description: "Build and nurture an inclusive workplace where diverse talents can thrive and grow.",
      openPositions: 3,
      icon: <UsersIcon className="h-5 w-5 text-indigo-600" />
    }
  ];
  
  const openPositions = [
    {
      title: "Senior Machine Learning Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      remote: true,
      posted: "5 days ago"
    },
    {
      title: "Curriculum Developer - Mathematics",
      department: "Education",
      location: "Boston, MA",
      type: "Full-time",
      remote: true,
      posted: "1 week ago"
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      remote: true,
      posted: "2 days ago"
    },
    {
      title: "Educational Content Strategist",
      department: "Product",
      location: "London, UK",
      type: "Full-time",
      remote: true,
      posted: "3 days ago"
    },
    {
      title: "Data Scientist - Learning Analytics",
      department: "Data Science",
      location: "Berlin, Germany",
      type: "Full-time",
      remote: true,
      posted: "1 day ago"
    },
    {
      title: "Frontend Engineer",
      department: "Engineering",
      location: "Toronto, Canada",
      type: "Full-time",
      remote: true,
      posted: "4 days ago"
    },
    {
      title: "Customer Success Manager - Higher Education",
      department: "Customer Success",
      location: "Singapore",
      type: "Full-time",
      remote: false,
      posted: "1 week ago"
    },
    {
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "Austin, TX",
      type: "Full-time",
      remote: true,
      posted: "3 days ago"
    }
  ];
  
  const teamMembers = [
    {
      name: "Dr. Emily Chen",
      role: "Co-Founder & CEO",
      bio: "Former education researcher with a passion for making quality education accessible to all. Emily leads our mission to transform learning through AI.",
      image: "https://randomuser.me/api/portraits/women/42.jpg"
    },
    {
      name: "Marcus Johnson",
      role: "Co-Founder & CTO",
      bio: "AI engineer with a background in machine learning and educational technology. Marcus leads our engineering team in building adaptive learning systems.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Dr. Sarah Patel",
      role: "Chief Learning Officer",
      bio: "Learning scientist with expertise in cognitive psychology and educational research. Sarah ensures our platform is built on sound pedagogical principles.",
      image: "https://randomuser.me/api/portraits/women/57.jpg"
    },
    {
      name: "James Wilson",
      role: "Chief Product Officer",
      bio: "Former educator turned product leader. James combines classroom experience with product expertise to create intuitive learning experiences.",
      image: "https://randomuser.me/api/portraits/men/86.jpg"
    }
  ];

  // Custom icon components
  function LightbulbIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    );
  }

  function AwardIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    );
  }

  function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }

  function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    );
  }

  function HandsHelpingIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M14 11a1 1 0 0 1 1 1c0 1 .5 1.5 2 1.5s2-.5 2-1.5V10c0-.5-.5-1-1-1h-1v-1a2 2 0 0 0-2-2v0" />
        <path d="M7 10v1a5 5 0 0 0 5 5m-5-5h5" />
      </svg>
    );
  }

  function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  }

  function GraduationCapIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    );
  }

  function DollarSignIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
  }

  function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    );
  }

  function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    );
  }

  function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }

  function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    );
  }

  function MapIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    );
  }

  function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }

  function LayoutIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    );
  }

  function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    );
  }

  function BookOpenIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    );
  }

  function PenToolIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="m12 19 7-7 3 3-7 7-3-3z" />
        <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="m2 2 7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    );
  }

  function HeartHandshakeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
        <path d="m18 15-2-2" />
        <path d="m15 18-2-2" />
      </svg>
    );
  }

  function Globe(props: { className: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }

  function Users(props: { className: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/" className="text-indigo-100 hover:text-white text-sm">Home</Link>
            <ChevronRight className="h-4 w-4 text-indigo-200" />
            <span className="text-white text-sm">Careers</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Join Our Mission</h1>
              <p className="text-indigo-100 text-xl mb-8">
                Help us transform education through AI-powered personalized learning experiences. Build a career with purpose at LearnAI.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#positions" className="bg-white text-indigo-700 hover:bg-indigo-50 font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-lg flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  View Open Positions
                </a>
                <a href="#team" className="bg-indigo-700/30 text-white hover:bg-indigo-700/50 font-medium px-6 py-3 rounded-lg transition-all duration-300 backdrop-blur-sm border border-indigo-400/30">
                  Meet Our Team
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-amber-400 rounded-lg opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-500 rounded-lg opacity-20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
                  alt="Team collaboration" 
                  className="relative z-10 rounded-xl shadow-2xl border-4 border-white/20 object-cover h-80 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto max-w-5xl px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-lg border border-indigo-100 grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
          {careerStats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-full p-3 mb-3">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-indigo-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Mission */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Our Mission & Values</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            At LearnAI, we're on a mission to democratize education by creating adaptive, personalized learning experiences that help every student reach their full potential.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {coreValues.slice(0, 3).map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 hover:shadow-lg transition-all duration-300">
              <div className="bg-indigo-100 p-3 rounded-full inline-block mb-4">
                <value.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.slice(3).map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 hover:shadow-lg transition-all duration-300">
              <div className="bg-indigo-100 p-3 rounded-full inline-block mb-4">
                <value.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Life at LearnAI */}
      <div className="bg-indigo-50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Life at LearnAI</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We've built a collaborative, inclusive culture where creativity and innovation thrive. Discover what makes working at LearnAI special.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden shadow-md h-64 md:h-auto relative">
              <img 
                src="https://images.unsplash.com/photo-1565531185009-529e096e6986?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Team collaboration" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-md h-64 md:h-auto relative">
              <img 
                src="https://images.unsplash.com/photo-1540317580384-e5d43867cfd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Office space" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-md h-64 md:h-auto relative">
              <img 
                src="https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80" 
                alt="Team event" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-md border border-indigo-100 overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-indigo-900 mb-4">A Culture of Growth & Impact</h3>
                <p className="text-gray-600 mb-6">
                  At LearnAI, we foster a culture where innovation, collaboration, and continuous learning are at the core of everything we do. We believe that by bringing together diverse perspectives and talents, we can create transformative educational experiences that change lives.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Work on challenging problems with meaningful impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Collaborate with world-class experts in AI, education, and product development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Continuous learning through workshops, conferences, and dedicated growth time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Inclusive environment that celebrates diverse backgrounds and perspectives</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-64 md:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
                  alt="Team working together" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits & Perks */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Benefits & Perks</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We offer comprehensive benefits designed to support your well-being, professional growth, and work-life balance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300">
              <div className="bg-indigo-100 p-3 rounded-full inline-block mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-indigo-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meet Our Team */}
      <div id="team" className="bg-indigo-50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Get to know the passionate individuals leading our mission to transform education through technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-indigo-100 hover:shadow-lg transition-all duration-300">
                <div className="h-48 relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-indigo-900">{member.name}</h3>
                  <p className="text-indigo-600 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Meet the Full Team
            </Button>
          </div>
        </div>
      </div>

      {/* Departments */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Explore Our Departments</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Discover the diverse teams that make LearnAI's mission possible and find where your skills and passions align.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
              <div className="bg-indigo-100 p-3 rounded-full inline-block mb-4">
                {dept.icon}
              </div>
              <h3 className="font-bold text-indigo-900 mb-2">{dept.name}</h3>
              <p className="text-gray-600 text-sm mb-6 flex-grow">{dept.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <Badge className="bg-indigo-100 text-indigo-700">
                  {dept.openPositions} Open Positions
                </Badge>
                <Button variant="ghost" className="p-0 h-auto text-indigo-600 hover:text-indigo-800">
                  View
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div id="positions" className="bg-indigo-50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Current Openings</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Explore our open positions and find the perfect role to grow your career while making an impact in education.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/3">
              <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6 sticky top-6">
                <h3 className="font-bold text-lg text-indigo-900 mb-4">Filter By</h3>
                
                <div className="mb-4">
                  <h4 className="font-medium text-indigo-900 mb-2">Department</h4>
                  <div className="space-y-2">
                    {['All Departments', 'Engineering', 'Product', 'Data Science', 'Education', 'Design', 'Marketing', 'Customer Success'].map((dept, index) => (
                      <div key={index} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`dept-${index}`} 
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          defaultChecked={index === 0}
                        />
                        <label htmlFor={`dept-${index}`} className="ml-2 text-sm text-gray-700">
                          {dept}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-indigo-900 mb-2">Location</h4>
                  <div className="space-y-2">
                    {['All Locations', 'Remote', 'San Francisco, CA', 'New York, NY', 'Boston, MA', 'London, UK', 'Berlin, Germany', 'Singapore'].map((loc, index) => (
                      <div key={index} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`loc-${index}`} 
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          defaultChecked={index === 0}
                        />
                        <label htmlFor={`loc-${index}`} className="ml-2 text-sm text-gray-700">
                          {loc}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-indigo-900 mb-2">Job Type</h4>
                  <div className="space-y-2">
                    {['All Types', 'Full-time', 'Part-time', 'Contract', 'Internship'].map((type, index) => (
                      <div key={index} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`type-${index}`} 
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          defaultChecked={index === 0}
                        />
                        <label htmlFor={`type-${index}`} className="ml-2 text-sm text-gray-700">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6 mb-6">
                <Input 
                  placeholder="Search positions..." 
                  className="border-indigo-200 focus-visible:ring-indigo-500"
                />
              </div>
              
              <div className="space-y-4">
                {openPositions.map((position, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6 hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg text-indigo-900">{position.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <Badge variant="outline" className="bg-indigo-50 border-indigo-100 text-indigo-700">
                            {position.department}
                          </Badge>
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                            {position.location}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                            {position.type}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500 text-sm">Posted {position.posted}</span>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                    
                    {position.remote && (
                      <div className="mt-3 inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        <Check className="h-3 w-3 mr-1" />
                        Remote Eligible
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                  View All Open Positions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hiring Process */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Our Hiring Process</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We've designed a thoughtful interview process that helps us get to know you while giving you insight into our team, culture, and the work you'd be doing.
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-[50%] top-8 bottom-8 w-0.5 bg-indigo-200 hidden md:block"></div>
          
          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Application Review</h3>
                <p className="text-gray-700">
                  Our team carefully reviews your application, resume, and any additional materials to assess your qualifications and potential fit.
                </p>
              </div>
              <div className="relative md:w-0 order-1 md:order-2 pb-8 md:pb-0">
                <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 relative mx-auto">1</div>
              </div>
              <div className="md:w-1/2 md:pl-12 order-3 hidden md:block opacity-0">
                {/* Spacer for symmetry */}
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 order-2 hidden md:block opacity-0">
                {/* Spacer for symmetry */}
              </div>
              <div className="relative md:w-0 order-1 pb-8 md:pb-0">
                <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 relative mx-auto">2</div>
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left order-3">
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Initial Interview</h3>
                <p className="text-gray-700">
                  A conversation with a recruiter to learn more about your background, experience, and what you're looking for in your next role.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Skills Assessment</h3>
                <p className="text-gray-700">
                  Depending on the role, you may complete a take-home assignment or technical interview to showcase your relevant skills and approach to problem-solving.
                </p>
              </div>
              <div className="relative md:w-0 order-1 md:order-2 pb-8 md:pb-0">
                <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 relative mx-auto">3</div>
              </div>
              <div className="md:w-1/2 md:pl-12 order-3 hidden md:block opacity-0">
                {/* Spacer for symmetry */}
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 order-2 hidden md:block opacity-0">
                {/* Spacer for symmetry */}
              </div>
              <div className="relative md:w-0 order-1 pb-8 md:pb-0">
                <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 relative mx-auto">4</div>
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left order-3">
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Team Interviews</h3>
                <p className="text-gray-700">
                  Meet with potential teammates and cross-functional partners to dive deeper into your experience and how you'd contribute to our mission.
                </p>
              </div>
            </div>
            
            {/* Step 5 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Final Interview</h3>
                <p className="text-gray-700">
                  A conversation with a senior leader to discuss your career goals, align on expectations, and address any remaining questions you have.
                </p>
              </div>
              <div className="relative md:w-0 order-1 md:order-2 pb-8 md:pb-0">
                <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 relative mx-auto">5</div>
              </div>
              <div className="md:w-1/2 md:pl-12 order-3 hidden md:block opacity-0">
                {/* Spacer for symmetry */}
              </div>
            </div>
            
            {/* Step 6 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 order-2 hidden md:block opacity-0">
                {/* Spacer for symmetry */}
              </div>
              <div className="relative md:w-0 order-1 pb-0">
                <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 relative mx-auto">6</div>
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left order-3">
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Offer & Onboarding</h3>
                <p className="text-gray-700">
                  If there's a mutual fit, we'll extend an offer and work closely with you to ensure a smooth transition to LearnAI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="bg-indigo-800 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-indigo-900">Connect With Us</h2>
                </div>
                <p className="text-gray-700 mb-6">
                  Have questions about careers at LearnAI? Want to learn more about our teams or the interview process? Our recruiting team is here to help.
                </p>
                <div className="space-y-5 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-full mt-1 shrink-0">
                      <Mail className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-indigo-900 mb-1">Recruiting Team</h3>
                      <p className="text-gray-600 text-sm mb-1">For questions about open positions and hiring</p>
                      <a href="mailto:careers@learnai.example" className="text-indigo-600 text-sm hover:text-indigo-800">
                        careers@learnai.example
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-full mt-1 shrink-0">
                      <Building className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-indigo-900 mb-1">Campus Recruiting</h3>
                      <p className="text-gray-600 text-sm mb-1">For university students and recent graduates</p>
                      <a href="mailto:campus@learnai.example" className="text-indigo-600 text-sm hover:text-indigo-800">
                        campus@learnai.example
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                  <h3 className="font-semibold text-indigo-900 mb-2 flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-amber-500" />
                    Don't see the perfect role?
                  </h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Join our talent community to stay updated on new opportunities that match your skills and interests.
                  </p>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">
                    Join Talent Community
                  </Button>
                </div>
              </div>
              <div className="relative hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Team meeting" 
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-indigo-800/70">
                  <div className="absolute bottom-10 left-10 max-w-xs">
                    <blockquote className="text-white text-lg font-medium italic">
                      "Joining LearnAI was one of the best decisions of my career. The mission, the people, and the challenges make this a truly special place to work."
                    </blockquote>
                    <p className="text-indigo-200 mt-4">- James, Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Find answers to common questions about careers at LearnAI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-3">What does the interview process look like?</h3>
            <p className="text-gray-700">
              Our interview process typically includes an initial screening, technical or skills assessment, and team interviews. The exact steps vary by role, but we aim to make the process thorough yet efficient, usually completing within 2-3 weeks.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-3">Do you offer remote work options?</h3>
            <p className="text-gray-700">
              Yes! Many of our roles are remote-friendly. We have team members across the globe and embrace a flexible approach to work location. Some roles may require occasional in-office collaboration at one of our global hubs.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-3">How do you support professional development?</h3>
            <p className="text-gray-700">
              We provide a generous learning budget, internal mentorship programs, regular knowledge-sharing sessions, and opportunities to attend industry conferences. We also encourage lateral moves within the company to broaden your skills.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-3">What's your approach to diversity and inclusion?</h3>
            <p className="text-gray-700">
              We're committed to building diverse teams that reflect the global community we serve. We have active employee resource groups, inclusive hiring practices, and ongoing D&I education. We believe diverse perspectives drive innovation and better solutions.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-3">Do you offer internships or entry-level roles?</h3>
            <p className="text-gray-700">
              Yes! We have internship programs throughout the year and actively recruit recent graduates. These programs provide mentorship, meaningful projects, and a clear path to potential full-time opportunities.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-3">What's the work culture like at LearnAI?</h3>
            <p className="text-gray-700">
              We foster a collaborative, mission-driven environment where innovation is encouraged. We value work-life balance, celebrate wins together, and embrace a growth mindset. Our teams are supportive, passionate, and focused on making a positive impact.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Join Our Mission?</h2>
          <p className="text-indigo-100 text-xl mb-8 max-w-2xl mx-auto">
            Help us revolutionize education through AI and make an impact on learners worldwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#positions" className="bg-white text-indigo-700 hover:bg-indigo-50 font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-lg">
              Explore Open Positions
            </a>
            <Button variant="outline" className="border-white text-white hover:bg-indigo-700/50">
              Join Talent Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}