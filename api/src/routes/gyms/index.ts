import { Router } from 'express';
import {
    listGyms,
    createGym,
    getGymById,
    updateGym,
    setGymStatus
} from './gymsController.js'
import { verifyAdmin, verifyToken } from '../../middlewares/authMiddleware.js';
import { gymsTable } from '../../db/gymSchema.js';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { validateData } from '../../middlewares/validationMiddleware.js';

const createGymSchema = createInsertSchema(gymsTable);
const selectGymSchema = createSelectSchema(gymsTable);
const updateGymSchema = createInsertSchema(gymsTable).partial();


const router = Router();

// Get a list of all gyms
router.get('/', listGyms);
// Create a new gym
router.post('/', verifyToken, verifyAdmin, validateData(createGymSchema), createGym);
// Get details of a specific gym by ID
router.get('/:id', getGymById);
// Update a gym by ID
router.put('/:id', verifyToken, verifyAdmin, validateData(updateGymSchema), updateGym);
// Set the status of a gym by ID
router.put('/:id/status', validateData(
    z.object({
        active: z.number().int().min(0).max(1)
    })
), setGymStatus);

export default router;


