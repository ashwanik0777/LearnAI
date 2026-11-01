'use client';

import Link from "next/link";
import { 
  GraduationCap, Mail, MapPin, PhoneCall, Facebook, Twitter, Instagram, Youtube, Linkedin,
  BookOpen, ChevronRight, ShieldCheck, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Newsletter subscription */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-2/3">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Stay Up to Date</h3>
              <p className="text-slate-400">Subscribe to our newsletter for the latest educational insights, learning tips, and platform updates.</p>
            </div>
            <div className="w-full md:w-1/3 flex space-x-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-500 focus-visible:ring-blue-500"
              />
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold border-none transition-colors">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Upper footer with columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center mb-5">
              <div className="bg-blue-600 p-2.5 rounded-xl mr-2.5 shadow-sm">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">LEARNAI</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-5">
              LearnAI is an adaptive learning platform that personalizes education for students at all academic levels. Our mission is to make quality education accessible and tailored to individual learning styles.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-400 transition-colors border border-slate-700">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-400 transition-colors border border-slate-700">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-400 transition-colors border border-slate-700">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-400 transition-colors border border-slate-700">
                <Youtube className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-400 transition-colors border border-slate-700">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Column 2 - Learning Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-amber-500" />
              Learning Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/courses" className="text-slate-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-slate-600" />
                  Courses & Programs
                </Link>
              </li>
              <li>
                <Link href="/planner" className="text-slate-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-slate-600" />
                  Study Planner
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-slate-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-slate-600" />
                  Resource Library
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-slate-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-slate-600" />
                  Progress Analytics
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-slate-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-slate-600" />
                  Achievements & Badges
                </Link>
              </li>
              <li>
                <Link href="/recommendations" className="text-slate-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-slate-600" />
                  AI Recommendations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Data & Policies */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-amber-500" />
              Data & Policies
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-slate-600" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-slate-600" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/data-usage" className="text-slate-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-slate-600" />
                  Data Usage Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-slate-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-slate-600" />
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-slate-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-slate-600" />
                  Security Measures
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-slate-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-slate-600" />
                  Accessibility Statement
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact & Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-amber-500" />
              Contact & Support
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-tight">
                  123 Education Avenue<br />
                  Knowledge City, KS 12345<br />
                  United States
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall className="h-5 w-5 text-amber-500 mr-2 shrink-0" />
                <span className="text-slate-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-amber-500 mr-2 shrink-0" />
                <span className="text-slate-400">support@learnai.example</span>
              </li>
              <li className="mt-4">
                <Link href="/help" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white flex items-center justify-center transition-colors border border-slate-700 text-sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Visit Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-slate-800 my-8" />

        {/* Additional Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
          <Link href="/about-us" className="text-xs text-slate-400 hover:text-white transition-colors">About Us</Link>
          <Link href="/careers" className="text-xs text-slate-400 hover:text-white transition-colors">Careers</Link>
          <Link href="/blog" className="text-xs text-slate-400 hover:text-white transition-colors">Blog</Link>
          <Link href="/press" className="text-xs text-slate-400 hover:text-white transition-colors">Press</Link>
          <Link href="/partnerships" className="text-xs text-slate-400 hover:text-white transition-colors">Partnerships</Link>
          <Link href="/investors" className="text-xs text-slate-400 hover:text-white transition-colors">Investors</Link>
          <Link href="/sitemap" className="text-xs text-slate-400 hover:text-white transition-colors">Sitemap</Link>
        </div>

        {/* Lower footer - Copyright */}
        <div className="text-center text-xs text-slate-500">
          <p>© {currentYear} LearnAI Education Technologies. All rights reserved.</p>
          <p className="mt-2 max-w-2xl mx-auto">
            Designed & Developed for Modern Students
          </p>
        </div>
      </div>
    </footer>
  );
}