'use client';

import { ChevronRight, FileText, Home, Layers, Users, Settings, School, BookOpen, Award, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Sitemap() {
  const sitemapSections = [
    {
      title: "Main Navigation",
      icon: <Home className="h-5 w-5 text-indigo-600" />,
      links: [
        { title: "Home", url: "/" },
        { title: "Dashboard", url: "/" },
        { title: "Courses", url: "/courses" },
        { title: "Study Planner", url: "/planner" },
        { title: "Resource Library", url: "/resources" },
        { title: "Progress Analytics", url: "/progress" },
        { title: "Recommendations", url: "/recommendations" },
        { title: "Achievements", url: "/achievements" },
      ]
    },
    {
      title: "User Account",
      icon: <Users className="h-5 w-5 text-indigo-600" />,
      links: [
        { title: "Login", url: "/login" },
        { title: "Register", url: "/register" },
        { title: "Profile", url: "/profile" },
        { title: "Settings", url: "/settings" },
        { title: "Help", url: "/help" },
      ]
    },
    {
      title: "About LearnAI",
      icon: <School className="h-5 w-5 text-indigo-600" />,
      links: [
        { title: "About Us", url: "/about-us" },
        { title: "Our Mission", url: "/about-us#mission" },
        { title: "Leadership Team", url: "/about-us#team" },
        { title: "Careers", url: "/careers" },
        { title: "Contact Us", url: "/about-us#contact" },
      ]
    },
    {
      title: "Resources",
      icon: <BookOpen className="h-5 w-5 text-indigo-600" />,
      links: [
        { title: "Blog", url: "/blog" },
        { title: "Tutorials", url: "/resources" },
        { title: "Webinars", url: "/resources#webinars" },
        { title: "Learning Guides", url: "/resources#guides" },
        { title: "Video Library", url: "/resources#videos" },
      ]
    },
    {
      title: "Legal & Privacy",
      icon: <FileText className="h-5 w-5 text-indigo-600" />,
      links: [
        { title: "Privacy Policy", url: "/privacy-policy" },
        { title: "Terms of Service", url: "/terms" },
        { title: "Data Usage Policy", url: "/data-usage" },
        { title: "Cookie Policy", url: "/cookie-policy" },
        { title: "Security Measures", url: "/security" },
        { title: "Accessibility Statement", url: "/accessibility" },
      ]
    },
    {
      title: "Business",
      icon: <Layers className="h-5 w-5 text-indigo-600" />,
      links: [
        { title: "Partnerships", url: "/partnerships" },
        { title: "Investor Relations", url: "/investors" },
        { title: "Press", url: "/press" },
        { title: "For Schools", url: "/partnerships#schools" },
        { title: "For Businesses", url: "/partnerships#business" },
      ]
    },
    {
      title: "Community",
      icon: <Award className="h-5 w-5 text-indigo-600" />,
      links: [
        { title: "Student Stories", url: "/blog/category/student-stories" },
        { title: "Educator Spotlight", url: "/blog/category/educator-spotlight" },
        { title: "Events", url: "/events" },
        { title: "Feedback & Suggestions", url: "/feedback" },
      ]
    },
    {
      title: "Support",
      icon: <Settings className="h-5 w-5 text-indigo-600" />,
      links: [
        { title: "Help Center", url: "/help" },
        { title: "FAQs", url: "/help#faqs" },
        { title: "Troubleshooting", url: "/help#troubleshooting" },
        { title: "Contact Support", url: "/help#contact" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/" className="text-indigo-100 hover:text-white text-sm">Home</Link>
            <ChevronRight className="h-4 w-4 text-indigo-200" />
            <span className="text-white text-sm">Sitemap</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Sitemap</h1>
          <p className="text-indigo-100 md:text-xl max-w-2xl">
            Find everything on the LearnAI platform with our comprehensive site directory.
          </p>
          
          {/* Search */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
              <Input 
                placeholder="Search the site..." 
                className="pl-10 bg-white/10 border-indigo-400/30 text-white placeholder:text-indigo-200 focus-visible:ring-indigo-400"
              />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-md bg-indigo-700 hover:bg-indigo-600 text-white border-none h-9 px-4">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sitemap Content */}
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {sitemapSections.map((section, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                {section.icon}
                <h2 className="font-bold text-lg text-indigo-900">{section.title}</h2>
              </div>
              <ul className="space-y-2 pl-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="text-gray-700 hover:text-indigo-700 transition-colors duration-200">
                    <Link href={link.url} className="flex items-center py-1 hover:translate-x-1 transition-transform duration-300">
                      <ChevronRight className="h-3 w-3 mr-1 text-indigo-400" />
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* All Pages Alphabetical */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-indigo-900">Alphabetical Index</h2>
            <p className="text-gray-600">All pages sorted alphabetically for easy reference</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
            <div className="flex flex-wrap gap-1 md:gap-2 mb-6 justify-center">
              {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                <a 
                  key={letter} 
                  href={`#letter-${letter}`} 
                  className="w-8 h-8 flex items-center justify-center rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-sm transition-colors duration-200"
                >
                  {letter}
                </a>
              ))}
            </div>
            
            <Separator className="mb-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div id="letter-A" className="bg-indigo-50 px-3 py-1 rounded-md mb-2">
                  <h3 className="font-semibold text-indigo-900">A</h3>
                </div>
                <ul className="space-y-1 pl-2 mb-6">
                  <li><Link href="/about-us" className="text-gray-700 hover:text-indigo-700">About Us</Link></li>
                  <li><Link href="/accessibility" className="text-gray-700 hover:text-indigo-700">Accessibility Statement</Link></li>
                  <li><Link href="/achievements" className="text-gray-700 hover:text-indigo-700">Achievements</Link></li>
                </ul>
                
                <div id="letter-B" className="bg-indigo-50 px-3 py-1 rounded-md mb-2">
                  <h3 className="font-semibold text-indigo-900">B</h3>
                </div>
                <ul className="space-y-1 pl-2 mb-6">
                  <li><Link href="/blog" className="text-gray-700 hover:text-indigo-700">Blog</Link></li>
                </ul>
                
                <div id="letter-C" className="bg-indigo-50 px-3 py-1 rounded-md mb-2">
                  <h3 className="font-semibold text-indigo-900">C</h3>
                </div>
                <ul className="space-y-1 pl-2 mb-6">
                  <li><Link href="/careers" className="text-gray-700 hover:text-indigo-700">Careers</Link></li>
                  <li><Link href="/cookie-policy" className="text-gray-700 hover:text-indigo-700">Cookie Policy</Link></li>
                  <li><Link href="/courses" className="text-gray-700 hover:text-indigo-700">Courses</Link></li>
                </ul>
                
                <div id="letter-D" className="bg-indigo-50 px-3 py-1 rounded-md mb-2">
                  <h3 className="font-semibold text-indigo-900">D</h3>
                </div>
                <ul className="space-y-1 pl-2 mb-6">
                  <li><Link href="/" className="text-gray-700 hover:text-indigo-700">Dashboard</Link></li>
                  <li><Link href="/data-usage" className="text-gray-700 hover:text-indigo-700">Data Usage Policy</Link></li>
                </ul>
              </div>
              
              <div>
                <div id="letter-E" className="bg-indigo-50 px-3 py-1 rounded-md mb-2">
                  <h3 className="font-semibold text-indigo-900">E - H</h3>
                </div>
                <ul className="space-y-1 pl-2 mb-6">
                  <li><Link href="/events" className="text-gray-700 hover:text-indigo-700">Events</Link></li>
                  <li><Link href="/feedback" className="text-gray-700 hover:text-indigo-700">Feedback & Suggestions</Link></li>
                  <li><Link href="/help" className="text-gray-700 hover:text-indigo-700">Help Center</Link></li>
                </ul>
                
                <div id="letter-I" className="bg-indigo-50 px-3 py-1 rounded-md mb-2">
                  <h3 className="font-semibold text-indigo-900">I - L</h3>
                </div>
                <ul className="space-y-1 pl-2 mb-6">
                  <li><Link href="/investors" className="text-gray-700 hover:text-indigo-700">Investor Relations</Link></li>
                  <li><Link href="/login" className="text-gray-700 hover:text-indigo-700">Login</Link></li>
                </ul>
                
                <div id="letter-P" className="bg-indigo-50 px-3 py-1 rounded-md mb-2">
                  <h3 className="font-semibold text-indigo-900">P</h3>
                </div>
                <ul className="space-y-1 pl-2 mb-6">
                  <li><Link href="/partnerships" className="text-gray-700 hover:text-indigo-700">Partnerships</Link></li>
                  <li><Link href="/planner" className="text-gray-700 hover:text-indigo-700">Planner</Link></li>
                  <li><Link href="/press" className="text-gray-700 hover:text-indigo-700">Press</Link></li>
                  <li><Link href="/privacy-policy" className="text-gray-700 hover:text-indigo-700">Privacy Policy</Link></li>
                  <li><Link href="/profile" className="text-gray-700 hover:text-indigo-700">Profile</Link></li>
                  <li><Link href="/progress" className="text-gray-700 hover:text-indigo-700">Progress Analytics</Link></li>
                </ul>
              </div>
              
              <div>
                <div id="letter-R" className="bg-indigo-50 px-3 py-1 rounded-md mb-2">
                  <h3 className="font-semibold text-indigo-900">R</h3>
                </div>
                <ul className="space-y-1 pl-2 mb-6">
                  <li><Link href="/recommendations" className="text-gray-700 hover:text-indigo-700">Recommendations</Link></li>
                  <li><Link href="/register" className="text-gray-700 hover:text-indigo-700">Register</Link></li>
                  <li><Link href="/resources" className="text-gray-700 hover:text-indigo-700">Resource Library</Link></li>
                </ul>
                
                <div id="letter-S" className="bg-indigo-50 px-3 py-1 rounded-md mb-2">
                  <h3 className="font-semibold text-indigo-900">S</h3>
                </div>
                <ul className="space-y-1 pl-2 mb-6">
                  <li><Link href="/security" className="text-gray-700 hover:text-indigo-700">Security Measures</Link></li>
                  <li><Link href="/settings" className="text-gray-700 hover:text-indigo-700">Settings</Link></li>
                  <li><Link href="/sitemap" className="text-gray-700 hover:text-indigo-700">Sitemap</Link></li>
                </ul>
                
                <div id="letter-T" className="bg-indigo-50 px-3 py-1 rounded-md mb-2">
                  <h3 className="font-semibold text-indigo-900">T - Z</h3>
                </div>
                <ul className="space-y-1 pl-2">
                  <li><Link href="/terms" className="text-gray-700 hover:text-indigo-700">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-indigo-50 py-10">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-indigo-900">Quick Links</h2>
            <p className="text-gray-600">Popular destinations on our platform</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/login" className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-3">
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="text-indigo-900 font-medium">Login / Register</span>
            </Link>
            
            <Link href="/courses" className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-3">
                <BookOpen className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="text-indigo-900 font-medium">Courses</span>
            </Link>
            
            <Link href="/planner" className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-3">
                <Layers className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="text-indigo-900 font-medium">Study Planner</span>
            </Link>
            
            <Link href="/help" className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-3">
                <Settings className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="text-indigo-900 font-medium">Help Center</span>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-8 text-center">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Couldn't Find What You're Looking For?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Our support team is here to help you navigate the LearnAI platform and find exactly what you need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Contact Support
            </Button>
            <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              Visit Help Center
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}