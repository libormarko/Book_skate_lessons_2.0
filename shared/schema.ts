import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const skateparks = pgTable("skateparks", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  city: text("city").notNull(),
  address: text("address").notNull(),
  imageUrl: text("image_url").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  features: text("features").array().notNull(),
  facilities: text("facilities").array().notNull(),
});

export const boardTypes = pgTable("board_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  level: text("level").notNull(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  skateparkId: integer("skatepark_id").notNull(),
  boardTypeId: integer("board_type_id").notNull(),
  date: timestamp("date").notNull(),
  startTime: text("start_time").notNull(),
  duration: integer("duration").notNull(),
  price: integer("price").notNull(),
  maxParticipants: integer("max_participants").notNull(),
  bookedParticipants: integer("booked_participants").notNull().default(0),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  participants: integer("participants").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  boardTypeId: integer("board_type_id").notNull(),
  boardTypeName: text("board_type_name").notNull(),
  skateparkName: text("skatepark_name").notNull(),
  skateparkAddress: text("skatepark_address").notNull(),
});

// Insert Schemas
export const insertSkateparkSchema = createInsertSchema(skateparks);
export const insertBoardTypeSchema = createInsertSchema(boardTypes);
export const insertLessonSchema = createInsertSchema(lessons);
export const insertBookingSchema = createInsertSchema(bookings);

// Types
export type Skatepark = typeof skateparks.$inferSelect;
export type InsertSkatepark = typeof skateparks.$inferInsert;
export type BoardType = typeof boardTypes.$inferSelect;
export type InsertBoardType = typeof boardTypes.$inferInsert;
export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;