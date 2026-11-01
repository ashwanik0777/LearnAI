'use client';

import { ChevronRight, Database, BarChart, ArrowUpDown, Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DataUsage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-16">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/" className="text-indigo-100 hover:text-white text-sm">Home</Link>
            <ChevronRight className="h-4 w-4 text-indigo-200" />
            <span className="text-white text-sm">Data Usage Policy</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Data Usage Policy</h1>
          <p className="text-indigo-100 mt-2">Last Updated: March 23, 2025</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-indigo-100">
          <div className="prose prose-indigo max-w-none">
            <div className="flex items-center gap-3 mb-6">
              <Database className="h-8 w-8 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-indigo-900 m-0">How We Use Your Data</h2>
            </div>
            
            <p className="text-gray-700">
              At LearnAI, we collect and process data to provide personalized educational experiences. This Data Usage Policy explains how we collect, process, 
              and utilize data to enhance your learning journey while respecting your privacy.
            </p>

            <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">AI Learning</h3>
                  <p className="text-gray-600 text-sm">We utilize data to power our AI algorithms that deliver personalized learning experiences.</p>
                </CardContent>
              </Card>

              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">Progress Tracking</h3>
                  <p className="text-gray-600 text-sm">Your learning data helps us provide detailed analytics and progress reports.</p>
                </CardContent>
              </Card>

              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <ArrowUpDown className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">Platform Improvement</h3>
                  <p className="text-gray-600 text-sm">We analyze usage patterns to enhance features and optimize our platform.</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="collection" className="w-full my-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="collection">Data Collection</TabsTrigger>
                <TabsTrigger value="processing">Data Processing</TabsTrigger>
                <TabsTrigger value="protection">Data Protection</TabsTrigger>
              </TabsList>
              <TabsContent value="collection" className="p-6 border border-indigo-100 rounded-lg mt-4 bg-indigo-50/50">
                <h4 className="text-lg font-semibold text-indigo-900 mb-3">Data We Collect</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Account Data:</strong> Information provided during account creation including name, email, and academic level.</li>
                  <li><strong>Learning Data:</strong> Course progress, quiz scores, homework submissions, and learning preferences.</li>
                  <li><strong>Usage Data:</strong> How you interact with our platform, time spent on activities, and feature usage patterns.</li>
                  <li><strong>Device Data:</strong> Device type, browser, operating system, and IP address.</li>
                </ul>
              </TabsContent>
              <TabsContent value="processing" className="p-6 border border-indigo-100 rounded-lg mt-4 bg-indigo-50/50">
                <h4 className="text-lg font-semibold text-indigo-900 mb-3">How We Process Data</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>AI-Powered Learning:</strong> We process your learning patterns to personalize content and recommendations.</li>
                  <li><strong>Analytics:</strong> We analyze performance data to provide insights into your learning progress.</li>
                  <li><strong>Adaptive Content:</strong> We adjust difficulty levels based on your performance and learning speed.</li>
                  <li><strong>Research:</strong> We may use anonymized data to improve educational methodologies (with consent).</li>
                </ul>
              </TabsContent>
              <TabsContent value="protection" className="p-6 border border-indigo-100 rounded-lg mt-4 bg-indigo-50/50">
                <h4 className="text-lg font-semibold text-indigo-900 mb-3">How We Protect Your Data</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Encryption:</strong> All personal data is encrypted both in transit and at rest.</li>
                  <li><strong>Access Controls:</strong> Strict access controls limit who can view your data.</li>
                  <li><strong>Data Minimization:</strong> We only collect data necessary for providing our educational services.</li>
                  <li><strong>Regular Audits:</strong> We conduct regular security audits to ensure data protection.</li>
                </ul>
              </TabsContent>
            </Tabs>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">1. Educational Data Collection</h3>
            <p className="text-gray-700 mb-4">
              We collect various types of educational data to enhance your learning experience:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Learning Performance Data:</strong> Quiz results, assignment submissions, study time, and progress through course materials.
                This helps us track your progress and adapt content to your learning pace.
              </li>
              <li>
                <strong>Learning Style Data:</strong> We analyze how you interact with different types of content (videos, text, interactive exercises)
                to identify your preferred learning styles and provide content in formats that work best for you.
              </li>
              <li>
                <strong>Content Engagement Data:</strong> How long you spend on different sections, which materials you revisit, and where you might be struggling.
                This helps us improve our content and identify areas where additional support may be needed.
              </li>
              <li>
                <strong>Assessment Data:</strong> Results from quizzes, tests, and other assessments that help measure your understanding and mastery of subjects.
              </li>
            </ul>

            <Separator className="my-8" />

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">2. AI & Machine Learning Usage</h3>
            <p className="text-gray-700 mb-4">
              Our platform uses artificial intelligence and machine learning to enhance your educational experience:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Personalized Learning Paths:</strong> Our AI analyzes your performance, strengths, and areas for improvement to create
                customized learning paths that adapt to your needs.
              </li>
              <li>
                <strong>Content Recommendations:</strong> Based on your learning history, academic level, and goals, our systems recommend
                relevant educational resources that align with your learning journey.
              </li>
              <li>
                <strong>Difficulty Adaptation:</strong> Our platform automatically adjusts the difficulty of exercises and content based on your 
                demonstrated mastery of concepts.
              </li>
              <li>
                <strong>Early Intervention:</strong> Our systems can identify when you might be struggling with specific concepts and provide
                additional resources or notify instructors who can offer support.
              </li>
            </ul>

            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 my-8">
              <h4 className="text-lg font-semibold text-indigo-900 mb-2">AI Ethics Commitment</h4>
              <p className="text-gray-700">
                We are committed to ethical AI usage in education. Our AI systems are:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                <li>Designed to promote educational equity and access</li>
                <li>Regularly audited for bias and fairness</li>
                <li>Transparent in how they make recommendations</li>
                <li>Focused on enhancing human teaching, not replacing it</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">3. Analytics & Reporting</h3>
            <p className="text-gray-700 mb-4">
              We process your data to generate analytics and reports that provide insights into your learning journey:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Progress Reports:</strong> Detailed views of your advancement through courses, showing completion rates, time spent, and achievement of learning objectives.
              </li>
              <li>
                <strong>Performance Analytics:</strong> Analysis of your strengths and areas for improvement across different subjects and topics.
              </li>
              <li>
                <strong>Engagement Metrics:</strong> Data about your platform usage patterns, preferred learning times, and content types you engage with most effectively.
              </li>
              <li>
                <strong>Comparative Insights:</strong> Optional anonymous comparisons to course averages to help you understand your relative progress
                (displayed only with your consent).
              </li>
            </ul>

            <Separator className="my-8" />

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">4. Data Retention & Deletion</h3>
            <p className="text-gray-700 mb-4">
              We maintain specific policies regarding how long we keep your educational data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Active Account Data:</strong> While your account is active, we retain your learning data to provide personalized services and track your long-term progress.
              </li>
              <li>
                <strong>Account Closure:</strong> When you close your account, your personal identifiers are removed from your learning data within 30 days.
              </li>
              <li>
                <strong>Data Exports:</strong> Before account closure, you can request an export of your learning data and achievements.
              </li>
              <li>
                <strong>Anonymized Data:</strong> We may retain anonymized, aggregated data that cannot be linked back to you for platform improvement and research purposes.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">5. Research & Platform Improvement</h3>
            <p className="text-gray-700 mb-4">
              With appropriate consent, we may use anonymized educational data for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Improving our educational content and learning algorithms</li>
              <li>Researching effective teaching and learning methodologies</li>
              <li>Developing new educational features and tools</li>
              <li>Publishing anonymized research findings that contribute to the field of education</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Any research using learner data follows strict ethical guidelines and privacy protections.
            </p>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">6. Third-Party Data Sharing</h3>
            <p className="text-gray-700 mb-4">
              We limit sharing of your educational data with third parties:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Service Providers:</strong> We share data with service providers who help us deliver our educational platform,
                subject to strict data protection agreements.
              </li>
              <li>
                <strong>Educational Institutions:</strong> With your consent, we may share progress and performance data with schools or
                institutions you're affiliated with.
              </li>
              <li>
                <strong>Research Partners:</strong> We may share anonymized data with academic research partners to advance educational methods
                (only with explicit consent).
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may share data when required by law or to protect our rights or the safety of users.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">7. Your Data Control Rights</h3>
            <p className="text-gray-700 mb-4">
              You have several rights regarding your educational data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Access:</strong> You can access and review your learning data through your profile and progress dashboards.
              </li>
              <li>
                <strong>Correction:</strong> You can request corrections to inaccurate personal or academic information.
              </li>
              <li>
                <strong>Export:</strong> You can export your learning history, achievements, and submitted work.
              </li>
              <li>
                <strong>Deletion:</strong> You can request deletion of your account and associated personal data.
              </li>
              <li>
                <strong>AI Personalization Opt-Out:</strong> You can opt out of AI-powered personalization while still using our platform.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">8. Contact Us About Data Usage</h3>
            <p className="text-gray-700 mb-4">
              If you have questions about how we use your data or wish to exercise your data rights, please contact us at:
            </p>
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 mt-4">
              <p className="text-gray-800 mb-1"><strong>LearnAI Data Protection Team</strong></p>
              <p className="text-gray-700 mb-1">Email: data@learnai.example</p>
              <p className="text-gray-700 mb-1">Address: 123 Education Avenue, Knowledge City, KS 12345</p>
              <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}