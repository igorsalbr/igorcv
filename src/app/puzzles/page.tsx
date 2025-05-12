"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { PuzzleGrid } from "@/components/features/puzzles/puzzle-grid";
import { PuzzleDialog } from "@/components/features/puzzles/puzzle-dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { getPuzzles, updatePuzzleProgress } from "@/lib/api/puzzles";
import {
  pageTransition,
  staggerContainer,
  fadeUpVariants
} from "@/lib/animations";
import { Skeleton } from "@/components/ui/skeleton";

// Expose function to window for puzzle challenge
function useExposeToWindow(name: string, func: Function) {
  useEffect(() => {
    (window as any)[name] = func;
    return () => {
      delete (window as any)[name];
    };
  }, [name, func]);
}

function secretFunction() {
  return "h4ck3r";
}

export default function PuzzlesPage() {
  const { isAuthenticated, logout } = useAuth();
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [challenges, setChallenges] = useState<any[]>([
    {
      id: 1,
      title: "API Call Challenge",
      completed: false,
      description:
        "Make an API call to create or update a user with the parameter 'imanerd': true",
      question: "What's the correct API endpoint to use?",
      correctAnswer: "yes_you_are"
    },
    {
      id: 2,
      title: "Hidden Element Hunt",
      completed: false,
      description: "Find and interact with a hidden element on the page",
      question: "What's the ID of the hidden element?",
      correctAnswer: "salsal"
    },
    // {
    //   id: 4,
    //   title: "Invisible Button Clickathon",
    //   completed: false,
    //   description: "There are three invisible buttons on the page",
    //   question: "In what order should the buttons be clicked? (123)",
    //   correctAnswer: "213"
    // },
    {
      id: 3,
      title: "Console Hacker",
      completed: false,
      description: "Use the browser console to interact with a hidden function",
      question: "What's the return value of the secretFunction()?",
      correctAnswer: "h4ck3r"
    },
    // {
    //   id: 4,
    //   title: "SQL Injection Simulation",
    //   completed: false,
    //   description:
    //     "Simulate a SQL injection attack in a controlled environment",
    //   question: "What input would you use to bypass the login?",
    //   correctAnswer: "' OR '1'='1"
    // },
    {
      id: 4,
      title: "Cryptography Challenge",
      completed: false,
      description: "Decrypt a message using a given cipher",
      question: "Decrypt: Khoor Zruog! What's the original message?",
      correctAnswer: "Hello World!"
    },
    // {
    //   id: 6,
    //   title: "RegEx Riddle",
    //   completed: false,
    //   description: "Create a regular expression to match a specific pattern",
    //   question: "Write a RegEx to match all valid email addresses",
    //   correctAnswer: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
    // },
    {
      id: 5,
      title: "JWT Decoder",
      completed: false,
      description: "Decode a JSON Web Token to find a hidden message",
      question:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJzZWNyZXQiOiJvaWUifQ.55ja5RWqJJo4ZrsMDOxQXjWQhQsvgIx1AjTqFMbnJus",
      correctAnswer: "oie"
    }
  ]);
  const [loading, setLoading] = useState(true);

  useExposeToWindow("secretFunction", secretFunction);

  // Load puzzles from API
  useEffect(() => {
    async function loadPuzzles() {
      try {
        setLoading(true);
        const puzzleData = await getPuzzles();
        setChallenges(puzzleData);

        // Calculate progress
        const completedCount = puzzleData.filter(
          (p: any) => p.completed
        ).length;
        setProgress(
          completedCount > 0 ? (completedCount / puzzleData.length) * 100 : 0
        );
      } catch (error) {
        console.error("Failed to load puzzles:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPuzzles();
  }, [isAuthenticated]);

  useEffect(() => {
    if (progress === 100) {
      confetti();
    }
  }, [progress]);

  const openChallenge = (id: number) => {
    setOpenModal(id);
    setAnswer("");
    setError("");
  };

  const closeChallenge = () => {
    setOpenModal(null);
    setAnswer("");
    setError("");
  };

  const submitAnswer = async () => {
    const challenge = challenges.find((c) => c.id === openModal);
    if (
      challenge &&
      answer.toLowerCase() === challenge.correctAnswer.toLowerCase()
    ) {
      try {
        if (openModal === null) return;
        await updatePuzzleProgress(openModal, true);

        // Update local state
        const updatedChallenges = challenges.map((c) =>
          c.id === openModal ? { ...c, completed: true } : c
        );
        setChallenges(updatedChallenges);

        // Update progress
        const completedCount = updatedChallenges.filter(
          (c) => c.completed
        ).length;
        setProgress((completedCount / updatedChallenges.length) * 100);

        closeChallenge();
      } catch (error) {
        console.error("Failed to update puzzle progress:", error);
        setError("Failed to save progress. Please try again.");
      }
    } else {
      setError("Incorrect answer. Try again!");
    }
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col bg-background"
    >
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeUpVariants}
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
          >
            Interactive <span className="text-red-500">Puzzles</span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto"
          >
            Test your problem-solving skills with these coding and logic
            challenges. Can you solve them all?
          </motion.p>

          <motion.div variants={fadeUpVariants} className="mb-8">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(progress)}% Complete
              </p>
              <Link
                href="https://mpago.la/1ozZqt4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 flex items-center gap-1"
                >
                  <Coffee className="h-4 w-4" />
                  <span>Buy me a coffee</span>
                </Button>
              </Link>
            </div>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <Skeleton className="h-6 w-3/4 mb-1" />
                  </div>
                  <div className="p-4">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-2" />
                    <Skeleton className="h-4 w-4/6 mb-4" />
                    <Skeleton className="h-10 w-full rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <PuzzleGrid
              challenges={challenges}
              onStartChallenge={openChallenge}
            />
          )}
        </motion.div>

        <PuzzleDialog
          open={openModal !== null}
          onClose={closeChallenge}
          challenge={challenges.find((c) => c.id === openModal)}
          answer={answer}
          error={error}
          onAnswerChange={(e) => setAnswer(e.target.value)}
          onSubmit={submitAnswer}
        />

        <div className="hidden" id="salsal" />
      </main>
    </motion.div>
  );
}

function confetti() {
  const colors = ["#ff0000", "#ffffff", "#000000", "#ff3333", "#cc0000"];
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = Math.random() * 2 + 3 + "s";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(confetti);
    setTimeout(() => {
      confetti.remove();
    }, 4200);
  }
}
