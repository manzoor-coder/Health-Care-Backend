import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

import authRoutes from './routes/auth.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';

import doctorRoutes from './routes/doctor.routes.js'
import patientRoutes from './routes/patient.routes.js'

const app = express();

app.use(cors());
app.use(express.json());

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);

export default app;
