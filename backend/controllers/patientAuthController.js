import { db } from '../config/firebase.js';
import admin from 'firebase-admin';
import patientModel from '../models/patientModel.js';
import jwt from 'jsonwebtoken';  // Import jsonwebtoken
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // Set your secret

export const patientSignup = async (req, res) => {
  const { email, password, name, dateOfBirth, contactNumber, hostelName } = req.body;

  try {
    // Create the Firebase Authentication user
    const user = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Clone patientModel and populate with request data
    const newPatient = {
      ...patientModel,  // Start with the structure of patientModel
      email,
      name,
      dateOfBirth,
      contactNumber,
      hostelName,
      registeredAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Add the patient to Firestore in the "patients" collection
    await db.collection('patients').doc(user.uid).set(newPatient);

    res.status(201).send({ message: 'Patient added successfully', uid: user.uid });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Login function to authenticate the patient using JWT
export const patientLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Get the user by email
    const user = await admin.auth().getUserByEmail(email);
    
    const token = jwt.sign({ uid: user.uid, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
