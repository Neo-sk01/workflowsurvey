import { type InsertAssessment } from "@shared/schema";
import { 
  getIndustryAutomationTrends, 
  getLatestAutomationTools, 
  getIndustryBenchmarks,
  getIndustryInsights,
  getRecommendedTools
} from "./web-search";

// Interface for the AI analysis result
export interface AnalysisResult {
  automationScore: number;
  readinessLevel: string;
  keyChallenges: string[];
  opportunities: string[];
  nextSteps: string[];
  industryInsights?: {
    industryName: string;
    trendingTools: string[];
    benchmarks: Record<string, number>;
    caseStudies: string[];
    automationLevel: number;
    topAutomatedProcesses: string[];
    roi: { timeframe: string; averageReturn: string };
  };
  recommendedTools?: {
    name: string;
    description: string;
    useCases: string[];
    pricingModel: string;
  }[];
}

// List of readiness levels based on automation score
const readinessLevels = [
  { threshold: 0, level: "Early Stage", description: "Basic preparation for automation adoption" },
  { threshold: 40, level: "Emerging", description: "Some systems in place for basic automation" },
  { threshold: 60, level: "Advancing", description: "Good foundation with room for growth" },
  { threshold: 80, level: "Optimized", description: "Well-prepared for advanced automation solutions" },
  { threshold: 90, level: "Transformational", description: "Ready for cutting-edge AI automation" }
];

/**
 * Detects the industry based on survey responses
 */
function detectIndustry(data: InsertAssessment): string {
  // This is a simplified version - in a real implementation, 
  // you would use more sophisticated analysis of the survey data
  
  // Check for industry indicators in the data
  if (data.softwareTools?.includes('healthcare') || data.dailyTasks?.includes('patient')) {
    return 'healthcare';
  }
  
  if (data.softwareTools?.includes('finance') || data.dailyTasks?.includes('banking')) {
    return 'finance';
  }
  
  if (data.softwareTools?.includes('retail') || data.dailyTasks?.includes('inventory')) {
    return 'retail';
  }
  
  if (data.softwareTools?.includes('manufacturing') || data.dailyTasks?.includes('production')) {
    return 'manufacturing';
  }
  
  // Default industry if we can't detect a specific one
  return 'general business';
}

/**
 * Analyzes survey responses to provide personalized feedback with web-enhanced information
 */
export async function analyzeResponses(assessmentData: InsertAssessment): Promise<AnalysisResult> {
  // Calculate automation readiness score (0-100)
  const automationScore = calculateAutomationScore(assessmentData);
  
  // Determine readiness level based on score
  const readinessLevel = getReadinessLevel(automationScore);
  
  // Identify key challenges based on responses
  const keyChallenges = identifyChallenges(assessmentData);
  
  // Identify automation opportunities
  const opportunities = identifyOpportunities(assessmentData);
  
  // Generate recommended next steps
  const nextSteps = generateNextSteps(assessmentData, automationScore);
  
  // Create basic analysis result
  const analysisResult: AnalysisResult = {
    automationScore,
    readinessLevel,
    keyChallenges,
    opportunities,
    nextSteps
  };
  
  // Enhance with web search insights if available
  try {
    // Detect industry from survey responses or website URL
    let industry = detectIndustry(assessmentData);
    
    // If website URL is provided, use it for more accurate analysis
    if (assessmentData.websiteUrl) {
      console.log(`Using website URL for enhanced analysis: ${assessmentData.websiteUrl}`);
      try {
        // In a real implementation, this would analyze the website content
        // to extract more accurate information about the company and industry
        const websiteIndustry = await getIndustryFromWebsite(assessmentData.websiteUrl);
        if (websiteIndustry) {
          industry = websiteIndustry;
          console.log(`Detected industry from website: ${industry}`);
        }
      } catch (error) {
        console.error('Error analyzing website:', error);
        // Continue with the industry detected from survey responses
      }
    }
    
    // Get industry-specific insights
    const industryInsights = await getIndustryInsights(industry, assessmentData as Record<string, any>);
    
    // Get recommended tools based on assessment and industry
    const recommendedTools = await getRecommendedTools(assessmentData as Record<string, any>, industry);
    
    // Add enhanced data to analysis result
    analysisResult.industryInsights = industryInsights;
    analysisResult.recommendedTools = recommendedTools;
    
  } catch (error) {
    console.error('Error enhancing analysis with web search:', error);
    // Continue without web-enhanced data if there's an error
  }
  
  return analysisResult;
}

