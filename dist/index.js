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
    const processedData = {};
    for (const [key, value] of Object.entries(assessmentData)) {
      if (Array.isArray(value)) {
        processedData[key] = value.join(",");
      } else if (value !== null && value !== void 0) {
        processedData[key] = String(value);
      }
    }
    const assessment = {
      ...processedData,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.assessments.set(id, assessment);
    console.log("Assessment saved successfully:", id);
    return assessment;
  }
  async saveProgress(progressData) {
    const id = this.progressId++;
    const progress2 = {
      ...progressData,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.progresses.set(id, progress2);
    return progress2;
  }
  async getProgress(id) {
    return this.progresses.get(id);
  }
};
var storage = new MemStorage();

// server/routes.ts
import { z as z2 } from "zod";

// shared/schema.ts
import { pgTable, text, serial, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  repetitiveTasks: text("repetitive_tasks"),
  employeeTasks: text("employee_tasks"),
  manualErrors: text("manual_errors"),
  multipleSystems: text("multiple_systems"),
  manualTransfer: text("manual_transfer"),
  realTimeUpdates: text("real_time_updates"),
  businessGrowth: text("business_growth"),
  scaleOperations: text("scale_operations"),
  strategicActivities: text("strategic_activities"),
  documentedProcesses: text("documented_processes"),
  technologyInfrastructure: text("technology_infrastructure"),
  trainingReadiness: text("training_readiness"),
  timeSavings: text("time_savings"),
  aiAnalytics: text("ai_analytics"),
  investmentReadiness: text("investment_readiness"),
  // New fields for daily tasks and apps
  dailyTasks: text("daily_tasks"),
  softwareTools: text("software_tools"),
  communicationApps: text("communication_apps"),
  dataTransferProcess: text("data_transfer_process"),
  createdAt: timestamp("created_at").defaultNow()
});
var assessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  createdAt: true
});
var flexibleAssessmentSchema = z.object({
  repetitiveTasks: z.union([z.string(), z.array(z.string())]).optional(),
  employeeTasks: z.union([z.string(), z.array(z.string())]).optional(),
  manualErrors: z.union([z.string(), z.array(z.string())]).optional(),
  multipleSystems: z.union([z.string(), z.array(z.string())]).optional(),
  manualTransfer: z.union([z.string(), z.array(z.string())]).optional(),
  realTimeUpdates: z.union([z.string(), z.array(z.string())]).optional(),
  businessGrowth: z.union([z.string(), z.array(z.string())]).optional(),
  scaleOperations: z.union([z.string(), z.array(z.string())]).optional(),
  strategicActivities: z.union([z.string(), z.array(z.string())]).optional(),
  documentedProcesses: z.union([z.string(), z.array(z.string())]).optional(),
  technologyInfrastructure: z.union([z.string(), z.array(z.string())]).optional(),
  trainingReadiness: z.union([z.string(), z.array(z.string())]).optional(),
  timeSavings: z.union([z.string(), z.array(z.string())]).optional(),
  aiAnalytics: z.union([z.string(), z.array(z.string())]).optional(),
  investmentReadiness: z.union([z.string(), z.array(z.string())]).optional(),
  dailyTasks: z.union([z.string(), z.array(z.string())]).optional(),
  softwareTools: z.union([z.string(), z.array(z.string())]).optional(),
  communicationApps: z.union([z.string(), z.array(z.string())]).optional(),
  dataTransferProcess: z.union([z.string(), z.array(z.string())]).optional()
}).catchall(z.any());
var progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  surveyData: jsonb("survey_data").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var saveProgressSchema = z.object({
  email: z.string().email(),
  surveyData: z.record(z.string(), z.any())
});

