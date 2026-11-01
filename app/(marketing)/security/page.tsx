'use client';

import { ChevronRight, Shield, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Security() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-16">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/" className="text-indigo-100 hover:text-white text-sm">Home</Link>
            <ChevronRight className="h-4 w-4 text-indigo-200" />
            <span className="text-white text-sm">Security Measures</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Security Measures</h1>
          <p className="text-indigo-100 mt-2">Last Updated: March 23, 2025</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-indigo-100">
          <div className="prose prose-indigo max-w-none">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-indigo-900 m-0">How We Protect Your Data</h2>
            </div>
            
            <p className="text-gray-700">
              At LearnAI, security is a top priority. We implement robust security measures to protect your personal information
              and educational data. This page outlines the steps we take to ensure the confidentiality, integrity, and availability
              of your data on our platform.
            </p>

            <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 my-6">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800 font-medium">Your Security Matters</AlertTitle>
              <AlertDescription className="text-green-700">
                We employ industry-standard security protocols and regular security assessments to keep your data safe.
              </AlertDescription>
            </Alert>

            <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">Encrypted Data</h3>
                  <p className="text-gray-600 text-sm">All sensitive data is encrypted both in transit and at rest using industry-standard protocols.</p>
                </CardContent>
              </Card>

              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">Secure Infrastructure</h3>
                  <p className="text-gray-600 text-sm">Our platform is hosted in secure data centers with physical and network security controls.</p>
                </CardContent>
              </Card>

              <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                    <AlertCircle className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 text-lg mb-2">Continuous Monitoring</h3>
                  <p className="text-gray-600 text-sm">We employ 24/7 monitoring for unauthorized access attempts and security threats.</p>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">1. Secure Authentication & Access</h3>
            <p className="text-gray-700 mb-4">
              We implement robust authentication mechanisms to protect your account and data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Strong Password Requirements:</strong> We enforce secure password policies requiring a mix of characters, numbers, and symbols.
              </li>
              <li>
                <strong>Multi-Factor Authentication (MFA):</strong> Optional MFA adds an extra layer of security by requiring a second verification step.
              </li>
              <li>
                <strong>Session Management:</strong> Automatic session timeouts and secure session handling prevent unauthorized access.
              </li>
              <li>
                <strong>Role-Based Access Controls:</strong> We implement strict permissions based on user roles to ensure data access is appropriately limited.
              </li>
              <li>
                <strong>Login Monitoring:</strong> We track login attempts and can detect suspicious activity from unusual locations or devices.
              </li>
            </ul>

            <Separator className="my-8" />

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">2. Data Encryption & Protection</h3>
            <p className="text-gray-700 mb-4">
              We use industry-standard encryption and data protection technologies:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Transport Layer Security (TLS):</strong> All data transmitted between your device and our servers is encrypted using TLS protocols.
              </li>
              <li>
                <strong>At-Rest Encryption:</strong> Your stored data is encrypted in our databases and file storage systems.
              </li>
              <li>
                <strong>Secure Key Management:</strong> We employ secure key management practices to protect encryption keys.
              </li>
              <li>
                <strong>Data Isolation:</strong> We maintain logical separation of customer data to prevent unauthorized access.
              </li>
            </ul>

            <Accordion type="single" collapsible className="w-full my-8">
              <AccordionItem value="item-1" className="border border-indigo-100 rounded-lg bg-indigo-50/50 mb-4">
                <AccordionTrigger className="px-4 py-3 text-indigo-900 hover:text-indigo-700 font-medium">Encryption Standards We Use</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0 text-gray-700">
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li><strong>TLS 1.3:</strong> For all data in transit</li>
                    <li><strong>AES-256:</strong> For encrypting sensitive data at rest</li>
                    <li><strong>SHA-256:</strong> For secure hashing operations</li>
                    <li><strong>RSA-2048/4096:</strong> For key exchange and digital signatures</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-indigo-100 rounded-lg bg-indigo-50/50">
                <AccordionTrigger className="px-4 py-3 text-indigo-900 hover:text-indigo-700 font-medium">Educational Data Protection Features</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0 text-gray-700">
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li><strong>Advanced Access Controls:</strong> Student data is only accessible to authorized educators and admins</li>
                    <li><strong>Anonymization Options:</strong> For research and analytics, data can be anonymized</li>
                    <li><strong>FERPA Compliance:</strong> Our platform follows educational privacy standards</li>
                    <li><strong>Configurable Visibility:</strong> Students can control the visibility of their progress to peers</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">3. Infrastructure Security</h3>
            <p className="text-gray-700 mb-4">
              Our platform's infrastructure is designed with security as a foundation:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Secure Data Centers:</strong> Our services are hosted in SOC 2 compliant data centers with physical security controls.
              </li>
              <li>
                <strong>Network Security:</strong> We employ firewalls, intrusion detection systems, and network monitoring to protect against threats.
              </li>
              <li>
                <strong>Regular Patching:</strong> Our systems are regularly updated with security patches to address vulnerabilities.
              </li>
              <li>
                <strong>Redundancy:</strong> We maintain redundant systems to ensure service availability and data protection.
              </li>
            </ul>

            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 my-8">
              <h4 className="text-lg font-semibold text-indigo-900 mb-2">Our Security Certifications & Compliance</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-4 rounded-md border border-indigo-100">
                  <div className="font-medium text-indigo-900 mb-1">ISO 27001</div>
                  <div className="text-sm text-gray-600">Information security management</div>
                </div>
                <div className="bg-white p-4 rounded-md border border-indigo-100">
                  <div className="font-medium text-indigo-900 mb-1">SOC 2 Type II</div>
                  <div className="text-sm text-gray-600">Controls for security, availability, and confidentiality</div>
                </div>
                <div className="bg-white p-4 rounded-md border border-indigo-100">
                  <div className="font-medium text-indigo-900 mb-1">GDPR Compliant</div>
                  <div className="text-sm text-gray-600">European data protection regulations</div>
                </div>
                <div className="bg-white p-4 rounded-md border border-indigo-100">
                  <div className="font-medium text-indigo-900 mb-1">FERPA Compliant</div>
                  <div className="text-sm text-gray-600">U.S. student data privacy protection</div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">4. Application Security</h3>
            <p className="text-gray-700 mb-4">
              We follow secure development practices to protect our application:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Secure Development Lifecycle:</strong> Security is integrated into every phase of our development process.
              </li>
              <li>
                <strong>Regular Security Testing:</strong> We perform penetration testing, vulnerability scanning, and code reviews.
              </li>
              <li>
                <strong>Protection Against Common Threats:</strong> Our application includes safeguards against SQL injection, XSS, CSRF, and other common vulnerabilities.
              </li>
              <li>
                <strong>Third-Party Security Reviews:</strong> We engage external security experts to evaluate our platform.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">5. Incident Response</h3>
            <p className="text-gray-700 mb-4">
              In the unlikely event of a security incident, we have established procedures:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Incident Response Team:</strong> A dedicated team is available to respond to security incidents.
              </li>
              <li>
                <strong>Notification Procedures:</strong> We will notify affected users in accordance with applicable laws and regulations.
              </li>
              <li>
                <strong>Continuous Improvement:</strong> We regularly update our security measures based on incident learnings.
              </li>
            </ul>

            <Alert className="bg-amber-50 border-amber-200 my-6">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <AlertTitle className="text-amber-800 font-medium">Report Security Concerns</AlertTitle>
              <AlertDescription className="text-amber-700">
                If you discover a security vulnerability or have concerns about our platform's security, please contact our security team immediately at <a href="mailto:security@learnai.example" className="text-amber-800 underline">security@learnai.example</a>.
              </AlertDescription>
            </Alert>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">6. User Security Recommendations</h3>
            <p className="text-gray-700 mb-4">
              While we implement strong security measures, you can help keep your account secure by:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Using strong, unique passwords for your LearnAI account</li>
              <li>Enabling multi-factor authentication when available</li>
              <li>Being cautious of phishing attempts claiming to be from LearnAI</li>
              <li>Keeping your devices and browsers updated</li>
              <li>Logging out of your account when using shared computers</li>
              <li>Reviewing your account activity regularly for any suspicious behavior</li>
            </ul>

            <h3 className="text-xl font-semibold text-indigo-900 mt-10 mb-4">7. Contact Our Security Team</h3>
            <p className="text-gray-700 mb-4">
              For questions about our security practices or to report security concerns, please contact:
            </p>
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 mt-4">
              <p className="text-gray-800 mb-1"><strong>LearnAI Security Team</strong></p>
              <p className="text-gray-700 mb-1">Email: security@learnai.example</p>
              <p className="text-gray-700 mb-1">For urgent security issues: +1 (555) 987-6543</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}