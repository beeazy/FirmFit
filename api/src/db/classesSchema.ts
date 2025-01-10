import { integer, pgTable, varchar, text, jsonb, doublePrecision } from "drizzle-orm/pg-core";

export const classesTable = pgTable("classes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  capacity: integer(),
  trainerId: integer().notNull(), // Foreign key to trainers table
  durationMinutes: integer().notNull(),
  price: doublePrecision().notNull(),
  schedule: jsonb().notNull(), // JSON column to store schedule details (e.g., day and time arrays)
});

