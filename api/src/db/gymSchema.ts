import { pgTable, integer, varchar, text, date } from "drizzle-orm/pg-core";

export const gymsTable = pgTable("gyms", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    address: text(),
    phone: varchar({ length: 20 }),
    email: varchar({ length: 255 }),
    active: integer().notNull().default(1), // 1: Active, 0: Inactive
    membership_fee: integer().notNull(),
    createdAt: date().defaultNow().notNull(),
    updatedAt: date().defaultNow().notNull(),
});