// routes/doctorRoutes.js

import express from 'express';
import { doctorSignup, doctorLogin, getDoctorProfile } from '../controllers/doctorAuthController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for doctor signup
router.post('/signup', doctorSignup);

// Route for doctor login
router.post('/login', doctorLogin);

// Example protected route (fetch doctor details)
router.get('/profile', authMiddleware, getDoctorProfile);

export default router;
