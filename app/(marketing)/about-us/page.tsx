'use client';

import { ChevronRight, Users, Target, TrendingUp, Award, GraduationCap, Zap, Lightbulb, Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/" className="text-indigo-100 hover:text-white text-sm">Home</Link>
            <ChevronRight className="h-4 w-4 text-indigo-200" />
            <span className="text-white text-sm">About Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Reimagining Education <br className="hidden md:block" />Through AI</h1>
          <p className="text-indigo-100 text-xl max-w-2xl">
            We're on a mission to make quality education accessible to everyone through the power of artificial intelligence and personalized learning.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block mb-4 bg-indigo-100 px-4 py-1 rounded-full">
              <span className="text-indigo-800 font-medium text-sm">OUR STORY</span>
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">From Vision to Reality</h2>
            <p className="text-gray-700 mb-4">
              LearnAI was founded in 2022 by a team of educators, AI researchers, and technologists who shared a common vision: 
              to transform education by making it more personalized, effective, and accessible.
            </p>
            <p className="text-gray-700 mb-4">
              We recognized that traditional education often falls short in addressing the unique learning needs of each student. 
              Our founding team set out to leverage the power of artificial intelligence to create an adaptive learning platform 
              that could understand and respond to individual learning patterns.
            </p>
            <p className="text-gray-700">
              Today, LearnAI serves students from elementary school to postgraduate levels, providing personalized educational 
              experiences that adapt to individual learning styles, pace, and preferences.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-400 rounded-lg opacity-20"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-500 rounded-lg opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80" 
              alt="Students collaborating" 
              className="rounded-xl shadow-xl w-full h-auto relative z-10 object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </div>

      {/* Our Mission & Values */}
      <div className="bg-indigo-50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 bg-indigo-100 px-4 py-1 rounded-full">
              <span className="text-indigo-800 font-medium text-sm">OUR MISSION & VALUES</span>
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">What Drives Us Forward</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              At LearnAI, we're guided by a set of core values that inform everything we do, from product 
              development to customer support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-indigo-100 bg-white shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="rounded-full bg-amber-100 w-14 h-14 flex items-center justify-center mb-4">
                  <Target className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="font-bold text-indigo-900 text-xl mb-2">Our Mission</h3>
                <p className="text-gray-700 text-sm">
                  To democratize education by providing personalized, adaptive learning experiences that help every student 
                  reach their full potential, regardless of background or circumstance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-indigo-100 bg-white shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="rounded-full bg-indigo-100 w-14 h-14 flex items-center justify-center mb-4">
                  <TrendingUp className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="font-bold text-indigo-900 text-xl mb-2">Our Vision</h3>
                <p className="text-gray-700 text-sm">
                  A world where every learner has access to high-quality, personalized education that adapts to their 
                  unique needs, helping them acquire knowledge, skills, and confidence to succeed.
                </p>
              </CardContent>
            </Card>

            <Card className="border-indigo-100 bg-white shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="rounded-full bg-green-100 w-14 h-14 flex items-center justify-center mb-4">
                  <Award className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="font-bold text-indigo-900 text-xl mb-2">Our Impact</h3>
                <p className="text-gray-700 text-sm">
                  Since our founding, we've helped over 500,000 students improve their learning outcomes, with an average 
                  increase of 32% in subject mastery compared to traditional learning methods.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-indigo-900">Student-Centered</h4>
              </div>
              <p className="text-gray-700 text-sm">We put learners first in everything we do, designing our platform around their needs.</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <Brain className="h-5 w-5 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-indigo-900">Innovation</h4>
              </div>
              <p className="text-gray-700 text-sm">We constantly push the boundaries of what's possible in education technology.</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-indigo-900">Adaptability</h4>
              </div>
              <p className="text-gray-700 text-sm">We believe in flexible, personalized learning that adapts to each student's needs.</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-indigo-900">Inclusivity</h4>
              </div>
              <p className="text-gray-700 text-sm">We create accessible educational experiences for learners of all backgrounds and abilities.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 bg-indigo-100 px-4 py-1 rounded-full">
            <span className="text-indigo-800 font-medium text-sm">OUR LEADERSHIP</span>
          </div>
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Meet Our Team</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Our diverse leadership team brings together expertise in education, artificial intelligence, and technology to drive our mission forward.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-indigo-50">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 h-24 relative"></div>
            <div className="px-6 pb-6 text-center">
              <Avatar className="w-20 h-20 border-4 border-white shadow-md relative -mt-10 mx-auto">
                <AvatarImage src="https://randomuser.me/api/portraits/women/42.jpg" alt="Dr. Emily Chen" />
                <AvatarFallback className="bg-indigo-100 text-indigo-700">EC</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-xl text-indigo-900 mt-4">Dr. Emily Chen</h3>
              <p className="text-indigo-600 font-medium text-sm mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                Former education researcher and AI specialist with a passion for transforming how we learn.
              </p>
            </div>
          </div>
          
          {/* Team Member 2 */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-indigo-50">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 h-24 relative"></div>
            <div className="px-6 pb-6 text-center">
              <Avatar className="w-20 h-20 border-4 border-white shadow-md relative -mt-10 mx-auto">
                <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="Marcus Johnson" />
                <AvatarFallback className="bg-indigo-100 text-indigo-700">MJ</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-xl text-indigo-900 mt-4">Marcus Johnson</h3>
              <p className="text-indigo-600 font-medium text-sm mb-3">CTO</p>
              <p className="text-gray-600 text-sm">
                AI engineer with extensive experience in machine learning and educational technology.
              </p>
            </div>
          </div>
          
          {/* Team Member 3 */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-indigo-50">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 h-24 relative"></div>
            <div className="px-6 pb-6 text-center">
              <Avatar className="w-20 h-20 border-4 border-white shadow-md relative -mt-10 mx-auto">
                <AvatarImage src="https://randomuser.me/api/portraits/women/65.jpg" alt="Dr. Sophia Rodriguez" />
                <AvatarFallback className="bg-indigo-100 text-indigo-700">SR</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-xl text-indigo-900 mt-4">Dr. Sophia Rodriguez</h3>
              <p className="text-indigo-600 font-medium text-sm mb-3">Chief Learning Officer</p>
              <p className="text-gray-600 text-sm">
                Educational psychologist focused on optimizing learning outcomes through technology.
              </p>
            </div>
          </div>
          
          {/* Team Member 4 */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-indigo-50">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 h-24 relative"></div>
            <div className="px-6 pb-6 text-center">
              <Avatar className="w-20 h-20 border-4 border-white shadow-md relative -mt-10 mx-auto">
                <AvatarImage src="https://randomuser.me/api/portraits/men/82.jpg" alt="David Kim" />
                <AvatarFallback className="bg-indigo-100 text-indigo-700">DK</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-xl text-indigo-900 mt-4">David Kim</h3>
              <p className="text-indigo-600 font-medium text-sm mb-3">Chief Product Officer</p>
              <p className="text-gray-600 text-sm">
                Product leader focused on creating intuitive, engaging educational experiences.
              </p>
            </div>
          </div>
          
          {/* Team Member 5 */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-indigo-50">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 h-24 relative"></div>
            <div className="px-6 pb-6 text-center">
              <Avatar className="w-20 h-20 border-4 border-white shadow-md relative -mt-10 mx-auto">
                <AvatarImage src="https://randomuser.me/api/portraits/women/22.jpg" alt="Aisha Patel" />
                <AvatarFallback className="bg-indigo-100 text-indigo-700">AP</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-xl text-indigo-900 mt-4">Aisha Patel</h3>
              <p className="text-indigo-600 font-medium text-sm mb-3">VP of Partnerships</p>
              <p className="text-gray-600 text-sm">
                Building relationships with educational institutions and content providers worldwide.
              </p>
            </div>
          </div>
          
          {/* Team Member 6 */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-indigo-50">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 h-24 relative"></div>
            <div className="px-6 pb-6 text-center">
              <Avatar className="w-20 h-20 border-4 border-white shadow-md relative -mt-10 mx-auto">
                <AvatarImage src="https://randomuser.me/api/portraits/men/67.jpg" alt="James Wilson" />
                <AvatarFallback className="bg-indigo-100 text-indigo-700">JW</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-xl text-indigo-900 mt-4">James Wilson</h3>
              <p className="text-indigo-600 font-medium text-sm mb-3">VP of Engineering</p>
              <p className="text-gray-600 text-sm">
                Leading our engineering teams to build robust, scalable educational technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Impact */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 py-16 text-white">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block mb-4 bg-indigo-700/50 px-4 py-1 rounded-full">
              <span className="text-indigo-200 font-medium text-sm">OUR IMPACT</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Making Education Better</h2>
            <p className="text-indigo-200 max-w-2xl mx-auto">
              We're proud of the difference we're making in education around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-400 mb-1">500K+</p>
              <p className="text-indigo-200 text-sm">Active Students</p>
            </div>
            
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-400 mb-1">150+</p>
              <p className="text-indigo-200 text-sm">Countries Reached</p>
            </div>
            
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-400 mb-1">32%</p>
              <p className="text-indigo-200 text-sm">Average Learning Improvement</p>
            </div>
            
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-400 mb-1">1,200+</p>
              <p className="text-indigo-200 text-sm">Educational Partners</p>
            </div>
          </div>
          
          <div className="bg-indigo-800/50 p-8 rounded-2xl backdrop-blur-sm border border-indigo-700">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-3">Join us in transforming education</h3>
                <p className="text-indigo-200">
                  Whether you're a student, educator, institution, or investor, there are many ways to be part of our mission to make quality education accessible to all.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <Link href="/careers" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg">
                  Join Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Location */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="inline-block mb-4 bg-indigo-100 px-4 py-1 rounded-full">
              <span className="text-indigo-800 font-medium text-sm">GET IN TOUCH</span>
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              Have questions about LearnAI? We'd love to hear from you. Reach out to our team using 
              the contact information below.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-full shrink-0 mt-1">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-indigo-900">General Inquiries</p>
                  <p className="text-gray-700">info@learnai.example</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-full shrink-0 mt-1">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-indigo-900">Educational Partnerships</p>
                  <p className="text-gray-700">partnerships@learnai.example</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-full shrink-0 mt-1">
                  <Target className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-indigo-900">Media Inquiries</p>
                  <p className="text-gray-700">press@learnai.example</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-indigo-900 mb-3">Headquarters</h3>
            <p className="text-gray-700">
              123 Education Avenue<br />
              Knowledge City, KS 12345<br />
              United States
            </p>
          </div>
          
          <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden">
            <img 
              src="https://maps.googleapis.com/maps/api/staticmap?center=37.7749,-122.4194&zoom=13&size=600x400&markers=color:red%7C37.7749,-122.4194&key=YOUR_API_KEY" 
              alt="Map" 
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-white text-xl font-semibold mb-1">Visit Us</h3>
                <p className="text-white/80 text-sm">Located in the heart of Knowledge City</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}