import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { upsertDoctorProfile, getDoctorProfile } from "../controllers/doctor.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Create or update doctor profile
 *     tags: [Doctors]
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
 *               phone:
 *                 type: string
 *               specialization:
 *                 type: string
 *               experience:
 *                 type: number
 *               qualification:
 *                 type: string
 *               bio:
 *                 type: string
 *               clinicName:
 *                 type: string
 *               address:
 *                 type: string
 *               fee:
 *                 type: number
 *               profilePic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Doctor profile created/updated
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("doctor"),
  upload.single("profilePic"),
  upsertDoctorProfile
);

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get doctor profile (Doctor only)
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Doctor profile data
 *       404:
 *         description: Doctor profile not found
 */
router.get("/", authMiddleware, roleMiddleware("doctor"), getDoctorProfile);

export default router;
