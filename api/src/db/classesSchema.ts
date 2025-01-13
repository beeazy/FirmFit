import { integer, pgTable, varchar, text, jsonb, doublePrecision } from "drizzle-orm/pg-core";

export const classesTable = pgTable("classes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  capacity: integer(),
  trainer_id: integer().notNull(), // Foreign key to trainers table
  duration_minutes: integer().notNull(),
  schedule: jsonb().notNull(), // JSON column to store schedule details (e.g., day and time arrays)
});

