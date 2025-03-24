import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Zap, Wrench, GitBranch, AlertTriangle, Building, BarChart3, Lightbulb, Sparkles } from "lucide-react";
import { type AIRecommendation } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AIRecommendationsProps {
  formData: Record<string, string>;
  isVisible?: boolean;
}

// Extended interface to match the server response
interface EnhancedAIRecommendation extends AIRecommendation {
  industryInsights?: {
    industryName: string;
    benchmarks: { [key: string]: number };
    averageAutomationLevel: number;
  };
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  formData,
  isVisible = true
}) => {
  const [hasEnoughData, setHasEnoughData] = useState(false);

  // Check if we have enough data to make recommendations
  useEffect(() => {
    // Only make recommendations if there are at least 3 answers
    const answerCount = Object.keys(formData).filter(key => 
      formData[key] && formData[key].trim() !== '' && !key.endsWith('_text')
    ).length;
    setHasEnoughData(answerCount >= 3);
  }, [formData]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["recommendations", formData],
    queryFn: async () => {
      return apiRequest<EnhancedAIRecommendation>(
        "POST",
        "/api/survey/get-recommendations",
        formData
      );
    },
    enabled: hasEnoughData && isVisible,
    staleTime: 60000, // Cache for 1 minute
  });

  if (!isVisible) {
    return null;
  }

  if (!hasEnoughData) {
    return (
      <Card className="bg-white border border-neutral-200 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center">
            <Zap className="w-4 h-4 text-amber-500 mr-2" />
            <h3 className="text-sm font-medium">AI Insights</h3>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-sm text-neutral-600">
            Continue answering questions to receive personalized AI recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-white border border-neutral-200 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center">
            <Sparkles className="w-4 h-4 text-primary mr-2 animate-pulse" />
            <h3 className="text-sm font-medium">Analyzing your responses...</h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 pb-4">
          <Skeleton className="h-4 w-full bg-neutral-100" />
          <Skeleton className="h-4 w-3/4 bg-neutral-100" />
          <Skeleton className="h-4 w-5/6 bg-neutral-100" />
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="bg-white border border-neutral-200 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center">
            <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
            <h3 className="text-sm font-medium">Unable to load recommendations</h3>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-sm text-neutral-600">
            We couldn't generate recommendations at this time. Please continue with the survey.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Check if we have industry insights
  const hasIndustryInsights = data.industryInsights !== undefined;

  return (
    <Card className="bg-white border border-neutral-200 shadow-sm">
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="w-4 h-4 text-primary mr-2" />
            <h3 className="text-sm font-medium">AI-Powered Insights</h3>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-xs bg-primary/5 text-primary hover:bg-primary/10 cursor-help">
                  Real-time
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Based on your responses and current industry data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-4">
        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="w-full grid grid-cols-2 h-9 mb-3">
            <TabsTrigger value="recommendations" className="text-xs">Recommendations</TabsTrigger>
            {hasIndustryInsights && (
              <TabsTrigger value="industry" className="text-xs">Industry Data</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="recommendations" className="mt-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="tools" className="border-neutral-200">
                <AccordionTrigger className="text-sm py-2 text-neutral-800 hover:text-primary">
                  <div className="flex items-center">
                    <Wrench className="w-4 h-4 mr-2 text-primary" />
                    <span>Recommended Tools</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-neutral-600">
                  <ul className="list-disc list-inside pl-1 space-y-1.5">
                    {data.suggestedTools.map((tool: string, index: number) => (
                      <li key={index}>{tool}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="workflows" className="border-neutral-200">
                <AccordionTrigger className="text-sm py-2 text-neutral-800 hover:text-primary">
                  <div className="flex items-center">
                    <GitBranch className="w-4 h-4 mr-2 text-primary" />
                    <span>Potential Automations</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-neutral-600">
                  <ul className="list-disc list-inside pl-1 space-y-1.5">
                    {data.potentialWorkflows.map((workflow: string, index: number) => (
                      <li key={index}>{workflow}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="questions" className="border-neutral-200">
                <AccordionTrigger className="text-sm py-2 text-neutral-800 hover:text-primary">
                  <div className="flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-primary" />
                    <span>Consider These Questions</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-neutral-600">
                  <ul className="list-disc list-inside pl-1 space-y-1.5">
                    {data.tailoredQuestions.map((question: string, index: number) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          
          {hasIndustryInsights && (
            <TabsContent value="industry" className="mt-0">
              <div className="space-y-4">
                <div className="p-3 rounded-md border border-neutral-200 bg-neutral-50">
                  <div className="flex items-center mb-2">
                    <Building className="w-4 h-4 mr-2 text-primary" />
                    <h4 className="text-sm font-medium text-neutral-800">
                      {data.industryInsights?.industryName} Industry
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-600 mb-3">
                    Average Automation Level: <span className="font-medium text-primary">{data.industryInsights?.averageAutomationLevel}%</span>
                  </p>
                  
                  <div className="space-y-3 mt-4">
                    <h5 className="text-xs font-medium text-neutral-700 flex items-center">
                      <BarChart3 className="w-3.5 h-3.5 mr-1.5 text-primary" />
                      Process Automation Benchmarks
                    </h5>
                    {data.industryInsights?.benchmarks && Object.entries(data.industryInsights.benchmarks).map(([process, level]) => (
                      <div key={process} className="text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-neutral-700">{process}</span>
                          <span className="font-medium text-primary">{level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className="h-1.5 bg-primary rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations; 