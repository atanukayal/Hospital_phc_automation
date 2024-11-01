"use client";

import { createContext, useContext, useState } from "react";

const translations = {
  en: {
    welcome: "Welcome to PHC IIT Jodhpur",
    description: "Your trusted partner in healthcare management",
    getStarted: "Get Started",
    loginSignup: "Login or Sign up to continue",
    patient: "Patient",
    doctor: "Doctor",
    login: "Login",
    signup: "Sign Up",
    email: "Email",
    password: "Password",
    name: "Name",
    dateOfBirth: "Date of Birth",
    contactNumber: "Contact Number",
    hostelName: "Hostel Name",
    specialization: "Specialization",
    submit: "Submit",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    enterName: "Enter your name",
    enterContact: "Enter your contact number",
    enterHostel: "Enter your hostel name",
    enterSpecialization: "Enter your specialization",
    choosePassword: "Choose a password",
    submitting: "Submitting...",
  },
  hi: {
    welcome: "पीएचसी आईआईटी जोधपुर में आपका स्वागत है",
    description: "स्वास्थ्य प्रबंधन में आपका विश्वसनीय साथी",
    getStarted: "शुरू करें",
    loginSignup: "जारी रखने के लिए लॉगिन या साइन अप करें",
    patient: "मरीज़",
    doctor: "डॉक्टर",
    login: "लॉगिन",
    signup: "साइन अप",
    email: "ईमेल",
    password: "पासवर्ड",
    name: "नाम",
    dateOfBirth: "जन्म तिथि",
    contactNumber: "संपर्क नंबर",
    hostelName: "छात्रावास का नाम",
    specialization: "विशेषज्ञता",
    submit: "जमा करें",
    enterEmail: "अपना ईमेल दर्ज करें",
    enterPassword: "अपना पासवर्ड दर्ज करें",
    enterName: "अपना नाम दर्ज करें",
    enterContact: "अपना संपर्क नंबर दर्ज करें",
    enterHostel: "अपने छात्रावास का नाम दर्ज करें",
    enterSpecialization: "अपनी विशेषज्ञता दर्ज करें",
    choosePassword: "पासवर्ड चुनें",
    submitting: "जमा कर रहा है...",
  },
};

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const t = (key) => translations[language][key] || key;

  return (
    <TranslationContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
