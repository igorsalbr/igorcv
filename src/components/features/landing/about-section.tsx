"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  staggerContainer,
  fadeUpVariants,
  slideInLeftVariants,
  slideInRightVariants
} from "@/lib/animations";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
        <motion.div
          className="absolute top-20 -left-32 w-64 h-64 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={fadeUpVariants}
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
          >
            About <span className="text-brand-primary">Me</span>
          </motion.h2>

          <div className="grid md:grid-cols-5 gap-8 items-center">
            <motion.div
              variants={slideInLeftVariants}
              className="md:col-span-2 flex justify-center md:justify-end"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-gradient-shift" />
                <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
                  <img
                    src="/igor.png"
                    alt="Igor's Portrait"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={slideInRightVariants}
              className="md:col-span-3"
            >
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                Hello! I'm{" "}
                <span className="font-semibold text-brand-primary">Igor</span>,
                a Full Stack Developer with a Mechatronics background. I craft
                scalable, user-centric solutions with Go, Python, React, and
                Next.js.
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                I am passionate about tech problem-solving. With a strong
                engineering mindset, I integrate elegant UI, solid backend,
                frontend, and product management practices to deliver robust
                applications.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href="https://app.mindsight.com.br/en/devolutiva/1eb572e9-ba37-421d-a01e-aa772bb1a9ec/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-primary hover:text-brand-primary/80 font-medium animated-underline"
                >
                  View Personality Test →
                </a>
                <Button
                  className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/igor-schroter-salviatto-929628171/",
                      "_blank"
                    )
                  }
                >
                  Resume
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
