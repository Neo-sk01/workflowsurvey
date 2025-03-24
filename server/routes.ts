import express, { Request, Response } from 'express';
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { assessmentSchema, saveProgressSchema } from "@shared/schema";
import { analyzeResponses, generateRecommendations } from "./ai-service";
import { upload } from "./index";
import path from 'path';
import { Multer } from "multer";

// Extended request interface with file property
interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}

export function initRoutes(app: express.Express) {
  // Test API route
  app.get('/api/test', (_req: Request, res: Response) => {
    res.json({ message: 'APIs are working!' });
  });

  // Submit survey assessment
  app.post('/api/survey/submit', upload.single('companyProfile'), async (req: RequestWithFile, res: Response) => {
    try {
      const validatedData = assessmentSchema.parse(req.body);
      
      // Add file information if a file was uploaded
      let companyProfileUploaded = false;
      if (req.file) {
        // Add file path and original filename to the validated data
        validatedData.companyProfileUrl = `/uploads/${path.basename(req.file.path)}`;
        validatedData.companyProfileFilename = req.file.originalname;
        companyProfileUploaded = true;
      }

      // TODO: Save validatedData to database
      const assessmentId = Date.now(); // Placeholder for actual DB-generated ID

      // Some simple automated analysis based on the submission
      // In a real app, this would be more sophisticated
      const analysis = {
        workflowScore: 75, // Sample score
        automationPotential: 'high',
        recommendedTools: ['Zapier', 'Airtable', 'Notion'],
        summary: 'Your business has significant automation potential.',
      };

      // Send a successful response
      res.json({
        success: true,
        assessmentId,
        analysis,
        companyProfileUploaded
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Validation error
        return res.status(400).json({
          success: false,
          errors: error.errors,
        });
      }
      
      // Other errors
      console.error('Error submitting survey:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing your submission',
      });
    }
  });

  // Save assessment progress
  app.post("/api/survey/save-progress", async (req, res) => {
    try {
      const validatedData = saveProgressSchema.parse(req.body);
      const result = await storage.saveProgress(validatedData);
      res.status(201).json({
        success: true,
        message: "Progress saved successfully",
        progressId: result.id,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid progress data",
          errors: error.errors,
        });
      } else {
        console.error("Error saving progress:", error);
        res.status(500).json({
          success: false,
          message: "Failed to save progress",
        });
      }
    }
  });

  // Load saved assessment progress
  app.get("/api/survey/progress/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const progress = await storage.getProgress(parseInt(id, 10));
      
      if (!progress) {
        return res.status(404).json({
          success: false,
          message: "Progress not found",
        });
      }
      
      res.status(200).json({
        success: true,
        data: progress,
      });
    } catch (error) {
      console.error("Error loading progress:", error);
      res.status(500).json({
        success: false,
        message: "Failed to load progress",
      });
    }
  });

  // NEW: Get AI-powered recommendations for partial responses
  app.post("/api/survey/get-recommendations", async (req, res) => {
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
        message: "Failed to generate recommendations",
      });
    }
  });

  // NEW: Get analysis results for a completed assessment
  app.get("/api/survey/analysis", async (req, res) => {
    try {
      const assessmentId = req.query.id;
      
      if (!assessmentId || typeof assessmentId !== 'string') {
        return res.status(400).json({
          success: false,
          message: "Assessment ID is required",
        });
      }
      
      // Convert to number as our storage uses numeric IDs
      const id = parseInt(assessmentId, 10);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid assessment ID format",
        });
      }
      
      const assessment = await storage.getAssessment(id);
      
      if (!assessment) {
        return res.status(404).json({
          success: false,
          message: "Assessment not found",
        });
      }
      
      // If analysis doesn't exist for this assessment, generate it now
      if (!assessment.analysis) {
        const analysisData = await analyzeResponses(assessment);
        await storage.updateAssessmentAnalysis(id, analysisData);
        assessment.analysis = analysisData;
      }
      
      res.status(200).json({
        success: true,
        analysis: assessment.analysis,
      });
    } catch (error) {
      console.error("Error retrieving analysis:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve analysis",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
