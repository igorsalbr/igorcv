"use client"

import { motion } from "framer-motion"
import { Lock, Unlock, ArrowRight } from "lucide-react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fadeUpVariants, cardHoverVariants } from "@/lib/animations"

interface PuzzleCardProps {
  challenge: {
    id: number
    title: string
    description: string
    completed: boolean
  }
  onStartChallenge: () => void
  index: number
}

export function PuzzleCard({ challenge, onStartChallenge, index }: PuzzleCardProps) {
  return (
    <motion.div variants={fadeUpVariants} transition={{ delay: index * 0.1 }}>
      <motion.div variants={cardHoverVariants} initial="initial" whileHover="hover" className="h-full">
        <Card
          className={`h-full overflow-hidden border-2 ${
            !challenge.completed ? "border-red-500" : "border-green-500"
          } bg-white dark:bg-gray-800 shadow-md`}
        >
          <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-row items-center justify-between">
            <h3 className="text-xl font-semibold">{challenge.title}</h3>
            {challenge.completed ? (
              <Badge variant="success" className="ml-auto">
                <Unlock className="h-3.5 w-3.5 mr-1" />
                Completed
              </Badge>
            ) : (
              <Badge variant="outline" className="ml-auto">
                <Lock className="h-3.5 w-3.5 mr-1" />
                Locked
              </Badge>
            )}
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <p className="text-gray-600 dark:text-gray-300">{challenge.description}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button
              onClick={onStartChallenge}
              className={`w-full ${
                challenge.completed
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-black hover:bg-gray-700 dark:hover:bg-gray-700"
              } text-white`}
            >
              {challenge.completed ? "View Challenge" : "Start Challenge"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}
