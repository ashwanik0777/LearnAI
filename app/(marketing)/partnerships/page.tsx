'use client';

import { ChevronRight, Handshake, Users, Building, School, GraduationCap, Lightbulb, BookOpen, Heart, Target, CheckCircle, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Partnerships() {
  const partnerLogos = [
    { name: "Harvard University", logo: "https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png" },
    { name: "MIT", logo: "https://1000logos.net/wp-content/uploads/2022/08/MIT-Logo.png" },
    { name: "Stanford", logo: "https://1000logos.net/wp-content/uploads/2018/01/Stanford-Logo.png" },
    { name: "Google", logo: "https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png" },
    { name: "Microsoft", logo: "https://1000logos.net/wp-content/uploads/2017/04/Microsoft-Logo.png" },
    { name: "Oxford", logo: "https://1000logos.net/wp-content/uploads/2020/01/University-of-Oxford-Logo.png" },
    { name: "Cambridge", logo: "https://1000logos.net/wp-content/uploads/2017/03/Symbol-University-of-Cambridge.jpg" },
    { name: "Pearson", logo: "https://1000logos.net/wp-content/uploads/2021/04/Pearson-logo.png" }
  ];
  
  const caseStudies = [
    {
      id: 1,
      title: "Global University Consortium: 40% Improvement in Student Engagement",
      organization: "International Academic Alliance",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80",
      description: "How a consortium of 15 universities implemented LearnAI's platform to dramatically improve student engagement and learning outcomes across diverse subject areas.",
      results: [
        "40% increase in student engagement metrics",
        "28% improvement in course completion rates",
        "95% positive feedback from faculty members"
      ],
      logo: "https://1000logos.net/wp-content/uploads/2018/02/University-of-Toronto-Logo.png"
    },
    {
      id: 2,
      title: "K-12 District Transformation: Personalized Learning at Scale",
      organization: "Oakridge School District",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1622&q=80",
      description: "How a large public school district implemented LearnAI's adaptive learning platform across all schools, providing personalized education to 50,000+ students.",
      results: [
        "35% improvement in standardized test scores",
        "Reduction in achievement gap between demographic groups",
        "62% of teachers report reduced administrative workload"
      ],
      logo: "https://cdn.pixabay.com/photo/2017/01/31/13/43/school-logo-2023900_1280.png"
    },
    {
      id: 3,
      title: "Corporate Training Excellence: Data-Driven Skill Development",
      organization: "TechCorp Global",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80",
      description: "How a Fortune 500 technology company reimagined their employee training program using LearnAI's platform, resulting in accelerated skill acquisition and measurable ROI.",
      results: [
        "52% faster employee onboarding and training",
        "4.8/5 average satisfaction rating from employees",
        "$3.2M estimated annual savings in training costs"
      ],
      logo: "https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_1280.png"
    }
  ];
  
  const partnershipTypes = [
    {
      title: "Educational Institutions",
      icon: <School className="h-6 w-6 text-indigo-600" />,
      description: "Partner with LearnAI to enhance your curriculum with personalized, adaptive learning technology.",
      benefits: [
        "Customized learning paths for each student",
        "Detailed analytics on student performance",
        "Reduced administrative workload for faculty",
        "Integration with existing LMS platforms"
      ]
    },
    {
      title: "Content Providers",
      icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
      description: "Distribute your educational content through our AI-powered platform and reach millions of learners.",
      benefits: [
        "Expanded distribution of your content",
        "Data on how learners interact with your materials",
        "AI-optimized content recommendations",
        "Flexible revenue-sharing models"
      ]
    },
    {
      title: "Technology Companies",
      icon: <Lightbulb className="h-6 w-6 text-indigo-600" />,
      description: "Integrate LearnAI's adaptive learning capabilities into your educational technology solutions.",
      benefits: [
        "Access to our AI learning algorithms",
        "Seamless API integration",
        "Joint product development opportunities",
        "Co-marketing and sales initiatives"
      ]
    },
    {
      title: "Non-Profit Organizations",
      icon: <Heart className="h-6 w-6 text-indigo-600" />,
      description: "Collaborate with LearnAI to expand educational access to underserved communities worldwide.",
      benefits: [
        "Discounted platform access for communities in need",
        "Customized solutions for specific learning challenges",
        "Impact measurement and reporting",
        "Joint grant applications and funding opportunities"
      ]
    }
  ];
  
  const testimonials = [
    {
      quote: "LearnAI has transformed how we approach education at our university. The personalized learning paths have significantly improved student outcomes and engagement across all departments.",
      name: "Dr. Elizabeth Carter",
      title: "Dean of Digital Learning",
      organization: "Stanford University",
      avatar: "https://randomuser.me/api/portraits/women/23.jpg"
    },
    {
      quote: "The partnership with LearnAI has been instrumental in our company's talent development strategy. Our employees are learning faster and retaining knowledge better, which directly impacts our bottom line.",
      name: "James Wilson",
      title: "Chief Learning Officer",
      organization: "Microsoft",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      quote: "As a content provider, our partnership with LearnAI has dramatically expanded our reach. Their AI recommendation engine ensures our materials find the right learners at the right time.",
      name: "Sarah Johnson",
      title: "VP of Digital Strategy",
      organization: "Pearson",
      avatar: "https://randomuser.me/api/portraits/women/85.jpg"
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
            <span className="text-white text-sm">Partnerships</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Partner With Us</h1>
              <p className="text-indigo-100 text-xl mb-8">
                Join forces with LearnAI to transform education and create impactful learning experiences for students worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#partnership-types" className="bg-white text-indigo-700 hover:bg-indigo-50 font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-lg">
                  Explore Partnerships
                </a>
                <a href="#contact" className="bg-indigo-700/30 text-white hover:bg-indigo-700/50 font-medium px-6 py-3 rounded-lg transition-all duration-300 backdrop-blur-sm border border-indigo-400/30">
                  Get in Touch
                </a>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-amber-400 rounded-lg opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-500 rounded-lg opacity-20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1577484374107-515a0e02a5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" 
                  alt="Partnership handshake" 
                  className="relative z-10 rounded-xl shadow-2xl border-4 border-white/20 object-cover h-80 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Partners */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-10">
          <div className="inline-block mb-4 bg-indigo-100 px-4 py-1 rounded-full">
            <span className="text-indigo-800 font-medium text-sm">TRUSTED BY INDUSTRY LEADERS</span>
          </div>
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Our Global Partners</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            LearnAI collaborates with leading educational institutions, technology companies, and content providers worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {partnerLogos.map((partner, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-center h-24 hover:shadow-md transition-all duration-300">
              <img src={partner.logo} alt={partner.name} className="max-h-12 max-w-[120px] object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Partnership Types */}
      <div id="partnership-types" className="bg-indigo-50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block mb-4 bg-indigo-200 px-4 py-1 rounded-full">
              <span className="text-indigo-800 font-medium text-sm">COLLABORATION OPPORTUNITIES</span>
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Partnership Programs</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Discover how your organization can collaborate with LearnAI to achieve educational excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnershipTypes.map((type, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold text-indigo-900">{type.title}</h3>
                </div>
                <p className="text-gray-700 mb-5">{type.description}</p>
                <h4 className="font-semibold text-indigo-800 mb-2">Key Benefits:</h4>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <a href="#contact" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center">
                    Learn More About this Partnership
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-10">
          <div className="inline-block mb-4 bg-indigo-100 px-4 py-1 rounded-full">
            <span className="text-indigo-800 font-medium text-sm">SUCCESS STORIES</span>
          </div>
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Partnership Case Studies</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Explore how organizations have achieved remarkable results through their partnership with LearnAI.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-8">
            <TabsTrigger value="all">All Partners</TabsTrigger>
            <TabsTrigger value="education">Educational Institutions</TabsTrigger>
            <TabsTrigger value="corporate">Corporate Partners</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-10">
            {caseStudies.map((study, index) => (
              <div key={study.id} className="bg-white rounded-xl shadow-md border border-indigo-100 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="md:col-span-1 relative h-60 md:h-full">
                    <img 
                      src={study.image} 
                      alt={study.title} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-indigo-900/60 to-transparent flex md:items-end p-4">
                      <img 
                        src={study.logo} 
                        alt={study.organization} 
                        className="h-12 object-contain hidden md:block backdrop-blur-sm bg-white/30 p-2 rounded"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <img 
                        src={study.logo} 
                        alt={study.organization} 
                        className="h-6 md:hidden"
                      />
                      <h3 className="text-indigo-600 font-medium">{study.organization}</h3>
                    </div>
                    <h3 className="font-bold text-xl text-indigo-900 mb-3">{study.title}</h3>
                    <p className="text-gray-700 mb-6">{study.description}</p>
                    <h4 className="font-semibold text-indigo-800 mb-3">Key Results:</h4>
                    <ul className="space-y-2 mb-6">
                      {study.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      Read Full Case Study
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="education" className="space-y-10">
            <div className="flex items-center justify-center h-60 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-indigo-700">Educational institution case studies will be displayed here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="corporate" className="space-y-10">
            <div className="flex items-center justify-center h-60 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-indigo-700">Corporate partner case studies will be displayed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-block mb-4 bg-indigo-500/50 px-4 py-1 rounded-full">
              <span className="text-indigo-100 font-medium text-sm">PARTNER TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">What Our Partners Say</h2>
            <p className="text-indigo-200 max-w-2xl mx-auto">
              Hear directly from our partners about their experience collaborating with LearnAI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="mb-6">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-400">
                    <path d="M9.33333 21.3333C7.86667 21.3333 6.66667 20.8 5.73333 19.7333C4.8 18.6667 4.33333 17.3333 4.33333 15.7333C4.33333 14 4.93333 12.2 6.13333 10.3333C7.33333 8.46667 9.06667 6.93333 11.3333 5.73333L13.3333 8.66667C11.8667 9.46667 10.7333 10.3333 9.93333 11.2667C9.13333 12.2 8.73333 13.0667 8.73333 13.8667C8.73333 14.2 8.8 14.4667 8.93333 14.6667C9.06667 14.8667 9.33333 15.0667 9.73333 15.2667C10.2667 15.5333 10.6667 15.8667 10.9333 16.2667C11.2 16.6667 11.3333 17.2 11.3333 17.8667C11.3333 18.8 11 19.6 10.3333 20.2667C9.66667 20.9333 8.66667 21.2667 7.33333 21.3333H9.33333ZM21.3333 21.3333C19.8667 21.3333 18.6667 20.8 17.7333 19.7333C16.8 18.6667 16.3333 17.3333 16.3333 15.7333C16.3333 14 16.9333 12.2 18.1333 10.3333C19.3333 8.46667 21.0667 6.93333 23.3333 5.73333L25.3333 8.66667C23.8667 9.46667 22.7333 10.3333 21.9333 11.2667C21.1333 12.2 20.7333 13.0667 20.7333 13.8667C20.7333 14.2 20.8 14.4667 20.9333 14.6667C21.0667 14.8667 21.3333 15.0667 21.7333 15.2667C22.2667 15.5333 22.6667 15.8667 22.9333 16.2667C23.2 16.6667 23.3333 17.2 23.3333 17.8667C23.3333 18.8 23 19.6 22.3333 20.2667C21.6667 20.9333 20.6667 21.2667 19.3333 21.3333H21.3333Z" fill="currentColor"/>
                  </svg>
                </div>
                <blockquote className="text-indigo-100 mb-6">{testimonial.quote}</blockquote>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-indigo-300">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-indigo-200 text-indigo-700">{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-indigo-200 text-sm">{testimonial.title}, {testimonial.organization}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partnership Process */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 bg-indigo-100 px-4 py-1 rounded-full">
            <span className="text-indigo-800 font-medium text-sm">HOW IT WORKS</span>
          </div>
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Partnership Process</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            A straightforward journey from initial conversation to successful collaboration.
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-[50%] top-8 bottom-8 w-0.5 bg-indigo-200 hidden md:block"></div>
          
          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Initial Consultation</h3>
                <p className="text-gray-700">
                  We'll discuss your organization's needs, goals, and how LearnAI can support your educational mission.
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
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Partnership Plan</h3>
                <p className="text-gray-700">
                  Our team will develop a customized partnership proposal including technical integration plans, timeline, and expected outcomes.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Implementation</h3>
                <p className="text-gray-700">
                  Our technical and educational teams will work closely with yours to ensure a smooth implementation of LearnAI solutions.
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
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Ongoing Support & Growth</h3>
                <p className="text-gray-700">
                  We provide continuous support, regular performance reviews, and explore opportunities to expand our partnership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-indigo-50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <Handshake className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-indigo-900">Become a Partner</h2>
                </div>
                <p className="text-gray-700 mb-6">
                  Interested in partnering with LearnAI? Contact our partnerships team to explore collaboration opportunities.
                </p>
                <div className="space-y-5 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-full mt-1 shrink-0">
                      <Users className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-indigo-900 mb-1">Institutional Partnerships</h3>
                      <p className="text-gray-600 text-sm">For educational institutions and non-profits</p>
                      <a href="mailto:edu@learnai.example" className="text-indigo-600 text-sm hover:text-indigo-800">
                        edu@learnai.example
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-full mt-1 shrink-0">
                      <Building className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-indigo-900 mb-1">Corporate Partnerships</h3>
                      <p className="text-gray-600 text-sm">For businesses and technology companies</p>
                      <a href="mailto:partners@learnai.example" className="text-indigo-600 text-sm hover:text-indigo-800">
                        partners@learnai.example
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-full mt-1 shrink-0">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-indigo-900 mb-1">Content Partnerships</h3>
                      <p className="text-gray-600 text-sm">For publishers and content creators</p>
                      <a href="mailto:content@learnai.example" className="text-indigo-600 text-sm hover:text-indigo-800">
                        content@learnai.example
                      </a>
                    </div>
                  </div>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Partnerships Team
                </Button>
              </div>
              <div className="relative hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" 
                  alt="Partners meeting" 
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-indigo-800/60">
                  <div className="absolute bottom-10 left-10 max-w-xs">
                    <blockquote className="text-white text-lg font-medium italic">
                      "Great partnerships are built on shared vision, trust, and collaboration."
                    </blockquote>
                    <p className="text-indigo-200 mt-4">- Dr. Emily Chen, Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-10">
          <div className="inline-block mb-4 bg-indigo-100 px-4 py-1 rounded-full">
            <span className="text-indigo-800 font-medium text-sm">COMMON QUESTIONS</span>
          </div>
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Partnership FAQs</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Find answers to commonly asked questions about partnering with LearnAI.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md border border-indigo-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-indigo-900 mb-2">What types of partnerships does LearnAI offer?</h3>
                <p className="text-gray-700">
                  We offer partnerships for educational institutions, corporate learning programs, content providers, and technology companies. Each partnership is customized to meet specific needs and goals.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-indigo-900 mb-2">How long does the partnership process take?</h3>
                <p className="text-gray-700">
                  The timeline varies depending on the partnership scope, but typically ranges from 4-8 weeks from initial consultation to implementation.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-indigo-900 mb-2">Do you offer special pricing for educational institutions?</h3>
                <p className="text-gray-700">
                  Yes, we offer special pricing models for educational institutions, particularly those serving underrepresented communities.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-indigo-900 mb-2">Can LearnAI integrate with our existing systems?</h3>
                <p className="text-gray-700">
                  Yes, our platform is designed to integrate with most LMS systems, SSO solutions, and other educational technologies through our API.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-indigo-900 mb-2">What support does LearnAI provide during implementation?</h3>
                <p className="text-gray-700">
                  We provide dedicated technical support, training for staff, documentation, and ongoing assistance throughout the implementation process.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-indigo-900 mb-2">Are there minimum requirements to become a partner?</h3>
                <p className="text-gray-700">
                  While we don't have strict minimums, we look for partners who share our mission to transform education and have the infrastructure to successfully implement our solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Education Together?</h2>
          <p className="text-indigo-100 text-xl mb-8 max-w-xl mx-auto">
            Join our global network of partners who are revolutionizing how people learn and grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-white text-indigo-700 hover:bg-indigo-50 font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-lg">
              Become a Partner
            </a>
            <Button variant="outline" className="border-white text-white hover:bg-indigo-700/50">
              <Target className="h-5 w-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}