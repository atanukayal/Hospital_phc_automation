import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-sans">
      <main className="flex flex-col gap-6 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <Alert className="max-w-md text-center sm:text-left" variant="info">
          Welcome to your new Next.js project! Get started by editing{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
            src/app/page.js
          </code>{" "}
          and see your changes instantly.
        </Alert>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button
            as="a"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy Now
          </Button>
          <Button
            as="a"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
          >
            Read Documentation
          </Button>
        </div>
      </main>

      <footer className="flex gap-4 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 text-sm hover:underline"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 text-sm hover:underline"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 text-sm hover:underline"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
