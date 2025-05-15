import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function PrivacyPolicy() {
    return (<div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4"/>
                Back to Home
              </Button>
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>Last Updated: May 15, 2025</p>
              
              <h2>1. Introduction</h2>
              <p>
                At Ciquerio ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our website or services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
              </p>
              
              <h2>2. Information We Collect</h2>
              
              <h3>Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide when interacting with our website, such as:</p>
              <ul>
                <li>Contact information (name, email address, phone number, company name)</li>
                <li>Information provided in contact forms</li>
                <li>Professional information (job title, industry)</li>
                <li>Preferences and interests relevant to our services</li>
              </ul>
              
              <h3>Automatically Collected Information</h3>
              <p>When you visit our website, we may automatically collect certain information about your device and usage patterns, including:</p>
              <ul>
                <li>IP address and device identifiers</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on those pages</li>
                <li>Referral sources</li>
                <li>Click patterns and interactions with the website</li>
                <li>Date and time of visits</li>
              </ul>
              
              <h2>3. Use of Cookies and Similar Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to collect and track information about your browsing activities on our website. Cookies are small data files that are placed on your device when you visit a website, which enable the website to remember your actions and preferences over time.
              </p>
              <p>We use the following types of cookies:</p>
              <ul>
                <li><strong>Essential cookies:</strong> These cookies are necessary for the website to function properly.</li>
                <li><strong>Analytical/performance cookies:</strong> These cookies allow us to recognize and count the number of visitors and see how visitors move around our website.</li>
                <li><strong>Functionality cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization.</li>
                <li><strong>Targeting cookies:</strong> These cookies record your visit to our website, the pages you have visited, and the links you have followed.</li>
              </ul>
              <p>
                You can control and manage cookies through your browser settings. However, if you disable cookies, some features of our website may not function properly.
              </p>
              
              <h2>4. How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including to:</p>
              <ul>
                <li>Provide, maintain, and improve our website and services</li>
                <li>Process and respond to your inquiries and requests</li>
                <li>Send you technical notices, updates, and administrative messages</li>
                <li>Provide you with news, special offers, and information about our services</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Protect against unauthorized access and legal liability</li>
              </ul>
              
              <h2>5. How We Share Your Information</h2>
              <p>We may share your information with:</p>
              <ul>
                <li><strong>Service Providers:</strong> Third-party vendors and service providers who perform services on our behalf, such as web hosting, data analysis, and customer service.</li>
                <li><strong>Business Partners:</strong> With your consent, we may share your information with business partners to offer certain products, services, or promotions.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
              </ul>
              
              <h2>6. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              
              <h2>7. Data Retention</h2>
              <p>
                We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
              
              <h2>8. Your Rights and Choices</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul>
                <li>The right to access personal information we hold about you</li>
                <li>The right to request correction of inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to object to processing of your information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
              
              <h2>9. International Data Transfers</h2>
              <p>
                Your information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws that differ from the laws of your country.
              </p>
              <p>
                If we transfer your information to other countries, we will take appropriate safeguards to ensure that your information remains protected in accordance with this Privacy Policy.
              </p>
              
              <h2>10. Children's Privacy</h2>
              <p>
                Our website is not intended for children under the age of 16, and we do not knowingly collect personal information from children under 16. If we learn that we have collected personal information from a child under 16, we will take steps to delete such information as soon as possible.
              </p>
              
              <h2>11. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post the revised Policy on this page and update the "Last Updated" date.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically to stay informed about our information practices.
              </p>
              
              <h2>12. Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> info@ciquerio.com
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>);
}
