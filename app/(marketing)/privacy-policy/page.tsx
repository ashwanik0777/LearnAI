'use client';

import { ChevronRight, Shield, Lock, Database, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-16">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/" className="text-indigo-100 hover:text-white text-sm">Home</Link>
            <ChevronRight className="h-4 w-4 text-indigo-200" />
            <span className="text-white text-sm">Privacy Policy</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="text-indigo-100 mt-2">Last Updated: March 23, 2025</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-indigo-100">
          <div className="prose prose-indigo max-w-none">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-indigo-900 m-0">Our Commitment to Privacy</h2>
            </div>
            
            <p className="text-gray-700">
              At LearnAI, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational platform.
            </p>

            <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">Secure by Design</h3>
                  <p className="text-gray-600 text-sm">We implement robust security measures to protect your personal data from unauthorized access.</p>
                </CardContent>
              </Card>

              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">Data Minimization</h3>
                  <p className="text-gray-600 text-sm">We only collect the data necessary to provide and improve our educational services to you.</p>
                </CardContent>
              </Card>

              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <Eye className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">Transparency</h3>
                  <p className="text-gray-600 text-sm">We're clear about how we use your data and provide easy ways for you to control your privacy settings.</p>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">1. Information We Collect</h3>
            <p className="text-gray-700 mb-4">
              We collect information that you provide directly to us, information we collect automatically when you use our services, and information from third-party sources.
            </p>
            <h4 className="text-lg font-medium text-indigo-800 mt-6 mb-2">1.1 Information You Provide</h4>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Account information: When you register, we collect your name, email address, password, academic level, and learning preferences.</li>
              <li>Profile information: Additional information you provide in your profile such as profile picture, educational background, and learning goals.</li>
              <li>Course content and activities: Your submissions, assignments, quiz responses, and other learning activities.</li>
              <li>Communications: Information you provide when you contact us for support or participate in community forums.</li>
            </ul>

            <h4 className="text-lg font-medium text-indigo-800 mt-6 mb-2">1.2 Information We Collect Automatically</h4>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Usage data: Including how you interact with our platform, the courses you access, time spent on various activities, and your learning patterns.</li>
              <li>Device information: IP address, browser type, operating system, and device identifiers.</li>
              <li>Location information: General location derived from your IP address.</li>
              <li>Cookies and similar technologies: Used to enhance your experience and collect information about how you use our services.</li>
            </ul>

            <Separator className="my-8" />

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">2. How We Use Your Information</h3>
            <p className="text-gray-700 mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>To provide personalized learning experiences based on your academic level, learning style, and progress.</li>
              <li>To improve and optimize our educational platform and content.</li>
              <li>To communicate with you about your account, respond to inquiries, and provide customer support.</li>
              <li>To send you updates, newsletters, and educational resources (with your consent).</li>
              <li>To analyze user behavior and trends to enhance our educational offerings.</li>
              <li>To detect and prevent fraudulent activity and ensure the security of our platform.</li>
              <li>To comply with legal obligations and enforce our terms of service.</li>
            </ul>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">3. How We Share Your Information</h3>
            <p className="text-gray-700 mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>With service providers who perform services on our behalf.</li>
              <li>With educational partners to facilitate learning programs you've enrolled in.</li>
              <li>When required by law or to respond to legal process.</li>
              <li>To protect the rights, property, or safety of LearnAI, our users, or others.</li>
              <li>In connection with a business transaction such as a merger, acquisition, or sale of assets.</li>
            </ul>

            <Separator className="my-8" />

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">4. Your Privacy Rights and Choices</h3>
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access and portability: Request a copy of your personal information.</li>
              <li>Correction: Update or correct inaccurate information.</li>
              <li>Deletion: Request deletion of your personal information.</li>
              <li>Restriction: Limit how we process your information.</li>
              <li>Objection: Object to our processing of your information.</li>
              <li>Consent withdrawal: Withdraw consent at any time for activities based on consent.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              To exercise these rights, please contact us at privacy@learnai.example.
            </p>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">5. Data Security</h3>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Encryption of sensitive data both in transit and at rest.</li>
              <li>Regular security assessments and penetration testing.</li>
              <li>Access controls and authentication mechanisms to prevent unauthorized access.</li>
              <li>Employee training on data security and privacy practices.</li>
              <li>Incident response procedures to address potential data breaches.</li>
            </ul>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">6. International Data Transfers</h3>
            <p className="text-gray-700 mb-4">
              Your information may be transferred to and processed in countries other than your country of residence. 
              We ensure appropriate safeguards are in place to protect your information when transferred internationally.
            </p>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">7. Data Retention</h3>
            <p className="text-gray-700 mb-4">
              We retain your personal information for as long as necessary to provide our services, 
              comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">8. Children's Privacy</h3>
            <p className="text-gray-700 mb-4">
              Our services are designed for students of all academic levels, including children. 
              We comply with applicable laws related to children's privacy, such as the Children's Online Privacy Protection Act (COPPA).
              For users under 13, we obtain parental consent and provide additional privacy protections.
            </p>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">9. Changes to This Privacy Policy</h3>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page
              and updating the "Last Updated" date. For significant changes, we will provide additional notice.
            </p>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">10. Contact Us</h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
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