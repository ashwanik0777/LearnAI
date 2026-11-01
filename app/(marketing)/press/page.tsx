'use client';

import { ChevronRight, Newspaper, Download, Calendar, ArrowRight, Award, FileText, Mail, ExternalLink, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Press() {
  const pressReleases = [
    {
      id: 1,
      title: "LearnAI Raises $50M Series B to Expand Personalized Learning Platform Globally",
      date: "March 10, 2025",
      summary: "Funding will accelerate product development and international expansion to make AI-powered education accessible to more students worldwide.",
      category: "Funding"
    },
    {
      id: 2,
      title: "LearnAI Announces Partnership with 200 Universities to Transform Higher Education",
      date: "February 15, 2025",
      summary: "Strategic partnership will integrate LearnAI's personalized learning technology into university curriculums, benefiting over 2 million students.",
      category: "Partnership"
    },
    {
      id: 3,
      title: "LearnAI Launches Advanced AI Tutoring System for K-12 Students",
      date: "January 20, 2025",
      summary: "New AI-powered tutoring feature provides personalized support for K-12 students, with early results showing a 40% improvement in learning outcomes.",
      category: "Product Launch"
    },
    {
      id: 4,
      title: "LearnAI Named to TIME's List of 100 Most Influential Companies",
      date: "December 5, 2024",
      summary: "Educational technology platform recognized for its innovative approach to personalized learning and impact on education accessibility.",
      category: "Recognition"
    }
  ];
  
  const newsArticles = [
    {
      id: 1,
      title: "How AI is Reshaping Education: LearnAI at the Forefront",
      publication: "TechCrunch",
      date: "March 15, 2025",
      url: "#",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TechCrunch_logo.svg/1200px-TechCrunch_logo.svg.png"
    },
    {
      id: 2,
      title: "LearnAI's Innovative Approach to Personalized Education",
      publication: "Forbes",
      date: "March 3, 2025",
      url: "#",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Forbes_logo.svg/1200px-Forbes_logo.svg.png"
    },
    {
      id: 3,
      title: "The Future of Learning: An Interview with LearnAI's CEO",
      publication: "EdTech Magazine",
      date: "February 28, 2025",
      url: "#",
      logo: "https://ed-web-uploads.s3.amazonaws.com/edtechmagazine.com/wp-content/uploads/2020/03/EdTech-Magazine-logo.png"
    },
    {
      id: 4,
      title: "LearnAI's Series B Funding Signals Growing Interest in AI Education",
      publication: "VentureBeat",
      date: "February 12, 2025",
      url: "#",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/VentureBeat_Logo_2018.svg/1200px-VentureBeat_Logo_2018.svg.png"
    },
    {
      id: 5,
      title: "How Educational AI is Closing the Global Learning Gap",
      publication: "Wired",
      date: "January 25, 2025",
      url: "#",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Wired_logo.svg/1200px-Wired_logo.svg.png"
    }
  ];
  
  const awards = [
    {
      id: 1,
      title: "TIME100 Most Influential Companies",
      organization: "TIME Magazine",
      year: 2025,
      category: "Education",
      description: "Recognized for revolutionizing education through AI-powered personalized learning."
    },
    {
      id: 2,
      title: "Best Educational Technology Solution",
      organization: "EdTech Breakthrough Awards",
      year: 2024,
      category: "Artificial Intelligence",
      description: "Honored for innovative use of AI in creating adaptive learning experiences."
    },
    {
      id: 3,
      title: "Fast Company Innovation by Design",
      organization: "Fast Company",
      year: 2024,
      category: "Education",
      description: "Awarded for excellence in user experience design for educational platforms."
    },
    {
      id: 4,
      title: "GESS Education Awards",
      organization: "Global Educational Supplies and Solutions",
      year: 2024,
      category: "Best EdTech Startup",
      description: "Recognized for outstanding contribution to educational technology innovation."
    }
  ];
  
  const mediaAssets = [
    {
      type: "Logo Pack",
      description: "LearnAI logo files in various formats (PNG, SVG, EPS) and color variations.",
      fileSize: "15MB",
      fileType: "ZIP"
    },
    {
      type: "Brand Guidelines",
      description: "Comprehensive guide to LearnAI's visual identity, usage rules, and brand voice.",
      fileSize: "8MB",
      fileType: "PDF"
    },
    {
      type: "Executive Photos",
      description: "High-resolution professional photos of LearnAI's leadership team.",
      fileSize: "25MB",
      fileType: "ZIP"
    },
    {
      type: "Product Screenshots",
      description: "Collection of high-quality screenshots showcasing LearnAI's platform features.",
      fileSize: "30MB",
      fileType: "ZIP"
    },
    {
      type: "Company Fact Sheet",
      description: "Key information about LearnAI, including history, mission, and product overview.",
      fileSize: "2MB",
      fileType: "PDF"
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
            <span className="text-white text-sm">Press</span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Press & Media Resources</h1>
              <p className="text-indigo-100 text-xl">
                Discover the latest news, press releases, and media assets from LearnAI.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <a href="#contact" className="bg-white text-indigo-700 hover:bg-indigo-50 font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Media Inquiries
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Press Kit */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Newspaper className="h-5 w-5 text-indigo-600" />
                <h2 className="text-2xl font-bold text-indigo-900">LearnAI Press Kit</h2>
              </div>
              <p className="text-gray-700">
                Download official logos, executive photos, product screenshots, and company information.
              </p>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Complete Press Kit
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaAssets.map((asset, index) => (
              <div key={index} className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 hover:shadow-md transition-all duration-300">
                <h3 className="font-semibold text-indigo-900 mb-2">{asset.type}</h3>
                <p className="text-gray-600 text-sm mb-3">{asset.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <FileText className="h-4 w-4" />
                    <span>{asset.fileSize} {asset.fileType}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-800 p-0">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* News & Updates */}
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <Tabs defaultValue="press-releases" className="w-full">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-indigo-900">News & Updates</h2>
          </div>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="press-releases">Press Releases</TabsTrigger>
            <TabsTrigger value="news-coverage">News Coverage</TabsTrigger>
            <TabsTrigger value="awards">Awards & Recognition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="press-releases" className="space-y-6">
            {pressReleases.map((release) => (
              <div key={release.id} className="bg-white p-6 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`
                    ${release.category === 'Funding' ? 'bg-green-100 text-green-700' : ''}
                    ${release.category === 'Partnership' ? 'bg-blue-100 text-blue-700' : ''}
                    ${release.category === 'Product Launch' ? 'bg-purple-100 text-purple-700' : ''}
                    ${release.category === 'Recognition' ? 'bg-amber-100 text-amber-700' : ''}
                  `}>
                    {release.category}
                  </Badge>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {release.date}
                  </div>
                </div>
                <h3 className="font-bold text-xl text-indigo-900 mb-2">{release.title}</h3>
                <p className="text-gray-700 mb-4">{release.summary}</p>
                <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                  Read Full Release
                </Button>
              </div>
            ))}
            
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                View All Press Releases
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="news-coverage" className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-indigo-100">
              <h3 className="font-bold text-lg text-indigo-900 mb-4">Recent Media Coverage</h3>
              <div className="space-y-6">
                {newsArticles.map((article) => (
                  <div key={article.id} className="flex items-center border-b border-indigo-100 pb-6 last:border-b-0 last:pb-0">
                    <div className="w-16 h-16 flex-shrink-0 bg-white rounded-md border border-gray-200 p-2 flex items-center justify-center mr-4">
                      <img src={article.logo} alt={article.publication} className="max-h-full object-contain" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center text-gray-500 text-xs mb-1">
                        <span className="font-medium text-indigo-600">{article.publication}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {article.date}
                      </div>
                      <h4 className="font-semibold text-gray-900">{article.title}</h4>
                    </div>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 ml-2">
                      <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-800 p-1">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="awards" className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-indigo-100">
              <h3 className="font-bold text-lg text-indigo-900 mb-6">Awards & Recognition</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {awards.map((award) => (
                  <div key={award.id} className="border border-indigo-100 rounded-lg p-5 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-indigo-50/50">
                    <div className="flex items-start">
                      <div className="bg-amber-100 p-2 rounded-full mr-4">
                        <Award className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-indigo-900 mb-1">{award.title}</h4>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <span>{award.organization}</span>
                          <span className="mx-2">•</span>
                          <span>{award.year}</span>
                          <span className="mx-2">•</span>
                          <Badge variant="outline" className="text-xs">{award.category}</Badge>
                        </div>
                        <p className="text-gray-700 text-sm">{award.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Media Inquiries */}
      <div id="contact" className="container mx-auto max-w-5xl px-4 py-16">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Media Inquiries</h2>
              </div>
              <p className="text-indigo-100 mb-6">
                For press-related inquiries, interview requests, or additional information about LearnAI, please contact our PR team.
              </p>
              <div className="space-y-5">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                  <h3 className="font-semibold text-white mb-1">Media Contact</h3>
                  <p className="text-indigo-100">Sarah Thompson, Director of Communications</p>
                  <a href="mailto:press@learnai.example" className="text-indigo-200 hover:text-white transition-colors duration-200">
                    press@learnai.example
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                  <h3 className="font-semibold text-white mb-1">Press Office</h3>
                  <p className="text-indigo-100">+1 (555) 123-4567</p>
                  <p className="text-indigo-200">
                    Hours: Monday-Friday, 9:00 AM - 5:00 PM EST
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Button className="bg-white text-indigo-700 hover:bg-indigo-50">
                  Contact PR Team
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" 
                alt="Press room" 
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-indigo-800/60"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Events */}
      <div className="container mx-auto max-w-5xl px-4 pb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Upcoming Events</h2>
          <p className="text-gray-700">
            Connect with LearnAI at these upcoming conferences, webinars, and speaking engagements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-indigo-100 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="bg-indigo-100 text-indigo-700 font-semibold text-center py-3 px-4 rounded-lg mb-4">
                <div className="text-xs uppercase">May</div>
                <div className="text-2xl">15-17</div>
                <div className="text-xs uppercase">2025</div>
              </div>
              <h3 className="font-bold text-indigo-900 text-lg mb-2">EdTech Innovation Summit</h3>
              <p className="text-gray-600 text-sm mb-4">
                San Francisco, CA
              </p>
              <p className="text-gray-700 text-sm mb-4">
                LearnAI CEO Emily Chen will deliver a keynote on "The Future of AI in Education".
              </p>
              <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                Event Details
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-indigo-100 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="bg-indigo-100 text-indigo-700 font-semibold text-center py-3 px-4 rounded-lg mb-4">
                <div className="text-xs uppercase">June</div>
                <div className="text-2xl">8</div>
                <div className="text-xs uppercase">2025</div>
              </div>
              <h3 className="font-bold text-indigo-900 text-lg mb-2">Global Education Forum</h3>
              <p className="text-gray-600 text-sm mb-4">
                London, UK
              </p>
              <p className="text-gray-700 text-sm mb-4">
                Panel discussion on "AI Ethics in Educational Technology" featuring LearnAI's CTO.
              </p>
              <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                Event Details
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-indigo-100 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="bg-indigo-100 text-indigo-700 font-semibold text-center py-3 px-4 rounded-lg mb-4">
                <div className="text-xs uppercase">July</div>
                <div className="text-2xl">20</div>
                <div className="text-xs uppercase">2025</div>
              </div>
              <h3 className="font-bold text-indigo-900 text-lg mb-2">LearnAI Product Showcase</h3>
              <p className="text-gray-600 text-sm mb-4">
                Virtual Event
              </p>
              <p className="text-gray-700 text-sm mb-4">
                Live demonstration of new platform features and Q&A with the product team.
              </p>
              <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                Register Now
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-8">
          <Button variant="link" className="text-indigo-600 hover:text-indigo-800">
            View All Upcoming Events
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Brand Guidelines */}
      <div className="bg-indigo-50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Brand Guidelines</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Please follow these guidelines when using LearnAI's brand assets in publications, articles, or other media.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-3">Logo Usage</h3>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• Maintain clear space around the logo</li>
                <li>• Do not alter colors or proportions</li>
                <li>• Minimum size: 40px in height</li>
                <li>• Use approved color variations only</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-3">Typography</h3>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• Primary font: Inter</li>
                <li>• Secondary font: Merriweather</li>
                <li>• Heading weights: 700, 600</li>
                <li>• Body text weight: 400, 500</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-3">Color Palette</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                <div className="w-10 h-10 rounded bg-indigo-600 border border-gray-200"></div>
                <div className="w-10 h-10 rounded bg-indigo-700 border border-gray-200"></div>
                <div className="w-10 h-10 rounded bg-indigo-800 border border-gray-200"></div>
                <div className="w-10 h-10 rounded bg-amber-500 border border-gray-200"></div>
                <div className="w-10 h-10 rounded bg-gray-900 border border-gray-200"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Download className="h-5 w-5 mr-2" />
              Download Brand Guidelines
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}