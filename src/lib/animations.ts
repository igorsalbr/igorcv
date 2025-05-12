"use client"

import type { Variants } from "framer-motion"

// Fade up animation - subtle entrance for content blocks
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Card hover animation
export const cardHoverVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.03,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

// Slide in from side
export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Button hover animation
export const buttonHoverVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
}

// Rotate in animation
export const rotateInVariants: Variants = {
  hidden: { opacity: 0, rotate: -5 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Pulse animation for attention
export const pulseVariants: Variants = {
  initial: { scale: 1 },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
}

// Path drawing animation for SVGs
export const drawPathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: "easeInOut" },
      opacity: { duration: 0.3 },
    },
  },
}

// Scroll-triggered reveal animation
export const revealOnScrollVariants: Variants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

// Text character animation
export const characterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
}

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
}
