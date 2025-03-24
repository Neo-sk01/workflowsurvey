import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { assessmentSchema, saveProgressSchema } from "@shared/schema";
import { analyzeResponses, generateRecommendations } from "./ai-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix
  
  // Submit a completed survey assessment
  app.post("/api/survey/submit", async (req, res) => {
    try {
      const validatedData = assessmentSchema.parse(req.body);
      const result = await storage.saveAssessment(validatedData);
      
      // Generate AI analysis for the assessment
      const analysis = await analyzeResponses(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Assessment submitted successfully",
        assessmentId: result.id,
        analysis: analysis,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid assessment data",
          errors: error.errors,
        });
      } else {
        console.error("Error submitting assessment:", error);
        res.status(500).json({
          success: false,
          message: "Failed to submit assessment",
        });
      }
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
