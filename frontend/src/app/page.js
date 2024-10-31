import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/welcome_background.png"
          alt="Hospital Background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>
      <div className="z-10 text-center space-y-8 max-w-3xl">
        <div className="mx-auto w-32 h-32 relative">
          <Image
            src="/logoIITJ.png"
            alt="PHC IIT Jodhpur Logo"
            layout="fill"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Welcome to PHC IIT Jodhpur
        </h1>
        <p className="text-xl text-muted-foreground">
          Your trusted partner in healthcare management
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/auth">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}