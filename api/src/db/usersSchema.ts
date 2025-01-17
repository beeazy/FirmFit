import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { gymsTable } from "./gymSchema.js";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 255 }).notNull().unique(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(), // Hashed
    role: varchar({ length: 50 }).notNull().default('member'), // e.g., "admin", "staff", "member", "super_admin"
    gymId: integer().references(() => gymsTable.id), // null for super_admin
    createdAt: date().defaultNow().notNull(),
    updatedAt: date().defaultNow().notNull(),
});

export const createUsersSchema = createInsertSchema(usersTable);

export const loginSchema = createInsertSchema(usersTable).pick({ email: true, password: true });
