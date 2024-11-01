"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Stethoscope } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/contexts/TranslationContext";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [userType, setUserType] = useState("patient");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dateOfBirth: "",
    contactNumber: "",
    hostelName: "",
    specialization: "",
  });
  const [authType, setAuthType] = useState("login");
  const { t, language, toggleLanguage } = useTranslation();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const baseUrl = "http://localhost:8080/api";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setProgress(0);
    console.log('Form submitted:', formData); // For debugging
    

    // Progress bar setup
    const progressInterval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(oldProgress + 10, 90);
      });
    }, 200);

    try {
      const endpoint =
        authType === "login"
          ? `${baseUrl}/${userType}s/login`
          : `${baseUrl}/${userType}s/signup`;
      const payload = { ...formData, userType };
      const response = await axios.post(endpoint, payload);
      console.log('Server response:', response.data); // For debugging

      setProgress(100);

      if (response.data) {
        localStorage.setItem("userType", userType);
        localStorage.setItem("authToken", response.data.token);

        const dashboardRoute =
          userType === "patient" ? "/patientdashboard" : "/doctordashboard";
        console.log("Navigating to:", dashboardRoute); // For debugging
        router.push(dashboardRoute);
      } else {
        setError(response.data.message || "Authentication failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        err.response?.data?.message || "An error occurred during authentication"
      );
    } finally {
      clearInterval(progressInterval);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/image.png"
          alt="Hospital"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-r from-blue-100 to-blue-200">
        <div className="absolute top-4 right-4">
          <Button variant="outline" onClick={toggleLanguage}>
            {language === "en" ? "हिंदी" : "English"}
          </Button>
        </div>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={language}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {t("welcome")}
                </motion.span>
              </AnimatePresence>
            </CardTitle>
            <CardDescription className="text-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={language}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {t("loginSignup")}
                </motion.span>
              </AnimatePresence>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-4 mb-6">
              <Button
                variant={userType === "patient" ? "default" : "outline"}
                onClick={() => setUserType("patient")}
              >
                <User className="mr-2 h-4 w-4" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {t("patient")}
                  </motion.span>
                </AnimatePresence>
              </Button>
              <Button
                variant={userType === "doctor" ? "default" : "outline"}
                onClick={() => setUserType("doctor")}
              >
                <Stethoscope className="mr-2 h-4 w-4" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {t("doctor")}
                  </motion.span>
                </AnimatePresence>
              </Button>
            </div>
            <Tabs
              defaultValue="login"
              className="w-full"
              onValueChange={setAuthType}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{t("login")}</TabsTrigger>
                <TabsTrigger value="signup">{t("signup")}</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input
                        id="email"
                        placeholder={t("enterEmail")}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">{t("password")}</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder={t("enterPassword")}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">{t("name")}</Label>
                      <Input
                        id="name"
                        placeholder={t("enterName")}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input
                        id="email"
                        placeholder={t("enterEmail")}
                        onChange={handleChange}
                      />
                    </div>
                    {userType === "patient" && (
                      <>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="dateOfBirth">
                            {t("dateOfBirth")}
                          </Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="contactNumber">
                            {t("contactNumber")}
                          </Label>
                          <Input
                            id="contactNumber"
                            placeholder={t("enterContact")}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="hostelName">{t("hostelName")}</Label>
                          <Input
                            id="hostelName"
                            placeholder={t("enterHostel")}
                            onChange={handleChange}
                          />
                        </div>
                      </>
                    )}
                    {userType === "doctor" && (
                      <>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="specialization">
                            {t("specialization")}
                          </Label>
                          <Input
                            id="specialization"
                            placeholder={t("enterSpecialization")}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="contactNumber">
                            {t("contactNumber")}
                          </Label>
                          <Input
                            id="contactNumber"
                            placeholder={t("enterContact")}
                            onChange={handleChange}
                          />
                        </div>
                      </>
                    )}
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">{t("password")}</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder={t("enterPassword")}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {isLoading && (
            <div className="mb-4">
              <Progress value={progress} className="w-full" />
            </div>
          )}
          <CardFooter className="flex justify-center">
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? t("submitting") : t("submit")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
