"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { staggerContainer, fadeUpVariants, cardHoverVariants } from "@/lib/animations"

interface Project {
  id: number
  title: string
  description: string
  image: string
  link: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Animated Landing Page",
    description:
      "A dynamic landing page with Lottie animations and modern UI. Built with next.js and framer-motion and lootie files.",
    image: "/laisai.png",
    link: "https://frontend-4jjfp3y2y-lastro.vercel.app/",
    tags: ["Next.js", "Framer Motion", "Lottie", "UI/UX"],
  },
  {
    id: 2,
    title: "Advanced ChatBot",
    description:
      "Real-time AI for real estate solutions, leveraging multiple language models. Built with React and Golang.",
    image: "/laisresp.png",
    link: "https://frontend-4jjfp3y2y-lastro.vercel.app/responde/chat",
    tags: ["React", "Golang", "AI", "Real-time"],
  },
  {
    id: 3,
    title: "Live Readjustment Calculation",
    description:
      "A data index based calculation using government real time data for Brazilliant rent based on IGP-M, IPCA or IVAR indexes. Built with next.js",
    image: "/calculator.png",
    link: "https://app.lastro.co/calculator-rent-adjustment",
    tags: ["Next.js", "Data Visualization", "Financial"],
  },
  {
    id: 4,
    title: "Customer Platform",
    description:
      "A complete Platform with authentication for customers to keep track of their leads and take automated actions according to their specific flow. Built with bubble.io.",
    image: "/casalais.png",
    link: "#",
    tags: ["Bubble.io", "No-code", "CRM", "Automation"],
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white dark:bg-gray-800" />
        <motion.div
          className="absolute top-40 right-0 w-96 h-96 bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-0 w-96 h-96 bg-purple-400/5 dark:bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Featured <span className="text-brand-primary">Projects</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div key={project.id} variants={fadeUpVariants} transition={{ delay: index * 0.1 }}>
                <motion.div variants={cardHoverVariants} initial="initial" whileHover="hover" className="h-full">
                  <Card className="overflow-hidden h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-medium bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{project.description}</p>
                      <div className="mt-auto">
                        {project.link !== "#" ? (
                          <Link href={project.link} target="_blank">
                            <Button variant="outline" size="sm" className="group">
                              <span>Visit Project</span>
                              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </Link>
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400 italic">Authenticated platform</p>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
