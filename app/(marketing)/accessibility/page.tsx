'use client';

import { ChevronRight, Accessibility, Maximize2, Headphones, Users, PanelLeft, Palette, Check, PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccessibilityStatement() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-16">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/" className="text-indigo-100 hover:text-white text-sm">Home</Link>
            <ChevronRight className="h-4 w-4 text-indigo-200" />
            <span className="text-white text-sm">Accessibility Statement</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Accessibility Statement</h1>
          <p className="text-indigo-100 mt-2">Last Updated: March 23, 2025</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-indigo-100">
          <div className="prose prose-indigo max-w-none">
            <div className="flex items-center gap-3 mb-6">
              <Accessibility className="h-8 w-8 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-indigo-900 m-0">Our Commitment to Accessibility</h2>
            </div>
            
            <p className="text-gray-700">
              LearnAI is committed to ensuring digital accessibility for people with disabilities. We are continually 
              improving the user experience for everyone and applying the relevant accessibility standards.
            </p>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 p-4 my-6">
              <div className="flex items-start gap-3">
                <PlusCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-amber-800 font-medium text-base m-0">Inclusivity is Our Core Value</h3>
                  <p className="text-amber-700 text-sm mt-1 mb-0">
                    We believe education should be accessible to everyone, regardless of abilities or disabilities. 
                    Our platform is designed with this principle at its foundation.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <Maximize2 className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">Inclusive Design</h3>
                  <p className="text-gray-600 text-sm">Our platform is designed to be usable by the widest possible audience, regardless of device, browser, or abilities.</p>
                </CardContent>
              </Card>

              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <Headphones className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">Assistive Technology</h3>
                  <p className="text-gray-600 text-sm">We support various assistive technologies, including screen readers, voice recognition, and keyboard navigation.</p>
                </CardContent>
              </Card>

              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">User Testing</h3>
                  <p className="text-gray-600 text-sm">We regularly test with users who rely on assistive technologies to ensure our platform meets their needs.</p>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">Conformance Status</h3>
            <p className="text-gray-700 mb-4">
              The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. 
              It defines three levels of conformance: Level A, Level AA, and Level AAA.
            </p>
            <p className="text-gray-700 mb-4">
              LearnAI is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content 
              do not fully conform to the accessibility standard.
            </p>

            <div className="flex flex-wrap gap-2 my-6">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                <Check className="h-3.5 w-3.5 mr-1" /> WCAG 2.1 Level A
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                <Check className="h-3.5 w-3.5 mr-1" /> WCAG 2.1 Level AA
              </Badge>
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1">
                In Progress: WCAG 2.1 Level AAA
              </Badge>
            </div>

            <Tabs defaultValue="features" className="w-full my-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="features">Accessibility Features</TabsTrigger>
                <TabsTrigger value="technologies">Compatible Technologies</TabsTrigger>
                <TabsTrigger value="limitations">Known Limitations</TabsTrigger>
              </TabsList>
              <TabsContent value="features" className="p-6 border border-indigo-100 rounded-lg mt-4 bg-indigo-50/50">
                <h4 className="text-lg font-semibold text-indigo-900 mb-3">Platform Accessibility Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-0 list-none">
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="h-4 w-4 text-green-600 shrink-0" /> Text alternatives for non-text content
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="h-4 w-4 text-green-600 shrink-0" /> Captions for videos and audio content
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="h-4 w-4 text-green-600 shrink-0" /> Adaptable content presentation
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="h-4 w-4 text-green-600 shrink-0" /> Keyboard accessibility for all features
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="h-4 w-4 text-green-600 shrink-0" /> Sufficient time to read and use content
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="h-4 w-4 text-green-600 shrink-0" /> Content that doesn't cause seizures
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="h-4 w-4 text-green-600 shrink-0" /> Easy navigation options
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="h-4 w-4 text-green-600 shrink-0" /> Readable and understandable text
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="h-4 w-4 text-green-600 shrink-0" /> Predictable user interface operation
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="h-4 w-4 text-green-600 shrink-0" /> Input assistance for error prevention
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="technologies" className="p-6 border border-indigo-100 rounded-lg mt-4 bg-indigo-50/50">
                <h4 className="text-lg font-semibold text-indigo-900 mb-3">Assistive Technologies Supported</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Screen Readers:</strong> Compatible with JAWS, NVDA, VoiceOver, and TalkBack</li>
                  <li><strong>Voice Recognition:</strong> Works with Dragon NaturallySpeaking and built-in OS voice commands</li>
                  <li><strong>Screen Magnifiers:</strong> Compatible with ZoomText and OS-level magnification</li>
                  <li><strong>Alternative Input Devices:</strong> Supports switch controls and adapted keyboards</li>
                  <li><strong>Browser Compatibility:</strong> Tested with accessibility features in Chrome, Firefox, Safari, and Edge</li>
                </ul>
              </TabsContent>
              <TabsContent value="limitations" className="p-6 border border-indigo-100 rounded-lg mt-4 bg-indigo-50/50">
                <h4 className="text-lg font-semibold text-indigo-900 mb-3">Known Accessibility Limitations</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Complex Visualizations:</strong> Some advanced data visualizations may not be fully accessible to screen reader users. We provide alternative data tables in these cases.</li>
                  <li><strong>Interactive Simulations:</strong> Certain educational simulations may have limited keyboard navigation. We're working on improving these experiences.</li>
                  <li><strong>Third-Party Content:</strong> Some embedded content from external sources may not meet our accessibility standards. We're working with our partners to address these issues.</li>
                </ul>
                <p className="text-amber-700 mt-4 text-sm">We are actively working to resolve these limitations and improve accessibility across all areas of our platform.</p>
              </TabsContent>
            </Tabs>

            <Separator className="my-8" />

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">Assessment Methods</h3>
            <p className="text-gray-700 mb-4">
              LearnAI has assessed the accessibility of our platform by the following methods:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Self-evaluation:</strong> Internal assessment against WCAG 2.1 AA standards</li>
              <li><strong>External audit:</strong> Third-party accessibility experts evaluated our platform</li>
              <li><strong>User testing:</strong> Testing with users who rely on assistive technologies</li>
              <li><strong>Automated testing:</strong> Regular automated accessibility scans</li>
            </ul>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">Feedback and Contact Information</h3>
            <p className="text-gray-700 mb-4">
              We welcome your feedback on the accessibility of LearnAI. Please let us know if you encounter any accessibility 
              barriers or have suggestions for improvement:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Email: <a href="mailto:accessibility@learnai.example" className="text-indigo-600 hover:text-indigo-800">accessibility@learnai.example</a></li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Feedback Form: Available in the Help Center</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We strive to respond to all accessibility feedback within 2 business days, and to propose a solution within 10 business days.
            </p>

            <div className="flex items-center gap-3 mt-10 mb-4">
              <PanelLeft className="h-7 w-7 text-indigo-600" />
              <h3 className="text-xl font-semibold text-indigo-900 m-0">Customization Options</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Our platform offers several accessibility customization options to enhance your user experience:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100">
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="h-5 w-5 text-indigo-600" />
                  <h4 className="text-indigo-900 font-medium text-lg m-0">Display Settings</h4>
                </div>
                <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                  <li>High contrast mode</li>
                  <li>Font size adjustment</li>
                  <li>Line spacing controls</li>
                  <li>Color scheme options</li>
                  <li>Motion reduction settings</li>
                </ul>
              </div>

              <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100">
                <div className="flex items-center gap-2 mb-3">
                  <Headphones className="h-5 w-5 text-indigo-600" />
                  <h4 className="text-indigo-900 font-medium text-lg m-0">Content Adaptation</h4>
                </div>
                <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                  <li>Text-to-speech for content</li>
                  <li>Alternative formats for educational materials</li>
                  <li>Customizable keyboard shortcuts</li>
                  <li>Reading guides and focus tools</li>
                  <li>Simplified view options</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              To access these features, click on the "Accessibility" icon in the navigation bar or visit your profile settings.
            </p>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">Continuous Improvement</h3>
            <p className="text-gray-700 mb-4">
              LearnAI is committed to ongoing accessibility improvements. Our roadmap includes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Regular accessibility audits and user testing</li>
              <li>Staff training on digital accessibility best practices</li>
              <li>Incorporation of accessibility in our development lifecycle</li>
              <li>Working towards WCAG 2.1 Level AAA compliance where feasible</li>
              <li>Consultation with accessibility experts and users with disabilities</li>
            </ul>

            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 mt-10">
              <p className="text-indigo-900 font-semibold mb-1">Formal Approval of This Statement</p>
              <p className="text-gray-700 mb-0">
                This accessibility statement was reviewed and approved by LearnAI's leadership team on March 1, 2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}