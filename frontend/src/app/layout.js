import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import { TranslationProvider } from "@/contexts/TranslationContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "PHC IIT Jodhpur - Hospital Management System",
  description: "Efficient healthcare management for PHC IIT Jodhpur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  );
}
