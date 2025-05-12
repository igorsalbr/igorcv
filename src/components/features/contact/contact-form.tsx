"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { sendMessage } from "@/lib/api/messages";
import { buttonHoverVariants } from "@/lib/animations";

export function ContactForm() {
  const { isAuthenticated } = useAuth();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please log in to send a message.");
      return;
    }

    try {
      setStatus("loading");
      await sendMessage(message);
      setStatus("success");
      setMessage("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <Card className="max-w-lg mx-auto overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl">
      <CardContent className="p-0">
        <div className="flex flex-col items-center justify-center gap-4 p-6 sm:p-8">
          <div className="w-full text-left">
            <Label
              htmlFor="message"
              className="block mb-2 font-bold text-sm text-gray-700 dark:text-gray-300"
            >
              Send me a message:
            </Label>
            <Textarea
              id="message"
              placeholder="Your message..."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none text-sm border-gray-300 dark:border-gray-600 focus:ring-brand-primary focus:border-brand-primary"
              disabled={status === "loading"}
            />
          </div>
          <motion.div
            variants={buttonHoverVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="w-full"
          >
            <Button
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white"
              onClick={handleMessageSubmit}
              disabled={
                !isAuthenticated ||
                status === "loading" ||
                message.trim() === ""
              }
            >
              {!isAuthenticated ? (
                "Login to Send Message"
              ) : status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Message Sent!
                </>
              ) : status === "error" ? (
                <>
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Failed to Send
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </motion.div>
          {!isAuthenticated && (
            <Link
              href="/login"
              className="text-brand-primary hover:text-brand-primary/80 text-sm"
            >
              Click here to Login
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
