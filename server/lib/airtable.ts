import Airtable from 'airtable';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure Airtable with API key
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY
});

// Initialize the base with your base ID
const base = Airtable.base(process.env.AIRTABLE_BASE_ID || '');

// Export the configured base instance
export default base;

// Helper function to normalize Airtable records
export const normalizeRecords = <T>(records: any[]): T[] => {
  return records.map(record => ({
    id: record.id,
    ...record.fields
  })) as T[];
};

// Helper function to handle Airtable errors
export const handleAirtableError = (error: any): Error => {
  console.error('Airtable error:', error);
  if (error.error === 'NOT_FOUND') {
    return new Error('Record not found');
  } else if (error.error === 'INVALID_PERMISSIONS') {
    return new Error('Permission denied');
  } else {
    return new Error('An error occurred with the database');
  }
}; 