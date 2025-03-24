import { IndustryInsights, RecommendedTool } from '../shared/schema';
import axios from 'axios';

// Get OpenAI API key from environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/**
 * Get industry insights based on the industry name and assessment data
 */
export async function getIndustryInsights(
  industryName: string, 
  assessment: Record<string, any>
): Promise<IndustryInsights> {
  try {
    console.log(`Fetching industry insights for: ${industryName}`);
    
    // If website URL is provided, use it for enhanced analysis
    let industryInfo = '';
    if (assessment.websiteUrl) {
      industryInfo = await searchIndustryInfoFromWebsite(assessment.websiteUrl, industryName);
    }
    
    // Use OpenAI to generate industry insights based on the industry name and any website info
    const insights = await generateIndustryInsights(industryName, industryInfo);
    
    return insights;
  } catch (error) {
    console.error('Error fetching industry insights:', error);
    
    // Fallback to mock data if there's an error
    return getMockIndustryInsights(industryName);
  }
}

/**
 * Get recommended tools based on assessment data and industry
 */
export async function getRecommendedTools(
  assessment: Record<string, any>,
  industryName: string
): Promise<RecommendedTool[]> {
  try {
    console.log(`Fetching recommended tools for ${industryName} based on assessment`);
    
    // Create a summary of key assessment details for the AI
    const assessmentSummary = createAssessmentSummary(assessment);
    
    // Use OpenAI to generate tool recommendations
    const tools = await generateToolRecommendations(industryName, assessmentSummary);
    
    return tools;
  } catch (error) {
    console.error('Error fetching recommended tools:', error);
    
    // Fallback to mock data if there's an error
    return getMockRecommendedTools(assessment, industryName);
  }
}

/**
 * Search for industry information from a website using OpenAI
 */
async function searchIndustryInfoFromWebsite(websiteUrl: string, fallbackIndustry: string): Promise<string> {
  try {
    // Define the prompt for OpenAI to analyze the website
    const prompt = `Please analyze the website ${websiteUrl} and tell me about:
1. What industry this company is in
2. Their main products or services
3. Any information about their current technology or automation use
4. Key challenges they might face in their industry

If you can't access the website or find complete information, please indicate that.`;

    // Call OpenAI API with web search enabled
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that analyzes websites to determine industry information.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.5,
        tools: [{ type: "web_search" }],
        tool_choice: "auto"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    // Extract and return the content from the response
    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content || '';
    }
    
    return '';
  } catch (error) {
    console.error('Error analyzing website with OpenAI:', error);
    return '';
  }
}

/**
 * Generate industry insights using OpenAI
 */
async function generateIndustryInsights(industryName: string, industryInfo: string = ''): Promise<IndustryInsights> {
  try {
    // Create a detailed prompt for OpenAI
    let prompt = `Please provide detailed insights about workflow automation in the ${industryName} industry. I need the following specific information:

1. A list of trending automation tools in this industry
2. Benchmarks for implementation time (in months), bottlenecks (as a percentage difficulty score), and success rate (as a percentage)
3. A brief case study of a company that successfully implemented workflow automation
4. The average automation level in this industry (as a percentage from 0-100)
5. The top automated processes in this industry
6. ROI information including typical timeframe for returns and average ROI percentage range

Format your response as structured data that can be parsed as JSON with the following structure:
{
  "industryName": string,
  "trendingTools": string[],
  "benchmarks": { 
    "implementationTime": number,
    "bottlenecks": number,
    "successRatePercentage": number
  },
  "caseStudies": string[],
  "automationLevel": number,
  "topAutomatedProcesses": string[],
  "roi": {
    "timeframe": string,
    "averageReturn": string
  }
}`;

    // If we have additional industry info from the website, include it
    if (industryInfo) {
      prompt += `\n\nHere is additional information about a specific company in this industry that should inform your response:\n${industryInfo}`;
    }

    // Call OpenAI API with web search enabled
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that provides accurate industry data in JSON format.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1500,
        temperature: 0.5,
        tools: [{ type: "web_search" }],
        tool_choice: "auto",
        response_format: { type: "json_object" }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    // Parse the response to get the industry insights JSON
    if (response.data.choices && response.data.choices.length > 0) {
      const content = response.data.choices[0].message.content || '';
      try {
        const insights = JSON.parse(content) as IndustryInsights;
        return insights;
      } catch (parseError) {
        console.error('Error parsing OpenAI response as JSON:', parseError);
        throw new Error('Invalid response format from OpenAI');
      }
    }
    
    throw new Error('No valid response from OpenAI');
  } catch (error) {
    console.error('Error generating industry insights with OpenAI:', error);
    throw error;
  }
}

