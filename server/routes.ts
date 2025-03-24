import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { assessmentSchema, saveProgressSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix
  
  // Submit a completed survey assessment
  app.post("/api/survey/submit", async (req, res) => {
    try {
      const validatedData = assessmentSchema.parse(req.body);
      const result = await storage.saveAssessment(validatedData);
      res.status(201).json({
        success: true,
        message: "Assessment submitted successfully",
        assessmentId: result.id,
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

  const httpServer = createServer(app);
  return httpServer;
}
