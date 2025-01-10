import { Router } from 'express';
import { 
    listClasses, 
    createClass, 
    getClassById, 
    enrollMember, 
    getClassEnrollments 
} from './classesController';

const router = Router();

// Get a list of all classes
router.get('/', listClasses);

// Create a new class
router.post('/', createClass);

// Get details of a specific class by ID
router.get('/:id', getClassById);

// Enroll a member in a class
router.post('/:id/enroll', enrollMember);

// Get enrollments for a specific class
router.get('/:id/enrollments', getClassEnrollments);

export default router;