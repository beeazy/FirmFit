import { Router } from 'express';
import { listUsers, createUser, getUserById, updateUserById, deleteUserById, loginUser } from './usersController.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import { createUsersSchema, loginSchema } from '../../db/usersSchema.js';
import { verifyAdmin, verifySuperAdmin, verifyToken, verifyUserId } from '../../middlewares/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Get all users
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/', verifySuperAdmin, listUsers);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a user
 *     description: Register a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', validateData(createUsersSchema), async (req, res) => {
    createUser(req, res);
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', validateData(loginSchema), async (req, res) => {
    loginUser(req, res);
});

/**
 * @swagger
 * /auth/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', verifyToken, getUserById);

/**
 * @swagger
 * /auth/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', verifyUserId, updateUserById);

/**
 * @swagger
 * /auth/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', verifyAdmin, verifyToken, deleteUserById);

export default router;