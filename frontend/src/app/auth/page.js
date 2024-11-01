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

export default function AuthPage() {
  const [userType, setUserType] = useState("patient");

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/image.png"
          alt="Hospital"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-r from-blue-100 to-blue-200">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              PHC IIT Jodhpur
            </CardTitle>
            <CardDescription className="text-center">
              Login or Sign up to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-4 mb-6">
              <Button
                variant={userType === "patient" ? "default" : "outline"}
                onClick={() => setUserType("patient")}
              >
                <User className="mr-2 h-4 w-4" />
                Patient
              </Button>
              <Button
                variant={userType === "doctor" ? "default" : "outline"}
                onClick={() => setUserType("doctor")}
              >
                <Stethoscope className="mr-2 h-4 w-4" />
                Doctor
              </Button>
            </div>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Enter your email" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Enter your email" />
                    </div>
                    {userType === "patient" && (
                      <>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input id="dateOfBirth" type="date" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="contactNumber">Contact Number</Label>
                          <Input
                            id="contactNumber"
                            placeholder="Enter your contact number"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="hostelName">Hostel Name</Label>
                          <Input
                            id="hostelName"
                            placeholder="Enter your hostel name"
                          />
                        </div>
                      </>
                    )}
                    {userType === "doctor" && (
                      <>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="specialization">Specialization</Label>
                          <Input
                            id="specialization"
                            placeholder="Enter your specialization"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="contactNumber">Contact Number</Label>
                          <Input
                            id="contactNumber"
                            placeholder="Enter your contact number"
                          />
                        </div>
                      </>
                    )}
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Choose a password"
                      />
                    </div>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="w-full">Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
