import { Router } from 'express';
import { listUsers, createUser, getUserById, updateUserById, deleteUserById, loginUser } from './usersController.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import { createUsersSchema, loginSchema } from '../../db/usersSchema.js';
import { verifyUserId } from '../../middlewares/authMiddleware.js';

const router = Router();
router.get('/', listUsers)

router.post('/register', validateData(createUsersSchema), async (req, res) => {
    createUser(req, res)
})

router.post('/login', validateData(loginSchema), async (req, res) => {
    loginUser(req, res)
})

router.get('/:id', getUserById)

router.put('/:id', verifyUserId, updateUserById)

router.delete('/:id', deleteUserById)

export default router;