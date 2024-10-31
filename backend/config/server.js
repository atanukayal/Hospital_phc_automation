// server.js
import express from 'express';
import cors from 'cors';
import patientRoutes from '../routes/patientRoutes.js';
import dotenv from 'dotenv';
import doctorRoutes from '../routes/doctorRoutes.js'; // Import the doctor routes

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON request bodies

app.get('/', (req, res) => {
  res.send('Welcome to the Hospital Management System API');
});

app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes); // Add the doctor routes

export default app; // Export the configured app without starting it
