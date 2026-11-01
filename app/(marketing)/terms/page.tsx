'use client';

import { ChevronRight, Scale, FileText, AlertTriangle, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-16">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/" className="text-indigo-100 hover:text-white text-sm">Home</Link>
            <ChevronRight className="h-4 w-4 text-indigo-200" />
            <span className="text-white text-sm">Terms of Service</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Service</h1>
          <p className="text-indigo-100 mt-2">Last Updated: March 23, 2025</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-indigo-100">
          <div className="prose prose-indigo max-w-none">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="h-8 w-8 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-indigo-900 m-0">Terms of Service Agreement</h2>
            </div>
            
            <p className="text-gray-700">
              Welcome to LearnAI. These Terms of Service ("Terms") govern your access to and use of the LearnAI platform, including our website, mobile applications, and educational services (collectively, the "Services"). Please read these Terms carefully before using our Services.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 shrink-0" />
                <p className="text-amber-800 text-sm m-0">
                  By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our Services.
                </p>
              </div>
            </div>

            <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">Complete Agreement</h3>
                  <p className="text-gray-600 text-sm">These Terms constitute the entire agreement between you and LearnAI regarding our Services.</p>
                </CardContent>
              </Card>

              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <Scale className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">Legal Binding</h3>
                  <p className="text-gray-600 text-sm">By using our platform, you enter into a legally binding agreement with LearnAI Education Technologies.</p>
                </CardContent>
              </Card>

              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <HelpCircle className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">Questions?</h3>
                  <p className="text-gray-600 text-sm">If you have questions about these Terms, contact our legal team at legal@learnai.example.</p>
                </CardContent>
              </Card>
            </div>

            <Accordion type="single" collapsible className="w-full my-8">
              <AccordionItem value="item-1" className="border-b border-indigo-200">
                <AccordionTrigger className="text-lg font-semibold text-indigo-900 hover:text-indigo-700">Quick Summary of Key Terms</AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Account Responsibility:</strong> You are responsible for maintaining the security of your account credentials.</li>
                    <li><strong>Acceptable Use:</strong> You may not use our platform for any illegal or unauthorized purpose.</li>
                    <li><strong>Content Ownership:</strong> You own your content, but grant us a license to use it for providing our services.</li>
                    <li><strong>Service Changes:</strong> We may modify or discontinue the service at any time with or without notice.</li>
                    <li><strong>Termination:</strong> Either party may terminate this agreement at any time for any reason.</li>
                    <li><strong>Refunds:</strong> Eligibility for refunds is detailed in our Refund Policy section.</li>
                    <li><strong>Limitation of Liability:</strong> Our liability is limited as described in these terms.</li>
                  </ul>
                  <p className="text-amber-700 mt-4 text-sm">This summary is not a substitute for reading the full Terms of Service below.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">1. Account Registration and Eligibility</h3>
            <p className="text-gray-700 mb-4">
              To use certain features of our Services, you may need to register for an account.
            </p>
            <h4 className="text-lg font-medium text-indigo-800 mt-6 mb-2">1.1 Account Registration</h4>
            <p className="text-gray-700 mb-4">
              When you register for an account, you agree to provide accurate, current, and complete information and to keep this information updated. 
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            
            <h4 className="text-lg font-medium text-indigo-800 mt-6 mb-2">1.2 Eligibility</h4>
            <p className="text-gray-700 mb-4">
              Our Services are available to users of all ages. However:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>If you are under 18, you must have the permission of a parent or guardian to use our Services.</li>
              <li>If you are under 13, your parent or guardian must register your account and supervise your use of our Services.</li>
            </ul>

            <Separator className="my-8" />

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">2. Use of Services</h3>
            <h4 className="text-lg font-medium text-indigo-800 mt-6 mb-2">2.1 Acceptable Use</h4>
            <p className="text-gray-700 mb-4">
              You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Use the Services in any way that violates applicable laws or regulations.</li>
              <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity.</li>
              <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Services.</li>
              <li>Attempt to access any part of the Services, or any server, account, or database connected to the Services, by hacking, password mining, or other illegitimate means.</li>
              <li>Use the Services to transmit any material that contains viruses, trojan horses, or other harmful computer code.</li>
              <li>Collect or store personal data about other users without their consent.</li>
            </ul>

            <h4 className="text-lg font-medium text-indigo-800 mt-6 mb-2">2.2 Content and Conduct Guidelines</h4>
            <p className="text-gray-700 mb-4">
              You are responsible for all content you submit, post, or display through our Services. You agree that you will not post content that:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Is defamatory, obscene, pornographic, or offensive.</li>
              <li>Promotes discrimination, bigotry, racism, hatred, or harm against any individual or group.</li>
              <li>Infringes on the intellectual property rights of others.</li>
              <li>Violates the privacy or publicity rights of others.</li>
              <li>Contains false or misleading information.</li>
            </ul>

            <Separator className="my-8" />

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">3. Intellectual Property Rights</h3>
            <h4 className="text-lg font-medium text-indigo-800 mt-6 mb-2">3.1 Our Intellectual Property</h4>
            <p className="text-gray-700 mb-4">
              The Services and all content, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, 
              and the design, selection, and arrangement thereof) are owned by LearnAI, its licensors, or other providers of such material and are protected by 
              copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>

            <h4 className="text-lg font-medium text-indigo-800 mt-6 mb-2">3.2 License to Use Our Services</h4>
            <p className="text-gray-700 mb-4">
              Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to access and use our Services for personal, 
              non-commercial educational purposes.
            </p>

            <h4 className="text-lg font-medium text-indigo-800 mt-6 mb-2">3.3 Your Content</h4>
            <p className="text-gray-700 mb-4">
              You retain all rights to any content you submit, post, or display on or through our Services. By submitting, posting, or displaying content on or through our Services, 
              you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content in connection 
              with providing our Services.
            </p>

            <Separator className="my-8" />

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">4. Subscriptions and Payments</h3>
            <h4 className="text-lg font-medium text-indigo-800 mt-6 mb-2">4.1 Subscription Services</h4>
            <p className="text-gray-700 mb-4">
              Some of our Services are available on a subscription basis. By subscribing to our Services, you agree to pay the applicable subscription fees as they become due.
            </p>

            <h4 className="text-lg font-medium text-indigo-800 mt-6 mb-2">4.2 Payment Terms</h4>
            <p className="text-gray-700 mb-4">
              All payments are due at the time of subscription or renewal. We accept payment through the methods specified on our website. 
              You authorize us to charge your selected payment method for all fees incurred by you.
            </p>

            <h4 className="text-lg font-medium text-indigo-800 mt-6 mb-2">4.3 Refunds</h4>
            <p className="text-gray-700 mb-4">
              Our refund policy is detailed on our website. Generally, refunds are available within 14 days of initial subscription if you are not satisfied with our Services. 
              No refunds are available for partial subscription periods or for subscriptions cancelled after the refund period.
            </p>

            <Separator className="my-8" />

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">5. Limitation of Liability</h3>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law, in no event shall LearnAI, its affiliates, officers, directors, employees, agents, or licensors be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including but not limited to, loss of profits, data, use, goodwill, or other intangible losses, 
              resulting from:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Your access to or use of or inability to access or use the Services;</li>
              <li>Any conduct or content of any third party on the Services;</li>
              <li>Any content obtained from the Services; and</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
            </ul>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">6. Indemnification</h3>
            <p className="text-gray-700 mb-4">
              You agree to defend, indemnify, and hold harmless LearnAI, its affiliates, licensors, and service providers, and its and their respective officers, 
              directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, 
              awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services.
            </p>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">7. Termination</h3>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason whatsoever, 
              including, without limitation, if you breach these Terms. Upon termination, your right to use the Services will immediately cease.
            </p>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">8. Changes to Terms</h3>
            <p className="text-gray-700 mb-4">
              We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them, 
              and apply to all access to and use of the Services thereafter. Your continued use of the Services following the posting of revised Terms means 
              that you accept and agree to the changes.
            </p>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">9. Governing Law</h3>
            <p className="text-gray-700 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without giving effect to any principles of conflicts of law.
            </p>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">10. Contact Information</h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 mt-4">
              <p className="text-gray-800 mb-1"><strong>LearnAI Legal Department</strong></p>
              <p className="text-gray-700 mb-1">Email: legal@learnai.example</p>
              <p className="text-gray-700 mb-1">Address: 123 Education Avenue, Knowledge City, KS 12345</p>
              <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}