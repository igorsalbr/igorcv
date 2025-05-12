"use client"

import { motion } from "framer-motion"
import { PuzzleCard } from "@/components/features/puzzles/puzzle-card"
import { staggerContainer } from "@/lib/animations"

interface PuzzleGridProps {
  challenges: {
    id: number
    title: string
    description: string
    completed: boolean
  }[]
  onStartChallenge: (id: number) => void
}

export function PuzzleGrid({ challenges, onStartChallenge }: PuzzleGridProps) {
  return (
    <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.map((challenge, index) => (
        <PuzzleCard
          key={challenge.id}
          challenge={challenge}
          onStartChallenge={() => onStartChallenge(challenge.id)}
          index={index}
        />
      ))}
    </motion.div>
  )
}
