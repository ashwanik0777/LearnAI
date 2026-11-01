'use client';

import { ChevronRight, Cookie, Clock, Fingerprint, Cog } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-16">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/" className="text-indigo-100 hover:text-white text-sm">Home</Link>
            <ChevronRight className="h-4 w-4 text-indigo-200" />
            <span className="text-white text-sm">Cookie Policy</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Cookie Policy</h1>
          <p className="text-indigo-100 mt-2">Last Updated: March 23, 2025</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-indigo-100">
          <div className="prose prose-indigo max-w-none">
            <div className="flex items-center gap-3 mb-6">
              <Cookie className="h-8 w-8 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-indigo-900 m-0">About Cookies on LearnAI</h2>
            </div>
            
            <p className="text-gray-700">
              This Cookie Policy explains how LearnAI ("we", "us", or "our") uses cookies and similar technologies to recognize and 
              remember you when you visit our educational platform. It explains what these technologies are and why we use them, as well 
              as your rights to control our use of them.
            </p>

            <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <Cookie className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">What Are Cookies?</h3>
                  <p className="text-gray-600 text-sm">Small data files placed on your device when you visit our platform that help us provide personalized features.</p>
                </CardContent>
              </Card>

              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <Fingerprint className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">Tracking Technologies</h3>
                  <p className="text-gray-600 text-sm">Besides cookies, we may use web beacons, pixels and local storage for similar purposes.</p>
                </CardContent>
              </Card>

              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <Cog className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">Your Choices</h3>
                  <p className="text-gray-600 text-sm">You can manage your cookie preferences through our consent manager or your browser settings.</p>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">1. What Are Cookies?</h3>
            <p className="text-gray-700 mb-4">
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely 
              used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p className="text-gray-700 mb-4">
              Cookies set by the website owner (in this case, LearnAI) are called "first-party cookies". Cookies set by parties other than 
              the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be 
              provided on or through the website (such as advertising, interactive content, and analytics).
            </p>

            <Separator className="my-8" />

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">2. Types of Cookies We Use</h3>
            <div className="overflow-hidden rounded-lg border border-indigo-100 my-6">
              <Table>
                <TableHeader className="bg-indigo-50">
                  <TableRow>
                    <TableHead className="text-indigo-900 font-semibold">Type of Cookie</TableHead>
                    <TableHead className="text-indigo-900 font-semibold">Purpose</TableHead>
                    <TableHead className="text-indigo-900 font-semibold">Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Essential Cookies</TableCell>
                    <TableCell>These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions made by you such as logging in or filling in forms.</TableCell>
                    <TableCell>Session / Persistent</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Functional Cookies</TableCell>
                    <TableCell>These cookies enable personalized features and functionality. They may be set by us or by third-party providers whose services we have added to our pages.</TableCell>
                    <TableCell>Persistent (1 year)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Performance & Analytics Cookies</TableCell>
                    <TableCell>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular.</TableCell>
                    <TableCell>Persistent (1-2 years)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Learning Progress Cookies</TableCell>
                    <TableCell>These cookies help us remember your progress in courses, quizzes completed, and learning preferences to provide a personalized educational experience.</TableCell>
                    <TableCell>Persistent (2 years)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">3. Specific Cookies We Use</h3>
            <p className="text-gray-700 mb-4">
              Here are examples of the specific cookies we use on our educational platform:
            </p>
            <div className="overflow-hidden rounded-lg border border-indigo-100 my-6">
              <Table>
                <TableHeader className="bg-indigo-50">
                  <TableRow>
                    <TableHead className="text-indigo-900 font-semibold">Cookie Name</TableHead>
                    <TableHead className="text-indigo-900 font-semibold">Purpose</TableHead>
                    <TableHead className="text-indigo-900 font-semibold">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">session_id</TableCell>
                    <TableCell>Maintains your logged-in status and session information.</TableCell>
                    <TableCell>Essential</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">csrf_token</TableCell>
                    <TableCell>Provides security by preventing cross-site request forgery attacks.</TableCell>
                    <TableCell>Essential</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">preferences</TableCell>
                    <TableCell>Remembers your UI preferences such as theme choice and view settings.</TableCell>
                    <TableCell>Functional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">learning_progress</TableCell>
                    <TableCell>Tracks your progress through courses and educational content.</TableCell>
                    <TableCell>Learning Progress</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">learning_style</TableCell>
                    <TableCell>Remembers your preferred learning styles to personalize content presentation.</TableCell>
                    <TableCell>Learning Progress</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">_ga</TableCell>
                    <TableCell>Google Analytics cookie used to distinguish users.</TableCell>
                    <TableCell>Performance & Analytics</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <Separator className="my-8" />

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">4. How to Manage Cookies</h3>
            <p className="text-gray-700 mb-4">
              You have the right to decide whether to accept or reject cookies. You can set or modify your cookie preferences in the following ways:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Cookie Consent Tool:</strong> We provide a cookie consent manager when you first visit our site, allowing you to select which types of cookies you accept.
                You can change these preferences at any time by clicking the "Cookie Preferences" link in our footer.
              </li>
              <li>
                <strong>Browser Settings:</strong> You can set or modify your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, 
                but your access to some functionality and areas may be restricted.
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              Here are links to instructions for managing cookies in common browsers:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><a href="#" className="text-indigo-600 hover:text-indigo-800">Google Chrome</a></li>
              <li><a href="#" className="text-indigo-600 hover:text-indigo-800">Mozilla Firefox</a></li>
              <li><a href="#" className="text-indigo-600 hover:text-indigo-800">Apple Safari</a></li>
              <li><a href="#" className="text-indigo-600 hover:text-indigo-800">Microsoft Edge</a></li>
            </ul>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">5. Do Not Track Signals</h3>
            <p className="text-gray-700 mb-4">
              Some browsers incorporate a "Do Not Track" (DNT) feature that, when turned on, signals to websites that you do not want to be tracked. 
              Because there is not yet a common understanding of how to interpret the DNT signal, our website does not currently respond to browser DNT signals. 
              However, you can use the range of other tools we provide to control data collection and use.
            </p>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">6. Updates to This Cookie Policy</h3>
            <p className="text-gray-700 mb-4">
              We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. 
              Any changes will become effective when we post the revised policy. If we make any material changes, we will notify you through 
              a notice on our website prior to the change becoming effective.
            </p>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">7. Contact Us</h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
            </p>
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 mt-4">
              <p className="text-gray-800 mb-1"><strong>LearnAI Privacy Team</strong></p>
              <p className="text-gray-700 mb-1">Email: privacy@learnai.example</p>
              <p className="text-gray-700 mb-1">Address: 123 Education Avenue, Knowledge City, KS 12345</p>
              <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}