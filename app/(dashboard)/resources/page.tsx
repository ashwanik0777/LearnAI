'use client';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  Search, 
  BookmarkPlus, 
  Filter, 
  FileText, 
  Film, 
  Download,
  ExternalLink,
  PlayCircle,
  Heart,
  Star,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { DashboardData } from "@/lib/types";

export default function ResourcesPage() {
  const { user, loading: authLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: dashboardData, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
    enabled: !!user,
  });

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-3" />
          <p className="text-sm font-medium text-gray-500">Loading learning resources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-red-100 max-w-md">
          <h1 className="text-lg font-semibold text-red-600 mb-2">Error loading resources</h1>
          <p className="text-sm text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  const subjects = dashboardData?.subjects || [];

  const resources = [
    {
      id: 1,
      title: "Introduction to Calculus & Foundations",
      description: "Comprehensive guide to the basics of calculus, differentiation, and integration.",
      type: "ebook",
      subject: "Mathematics",
      topics: ["Calculus", "Derivatives", "Integration"],
      level: "intermediate",
      rating: 4.7,
      likes: 124,
      url: "/courses/1"
    },
    {
      id: 2,
      title: "Physics Mechanics & Real-world Laws",
      description: "Learn how forces, gravity, and kinematics explain physical phenomenon.",
      type: "video",
      subject: "Science",
      topics: ["Physics", "Mechanics", "Kinematics"],
      level: "beginner",
      rating: 4.5,
      likes: 92,
      url: "/courses/2"
    },
    {
      id: 3,
      title: "Advanced Economics: Market Structures",
      description: "Deep dive into microeconomic models, elasticity, and modern competitive markets.",
      type: "article",
      subject: "Economics",
      topics: ["Microeconomics", "Markets", "Equilibrium"],
      level: "advanced",
      rating: 4.8,
      likes: 76,
      url: "/courses/3"
    },
    {
      id: 4,
      title: "Literary Analysis and Critical Thinking",
      description: "Master text interpretation, rhetorical structures, and persuasive essays.",
      type: "ebook",
      subject: "Literature",
      topics: ["Literature", "Analysis", "Rhetoric"],
      level: "intermediate",
      rating: 4.6,
      likes: 113,
      url: "/courses/4"
    },
    {
      id: 5,
      title: "Algorithms & Data Structure Essentials",
      description: "Core algorithms, asymptotic complexity analysis, and recursive problem solving.",
      type: "course",
      subject: "Computer Science",
      topics: ["Algorithms", "Data Structures", "Trees"],
      level: "intermediate",
      rating: 4.9,
      likes: 246,
      url: "/courses/1"
    },
    {
      id: 6,
      title: "Organic Chemistry Principles",
      description: "Visual walkthroughs of reaction mechanisms, bonding, and molecular geometry.",
      type: "video",
      subject: "Science",
      topics: ["Chemistry", "Reactions", "Organic"],
      level: "beginner",
      rating: 4.4,
      likes: 88,
      url: "/courses/2"
    }
  ];

  const filteredResources = resources.filter((resource) => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Film className="h-4 w-4" />;
      case 'ebook':
        return <BookOpen className="h-4 w-4" />;
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'secondary' as const;
      case 'intermediate':
        return 'default' as const;
      case 'advanced':
        return 'destructive' as const;
      default:
        return 'outline' as const;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resource Library</h1>
            <p className="mt-1 text-sm text-gray-600">Access curated reference guides, textbooks, and interactive videos</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button variant="outline" size="sm">
              <BookmarkPlus className="mr-2 h-4 w-4" />
              Saved Bookmarks
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search resources by keyword, title, or topic..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resource Library Content */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 w-full sm:w-auto">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="ebooks">E-Books</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <div className="col-span-12 md:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Filter Library</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 text-sm">
                  <div>
                    <h3 className="font-semibold text-xs text-gray-700 uppercase tracking-wider mb-2.5">Subjects</h3>
                    <div className="space-y-2">
                      {subjects.map((subject) => (
                        <div key={subject.id} className="flex items-center space-x-2">
                          <Checkbox id={`subject-${subject.id}`} />
                          <Label htmlFor={`subject-${subject.id}`} className="text-xs">{subject.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-xs text-gray-700 uppercase tracking-wider mb-2.5">Resource Type</h3>
                    <div className="space-y-2">
                      {['article', 'video', 'ebook', 'course'].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={`type-${type}`} />
                          <Label htmlFor={`type-${type}`} className="capitalize text-xs">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-xs text-gray-700 uppercase tracking-wider mb-2.5">Level</h3>
                    <div className="space-y-2">
                      {['beginner', 'intermediate', 'advanced'].map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox id={`level-${level}`} />
                          <Label htmlFor={`level-${level}`} className="capitalize text-xs">{level}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" size="sm" className="w-full">Reset Filters</Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Resources Grid */}
          <div className="col-span-12 md:col-span-9">
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard 
                    key={resource.id} 
                    resource={resource} 
                    getResourceTypeIcon={getResourceTypeIcon}
                    getLevelBadgeVariant={getLevelBadgeVariant}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="articles" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources
                  .filter((r) => r.type === 'article')
                  .map((resource) => (
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                      getResourceTypeIcon={getResourceTypeIcon}
                      getLevelBadgeVariant={getLevelBadgeVariant}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="videos" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources
                  .filter((r) => r.type === 'video')
                  .map((resource) => (
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                      getResourceTypeIcon={getResourceTypeIcon}
                      getLevelBadgeVariant={getLevelBadgeVariant}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="ebooks" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources
                  .filter((r) => r.type === 'ebook')
                  .map((resource) => (
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                      getResourceTypeIcon={getResourceTypeIcon}
                      getLevelBadgeVariant={getLevelBadgeVariant}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="courses" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources
                  .filter((r) => r.type === 'course')
                  .map((resource) => (
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                      getResourceTypeIcon={getResourceTypeIcon}
                      getLevelBadgeVariant={getLevelBadgeVariant}
                    />
                  ))}
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

interface ResourceCardProps {
  resource: {
    id: number;
    title: string;
    description: string;
    type: string;
    subject: string;
    topics: string[];
    level: string;
    rating: number;
    likes: number;
    url: string;
  };
  getResourceTypeIcon: (type: string) => React.ReactNode;
  getLevelBadgeVariant: (level: string) => "secondary" | "default" | "destructive" | "outline";
}

function ResourceCard({ resource, getResourceTypeIcon, getLevelBadgeVariant }: ResourceCardProps) {
  const router = useRouter();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col border-gray-200/80">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge className="capitalize text-xs">{resource.subject}</Badge>
          <Badge variant={getLevelBadgeVariant(resource.level)} className="capitalize text-xs">
            {resource.level}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2 mt-2 text-base text-gray-900">{resource.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs">
          {resource.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3 flex-1">
        <div className="flex flex-wrap gap-1">
          {resource.topics.map((topic, index) => (
            <Badge key={index} variant="outline" className="text-[10px]">
              {topic}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-3 pb-3 text-xs bg-gray-50/50">
        <div className="flex items-center text-gray-500">
          {getResourceTypeIcon(resource.type)}
          <span className="ml-1 capitalize">{resource.type}</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-gray-600">
            <Star className="h-3.5 w-3.5 text-amber-500 mr-1" />
            <span>{resource.rating}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Heart className="h-3.5 w-3.5 text-rose-500 mr-1" />
            <span>{resource.likes}</span>
          </div>
        </div>
      </CardFooter>
      
      <div className="p-3 bg-white grid grid-cols-2 gap-2 border-t">
        <Button variant="outline" size="sm" className="w-full text-xs">
          <BookmarkPlus className="h-3.5 w-3.5 mr-1" />
          Save
        </Button>
        <Button 
          size="sm" 
          className="w-full text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => router.push(resource.url)}
        >
          {resource.type === 'video' ? (
            <PlayCircle className="h-3.5 w-3.5 mr-1" />
          ) : resource.type === 'ebook' ? (
            <Download className="h-3.5 w-3.5 mr-1" />
          ) : (
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
          )}
          View
        </Button>
      </div>
    </Card>
  );
}
