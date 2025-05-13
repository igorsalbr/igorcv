"use client";

import type React from "react";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";

interface PuzzleDialogProps {
  open: boolean;
  onClose: () => void;
  challenge: any;
  answer: string;
  error: string;
  onAnswerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export function PuzzleDialog({
  open,
  onClose,
  challenge,
  answer,
  error,
  onAnswerChange,
  onSubmit
}: PuzzleDialogProps) {
  if (!open || !challenge) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-xl">
              <CardHeader className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
                <CardTitle>{challenge.title}</CardTitle>
                <CardDescription className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                  {challenge.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      {challenge.question}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="answer">Your Answer</Label>
                    <Input
                      id="answer"
                      value={answer}
                      onChange={onAnswerChange}
                      placeholder="Enter your answer here"
                      className={error ? "border-red-500" : ""}
                    />
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm"
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-black hover:bg-gray-700 dark:hover:bg-gray-700 text-white"
                  onClick={onSubmit}
                  disabled={!answer.trim()}
                >
                  Submit Answer
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
