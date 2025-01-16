import { Request, Response } from 'express';
import { gymsTable } from '../../db/gymSchema.js';
import { db } from '../../db/index.js';
import { eq } from 'drizzle-orm';

export async function listGyms(req: Request, res: Response) {
    try {
        const gyms = await db.select().from(gymsTable);
        res.status(200).json(gyms)
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function createGym(req: Request, res: Response) {
    try {
        const [createdGym] = await db
            .insert(gymsTable)
            .values(req.body)
            .returning();

        res.status(201).json(createdGym);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getGymById(req: Request, res: Response) {
    try {
        const [gymDetails] = await db
            .select()
            .from(gymsTable)
            .where(eq(gymsTable.id, Number(req.params.id)));

            if (!gymDetails) {
                res.status(404).json({ message: 'Gym not found' });
            } else {
                res.status(200).json(gymDetails);
            }

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function updateGym(req: Request, res: Response) {
    try {
        const [updatedGym] = await db
            .update(gymsTable)
            .set(req.body)
            .where(eq(gymsTable.id, Number(req.params.id)))
            .returning();

        if (!updatedGym) {
            res.status(404).json({ message: 'Gym not found' });
        } else {
            res.status(200).json(updatedGym);
        }

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// set gym as inactive or active

export async function setGymStatus(req: Request, res: Response) {
    try {
        const [updatedGym] = await db
            .update(gymsTable)
            .set({ active: req.body.active })
            .where(eq(gymsTable.id, Number(req.params.id)))
            .returning();

        if (!updatedGym) {
            res.status(404).json({ message: 'Gym not found' });
        } else {
            res.status(200).json(updatedGym);
        }

    } catch (error) {
        res.status(500).json({ message: error });
    }
}