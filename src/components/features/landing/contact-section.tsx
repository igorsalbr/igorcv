"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { LinkedinIcon, GithubIcon, InstagramIcon } from "lucide-react";
import { ContactForm } from "@/components/features/contact/contact-form";
import {
  staggerContainer,
  fadeUpVariants,
  slideInLeftVariants
} from "@/lib/animations";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white dark:bg-gray-800" />
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
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
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
          >
            Get In <span className="text-brand-primary">Touch</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-gray-600 dark:text-gray-300 text-lg mb-8 text-center max-w-2xl mx-auto"
          >
            Let's talk about your next big idea or collaboration opportunity!
          </motion.p>

          <motion.div
            variants={slideInLeftVariants}
            className="flex justify-center space-x-6 mb-8"
          >
            <Link
              href="https://linkedin.com/in/igor-schroter-salviatto-929628171/"
              target="_blank"
              className="text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200"
            >
              <LinkedinIcon className="h-6 w-6" />
            </Link>
            <Link
              href="https://github.com/igorsalbr"
              target="_blank"
              className="text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200"
            >
              <GithubIcon className="h-6 w-6" />
            </Link>
            <Link
              href="https://instagram.com/igorschsal"
              target="_blank"
              className="text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200"
            >
              <InstagramIcon className="h-6 w-6" />
            </Link>
          </motion.div>

          <motion.div variants={fadeUpVariants} transition={{ delay: 0.2 }}>
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
