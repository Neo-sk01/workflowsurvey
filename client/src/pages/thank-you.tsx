import React from "react";
import { useLocation, useSearch } from "wouter";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, 
  ArrowRight, 
  Download, 
  Zap, 
  AlertTriangle, 
  Lightbulb, 
  ArrowUpRight,
  BarChart3,
  Building,
  RotateCw,
  DollarSign
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type AIAnalysis } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Footer } from "../components/Footer";

// Component to display industry benchmark comparison
const IndustryComparisonChart = ({ 
  automationScore, 
  industryAverage
}: { 
  automationScore: number, 
  industryAverage: number 
}) => {
  return (
    <div className="relative pt-6 pb-3">
      <div className="absolute w-full h-3 bg-gray-200 rounded-full" />
      <div className="absolute h-3 bg-green-200 rounded-full" style={{ width: `${industryAverage}%` }} />
      <div className="absolute h-3 bg-blue-500 rounded-full" style={{ width: `${automationScore}%` }} />
      
      <div 
        className="absolute -mt-6 text-blue-800 font-medium text-xs px-2 py-1 rounded bg-blue-100"
        style={{ 
          left: `${Math.max(2, Math.min(automationScore, 98))}%`, 
          transform: 'translateX(-50%)' 
        }}
      >
        You: {automationScore}%
      </div>
      
      <div 
        className="absolute mt-4 text-green-800 font-medium text-xs px-2 py-1 rounded bg-green-100"
        style={{ 
          left: `${Math.max(2, Math.min(industryAverage, 98))}%`, 
          transform: 'translateX(-50%)' 
        }}
      >
        Industry: {industryAverage}%
      </div>
    </div>
  );
};