// server/emailService.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  // You may need to update this based on your email provider
  port: 587,
  secure: false,
  // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || "youremail@gmail.com",
    // You should set these as environment variables
    pass: process.env.EMAIL_PASS || "yourpassword"
  },
  tls: {
    rejectUnauthorized: false
    // Only for development
  }
});
var generateResultsHtml = (data) => {
  let html = `
    <h1 style="color:#2563eb; font-family:sans-serif; border-bottom:2px solid #ddd; padding-bottom:10px;">
      Workflow Automation Readiness Assessment Results
    </h1>
    <p style="font-family:sans-serif; color:#444;">Below are the responses submitted in the assessment:</p>
    <div style="margin: 20px 0; padding: 20px; border: 1px solid #eee; border-radius: 5px; font-family:sans-serif;">
  `;
  const getReadableName = (key) => {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  };
  Object.entries(data).forEach(([key, value]) => {
    if (key.endsWith("_text")) {
      const questionKey = key.replace("_text", "");
      const readableQuestionName = getReadableName(questionKey);
      if (value && value.trim() !== "") {
        html += `
          <div style="margin-bottom: 16px; padding-left: 20px; border-left: 3px solid #2563eb;">
            <p style="color: #666; font-style: italic; margin-bottom: 5px;">Additional comments for ${readableQuestionName}:</p>
            <p style="margin-top: 0;">${value}</p>
          </div>
        `;
      }
    } else if (Array.isArray(value) && value.length > 0) {
      html += `
        <div style="margin-bottom: 24px; background-color:#f8fafc; padding:15px; border-radius:8px;">
          <h3 style="color: #1e3a8a; margin-top:0; margin-bottom: 10px; font-size:16px;">${getReadableName(key)}</h3>
          <p style="margin-top:0; margin-bottom:5px;"><strong>Selected options:</strong></p>
          <ul style="margin-top:5px;">
            ${value.map((option) => `<li style="margin-bottom:4px;">${option}</li>`).join("")}
          </ul>
        </div>
      `;
    } else if (typeof value === "string" && value.trim() !== "") {
      html += `
        <div style="margin-bottom: 24px; background-color:#f8fafc; padding:15px; border-radius:8px;">
          <h3 style="color: #1e3a8a; margin-top:0; margin-bottom: 10px; font-size:16px;">${getReadableName(key)}</h3>
          <p style="margin:0;"><strong>Selected option:</strong> ${value}</p>
        </div>
      `;
    }
  });
  html += `
    </div>
    <p style="font-family:sans-serif; color:#444;">Thank you for completing the assessment.</p>
    <p style="font-family:sans-serif; color:#444;">
      <strong>Best regards,</strong><br/>
      The Carbo Software Team<br/>
      <a href="mailto:support@carbosoftware.tech" style="color:#2563eb;">support@carbosoftware.tech</a>
    </p>
  `;
  return html;
};
var sendSurveyResults = async (data, recipientEmail = "neosk@carbosoftware.tech") => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || "youremail@gmail.com",
      to: recipientEmail,
      subject: "Workflow Automation Readiness Assessment Results",
      html: generateResultsHtml(data)
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Survey results email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending survey results email:", error);
    return false;
  }
};

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/survey/submit", async (req, res) => {
    try {
      const validatedData = flexibleAssessmentSchema.parse(req.body);
      const processedData = Object.fromEntries(
        Object.entries(validatedData).map(([key, value]) => {
          if (Array.isArray(value)) {
            return [key, value.join(",")];
          }
          return [key, value];
        })
      );
      const result = await storage.saveAssessment(processedData);
      try {
        await sendSurveyResults(req.body);
        console.log("Survey results email sent successfully");
      } catch (emailError) {
        console.error("Error sending survey results email:", emailError);
      }
      res.status(201).json({
        success: true,
        message: "Assessment submitted successfully and results sent to email",
        assessmentId: result.id
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
      const progress2 = await storage.getProgress(parseInt(id, 10));
      if (!progress2) {
        return res.status(404).json({
          success: false,
          message: "Progress not found"
        });
      }
      res.status(200).json({
        success: true,
        data: progress2
      });
    } catch (error) {
      console.error("Error loading progress:", error);
      res.status(500).json({
        success: false,
        message: "Failed to load progress"
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
