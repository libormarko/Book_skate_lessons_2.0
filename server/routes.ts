import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertLessonSchema } from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: Express): Server {
  // Get all skateparks
  app.get("/api/skateparks", async (_req, res) => {
    const parks = await storage.getSkateparks();
    res.json(parks);
  });

  // Search skateparks by city
  app.get("/api/skateparks/search", async (req, res) => {
    const city = req.query.city as string;
    if (!city) {
      return res.status(400).json({ message: "City parameter is required" });
    }
    const parks = await storage.getSkateparksByCity(city);
    res.json(parks);
  });

  // Get skatepark by id
  app.get("/api/skateparks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const park = await storage.getSkateparkById(id);
    if (!park) {
      return res.status(404).json({ message: "Skatepark not found" });
    }
    res.json(park);
  });

  // Get all board types
  app.get("/api/board-types", async (_req, res) => {
    const boards = await storage.getBoardTypes();
    res.json(boards);
  });

  // Get lessons for a skatepark
  app.get("/api/skateparks/:id/lessons", async (req, res) => {
    const skateparkId = parseInt(req.params.id);
    const lessons = await storage.getLessonsBySkateparkId(skateparkId);
    res.json(lessons);
  });

  // Create a lesson
  app.post("/api/lessons", async (req, res) => {
    try {
      const lesson = insertLessonSchema.parse(req.body);
      const created = await storage.createLesson(lesson);
      res.status(201).json(created);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid lesson data" });
      }
      throw error;
    }
  });

  // Create a booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const booking = insertBookingSchema.parse(req.body);
      const created = await storage.createBooking(booking);
      res.status(201).json(created);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data" });
      }
      throw error;
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
