"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TypingEffect from "@/components/typingText";
import { MemoryGame } from "@/components/memory-game";
import {
  TerminalIcon,
  LinkedinIcon,
  GithubIcon,
  InstagramIcon
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_GENERAL_TOKEN;

function logout() {
  localStorage.removeItem("userID");
  localStorage.removeItem("generalToken");
  localStorage.removeItem("restrictedToken");
  window.location.href = "/";
}

export function Landing() {
  const [icon, setIcon] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userID, setUserID] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    if (storedUserID) {
      setUserID(storedUserID);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIcon((icon) => (icon + 1) % 7);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#game", label: "Play Game" },
    { href: "#contact", label: "Contact" }
  ];

  const handleMessageSubmit = async (e: any) => {
    e.preventDefault();

    if (!userID) {
      alert("Please login to send a message.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("generalToken")}`
        },
        body: JSON.stringify({
          userID: userID,
          message: message
        })
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setMessage("");
      } else {
        console.error("Failed to send message:", response.status);
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="#"
            className="flex items-center space-x-2"
            prefetch={false}
          >
            <span className="icon-container flex items-center">
              <div className="mr-2">Stack:</div>
              <img
                className={icon === 0 ? "flex w-14" : "hidden"}
                src="go.png"
                alt="GO"
              />
              <img
                className={icon === 1 ? "flex w-14" : "hidden"}
                src="ts.png"
                alt="TypeScript"
              />
              <img
                className={icon === 2 ? "flex w-14" : "hidden"}
                src="react.png"
                alt="React.js"
              />
              <img
                className={icon === 3 ? "flex w-14" : "hidden"}
                src="py.png"
                alt="Python"
              />
              <img
                className={icon === 4 ? "flex w-14" : "hidden"}
                src="next.svg"
                alt="Next"
              />
              <img
                className={icon === 5 ? "flex w-14" : "hidden"}
                src="retool.png"
                alt="Retool"
              />
              <img
                className={icon === 6 ? "flex w-14" : "hidden"}
                src="bubble.png"
                alt="Bubble"
              />
            </span>
          </Link>

          {/* Puzzles Link - Always Visible */}
          <Link
            href="/puzzles"
            className="absolute left-1/2 transform -translate-x-1/2 text-lg font-medium hover:text-[#E33] transition-colors duration-200"
          >
            Puzzles
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="z-50 p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-gray-600 transform transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-gray-600 transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-gray-600 transform transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>

          {/* Full Screen Menu */}
          <div
            className={`fixed inset-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-40 transform transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <nav className="h-full flex flex-col items-center justify-center space-y-8 text-2xl">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-[#E33] transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {!userID ? (
                <Link
                  href="/login"
                  className="hover:text-[#E33] transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="text-[#E33] hover:text-[#C22] transition-colors duration-200"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Transforming Ideas into Digital Experiences
          </h1>
          <div className="mb-8">
            <img
              src="/igor.png"
              alt="Igor"
              className="w-48 h-48 mx-auto rounded-full object-cover shadow-lg"
            />
          </div>
          <div className="flex items-center justify-center space-x-4 mb-12">
            <TerminalIcon className="h-8 w-8" />
            <TypingEffect />
          </div>
          <Button
            className="bg-[#E33] hover:bg-[#D22] text-[#FFF] px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore My Work
          </Button>
        </section>

        {/* About Section */}
        <section id="about" className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              About Me
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Full-stack developer with a Mechatronics Engineering background
                from USP. I blend technical expertise with creative
                problem-solving to build innovative solutions. Experienced in
                Go, Python, React, and Next.js, Im passionate about creating
                impactful applications that make a difference.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://app.mindsight.com.br/en/devolutiva/1eb572e9-ba37-421d-a01e-aa772bb1a9ec/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#E33] hover:text-[#D22] font-medium h-full flex items-center"
                >
                  <p className="flex py-2">View Personality Test →</p>
                </a>
                <Button className="bg-[#E33] hover:bg-[#D22]">
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Featured Projects
            </h2>

            {/* AI Chat Interface */}
            <div className="mb-16">
              <Card className="overflow-hidden shadow-xl">
                <CardContent className="p-0">
                  <div className="overflow-hidden w-full h-[600px] relative">
                    <div
                      className="iframe-container"
                      style={{
                        width: "100%",
                        height: "100%",
                        overflow: "auto" // Permite scroll apenas dentro deste contêiner
                      }}
                    >
                      {/* <iframe
                        src="https://sandbox-app.lastro.co/lais?botId=20cf60ac-f26d-4fa5-8cbf-5988fc9c85f8"
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                          pointerEvents: "auto",
                          isolation: "isolate"
                        }}
                        title="AI Chat Interface"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      /> */}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">
                      AI Conversation Interface
                    </h3>
                    <p className="text-gray-600 mb-6">
                      An advanced AI chat interface built with React and
                      Next.js, featuring real-time responses and natural
                      language processing.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="https://frontend-4jjfp3y2y-lastro.vercel.app/responde/chat"
                        target="_blank"
                      >
                        <Button variant="outline">Try it Live</Button>
                      </Link>
                      <Link href="https://github.com/igorsalbr" target="_blank">
                        <Button variant="outline">View Code</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Other Projects Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <img
                    src="/laisai.png"
                    alt="Project Screenshot"
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Landing Page</h3>
                    <p className="text-gray-600 mb-4">
                      A comprehensive web page with animations via lootie files,
                      and a responsive design.
                    </p>
                    <div className="flex gap-3">
                      <Link
                        href="https://frontend-4jjfp3y2y-lastro.vercel.app/"
                        target="_blank"
                      >
                        <Button variant="outline">Visit Website</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <img
                    src="/placeholder.svg?height=250&width=500"
                    alt="Project Screenshot"
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      Interactive Dashboard
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Real-time analytics dashboard with data visualization and
                      user interaction.
                    </p>
                    <Link href="https://github.com/igorsalbr" target="_blank">
                      <Button variant="outline">View Project</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Interactive Game Section */}
        <section id="game" className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Memory Challenge
            </h2>
            {userID ? (
              <MemoryGame userID={userID} />
            ) : (
              <div className="text-center">
                <p className="text-lg mb-4">
                  Login to test your memory and compete for the high score!
                </p>
                <Link href="/login">
                  <Button className="bg-[#E33] hover:bg-[#D22]">
                    Login to Play
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Lets Connect!
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Looking for a developer who can bring your vision to life? Lets
              discuss how we can work together to create something amazing.
            </p>
            <div className="flex justify-center space-x-6 mb-12">
              <Link
                href="https://linkedin.com/in/igor-schroter-salviatto-929628171/"
                target="_blank"
                className="hover:text-[#E33] transition-colors duration-200"
              >
                <LinkedinIcon className="h-8 w-8" />
              </Link>
              <Link
                href="https://github.com/igorsalbr"
                target="_blank"
                className="hover:text-[#E33] transition-colors duration-200"
              >
                <GithubIcon className="h-8 w-8" />
              </Link>
              <Link
                href="https://instagram.com/igorschsal"
                target="_blank"
                className="hover:text-[#E33] transition-colors duration-200"
              >
                <InstagramIcon className="h-8 w-8" />
              </Link>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="flex flex-col items-center justify-center gap-6 p-6 sm:p-8">
                <div className="grid w-full gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="message">Send me a message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="resize-none"
                    />
                  </div>
                </div>
                <Button
                  className="w-full bg-[#E33] hover:bg-[#D22] text-[#FFF]"
                  onClick={(e) => handleMessageSubmit(e)}
                  disabled={!userID}
                >
                  {!userID ? "Login to Send Message" : "Send Message"}
                </Button>
                {!userID && (
                  <Link
                    href="/login"
                    className="text-[#E33] hover:text-[#D22] text-sm"
                  >
                    Click here to login
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <p>&copy; 2024 Igor. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link
              href="#about"
              className="hover:text-[#E33] transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="#projects"
              className="hover:text-[#E33] transition-colors duration-200"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="hover:text-[#E33] transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
