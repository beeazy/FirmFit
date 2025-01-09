import { Router } from 'express';
import { listUsers, createUser, getUserById, updateUserById, deleteUserById } from './usersController';

const router = Router();
router.get('/', listUsers)

router.post('/', createUser)

router.get('/:id', getUserById)

router.put('/:id', updateUserById)

router.delete('/:id', deleteUserById)

export default router;