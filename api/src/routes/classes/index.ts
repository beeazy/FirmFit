import { Router } from "express";
import {
  listClasses,
  createClass,
  getClassById,
  updateClass,
  deleteClass,
} from "./classesController.js";
import { classesTable } from "../../db/classesSchema.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { createInsertSchema } from "drizzle-zod";
import {
  verifyAdmin,
  verifyTeacher,
  verifyToken,
} from "../../middlewares/authMiddleware.js";

const createClassSchema = createInsertSchema(classesTable);
const updateClassSchema = createInsertSchema(classesTable).partial();

const router = Router();

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get all classes
 *     description: Retrieve a list of all classes
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get("/", listClasses);

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Create a new class
 *     description: Create a new class
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  verifyTeacher,
  validateData(createClassSchema),
  createClass
);

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Get details of a specific class by ID
 *     description: Get details of a specific class by ID
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
router.get("/:id", getClassById);

/**
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Update a class by ID
 *     description: Update a class by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", verifyTeacher, validateData(updateClassSchema), updateClass);

/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Delete a class by ID
 *     description: Delete a class by ID
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
router.delete("/:id", verifyTeacher, deleteClass);

export default router;