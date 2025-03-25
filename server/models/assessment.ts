import base, { normalizeRecords, handleAirtableError } from '../lib/airtable';
import { v4 as uuidv4 } from 'uuid';

// Interface for assessment data
export interface Assessment {
  id: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
  data: Record<string, any>;
  companyProfile?: {
    url: string;
    name: string;
  };
  analysis?: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    recommendations: string[];
  };
}

const TABLE_NAME = 'Assessments';

/**
 * Create a new assessment in Airtable
 */
export const createAssessment = async (assessmentData: Partial<Assessment>): Promise<Assessment> => {
  try {
    // Generate a unique ID if not provided
    const id = assessmentData.id || uuidv4();
    const now = new Date().toISOString();

    // Prepare record for Airtable
    const record = {
      ID: id,
      UserID: assessmentData.userId || '',
      CreatedAt: now,
      UpdatedAt: now,
      Data: JSON.stringify(assessmentData.data || {}),
      CompanyProfile: assessmentData.companyProfile 
        ? JSON.stringify(assessmentData.companyProfile) 
        : '',
      Analysis: assessmentData.analysis 
        ? JSON.stringify(assessmentData.analysis) 
        : ''
    };

    // Create the record in Airtable
    const result = await base(TABLE_NAME).create([
      { fields: record }
    ]);

    if (result && result.length > 0) {
      // Return the newly created assessment
      return {
        id: id,
        userId: assessmentData.userId,
        createdAt: now,
        updatedAt: now,
        data: assessmentData.data || {},
        companyProfile: assessmentData.companyProfile,
        analysis: assessmentData.analysis
      };
    } else {
      throw new Error('Failed to create assessment');
    }
  } catch (error) {
    throw handleAirtableError(error);
  }
};

/**
 * Get an assessment by ID
 */
export const getAssessmentById = async (id: string): Promise<Assessment | null> => {
  try {
    const records = await base(TABLE_NAME)
      .select({
        filterByFormula: `{ID} = '${id}'`,
        maxRecords: 1
      })
      .firstPage();
    
    if (records.length === 0) {
      return null;
    }

    const record = records[0];
    
    return {
      id: record.get('ID') as string,
      userId: record.get('UserID') as string,
      createdAt: record.get('CreatedAt') as string,
      updatedAt: record.get('UpdatedAt') as string,
      data: JSON.parse(record.get('Data') as string || '{}'),
      companyProfile: record.get('CompanyProfile') 
        ? JSON.parse(record.get('CompanyProfile') as string) 
        : undefined,
      analysis: record.get('Analysis') 
        ? JSON.parse(record.get('Analysis') as string) 
        : undefined
    };
  } catch (error) {
    throw handleAirtableError(error);
  }
};

/**
 * Update an existing assessment
 */
export const updateAssessment = async (id: string, assessmentData: Partial<Assessment>): Promise<Assessment> => {
  try {
    // Find the record first
    const records = await base(TABLE_NAME)
      .select({
        filterByFormula: `{ID} = '${id}'`,
        maxRecords: 1
      })
      .firstPage();
    
    if (records.length === 0) {
      throw new Error('Assessment not found');
    }
    
    const recordId = records[0].id;
    const now = new Date().toISOString();
    
    // Prepare the update fields
    const fields: Record<string, any> = {
      UpdatedAt: now
    };
    
    if (assessmentData.data) {
      fields.Data = JSON.stringify(assessmentData.data);
    }
    
    if (assessmentData.companyProfile) {
      fields.CompanyProfile = JSON.stringify(assessmentData.companyProfile);
    }
    
    if (assessmentData.analysis) {
      fields.Analysis = JSON.stringify(assessmentData.analysis);
    }
    
    // Update the record
    await base(TABLE_NAME).update([
      {
        id: recordId,
        fields
      }
    ]);
    
    // Fetch the updated record
    return await getAssessmentById(id) as Assessment;
  } catch (error) {
    throw handleAirtableError(error);
  }
};

/**
 * Get all assessments for a user
 */
export const getAssessmentsByUserId = async (userId: string): Promise<Assessment[]> => {
  try {
    const records = await base(TABLE_NAME)
      .select({
        filterByFormula: `{UserID} = '${userId}'`,
        sort: [{ field: 'CreatedAt', direction: 'desc' }]
      })
      .all();
    
    return records.map(record => ({
      id: record.get('ID') as string,
      userId: record.get('UserID') as string,
      createdAt: record.get('CreatedAt') as string,
      updatedAt: record.get('UpdatedAt') as string,
      data: JSON.parse(record.get('Data') as string || '{}'),
      companyProfile: record.get('CompanyProfile') 
        ? JSON.parse(record.get('CompanyProfile') as string) 
        : undefined,
      analysis: record.get('Analysis') 
        ? JSON.parse(record.get('Analysis') as string) 
        : undefined
    }));
  } catch (error) {
    throw handleAirtableError(error);
  }
};

/**
 * Delete an assessment
 */
export const deleteAssessment = async (id: string): Promise<boolean> => {
  try {
    const records = await base(TABLE_NAME)
      .select({
        filterByFormula: `{ID} = '${id}'`,
        maxRecords: 1
      })
      .firstPage();
    
    if (records.length === 0) {
      return false;
    }
    
    const recordId = records[0].id;
    
    await base(TABLE_NAME).destroy([recordId]);
    
    return true;
  } catch (error) {
    throw handleAirtableError(error);
    return false;
  }
}; 