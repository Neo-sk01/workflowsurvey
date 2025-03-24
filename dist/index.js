// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  assessments;
  progresses;
  userId;
  assessmentId;
  progressId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.assessments = /* @__PURE__ */ new Map();
    this.progresses = /* @__PURE__ */ new Map();
    this.userId = 1;
    this.assessmentId = 1;
    this.progressId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.userId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async saveAssessment(assessmentData) {
    const id = this.assessmentId++;
    const assessment = {
      ...assessmentData,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.assessments.set(id, assessment);
    return assessment;
  }
  async getAssessment(id) {
    return this.assessments.get(id);
  }
  async updateAssessmentAnalysis(id, analysis) {
    const assessment = this.assessments.get(id);
    if (!assessment) {
      return void 0;
    }
    const updatedAssessment = {
      ...assessment,
      analysis
    };
    this.assessments.set(id, updatedAssessment);
    return updatedAssessment;
  }
  async saveProgress(progressData) {
    const id = this.progressId++;
    const progress = {
      ...progressData,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.progresses.set(id, progress);
    return progress;
  }
  async getProgress(id) {
    return this.progresses.get(id);
  }
};
var storage = new MemStorage();

// server/routes.ts
import { z as z2 } from "zod";

// shared/schema.ts
import { z } from "zod";
var insertUserSchema = z.object({
  username: z.string(),
  password: z.string()
});
var assessmentSchema = z.object({
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
  dataTransferProcess: z.string().optional()
});
var recommendedToolSchema = z.object({
  name: z.string(),
  description: z.string(),
  useCases: z.array(z.string()),
  pricingModel: z.string()
});
var industryInsightsSchema = z.object({
  industryName: z.string(),
  trendingTools: z.array(z.string()),
  benchmarks: z.record(z.string(), z.number()),
  caseStudies: z.array(z.string()),
  automationLevel: z.number(),
  topAutomatedProcesses: z.array(z.string()),
  roi: z.object({
    timeframe: z.string(),
    averageReturn: z.string()
  })
});
var aiAnalysisSchema = z.object({
  automationScore: z.number(),
  readinessLevel: z.string(),
  keyChallenges: z.array(z.string()),
  opportunities: z.array(z.string()),
  nextSteps: z.array(z.string()),
  industryInsights: industryInsightsSchema.optional(),
  recommendedTools: z.array(recommendedToolSchema).optional()
});
var aiRecommendationSchema = z.object({
  suggestedTools: z.array(z.string()),
  potentialWorkflows: z.array(z.string()),
  tailoredQuestions: z.array(z.string()),
  industryInsights: z.object({
    industryName: z.string(),
    benchmarks: z.record(z.string(), z.number()),
    averageAutomationLevel: z.number()
  }).optional()
});
var saveProgressSchema = z.object({
  email: z.string().email(),
  surveyData: z.record(z.string(), z.any())
});

// server/web-search.ts
var API_KEY = process.env.SEARCH_API_KEY || "your_api_key_here";
var MOCK_API_DELAY = 1500;
async function getIndustryInsights(industryName, assessment) {
  try {
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));
    console.log(`Fetching industry insights for: ${industryName}`);
    const insights = {
      industryName,
      trendingTools: getMockTrendingTools(industryName),
      benchmarks: {
        implementationTime: getImplementationTimeMetric(industryName),
        bottlenecks: getBottlenecksMetric(industryName),
        successRatePercentage: getSuccessRateMetric(industryName)
      },
      caseStudies: getIndustryCaseStudies(industryName),
      automationLevel: getIndustryAutomationLevel(industryName),
      topAutomatedProcesses: getTopAutomatedProcesses(industryName),
      roi: {
        timeframe: getTimeToValue(industryName),
        averageReturn: getAverageRoi(industryName)
      }
    };
    return insights;
  } catch (error) {
    console.error("Error fetching industry insights:", error);
    throw new Error("Failed to fetch industry insights");
  }
}
async function getRecommendedTools(assessment, industryName) {
  try {
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));
    console.log(`Fetching recommended tools for ${industryName} based on assessment`);
    return getMockRecommendedTools(assessment, industryName);
  } catch (error) {
    console.error("Error fetching recommended tools:", error);
    throw new Error("Failed to fetch recommended tools");
  }
}
function getMockTrendingTools(industry) {
  const industryTools = {
    "Healthcare": ["Electronic Health Record Systems", "Telehealth Platforms", "Medical Billing Automation"],
    "Finance": ["Automated Trading Systems", "Fraud Detection Software", "KYC Automation"],
    "Manufacturing": ["Robotic Process Automation", "Predictive Maintenance Systems", "Supply Chain Optimization"],
    "Retail": ["Inventory Management Solutions", "Customer Service Bots", "POS Integration Systems"],
    "Technology": ["CI/CD Pipelines", "DevOps Automation", "Cloud Management Platforms"],
    "Education": ["Learning Management Systems", "Enrollment Automation", "Student Analytics Platforms"],
    "Legal": ["Document Automation", "Case Management Software", "Legal Research AI"]
  };
  return industryTools[industry] || ["Process Mining Tools", "Workflow Automation Platforms", "Document Processing Systems"];
}
function getImplementationTimeMetric(industry) {
  const metrics = {
    "Healthcare": 10,
    "Finance": 7,
    "Manufacturing": 12,
    "Retail": 5,
    "Technology": 3,
    "Education": 6,
    "Legal": 8
  };
  return metrics[industry] || 6;
}
function getBottlenecksMetric(industry) {
  const metrics = {
    "Healthcare": 65,
    "Finance": 55,
    "Manufacturing": 70,
    "Retail": 45,
    "Technology": 40,
    "Education": 60,
    "Legal": 50
  };
  return metrics[industry] || 55;
}
function getSuccessRateMetric(industry) {
  const metrics = {
    "Healthcare": 65,
    "Finance": 78,
    "Manufacturing": 72,
    "Retail": 81,
    "Technology": 86,
    "Education": 59,
    "Legal": 68
  };
  return metrics[industry] || 74;
}
function getIndustryCaseStudies(industry) {
  const caseSummaries = {
    "Healthcare": [
      `${getCaseStudyCompany("Healthcare")} implemented workflow automation across ${getRandomDepartments()} and achieved ${getRandomImprovementPercentage()}% improvement in efficiency.`
    ],
    "Finance": [
      `${getCaseStudyCompany("Finance")} reduced manual processing time by ${getRandomImprovementPercentage()}% through intelligent document processing.`
    ],
    "Manufacturing": [
      `${getCaseStudyCompany("Manufacturing")} increased production throughput by ${getRandomImprovementPercentage()}% with automated quality control.`
    ],
    "Retail": [
      `${getCaseStudyCompany("Retail")} eliminated ${getRandomImprovementPercentage()}% of manual inventory tasks through automation.`
    ],
    "Technology": [
      `${getCaseStudyCompany("Technology")} reduced development cycle time by ${getRandomImprovementPercentage()}% with CI/CD automation.`
    ]
  };
  return caseSummaries[industry] || [
    `${getCaseStudyCompany(industry)} improved operational efficiency by ${getRandomImprovementPercentage()}% after implementing workflow automation.`
  ];
}
function getCaseStudyCompany(industry) {
  const companies = {
    "Healthcare": "MediTech Solutions",
    "Finance": "GlobalBank",
    "Manufacturing": "IndustryNow",
    "Retail": "ShopSmart",
    "Technology": "TechFusion",
    "Education": "LearnSphere",
    "Legal": "LegalEdge"
  };
  return companies[industry] || "Innovative Corp";
}
function getRandomDepartments() {
  const departments = [
    "HR and Finance",
    "Sales and Marketing",
    "Operations and Customer Service",
    "IT and Administrative Functions",
    "Procurement and Logistics"
  ];
  return departments[Math.floor(Math.random() * departments.length)];
}
function getRandomImprovementPercentage() {
  return Math.floor(Math.random() * 30) + 20;
}
function getIndustryAutomationLevel(industry) {
  const levels = {
    "Healthcare": 42,
    "Finance": 68,
    "Manufacturing": 61,
    "Retail": 54,
    "Technology": 76,
    "Education": 38,
    "Legal": 45
  };
  return levels[industry] || 53;
}
function getTopAutomatedProcesses(industry) {
  const processes = {
    "Healthcare": ["Patient Scheduling", "Billing", "Inventory Management"],
    "Finance": ["Transaction Processing", "Compliance Reporting", "Customer Onboarding"],
    "Manufacturing": ["Inventory Management", "Quality Control", "Supply Chain Logistics"],
    "Retail": ["Inventory Tracking", "Order Processing", "Customer Communications"],
    "Technology": ["Code Testing", "Deployment", "User Support Ticketing"],
    "Education": ["Enrollment Processing", "Grading", "Communication Management"],
    "Legal": ["Document Review", "Client Intake", "Time and Billing"]
  };
  return processes[industry] || ["Document Processing", "Data Entry", "Email Management"];
}
function getTimeToValue(industry) {
  const times = {
    "Healthcare": "10-14 months",
    "Finance": "6-10 months",
    "Manufacturing": "8-12 months",
    "Retail": "4-8 months",
    "Technology": "3-6 months",
    "Education": "6-10 months",
    "Legal": "8-12 months"
  };
  return times[industry] || "6-10 months";
}
function getAverageRoi(industry) {
  const rois = {
    "Healthcare": "125-175%",
    "Finance": "150-200%",
    "Manufacturing": "140-180%",
    "Retail": "160-220%",
    "Technology": "180-250%",
    "Education": "110-150%",
    "Legal": "130-170%"
  };
  return rois[industry] || "140-190%";
}
function getMockRecommendedTools(assessment, industry) {
  const baseTools = [
    {
      name: "WorkflowPro",
      description: "Comprehensive workflow automation platform with low-code capabilities",
      useCases: ["Document processing", "Approval workflows", "Data integration"],
      pricingModel: "Subscription-based, starting at $49/month per user"
    },
    {
      name: "AutoTask",
      description: "Task automation tool with AI-powered suggestions",
      useCases: ["Task routing", "Email automation", "Meeting scheduling"],
      pricingModel: "Freemium, with paid plans starting at $25/month"
    }
  ];
  const industryTools = {
    "Healthcare": [
      {
        name: "MediFlow",
        description: "HIPAA-compliant workflow automation for healthcare providers",
        useCases: ["Patient scheduling", "Insurance verification", "Clinical documentation"],
        pricingModel: "Enterprise pricing, contact for details"
      }
    ],
    "Finance": [
      {
        name: "FinanceBot",
        description: "Regulatory-compliant automation platform for financial services",
        useCases: ["Transaction reconciliation", "Fraud detection", "Compliance reporting"],
        pricingModel: "Based on transaction volume, starting at $500/month"
      }
    ],
    "Manufacturing": [
      {
        name: "FactoryFlow",
        description: "End-to-end workflow automation for manufacturing processes",
        useCases: ["Quality control", "Supply chain management", "Preventive maintenance"],
        pricingModel: "Tiered pricing based on facility size"
      }
    ],
    "Retail": [
      {
        name: "RetailConnect",
        description: "Omnichannel workflow automation for retail businesses",
        useCases: ["Inventory management", "Order processing", "Customer engagement"],
        pricingModel: "$75/month per store location"
      }
    ],
    "Technology": [
      {
        name: "DevOpsFlow",
        description: "Workflow automation designed for technology companies",
        useCases: ["CI/CD pipeline automation", "Incident management", "Code review processes"],
        pricingModel: "Per developer pricing, $30/month each"
      }
    ]
  };
  const specificTools = industryTools[industry] || [];
  return [...baseTools, ...specificTools];
}

