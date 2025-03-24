import React from "react";
import { useLocation } from "wouter";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy: React.FC = () => {
  const [, navigate] = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Logo size="medium" className="text-primary" />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 max-w-3xl">
        <Button 
          variant="ghost" 
          className="mb-8 flex items-center"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-6">Privacy Policy</h1>
          <p className="text-neutral-600 mb-6">
            Last updated: March 23, 2025
          </p>
          
          <div className="space-y-6 text-neutral-700">
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-3">1. Introduction</h2>
              <p>
                At Carbo Software ("we", "our", or "us"), we respect your privacy and are committed to protecting your personal data. This privacy policy outlines how we collect, use, and safeguard your information when you use our workflow automation readiness assessment tool and related services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-3">2. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when using our services, including:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Contact information (such as name, email address, phone number)</li>
                <li>Business information (such as company name, job title, industry)</li>
                <li>Assessment responses and other information you provide through our surveys</li>
                <li>Usage data and interaction with our website and services</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-3">3. How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Providing and improving our services</li>
                <li>Analyzing assessment results to provide personalized recommendations</li>
                <li>Communicating with you about our services, updates, and offers</li>
                <li>Conducting research and analysis to improve business processes and services</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-3">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect the security of your personal data. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-3">5. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal data, including:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>The right to access your personal data</li>
                <li>The right to correct inaccurate or incomplete data</li>
                <li>The right to request deletion of your data</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-3">6. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time in response to changing legal, technical, or business developments. When we update our privacy policy, we will take appropriate measures to inform you, consistent with the significance of the changes we make.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-3">7. Contact Us</h2>
              <p>
                If you have any questions or concerns about our privacy practices or this policy, please contact us at:
              </p>
              <div className="mt-2">
                <p><strong>Email:</strong> privacy@carbosoftware.com</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Address:</strong> Carbo Software, 123 Tech Lane, Innovation City, IC 45678</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-neutral-900 text-neutral-400 py-6 px-6">
        <div className="container mx-auto max-w-4xl flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0">
            <Logo size="small" className="text-white" />
          </div>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact Us
            </a>
          </div>
          <div className="mt-4 md:mt-0">
            © 2025 Carbo Software. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;