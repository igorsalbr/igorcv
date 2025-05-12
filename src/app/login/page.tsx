"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { LoginForm } from "@/components/features/auth/login-form"
import { SignUpForm } from "@/components/features/auth/signup-form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { pageTransition, fadeUpVariants } from "@/lib/animations"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col bg-background"
    >
      <Header />

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div variants={fadeUpVariants} initial="hidden" animate="visible" className="w-full max-w-md">
          <Card className="border border-gray-200 dark:border-gray-700 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">{isLogin ? "Login" : "Sign Up"}</CardTitle>
              <CardDescription>{isLogin ? "Enter your credentials to login" : "Create a new account"}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLogin ? <LoginForm /> : <SignUpForm />}
              <button className="mt-4 text-red-500 hover:text-red-700 text-sm" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </motion.div>
  )
}
