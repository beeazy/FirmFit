import { Request, Response } from 'express';
import { enrollmentsTable } from '../../db/enrollmentsSchema';
import { classesTable } from '../../db/classesSchema';
import { eq } from 'drizzle-orm';
import { db } from '../../db/index';




export async function enrollMember(req: Request, res: Response) {
    try {
        const { memberId } = req.body;
        const classId = Number(req.params.id);

        // Check if the class exists
        const [classExists] = await db
            .select()
            .from(classesTable)
            .where(eq(classesTable.id, classId));

        if (!classExists) {
            return res.status(404).json({ message: 'Class not found' });
        }

        // Create a new enrollment
        const [enrollment] = await db
            .insert(enrollmentsTable)
            .values({ classId, memberId })
            .returning();

        res.status(201).json({ message: 'Member enrolled successfully', enrollment });

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getClassEnrollments(req: Request, res: Response) {
    try {
        const classId = Number(req.params.id);

        // Check if the class exists
        const [classExists] = await db
            .select()
            .from(classesTable)
            .where(eq(classesTable.id, classId));

        if (!classExists) {
            return res.status(404).json({ message: 'Class not found' });
        }

        // Get all enrollments for the class
        const enrollments = await db
            .select()
            .from(enrollmentsTable)
            .where(eq(enrollmentsTable.classId, classId));

        res.status(200).json(enrollments);

    } catch (error) {
        res.status(500).json({ message: error });
    }
}