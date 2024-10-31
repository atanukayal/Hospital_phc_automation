// routes/patientRoutes.js

import express from 'express';
import { patientSignup, patientLogin } from '../controllers/patientAuthController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { db } from '../config/firebase.js';

const router = express.Router();

// Route for patient signup
router.post('/signup', patientSignup);

// Route for patient login
router.post('/login', patientLogin);

// Example protected route (fetch patient details)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const patientDoc = await db.collection('patients').doc(req.user.uid).get();

    if (!patientDoc.exists) {
      return res.status(404).send({ error: 'Patient not found' });
    }

    res.status(200).send({ patient: patientDoc.data() });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;