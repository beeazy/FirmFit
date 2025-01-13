import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { classesTable } from '../../db/classesSchema.js';
import { eq } from 'drizzle-orm';

// List all classes
export async function listClasses(req: Request, res: Response) {
    // res.send('List of all classes');

    try {
        const classes = await db.select().from(classesTable);
        res.status(200).json(classes)
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Create a new class
export async function createClass(req: Request, res: Response) {
    try {
        const [createdClass] = await db
            .insert(classesTable)
            .values(req.body)
            .returning();

        res.status(201).json(createdClass);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Get details of a specific class by ID
export async function getClassById(req: Request, res: Response) {
    try {
        const [classDetails] = await db
            .select()
            .from(classesTable)
            .where(eq(classesTable.id, Number(req.params.id)));

            if (!classDetails) {
                res.status(404).json({ message: 'Class not found' });
            } else {
                res.status(200).json(classDetails);
            }

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Update a class
export async function updateClass(req: Request, res: Response) {
    try {
        const [updatedClass] = await db
            .update(classesTable)
            .set(req.body)
            .where(eq(classesTable.id, Number(req.params.id)))
            .returning();

        if (!updatedClass) {
            res.status(404).json({ message: 'Class not found' });
        } else {
            res.status(200).json(updatedClass);
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Delete class

export async function deleteClass(req: Request, res: Response) {
    try {
        const [deletedClass] = await db
            .delete(classesTable)
            .where(eq(classesTable.id, Number(req.params.id)))
            .returning();

        if (!deletedClass) {
            res.status(404).json({ message: 'Class not found' });
        } else {
            res.status(200).json({ message: 'Class deleted successfully'});
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}