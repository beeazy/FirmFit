import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 255 }).notNull().unique(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(), // Hashed
    role: varchar({ length: 50 }).notNull().default('member'), // e.g., "admin", "staff", "member", "super_admin"
    gymId: integer(), // Nullable for super admin
    createdAt: date().defaultNow().notNull(),
    updatedAt: date().defaultNow().notNull(),
});

export const createUsersSchema = createInsertSchema(usersTable);

export const loginSchema = createInsertSchema(usersTable).pick({ username: true, password: true });
