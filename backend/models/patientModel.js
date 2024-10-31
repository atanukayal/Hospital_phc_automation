const patientModel = {
  name: '',                    // string, e.g., "John Doe"
  email: '',                   // string, unique for each user
  dateOfBirth: '',             // date (ISO string format), e.g., "1990-01-01"
  contactNumber: '',           // string, e.g., "+123456789"
  hostelName: '',              // string, e.g., "Blue Hostel"
  medicalHistory: [],          // array of objects (optional), e.g., [{ condition: "Diabetes", diagnosisDate: "2021-03-01" }]
  registeredAt: '',            // timestamp, generated automatically when the patient is created
};

export default patientModel;
