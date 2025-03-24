import { z } from "zod";

// User type definition
export interface User {
  id: number;
  username: string;
  password: string;
}

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

// Survey Assessment type definition
export interface Assessment {
  id: number;
  websiteUrl?: string;
  repetitiveTasks?: string;
  employeeTasks?: string;
  manualErrors?: string;
  multipleSystems?: string;
  manualTransfer?: string;
  realTimeUpdates?: string;
  businessGrowth?: string;
  scaleOperations?: string;
  strategicActivities?: string;
  documentedProcesses?: string;
  technologyInfrastructure?: string;
  trainingReadiness?: string;
  timeSavings?: string;
  aiAnalytics?: string;
  investmentReadiness?: string;
  dailyTasks?: string;
  softwareTools?: string;
  communicationApps?: string;
  dataTransferProcess?: string;
  createdAt: Date;
  analysis?: AIAnalysis;
}

export const assessmentSchema = z.object({
  websiteUrl: z.string().url().optional(),
  repetitiveTasks: z.string().optional(),
  employeeTasks: z.string().optional(),
  manualErrors: z.string().optional(),
  multipleSystems: z.string().optional(),
  manualTransfer: z.string().optional(),
  realTimeUpdates: z.string().optional(),
  businessGrowth: z.string().optional(),
  scaleOperations: z.string().optional(),
  strategicActivities: z.string().optional(),
  documentedProcesses: z.string().optional(),
  technologyInfrastructure: z.string().optional(),
  trainingReadiness: z.string().optional(),
  timeSavings: z.string().optional(),
  aiAnalytics: z.string().optional(),
  investmentReadiness: z.string().optional(),
  dailyTasks: z.string().optional(),
  softwareTools: z.string().optional(),
  communicationApps: z.string().optional(),
  dataTransferProcess: z.string().optional(),
});

export type InsertAssessment = z.infer<typeof assessmentSchema>;

// Tool recommendation type definition
export interface RecommendedTool {
  name: string;
  description: string;
  useCases: string[];
  pricingModel: string;
}

export const recommendedToolSchema = z.object({
  name: z.string(),
  description: z.string(),
  useCases: z.array(z.string()),
  pricingModel: z.string(),
});

// Industry insights type definition
export interface IndustryInsights {
  industryName: string;
  trendingTools: string[];
  benchmarks: Record<string, number>;
  caseStudies: string[];
  automationLevel: number;
  topAutomatedProcesses: string[];
  roi: { timeframe: string; averageReturn: string };
}

export const industryInsightsSchema = z.object({
  industryName: z.string(),
  trendingTools: z.array(z.string()),
  benchmarks: z.record(z.string(), z.number()),
  caseStudies: z.array(z.string()),
  automationLevel: z.number(),
  topAutomatedProcesses: z.array(z.string()),
  roi: z.object({
    timeframe: z.string(),
    averageReturn: z.string(),
  }),
});

// AI Analysis type definitions
export interface AIAnalysis {
  automationScore: number;
  readinessLevel: string;
  keyChallenges: string[];
  opportunities: string[];
  nextSteps: string[];
  industryInsights?: IndustryInsights;
  recommendedTools?: RecommendedTool[];
}

export const aiAnalysisSchema = z.object({
  automationScore: z.number(),
  readinessLevel: z.string(),
  keyChallenges: z.array(z.string()),
  opportunities: z.array(z.string()),
  nextSteps: z.array(z.string()),
  industryInsights: industryInsightsSchema.optional(),
  recommendedTools: z.array(recommendedToolSchema).optional(),
});

export interface AIRecommendation {
  suggestedTools: string[];
  potentialWorkflows: string[];
  tailoredQuestions: string[];
  industryInsights?: {
    industryName: string;
    benchmarks: Record<string, number>;
    averageAutomationLevel: number;
  };
}

export const aiRecommendationSchema = z.object({
  suggestedTools: z.array(z.string()),
  potentialWorkflows: z.array(z.string()),
  tailoredQuestions: z.array(z.string()),
  industryInsights: z.object({
    industryName: z.string(),
    benchmarks: z.record(z.string(), z.number()),
    averageAutomationLevel: z.number(),
  }).optional(),
});

// Saved Progress type definition
export interface Progress {
  id: number;
  email: string;
  surveyData: Record<string, any>;
  createdAt: Date;
}

export const saveProgressSchema = z.object({
  email: z.string().email(),
  surveyData: z.record(z.string(), z.any()),
});

export type InsertProgress = z.infer<typeof saveProgressSchema>;
