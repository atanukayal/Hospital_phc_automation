"use client";

import { useTranslation } from "@/contexts/TranslationContext";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { CalendarDays, Clock, Activity, FileText, Phone, LogOut } from "lucide-react";

export default function PatientDashboard() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    router.push("/");
  };

  // Add to both dashboards
const fetchMedicalHistory = async (patientId) => {
  try {
    const response = await axios.get(`${baseUrl}/medical-history/${patientId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching medical history:', error);
    return [];
  }
};

  const appointments = [
    { doctor: "Dr. Sarah Wilson", specialty: "Cardiologist", time: "10:00 AM", date: "2024-11-05" },
    { doctor: "Dr. Michael Chen", specialty: "Dentist", time: "2:30 PM", date: "2024-11-07" },
    { doctor: "Dr. Emily Brown", specialty: "General Physician", time: "11:15 AM", date: "2024-11-10" },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Image
        src="/patient-dashboard-bg.jpg"
        alt="Patient Dashboard Background"
        layout="fill"
        objectFit="cover"
        className="opacity-5"
      />
      <div className="relative z-10 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{t("Patient Dashboard Title")}</h1>
            <p className="text-muted-foreground">{t("Patient Dashboard Welcome")}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            {t("logout")}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t("profile")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Blood Group:</span>
                  <span>O+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Height:</span>
                  <span>175 cm</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Weight:</span>
                  <span>68 kg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Metrics Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t("healthMetrics")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">General Health</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Activity Level</span>
                  <span className="text-sm font-medium">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t("quickActions")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <CalendarDays className="mr-2 h-4 w-4" />
                {t("bookAppointment")}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                {t("viewMedicalHistory")}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Activity className="mr-2 h-4 w-4" />
                {t("trackHealth")}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                {t("emergencyContact")}
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Appointments Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("upcomingAppointments")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="space-y-1">
                      <p className="font-medium">{appointment.doctor}</p>
                      <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center text-sm">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4" />
                        {appointment.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendar Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t("calendar")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
  <CardHeader>
    <CardTitle>{t("medicalHistory")}</CardTitle>
  </CardHeader>
  <CardContent>
    <MedicalHistoryView records={patientMedicalRecords} />
  </CardContent>
</Card>
        </div>
      </div>
    </div>
  );
}