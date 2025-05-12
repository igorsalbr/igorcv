"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-5 h-5"
      >
        {theme === "light" ? (
          <motion.div initial={{ rotate: -45 }} animate={{ rotate: 0 }} transition={{ duration: 0.3, type: "spring" }}>
            <Moon className="absolute inset-0 text-gray-700 hover:text-brand-primary transition-colors" />
          </motion.div>
        ) : (
          <motion.div initial={{ rotate: 45 }} animate={{ rotate: 0 }} transition={{ duration: 0.3, type: "spring" }}>
            <Sun className="absolute inset-0 text-gray-200 hover:text-brand-primary transition-colors" />
          </motion.div>
        )}
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
