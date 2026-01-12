import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import {
  adminDashboard,
  getAllUsers,
  getDoctors,
  getPatients,
  approveDoctor,
  rejectDoctor,
  blockDoctor,
  unblockDoctor,
  blockPatient,
  unblockPatient,
} from "../controllers/admin.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management & moderation APIs
 */

router.use(authMiddleware);
router.use(roleMiddleware("admin"));

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – Admin only
 *       500:
 *         description: Server error
 */
router.get("/dashboard", adminDashboard);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users list retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – Admin only
 *       500:
 *         description: Server error
 */
router.get("/users", getAllUsers);

/**
 * @swagger
 * /api/admin/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Doctors list retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – Admin only
 *       500:
 *         description: Server error
 */
router.get("/doctors", getDoctors);

/**
 * @swagger
 * /api/admin/patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patients list retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – Admin only
 *       500:
 *         description: Server error
 */
router.get("/patients", getPatients);

/**
 * @swagger
 * /api/admin/doctors/{id}/approve:
 *   patch:
 *     summary: Approve a doctor
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor approved successfully
 *       404:
 *         description: Doctor not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – Admin only
 *       500:
 *         description: Server error
 */
router.patch("/doctors/:id/approve", approveDoctor);

/**
 * @swagger
 * /api/admin/doctors/{id}/reject:
 *   patch:
 *     summary: Reject a doctor
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor rejected successfully
 *       404:
 *         description: Doctor not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – Admin only
 *       500:
 *         description: Server error
 */
router.patch("/doctors/:id/reject", rejectDoctor);

/**
 * @swagger
 * /api/admin/doctors/{id}/block:
 *   patch:
 *     summary: Block a doctor
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor blocked successfully
 *       404:
 *         description: Doctor not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – Admin only
 *       500:
 *         description: Server error
 */
router.patch("/doctors/:id/block", blockDoctor);

/**
 * @swagger
 * /api/admin/doctors/{id}/unblock:
 *   patch:
 *     summary: Unblock a doctor
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: doctor ID
 *     responses:
 *       200:
 *         description: doctor unblocked successfully
 *       404:
 *         description: doctor not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – Admin only
 *       500:
 *         description: Server error
 */
router.patch("/doctors/:id/unblock", unblockDoctor);

/**
 * @swagger
 * /api/admin/patients/{id}/block:
 *   patch:
 *     summary: Block a patient
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient blocked successfully
 *       404:
 *         description: Patient not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – Admin only
 *       500:
 *         description: Server error
 */
router.patch("/patients/:id/block", blockPatient);

/**
 * @swagger
 * /api/admin/patients/{id}/unblock:
 *   patch:
 *     summary: Unblock a patient
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient unblocked successfully
 *       404:
 *         description: Patient not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – Admin only
 *       500:
 *         description: Server error
 */
router.patch("/patients/:id/unblock", unblockPatient);

export default router;