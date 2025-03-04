"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TypingEffect from "@/components/typingText";
import PingPong from "@/components/ping-pong";

import {
  TerminalIcon,
  LinkedinIcon,
  GithubIcon,
  InstagramIcon,
  MenuIcon
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TowerVisualizer } from "@/components/TowerVisualizer"; // Import the separated component

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  const [towerHeight, setTowerHeight] = useState(0);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    if (storedUserID) {
      setUserID(storedUserID);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIcon((prev) => (prev + 1) % 7);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#game", label: "Ping Pong" },
    { href: "#game", label: "Tower" },
    { href: "#contact", label: "Contact" },
    { href: "/puzzles", label: "Puzzles" }
  ];

  const handleMessageSubmit = async (e: any) => {
    e.preventDefault();
    if (!userID) {
      alert("Please log in to send a message.");
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
          userID,
          message
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

  // Fetch current tower height (community-wide interactive feature)
  const fetchTowerHeight = async () => {
    try {
      const res = await fetch(`${API_URL}/tower`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("generalToken")}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setTowerHeight(data.height);
      }
    } catch (err) {
      console.error("Error fetching tower height:", err);
    }
  };

  // Increment tower height
  const handleTowerIncrement = async () => {
    try {
      const res = await fetch(`${API_URL}/tower/increment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("generalToken")}`
        }
      });
      if (res.ok) {
        fetchTowerHeight();
      }
    } catch (err) {
      console.error("Error incrementing tower:", err);
    }
  };

  // Decrement tower height
  const handleTowerDecrement = async () => {
    try {
      const res = await fetch(`${API_URL}/tower/decrement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("generalToken")}`
        }
      });
      if (res.ok) {
        fetchTowerHeight();
      }
    } catch (err) {
      console.error("Error decrementing tower:", err);
    }
  };

  useEffect(() => {
    fetchTowerHeight();
  }, []);

  return (
    <div className="font-sans flex flex-col min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 border-b border-gray-200 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* LEFT - LOGO */}
          <Link
            href="#"
            prefetch={false}
            className="flex items-center space-x-2"
          >
            <div className="icon-container flex items-center">
              <span className="mr-2 text-sm font-semibold tracking-wide">
                Stack:
              </span>
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
                alt="Next.js"
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
            </div>
          </Link>
          {/* RIGHT - HAMBURGER BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="z-50 p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <MenuIcon />
            </div>
          </button>

          {/* FULLSCREEN OVERLAY MENU */}
          <div
            className={`fixed inset-0 bg-[#F9F6EE] h-screen backdrop-blur z-40 transform transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <nav className=" h-full flex flex-col items-center justify-center space-y-8 text-2xl">
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

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {/* HERO */}
        <img
          src="/igor.png"
          alt="Igor's Profile Picture"
          className="w-24 h-24 rounded-[24px] mx-auto mt-8"
        />

        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Building Innovative Software Every Day
          </h1>
          <p className="max-w-2xl mx-auto text-gray-700 text-sm md:text-base mb-8">
            Hello! Im Igor, a Full Stack Developer with a Mechatronics
            background. I craft scalable, user-centric solutions with Go,
            Python, React, and Next.js. This is my interactive resume, optimized
            with creative demos for tech recruiters.
          </p>
          <div className="mb-6 flex items-center justify-center space-x-4">
            <TerminalIcon className="h-6 w-6" />
            <TypingEffect />
          </div>
          <Button
            className="bg-[#E33] hover:bg-[#D22] text-[#FFF] px-6 py-3 text-sm md:text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Check My Work
          </Button>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              About Me
            </h2>
            <p className="max-w-xl mx-auto text-gray-700 text-sm md:text-base text-center">
              Im passionate about tech problem-solving. With a strong
              engineering mindset, I integrate elegant UI, solid backend, and
              DevOps practices to deliver robust applications that delight
              users.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://app.mindsight.com.br/en/devolutiva/1eb572e9-ba37-421d-a01e-aa772bb1a9ec/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#E33] hover:text-[#D22] font-medium mt-2"
                >
                  View Personality Test →
                </a>
                <Button className="bg-[#E33] hover:bg-[#D22]">
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Projects
            </h2>
            {/* <div className="mb-10">
              <Card className="overflow-hidden shadow-xl">
                <CardContent className="p-0">
                  <div className="w-full h-[500px] relative overflow-hidden">
                    <iframe
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
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      AI Chat Interface
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      React and Next.js interface with real-time NLP responses,
                      using dynamic bot IDs for multiple AI models.
                    </p>
                    <div className="flex gap-4">
                      <Link
                        href="https://frontend-4jjfp3y2y-lastro.vercel.app/responde/chat"
                        target="_blank"
                      >
                        <Button variant="outline" className="text-sm">
                          Demo
                        </Button>
                      </Link>
                      <Link href="https://github.com/igorsalbr" target="_blank">
                        <Button variant="outline" className="text-sm">
                          Code
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div> */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <img
                    src="/laisai.png"
                    alt="Project Screenshot"
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold mb-2">
                      Animated Landing Page
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      A dynamic landing page with Lottie animations and modern
                      UI. Built with next.js and framer-motion and lootie files.
                    </p>
                    <Link
                      href="https://frontend-4jjfp3y2y-lastro.vercel.app/"
                      target="_blank"
                    >
                      <Button variant="outline" className="text-sm text-[#555]">
                        Visit
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <img
                    src="/laisresp.png"
                    alt="Project Screenshot"
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold mb-2">Advanced ChatBot</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Real-time AI for real estate solutions, leveraging
                      multiple language models. Built with React and Golang.
                    </p>
                    <Link
                      href="https://frontend-4jjfp3y2y-lastro.vercel.app/responde/chat"
                      target="_blank"
                    >
                      <Button
                        variant="outline"
                        className="flex text-sm mb-2 mt-auto text-[#555]"
                      >
                        Visit
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <img
                    src="/calculator.png"
                    alt="Project Screenshot"
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold mb-2">
                      Live readjustment calculation
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      A data index based calculation using government real time
                      data for Brazilliant rent based on IGP-M, IPCA or IVAR
                      indexes. Built with next.js
                    </p>
                    <Link
                      href="https://app.lastro.co/calculator-rent-adjustment"
                      target="_blank"
                    >
                      <Button variant="outline" className="text-sm text-[#555]">
                        Visit
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <img
                    src="/casalais.png"
                    alt="Project Screenshot"
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold mb-2">
                      Costumer Plataform
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      A complete Plataform with authentication for costumers to
                      keep track of their leads and take automated actions
                      according to their specific flow. Built with bubble.io.
                    </p>
                  </div>
                </CardContent>
                <p className="ml-4 text-[#555]">Authenticated plataform.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* ping pong SECTION */}
        <section id="game" className="bg-gray-50 py-6">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Ping Pong
            </h2>
            <p className="text-gray-600 text-sm mb-4 w-full text-center">
              Created on HTML canvas. Impossible to win, but you can try to :p
            </p>
            {userID ? (
              <div className="flex w-full items-center mx-auto justify-center text-center">
                <div className="hidden md:flex w-full items-center mx-auto justify-center text-center">
                  <PingPong />
                </div>
                <div className="flex md:hidden w-full items-center mx-auto justify-center text-center">
                  <p className="text-sm mb-4">
                    Play on desktop for best experience
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm mb-4">Must be logged to play!</p>
                <Link href="/login">
                  <Button className="bg-[#E33] hover:bg-[#D22] text-[#FFF] text-sm">
                    Login to Play
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* NEW COMMUNITY TOWER SECTION */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Community Tower
            </h2>
            <p className="text-sm text-gray-600 mb-4 max-w-xl mx-auto">
              This interactive section lets everyone add or remove blocks from a
              global tower. Each visit influences the final height in real-time.
              Add or remove blocks if you are logged in.
            </p>
            <div className="max-w-sm mx-auto bg-white p-6 rounded-md shadow-md">
              <TowerVisualizer
                towerHeight={towerHeight}
                onResetTower={() => setTowerHeight(0)}
              />
              <div className="flex justify-center gap-4 mt-4">
                <Button
                  onClick={handleTowerIncrement}
                  className="bg-[#1F1] hover:bg-green-600 text-[#FFF] h-10"
                  disabled={!userID}
                >
                  Add Block
                </Button>
                <Button
                  onClick={handleTowerDecrement}
                  className="bg-[#F11] hover:bg-red-600 text-[#FFF] h-10"
                  disabled={!userID}
                >
                  Remove Block
                </Button>
              </div>
              {!userID && (
                <p className="text-xs text-gray-500 mt-2">
                  Please log in to interact with the tower.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Me</h2>
            <p className="max-w-xl mx-auto text-gray-600 text-sm md:text-base mb-8">
              Lets talk about your next big idea or collaboration opportunity!
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <Link
                href="https://linkedin.com/in/igor-schroter-salviatto-929628171/"
                target="_blank"
                className="hover:text-[#E33] transition-colors duration-200"
              >
                <LinkedinIcon className="h-6 w-6" />
              </Link>
              <Link
                href="https://github.com/igorsalbr"
                target="_blank"
                className="hover:text-[#E33] transition-colors duration-200"
              >
                <GithubIcon className="h-6 w-6" />
              </Link>
              <Link
                href="https://instagram.com/igorschsal"
                target="_blank"
                className="hover:text-[#E33] transition-colors duration-200"
              >
                <InstagramIcon className="h-6 w-6" />
              </Link>
            </div>
            <Card className="max-w-lg mx-auto">
              <CardContent className="flex flex-col items-center justify-center gap-4 p-6 sm:p-8">
                <div className="w-full text-left">
                  <Label
                    htmlFor="message"
                    className="block mb-1 font-bold text-sm"
                  >
                    Send me a message:
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="resize-none text-sm"
                  />
                </div>
                <Button
                  className="w-full bg-[#E33] hover:bg-[#D22] text-[#FFF] text-sm"
                  onClick={(e) => handleMessageSubmit(e)}
                  disabled={!userID}
                >
                  {!userID ? "Login to Send Message" : "Send Message"}
                </Button>
                {!userID && (
                  <Link
                    href="/login"
                    className="text-[#E33] hover:text-[#D22] text-xs"
                  >
                    Click here to Login
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-[#FFF] py-6">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <p>© 2024 Igor. All rights reserved.</p>
          <div className="flex items-center space-x-3">
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
