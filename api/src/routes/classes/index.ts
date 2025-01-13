import { Router } from 'express';
import { 
    listClasses, 
    createClass, 
    getClassById, 
    updateClass,
    deleteClass,
} from './classesController';
import { classesTable } from '../../db/classesSchema';
import { validateData } from '../../middlewares/validationMiddleware';
import { z } from 'zod'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

// import {
//     enrollMember,
//     getClassEnrollments
// } from '../bookings/enrolmentsController'

// const createClassSchema = z.object ({
//     name: z.string(),
//     description: z.string().optional(),
//     capacity: z.number().optional(),
//     trainer_id: z.number(),
//     duration_minutes: z.number(),
//     schedule: z.object({
//         day: z.string(),
//         start_time: z.string(),
//         end_time: z.string()
//     })
// })

const createClassSchema = createInsertSchema(classesTable);
const updateClassSchema = createInsertSchema(classesTable).partial();

const router = Router();

// Get a list of all classes
router.get('/', listClasses);

// Create a new class
router.post('/', validateData(createClassSchema), createClass);

// Get details of a specific class by ID
router.get('/:id', getClassById);

router.put('/:id', validateData(updateClassSchema), updateClass);

router.delete('/:id', deleteClass);

// // Enroll a member in a class
// router.post('/:id/enroll', enrollMember);

// // Get enrollments for a specific class
// router.get('/:id/enrollments', getClassEnrollments);

export default router;