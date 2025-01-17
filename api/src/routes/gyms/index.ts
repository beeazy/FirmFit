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

/**
 * @swagger
 * /gyms:
 *   get:
 *     summary: Get a list of all gyms
 *     description: Retrieve a list of all gyms
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
router.get('/', listGyms);

/**
 * @swagger
 * /gyms:
 *   post:
 *     summary: Create a new gym
 *     description: Create a new gym
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gym'
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
router.post('/', verifyToken, verifyAdmin, validateData(createGymSchema), createGym);

/**
 * @swagger
 * /gyms/{id}:
 *   get:
 *     summary: Get details of a specific gym by ID
 *     description: Retrieve details of a specific gym by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The gym ID
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
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


