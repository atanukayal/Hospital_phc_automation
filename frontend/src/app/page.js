'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslation } from "@/contexts/TranslationContext"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const { t, language, toggleLanguage } = useTranslation()

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/welcome_background.png"
          alt="Hospital Background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-20"
        />
      </div>
      <div className="absolute top-4 right-4 z-20">
        <Button variant="outline" onClick={toggleLanguage}>
          {language === 'en' ? 'हिंदी' : 'English'}
        </Button>
      </div>
      <div className="z-10 text-center space-y-8 max-w-3xl">
        <div className="mx-auto w-32 h-32 relative">
          <Image
            src="/logoIITJ.png"
            alt="PHC IIT Jodhpur Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.h1
            key={language + 'welcome'}
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {t('welcome')}
          </motion.h1>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={language + 'description'}
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {t('description')}
          </motion.p>
        </AnimatePresence>
        <Button asChild size="lg" className="mt-8">
          <Link href="/auth">
            <AnimatePresence mode="wait">
              <motion.span
                key={language + 'getStarted'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {t('getStarted')}
              </motion.span>
            </AnimatePresence>
          </Link>
        </Button>
      </div>
    </div>
  )
}