"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function TypingEffect() {
  const [text, setText] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing")

  const texts = [
    "This is my Interactive CV",
    "Full Stack Developer",
    "AI Enthusiast",
    "Problem Solver",
    "Engage with the challenging puzzles!",
    "Explore my skills and experience",
    "Leave me a feedback or a message :)",
    "Enjoy the journey and have fun!",
  ]

  // Use refs for timing values to avoid unnecessary re-renders
  const typingSpeed = useRef(35) // ms per character
  const deletingSpeed = useRef(15) // ms per character
  const pauseBeforeDeleting = useRef(1500) // ms to wait before deleting
  const pauseBeforeTyping = useRef(500) // ms to wait before typing next text

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const currentText = texts[currentTextIndex]

    switch (phase) {
      case "typing":
        if (text.length < currentText.length) {
          timeoutId = setTimeout(() => {
            setText(currentText.substring(0, text.length + 1))
          }, typingSpeed.current)
        } else {
          setPhase("pausing")
        }
        break

      case "pausing":
        timeoutId = setTimeout(() => {
          setPhase("deleting")
        }, pauseBeforeDeleting.current)
        break

      case "deleting":
        if (text.length > 0) {
          timeoutId = setTimeout(() => {
            setText(text.substring(0, text.length - 1))
          }, deletingSpeed.current)
        } else {
          setPhase("waiting")
          setCurrentTextIndex((currentTextIndex + 1) % texts.length)
        }
        break

      case "waiting":
        timeoutId = setTimeout(() => {
          setPhase("typing")
        }, pauseBeforeTyping.current)
        break
    }

    return () => clearTimeout(timeoutId)
  }, [text, phase, currentTextIndex, texts])

  return (
    <div className="typing-text text-lg text-center justify-center lg:text-2xl font-medium text-gray-600 dark:text-gray-300 h-8 min-h-[2rem]">
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.9 }}
          transition={{ duration: 0.1 }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
      <motion.span
        className="cursor inline-block w-0.5 h-5 bg-gray-600 dark:bg-gray-300 ml-0.5"
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 0.7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "steps(1)",
        }}
      />
    </div>
  )
}
