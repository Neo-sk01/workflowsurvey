import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const Home: React.FC = () => {
  const [, navigate] = useLocation();

  const benefits = [
    "Identify automation opportunities in your business",
    "Discover time-saving workflow improvements",
    "Understand your digital readiness level",
    "Receive a personalized assessment report",
    "Get tailored recommendations for your business",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Logo size="medium" className="text-primary" />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl font-bold text-neutral-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Workflow Automation Readiness Assessment
          </motion.h1>
          <motion.p
            className="text-xl text-neutral-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover your business's automation potential and identify
            opportunities to streamline operations
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
              Are you ready to transform your business with AI-powered
              automation?
            </h2>
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                  <p className="text-neutral-700">{benefit}</p>
                </div>
              ))}
            </div>
            <Button
              size="lg"
              onClick={() => navigate("/survey")}
              className="text-white bg-primary hover:bg-primary-600"
            >
              Begin Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    What You'll Learn
                  </h3>
                  <p className="text-neutral-600">
                    This assessment will help you understand:
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-medium text-neutral-900 mb-1">
                      Automation Potential
                    </h4>
                    <p className="text-sm text-neutral-600">
                      Which areas of your business are ripe for automation
                    </p>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-medium text-neutral-900 mb-1">
                      Digital Readiness
                    </h4>
                    <p className="text-sm text-neutral-600">
                      How prepared your systems are for integration with modern
                      tools
                    </p>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-medium text-neutral-900 mb-1">
                      ROI Potential
                    </h4>
                    <p className="text-sm text-neutral-600">
                      The potential time and cost savings from automation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <footer className="bg-neutral-900 text-neutral-400 py-6 px-6">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center text-sm">
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

export default Home;
