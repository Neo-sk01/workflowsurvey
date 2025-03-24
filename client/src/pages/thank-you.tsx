import React from "react";
import { useLocation } from "wouter";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";

const ThankYou: React.FC = () => {
  const [, navigate] = useLocation();

  const downloadResults = () => {
    // Placeholder: Replace with actual download logic
    console.log("Downloading results...");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Logo size="medium" className="text-primary" />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">
            Thank You for Completing the Assessment!
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            We've received your responses and will analyze your automation readiness.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mb-8 shadow-md">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                What happens next?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                    1
                  </div>
                  <div>
                    <p className="text-neutral-800">
                      Our experts will review your responses and analyze your
                      automation readiness level.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                    2
                  </div>
                  <div>
                    <p className="text-neutral-800">
                      We'll prepare a customized report highlighting areas where
                      automation can benefit your business the most.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                    3
                  </div>
                  <div>
                    <p className="text-neutral-800">
                      A Carbo Software consultant will reach out within 2
                      business days to discuss your results and potential next
                      steps.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={downloadResults}
              >
                <Download className="h-4 w-4 mr-2" /> Download Results
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  navigate("/");
                }}
              >
                Return to Homepage
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-md bg-primary/5 border border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Want to get started sooner?
              </h3>
              <p className="text-neutral-700 mb-4">
                Schedule a consultation with one of our automation experts to
                discuss your business needs and how Carbo Software can help you
                streamline your operations.
              </p>
              <Button className="w-full">
                Schedule a Free Consultation
              </Button>
            </CardContent>
          </Card>
        </motion.div>
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

export default ThankYou;