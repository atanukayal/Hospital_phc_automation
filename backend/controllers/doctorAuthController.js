// controllers/doctorAuthController.js

import { db } from '../config/firebase.js';
import admin from 'firebase-admin';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';  // Import jsonwebtoken
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // Set your secret

export const doctorSignup = async (req, res) => {
  const { email, password, name, specialization, contactNumber } = req.body;

  try {
    // Create the Firebase Authentication user
    const user = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Clone doctorModel and populate with request data
    const newDoctor = {
      ...doctorModel,  // Start with the structure of doctorModel
      email,
      name,
      specialization,
      contactNumber,
      registeredAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Add the doctor to Firestore in the "doctors" collection
    await db.collection('doctors').doc(user.uid).set(newDoctor);

    res.status(201).send({ message: 'Doctor added successfully', uid: user.uid });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Login function to authenticate the doctor using JWT
export const doctorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Get the user by email
    const user = await admin.auth().getUserByEmail(email);
    
    // You should validate the password here if you're using hashed passwords in Firestore.

    const token = jwt.sign({ uid: user.uid, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Example protected route (fetch doctor details)
export const getDoctorProfile = async (req, res) => {
  try {
    const doctorDoc = await db.collection('doctors').doc(req.user.uid).get();

    if (!doctorDoc.exists) {
      return res.status(404).send({ error: 'Doctor not found' });
    }

    res.status(200).send({ doctor: doctorDoc.data() });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
