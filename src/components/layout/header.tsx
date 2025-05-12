"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { MenuIcon, X } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const [icon, setIcon] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const interval = setInterval(() => {
      setIcon((prev) => (prev + 1) % 7)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { href: "/#about", label: "About" },
    { href: "/#projects", label: "Projects" },
    { href: "/#game", label: "Ping Pong" },
    { href: "/#contact", label: "Contact" },
    { href: "/puzzles", label: "Puzzles" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* LEFT - LOGO */}
        <Link href="/" prefetch={false} className="flex items-center space-x-2">
          <motion.div
            className="icon-container flex items-center ml-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={`icon-${icon}`}
                className="w-14"
                src={["go.png", "ts.png", "react.png", "py.png", "next.svg", "retool.png", "bubble.png"][icon]}
                alt={["GO", "TypeScript", "React.js", "Python", "Next.js", "Retool", "Bubble"][icon]}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </motion.div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 animated-underline"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          {!isAuthenticated ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: menuItems.length * 0.1 }}
            >
              <Link href="/login">
                <Button variant="outline" size="sm" className="rounded-full">
                  Login
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: menuItems.length * 0.1 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={logout}
              >
                Logout
              </Button>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (menuItems.length + 1) * 0.1 }}
          >
            <ThemeToggle />
          </motion.div>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <div className="flex items-center md:hidden space-x-4">
          <ThemeToggle />
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="z-50 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </motion.button>
        </div>

        {/* FULLSCREEN OVERLAY MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed inset-0 bg-white dark:bg-gray-900 z-40 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col items-center justify-center space-y-8 text-2xl">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-gray-800 dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                {!isAuthenticated ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: menuItems.length * 0.1 }}
                  >
                    <Link
                      href="/login"
                      className="text-brand-primary hover:text-brand-primary/80 transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: menuItems.length * 0.1 }}
                  >
                    <button
                      onClick={() => {
                        logout()
                        setMenuOpen(false)
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