// server/ai-service.ts
var readinessLevels = [
  { threshold: 0, level: "Early Stage", description: "Basic preparation for automation adoption" },
  { threshold: 40, level: "Emerging", description: "Some systems in place for basic automation" },
  { threshold: 60, level: "Advancing", description: "Good foundation with room for growth" },
  { threshold: 80, level: "Optimized", description: "Well-prepared for advanced automation solutions" },
  { threshold: 90, level: "Transformational", description: "Ready for cutting-edge AI automation" }
];
function detectIndustry(data) {
  if (data.softwareTools?.includes("healthcare") || data.dailyTasks?.includes("patient")) {
    return "healthcare";
  }
  if (data.softwareTools?.includes("finance") || data.dailyTasks?.includes("banking")) {
    return "finance";
  }
  if (data.softwareTools?.includes("retail") || data.dailyTasks?.includes("inventory")) {
    return "retail";
  }
  if (data.softwareTools?.includes("manufacturing") || data.dailyTasks?.includes("production")) {
    return "manufacturing";
  }
  return "general business";
}
async function analyzeResponses(assessmentData) {
  const automationScore = calculateAutomationScore(assessmentData);
  const readinessLevel = getReadinessLevel(automationScore);
  const keyChallenges = identifyChallenges(assessmentData);
  const opportunities = identifyOpportunities(assessmentData);
  const nextSteps = generateNextSteps(assessmentData, automationScore);
  const analysisResult = {
    automationScore,
    readinessLevel,
    keyChallenges,
    opportunities,
    nextSteps
  };
  try {
    const industry = detectIndustry(assessmentData);
    const industryInsights = await getIndustryInsights(industry, assessmentData);
    const recommendedTools = await getRecommendedTools(assessmentData, industry);
    analysisResult.industryInsights = industryInsights;
    analysisResult.recommendedTools = recommendedTools;
  } catch (error) {
    console.error("Error enhancing analysis with web search:", error);
  }
  return analysisResult;
}
async function generateRecommendations(partialData) {
  const suggestedTools = suggestRelevantTools(partialData);
  const potentialWorkflows = identifyPotentialWorkflows(partialData);
  const tailoredQuestions = generateTailoredQuestions(partialData);
  const result = {
    suggestedTools,
    potentialWorkflows,
    tailoredQuestions
  };
  try {
    let industry = "general business";
    if (partialData.softwareTools?.includes("healthcare") || partialData.dailyTasks?.includes("patient")) {
      industry = "Healthcare";
    } else if (partialData.softwareTools?.includes("finance") || partialData.dailyTasks?.includes("banking")) {
      industry = "Finance";
    } else if (partialData.softwareTools?.includes("retail") || partialData.dailyTasks?.includes("inventory")) {
      industry = "Retail";
    } else if (partialData.softwareTools?.includes("manufacturing") || partialData.dailyTasks?.includes("production")) {
      industry = "Manufacturing";
    }
    if (industry !== "general business") {
      const insights = await getIndustryInsights(industry, partialData);
      return {
        ...result,
        industryInsights: {
          industryName: insights.industryName,
          benchmarks: insights.benchmarks,
          averageAutomationLevel: insights.automationLevel
        }
      };
    }
  } catch (error) {
    console.error("Error enhancing recommendations with industry insights:", error);
  }
  return result;
}
function calculateAutomationScore(data) {
  let score = 50;
  if (data.dataTransferProcess === "fully-integrated") score += 15;
  if (data.dataTransferProcess === "some-integrations") score += 10;
  if (data.dataTransferProcess === "api-zapier") score += 8;
  if (data.repetitiveTasks === "frequently") score -= 10;
  if (data.manualErrors === "regularly") score -= 10;
  if (data.multipleSystems === "yes") score -= 5;
  if (data.multipleSystems === "somewhat") score -= 2;
  if (data.manualTransfer === "frequently") score -= 10;
  return Math.max(0, Math.min(100, score));
}
function getReadinessLevel(score) {
  for (let i = readinessLevels.length - 1; i >= 0; i--) {
    if (score >= readinessLevels[i].threshold) {
      return `${readinessLevels[i].level} (${readinessLevels[i].description})`;
    }
  }
  return readinessLevels[0].level;
}
function identifyChallenges(data) {
  const challenges = [];
  if (data.multipleSystems === "yes") {
    challenges.push("Disconnected systems leading to data silos");
  }
  if (data.manualTransfer === "frequently") {
    challenges.push("Heavy reliance on manual data transfer between systems");
  }
  if (data.manualErrors === "regularly") {
    challenges.push("Frequent errors from manual data handling");
  }
  if (data.repetitiveTasks === "frequently") {
    challenges.push("Significant time spent on repetitive tasks");
  }
  if (data.employeeTasks === "constantly") {
    challenges.push("Team members spending excessive time on tasks that could be automated");
  }
  if (challenges.length === 0) {
    challenges.push("Identifying the right processes to automate");
  }
  return challenges;
}
function identifyOpportunities(data) {
  const opportunities = [];
  if (data.dailyTasks?.includes("data-entry")) {
    opportunities.push("Automate data entry processes with AI-powered document processing");
  }
  if (data.dailyTasks?.includes("administrative")) {
    opportunities.push("Implement email and calendar automation to reduce administrative burden");
  }
  if (data.dailyTasks?.includes("document-creation")) {
    opportunities.push("Use document generation and management tools to streamline workflows");
  }
  if (data.softwareTools?.includes("crm")) {
    opportunities.push("Connect CRM with other business systems for seamless data flow");
  }
  if (data.communicationApps?.includes("email") || data.communicationApps?.includes("messaging")) {
    opportunities.push("Implement AI-powered communication assistants to handle routine inquiries");
  }
  if (opportunities.length === 0) {
    opportunities.push("Implement workflow automation to connect your existing tools");
  }
  return opportunities;
}
function generateNextSteps(data, score) {
  const steps = [];
  if (score < 40) {
    steps.push("Conduct a detailed process mapping exercise to identify automation candidates");
    steps.push("Start with simple automation tools that don't require extensive integration");
  } else if (score < 70) {
    steps.push("Implement integration platforms to connect your most-used applications");
    steps.push("Prioritize automating the most time-consuming repetitive tasks first");
  } else {
    steps.push("Consider advanced AI solutions to further optimize your existing workflows");
    steps.push("Focus on end-to-end process automation rather than isolated tasks");
  }
  if (data.manualErrors === "regularly") {
    steps.push("Implement validation rules and error checking in your automated workflows");
  }
  return steps;
}
function suggestRelevantTools(partialData) {
  const tools = [];
  if (partialData.dataTransferProcess === "manual-entry" || partialData.dataTransferProcess === "import-export") {
    tools.push("Zapier or Make (formerly Integromat) for no-code integrations");
  }
  if (partialData.dailyTasks?.includes("document-creation")) {
    tools.push("Document automation platforms like DocuSign or PandaDoc");
  }
  if (partialData.dailyTasks?.includes("data-entry")) {
    tools.push("Data extraction tools like Docparser or Rossum");
  }
  if (partialData.dailyTasks?.includes("administrative")) {
    tools.push("Email automation platforms like Mailchimp or HubSpot");
  }
  if (tools.length === 0) {
    tools.push("Microsoft Power Automate or n8n for general workflow automation");
  }
  return tools;
}
function identifyPotentialWorkflows(partialData) {
  const workflows = [];
  if (partialData.dailyTasks?.includes("data-entry")) {
    workflows.push("Automated data extraction from documents to your database or CRM");
  }
  if (partialData.dailyTasks?.includes("administrative")) {
    workflows.push("Email categorization and routing based on content and priority");
  }
  if (partialData.softwareTools?.includes("crm") && partialData.dailyTasks?.includes("customer-service")) {
    workflows.push("Customer support ticket generation and routing from incoming emails");
  }
  if (partialData.communicationApps?.includes("email") && partialData.repetitiveTasks === "frequently") {
    workflows.push("Automated follow-up emails based on customer actions");
  }
  if (workflows.length === 0) {
    workflows.push("Data synchronization between your most used applications");
  }
  return workflows;
}
function generateTailoredQuestions(partialData) {
  const questions = [];
  if (partialData.dailyTasks?.includes("data-entry")) {
    questions.push("What specific types of data are you frequently entering manually?");
  }
  if (partialData.multipleSystems === "yes") {
    questions.push("Which systems do you most need to connect for better data flow?");
  }
  if (partialData.repetitiveTasks === "frequently") {
    questions.push("How much time does your team spend weekly on these repetitive tasks?");
  }
  if (partialData.manualErrors === "regularly") {
    questions.push("What are the consequences of these errors for your business?");
  }
  if (questions.length === 0) {
    questions.push("What's the most time-consuming part of your current workflow?");
  }
  return questions;
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/survey/submit", async (req, res) => {
    try {
      const validatedData = assessmentSchema.parse(req.body);
      const result = await storage.saveAssessment(validatedData);
      const analysis = await analyzeResponses(validatedData);
      res.status(201).json({
        success: true,
        message: "Assessment submitted successfully",
        assessmentId: result.id,
        analysis
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid assessment data",
          errors: error.errors
        });
      } else {
        console.error("Error submitting assessment:", error);
        res.status(500).json({
          success: false,
          message: "Failed to submit assessment"
        });
      }
    }
  });
  app2.post("/api/survey/save-progress", async (req, res) => {
    try {
      const validatedData = saveProgressSchema.parse(req.body);
      const result = await storage.saveProgress(validatedData);
      res.status(201).json({
        success: true,
        message: "Progress saved successfully",
        progressId: result.id
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid progress data",
          errors: error.errors
        });
      } else {
        console.error("Error saving progress:", error);
        res.status(500).json({
          success: false,
          message: "Failed to save progress"
        });
      }
    }
  });
  app2.get("/api/survey/progress/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const progress = await storage.getProgress(parseInt(id, 10));
      if (!progress) {
        return res.status(404).json({
          success: false,
          message: "Progress not found"
        });
      }
      res.status(200).json({
        success: true,
        data: progress
      });
    } catch (error) {
      console.error("Error loading progress:", error);
      res.status(500).json({
        success: false,
        message: "Failed to load progress"
      });
    }
  });
  app2.post("/api/survey/get-recommendations", async (req, res) => {
    try {
      const partialData = req.body;
      const recommendations = await generateRecommendations(partialData);
      res.status(200).json({
        success: true,
        ...recommendations
      });
    } catch (error) {
      console.error("Error generating recommendations:", error);
      res.status(500).json({
        success: false,
        message: "Failed to generate recommendations"
      });
    }
  });
  app2.get("/api/survey/analysis", async (req, res) => {
    try {
      const assessmentId = req.query.id;
      if (!assessmentId || typeof assessmentId !== "string") {
        return res.status(400).json({
          success: false,
          message: "Assessment ID is required"
        });
      }
      const id = parseInt(assessmentId, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid assessment ID format"
        });
      }
      const assessment = await storage.getAssessment(id);
      if (!assessment) {
        return res.status(404).json({
          success: false,
          message: "Assessment not found"
        });
      }
      if (!assessment.analysis) {
        const analysisData = await analyzeResponses(assessment);
        await storage.updateAssessmentAnalysis(id, analysisData);
        assessment.analysis = analysisData;
      }
      res.status(200).json({
        success: true,
        analysis: assessment.analysis
      });
    } catch (error) {
      console.error("Error retrieving analysis:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve analysis"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use(express2.static("public"));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = process.env.PORT || 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
