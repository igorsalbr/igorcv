"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TowerVisualizer } from "@/components/features/games/tower-visualizer"
import { useAuth } from "@/hooks/use-auth"
import { getTowerHeight, incrementTower, decrementTower } from "@/lib/api/tower"
import { staggerContainer, fadeUpVariants } from "@/lib/animations"

export function TowerSection() {
  const { isAuthenticated } = useAuth()
  const [towerHeight, setTowerHeight] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Fetch current tower height
  const fetchTowerHeight = async () => {
    try {
      setIsLoading(true)
      const height = await getTowerHeight()
      setTowerHeight(height)
      setIsLoading(false)
    } catch (err) {
      console.error("Error fetching tower height:", err)
      setIsLoading(false)
    }
  }

  // Increment tower height
  const handleTowerIncrement = async () => {
    if (isLoading) return

    try {
      setIsLoading(true)
      await incrementTower()
      fetchTowerHeight()
    } catch (err) {
      console.error("Error incrementing tower:", err)
      setIsLoading(false)
    }
  }

  // Decrement tower height
  const handleTowerDecrement = async () => {
    if (isLoading) return

    try {
      setIsLoading(true)
      await decrementTower()
      fetchTowerHeight()
    } catch (err) {
      console.error("Error decrementing tower:", err)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTowerHeight()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 bg-red-400/10 dark:bg-red-500/10 rounded-full blur-3xl"
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
            Community <span className="text-red-500">Tower</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
          >
            This interactive section lets everyone add or remove blocks from a global tower. Each block influences the
            final height in real-time. Add or remove blocks if you are logged in. If the tower reaches limit, it will
            explode!
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="max-w-sm mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl"
          >
            <div className="flex justify-center mb-8">
              <TowerVisualizer towerHeight={towerHeight} onResetTower={() => setTowerHeight(0)} />
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={handleTowerIncrement}
                className="bg-black hover:bg-gray-700 dark:hover:bg-gray-700 text-white h-10"
                disabled={!isAuthenticated || isLoading}
              >
                {isLoading ? "Loading..." : "Add Block"}
              </Button>
              <Button
                onClick={handleTowerDecrement}
                className="bg-red-500 hover:bg-red-600 text-white h-10"
                disabled={!isAuthenticated || isLoading}
              >
                {isLoading ? "Loading..." : "Remove Block"}
              </Button>
            </div>

            {!isAuthenticated && (
              <motion.p
                className="text-sm text-gray-500 dark:text-gray-400 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Please{" "}
                <Link href="/login" className="text-red-500 hover:underline">
                  log in
                </Link>{" "}
                to interact with the tower.
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