/**
 * Generate tool recommendations using OpenAI
 */
async function generateToolRecommendations(industryName: string, assessmentSummary: string): Promise<RecommendedTool[]> {
  try {
    // Create a detailed prompt for OpenAI
    const prompt = `Based on the assessment data for a company in the ${industryName} industry, please recommend 3-5 specific workflow automation tools that would be most beneficial for them.

Assessment summary:
${assessmentSummary}

For each tool, provide:
1. The name of the tool
2. A brief description of what it does
3. 2-4 specific use cases relevant to this company's needs
4. Information about the pricing model

Format your response as structured data that can be parsed as JSON with the following structure for each tool:
{
  "recommendedTools": [
    {
      "name": string,
      "description": string,
      "useCases": string[],
      "pricingModel": string
    }
  ]
}`;

    // Call OpenAI API with web search enabled
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that recommends workflow automation tools in JSON format.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1500,
        temperature: 0.5,
        tools: [{ type: "web_search" }],
        tool_choice: "auto",
        response_format: { type: "json_object" }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    // Parse the response to get the tool recommendations
    if (response.data.choices && response.data.choices.length > 0) {
      const content = response.data.choices[0].message.content || '';
      try {
        const result = JSON.parse(content);
        return result.recommendedTools || [];
      } catch (parseError) {
        console.error('Error parsing OpenAI response as JSON:', parseError);
        throw new Error('Invalid response format from OpenAI');
      }
    }
    
    throw new Error('No valid response from OpenAI');
  } catch (error) {
    console.error('Error generating tool recommendations with OpenAI:', error);
    throw error;
  }
}

/**
 * Create a summary of the assessment data for OpenAI
 */
function createAssessmentSummary(assessment: Record<string, any>): string {
  const summary = [];
  
  if (assessment.websiteUrl) {
    summary.push(`Website: ${assessment.websiteUrl}`);
  }
  
  if (assessment.dailyTasks) {
    summary.push(`Time-consuming tasks: ${assessment.dailyTasks}`);
  }
  
  if (assessment.softwareTools) {
    summary.push(`Software used: ${assessment.softwareTools}`);
  }
  
  if (assessment.communicationApps) {
    summary.push(`Communication tools: ${assessment.communicationApps}`);
  }
  
  if (assessment.dataTransferProcess) {
    summary.push(`Data transfer process: ${assessment.dataTransferProcess}`);
  }
  
  if (assessment.repetitiveTasks) {
    summary.push(`Repetitive tasks frequency: ${assessment.repetitiveTasks}`);
  }
  
  if (assessment.manualErrors) {
    summary.push(`Manual errors frequency: ${assessment.manualErrors}`);
  }
  
  if (assessment.multipleSystems) {
    summary.push(`Multiple disconnected systems: ${assessment.multipleSystems}`);
  }
  
  if (assessment.manualTransfer) {
    summary.push(`Manual data transfer frequency: ${assessment.manualTransfer}`);
  }
  
  if (assessment.businessGrowth) {
    summary.push(`Business growth rate: ${assessment.businessGrowth}`);
  }
  
  if (assessment.documentedProcesses) {
    summary.push(`Process documentation level: ${assessment.documentedProcesses}`);
  }
  
  if (assessment.technologyInfrastructure) {
    summary.push(`Technology infrastructure: ${assessment.technologyInfrastructure}`);
  }
  
  return summary.join('\n');
}

// Fallback mock data functions in case OpenAI API fails
function getMockIndustryInsights(industry: string): IndustryInsights {
  const capitalizedIndustry = industry.charAt(0).toUpperCase() + industry.slice(1);
  
  return {
    industryName: capitalizedIndustry,
    trendingTools: ['Workflow Automation Platform', 'Document Processing System', 'Integration Tool'],
    benchmarks: {
      implementationTime: 6,
      bottlenecks: 55,
      successRatePercentage: 75
    },
    caseStudies: [
      `A company in the ${capitalizedIndustry} industry improved efficiency by 35% after implementing workflow automation.`
    ],
    automationLevel: 58,
    topAutomatedProcesses: ['Document Processing', 'Data Entry', 'Communication Workflows'],
    roi: {
      timeframe: '6-10 months',
      averageReturn: '150-200%'
    }
  };
}

function getMockRecommendedTools(assessment: Record<string, any>, industry: string): RecommendedTool[] {
  // Base tools that could be recommended to anyone
  return [
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
    },
    {
      name: "DataConnect",
      description: "Integration platform for connecting software systems",
      useCases: ["CRM integration", "Automated reporting", "Cross-platform data sync"],
      pricingModel: "Usage-based pricing, starting at $99/month"
    }
  ];
} 