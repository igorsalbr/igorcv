"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h3 className="text-xl font-bold mb-4">Igor Salviatto</h3>
              <p className="text-gray-400 mb-4 max-w-md">
                Full Stack Developer specializing in creating scalable, user-centric solutions with Go, JavaScript,
                React, and Next.js.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://linkedin.com/in/igor-schroter-salviatto-929628171/"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </Link>
                <Link
                  href="https://github.com/igorsalbr"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </Link>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#projects" className="text-gray-400 hover:text-white transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="#game" className="text-gray-400 hover:text-white transition-colors">
                    Games
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">More</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/puzzles" className="text-gray-400 hover:text-white transition-colors">
                    Puzzles
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.p
            className="text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            © {currentYear} Igor Salviatto. All rights reserved.
          </motion.p>

          <motion.div
            className="flex space-x-6 mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
