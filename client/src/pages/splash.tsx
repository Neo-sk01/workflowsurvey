import React, { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import { 
  ArrowRight, 
  Zap, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  RefreshCw, 
  Users, 
  LineChart, 
  BarChart, 
  Percent,
  DollarSign,
  Smile
} from "lucide-react";
import { Footer } from "../components/Footer";

const Splash: React.FC = () => {
  const [, navigate] = useLocation();
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Logo size="medium" className="text-primary" />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 max-w-4xl flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          onAnimationComplete={() => setAnimationComplete(true)}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
            Workflow Automation <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Readiness Assessment</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-6 max-w-3xl mx-auto">
            Discover how AI-powered automation can transform your business operations and save you hours of manual work
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: animationComplete ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-10 max-w-3xl"
        >
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            What is <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">AI Workflow Automation</span>?
          </h2>
          <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
            AI Workflow Automation combines artificial intelligence with automation tools to transform 
            how businesses operate. This technology takes over repetitive, manual tasks 
            that consume your valuable time and energy. From simple data transfers between systems 
            to complex decision-making processes, AI-powered automation helps your business 
            run more smoothly and efficiently.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 p-5 rounded-lg border border-primary/20 flex flex-col items-center text-center shadow-md">
              <Zap className="w-12 h-12 text-primary mb-3" />
              <h3 className="font-medium text-neutral-900 mb-2">Automate Tedious Tasks</h3>
              <p className="text-neutral-700 text-sm">Eliminate manual data entry, file organization, and repetitive communications</p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 p-5 rounded-lg border border-primary/20 flex flex-col items-center text-center shadow-md">
              <Clock className="w-12 h-12 text-primary mb-3" />
              <h3 className="font-medium text-neutral-900 mb-2">Save Hours Each Week</h3>
              <p className="text-neutral-700 text-sm">Reclaim valuable time to focus on strategic priorities and growth activities</p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 p-5 rounded-lg border border-primary/20 flex flex-col items-center text-center shadow-md">
              <BarChart3 className="w-12 h-12 text-primary mb-3" />
              <h3 className="font-medium text-neutral-900 mb-2">Gain Valuable Insights</h3>
              <p className="text-neutral-700 text-sm">Leverage AI analytics to understand bottlenecks and optimize your business processes</p>
            </div>
          </div>
          
          <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
            Unlike traditional automation that follows strict rules, AI-powered solutions can 
            learn from patterns, adapt to changing conditions, and even make intelligent decisions 
            based on your business data.
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4 text-center">
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Real-World</span> AI Automation Benefits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Customer Support Stats */}
            <div className="relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl shadow-md overflow-hidden border border-primary/20">
              <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 rounded-bl-lg text-sm font-medium">
                Customer Support
              </div>
              <div className="pt-10 pb-6 px-4 text-center">
                <Users className="w-12 h-12 mx-auto text-primary mb-4" />
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-left">
                    <p className="text-sm text-neutral-500">Time Savings</p>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-primary mr-1" />
                      <span className="font-bold text-neutral-800">Up to 40%</span>
                    </div>
                  </div>
                  
                  <div className="w-16 h-16 relative">
                    <div className="w-full h-full rounded-full border-4 border-neutral-100"></div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">40%</span>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-transparent border-t-primary border-r-primary animate-pulse" style={{ animationDuration: '3s' }}></div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-neutral-500">Efficiency Gains</p>
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 text-amber-500 mr-1" />
                    <span className="font-medium text-neutral-800">Improved first-contact resolution</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-neutral-500">ROI</p>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                    <span className="font-medium text-neutral-800">Significant cost savings</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lead Generation Stats */}
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md overflow-hidden border border-blue-200">
              <div className="absolute top-0 right-0 bg-blue-600 text-white py-1 px-3 rounded-bl-lg text-sm font-medium">
                Lead Generation
              </div>
              <div className="pt-10 pb-6 px-4 text-center">
                <LineChart className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-left">
                    <p className="text-sm text-neutral-500">Time Savings</p>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="font-bold text-neutral-800">Up to 60%</span>
                    </div>
                  </div>
                  
                  <div className="w-16 h-16 relative">
                    <div className="w-full h-full rounded-full border-4 border-neutral-100"></div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <span className="text-lg font-bold text-blue-600">60%</span>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600 border-b-blue-600 animate-pulse" style={{ animationDuration: '3s' }}></div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-neutral-500">Conversion Rate Increase</p>
                  <div className="flex items-center">
                    <Percent className="w-4 h-4 text-amber-500 mr-1" />
                    <span className="font-bold text-neutral-800">Up to 51%</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-neutral-500">Cost Per Sign-up</p>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                    <span className="font-bold text-neutral-800">59% decrease</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media Marketing Stats */}
            <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md overflow-hidden border border-purple-200">
              <div className="absolute top-0 right-0 bg-purple-600 text-white py-1 px-3 rounded-bl-lg text-sm font-medium">
                Social Media
              </div>
              <div className="pt-10 pb-6 px-4 text-center">
                <BarChart className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-left">
                    <p className="text-sm text-neutral-500">Time Savings</p>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-purple-600 mr-1" />
                      <span className="font-medium text-neutral-800">Significant reduction</span>
                    </div>
                  </div>
                  
                  <div className="w-16 h-16 relative flex items-center justify-center bg-purple-100 rounded-full">
                    <Zap className="w-8 h-8 text-purple-600 animate-pulse" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-neutral-500">Engagement</p>
                  <div className="flex items-center">
                    <Smile className="w-4 h-4 text-amber-500 mr-1" />
                    <span className="font-medium text-neutral-800">Enhanced personalization</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-neutral-500">Ad Spend</p>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                    <span className="font-medium text-neutral-800">Optimized with minimal waste</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            Why We're Conducting This Assessment
          </h2>
          <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
            We created this assessment to help you discover your organization's automation potential. 
            By analyzing your current processes and technologies, we can identify the most impactful
            opportunities for implementing AI-powered automation in your workflow.
          </p>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            Benefits for You and Your Organization
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-lg p-5 shadow-md border border-primary/20">
              <h3 className="font-medium text-neutral-900 mb-3 text-lg flex items-center">
                <RefreshCw className="w-5 h-5 text-primary mr-2" />
                For You Personally:
              </h3>
              <ul className="list-disc list-inside text-neutral-700 space-y-2">
                <li>Eliminate hours spent on boring, repetitive tasks</li>
                <li>Focus on creative, meaningful work that's more fulfilling</li>
                <li>Reduce stress from deadline pressure and manual errors</li>
                <li>Develop higher-value skills instead of data entry</li>
                <li>Gain insights into modern tools that make your job easier</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-lg p-5 shadow-md border border-primary/20">
              <h3 className="font-medium text-neutral-900 mb-3 text-lg flex items-center">
                <BarChart3 className="w-5 h-5 text-primary mr-2" />
                For Your Organization:
              </h3>
              <ul className="list-disc list-inside text-neutral-700 space-y-2">
                <li>Significant cost savings through improved efficiency</li>
                <li>Enhanced customer satisfaction from faster service</li>
                <li>Scale operations without proportional staffing increases</li>
                <li>Reduce critical errors in business processes</li>
                <li>Gain competitive advantage through digital transformation</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-lg p-5 border border-primary/20 mb-8">
            <div className="flex items-center mb-3">
              <CheckCircle2 className="w-6 h-6 text-primary mr-2" />
              <h3 className="font-medium text-neutral-900 text-lg">What You'll Get From This Assessment:</h3>
            </div>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>A clear picture of your automation readiness</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Identification of your highest-value automation opportunities</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Practical next steps tailored to your business needs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Insights into which tools and approaches would work best for your situation</span>
              </li>
            </ul>
          </div>
          
          <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
            The assessment takes about 5-10 minutes to complete. Your answers will help us 
            create a personalized automation roadmap for your business.
          </p>
          
          <div className="flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="mb-3"
            >
              <Button
                size="lg"
                onClick={() => navigate("/home")}
                className="shadow-lg px-8 py-6 text-lg"
              >
                Start Your Assessment Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <p className="text-sm text-neutral-500">Free, no obligation, takes only 5-10 minutes</p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Splash;