/**
 * Generate recommendations based on partial survey data
 */
export async function generateRecommendations(partialData: Record<string, string>): Promise<{
  suggestedTools: string[];
  potentialWorkflows: string[];
  tailoredQuestions: string[];
  industryInsights?: {
    industryName: string;
    benchmarks: { [key: string]: number };
    averageAutomationLevel: number;
  };
}> {
  // Analyze which tools might be relevant based on responses so far
  const suggestedTools = suggestRelevantTools(partialData);
  
  // Identify potential workflows that could be automated
  const potentialWorkflows = identifyPotentialWorkflows(partialData);
  
  // Generate additional tailored questions based on responses so far
  const tailoredQuestions = generateTailoredQuestions(partialData);
  
  const result = {
    suggestedTools,
    potentialWorkflows,
    tailoredQuestions
  };
  
  // Add industry insights if we can detect an industry from the partial data
  try {
    // Try to determine industry from website URL first, then from other answers
    let industry = 'general business';
    
    if (partialData.websiteUrl) {
      console.log(`Using website URL for enhanced recommendations: ${partialData.websiteUrl}`);
      try {
        const websiteIndustry = await getIndustryFromWebsite(partialData.websiteUrl);
        if (websiteIndustry) {
          industry = websiteIndustry;
          console.log(`Detected industry from website for recommendations: ${industry}`);
        }
      } catch (error) {
        console.error('Error analyzing website for recommendations:', error);
      }
    }
    
    // If website URL didn't provide industry, fall back to other data
    if (industry === 'general business') {
      // Extract industry from software tools or daily tasks
      if (partialData.softwareTools?.includes('healthcare') || partialData.dailyTasks?.includes('patient')) {
        industry = 'Healthcare';
      } else if (partialData.softwareTools?.includes('finance') || partialData.dailyTasks?.includes('banking')) {
        industry = 'Finance';
      } else if (partialData.softwareTools?.includes('retail') || partialData.dailyTasks?.includes('inventory')) {
        industry = 'Retail';
      } else if (partialData.softwareTools?.includes('manufacturing') || partialData.dailyTasks?.includes('production')) {
        industry = 'Manufacturing';
      }
    }
    
    if (industry !== 'general business') {
      // Fetch industry insights
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
    console.error('Error enhancing recommendations with industry insights:', error);
  }
  
  return result;
}

/**
 * Calculate automation readiness score based on assessment responses
 */
function calculateAutomationScore(data: InsertAssessment): number {
  let score = 50; // Start with a baseline score
  
  // Analyze current tools & integration
  if (data.dataTransferProcess === "fully-integrated") score += 15;
  if (data.dataTransferProcess === "some-integrations") score += 10;
  if (data.dataTransferProcess === "api-zapier") score += 8;
  
  // Assess current repetitive task burden
  if (data.repetitiveTasks === "frequently") score -= 10;
  if (data.manualErrors === "regularly") score -= 10;
  
  // Check if multiple systems are used
  if (data.multipleSystems === "yes") score -= 5;
  if (data.multipleSystems === "somewhat") score -= 2;
  
  // Consider manual data transfer
  if (data.manualTransfer === "frequently") score -= 10;
  
  // Ensure score stays within 0-100 range
  return Math.max(0, Math.min(100, score));
}

/**
 * Determine readiness level based on automation score
 */
function getReadinessLevel(score: number): string {
  // Find the appropriate readiness level based on the score
  for (let i = readinessLevels.length - 1; i >= 0; i--) {
    if (score >= readinessLevels[i].threshold) {
      return `${readinessLevels[i].level} (${readinessLevels[i].description})`;
    }
  }
  return readinessLevels[0].level;
}

/**
 * Identify key challenges based on assessment responses
 */
function identifyChallenges(data: InsertAssessment): string[] {
  const challenges: string[] = [];
  
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
  
  // If no specific challenges identified, provide a generic one
  if (challenges.length === 0) {
    challenges.push("Identifying the right processes to automate");
  }
  
  return challenges;
}

/**
 * Identify automation opportunities based on assessment responses
 */
function identifyOpportunities(data: InsertAssessment): string[] {
  const opportunities: string[] = [];
  
  // Based on daily tasks
  if (data.dailyTasks?.includes("data-entry")) {
    opportunities.push("Automate data entry processes with AI-powered document processing");
  }
  
  if (data.dailyTasks?.includes("administrative")) {
    opportunities.push("Implement email and calendar automation to reduce administrative burden");
  }
  
  if (data.dailyTasks?.includes("document-creation")) {
    opportunities.push("Use document generation and management tools to streamline workflows");
  }
  
  // Based on software tools
  if (data.softwareTools?.includes("crm")) {
    opportunities.push("Connect CRM with other business systems for seamless data flow");
  }
  
  // Based on communication apps
  if (data.communicationApps?.includes("email") || data.communicationApps?.includes("messaging")) {
    opportunities.push("Implement AI-powered communication assistants to handle routine inquiries");
  }
  
  // Ensure we have at least one opportunity
  if (opportunities.length === 0) {
    opportunities.push("Implement workflow automation to connect your existing tools");
  }
  
  return opportunities;
}

/**
 * Generate recommended next steps based on assessment data and score
 */
function generateNextSteps(data: InsertAssessment, score: number): string[] {
  const steps: string[] = [];
  
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
  
  // Add recommended steps based on specific pain points
  if (data.manualErrors === "regularly") {
    steps.push("Implement validation rules and error checking in your automated workflows");
  }
  
  return steps;
}

/**
 * Suggest relevant tools based on partial survey data
 */
function suggestRelevantTools(partialData: Record<string, string>): string[] {
  const tools: string[] = [];
  
  // Suggest integration tools
  if (partialData.dataTransferProcess === "manual-entry" || partialData.dataTransferProcess === "import-export") {
    tools.push("Zapier or Make (formerly Integromat) for no-code integrations");
  }
  
  // Suggest document automation
  if (partialData.dailyTasks?.includes("document-creation")) {
    tools.push("Document automation platforms like DocuSign or PandaDoc");
  }
  
  // Suggest data entry automation
  if (partialData.dailyTasks?.includes("data-entry")) {
    tools.push("Data extraction tools like Docparser or Rossum");
  }
  
  // Suggest email automation
  if (partialData.dailyTasks?.includes("administrative")) {
    tools.push("Email automation platforms like Mailchimp or HubSpot");
  }
  
  // Always suggest at least one general tool
  if (tools.length === 0) {
    tools.push("Microsoft Power Automate or n8n for general workflow automation");
  }
  
  return tools;
}

/**
 * Identify potential workflows that could be automated
 */
function identifyPotentialWorkflows(partialData: Record<string, string>): string[] {
  const workflows: string[] = [];
  
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
  
  // Ensure at least one workflow is suggested
  if (workflows.length === 0) {
    workflows.push("Data synchronization between your most used applications");
  }
  
  return workflows;
}

/**
 * Generate tailored questions based on partial survey responses
 */
function generateTailoredQuestions(partialData: Record<string, string>): string[] {
  const questions: string[] = [];
  
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
  
  // Always provide at least one question
  if (questions.length === 0) {
    questions.push("What's the most time-consuming part of your current workflow?");
  }
  
  return questions;
}

/**
 * Get industry from website URL using web search and NLP processing
 * In a real implementation, this would analyze the website content
 */
async function getIndustryFromWebsite(url: string): Promise<string | null> {
  try {
    // This is a simplified mock implementation
    // In a real scenario, you would:
    // 1. Fetch the website content
    // 2. Extract key terms and topics
    // 3. Use NLP to identify the industry
    
    // For demo purposes, we'll use a simple pattern matching approach
    const domain = new URL(url).hostname.toLowerCase();
    
    if (domain.includes('hospital') || domain.includes('clinic') || domain.includes('health') || domain.includes('med')) {
      return 'Healthcare';
    } else if (domain.includes('bank') || domain.includes('finance') || domain.includes('invest') || domain.includes('capital')) {
      return 'Finance';
    } else if (domain.includes('shop') || domain.includes('store') || domain.includes('retail') || domain.includes('mart')) {
      return 'Retail';
    } else if (domain.includes('factory') || domain.includes('manufacturing') || domain.includes('industrial')) {
      return 'Manufacturing';
    } else if (domain.includes('edu') || domain.includes('school') || domain.includes('university') || domain.includes('college')) {
      return 'Education';
    } else if (domain.includes('tech') || domain.includes('software') || domain.includes('app') || domain.includes('digital')) {
      return 'Technology';
    } else if (domain.includes('law') || domain.includes('legal') || domain.includes('attorney')) {
      return 'Legal';
    }
    
    // If we can't determine the industry from the domain, return null
    // In a real implementation, we would analyze the content of the website
    return null;
  } catch (error) {
    console.error('Error analyzing website domain:', error);
    return null;
  }
} 