'use client';

import { ChevronRight, Search, Calendar, Clock, Tag, User, ArrowRight, MessageSquare, Share2, Bookmark, ChevronDown, CheckCircle as Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Blog() {
  const featuredPosts = [
    {
      id: 1,
      title: "The Future of AI in Education: Personalized Learning for All",
      excerpt: "How artificial intelligence is revolutionizing education by creating custom learning experiences tailored to individual student needs and learning styles.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      category: "Technology",
      author: {
        name: "Dr. Emily Chen",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        role: "Chief Learning Officer"
      },
      date: "March 15, 2025",
      readTime: "8 min read",
      tags: ["AI Education", "Personalization", "EdTech"]
    },
    {
      id: 2,
      title: "5 Learning Techniques Backed by Cognitive Science",
      excerpt: "Discover scientifically-proven learning methods that can significantly improve information retention and help you master new subjects more efficiently.",
      image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      category: "Learning Science",
      author: {
        name: "Prof. Marcus Johnson",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
        role: "Cognitive Science Researcher"
      },
      date: "March 8, 2025",
      readTime: "6 min read",
      tags: ["Learning Methods", "Study Tips", "Cognitive Science"]
    },
    {
      id: 3,
      title: "How Gamification Elements Boost Student Engagement",
      excerpt: "Exploring the powerful impact of game-based learning elements on student motivation, participation, and long-term knowledge retention.",
      image: "https://images.unsplash.com/photo-1511377107391-116a9d5d20b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      category: "Engagement",
      author: {
        name: "Sarah Williams",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        role: "Educational Game Designer"
      },
      date: "February 28, 2025",
      readTime: "5 min read",
      tags: ["Gamification", "Student Engagement", "Game-Based Learning"]
    }
  ];
  
  const recentPosts = [
    {
      id: 4,
      title: "The Role of Data Analytics in Measuring Student Progress",
      excerpt: "How educational institutions are using data to track student achievement and identify areas for instructional improvement.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      category: "Data",
      author: {
        name: "Daniel Lee",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      date: "March 12, 2025",
      readTime: "7 min read",
      tags: ["Data Analytics", "EdTech", "Student Progress"]
    },
    {
      id: 5,
      title: "Building Effective Study Habits for Lifelong Learning",
      excerpt: "Practical strategies to develop sustainable study routines that foster continuous learning throughout your lifetime.",
      image: "https://images.unsplash.com/photo-1550592704-6c76defa9985?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      category: "Productivity",
      author: {
        name: "Olivia Garcia",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      date: "March 10, 2025",
      readTime: "9 min read",
      tags: ["Study Habits", "Productivity", "Lifelong Learning"]
    },
    {
      id: 6,
      title: "The Benefits of Spaced Repetition in Language Learning",
      excerpt: "How the scientific technique of spaced repetition can dramatically improve vocabulary retention and language mastery.",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
      category: "Languages",
      author: {
        name: "Michael Torres",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg"
      },
      date: "March 5, 2025",
      readTime: "6 min read",
      tags: ["Language Learning", "Spaced Repetition", "Memory Techniques"]
    },
    {
      id: 7,
      title: "Mindfulness Practices for Improved Academic Performance",
      excerpt: "Research-backed mindfulness techniques that can help students reduce stress and enhance focus during study sessions.",
      image: "https://images.unsplash.com/photo-1470219556762-1771e7f9427d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
      category: "Wellness",
      author: {
        name: "Dr. Lisa Chen",
        avatar: "https://randomuser.me/api/portraits/women/66.jpg"
      },
      date: "March 1, 2025",
      readTime: "5 min read",
      tags: ["Mindfulness", "Academic Performance", "Student Wellness"]
    },
    {
      id: 8,
      title: "Collaborative Learning in Virtual Environments",
      excerpt: "Strategies for effective teamwork and knowledge sharing in online and hybrid learning settings.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      category: "Collaboration",
      author: {
        name: "Robert Kim",
        avatar: "https://randomuser.me/api/portraits/men/33.jpg"
      },
      date: "February 25, 2025",
      readTime: "8 min read",
      tags: ["Collaborative Learning", "Online Education", "Virtual Teams"]
    },
    {
      id: 9,
      title: "The Impact of Sleep Quality on Learning and Memory",
      excerpt: "How sleep affects cognitive functions and practical tips for optimizing sleep to enhance academic performance.",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80",
      category: "Health",
      author: {
        name: "Dr. James Wilson",
        avatar: "https://randomuser.me/api/portraits/men/86.jpg"
      },
      date: "February 20, 2025",
      readTime: "7 min read",
      tags: ["Sleep Science", "Memory", "Student Health"]
    }
  ];
  
  const popularTopics = [
    { name: "AI in Education", count: 42 },
    { name: "Study Techniques", count: 38 },
    { name: "Learning Science", count: 31 },
    { name: "Student Wellness", count: 27 },
    { name: "Educational Technology", count: 24 },
    { name: "Personalized Learning", count: 22 },
    { name: "Memory & Cognition", count: 19 },
    { name: "Online Learning", count: 18 }
  ];
  
  const categories = [
    "All Categories",
    "Technology",
    "Learning Science",
    "Productivity",
    "Student Success",
    "Teaching",
    "EdTech",
    "Research"
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
            <span className="text-white text-sm">Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">LearnAI Blog</h1>
          <p className="text-indigo-100 text-xl mb-8 max-w-2xl">
            Explore the latest insights, research, and trends in education, learning science, and educational technology.
          </p>
          
          {/* Search bar */}
          <div className="max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 py-6 bg-white/10 border-indigo-400/30 text-white placeholder:text-indigo-200 focus-visible:ring-amber-400"
              />
              <Button className="absolute right-1.5 top-1/2 transform -translate-y-1/2 rounded-md bg-indigo-800 hover:bg-indigo-900 text-white border-none h-9 px-4">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex overflow-x-auto py-6 hide-scrollbar gap-2">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className={index === 0 ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "border-indigo-200 text-indigo-700 hover:bg-indigo-50"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Posts */}
      <div className="container mx-auto max-w-5xl px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post, index) => (
            <Card key={post.id} className={`border-0 overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
              <div className="relative h-48 lg:h-60">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white">{post.category}</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6 border border-indigo-100">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-indigo-700 text-sm font-medium">{post.author.name}</span>
                </div>
                <h3 className="font-bold text-xl text-indigo-900 mb-2 hover:text-indigo-600 transition-colors duration-200">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent text-indigo-600 hover:text-indigo-800">
                    Read More
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left: Blog Posts */}
          <div className="md:col-span-2">
            <Tabs defaultValue="recent" className="w-full mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-indigo-900">Articles</h2>
                <TabsList>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="recent" className="pt-6 space-y-8">
                {recentPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl border border-indigo-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white">{post.category}</Badge>
                        </div>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center gap-3 mb-2 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {post.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="font-bold text-xl text-indigo-900 mb-2 hover:text-indigo-600 transition-colors duration-200">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 border border-indigo-100">
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-indigo-700 text-sm">{post.author.name}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-center mt-10">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Load More Articles
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="popular" className="pt-6">
                <div className="flex items-center justify-center h-40 bg-indigo-50 rounded-lg border border-indigo-100">
                  <p className="text-indigo-700">Popular articles will be displayed here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right: Sidebar */}
          <div className="space-y-8">
            {/* About the Blog */}
            <div className="bg-white rounded-xl border border-indigo-100 p-6 shadow-sm">
              <h3 className="font-bold text-lg text-indigo-900 mb-3">About Our Blog</h3>
              <p className="text-gray-600 text-sm mb-4">
                The LearnAI Blog shares insightful articles, research findings, and practical tips to enhance your learning journey. Our expert contributors include educators, researchers, and learning specialists.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Evidence-based learning strategies</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Latest research in cognitive science</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">AI and technology in education</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Student success stories and case studies</p>
                </div>
              </div>
            </div>
            
            {/* Popular Topics */}
            <div className="bg-white rounded-xl border border-indigo-100 p-6 shadow-sm">
              <h3 className="font-bold text-lg text-indigo-900 mb-4">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {popularTopics.map((topic, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    {topic.name}
                    <span className="ml-1 text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">
                      {topic.count}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg text-white mb-3">Subscribe to Our Newsletter</h3>
              <p className="text-indigo-200 text-sm mb-4">
                Get the latest articles, learning tips, and educational insights delivered to your inbox.
              </p>
              <div className="space-y-3">
                <Input 
                  placeholder="Your email address" 
                  className="bg-white/10 border-indigo-400/30 text-white placeholder:text-indigo-200 focus-visible:ring-amber-400"
                />
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                  Subscribe
                </Button>
              </div>
              <p className="text-indigo-200 text-xs mt-3">
                We respect your privacy and won't share your information.
              </p>
            </div>
            
            {/* Featured Authors */}
            <div className="bg-white rounded-xl border border-indigo-100 p-6 shadow-sm">
              <h3 className="font-bold text-lg text-indigo-900 mb-4">Featured Authors</h3>
              <div className="space-y-4">
                {featuredPosts.map((post) => (
                  <div key={post.id} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-indigo-100">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-indigo-900">{post.author.name}</h4>
                      <p className="text-xs text-gray-600">{post.author.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="bg-indigo-900 rounded-2xl overflow-hidden shadow-xl relative">
          <div className="absolute inset-0 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Have Something to Share?</h2>
              <p className="text-indigo-200 mb-6">
                We welcome contributions from educators, researchers, students, and learning enthusiasts. Share your insights with our global community.
              </p>
              <div className="space-y-3">
                <Button className="bg-white text-indigo-700 hover:bg-indigo-50">
                  Become a Contributor
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-indigo-800/50">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Submit a Story Idea
                </Button>
              </div>
            </div>
            <div className="bg-indigo-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-700/50">
              <h3 className="font-bold text-white mb-4">Contribution Guidelines</h3>
              <ul className="space-y-3 text-indigo-200">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Original content backed by research or experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Topics related to education, learning, or educational technology</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Clear, engaging writing accessible to a broad audience</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Practical insights readers can apply to their learning journey</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Topics & Categories */}
      <div className="bg-indigo-50 py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-indigo-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-indigo-600">
                  <path d="M12 2a4 4 0 0 1 4 4c0 1.95-.45 3.97-1.28 6.5a4.77 4.77 0 0 1-2.72 2.96v0c-.8.37-1.73.37-2.54 0h0a4.77 4.77 0 0 1-2.72-2.96C5.45 9.97 5 7.95 5 6a4 4 0 0 1 4-4z"></path>
                  <path d="M12 18.5V19"></path>
                  <path d="m7.99 15.5-1.73 1"></path>
                  <path d="m16.01 15.5 1.73 1"></path>
                </svg>
              </div>
              <h3 className="font-bold text-lg text-indigo-900 mb-1">Learning Science</h3>
              <p className="text-gray-600 text-sm mb-3">The psychology and neuroscience behind effective learning methods</p>
              <Button variant="link" className="text-indigo-600 hover:text-indigo-800 p-0 h-auto">
                View Articles
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-indigo-600">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3 className="font-bold text-lg text-indigo-900 mb-1">Educational Technology</h3>
              <p className="text-gray-600 text-sm mb-3">Tools, platforms, and innovations transforming how we learn</p>
              <Button variant="link" className="text-indigo-600 hover:text-indigo-800 p-0 h-auto">
                View Articles
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-indigo-600">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <line x1="10" y1="9" x2="8" y2="9"></line>
                </svg>
              </div>
              <h3 className="font-bold text-lg text-indigo-900 mb-1">Study Strategies</h3>
              <p className="text-gray-600 text-sm mb-3">Practical techniques to improve retention and master new subjects</p>
              <Button variant="link" className="text-indigo-600 hover:text-indigo-800 p-0 h-auto">
                View Articles
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-indigo-600">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <h3 className="font-bold text-lg text-indigo-900 mb-1">Student Wellbeing</h3>
              <p className="text-gray-600 text-sm mb-3">Balancing academic success with mental health and personal growth</p>
              <Button variant="link" className="text-indigo-600 hover:text-indigo-800 p-0 h-auto">
                View Articles
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Browse All Categories
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}