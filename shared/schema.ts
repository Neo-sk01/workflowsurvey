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
}

export const assessmentSchema = z.object({
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
