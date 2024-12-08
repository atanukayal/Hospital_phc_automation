"use client"; // add 

import { useState } from "react";
import { useTranslation } from "@/contexts/TranslationContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Search,
  UserPlus,
  Calendar as CalendarIcon,
  ClipboardList,
  Settings,
} from "lucide-react";
import { FileText } from "lucide-react";

export default function DoctorDashboard() {
  const { t } = useTranslation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    router.push("/");
  };

  // Add to both dashboards
  const fetchMedicalHistory = async (patientId) => {
    try {
      const response = await axios.get(
        `${baseUrl}/medical-history/${patientId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching medical history:", error);
      return [];
    }
  };

  // Add to doctor dashboard
  const saveMedicalRecord = async (patientId, recordData) => {
    try {
      const response = await axios.post(
        `${baseUrl}/medical-history/${patientId}`,
        recordData
      );
      return response.data;
    } catch (error) {
      console.error("Error saving medical record:", error);
      throw error;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Simulating patient search
    if (searchQuery.toLowerCase() === "patient@example.com") {
      setSelectedPatient({
        name: "John Doe",
        email: "patient@example.com",
        age: 35,
        lastVisit: "2024-09-15",
      });
    } else {
      setSelectedPatient(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Image
        src="/doctor-dashboard-bg.jpg"
        alt="Doctor Dashboard Background"
        layout="fill"
        objectFit="cover"
        className="opacity-10"
      />
      <div className="relative z-10 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">{t("DoctorDashboardTitle")}</h1>
          <Button onClick={handleLogout}>{t("logout")}</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>{t("searchPatient")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex space-x-2">
                <Input
                  type="email"
                  placeholder={t("enterPatientEmail")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit">
                  <Search className="mr-2 h-4 w-4" /> {t("search")}
                </Button>
              </form>
              {selectedPatient && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mt-4">
                      {t("viewPatientDetails")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{t("patientDetails")}</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="info">
                      <TabsList>
                        <TabsTrigger value="info">{t("basicInfo")}</TabsTrigger>
                        <TabsTrigger value="history">
                          {t("medicalHistory")}
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="info">
                        <div className="space-y-2">
                          <p>
                            <strong>{t("name")}:</strong> {selectedPatient.name}
                          </p>
                          <p>
                            <strong>{t("email")}:</strong>{" "}
                            {selectedPatient.email}
                          </p>
                          <p>
                            <strong>{t("age")}:</strong> {selectedPatient.age}
                          </p>
                          <p>
                            <strong>{t("lastVisit")}:</strong>{" "}
                            {selectedPatient.lastVisit}
                          </p>
                        </div>
                      </TabsContent>
                      <TabsContent value="history">
                        <p>{t("medicalHistoryPlaceholder")}</p>
                      </TabsContent>
                    </Tabs>
                    // In the DialogContent of patient details
                    <Button
                      onClick={() => {
                        /* Show medical history sidebar */
                      }}
                      variant="outline"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View/Edit Medical History
                    </Button>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("quickActions")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" /> {t("AddNewPatient")}
              </Button>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />{" "}
                {t("ScheduleAppointment")}
              </Button>
              <Button variant="outline">
                <ClipboardList className="mr-2 h-4 w-4" /> {t("MedicalRecords")}
              </Button>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" /> {t("settings")}
              </Button>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t("upcomingAppointments")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