const ThankYou: React.FC = () => {
  const [, navigate] = useLocation();
  const search = useSearch();
  const assessmentId = new URLSearchParams(search).get("id");

  // Query the AI analysis results if we have an assessment ID
  const { data: analysis, isLoading } = useQuery({
    queryKey: ["analysis", assessmentId],
    queryFn: () => {
      return apiRequest<{ analysis: AIAnalysis }>(
        "GET", 
        `/api/survey/analysis?id=${assessmentId}`
      );
    },
    enabled: !!assessmentId,
    staleTime: Infinity, // Analysis results won't change
  });

  const downloadResults = () => {
    if (!analysis) return;
    
    // Create a JSON blob with the analysis data
    const dataStr = JSON.stringify(analysis, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    
    // Create a link and trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "automation-assessment-results.json";
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Get readiness level color based on score
  const getReadinessColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 70) return "text-blue-600 bg-blue-100";
    if (score >= 50) return "text-amber-600 bg-amber-100";
    return "text-red-600 bg-red-100";
  };

  // Has industry insights from web search
  const hasIndustryInsights = analysis?.analysis?.industryInsights !== undefined;
  const hasRecommendedTools = analysis?.analysis?.recommendedTools !== undefined;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <Logo size="small" className="text-primary" />
            </a>
          </div>
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="text-neutral-600 border-neutral-300 hover:bg-neutral-100"
            >
              Back to Home
            </Button>
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
            {assessmentId 
              ? "We've analyzed your responses with our AI-powered system." 
              : "We've received your responses and will analyze your automation readiness."}
          </p>
        </motion.div>

        {assessmentId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="shadow-md border-blue-100 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-blue-800 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-blue-600" />
                    AI-Powered Analysis
                  </CardTitle>
                  <Badge variant="outline" className="bg-blue-200 text-blue-700 hover:bg-blue-200">
                    Real-time Data
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-40 w-full" />
                  </div>
                ) : analysis ? (
                  <div>
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium text-neutral-700">Automation Readiness Score</h4>
                        <span className="font-bold text-lg text-primary">{analysis.analysis.automationScore}/100</span>
                      </div>
                      <Progress value={analysis.analysis.automationScore} className="h-3" />
                      <div className="mt-2 text-center">
                        <Badge className={`px-3 py-1 ${getReadinessColor(analysis.analysis.automationScore)}`}>
                          {analysis.analysis.readinessLevel}
                        </Badge>
                      </div>
                      
                      {/* Industry comparison if available */}
                      {hasIndustryInsights && (
                        <div className="mt-6 bg-blue-50 p-3 rounded-lg border border-blue-100">
                          <div className="flex items-center mb-2">
                            <Building className="h-4 w-4 mr-2 text-blue-700" />
                            <h5 className="font-medium text-blue-800">
                              {analysis.analysis.industryInsights?.industryName} Industry Comparison
                            </h5>
                          </div>
                          <IndustryComparisonChart 
                            automationScore={analysis.analysis.automationScore} 
                            industryAverage={analysis.analysis.industryInsights?.automationLevel || 0}
                          />
                        </div>
                      )}
                    </div>
                    
                    <Tabs defaultValue="insights">
                      <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="insights">Key Insights</TabsTrigger>
                        <TabsTrigger value="benchmarks">Industry Benchmarks</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="insights" className="mt-4">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="challenges" className="border-blue-100">
                            <AccordionTrigger className="text-sm font-medium text-neutral-800 hover:text-primary">
                              <div className="flex items-center">
                                <AlertTriangle size={16} className="mr-2 text-amber-500" />
                                <span>Key Challenges</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700">
                                {analysis.analysis.keyChallenges.map((challenge, index) => (
                                  <li key={index}>{challenge}</li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="opportunities" className="border-blue-100">
                            <AccordionTrigger className="text-sm font-medium text-neutral-800 hover:text-primary">
                              <div className="flex items-center">
                                <Lightbulb size={16} className="mr-2 text-yellow-500" />
                                <span>Automation Opportunities</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700">
                                {analysis.analysis.opportunities.map((opportunity, index) => (
                                  <li key={index}>{opportunity}</li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="steps" className="border-blue-100">
                            <AccordionTrigger className="text-sm font-medium text-neutral-800 hover:text-primary">
                              <div className="flex items-center">
                                <ArrowUpRight size={16} className="mr-2 text-green-500" />
                                <span>Recommended Next Steps</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700">
                                {analysis.analysis.nextSteps.map((step, index) => (
                                  <li key={index}>{step}</li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          
                          {hasRecommendedTools && (
                            <AccordionItem value="tools" className="border-blue-100">
                              <AccordionTrigger className="text-sm font-medium text-neutral-800 hover:text-primary">
                                <div className="flex items-center">
                                  <RotateCw size={16} className="mr-2 text-purple-500" />
                                  <span>Recommended Tools</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-3">
                                  {analysis.analysis.recommendedTools?.map((tool, index) => (
                                    <div key={index} className="border border-blue-100 rounded-md p-2">
                                      <h4 className="font-medium text-blue-800">{tool.name}</h4>
                                      <p className="text-xs text-neutral-600 mb-1">{tool.description}</p>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {tool.useCases.map((useCase, i) => (
                                          <Badge key={i} variant="outline" className="text-xs bg-blue-50">
                                            {useCase}
                                          </Badge>
                                        ))}
                                      </div>
                                      <p className="text-xs text-neutral-500 mt-1">
                                        <span className="font-medium">Pricing:</span> {tool.pricingModel}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )}
                        </Accordion>
                      </TabsContent>
                      
                      <TabsContent value="benchmarks" className="mt-4">
                        {hasIndustryInsights ? (
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-neutral-800 flex items-center mb-2">
                                <BarChart3 size={16} className="mr-2 text-blue-600" />
                                <span>Process Automation by Department</span>
                              </h4>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Process</TableHead>
                                    <TableHead className="text-right">Automation %</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {Object.entries(analysis.analysis.industryInsights?.benchmarks || {}).map(([key, value]) => (
                                    <TableRow key={key}>
                                      <TableCell>{key}</TableCell>
                                      <TableCell className="text-right">
                                        <div className="flex items-center justify-end">
                                          <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                                            <div 
                                              className="h-2 bg-blue-500 rounded-full" 
                                              style={{ width: `${value}%` }}
                                            />
                                          </div>
                                          {value}%
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-neutral-800 flex items-center mb-2">
                                <DollarSign size={16} className="mr-2 text-green-600" />
                                <span>Expected ROI for Automation</span>
                              </h4>
                              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                <dl className="grid grid-cols-2 gap-4">
                                  <div>
                                    <dt className="text-xs text-green-700">Average Timeframe</dt>
                                    <dd className="text-sm font-bold text-green-800">
                                      {analysis.analysis.industryInsights?.roi.timeframe}
                                    </dd>
                                  </div>
                                  <div>
                                    <dt className="text-xs text-green-700">Average Return</dt>
                                    <dd className="text-sm font-bold text-green-800">
                                      {analysis.analysis.industryInsights?.roi.averageReturn}
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-neutral-800 flex items-center mb-2">
                                <Lightbulb size={16} className="mr-2 text-yellow-500" />
                                <span>Case Studies</span>
                              </h4>
                              <ul className="text-sm space-y-1 text-neutral-700 pl-5 list-disc">
                                {analysis.analysis.industryInsights?.caseStudies.map((study, index) => (
                                  <li key={index}>{study}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-6 text-neutral-500">
                            <p>Industry benchmarks not available for your assessment</p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                ) : (
                  <p className="text-neutral-600">
                    Analysis results are not available. Please contact support if you believe this is an error.
                  </p>
                )}
              </CardContent>
              
              <CardFooter className="border-t bg-blue-50/50 flex justify-end py-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={downloadResults}
                  disabled={!analysis}
                  className="text-blue-700 border-blue-200 hover:bg-blue-100"
                >
                  <Download size={16} className="mr-2" />
                  Download Full Analysis
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: assessmentId ? 0.4 : 0.2 }}
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
                      {assessmentId
                        ? "Review your AI-powered analysis to understand your automation readiness."
                        : "Our experts will review your responses and analyze your automation readiness level."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                    2
                  </div>
                  <div>
                    <p className="text-neutral-800">
                      We'll prepare a customized plan with actionable recommendations for your business.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                    3
                  </div>
                  <div>
                    <p className="text-neutral-800">
                      Our automation experts will contact you to discuss your results and next steps.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="border-t pt-4 flex gap-3 flex-wrap">
              <Button className="flex-1" onClick={() => navigate("/home")}>
                Return to Home
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;