"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { TerminalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypingEffect } from "@/components/features/landing/typing-effect"
import { fadeUpVariants, buttonHoverVariants } from "@/lib/animations"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-200/20 via-transparent to-transparent dark:from-red-900/20" />
        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 bg-red-400/10 dark:bg-red-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-gray-400/10 dark:bg-gray-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-gray-500 blur-xl opacity-30 animate-pulse-soft" />
            <img
              src="/igor.png"
              alt="Igor's Profile Picture"
              className="relative w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover z-10"
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-400 dark:border-red-500 z-20"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6" variants={fadeUpVariants}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-gray-900 dark:from-red-500 dark:to-gray-300">
              Welcome to My Interactive CV!
            </span>
          </motion.h1>

          {/* Typing Effect */}
          <motion.div
            className="mb-8 flex items-center justify-center space-x-4"
            variants={fadeUpVariants}
            transition={{ delay: 0.2 }}
          >
            <TerminalIcon className="h-6 w-6 text-red-500" />
            <TypingEffect />
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={fadeUpVariants} transition={{ delay: 0.4 }}>
            <motion.div variants={buttonHoverVariants} initial="initial" whileHover="hover" whileTap="tap">
              <Button
                className="bg-black hover:bg-gray-700 dark:hover:bg-gray-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span>Check My Work</span>
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  →
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
