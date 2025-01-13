import { integer, pgTable } from "drizzle-orm/pg-core";

export const enrollmentsTable = pgTable("enrollments", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    classId: integer().notNull(), // Foreign key to classesTable
    memberId: integer().notNull(), // Foreign key to membersTable
});
