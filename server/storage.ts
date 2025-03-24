import { type User, type InsertUser, type Assessment, type InsertAssessment, type Progress, type InsertProgress } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveAssessment(assessment: InsertAssessment): Promise<Assessment>;
  saveProgress(progress: InsertProgress): Promise<Progress>;
  getProgress(id: number): Promise<Progress | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private assessments: Map<number, Assessment>;
  private progresses: Map<number, Progress>;
  private userId: number;
  private assessmentId: number;
  private progressId: number;

  constructor() {
    this.users = new Map();
    this.assessments = new Map();
    this.progresses = new Map();
    this.userId = 1;
    this.assessmentId = 1;
    this.progressId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async saveAssessment(assessmentData: InsertAssessment): Promise<Assessment> {
    const id = this.assessmentId++;
    const assessment: Assessment = { 
      ...assessmentData, 
      id, 
      createdAt: new Date() 
    };
    
    this.assessments.set(id, assessment);
    return assessment;
  }
  
  async saveProgress(progressData: InsertProgress): Promise<Progress> {
    const id = this.progressId++;
    const progress: Progress = {
      ...progressData,
      id,
      createdAt: new Date()
    };
    
    this.progresses.set(id, progress);
    return progress;
  }
  
  async getProgress(id: number): Promise<Progress | undefined> {
    return this.progresses.get(id);
  }
}

// Export a singleton instance of MemStorage
export const storage = new MemStorage();
