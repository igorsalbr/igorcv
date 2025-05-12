"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/features/landing/hero-section";
import { AboutSection } from "@/components/features/landing/about-section";
import { ProjectsSection } from "@/components/features/landing/projects-section";
import { GameSection } from "@/components/features/landing/game-section";
import { PuzzleSection } from "@/components/features/landing/puzzle-section";
import { TowerSection } from "@/components/features/landing/tower-section";
import { ContactSection } from "@/components/features/landing/contact-section";
import { pageTransition } from "@/lib/animations";

export function Landing() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-brand-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="font-sans flex flex-col min-h-screen bg-background text-foreground"
        >
          <Header />

          <main className="flex-1">
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <GameSection />
            <PuzzleSection />
            <TowerSection />
            <ContactSection />
          </main>

          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
