"use client";

import { useTranslation } from "@/contexts/TranslationContext";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PatientDashboard() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="relative min-h-screen">
      <Image
        src="/patient-dashboard-bg.jpg"
        alt="Patient Dashboard Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold mb-4">{t("patientDashboardTitle")}</h1>
        <p className="text-xl mb-8">{t("patientDashboardWelcome")}</p>
        <Button onClick={handleLogout}>{t("logout")}</Button>
      </div>
    </div>
  );
}