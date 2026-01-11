import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  upsertPatientProfile,
  getPatientProfile,
} from "../controllers/patient.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient profile management
 */

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create or update patient profile
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ali Khan
 *               age:
 *                 type: number
 *                 example: 25
 *               gender:
 *                 type: string
 *                 example: male
 *               phone:
 *                 type: string
 *                 example: "03001234567"
 *               medicalNotes:
 *                 type: string
 *                 example: Diabetic patient
 *               profilePic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Patient profile created successfully
 *       200:
 *         description: Patient profile updated successfully
 *       400:
 *         description: Invalid input or image format
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – Patient access only
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("patient"),
  upload.single("profilePic"),
  upsertPatientProfile
);

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get logged-in patient profile
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patient profile retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – Patient access only
 *       404:
 *         description: Patient profile not found
 *       500:
 *         description: Server error
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("patient"),
  getPatientProfile
);

export default router;
