"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { staggerContainer, fadeUpVariants, buttonHoverVariants } from "@/lib/animations"

export function PuzzleSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white dark:bg-gray-800" />
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-red-400/10 dark:bg-red-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Interactive <span className="text-red-500">Puzzles</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
          >
            Test your problem-solving skills with a series of coding and logic puzzles. Can you solve them all?
          </motion.p>

          <motion.div variants={fadeUpVariants} className="relative">
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-gray-600 p-[1px]">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                      key={i}
                      className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">?</span>
                    </motion.div>
                  ))}
                </div>
                <motion.div variants={buttonHoverVariants} initial="initial" whileHover="hover" whileTap="tap">
                  <Link href="/puzzles">
                    <Button className="w-full bg-black hover:bg-gray-700 dark:hover:bg-gray-700 text-white">
                      Go to puzzles
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-6 -left-6 w-12 h-12 bg-red-500/20 rounded-full blur-md"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -bottom-6 -right-6 w-12 h-12 bg-gray-500/20 rounded-full blur-md"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
