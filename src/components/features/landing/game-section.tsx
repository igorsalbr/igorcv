"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { PingPong } from "@/components/features/games/ping-pong"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { staggerContainer, fadeUpVariants } from "@/lib/animations"

export function GameSection() {
  const { isAuthenticated } = useAuth()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="game" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Ping <span className="text-red-500">Pong</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
          >
            Created on HTML canvas. Impossible to win, but you can try to :p
          </motion.p>

          {isAuthenticated ? (
            <motion.div variants={fadeUpVariants} className="w-full flex flex-col items-center">
              <div className="hidden md:flex w-full items-center mx-auto justify-center text-center bg-black rounded-xl overflow-hidden shadow-2xl">
                <PingPong />
              </div>
              <div className="flex md:hidden w-full items-center mx-auto justify-center text-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Play on desktop for best experience</p>
                  <img src="/ping-pong-preview.png" alt="Ping Pong Game Preview" className="rounded-lg shadow-md" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={fadeUpVariants}
              className="text-center bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md"
            >
              <p className="text-gray-600 dark:text-gray-300 mb-6">Must be logged in to play!</p>
              <Link href="/login">
                <Button className="bg-black hover:bg-gray-700 dark:hover:bg-gray-700 text-white">Login to Play</Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
